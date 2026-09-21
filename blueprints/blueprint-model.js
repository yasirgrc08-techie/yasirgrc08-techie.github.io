(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.BlueprintModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    const formats = [
        { id: 'roadmap', name: 'Bottleneck Roadmap', eyebrow: 'OBSERVE / CHANGE / VERIFY', question: 'Which bottleneck would you measure first?', accent: '#176b5b' },
        { id: 'decisions', name: 'Decision Guide', eyebrow: 'OPTIONS / CONDITIONS / COSTS', question: 'Which constraint would change your choice?', accent: '#245ca7' },
        { id: 'incident', name: 'Failure and Recovery', eyebrow: 'DETECT / CONTAIN / RECOVER', question: 'What evidence would disprove your first diagnosis?', accent: '#a14337' },
        { id: 'metrics', name: 'Metrics That Matter', eyebrow: 'SIGNALS / CONTEXT / LIMITS', question: 'Which metric could look healthy while users suffer?', accent: '#6b4c87' },
        { id: 'lab', name: 'Build and Validate', eyebrow: 'EXPERIMENT / BREAK / CHECK', question: 'How would you reproduce this with synthetic data?', accent: '#166875' }
    ];
    const disclaimer = 'Educational example, not a universal production recipe. Workload, SLOs, correctness, cost, and failure behavior determine the design. Use public or synthetic data.';

    function validateTopic(topic) {
        if (!topic || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id || '')) throw new Error('Invalid topic id.');
        for (const field of ['title', 'category', 'hook', 'premise', 'takeaway']) {
            if (typeof topic[field] !== 'string' || !topic[field].trim()) throw new Error(topic.id + ': missing ' + field);
        }
        if (topic.title.length > 72 || topic.hook.length > 170 || topic.takeaway.length > 155) throw new Error(topic.id + ': title, hook, or takeaway exceeds poster limits.');
        for (const field of ['roadmap', 'incident', 'lab']) {
            if (!Array.isArray(topic[field]) || topic[field].length !== 6) throw new Error(topic.id + ': ' + field + ' requires six substantive beats.');
            for (const row of topic[field]) if (!Array.isArray(row) || row.length !== 2 || row.some(value => typeof value !== 'string') || row[0].length > 45 || row[1].length < 25 || row[1].length > 165) throw new Error(topic.id + ': invalid ' + field + ' beat: ' + JSON.stringify(row));
        }
        for (const field of ['decisions', 'metrics']) {
            if (!Array.isArray(topic[field]) || topic[field].length !== 3) throw new Error(topic.id + ': ' + field + ' requires three choices/signals.');
            for (const row of topic[field]) if (!Array.isArray(row) || row.length !== 3 || row[0].length > 45 || row.slice(1).some(value => typeof value !== 'string' || value.length < 25 || value.length > 165)) throw new Error(topic.id + ': invalid ' + field + ' entry: ' + JSON.stringify(row));
        }
        if (!Array.isArray(topic.tags) || topic.tags.length < 3 || topic.tags.some(tag => !/^[a-z0-9-]+$/.test(tag))) throw new Error(topic.id + ': invalid tags.');
        if (!Array.isArray(topic.sources) || topic.sources.length < 1 || topic.sources.some(source => !source.title || !/^https:\/\//.test(source.url))) throw new Error(topic.id + ': public references required.');
        return topic;
    }

    function rowsFor(topic, format) {
        if (format.id === 'decisions') return topic.decisions.flatMap(([name, when, tradeoff]) => [[name, when], [topic.mode === 'learning' ? 'Watch for' : 'Trade-off / ' + name, tradeoff]]);
        if (format.id === 'metrics') return topic.metrics.flatMap(([name, definition, context]) => [[name, definition], ['Interpret / ' + name, context]]);
        return topic[format.id];
    }

    function timestamp(seconds) { return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0'); }

    function expandTopic(topic, topicIndex = 0) {
        validateTopic(topic);
        return formats.map((format, formatIndex) => {
            const learningNames = { roadmap: 'Learning Roadmap', decisions: 'Practice Decisions', incident: 'Pitfalls and Checks', metrics: 'Readiness Signals', lab: 'Build and Validate' };
            const formatName = topic.mode === 'learning' ? learningNames[format.id] : format.name;
            const rows = rowsFor(topic, format).map(([title, detail]) => ({ title, detail }));
            const id = topic.id + '--' + format.id;
            const title = topic.title + ' / ' + formatName;
            const hashtags = ['#SoftwareEngineering', '#' + topic.category.replace(/[^A-Za-z0-9]/g, ''), ...topic.tags.slice(0, 3).map(tag => '#' + tag.replace(/-/g, ''))];
            const caption = topic.hook + '\n\n' + topic.premise + '\n\n' + rows.map((row, index) => (index + 1) + '. ' + row.title + '\n' + row.detail).join('\n\n') + '\n\nThe takeaway: ' + topic.takeaway + '\n\n' + format.question + '\n\n' + disclaimer + '\n\n' + hashtags.join(' ');
            const beats = [{ visual: 'Title and opening question', narration: topic.hook }, ...rows.map((row, index) => ({ visual: 'Reveal step ' + (index + 1) + ': ' + row.title, narration: row.detail })), { visual: 'Takeaway and discussion prompt', narration: topic.takeaway + ' ' + format.question }];
            let elapsed = 0;
            const storyboard = beats.map(beat => {
                const duration = Math.max(3, Math.ceil(beat.narration.split(/\s+/).length / 2.5));
                const result = { start: elapsed, end: elapsed + duration, time: timestamp(elapsed) + '-' + timestamp(elapsed + duration), ...beat };
                elapsed += duration;
                return result;
            });
            return { id, topicId: topic.id, number: topicIndex * formats.length + formatIndex + 1, title, headline: topic.title, category: topic.category, format: format.id, formatName, eyebrow: format.eyebrow, accent: format.accent, hook: topic.hook, premise: topic.premise, takeaway: topic.takeaway, question: format.question, rows, tags: topic.tags, sources: topic.sources, caption, storyboard, durationSeconds: elapsed, disclaimer, origin: topic.origin || 'Original production-engineering explainer', ...(topic.guideId ? { guideId: topic.guideId } : {}) };
        });
    }

    function expandTopics(topics) {
        if (!Array.isArray(topics) || !topics.length) throw new Error('At least one topic is required.');
        if (new Set(topics.map(topic => topic.id)).size !== topics.length) throw new Error('Duplicate topic id.');
        const posts = topics.flatMap(expandTopic);
        if (new Set(posts.map(post => post.caption)).size !== posts.length) throw new Error('Duplicate content templates.');
        return posts;
    }

    function markdown(post) {
        return '# ' + post.title + '\n\nBy Yasir Sharfi\n\n## The Idea\n\n' + post.hook + '\n\n' + post.premise + '\n\n## Visual Blueprint\n\n' + post.rows.map((row, index) => (index + 1) + '. **' + row.title + '**: ' + row.detail).join('\n') + '\n\n## Caption\n\n' + post.caption + '\n\n## Reel Storyboard\n\nSuggested duration: about ' + post.durationSeconds + ' seconds at 150 words/minute; adjust to your delivery. These are scripts and images, not rendered video clips.\n\n' + post.storyboard.map(beat => '- **' + beat.time + '** / ' + beat.visual + '\n  Narration: ' + beat.narration).join('\n\n') + '\n\n## References\n\n' + post.sources.map(source => '- [' + source.title + '](' + source.url + ')').join('\n') + '\n\n' + post.disclaimer + '\n';
    }

    function filterPosts(posts, { query = '', category = 'all', format = 'all', topic = '', saved = null } = {}) {
        const terms = String(query).toLowerCase().match(/[a-z0-9]+(?:\+\+|#)?/g) || [];
        const aliases = { api: ['api', 'apis'], db: ['database', 'databases'], ai: ['ai', 'llm', 'ml'], k8s: ['kubernetes'], auth: ['authentication', 'authorization'], os: ['operating', 'linux'] };
        return posts.filter(post => {
            if ((category !== 'all' && post.category !== category) || (format !== 'all' && post.format !== format) || (topic && post.topicId !== topic) || (saved && !saved.has(post.id))) return false;
            const words = [post.title, post.category, post.hook, ...post.tags].join(' ').toLowerCase().match(/[a-z0-9]+(?:\+\+|#)?/g) || [];
            return terms.every(term => words.some(word => word.startsWith(term)) || (aliases[term] || []).some(alias => words.includes(alias)));
        });
    }

    return { formats, disclaimer, validateTopic, expandTopic, expandTopics, filterPosts, markdown };
});