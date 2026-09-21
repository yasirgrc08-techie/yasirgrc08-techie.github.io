const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('../cv-studio/cv-model.js');
const exporter = require('../cv-studio/cv-export.js');
const billing = require('../cv-studio/billing.js');
const { createHmac, webcrypto } = require('node:crypto');

test('sixteen original layouts and twelve role starters have valid independent documents', () => {
    assert.equal(model.templates.length, 16);
    assert.equal(new Set(model.templates.map(template => template.id)).size, 16);
    assert.equal(model.roles.length, 12);
    assert.ok(model.templates.filter(template => template.layout === 'single').length >= 12);
    for (const role of model.roles) {
        const resume = model.starter(role.id);
        assert.equal(resume.role, role.id);
        assert.equal(resume.example, true);
        assert.deepEqual(model.normalizeResume(resume), resume);
        assert.ok(model.plainText(resume).includes(role.project));
    }
});

test('template changes preserve all content and the original object', () => {
    const original = model.starter();
    const snapshot = JSON.stringify(original);
    for (const template of model.templates) {
        const next = model.applyTemplate(original, template.id);
        assert.equal(next.template, template.id);
        assert.deepEqual(next.basics, original.basics);
        assert.deepEqual(next.sections, original.sections);
    }
    assert.equal(JSON.stringify(original), snapshot);
});

test('imports reject malformed, duplicate, unsupported, and excessive fields', () => {
    assert.throws(() => model.normalizeResume({}), /version 1/);
    assert.throws(() => model.normalizeResume({ ...model.starter(), sections: [model.newSection('summary'), model.newSection('summary')] }), /unique/);
    const resume = model.starter();
    resume.basics.name = { unexpected: true };
    assert.throws(() => model.normalizeResume(resume), /Text fields/);
    const huge = model.starter();
    huge.sections[0].content = 'x'.repeat(3501);
    assert.throws(() => model.normalizeResume(huge), /3500/);
    const settings = model.normalizeResume({ ...model.starter(), settings: { fontSize: 100, accent: 'url(https://example.com)' } });
    assert.equal(settings.settings.fontSize, 10);
    assert.equal(settings.settings.accent, '#176b5b');
});

test('links allow only sensible public web destinations', () => {
    assert.equal(model.safeLink('example.com/profile'), 'https://example.com/profile');
    assert.equal(model.safeLink('javascript:alert(1)'), null);
    assert.equal(model.safeLink('file:///etc/passwd'), null);
    assert.equal(model.safeLink('https://user:password@example.com'), null);
    assert.equal(model.safeLink('data:text/html,test'), null);
});

test('review distinguishes sample information, missing contacts, and local word overlap', () => {
    assert.ok(model.review(model.starter()).findings.some(item => item.title === 'Replace example information'));
    const blank = model.starter('backend', true);
    assert.ok(model.review(blank).findings.some(item => item.title === 'Add your name'));
    const review = model.review(model.starter(), 'PostgreSQL Kubernetes experience');
    assert.ok(review.matched.includes('postgresql'));
    assert.ok(review.missing.includes('kubernetes'));
    assert.equal(Object.hasOwn(review, 'atsScore'), false);
});

test('PDF definitions preserve text for every template and exclude hidden sections', () => {
    for (const template of model.templates) {
        const resume = model.applyTemplate(model.starter('backend'), template.id);
        const definition = exporter.pdfDefinition(resume);
        const content = JSON.stringify(definition.content);
        assert.ok(content.includes(resume.basics.name));
        assert.ok(content.includes(model.findRole('backend').project));
        assert.equal(definition.pageSize, 'A4');
        assert.equal(definition.defaultStyle.font, resume.settings.font);
    }
    const resume = model.starter();
    resume.sections.find(section => section.kind === 'projects').visible = false;
    assert.ok(!JSON.stringify(exporter.pdfDefinition(resume).content).includes('Reliable Task Service'));
});

test('LaTeX output escapes user text instead of executing raw commands', () => {
    const resume = model.starter();
    resume.basics.name = 'A&B_Research % #1';
    resume.sections[0].content = '\\input{private} $formula$';
    const source = exporter.latex(resume);
    assert.ok(source.includes('A\\&B\\_Research \\% \\#1'));
    assert.ok(source.includes('\\textbackslash{}input\\{private\\}'));
    assert.ok(!source.includes('\\input{private}'));
    assert.ok(source.includes('\\usepackage{fontspec}'));
    assert.ok(source.endsWith('\\end{document}\n'));
});

