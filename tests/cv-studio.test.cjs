const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('../cv-studio/cv-model.js');
const exporter = require('../cv-studio/cv-export.js');
const billing = require('../cv-studio/billing.js');
const readiness = require('../cv-studio/ats-review.js');
const importer = require('../cv-studio/resume-import.js');
const zip = require('../cv-studio/vendor/fflate.min.js');
const { createHmac, webcrypto } = require('node:crypto');

test('thirty-two layouts and twenty-four role starters have valid independent documents', () => {
    assert.equal(model.templates.length, 32);
    assert.equal(new Set(model.templates.map(template => template.id)).size, 32);
    assert.equal(model.roles.length, 24);
    assert.ok(model.templates.filter(template => template.layout === 'single').length >= 12);
    for (const role of model.roles) {
        const resume = model.starter(role.id);
        assert.equal(resume.role, role.id);
        assert.equal(resume.example, true);
        assert.deepEqual(model.normalizeResume(resume), resume);
        assert.ok(model.plainText(resume).includes(role.project));
        assert.ok(resume.sections.find(section => section.kind === 'projects').items.length >= 2);
        assert.ok(resume.sections.find(section => section.kind === 'experience').items[0].bullets.length >= 3);
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
    resume.basics.name = '../../Yasir / Sharfi';
    assert.equal(exporter.filename(resume, 'pdf'), 'yasir-sharfi-cv.pdf');
});

test('template examples use distinct roles and Yasir Sharfi as the sample identity', () => {
    const starters = model.templates.map(template => model.starterForTemplate(template.id));
    assert.ok(new Set(starters.map(resume => resume.role)).size >= 12);
    for (const resume of starters) {
        assert.equal(resume.basics.name, 'Yasir Sharfi');
        assert.equal(resume.role, model.findTemplate(resume.template).role);
        assert.ok(model.plainText(resume).includes(model.findRole(resume.role).project));
    }
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
    assert.match(section, /Razorpay checkout/);
    assert.match(section, /view=ats/);
    assert.match(section, /&#8377;9/);
    assert.ok(homepage.includes('id="careerToolsButton"'));
    assert.ok(homepage.includes('id="careerOrdersDialog"'));
    assert.ok(homepage.includes('id="bookingBadge"'));
    for (const destination of ['sheets/dsa.html', 'sheets/system-design.html', 'sheets/behavioral.html', 'guides/']) {
        assert.ok(homepage.includes('href="' + destination + '"'), destination + ' remains available');
    }
});

test('CV Studio explicitly selects the existing browser checkout with the same public merchant key', () => {
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
    assert.equal(scope.window.CV_STUDIO_CONFIG.checkoutMode, 'razorpay');
    assert.equal(scope.window.CV_STUDIO_CONFIG.publicKey, publicKey);
    const studio = readFileSync(join(__dirname, '../cv-studio/index.html'), 'utf8');
    assert.ok(studio.includes('href="../#cv-studio"'), 'Editor links back to its website product section');
});

test('template search composes experience, role, photo, and layout filters', () => {
    assert.equal(new Set(model.templates.map(template => template.role)).size, 24);
    assert.ok(model.searchTemplates({ query: 'fresher' }).length >= 3);
    assert.ok(model.searchTemplates({ query: 'manager', level: 'manager' }).length >= 2);
    assert.equal(model.searchTemplates({ photo: true }).length, 4);
    assert.ok(model.searchTemplates({ query: 'overleaf' }).every(template => template.source === 'bajaj'));
    assert.equal(model.searchTemplates({ role: 'graduate', level: 'manager' }).length, 0);
    assert.ok(model.searchTemplates({ role: 'designer', photo: true })[0]);
    assert.equal(model.starterForTemplate('project-first').sections[1].kind, 'projects');
});

test('photo data stays local and recognized untouched legacy samples migrate safely', () => {
    const document = model.starter();
    document.basics.photo = 'https://tracking.example.com/photo.jpg';
    assert.throws(() => model.normalizeResume(document), /local PNG or JPEG/);
    document.basics.photo = 'data:image/svg+xml;base64,PHN2Zz4=';
    assert.throws(() => model.normalizeResume(document), /local PNG or JPEG/);
    document.basics.photo = '';
    document.basics.name = 'Alex Morgan';
    document.basics.email = 'alex@example.com';
    assert.equal(model.normalizeResume(document).basics.name, 'Yasir Sharfi');
    document.example = false;
    assert.equal(model.normalizeResume(document).basics.name, 'Alex Morgan');
});

test('licensed template exports preserve attribution and use only the selected CV content', () => {
    const document = model.starterForTemplate('bajaj-clean');
    document.basics.name = 'Yasir & Sharfi';
    const files = exporter.projectFiles(document);
    assert.ok(files['resume.tex'].includes('Yasir \\& Sharfi'));
    assert.ok(files['resume.tex'].includes('\\resumeHeading'));
    assert.ok(files['resume.tex'].includes('\\usepackage{fontspec}'));
    assert.ok(files['LICENSE-template.txt'].includes('Copyright (c) 2026 Sourabh Bajaj'));
    assert.ok(!files['resume.tex'].includes('Coursera'));
    assert.equal(JSON.parse(files['cv-studio.json']).basics.name, 'Yasir & Sharfi');
});

test('community PDF layout keeps contacts single when the headline is omitted', () => {
    const document = model.starterForTemplate('bajaj-clean');
    document.basics.headline = '';
    const heading = exporter.pdfDefinition(document).content[0].columns;
    assert.equal(heading[0].stack.length, 1);
    assert.equal(heading[0].stack[0].text, 'Yasir Sharfi');
    assert.ok(!JSON.stringify(heading[0]).includes(document.basics.email));
    assert.ok(JSON.stringify(heading[1]).includes(document.basics.email));
});

function reviewFixture(overrides = {}) {
    return { text: model.plainText(model.starter('backend')).replaceAll('Sample Product Co.', 'Northstar Labs Ltd.').replaceAll('Sample Institute of Technology', 'City Technical University').replaceAll('example.com', 'candidate.test'), role: 'backend', company: 'general', jobText: 'Backend role requiring Python, PostgreSQL, APIs, testing, Docker, and Kubernetes for reliable services.', source: { kind: 'pdf', name: 'candidate.pdf', bytes: 48000, pages: 1, columns: false, hasImages: false }, ...overrides };
}

test('readiness review rejects unreadable or unsupported-language input before purchase', () => {
    assert.throws(() => readiness.analyze({ text: '' }), /Not enough readable/);
    assert.throws(() => readiness.analyze({ text: 'image-only CV' }), /Not enough readable/);
    assert.throws(() => readiness.analyze({ text: 'x '.repeat(40000) }), /75,000/);
    assert.throws(() => readiness.analyze({ text: '\u4e2d\u6587 '.repeat(80) }), /English-language/);
    assert.throws(() => readiness.analyze(reviewFixture({ jobText: 'tiny' })), /fuller job description/);
});

test('job-term matching respects boundaries, technology punctuation, and supported aliases', () => {
    assert.equal(readiness.containsTerm('JavaScript', 'Java'), false);
    assert.equal(readiness.containsTerm('Google', 'Go'), false);
    assert.equal(readiness.containsTerm('C++ and C# with .NET', 'C++'), true);
    assert.equal(readiness.containsTerm('C++ and C# with .NET', 'C#'), true);
    assert.equal(readiness.containsTerm('C++ and C# with .NET', '.NET'), true);
    assert.equal(readiness.containsTerm('Postgres and K8s', 'PostgreSQL'), true);
    assert.equal(readiness.containsTerm('abc', '[abc]'), false);
    const coverage = readiness.keywordCoverage(reviewFixture());
    assert.ok(coverage.matched.includes('Python'));
    assert.ok(coverage.missing.includes('Kubernetes'));
});

test('readiness results expose points and limitations without fabricating employer scoring', () => {
    const report = readiness.analyze(reviewFixture());
    assert.ok(report.score >= 65 && report.score <= 100);
    assert.equal(report.eligibleForPurchase, true);
    assert.equal(report.score, Math.round(report.earned / report.available * 100));
    const company = readiness.analyze(reviewFixture({ company: 'microsoft' }));
    assert.equal(company.score, report.score);
    assert.notEqual(company.guidance.company, report.guidance.company);
    assert.match(report.limitation, /not an employer ATS result/i);
    assert.ok(report.references.every(reference => reference.url.startsWith('https://')));
    const sample = readiness.analyze({ text: model.plainText(model.starter()), role: 'backend' });
    assert.equal(sample.sampleDetected, true);
    assert.equal(sample.eligibleForPurchase, false);
    const generic = readiness.analyze(reviewFixture({ jobText: '', source: { kind: 'text' } }));
    assert.equal(generic.coverage.percent, null);
    assert.equal(generic.checks.find(check => check.id === 'columns').status, 'not-assessed');
});

test('readiness evidence cannot be earned by repeated lines or a skills-only buzzword list', () => {
    const repeated = 'Built an API service and verified the workflow with automated tests.';
    const input = reviewFixture({ text: 'Taylor Morgan\ntaylor@candidate.test\nExperience\n2023 - Present\n' + Array(8).fill(repeated).join('\n') + '\nSkills\nBuilt designed implemented API systems improved reliability verified testing Python PostgreSQL Docker Kubernetes' });
    const report = readiness.analyze(input);
    for (const id of ['actions', 'context', 'outcomes']) assert.equal(report.checks.find(check => check.id === id).points, 0);
    assert.match(report.checks.find(check => check.id === 'actions').detail, /^1 distinct/);
    const improved = readiness.analyze({ ...input, text: input.text.replace('\nSkills', '\nDiagnosed a database query bottleneck and measured lower latency under the same test workload.\nSkills') });
    assert.equal(improved.checks.find(check => check.id === 'outcomes').points, 8);
    assert.ok(improved.score > report.score);
    const skillsOnly = readiness.analyze({ ...input, text: input.text.replace('Experience', 'Professional Summary') });
    assert.equal(skillsOnly.checks.find(check => check.id === 'actions').points, 0);
});

test('readiness improvement plans prioritize real gaps and distinguish optional personal fields', () => {
    const input = reviewFixture({ text: 'Taylor Morgan\nBackend Engineer\nExperience\nService Engineer, Northstar Labs, 2022-Present\nResponsible for maintaining a service used by the team every day.\nWorked on updating the database and preparing operational reports for the support team.\nSkills\nPython, PostgreSQL, Docker, Linux, Git, APIs, testing\nEducation\nDiploma in Software Engineering, City Technical College, 2021' });
    const report = readiness.analyze(input);
    const plan = readiness.improvementPlan(report);
    assert.equal(plan.rating, 'Resolve core information first');
    assert.ok(plan.priorities.some(item => item.id === 'email' && item.importance === 'important' && item.action.includes('contact')));
    assert.ok(plan.fields.some(item => item.title.includes('photo') && item.importance === 'optional'));
    assert.ok(report.revisions.some(item => item.before.includes('Responsible for')));
    assert.ok(report.revisions.every(item => item.prompt.includes('facts you can support')));
    const old = { ...report };
    delete old.rulesVersion;
    delete old.revisions;
    assert.ok(readiness.reportDefinition(old));
    assert.ok(JSON.stringify(readiness.reportDefinition(report).content).includes('Priority improvements'));
});

test('a review purchase fingerprint follows document and target changes but not a filename change', async () => {
    const initial = await readiness.fingerprint(reviewFixture(), webcrypto);
    assert.equal(initial.length, 64);
    assert.equal(await readiness.fingerprint(reviewFixture({ source: { kind: 'pdf', name: 'renamed.pdf', bytes: 48000, pages: 1, columns: false, hasImages: false } }), webcrypto), initial);
    assert.notEqual(await readiness.fingerprint(reviewFixture({ company: 'amazon' }), webcrypto), initial);
    assert.notEqual(await readiness.fingerprint(reviewFixture({ text: reviewFixture().text + '\nImplemented a new reliability test suite.' }), webcrypto), initial);
    const report = readiness.analyze(reviewFixture());
    assert.ok(JSON.stringify(readiness.reportDefinition(report).content).includes('not an employer ATS result'));
});

test('digital checkout fixes INR 49 and INR 9 prices, separates receipts, and never adds a calendar', async () => {
    const values = new Map();
    const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
    const publicKey = 'rzp_test_DigitalProducts';
    const templates = billing.createDigitalClient({ publicKey, storage });
    const scope = 'a'.repeat(64);
    const review = billing.createDigitalClient({ productId: 'cv-readiness-v1', scope, publicKey, storage });
    await templates.init();
    await review.init();
    const templateOrder = await templates.order();
    const reviewOrder = await review.order();
    assert.equal(templateOrder.amount, 4900);
    assert.equal(reviewOrder.amount, 900);
    const options = billing.checkoutOptions(reviewOrder, review.product, 'buyer@example.test', () => {}, () => {});
    assert.equal(options.amount, 900);
    assert.equal(options.notes.product_id, 'cv-readiness-v1');
    assert.equal(Object.hasOwn(options, 'order_id'), false);
    assert.equal(Object.hasOwn(options.notes, 'date'), false);
    assert.equal(Object.hasOwn(options.notes, 'time'), false);
    await assert.rejects(templates.paid({ ...templateOrder, amount: 900 }, { razorpay_payment_id: 'pay_Templates123' }), /selected product/);
    await templates.paid(templateOrder, { razorpay_payment_id: 'pay_Templates123' });
    await templates.authorize();
    await assert.rejects(review.authorize(), /Purchase this digital product/);
    await assert.rejects(review.restoreAccess(templates.accessReceipt()), /different product/);
    await review.paid(reviewOrder, { razorpay_payment_id: 'pay_Review123' });
    assert.equal(review.state.active, true);
    const another = billing.createDigitalClient({ productId: 'cv-readiness-v1', scope: 'b'.repeat(64), publicKey, storage });
    await assert.rejects(another.restoreAccess(review.accessReceipt()), /different product/);
    const restored = billing.createDigitalClient({ productId: 'cv-readiness-v1', scope, publicKey, storage });
    await restored.init();
    assert.equal(restored.state.active, true);
    assert.equal(restored.accessReceipt().mode, 'razorpay-browser');
});

test('incomplete browser payment callbacks do not unlock or request another payment', async () => {
    const client = billing.createDigitalClient({ publicKey: 'rzp_test_DigitalProducts' });
    await client.init();
    const order = await client.order();
    await assert.rejects(client.paid(order, {}), /payment reference/);
    assert.equal(client.state.active, false);
    assert.equal(client.hasPending(), true);
    await assert.rejects(client.order(), /Do not pay again/);
});

test('digital purchase records remain separate from existing calendar bookings', async () => {
    const values = new Map([['yas_bookings', '[{"id":1,"service":"Existing mentoring"}]']]);
    const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) };
    const client = billing.createDigitalClient({ publicKey: 'rzp_test_DigitalProducts', storage });
    await client.init();
    await client.paid(await client.order(), { razorpay_payment_id: 'pay_DigitalRecord' });
    const receipt = client.accessReceipt();
    billing.recordDigitalPurchase(receipt, {}, storage);
    billing.recordDigitalPurchase(receipt, {}, storage);
    assert.equal(JSON.parse(values.get('yas_digital_orders')).length, 1);
    assert.equal(values.get('yas_bookings'), '[{"id":1,"service":"Existing mentoring"}]');
    values.set('yas_digital_orders', 'corrupt-data');
    assert.equal(billing.recordDigitalPurchase(receipt, {}, storage), false);
    assert.equal(values.get('yas_digital_orders'), 'corrupt-data');
});

