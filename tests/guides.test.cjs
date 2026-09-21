const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..', 'guides');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
const { filterGuides, guideCard, sizeLabel } = require('../guides/library.js');

test('exactly fifty unique four-page PDF guides exist with matching checksums and previews', () => {
    assert.equal(catalog.count, 50);
    assert.equal(catalog.guides.length, 50);
    assert.equal(new Set(catalog.guides.map(guide => guide.id)).size, 50);
    assert.equal(new Set(catalog.guides.map(guide => guide.category)).size, 6);
    for (const guide of catalog.guides) {
        assert.equal(guide.pages, 4);
        assert.ok(guide.wordsPerPage.every(count => count >= 150));
        assert.ok(guide.contentHeights.every(height => height <= 716));
        assert.equal(guide.pdf, 'pdfs/' + guide.id + '.pdf');
        const bytes = fs.readFileSync(path.join(root, guide.pdf));
        assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
        assert.equal(bytes.length, guide.bytes);
        assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), guide.sha256);
        assert.ok(fs.statSync(path.join(root, guide.preview)).size > 1000);
    }
    const archive = fs.readFileSync(path.join(root, catalog.archive.url));
    assert.equal(archive.length, catalog.archive.bytes);
    assert.equal(crypto.createHash('sha256').update(archive).digest('hex'), catalog.archive.sha256);
});

test('search, category, deep links, and sorting compose without changing the catalogue', () => {
    assert.equal(filterGuides(catalog.guides, { query: 'microsoft 90' })[0].id, 'microsoft-90-day-plan');
    assert.ok(filterGuides(catalog.guides, { query: 'OS' }).some(guide => guide.id === 'operating-systems-six-week-plan'));
    assert.ok(!filterGuides(catalog.guides, { query: 'OS' }).some(guide => guide.id === 'microsoft-90-day-plan'));
    assert.ok(!filterGuides(catalog.guides, { query: 'AI' }).some(guide => guide.id === 'sustainable-study-system'));
    assert.equal(filterGuides(catalog.guides, { query: 'C++' })[0].id, 'c-cpp-memory-safety');
    assert.equal(filterGuides(catalog.guides, { category: 'AI and Machine Learning' }).length, 10);
    assert.equal(filterGuides(catalog.guides, { category: 'DSA and Problem Solving', query: 'binary' }).some(guide => guide.id === 'binary-search-sorting'), true);
    assert.equal(filterGuides(catalog.guides, { guide: 'rag-prototype-to-production' }).length, 1);
    assert.equal(filterGuides(catalog.guides, { guide: 'invalid' }).length, 0);
    assert.equal(filterGuides(catalog.guides, { query: 'no-such-topic-xyz' }).length, 0);
    const originalOrder = catalog.guides.map(guide => guide.id).join(',');
    const sorted = filterGuides(catalog.guides, { sort: 'title' });
    assert.ok(sorted.every((guide, index) => !index || sorted[index - 1].title.localeCompare(guide.title) <= 0));
    assert.equal(catalog.guides.map(guide => guide.id).join(','), originalOrder);
});

test('all cards link to actual PDFs and keep text escaped', () => {
    for (const guide of catalog.guides) {
        const card = guideCard(guide);
        assert.ok(card.includes('href="' + guide.pdf + '"'));
        assert.ok(card.includes(' download'));
        assert.ok(card.includes('data-share="' + guide.id + '"'));
    }
    assert.ok(guideCard({ ...catalog.guides[0], title: '<script>bad</script>' }).includes('&lt;script&gt;'));
    assert.equal(sizeLabel(1024), '1 KB');
});

test('public library requires no checkout or login and preserves separate paid offerings', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert.ok(html.includes('engineering-field-guides.zip'));
    assert.ok(html.includes('../#interview-prep'));
    assert.ok(!/razorpay|course-page\.js|course-content\.js|emailjs/i.test(html));
    assert.ok(html.includes('<noscript>'));
});

test('homepage footer exposes both libraries with unique tags and share controls', () => {
    const html = fs.readFileSync(path.join(root, '..', 'index.html'), 'utf8');
    const footer = html.match(/<footer id="resources">([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(footer);
    for (const id of ['blueprints', 'guides']) {
        assert.ok(footer.includes('href="' + id + '/"'));
        assert.ok(footer.includes('href="#' + id + '"'));
        assert.ok(footer.includes('data-copy-resource="' + id + '"'));
        assert.equal(html.match(new RegExp('id="' + id + '"', 'g')).length, 1);
    }
    assert.ok(footer.includes('resourceShareStatus'));
    assert.ok(footer.includes('resourceShareLink'));
});