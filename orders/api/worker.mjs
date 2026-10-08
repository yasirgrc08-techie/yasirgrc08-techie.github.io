const siteId = 'yasir-portfolio';
const maximumBody = 256 * 1024;

async function bodyBytes(request) {
    if (Number(request.headers.get('content-length')) > maximumBody) throw new Error('body-limit');
    const reader = request.body?.getReader();
    if (!reader) return new Uint8Array();
    const chunks = [];
    let length = 0;
    for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        length += value.length;
        if (length > maximumBody) { await reader.cancel(); throw new Error('body-limit'); }
        chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return bytes;
}

async function signed(bytes, signature, secret, cryptography) {
    if (typeof secret !== 'string' || secret.length < 24 || !/^[a-f0-9]{64}$/i.test(signature || '')) return false;
    const key = await cryptography.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const proof = Uint8Array.from(signature.match(/../g), pair => Number.parseInt(pair, 16));
    return cryptography.subtle.verify('HMAC', key, proof, bytes);
}

export function createHandler({ cryptography = globalThis.crypto } = {}) {
    return async function handle(request, env) {
        const url = new URL(request.url);
        const origin = request.headers.get('Origin');
        const allowed = new Set(String(env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean));
        const cors = origin && allowed.has(origin) ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, OPTIONS', Vary: 'Origin' } : {};
        const reply = (value, status = 200) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...cors } });
        if (url.pathname === '/api/orders/summary') {
            if (origin && !allowed.has(origin)) return reply({ error: 'Origin not allowed' }, 403);
            if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
            if (request.method !== 'GET') return reply({ error: 'Read-only endpoint' }, 405);
            if (!env.ORDERS_DB) return reply({ error: 'Order database is not configured' }, 503);
            try {
                const value = await env.ORDERS_DB.prepare('SELECT COUNT(*) AS count, MAX(recorded_at) AS lastOrderAt FROM paid_orders WHERE site_id = ?').bind(siteId).first();
                return reply({ version: 1, siteId, count: Number(value.count), lastOrderAt: value.lastOrderAt || null });
            } catch { return reply({ error: 'Order total is temporarily unavailable' }, 503); }
        }
        if (url.pathname !== '/api/orders/webhook') return reply({ error: 'Not found' }, 404);
        if (request.method !== 'POST') return reply({ error: 'POST required' }, 405);
        if (!env.ORDERS_DB || typeof env.WEBHOOK_SECRET !== 'string' || env.WEBHOOK_SECRET.length < 24) return reply({ error: 'Webhook is not configured' }, 503);
        let bytes;
        try { bytes = await bodyBytes(request); }
        catch { return reply({ error: 'Webhook body exceeds the limit' }, 413); }
        try {
            const signature = request.headers.get('X-Razorpay-Signature');
            if (!await signed(bytes, signature, env.WEBHOOK_SECRET, cryptography) && !await signed(bytes, signature, env.WEBHOOK_SECRET_PREVIOUS, cryptography)) return reply({ error: 'Invalid webhook signature' }, 401);
            let event;
            try { event = JSON.parse(new TextDecoder().decode(bytes)); }
            catch { return reply({ error: 'Invalid JSON' }, 400); }
            if (event.event !== 'payment.captured') return reply({ accepted: false, reason: 'Only captured payments add to the lifetime total' });
            const payment = event.payload?.payment?.entity;
            if (payment?.notes?.site_id !== siteId) return reply({ accepted: false, reason: 'Not a payment for this site' });
            if (payment.status !== 'captured' || payment.captured !== true || !/^pay_[A-Za-z0-9]{6,40}$/.test(payment.id || '') || !Number.isSafeInteger(payment.amount) || payment.amount <= 0 || payment.amount > 100000000 || payment.currency !== 'INR' || !Number.isSafeInteger(payment.created_at) || payment.created_at <= 0 || !/^[a-z0-9][a-z0-9-]{0,99}$/.test(payment.notes.product_id || '') || (payment.order_id && !/^order_[A-Za-z0-9]{6,40}$/.test(payment.order_id))) return reply({ error: 'Invalid captured payment data' }, 400);
            const orderKey = payment.order_id || payment.id;
            await env.ORDERS_DB.prepare('INSERT INTO paid_orders (order_key, payment_id, site_id, product_id, amount_minor, currency, provider_created_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT DO NOTHING').bind(orderKey, payment.id, siteId, payment.notes.product_id, payment.amount, payment.currency, payment.created_at).run();
            return reply({ accepted: true });
        } catch { return reply({ error: 'The payment was not acknowledged; retry delivery' }, 503); }
    };
}

export default { fetch: createHandler() };