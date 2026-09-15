const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const filename of ['interview-data.js', 'interview-depth.js', 'interview-prep.js', 'course-content.js', 'course-page.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'assets', filename), 'utf8'), sandbox, { filename });
}
const { entries, filterEntries, sanitizeProgress } = sandbox.window.InterviewPrep;
const emptyProgress = { completed: [], bookmarked: [] };

test('catalogue has complete, unique, source-linked entries', () => {
    assert.equal(entries.length, 231);
    assert.equal(new Set(entries.map(entry => entry.id)).size, 231);
    assert.equal(entries.filter(entry => entry.track === 'dsa').length, 174);
    assert.equal(entries.filter(entry => entry.track === 'hld').length, 38);
    assert.equal(entries.filter(entry => entry.track === 'lld').length, 8);
    assert.equal(entries.filter(entry => entry.track === 'ai').length, 11);
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
    assert.equal(filterEntries(entries, { query: '   ' }, emptyProgress).length, 231);
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
    assert.equal(filterEntries(entries, { status: 'todo' }, progress).length, 230);
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

test('paid library stays uninitialized until the existing sheet unlocks', () => {
    let locked = true;
    let syncAccess;
    let initializationCount = 0;
    const section = {};
    const sheetContent = { classList: { contains: name => name === 'paywall-blur' && locked } };
    sandbox.MutationObserver = class {
        constructor(callback) { syncAccess = callback; }
        observe(target, options) {
            assert.equal(target, sheetContent);
            assert.equal(options.attributeFilter[0], 'class');
        }
    };
    sandbox.window.InterviewPrep.bindPaidLibrary(section, sheetContent, () => initializationCount++);
    assert.equal(section.hidden, true);
    assert.equal(section.inert, true);
    assert.equal(initializationCount, 0);
    locked = false;
    syncAccess();
    assert.equal(section.hidden, false);
    assert.equal(section.inert, false);
    assert.equal(initializationCount, 1);
    syncAccess();
    assert.equal(initializationCount, 1);
    locked = true;
    syncAccess();
    assert.equal(section.hidden, true);
    assert.equal(section.inert, true);
    delete sandbox.MutationObserver;
});

test('paid library fails closed when the sheet access element is missing', () => {
    const section = {};
    sandbox.window.InterviewPrep.bindPaidLibrary(section, null, () => assert.fail('Unexpected free access'));
    assert.equal(section.hidden, true);
    assert.equal(section.inert, true);
});

test('homepage keeps the original paid sheets and does not mount a free library', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    for (const [filename, className, title] of [
        ['dsa.html', 'card-dsa', 'DSA Sheet &middot; &#8377;49'],
        ['system-design.html', 'card-sd', 'System Design Sheet &middot; &#8377;49'],
        ['behavioral.html', 'card-beh', 'Behavioral Prep &middot; &#8377;29']
    ]) {
        assert.ok(html.includes(`href="sheets/${filename}" class="hero-action-card ${className}"`));
        assert.ok(html.includes(title));
        assert.ok(fs.existsSync(path.join(root, 'sheets', filename)));
    }
    assert.ok(!html.includes('data-interview-library='));
    assert.ok(!html.includes('src="assets/interview-data.js"'));
    assert.ok(!html.includes('Free practice library'));
});

test('new packages have explicit paid booking prices and 60-minute durations', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    for (const [type, name, price] of [
        ['dsa_sprint', 'DSA Pattern Sprint', 499],
        ['sd_intensive', 'System Design Intensive', 699],
        ['systems_deep_dive', 'Systems Deep Dive', 699],
        ['interview_ready', 'Interview Ready', 499]
    ]) {
        assert.ok(html.includes(`openBooking('${type}','${name}',${price},60)`));
    }
    assert.ok(!html.includes('Price by enquiry'));
});