test('export filenames cannot escape the download name', () => {
    const resume = model.starter();
    resume.basics.name = '../../Alex / Morgan';
    assert.equal(exporter.filename(resume, 'pdf'), 'alex-morgan-cv.pdf');
});

test('checkout is disabled without a verified backend, regardless of browser storage', async () => {
    let requests = 0;
    const client = billing.createClient({ storage: { getItem: () => 'forged-access' }, fetcher: async () => { requests++; throw new Error('Should not call'); } });
    await client.init();
    assert.equal(client.state.ready, false);
    assert.equal(client.state.active, false);
    await assert.rejects(client.order(), /not configured/);
    await assert.rejects(client.authorize(), /not configured/);
    assert.equal(requests, 0);
    assert.equal(billing.validBase('http://payments.example.com', 'yasirgrc08-techie.github.io'), '');
});

test('payment API fixes the price, verifies signatures, captured status and product, and rejects forged access', async () => {
    const { createHandler } = await import('../cv-studio/api/worker.mjs');
    let refunded = false;
    let captured = true;
    let product = 'cv-studio-v1';
    const env = { ALLOWED_ORIGINS: 'https://yasirgrc08-techie.github.io', RAZORPAY_KEY_ID: 'rzp_test_Example', RAZORPAY_KEY_SECRET: 'test-provider-secret', ACCESS_SIGNING_SECRET: 'test-access-signing-secret-at-least-32-characters', CHECKOUT_LIMITER: { limit: async () => ({ success: true }) } };
    const handler = createHandler({ cryptography: webcrypto, fetcher: async (url, options) => {
        if (url.endsWith('/orders') && options.method === 'POST') {
            const body = JSON.parse(options.body);
            assert.equal(body.amount, 4900);
            assert.equal(body.notes.product, 'cv-studio-v1');
            return Response.json({ id: 'order_Test123', amount: 4900, currency: 'INR' });
        }
        if (url.includes('/payments/')) return Response.json({ id: 'pay_Test123', order_id: 'order_Test123', status: captured ? 'captured' : 'authorized', captured, amount: 4900, currency: 'INR', amount_refunded: refunded ? 4900 : 0 });
        return Response.json({ id: 'order_Test123', amount: 4900, currency: 'INR', notes: { product } });
    } });
    const request = (path, body, token) => new Request('https://payments.example.com' + path, { method: body ? 'POST' : 'GET', headers: { Origin: env.ALLOWED_ORIGINS, 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
    assert.equal((await handler(new Request('https://payments.example.com/api/config'), env)).status, 403);
    const orderResponse = await handler(request('/api/orders', { amount: 1 }), env);
    assert.equal(orderResponse.status, 200);
    const order = await orderResponse.json();
    const proof = { ticket: order.ticket, orderId: order.orderId, paymentId: 'pay_Test123', signature: createHmac('sha256', env.RAZORPAY_KEY_SECRET).update('order_Test123|pay_Test123').digest('hex') };
    assert.equal((await handler(request('/api/verify', { ...proof, signature: '0'.repeat(64) }), env)).status, 400);
    captured = false;
    assert.equal((await handler(request('/api/verify', proof), env)).status, 409);
    captured = true;
    product = 'another-product';
    assert.equal((await handler(request('/api/verify', proof), env)).status, 409);
    product = 'cv-studio-v1';
    const verified = await handler(request('/api/verify', proof), env);
    assert.equal(verified.status, 200);
    const access = await verified.json();
    assert.equal((await handler(request('/api/access', null, access.token), env)).status, 200);
    assert.equal((await handler(request('/api/access', null, access.token + 'tampered'), env)).status, 401);
    refunded = true;
    assert.equal((await handler(request('/api/access', null, access.token), env)).status, 403);
    assert.equal((await handler(request('/api/orders', {}), { ...env, RAZORPAY_KEY_SECRET: '' })).status, 503);
});

test('verified access receipts restore without trusting storage and authorization failures revoke the active UI state', async () => {
    const values = new Map();
    const storage = { getItem: name => values.get(name), setItem: (name, value) => values.set(name, value), removeItem: name => values.delete(name) };
    let revoked = false;
    const client = billing.createClient({ apiBase: 'https://payments.example.com', storage, fetcher: async (url, options) => {
        if (url.endsWith('/api/config')) return Response.json({ ready: true, product: 'cv-studio-v1', amount: 4900, currency: 'INR' });
        if (options.headers.Authorization !== 'Bearer signed.receipt' || revoked) return Response.json({ error: 'Access revoked.' }, { status: 403 });
        return Response.json({ active: true, product: 'cv-studio-v1', amount: 4900, currency: 'INR' });
    } });
    await client.init();
    assert.equal(client.state.active, false);
    await assert.rejects(client.restoreAccess({ version: 1, product: 'another-product', token: 'signed.receipt' }), /valid CV Studio/);
    await assert.rejects(client.restoreAccess({ version: 1, product: 'cv-studio-v1', token: 'forged.receipt' }), /revoked/);
    await client.restoreAccess({ version: 1, product: 'cv-studio-v1', token: 'signed.receipt' });
    assert.equal(client.state.active, true);
    assert.equal(client.accessReceipt().token, 'signed.receipt');
    assert.equal(values.get('cv-studio-access-v1'), 'signed.receipt');
    revoked = true;
    await assert.rejects(client.authorize(), /revoked/);
    assert.equal(client.state.active, false);
    assert.equal(client.hasAccess(), true);
});

test('pending payment proofs survive a temporary failure and prevent a second purchase', async () => {
    const values = new Map();
    let available = false;
    const client = billing.createClient({ apiBase: 'https://payments.example.com', storage: { getItem: name => values.get(name), setItem: (name, value) => values.set(name, value), removeItem: name => values.delete(name) }, fetcher: async url => {
        if (url.endsWith('/api/config')) return Response.json({ ready: true, product: 'cv-studio-v1', amount: 4900, currency: 'INR' });
        if (!available) return Response.json({ error: 'Temporarily unavailable.' }, { status: 502 });
        return Response.json({ active: true, product: 'cv-studio-v1', amount: 4900, currency: 'INR', token: 'signed.receipt' });
    } });
    await client.init();
    await assert.rejects(client.paid({ ticket: 'order.proof' }, { razorpay_order_id: 'order_Test', razorpay_payment_id: 'pay_Test', razorpay_signature: '0'.repeat(64) }), /unavailable/);
    assert.equal(client.hasPending(), true);
    assert.ok(values.has('cv-studio-pending-payment-v1'));
    await assert.rejects(client.order(), /awaiting verification/);
    available = true;
    await client.verifyPending();
    assert.equal(client.hasPending(), false);
    assert.equal(client.state.active, true);
    assert.equal(values.has('cv-studio-pending-payment-v1'), false);
});

test('homepage integrates CV Studio into navigation and a dedicated product section', () => {
    const { readFileSync } = require('node:fs');
    const { join } = require('node:path');
    const homepage = readFileSync(join(__dirname, '../index.html'), 'utf8');
    assert.match(homepage, /<li><a href="#cv-studio">CV Studio<\/a><\/li>/);
    const section = homepage.match(/<section[^>]*id="cv-studio"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section, 'CV Studio has a homepage product section');
    assert.match(section, /href="cv-studio\/"/);
    assert.match(section, /cv-studio\/previews\/classic\.png/);
    assert.match(section, /&#8377;49/);
    assert.match(section, /Checkout[^<]*pending/i);
    for (const destination of ['sheets/dsa.html', 'sheets/system-design.html', 'sheets/behavioral.html', 'guides/']) {
        assert.ok(homepage.includes('href="' + destination + '"'), destination + ' remains available');
    }
});

test('CV Studio reuses the website merchant configuration without enabling unverified checkout', () => {
    const { readFileSync } = require('node:fs');
    const { join } = require('node:path');
    const { runInNewContext } = require('node:vm');
    const homepage = readFileSync(join(__dirname, '../index.html'), 'utf8');
    const publicKey = homepage.match(/const RAZORPAY_KEY = '([^']+)'/)?.[1];
    assert.ok(publicKey, 'Existing website has a public Razorpay merchant key');
    const workerConfig = JSON.parse(readFileSync(join(__dirname, '../cv-studio/api/wrangler.jsonc'), 'utf8'));
    assert.equal(workerConfig.vars.RAZORPAY_KEY_ID, publicKey);
    assert.equal(workerConfig.vars.ALLOWED_ORIGINS, '');
    assert.equal(workerConfig.vars.RAZORPAY_KEY_SECRET, undefined);
    const scope = { window: {} };
    runInNewContext(readFileSync(join(__dirname, '../cv-studio/config.js'), 'utf8'), scope);
    assert.equal(scope.window.CV_STUDIO_CONFIG.apiBase, '');
    const studio = readFileSync(join(__dirname, '../cv-studio/index.html'), 'utf8');
    assert.ok(studio.includes('href="../#cv-studio"'), 'Editor links back to its website product section');
});