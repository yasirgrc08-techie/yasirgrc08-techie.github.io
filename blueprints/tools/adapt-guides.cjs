function shortText(value, fallback, limit = 165) {
    const text = String(value).replace(/\s+/g, ' ').trim();
    if (text.length <= limit) return text;
    let summary = '';
    for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z])/)) {
        const candidate = (summary + ' ' + sentence).trim();
        if (candidate.length > limit) break;
        summary = candidate;
    }
    if (summary.length >= 25) return summary;
    if (fallback && fallback.length <= limit) return fallback;
    throw new Error('A guide needs an explicit short summary: ' + text);
}

function adaptGuides(guides) {
    return guides.map(guide => {
        const outcomes = guide.outcomes;
        const concise = (text, index = 0) => shortText(text, outcomes[index % outcomes.length]);
        return {
            id: 'study-' + guide.id,
            title: guide.title,
            category: guide.category,
            mode: 'learning',
            origin: 'Adapted from this site\'s original public field guide',
            guideId: guide.id,
            hook: guide.qa[0][0],
            premise: guide.summary,
            roadmap: [
                ['Build the mental model', concise(guide.foundations[0][1])],
                ...guide.plan.map((phase, index) => ['Phase ' + (index + 1) + ' / ' + phase[0], concise(phase[2], index)]),
                ['Prove readiness', concise(guide.readiness[0])]
            ],
            decisions: guide.foundations.map(([name, detail], index) => [name.length <= 45 ? name : 'Core consideration ' + (index + 1), concise(detail, index), concise(guide.pitfalls[index], index)]),
            incident: guide.pitfalls.flatMap((pitfall, index) => [['Trap ' + (index + 1), concise(pitfall, index)], ['Counter-check ' + (index + 1), concise(guide.readiness[index], index)]]),
            metrics: ['Explain', 'Implement', 'Verify'].map((name, index) => [name, concise(guide.readiness[index], index), concise(guide.lab.checks[index % guide.lab.checks.length], index)]),
            lab: [
                ['Set up the scenario', concise(guide.lab.scenario)],
                ...guide.lab.steps.slice(0, 3).map((step, index) => ['Experiment ' + (index + 1), concise(step, index)]),
                ['Expected evidence', concise(guide.lab.result, 3)],
                ['Check the result', concise(guide.lab.checks[0])]
            ],
            takeaway: shortText(guide.studyRule, outcomes[3], 155),
            tags: [...new Set(['learning', ...guide.id.split('-').filter(word => word.length > 2 && !['the', 'and', 'for', 'with'].includes(word))])],
            sources: [{ title: guide.title + ' / full public guide', url: 'https://yasirgrc08-techie.github.io/guides/?guide=' + guide.id }, ...guide.sources.map(([title, url]) => ({ title, url }))]
        };
    });
}

module.exports = { adaptGuides, shortText };