const test = require('node:test');
const assert = require('node:assert/strict');
const history = require('../assets/order-history.js');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHmac, webcrypto } = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

function storageFixture(initial = []) {
    const values = new Map(initial);
    return { values, get length() { return values.size; }, key: index => [...values.keys()][index] || null, getItem: key => values.has(key) ? values.get(key) : null, setItem: (key, value) => values.set(key, value) };
}
const order = (paymentId, overrides = {}) => ({ paymentId, productId: 'cv-studio-v1', product: 'CV Studio', amount: 4900, currency: 'INR', createdAt: '2026-09-21T10:00:00Z', ...overrides });

test('order history is additive, idempotent, and independent across tabs and reloads', () => {
    const storage = storageFixture();
    const first = history.createLedger({ storage });
    const otherTab = history.createLedger({ storage });
    assert.equal(first.record(order('pay_FirstOrder')), true);
    assert.equal(otherTab.record(order('pay_FirstOrder')), false);
    assert.equal(otherTab.record(order('pay_SecondOrder', { productId: 'cv-readiness-v1', product: 'ATS review', amount: 900 })), true);
    assert.equal(first.entries().length, 2);
    assert.equal(history.createLedger({ storage }).entries().length, 2);
    assert.equal(first.record(order('not-a-payment')), false);
    assert.equal(first.record(order('pay_UnpaidOrder', { amount: 0 })), false);
    assert.equal(Object.hasOwn(first, 'clear'), false);
    assert.equal(Object.hasOwn(first, 'remove'), false);
});

test('legacy bookings, digital products, and courses migrate without altering originals', () => {
    const legacy = JSON.stringify([{ paymentId: 'pay_Booking123', service: 'Mentoring', amount: 499, booked: '2026-09-20T10:00:00Z' }]);
    const storage = storageFixture([
        ['yas_bookings', legacy],
        ['yas_digital_orders', JSON.stringify([{ paymentId: 'pay_Digital123', product: 'cv-studio-v1', service: 'CV Studio', amount: 49, purchasedAt: '2026-09-21T10:00:00Z' }])],
        ['yasir-course-access-v1:faang', JSON.stringify({ version: 1, courseId: 'faang', paymentId: 'pay_Course123', purchasedAt: '2026-09-21T10:00:00Z' })]
    ]);
    const ledger = history.createLedger({ storage });
    ledger.migrate();
    ledger.migrate();
    assert.equal(ledger.entries().length, 3);
    assert.equal(storage.getItem('yas_bookings'), legacy);
    assert.deepEqual(ledger.entries().map(value => value.amount).sort((left, right) => left - right), [4900, 4900, 49900]);
    storage.setItem('yas_bookings', '[]');
    assert.equal(ledger.entries().length, 3);
});

test('corrupt and unavailable storage never clears previously saved purchase evidence', () => {
    const key = history.prefix + 'pay_Damaged123';
    const storage = storageFixture([[key, 'corrupt-json'], ['yas_bookings', 'invalid-json']]);
    const ledger = history.createLedger({ storage });
    ledger.migrate();
    ledger.record(order('pay_Damaged123'));
    assert.equal(storage.getItem(key), 'corrupt-json');
    assert.equal(storage.getItem('yas_bookings'), 'invalid-json');
    assert.ok(ledger.warnings().length > 0);
    const temporary = history.createLedger();
    temporary.record(order('pay_NoStorage123'));
    assert.equal(temporary.entries().length, 1);
    assert.ok(temporary.warnings().length > 0);
    const target = history.createLedger({ storage: storageFixture() });
    assert.equal(target.restore(temporary.backup()), 1);
    assert.equal(target.restore(temporary.backup()), 0);
    assert.throws(() => target.restore({ version: 1, orders: [order('invalid')] }), /payment reference/);
});

test('every checkout records cumulative history and the homepage has no deletion or music controls', () => {
    for (const file of ['index.html', 'cv-studio/index.html', 'sheets/dsa.html', 'sheets/system-design.html', 'sheets/behavioral.html', 'sheets/course.html']) {
        const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
        assert.ok(html.includes('order-config.js'), file);
        assert.ok(html.includes('order-history.js'), file);
        for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) if (match[1].trim()) new vm.Script(match[1]);
    }
    for (const file of ['index.html', 'cv-studio/billing.js', 'assets/course-page.js', 'sheets/dsa.html', 'sheets/system-design.html', 'sheets/behavioral.html']) {
        const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
        assert.ok(source.includes('recordPurchase('), file);
        assert.ok(source.includes("site_id: 'yasir-portfolio'"), file);
    }
    const home = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
    assert.ok(!/clearAllTrackedBookings|removeTrackedBooking|bgmusic|music-toggle|<audio\b/i.test(home));
    assert.ok(!fs.existsSync(path.join(__dirname, '..', 'bgmusic.mp3')));
});

