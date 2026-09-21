const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const model = require('../blueprints/blueprint-model.js');
const library = require('../blueprints/library.js');
const crypto = require('node:crypto');
const root = path.join(__dirname, '..', 'blueprints');
const topics = fs.readdirSync(path.join(root, 'content')).filter(name => name.endsWith('.json')).sort().flatMap(name => JSON.parse(fs.readFileSync(path.join(root, 'content', name), 'utf8')));

test('each engineering topic yields five distinct, substantive content formats', () => {
    assert.equal(topics.length, 100);
    assert.equal(topics.filter(topic => topic.mode === 'learning').length, 50);
    assert.equal(topics.filter(topic => topic.mode !== 'learning').length, 50);
    const posts = model.expandTopics(topics);
    assert.equal(posts.length, 500);
    assert.equal(posts.length, topics.length * 5);
    assert.equal(new Set(posts.map(post => post.id)).size, posts.length);
    assert.equal(new Set(posts.map(post => post.caption)).size, posts.length);
    for (const post of posts) {
        assert.equal(post.rows.length, 6);
        assert.equal(post.storyboard.length, 8);
        assert.ok(post.durationSeconds >= 30 && post.durationSeconds <= 120);
        assert.ok(post.caption.split(/\s+/).length >= 110);
        assert.ok(post.caption.length <= 2200);
        assert.ok(post.sources.every(source => source.url.startsWith('https://')));
        assert.ok(model.markdown(post).includes('not rendered video clips'));
    }
});

test('content validation rejects hollow beats, missing references, and duplicate topics', () => {
    assert.throws(() => model.expandTopics([topics[0], topics[0]]), /Duplicate/);
    assert.throws(() => model.validateTopic({ ...topics[0], roadmap: [['Start', 'Use tools']] }), /six substantive/);
    assert.throws(() => model.validateTopic({ ...topics[0], sources: [] }), /references required/);
});

test('template filters combine topic, format, category, and bookmarks without mutation', () => {
    const posts = model.expandTopics(topics);
    const before = JSON.stringify(posts);
    assert.equal(model.filterPosts(posts, { topic: 'backend-api-scaling' }).length, 5);
    assert.equal(model.filterPosts(posts, { topic: 'backend-api-scaling', format: 'incident' }).length, 1);
    assert.equal(model.filterPosts(posts, { category: 'not-a-category' }).length, 0);
    assert.equal(model.filterPosts(posts, { saved: new Set([posts[0].id]) }).length, 1);
    assert.equal(JSON.stringify(posts), before);
});

test('all 500 generated templates have matching image hashes, dimensions, sources, and notes', () => {
    const catalog = library.validateCatalog(JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8')));
    assert.equal(catalog.topicCount, 100);
    assert.equal(new Set(catalog.posts.map(post => post.category)).size, 11);
    for (const post of catalog.posts) {
        const image = fs.readFileSync(path.join(root, post.image));
        assert.equal(image.readUInt32BE(16), 1080);
        assert.equal(image.readUInt32BE(20), 1350);
        assert.equal(crypto.createHash('sha256').update(image).digest('hex'), post.imageMeta.sha256);
        assert.equal(image.length, post.imageMeta.bytes);
        assert.ok(fs.statSync(path.join(root, post.preview)).size > 1000);
        assert.ok(fs.readFileSync(path.join(root, post.svg), 'utf8').includes('viewBox="0 0 540 675"'));
        const notes = fs.readFileSync(path.join(root, post.notes), 'utf8');
        assert.ok(notes.includes(post.caption));
        assert.ok(notes.includes('## Reel Storyboard'));
        assert.ok(post.minimumFontSize >= 9.5);
    }
    const archive = fs.readFileSync(path.join(root, catalog.archive.url));
    assert.equal(archive.length, catalog.archive.bytes);
    assert.equal(crypto.createHash('sha256').update(archive).digest('hex'), catalog.archive.sha256);
    assert.ok(archive.length < 90 * 1024 * 1024);
});

test('library pagination is bounded and cards escape authored text', () => {
    const posts = model.expandTopics(topics);
    assert.equal(library.selectPage(posts, { page: 1 }, new Set()).posts.length, 24);
    const last = library.selectPage(posts, { page: 999 }, new Set());
    assert.equal(last.page, 21);
    assert.equal(last.posts.length, 20);
    assert.equal(library.selectPage(posts, { saved: true }, new Set([posts[0].id])).total, 1);
    const markup = library.card({ ...posts[0], headline: '<script>bad</script>', preview: 'previews/' + posts[0].id + '.png' });
    assert.ok(markup.includes('&lt;script&gt;bad&lt;/script&gt;'));
    assert.ok(!markup.includes('<script>'));
    assert.equal(library.sizeLabel(1024 * 1024), '1.0 MB');
});