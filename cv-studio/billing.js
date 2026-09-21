(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvBilling = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    const tokenKey = 'cv-studio-access-v1';
    const pendingKey = 'cv-studio-pending-payment-v1';

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

        return { state, init, authorize, order, paid, verifyPending, accessReceipt, restoreAccess, hasPending: () => Boolean(pending), hasAccess: () => Boolean(memoryToken), configured: Boolean(base) };
    }

    return { createClient, validBase };
});