test('shared counter never adds browser claims or decreases on stale responses', async () => {
    const ledger = history.createLedger({ storage: storageFixture() });
    ledger.record(order('pay_LocalOnly123'));
    let response = { version: 1, siteId: history.siteId, count: 12 };
    let failed = false;
    const counter = history.createCounter({ ledger, apiBase: 'https://orders.example.test', fetcher: async () => { if (failed) throw Error('offline'); return Response.json(response); } });
    assert.equal(counter.state().count, null);
    assert.equal((await counter.refresh()).count, 12);
    response = { ...response, count: 10 };
    assert.equal((await counter.refresh()).count, 12);
    failed = true;
    const state = await counter.refresh();
    assert.equal(state.count, 12);
    assert.equal(state.stale, true);
    assert.equal(state.localCount, 1);
    assert.equal(history.createCounter({ ledger }).state().scope, 'device');
    assert.equal(history.createCounter({ ledger }).state().count, 1);
    assert.equal(history.validBase('http://orders.example.test'), '');
});

test('signed captured payment events create one immutable shared order without exposing private data', async () => {
    const { createHandler } = await import('../orders/api/worker.mjs');
    const database = new DatabaseSync(':memory:');
    database.exec(fs.readFileSync(path.join(__dirname, '../orders/api/schema.sql'), 'utf8'));
    const env = { WEBHOOK_SECRET: 'synthetic-webhook-secret-not-a-real-credential', ALLOWED_ORIGINS: 'https://yasirgrc08-techie.github.io', ORDERS_DB: { prepare: sql => ({ bind: (...values) => ({ run: async () => database.prepare(sql).run(...values), first: async () => database.prepare(sql).get(...values) }) }) } };
    const handler = createHandler({ cryptography: webcrypto });
    const payload = { event: 'payment.captured', payload: { payment: { entity: { id: 'pay_Verified123', order_id: 'order_Checkout123', status: 'captured', captured: true, amount: 4900, currency: 'INR', created_at: 1789984800, email: 'private@candidate.test', notes: { site_id: history.siteId, product_id: 'cv-studio-v1' } } } } };
    const webhook = (value, secret = env.WEBHOOK_SECRET) => {
        const body = JSON.stringify(value);
        return new Request('https://orders.example.test/api/orders/webhook', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Razorpay-Signature': createHmac('sha256', secret).update(body).digest('hex') }, body });
    };
    const summary = () => handler(new Request('https://orders.example.test/api/orders/summary', { headers: { Origin: env.ALLOWED_ORIGINS } }), env);
    try {
        assert.equal((await handler(webhook(payload, 'not-the-secret'), env)).status, 401);
        assert.equal((await summary()).status, 200);
        assert.equal((await (await summary()).json()).count, 0);
        const outcomes = await Promise.all([handler(webhook(payload), env), handler(webhook(payload), env)]);
        assert.ok(outcomes.every(response => response.status === 200));
        assert.equal((await (await summary()).json()).count, 1);
        const secondAttempt = structuredClone(payload);
        secondAttempt.payload.payment.entity.id = 'pay_SameOrder456';
        await handler(webhook(secondAttempt), env);
        assert.equal((await (await summary()).json()).count, 1);
        const another = structuredClone(payload);
        another.payload.payment.entity.id = 'pay_Another456';
        another.payload.payment.entity.order_id = null;
        another.payload.payment.entity.notes.product_id = 'sheet-behavioral';
        await handler(webhook(another), env);
        assert.equal((await (await summary()).json()).count, 2);
        assert.equal((await handler(webhook({ ...payload, event: 'refund.processed' }), env)).status, 200);
        assert.equal((await (await summary()).json()).count, 2);
        const result = await (await summary()).json();
        assert.ok(!JSON.stringify(result).includes('private@'));
        const stored = database.prepare('SELECT * FROM paid_orders').all();
        assert.ok(!JSON.stringify(stored).includes('private@'));
        assert.throws(() => database.exec('DELETE FROM paid_orders'), /append-only/);
        assert.throws(() => database.exec('UPDATE paid_orders SET amount_minor = 1'), /append-only/);
        assert.equal((await handler(new Request('https://orders.example.test/api/orders/summary', { method: 'POST' }), env)).status, 405);
        assert.equal((await handler(new Request('https://orders.example.test/api/orders/summary', { headers: { Origin: 'https://untrusted.test' } }), env)).status, 403);
        assert.equal((await handler(webhook(payload), { ...env, WEBHOOK_SECRET: '' })).status, 503);
        assert.equal((await handler(new Request('https://orders.example.test/api/orders/webhook', { method: 'POST', body: 'x'.repeat(262145) }), env)).status, 413);
    } finally { database.close(); }
});