test('company preparation and worked-solution filters intersect without inventing tags', () => {
    const sample = [
        { id: 'tagged', title: 'Coding practice', topic: 'Arrays', track: 'dsa', level: 'Medium', companies: ['Microsoft', 'Amazon'], solution: { approach: ['Count prefixes.'] } },
        { id: 'untagged', title: 'General practice', topic: 'Arrays', track: 'dsa', level: 'Medium' },
        { id: 'design', title: 'Service design', topic: 'Caching', track: 'hld', level: 'Hard', companies: ['Microsoft'] }
    ];
    assert.equal(filterEntries(sample, { company: 'Microsoft' }, emptyProgress).length, 2);
    assert.equal(filterEntries(sample, { company: 'Microsoft', solutionsOnly: true }, emptyProgress)[0].id, 'tagged');
    assert.equal(filterEntries(sample, { company: 'Google' }, emptyProgress).length, 0);
    assert.equal(filterEntries(sample, { query: 'amazon', solutionsOnly: true }, emptyProgress).length, 1);
});

test('all new Python solutions execute their edge-case tests', () => {
    const solutions = entries.filter(entry => entry.track === 'dsa' && entry.solution).map(entry => ({ id: entry.id, ...entry.solution }));
    assert.equal(solutions.length, 24);
    for (const solution of solutions) {
        assert.ok(solution.tests.length >= 3);
        assert.ok(solution.problem && solution.complexity && solution.approach.length >= 2);
    }
    const runner = `import json, sys
class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right
count = 0
for solution in json.load(sys.stdin):
    namespace = {"TreeNode": TreeNode}
    exec(solution["code"], namespace)
    for example in solution["tests"]:
        try:
            exec(example, namespace)
            count += 1
        except Exception as error:
            raise AssertionError(solution["id"] + ": " + example) from error
print(str(count) + " Python solution checks passed")`;
    const windows = process.platform === 'win32' && !process.env.PYTHON_BIN;
    const command = process.env.PYTHON_BIN || (windows ? 'wsl.exe' : 'python3');
    const args = windows ? ['--exec', 'python3', '-c', runner] : ['-c', runner];
    const result = spawnSync(command, args, { input: JSON.stringify(solutions), encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, result.stderr || String(result.error));
    console.log(result.stdout.trim());
});

test('every company track has actual worked coding practice and a source', () => {
    for (const [company, guide] of Object.entries(sandbox.window.INTERVIEW_LIBRARY.companyGuides)) {
        assert.equal(new URL(guide.url).protocol, 'https:');
        assert.ok(filterEntries(entries, { company, track: 'dsa', solutionsOnly: true }, emptyProgress).length >= 3);
    }
});

test('worked design cases contain assumptions, concrete design, trade-offs, and answered follow-ups', () => {
    const cases = entries.filter(entry => entry.track !== 'dsa' && entry.solution);
    assert.equal(cases.length, 12);
    for (const entry of cases) {
        const solution = entry.solution;
        assert.ok(solution.assumptions.length >= 2 && solution.approach.length >= 3);
        assert.ok(solution.tradeoffs.length >= 2 && solution.pitfalls.length >= 2);
        for (const field of ['capacity', 'api', 'dataModel', 'architecture', 'followUpAnswer']) assert.ok(solution[field].length > 50, `${entry.id}: ${field}`);
        assert.ok(entry.companies.length >= 2);
    }
});

test('worked solutions render complete escaped code and design sections', () => {
    for (const entry of entries.filter(candidate => candidate.solution)) {
        const html = sandbox.window.InterviewPrep.renderWorkedSolution(entry);
        assert.ok(html.includes(entry.track === 'dsa' ? 'Python reference solution' : 'Architecture and request flow'));
        assert.ok(html.includes('<pre class="prep-code"'));
    }
    const entry = entries.find(candidate => candidate.track === 'dsa' && candidate.solution);
    const html = sandbox.window.InterviewPrep.renderWorkedSolution({ ...entry, solution: { ...entry.solution, code: 'print("<example>")' } });
    assert.ok(html.includes('&lt;example&gt;'));
    assert.ok(!html.includes('<example>'));
});

test('five INR 49 courses include real lessons, answered questions, exercises, plans, and sources', () => {
    const courses = sandbox.window.PREP_COURSES;
    assert.equal(courses.length, 5);
    assert.equal(new Set(courses.map(course => course.id)).size, 5);
    for (const course of courses) {
        assert.equal(course.price, 49);
        assert.equal(course.lessons.length, 8);
        assert.equal(new Set(course.lessons.map(lesson => lesson.id)).size, 8);
        assert.ok(course.plans.length >= 3 && course.outcomes.length >= 4);
        assert.ok(course.assessment.rubric.length >= 4 && course.sources.length >= 3);
        for (const lesson of course.lessons) {
            assert.ok(lesson.notes.length >= 2 && lesson.qa.length >= 2);
            assert.ok(lesson.notes.join(' ').length > 200);
            assert.ok(lesson.exercise[0] && lesson.exercise[1].length > 100);
            for (const [question, answer] of lesson.qa) assert.ok(question.length > 20 && answer.length > 100, course.id + '/' + lesson.id);
        }
    }
});

test('course Python examples and SQL query results execute correctly', () => {
    const examples = sandbox.window.PREP_COURSES.flatMap(course => course.lessons.filter(lesson => lesson.code).map(lesson => ({ id: course.id + '/' + lesson.id, ...lesson.code })));
    assert.equal(examples.length, 8);
    const runner = `import json, sys, sqlite3
count = 0
for example in json.load(sys.stdin):
    try:
        if example["language"] == "python":
            namespace = {}
            exec(example["body"], namespace)
            for check in example["tests"]:
                exec(check, namespace)
                count += 1
        else:
            with sqlite3.connect(":memory:") as connection:
                connection.executescript(example["fixture"])
                rows = [list(row) for row in connection.execute(example["body"])]
                assert rows == example["expected"], (rows, example["expected"])
                count += 1
    except Exception as error:
        raise AssertionError(example["id"]) from error
print(str(count) + " course code/query checks passed")`;
    const windows = process.platform === 'win32' && !process.env.PYTHON_BIN;
    const result = spawnSync(process.env.PYTHON_BIN || (windows ? 'wsl.exe' : 'python3'), windows ? ['--exec', 'python3', '-c', runner] : ['-c', runner], { input: JSON.stringify(examples), encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, result.stderr || String(result.error));
    console.log(result.stdout.trim());
});

test('each course checkout charges INR 49 and binds its own product identity', () => {
    for (const course of sandbox.window.PREP_COURSES) {
        const options = sandbox.window.CoursePage.checkoutOptions(course, 'test@example.com', () => {}, () => {});
        assert.equal(options.amount, 4900);
        assert.equal(options.currency, 'INR');
        assert.equal(options.notes.product_id, course.id);
        assert.equal(options.prefill.email, 'test@example.com');
    }
    assert.equal(sandbox.window.CoursePage.findCourse('__proto__'), undefined);
});

test('course receipts and progress remain isolated and malformed records do not unlock', () => {
    const api = sandbox.window.CoursePage;
    const first = api.findCourse('faang');
    const second = api.findCourse('rag');
    const receipt = { version: 1, courseId: 'faang', paymentId: 'pay_TestReceipt' };
    assert.equal(api.validReceipt(receipt, first), true);
    assert.equal(api.validReceipt(receipt, second), false);
    assert.equal(api.validReceipt({ ...receipt, paymentId: '' }, first), false);
    assert.equal(api.validReceipt(null, first), false);
    assert.notEqual(api.courseKeys(first).access, api.courseKeys(second).access);
    const progress = api.sanitizeProgress(['scope', 'scope', 'unknown'], first);
    assert.equal(progress.length, 1);
    assert.equal(progress[0], 'scope');
});

test('every lesson renders its notes, questions, worked exercise, and code safely', () => {
    for (const course of sandbox.window.PREP_COURSES) {
        for (const [index, lesson] of course.lessons.entries()) {
            const html = sandbox.window.CoursePage.renderLesson(lesson, index);
            assert.ok(html.includes('Worked answer') && html.includes('Interview questions and answers'));
            assert.ok(html.includes(`id="lesson-${lesson.id}"`));
        }
    }
});

test('homepage adds all five paid courses without distributing course answers', () => {
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    for (const course of sandbox.window.PREP_COURSES) {
        assert.ok(html.includes(`data-course="${course.id}"`));
        assert.ok(html.includes(`href="sheets/course.html?id=${course.id}"`));
    }
    assert.ok(!html.includes('src="assets/course-content.js'));
    assert.ok(fs.existsSync(path.join(root, 'sheets', 'course.html')));
    for (const file of ['dsa.html', 'system-design.html']) {
        const sheet = fs.readFileSync(path.join(root, 'sheets', file), 'utf8');
        assert.ok(sheet.includes('interview-depth.js'));
        assert.ok(sheet.includes('data-paid-library hidden inert'));
    }
});