(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else { root.SiteOrderLedger = api; api.mount(root); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    const prefix = 'yas-order-event-v1:';
    const siteId = 'yasir-portfolio';
    const courses = { faang: 'FAANG Interview Preparation', 'ai-ml': 'AI/ML Foundations', rag: 'RAG and LLM Engineering', 'ml-system-design': 'ML System Design', 'sql-data': 'SQL/Data Practice' };

    function normalizeOrder(value) {
        if (!value || !/^pay_[A-Za-z0-9]{6,40}$/.test(value.paymentId || '') || typeof value.product !== 'string' || !value.product.trim() || !Number.isSafeInteger(value.amount) || value.amount <= 0 || value.amount > 100000000 || value.currency !== 'INR') throw new Error('A successful payment reference and product amount are required.');
        if (typeof value.createdAt !== 'string' || !Number.isFinite(Date.parse(value.createdAt))) throw new Error('The order date is invalid.');
        return { version: 1, paymentId: value.paymentId, productId: typeof value.productId === 'string' ? value.productId.slice(0, 100) : 'booking', product: value.product.trim().slice(0, 180), amount: value.amount, currency: 'INR', createdAt: new Date(value.createdAt).toISOString() };
    }

    function createLedger({ storage, onChange = () => {}, now = () => new Date().toISOString() } = {}) {
        const temporary = new Map();
        const warnings = new Set();
        function entries() {
            const values = new Map(temporary);
            if (storage) {
                try {
                    for (let index = 0; index < storage.length; index++) {
                        const key = storage.key(index);
                        if (!key?.startsWith(prefix)) continue;
                        try {
                            const order = normalizeOrder(JSON.parse(storage.getItem(key)));
                            if (key !== prefix + order.paymentId) throw new Error('Mismatched order');
                            values.set(order.paymentId, order);
                        } catch { warnings.add('Some saved order records could not be read. They have not been overwritten.'); }
                    }
                } catch { warnings.add('Browser storage is unavailable. Export the order history for a backup.'); }
            }
            return [...values.values()].sort((left, right) => right.createdAt.localeCompare(left.createdAt) || left.paymentId.localeCompare(right.paymentId));
        }
        function record(value, quiet = false) {
            let order;
            try { order = normalizeOrder({ ...value, createdAt: value?.createdAt || now() }); }
            catch { return false; }
            if (entries().some(existing => existing.paymentId === order.paymentId)) return false;
            temporary.set(order.paymentId, order);
            try {
                if (!storage) throw new Error('No storage');
                const key = prefix + order.paymentId;
                if (storage.getItem(key) !== null) throw new Error('Preserve existing record');
                storage.setItem(key, JSON.stringify(order));
            } catch { warnings.add('Some orders are available for this visit only. Existing records were preserved; export a backup.'); }
            if (!quiet) onChange();
            return true;
        }
        function migrate() {
            if (!storage) return;
            for (const key of ['yas_bookings', 'yas_digital_orders']) {
                try {
                    const raw = storage.getItem(key);
                    if (!raw) continue;
                    const values = JSON.parse(raw);
                    if (!Array.isArray(values)) throw new Error('Invalid legacy history');
                    for (const value of values) record({ paymentId: value.paymentId, productId: value.product || 'booking', product: value.service || 'Session booking', amount: Math.round(Number(value.amount) * 100), currency: value.currency || 'INR', createdAt: value.purchasedAt || value.booked || now() }, true);
                } catch { warnings.add('An older purchase history could not be read. It has not been changed.'); }
            }
            for (const [courseId, title] of Object.entries(courses)) {
                try {
                    const raw = storage.getItem('yasir-course-access-v1:' + courseId);
                    if (!raw) continue;
                    const receipt = JSON.parse(raw);
                    if (receipt?.version === 1 && receipt.courseId === courseId) record({ paymentId: receipt.paymentId, productId: 'course-' + courseId, product: title, amount: 4900, currency: 'INR', createdAt: receipt.purchasedAt || now() }, true);
                } catch { warnings.add('An older course receipt could not be read. It has not been changed.'); }
            }
        }
        function restore(value) {
            if (value?.version !== 1 || !Array.isArray(value.orders) || value.orders.length > 100000) throw new Error('Choose an order-history backup.');
            const orders = value.orders.map(normalizeOrder);
            let added = 0;
            for (const order of orders) if (record(order, true)) added++;
            onChange();
            return added;
        }
        return { entries, record, migrate, restore, backup: () => ({ version: 1, scope: 'device', orders: entries() }), warnings: () => [...warnings] };
    }

    function validBase(value) {
        if (!value) return '';
        try {
            const url = new URL(value);
            if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || !['', '/'].includes(url.pathname)) return '';
            return url.origin;
        } catch { return ''; }
    }

    function createCounter({ ledger, apiBase = '', fetcher = globalThis.fetch, onChange = () => {} } = {}) {
        const base = validBase(apiBase);
        let shared = null;
        let checkedAt = '';
        let failure = '';
        let pending = null;
        function state() {
            const orders = ledger.entries();
            return { count: base ? shared : orders.length, scope: base ? 'site' : 'device', localCount: orders.length, checkedAt, stale: Boolean(base && failure), warning: [failure, ...ledger.warnings()].filter(Boolean).join(' ') };
        }
        async function refresh() {
            if (!base) { onChange(state()); return state(); }
            if (pending) return pending;
            pending = (async () => {
                try {
                    const response = await fetcher(base + '/api/orders/summary', { signal: AbortSignal.timeout(12000), cache: 'no-store' });
                    if (!response.ok) throw new Error('Shared counter unavailable');
                    const value = await response.json();
                    if (value.siteId !== siteId || value.version !== 1 || !Number.isSafeInteger(value.count) || value.count < 0) throw new Error('Invalid shared counter');
                    shared = Math.max(shared || 0, value.count);
                    checkedAt = new Date().toISOString();
                    failure = '';
                } catch { failure = 'Shared total could not be refreshed. The last verified total is retained; local orders have not been deleted.'; }
                finally { pending = null; onChange(state()); }
                return state();
            })();
            return pending;
        }
        return { state, refresh };
    }

    function mount(root) {
        let storage;
        try { storage = root.localStorage; } catch {}
        let counter;
        const publish = () => { if (counter) root.dispatchEvent(new CustomEvent('site-orders-updated', { detail: counter.state() })); };
        const ledger = createLedger({ storage, onChange: publish });
        ledger.migrate();
        counter = createCounter({ ledger, apiBase: root.SITE_ORDERS_CONFIG?.apiBase || '', onChange: publish });
        root.SiteOrders = {
            recordPurchase: order => { const added = ledger.record(order); if (added) counter.refresh(); return added; },
            getState: counter.state,
            getOrders: ledger.entries,
            backup: ledger.backup,
            restore: value => { const added = ledger.restore(value); counter.refresh(); return added; },
            refresh: counter.refresh
        };
        root.addEventListener('storage', event => {
            if (event.key?.startsWith(prefix) || ['yas_bookings', 'yas_digital_orders'].includes(event.key)) { ledger.migrate(); publish(); counter.refresh(); }
        });
        root.document.addEventListener('visibilitychange', () => { if (!root.document.hidden) { ledger.migrate(); publish(); counter.refresh(); } });
        root.setInterval(() => { if (!root.document.hidden) counter.refresh(); }, 30000);
        counter.refresh();
    }

    return { prefix, siteId, normalizeOrder, createLedger, validBase, createCounter, mount };
});