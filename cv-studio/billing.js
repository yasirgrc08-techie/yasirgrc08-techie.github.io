(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvBilling = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    const tokenKey = 'cv-studio-access-v1';
    const pendingKey = 'cv-studio-pending-payment-v1';
    const products = Object.freeze({
        'cv-studio-v1': Object.freeze({ id: 'cv-studio-v1', title: 'CV Studio - all templates and exports', amount: 4900, currency: 'INR' }),
        'cv-readiness-v1': Object.freeze({ id: 'cv-readiness-v1', title: 'CV readiness review - one report', amount: 900, currency: 'INR' })
    });
    let checkoutScript;
    let notificationScript;

    function validBase(value, currentHost) {
        if (!value) return '';
        try {
            const url = new URL(value);
            const local = ['localhost', '127.0.0.1'].includes(url.hostname) && ['localhost', '127.0.0.1'].includes(currentHost);
            if (url.protocol !== 'https:' && !(url.protocol === 'http:' && local)) return '';
            if (url.username || url.password || url.search || url.hash || url.pathname !== '/') return '';
            return url.origin;
        } catch { return ''; }
    }

    function createClient({ apiBase = '', currentHost = '', fetcher = fetch, storage, onChange = () => {} } = {}) {
        const base = validBase(apiBase, currentHost);
        const state = { ready: false, active: false, checking: false, message: base ? 'Checking checkout availability...' : 'Launch preview. Verified checkout is not configured yet; no payment can be collected.' };
        let memoryToken = '';
        let pending = null;
        const read = name => { try { return storage?.getItem(name); } catch { return null; } };
        const write = (name, value) => { try { storage?.setItem(name, value); return true; } catch { return false; } };
        memoryToken = read(tokenKey) || '';
        try { pending = JSON.parse(read(pendingKey) || 'null'); } catch {}

        function update(values) { Object.assign(state, values); onChange({ ...state }); }
        async function request(path, options = {}) {
            if (!base) throw new Error('Verified checkout is not configured yet. No payment can be collected.');
            const response = await fetcher(base + path, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, signal: AbortSignal.timeout(20000) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Payment service unavailable.');
            return data;
        }
        const validAccess = data => data?.active === true && data.product === 'cv-studio-v1' && data.amount === 4900 && data.currency === 'INR';

        async function verifyPending() {
            if (!pending) throw new Error('No pending payment to verify. Contact support with your payment ID for access recovery.');
            const data = await request('/api/verify', { method: 'POST', body: JSON.stringify(pending) });
            if (!validAccess(data) || typeof data.token !== 'string') throw new Error('Unexpected payment verification response. Contact support before paying again.');
            memoryToken = data.token;
            const saved = write(tokenKey, data.token);
            try { storage?.removeItem(pendingKey); } catch {}
            pending = null;
            update({ active: true, message: saved ? 'CV Studio access verified on this browser.' : 'Access verified for this visit only. Browser storage is unavailable; keep your payment ID for support.' });
            return true;
        }

        async function authorize() {
            try {
                if (!memoryToken) throw new Error('Unlock CV Studio to export PDF and LaTeX. JSON backups are always available.');
                const data = await request('/api/access', { headers: { Authorization: 'Bearer ' + memoryToken } });
                if (!validAccess(data)) throw new Error('CV Studio access could not be verified.');
                update({ active: true, message: 'CV Studio access verified.' });
                return true;
            } catch (error) { update({ active: false, message: error.message }); throw error; }
        }

        function accessReceipt() {
            if (!state.active || !memoryToken) throw new Error('Verify your existing access before backing up the access receipt.');
            return { version: 1, product: 'cv-studio-v1', token: memoryToken };
        }

        async function restoreAccess(receipt) {
            if (receipt?.version !== 1 || receipt.product !== 'cv-studio-v1' || typeof receipt.token !== 'string' || !receipt.token || receipt.token.length > 3000) throw new Error('Choose a valid CV Studio access receipt.');
            const data = await request('/api/access', { headers: { Authorization: 'Bearer ' + receipt.token } });
            if (!validAccess(data)) throw new Error('This receipt could not be verified.');
            memoryToken = receipt.token;
            const saved = write(tokenKey, memoryToken);
            update({ active: true, message: saved ? 'Access restored and verified on this browser.' : 'Access restored for this visit. Keep your access receipt; browser storage is unavailable.' });
            return true;
        }

        async function init() {
            if (!base) { onChange({ ...state }); return state; }
            update({ checking: true });
            try {
                const config = await request('/api/config');
                const ready = config.ready === true && config.product === 'cv-studio-v1' && config.amount === 4900 && config.currency === 'INR';
                update({ ready, message: ready ? 'One-time INR 49 access. Editing and local JSON backups are available before purchase.' : 'Checkout setup is incomplete. No payment can be collected.' });
                if (ready && memoryToken) await authorize();
            } catch (error) { update({ active: false, message: error.message }); }
            finally { update({ checking: false }); }
            return state;
        }

        async function order() {
            if (!state.ready) throw new Error(state.message);
            if (pending) throw new Error('A payment is awaiting verification. Retry verification or contact support before paying again.');
            const data = await request('/api/orders', { method: 'POST', body: '{}' });
            if (data.amount !== 4900 || data.currency !== 'INR' || !/^order_[A-Za-z0-9]+$/.test(data.orderId || '') || !/^rzp_(live|test)_[A-Za-z0-9]+$/.test(data.keyId || '') || typeof data.ticket !== 'string') throw new Error('Invalid checkout order. No payment was started.');
            return data;
        }

        async function paid(orderData, response) {
            pending = { ticket: orderData.ticket, orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, signature: response.razorpay_signature };
            write(pendingKey, JSON.stringify(pending));
            return verifyPending();
        }

        return { mode: 'verified', product: products['cv-studio-v1'], state, init, authorize, order, paid, verifyPending, accessReceipt, restoreAccess, hasPending: () => Boolean(pending), hasAccess: () => Boolean(memoryToken), configured: Boolean(base) };
    }

    function createDigitalClient({ productId = 'cv-studio-v1', scope = 'all', publicKey = '', storage, onChange = () => {}, onPurchase = () => {} } = {}) {
        if (!Object.hasOwn(products, productId)) throw new Error('Unknown digital product.');
        const product = products[productId];
        if ((productId === 'cv-readiness-v1' && !/^[a-f0-9]{64}$/.test(scope)) || (productId === 'cv-studio-v1' && scope !== 'all')) throw new Error('A prepared report is required for this purchase.');
        const receiptKey = 'yasir-digital-access-v1:' + productId + ':' + scope;
        const pendingKey = receiptKey + ':pending';
        const read = name => { try { return storage?.getItem(name); } catch { return null; } };
        const write = (name, value) => { try { if (!storage) return false; storage.setItem(name, value); return true; } catch { return false; } };
        const validReceipt = value => Boolean(value && value.version === 2 && value.mode === 'razorpay-browser' && value.product === productId && value.scope === scope && value.amount === product.amount && value.currency === product.currency && /^pay_[A-Za-z0-9]{6,40}$/.test(value.paymentId || '') && typeof value.purchasedAt === 'string' && Number.isFinite(Date.parse(value.purchasedAt)));
        let receipt = null;
        let pending = false;
        try { const saved = JSON.parse(read(receiptKey) || 'null'); if (validReceipt(saved)) receipt = saved; } catch {}
        pending = Boolean(read(pendingKey));
        const orders = new Map();
        const state = { ready: /^rzp_(live|test)_[A-Za-z0-9]+$/.test(publicKey), active: Boolean(receipt), checking: false, message: '' };
        function update(values) { Object.assign(state, values); onChange({ ...state }); }
        function message() {
            if (receipt) return 'Purchase access saved in this browser. Payment ID: ' + receipt.paymentId;
            if (pending) return 'An incomplete payment response needs support review. Do not pay again until its status is checked.';
            return state.ready ? 'Razorpay checkout / INR ' + product.amount / 100 + '. Access uses a browser receipt, like the website\'s other digital products.' : 'The public Razorpay checkout key is not configured.';
        }
        async function init() { update({ message: message() }); return state; }
        async function authorize() {
            if (!validReceipt(receipt)) { update({ active: false }); throw new Error('Purchase this digital product before downloading it.'); }
            update({ active: true, message: message() });
            return true;
        }
        async function order() {
            if (!state.ready) throw new Error(message());
            if (receipt) throw new Error('This product is already available on this browser.');
            if (pending) throw new Error(message());
            const order = Object.freeze({ product: productId, scope, keyId: publicKey, amount: product.amount, currency: product.currency, reference: globalThis.crypto.randomUUID() });
            orders.set(order.reference, order);
            return order;
        }
        async function paid(orderData, response, details = {}) {
            if (receipt && receipt.paymentId === response?.razorpay_payment_id && orderData?.product === productId && orderData.scope === scope) return true;
            const issued = orders.get(orderData?.reference);
            if (!issued || orderData.product !== productId || orderData.scope !== scope || orderData.amount !== product.amount || orderData.currency !== product.currency) throw new Error('This checkout does not match the selected product. Contact support if a payment was deducted.');
            if (!/^pay_[A-Za-z0-9]{6,40}$/.test(response?.razorpay_payment_id || '')) {
                pending = true;
                write(pendingKey, JSON.stringify({ reference: issued.reference, receivedAt: new Date().toISOString() }));
                update({ message: message() });
                throw new Error('Razorpay did not return a usable payment reference. Contact support before paying again.');
            }
            receipt = { version: 2, mode: 'razorpay-browser', product: productId, scope, amount: product.amount, currency: product.currency, paymentId: response.razorpay_payment_id, purchasedAt: new Date().toISOString() };
            const saved = write(receiptKey, JSON.stringify(receipt));
            orders.delete(issued.reference);
            pending = false;
            try { storage?.removeItem(pendingKey); } catch {}
            update({ active: true, message: saved ? message() : 'Purchase available for this visit. Storage is unavailable; download your files and access receipt now.' });
            try { Promise.resolve(onPurchase({ ...receipt }, details)).catch(() => {}); } catch {}
            return true;
        }
        function accessReceipt() {
            if (!validReceipt(receipt)) throw new Error('No purchase receipt is available.');
            return { ...receipt };
        }
        async function restoreAccess(value) {
            if (!validReceipt(value)) throw new Error('This receipt belongs to a different product/report or is not a valid browser receipt.');
            receipt = { version: 2, mode: value.mode, product: productId, scope, amount: product.amount, currency: product.currency, paymentId: value.paymentId, purchasedAt: value.purchasedAt };
            const saved = write(receiptKey, JSON.stringify(receipt));
            pending = false;
            try { storage?.removeItem(pendingKey); } catch {}
            update({ active: true, message: saved ? message() : 'Receipt restored for this visit only; browser storage is unavailable.' });
            return true;
        }
        return { mode: 'razorpay', product, scope, state, init, authorize, order, paid, accessReceipt, restoreAccess, hasAccess: () => Boolean(receipt), hasPending: () => pending, configured: state.ready, cancelOrder: reference => orders.delete(reference), verifyPending: async () => { throw new Error('Contact support with the payment reference. Browser checkout cannot verify provider state or refunds by itself.'); } };
    }

    function checkoutOptions(order, product, email, handler, dismiss) {
        if (!product || order.amount !== product.amount || order.currency !== product.currency) throw new Error('The checkout price does not match the digital product.');
        return {
            key: order.keyId, amount: product.amount, currency: product.currency,
            ...(order.orderId ? { order_id: order.orderId } : {}),
            name: 'Yasir Arafat Sharfi', description: product.title,
            image: 'https://yasirgrc08-techie.github.io/images/personal/yasir_amazon.jpeg',
            prefill: { email }, theme: { color: '#176b5b' },
            notes: { site_id: 'yasir-portfolio', product_id: product.id, product_type: 'digital-product', ...(order.reference ? { purchase_reference: order.reference } : {}) },
            handler, modal: { ondismiss: dismiss }
        };
    }

    function loadScript(url, available) {
        if (available()) return Promise.resolve();
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            const timer = setTimeout(() => { script.remove(); reject(new Error('The payment service could not load. No payment was started.')); }, 20000);
            script.src = url;
            script.onload = () => { clearTimeout(timer); if (available()) resolve(); else { script.remove(); reject(new Error('The payment service did not initialize.')); } };
            script.onerror = () => { clearTimeout(timer); script.remove(); reject(new Error('The payment service could not load. No payment was started.')); };
            document.head.append(script);
        });
    }

    async function openCheckout(client, { email, beforeOpen = () => {}, onStatus = () => {} } = {}) {
        if (typeof email !== 'string' || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || email.length > 254) throw new Error('Enter a valid receipt email.');
        if (!checkoutScript) checkoutScript = loadScript('https://checkout.razorpay.com/v1/checkout.js', () => typeof globalThis.Razorpay === 'function').catch(error => { checkoutScript = null; throw error; });
        await checkoutScript;
        const order = await client.order();
        return new Promise((resolve, reject) => {
            let settled = false;
            let confirming = false;
            const dismiss = () => {
                if (settled || confirming) return;
                settled = true;
                client.cancelOrder?.(order.reference);
                reject(new Error('Checkout closed without confirmed access. If your bank shows a debit, keep the payment reference and contact support before retrying.'));
            };
            const handler = async response => {
                if (settled || confirming) return;
                confirming = true;
                try { await client.paid(order, response, { email }); settled = true; resolve(client.accessReceipt()); }
                catch (error) { settled = true; reject(error); }
            };
            try {
                const checkout = new globalThis.Razorpay(checkoutOptions(order, client.product, email.trim(), handler, dismiss));
                checkout.on('payment.failed', () => onStatus('Payment was not completed. Check its status before retrying; no new access has been granted.'));
                beforeOpen();
                checkout.open();
            } catch (error) { settled = true; client.cancelOrder?.(order.reference); reject(error); }
        });
    }

    function recordDigitalPurchase(receipt, details, storage) {
        if (!Object.hasOwn(products, receipt.product) || !/^pay_[A-Za-z0-9]{6,40}$/.test(receipt.paymentId || '')) return false;
        globalThis.SiteOrders?.recordPurchase({ paymentId: receipt.paymentId, productId: receipt.product, product: products[receipt.product].title, amount: receipt.amount, currency: receipt.currency, createdAt: receipt.purchasedAt });
        try {
            if (!storage) return false;
            const raw = storage.getItem('yas_digital_orders');
            const orders = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(orders)) return false;
            if (!orders.some(order => order.paymentId === receipt.paymentId && order.product === receipt.product)) {
                orders.push({ version: 1, product: receipt.product, service: products[receipt.product].title, amount: receipt.amount / 100, currency: receipt.currency, paymentId: receipt.paymentId, purchasedAt: receipt.purchasedAt, fulfillment: 'digital', scope: receipt.scope });
                storage.setItem('yas_digital_orders', JSON.stringify(orders));
            }
            return true;
        } catch { return false; }
    }

    async function notifyDigitalPurchase(receipt, details, config) {
        const notification = config?.notifications;
        if (!notification || !details.email || !products[receipt.product]) return;
        if (!notificationScript) notificationScript = loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js', () => Boolean(globalThis.emailjs)).catch(error => { notificationScript = null; throw error; });
        await notificationScript;
        globalThis.emailjs.init(notification.publicKey);
        return globalThis.emailjs.send(notification.serviceId, notification.templateId, {
            session: products[receipt.product].title + ' purchased', date: new Date(receipt.purchasedAt).toLocaleDateString(), time: new Date(receipt.purchasedAt).toLocaleTimeString(),
            name: details.email, email: details.email, phone: 'N/A', amount: 'INR ' + receipt.amount / 100,
            payment_id: receipt.paymentId, to_email: config.supportEmail,
            message: 'Digital product: ' + receipt.product + '. No appointment or calendar booking. Payment reference: ' + receipt.paymentId
        });
    }

    return { createClient, createDigitalClient, validBase, products, checkoutOptions, openCheckout, recordDigitalPurchase, notifyDigitalPurchase };
});