test('resume uploads reject unsupported files and bounded DOCX archives before extraction', () => {
    assert.equal(importer.inspectFile({ name: 'Resume.PDF', size: 100 }).kind, 'pdf');
    assert.throws(() => importer.inspectFile({ name: 'scan.png', size: 100 }), /PDF, DOCX, and TXT/);
    assert.throws(() => importer.inspectFile({ name: 'huge.pdf', size: 6000000 }), /5 MB/);
    assert.throws(() => importer.inspectFile({ name: 'empty.docx', size: 0 }), /nonempty/);
    const makeDocx = extra => zip.zipSync({ '[Content_Types].xml': zip.strToU8('<Types/>'), 'word/document.xml': zip.strToU8('<document>Resume text</document>'), ...extra });
    const valid = importer.inspectDocx(makeDocx({ 'word/media/photo.png': new Uint8Array([1, 2, 3]), 'word/header1.xml': zip.strToU8('<header/>') }));
    assert.equal(valid.hasImages, true);
    assert.equal(valid.hasHeaders, true);
    assert.throws(() => importer.inspectDocx(makeDocx({ '../escape.xml': zip.strToU8('bad') })), /Unsafe/);
    assert.throws(() => importer.inspectDocx(makeDocx({ 'word/vbaProject.bin': new Uint8Array([1]) })), /macro/);
    assert.throws(() => importer.inspectDocx(makeDocx({ 'word/large.xml': zip.strToU8('x'.repeat(2000000)) })), /safe review limit/);
    assert.throws(() => importer.inspectDocx(new Uint8Array(50)), /valid DOCX/);
});