const PRODUCT = 'cv-studio-v1';
const AMOUNT = 4900;
const CURRENCY = 'INR';
const encoder = new TextEncoder();
const toBase64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const fromBase64 = value => Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), character => character.charCodeAt(0));

export function createHandler({ fetcher = fetch, cryptography = crypto, now = () => Date.now() } = {}) {
    async function key(secret) {
        return cryptography.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
    }

    async function seal(payload, secret) {
        const encoded = toBase64(encoder.encode(JSON.stringify(payload)));
        const signature = await cryptography.subtle.sign('HMAC', await key(secret), encoder.encode(encoded));
        return encoded + '.' + toBase64(signature);
    }

    async function unseal(token, secret, kind) {
        if (typeof token !== 'string' || token.length > 3000) return null;
        const parts = token.split('.');
        if (parts.length !== 2 || parts.some(part => !/^[A-Za-z0-9_-]+$/.test(part))) return null;
        try {
            if (!await cryptography.subtle.verify('HMAC', await key(secret), fromBase64(parts[1]), encoder.encode(parts[0]))) return null;
            const payload = JSON.parse(new TextDecoder().decode(fromBase64(parts[0])));
            if (payload.product !== PRODUCT || payload.kind !== kind) return null;
            if (kind === 'order' && (!Number.isFinite(payload.expires) || payload.expires <= now())) return null;
            return payload;
        } catch { return null; }
    }

    async function razorpay(env, path, body) {
        const response = await fetcher('https://api.razorpay.com/v1/' + path, {
            method: body ? 'POST' : 'GET',
            headers: { Authorization: 'Basic ' + btoa(env.RAZORPAY_KEY_ID + ':' + env.RAZORPAY_KEY_SECRET), 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000)
        });
        if (!response.ok) throw new Error('Payment provider unavailable');
        return response.json();
    }

    async function capturedPayment(env, paymentId, orderId) {
        if (!/^pay_[A-Za-z0-9]+$/.test(paymentId || '') || !/^order_[A-Za-z0-9]+$/.test(orderId || '')) return false;
        const payment = await razorpay(env, 'payments/' + paymentId);
        const order = await razorpay(env, 'orders/' + orderId);
        return payment.id === paymentId && payment.order_id === orderId && payment.status === 'captured' && payment.captured === true &&
            payment.amount === AMOUNT && payment.currency === CURRENCY && payment.amount_refunded === 0 &&
            order.id === orderId && order.amount === AMOUNT && order.currency === CURRENCY && order.notes?.product === PRODUCT;
    }

    async function bodyJson(request) {
        const reader = request.body?.getReader();
        if (!reader) throw new Error('Missing request body');
        let size = 0;
        const chunks = [];
        for (;;) {
            const part = await reader.read();
            if (part.done) break;
            size += part.value.length;
            if (size > 4096) { await reader.cancel(); throw new Error('Request too large'); }
            chunks.push(part.value);
        }
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
        const parsed = JSON.parse(new TextDecoder().decode(bytes));
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid request');
        return parsed;
    }

    return async function handle(request, env) {
        const origin = request.headers.get('Origin');
        const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
        const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin', 'X-Content-Type-Options': 'nosniff' };
        const response = (status, payload) => new Response(JSON.stringify(payload), { status, headers });
        if (!origin || !allowed.includes(origin)) return response(403, { error: 'Origin not allowed.' });
        headers['Access-Control-Allow-Origin'] = origin;
        headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
        headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
        const path = new URL(request.url).pathname.replace(/\/$/, '');
        const ready = Boolean(/^rzp_(live|test)_[A-Za-z0-9]+$/.test(env.RAZORPAY_KEY_ID || '') && env.RAZORPAY_KEY_SECRET && env.ACCESS_SIGNING_SECRET?.length >= 32 && env.CHECKOUT_LIMITER?.limit);
        if (request.method === 'GET' && path === '/api/config') return response(200, { ready, product: PRODUCT, amount: AMOUNT, currency: CURRENCY });
        if (!ready) return response(503, { error: 'Checkout is not configured. No payment has been started.' });
        const validRoute = (request.method === 'POST' && ['/api/orders', '/api/verify'].includes(path)) || (request.method === 'GET' && path === '/api/access');
        if (!validRoute) return response(404, { error: 'Not found.' });
        try {
            const rate = await env.CHECKOUT_LIMITER.limit({ key: (request.headers.get('CF-Connecting-IP') || 'unknown') + ':' + path });
            if (!rate.success) return response(429, { error: 'Too many attempts. Please try again later.' });
            if (path === '/api/orders') {
                const order = await razorpay(env, 'orders', { amount: AMOUNT, currency: CURRENCY, receipt: 'cv_' + cryptography.randomUUID().replaceAll('-', '').slice(0, 30), notes: { product: PRODUCT } });
                if (!/^order_[A-Za-z0-9]+$/.test(order.id || '') || order.amount !== AMOUNT || order.currency !== CURRENCY) throw new Error('Invalid order response');
                const ticket = await seal({ kind: 'order', product: PRODUCT, orderId: order.id, expires: now() + 24 * 60 * 60 * 1000 }, env.ACCESS_SIGNING_SECRET);
                return response(200, { orderId: order.id, ticket, keyId: env.RAZORPAY_KEY_ID, amount: AMOUNT, currency: CURRENCY });
            }
            if (path === '/api/verify') {
                let body;
                try { body = await bodyJson(request); } catch { return response(400, { error: 'Invalid verification request.' }); }
                const ticket = await unseal(body.ticket, env.ACCESS_SIGNING_SECRET, 'order');
                if (!ticket || ticket.orderId !== body.orderId || !/^pay_[A-Za-z0-9]+$/.test(body.paymentId || '') || !/^[a-f0-9]{64}$/i.test(body.signature || '')) return response(400, { error: 'Invalid order or payment proof.' });
                const signatureBytes = Uint8Array.from(body.signature.match(/.{2}/g), value => parseInt(value, 16));
                const valid = await cryptography.subtle.verify('HMAC', await key(env.RAZORPAY_KEY_SECRET), signatureBytes, encoder.encode(ticket.orderId + '|' + body.paymentId));
                if (!valid) return response(400, { error: 'Payment signature verification failed.' });
                if (!await capturedPayment(env, body.paymentId, ticket.orderId)) return response(409, { error: 'Payment is not captured for this product, or was refunded. Check status or retry verification; do not pay twice.' });
                const token = await seal({ kind: 'access', product: PRODUCT, orderId: ticket.orderId, paymentId: body.paymentId, issued: now() }, env.ACCESS_SIGNING_SECRET);
                return response(200, { active: true, token, product: PRODUCT, amount: AMOUNT, currency: CURRENCY });
            }
            const token = request.headers.get('Authorization')?.replace(/^Bearer /, '') || '';
            const access = await unseal(token, env.ACCESS_SIGNING_SECRET, 'access');
            if (!access) return response(401, { error: 'Valid CV Studio access is required.' });
            if (!await capturedPayment(env, access.paymentId, access.orderId)) return response(403, { error: 'This purchase is not active. Contact support with your payment ID.' });
            return response(200, { active: true, product: PRODUCT, amount: AMOUNT, currency: CURRENCY });
        } catch {
            return response(502, { error: 'Payment verification is temporarily unavailable. Keep your payment ID and retry verification before making another payment.' });
        }
    };
}

export default { fetch: createHandler() };