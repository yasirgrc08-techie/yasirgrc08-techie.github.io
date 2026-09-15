const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const filename of ['interview-data.js', 'interview-prep.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'assets', filename), 'utf8'), sandbox, { filename });
}
const { entries, filterEntries, sanitizeProgress } = sandbox.window.InterviewPrep;
const emptyProgress = { completed: [], bookmarked: [] };

test('catalogue has complete, unique, source-linked entries', () => {
    assert.equal(entries.length, 195);
    assert.equal(new Set(entries.map(entry => entry.id)).size, 195);
    assert.equal(entries.filter(entry => entry.track === 'dsa').length, 150);
    assert.equal(entries.filter(entry => entry.track === 'hld').length, 30);
    assert.equal(entries.filter(entry => entry.track === 'lld').length, 7);
    assert.equal(entries.filter(entry => entry.track === 'ai').length, 8);
    for (const entry of entries) {
        assert.ok(entry.title && entry.topic);
        assert.ok(['Easy', 'Medium', 'Hard'].includes(entry.level));
        assert.equal(new URL(entry.reference).protocol, 'https:');
        if (entry.track === 'dsa') assert.ok(entry.hint.length > 30);
        else {
            assert.equal(entry.focus.length, 3);
            assert.ok(entry.prompt && entry.followUp);
        }
    }
});

test('search matches multiple terms across titles, patterns, and discussion notes', () => {
    assert.equal(filterEntries(entries, { query: ' RAG   tenant ' }, emptyProgress)[0].id, 'ai-rag-assistant');
    assert.equal(filterEntries(entries, { query: 'nonexistent-question-xyz' }, emptyProgress).length, 0);
    assert.equal(filterEntries(entries, { query: '   ' }, emptyProgress).length, 195);
});

test('track, topic, and difficulty filters intersect', () => {
    const result = filterEntries(entries, { track: 'dsa', topic: 'Sliding window', level: 'Hard' }, emptyProgress);
    assert.equal(result.length, 2);
    assert.ok(result.every(entry => entry.track === 'dsa' && entry.level === 'Hard'));
    assert.equal(filterEntries(entries, { track: 'ai', level: 'Easy' }, emptyProgress).length, 0);
});

test('completion and bookmarks remain independent and scopeable', () => {
    const progress = { completed: ['dsa-two-sum'], bookmarked: ['ai-rag-assistant'] };
    assert.equal(filterEntries(entries, { status: 'completed' }, progress)[0].id, 'dsa-two-sum');
    assert.equal(filterEntries(entries, { status: 'bookmarked', track: 'ai' }, progress)[0].id, 'ai-rag-assistant');
    assert.equal(filterEntries(entries, { status: 'todo' }, progress).length, 194);
    assert.equal(filterEntries(entries, { status: 'completed', track: 'ai' }, progress).length, 0);
});

test('stored progress rejects invalid shapes, unknown IDs, and duplicates', () => {
    const result = sanitizeProgress({ completed: ['dsa-two-sum', 'dsa-two-sum', 'unknown', null], bookmarked: 'not-an-array' });
    assert.equal(result.completed.length, 1);
    assert.equal(result.completed[0], 'dsa-two-sum');
    assert.equal(result.bookmarked.length, 0);
    assert.equal(sanitizeProgress(null).completed.length, 0);
    assert.equal(sanitizeProgress([]).bookmarked.length, 0);
});