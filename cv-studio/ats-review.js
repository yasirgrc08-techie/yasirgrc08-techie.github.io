(function (root, factory) {
    const api = factory(typeof module !== 'undefined' && module.exports ? require('./cv-model.js') : root.CvModel);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvReadiness = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (model) {
    'use strict';
    const version = 1;
    const references = [
        { title: 'Greenhouse: unsuccessful resume parsing', url: 'https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse', scope: 'Document parsing risks, including images, columns, headers, and the vendor-specific 2.5 MB limit.' },
        { title: 'Microsoft: hiring process and candidate conduct', url: 'https://careers.microsoft.com/v2/global/en/hiring-tips', scope: 'Role requirements and honest representation. This is not a Microsoft scoring formula.' },
        { title: 'Amazon: online applications', url: 'https://www.amazon.jobs/content/en/how-we-hire/online-application', scope: 'Application and resume guidance. Each job and application portal can have different requirements.' }
    ];
    const vocabulary = [
        ['Python'], ['Java'], ['JavaScript'], ['TypeScript'], ['C++', 'cpp'], ['C#', 'csharp'], ['Go', 'golang'], ['Rust'], ['SQL', 'structured query language'], ['Kotlin'], ['Swift'], ['React', 'react.js'], ['Angular'], ['Vue', 'vue.js'], ['Node.js', 'nodejs'], ['.NET', 'dotnet', 'asp.net'], ['PostgreSQL', 'postgres'], ['MySQL'], ['Redis'], ['Kafka'], ['Docker'], ['Kubernetes', 'k8s'], ['Linux'], ['Git'], ['AWS', 'amazon web services'], ['Azure'], ['GCP', 'google cloud'], ['Terraform'], ['CI/CD', 'continuous integration', 'continuous delivery'], ['REST', 'restful'], ['GraphQL'], ['API', 'apis'], ['Distributed systems'], ['System design'], ['Microservices'], ['Observability'], ['Reliability'], ['Testing', 'automated tests', 'test automation'], ['Playwright'], ['Selenium'], ['Accessibility', 'a11y'], ['Security'], ['IAM', 'identity and access management'], ['Machine learning', 'ml'], ['PyTorch'], ['TensorFlow'], ['scikit-learn', 'sklearn'], ['Data pipelines', 'data pipeline'], ['ETL'], ['Data modeling', 'data modelling'], ['Experimentation', 'experiments', 'a/b testing'], ['Power BI', 'powerbi'], ['Tableau'], ['Figma'], ['User research'], ['Usability'], ['Prototyping'], ['Design systems', 'design system'], ['Product strategy'], ['Roadmap', 'roadmaps'], ['Prioritization', 'prioritisation'], ['Leadership'], ['Coaching'], ['Hiring'], ['Mentoring', 'mentorship'], ['Stakeholder management', 'stakeholder communication'], ['Requirements'], ['Acceptance criteria'], ['Documentation'], ['OpenAPI'], ['Technical writing'], ['Performance'], ['Concurrency'], ['Incident response'], ['Migration', 'migrations'], ['Customer discovery'], ['Data quality']
    ];
    const escapedPattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    function containsTerm(text, term) {
        const known = vocabulary.find(entry => entry.some(alias => alias.toLowerCase() === term.toLowerCase()));
        const aliases = known || [term];
        return aliases.some(alias => new RegExp('(^|[^\\p{L}\\p{N}+#])' + escapedPattern(alias).replace(/\s+/g, '\\s+') + '($|[^\\p{L}\\p{N}+#])', 'iu').test(text));
    }

    function normalizeInput(input) {
        if (!input || typeof input !== 'object' || typeof input.text !== 'string') throw new Error('A readable CV is required before a review can be purchased.');
        const text = input.text.normalize('NFKC').replace(/\u00ad/g, '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim();
        if (text.length > 75000) throw new Error('The extracted CV exceeds the 75,000-character review limit.');
        const words = text.split(/\s+/).filter(Boolean);
        if (words.length < 40) throw new Error('Not enough readable CV text was found. Use a text-based PDF, DOCX, or pasted text; scanned images need OCR first. No review payment has started.');
        const letters = text.match(/\p{L}/gu) || [];
        const latin = text.match(/[A-Za-z]/g) || [];
        if (latin.length / Math.max(1, letters.length) < 0.6) throw new Error('Automated checks currently support English-language CVs. No review payment has started.');
        if (input.jobText != null && typeof input.jobText !== 'string') throw new Error('The job description must be text.');
        if (input.requiredTerms != null && typeof input.requiredTerms !== 'string') throw new Error('Key requirements must be text.');
        const jobText = (input.jobText || '').trim();
        const requiredTerms = (input.requiredTerms || '').trim();
        if (jobText.length > 12000 || requiredTerms.length > 1000) throw new Error('The job description or requirements exceed the review limit.');
        if (jobText && jobText.length < 40) throw new Error('Use a fuller job description, or leave it blank and list the key requirements separately.');
        const explicit = [...new Set(requiredTerms.split(/[,;\n]/).map(term => term.trim()).filter(Boolean))];
        if (explicit.length > 20 || explicit.some(term => term.length > 60)) throw new Error('Use up to 20 short, comma-separated key requirements.');
        const source = input.source || {};
        return {
            version, text, words, jobText, requiredTerms, explicit,
            role: model.findRole(input.role).id, company: model.findCompany(input.company).id,
            source: {
                kind: ['studio', 'pdf', 'docx', 'text'].includes(source.kind) ? source.kind : 'text',
                name: typeof source.name === 'string' ? source.name.slice(0, 160) : 'CV document',
                bytes: Number.isFinite(source.bytes) && source.bytes >= 0 ? source.bytes : 0,
                pages: Number.isInteger(source.pages) && source.pages > 0 ? source.pages : null,
                columns: typeof source.columns === 'boolean' ? source.columns : null,
                hasImages: typeof source.hasImages === 'boolean' ? source.hasImages : null,
                headerContact: source.headerContact === true,
                extractionWarnings: Array.isArray(source.extractionWarnings) ? source.extractionWarnings.filter(value => typeof value === 'string').slice(0, 8).map(value => value.slice(0, 200)) : []
            }
        };
    }

    function keywordCoverage(input) {
        const normalized = normalizeInput(input);
        const selected = [...normalized.explicit];
        for (const entry of vocabulary) {
            if (containsTerm(normalized.jobText, entry[0]) && !selected.some(term => term.toLowerCase() === entry[0].toLowerCase())) selected.push(entry[0]);
        }
        const terms = selected.slice(0, 45).map(term => ({ term, present: containsTerm(normalized.text, term) }));
        const matched = terms.filter(term => term.present).map(term => term.term);
        const missing = terms.filter(term => !term.present).map(term => term.term);
        return { assessed: terms.length > 0, matched, missing, total: terms.length, percent: terms.length ? Math.round(matched.length / terms.length * 100) : null };
    }

    function analyze(input) {
        const normalized = normalizeInput(input);
        const { text, words, source } = normalized;
        const lines = text.split(/\n+/).map(line => line.trim()).filter(Boolean);
        const statements = lines.filter(line => line.split(/\s+/).length >= 6 && line.length < 1200);
        const actionPattern = /\b(built|implemented|designed|developed|led|created|automated|delivered|improved|reduced|increased|diagnosed|evaluated|analyzed|analysed|migrated|launched|coached|mentored|managed|defined|validated|tested|documented|partnered|reviewed|coordinated|translated|established|negotiated|organized|organised|maintained)\b/i;
        const contextPattern = /\b(api|service|system|database|pipeline|model|application|interface|workflow|customer|user|team|engineer|product|experiment|query|architecture|research|design|component|test|documentation|incident|platform|process|contract|dataset|policy|release|prototype|metric|stakeholder)s?\b/i;
        const outcomePattern = /\b(reduc\w*|increas\w*|improv\w*|prevent\w*|eliminat\w*|recover\w*|validat\w*|measur\w*|verif\w*|reconcil\w*|enabled|resolved|adoption|accuracy|latency|reliability|accessibility|rollback|acceptance|retention|conversion)\b|\d+(?:\.\d+)?\s*(?:%|ms\b|seconds\b|hours\b|users\b)/i;
        const actionLines = statements.filter(line => actionPattern.test(line));
        const contextLines = statements.filter(line => contextPattern.test(line));
        const outcomeLines = statements.filter(line => outcomePattern.test(line));
        const longLines = statements.filter(line => line.split(/\s+/).length > 45);
        const email = /[^\s@]+@[^\s@]+\.[^\s@|]+/.test(text);
        const experience = /(^|\n)\s*(?:professional |work |relevant |selected )?(?:experience|employment|work history|projects|technical work|internships|research experience)\b/im.test(text);
        const skills = /(^|\n)\s*(?:(?:technical|core|professional|key) )?(?:skills|competencies|expertise|technologies|leadership)\b/im.test(text);
        const education = /(^|\n)\s*(?:education|qualifications|academic background)\b/im.test(text);
        const timeline = /\b(?:19|20)\d{2}\b/.test(text);
        const placeholders = /@example\.(?:com|org)|example\.com\/portfolio|\b(?:sample (?:product|technology|institute|innovation|engineering)|example (?:company|university)|your name|your city|lorem ipsum|insert (?:your|metric)|illustrative research)\b/i.test(text);
        const replacementCount = (text.match(/\ufffd/g) || []).length;
        const spacedLetters = /(?:\b[A-Za-z]\s){5,}[A-Za-z]\b/.test(text);
        const early = ['graduate', 'intern'].includes(normalized.role);
        const coverage = keywordCoverage(input);
        const checks = [];
        function check(id, category, title, maximum, passed, detail, recommendation, assessed = true) {
            checks.push({ id, category, title, maximum, points: assessed ? (passed ? maximum : 0) : null, status: !assessed ? 'not-assessed' : passed ? 'pass' : 'review', detail, recommendation: passed ? '' : recommendation });
        }
        check('readable', 'Document', 'Readable text extracted', 6, true, words.length + ' words were available to the local reviewer.', '');
        check('encoding', 'Document', 'Readable character encoding', 4, replacementCount < 3 && !spacedLetters, replacementCount ? replacementCount + ' replacement characters found.' : spacedLetters ? 'Widely spaced individual letters were detected.' : 'No major replacement-character or spaced-letter warning detected.', 'Export a text-based document and verify copied text; decorative letter spacing can disrupt parsing.');
        check('size', 'Document', 'File size within a common parsing limit', 5, source.bytes <= 2.5 * 1024 * 1024, source.bytes ? Math.ceil(source.bytes / 1024) + ' KB. Greenhouse documents a 2.5 MB parsing limit; other systems differ.' : 'File size is unknown for pasted text.', 'Compress unnecessary images and check the target portal\'s actual file-size requirement.', source.bytes > 0);
        check('columns', 'Document', 'Straightforward reading order', 5, source.columns === false, source.columns === null ? 'Layout cannot be established from text alone.' : source.columns ? 'A two-column layout or a strong column signal is present.' : 'No strong multi-column signal was found; this is not a parser guarantee.', 'Consider a single-column application copy and check the extracted reading order.', source.columns !== null);
        check('email', 'Core Information', 'Contact email present', 8, email, email ? 'An email-shaped contact value was found. Its ownership and deliverability are not verified.' : 'No email-shaped contact value was found.', 'Add a current professional contact email or follow the employer\'s requested contact method.');
        check('sections', 'Core Information', 'Work or project evidence has a clear section', 8, experience, experience ? 'A recognized experience, research, internship, or project heading is present.' : 'No familiar work or project heading was recognized.', 'Use clear headings such as Experience, Projects, or Research Experience; unusual headings need manual review.');
        check('skills', 'Core Information', 'Relevant skills are easy to locate', 4, skills, skills ? 'A skills, expertise, competency, or leadership heading was recognized.' : 'No familiar skills or expertise heading was recognized.', 'Group genuine relevant capabilities under a clear heading; do not add unsupported skills.');
        check('dates', 'Core Information', 'Dates provide career or project context', 5, timeline, timeline ? 'Year values were found; chronology and accuracy still require your review.' : 'No year values were recognized.', 'Include truthful dates for education, employment, or substantial projects, as relevant to your application.');
        check('education', 'Core Information', 'Early-career education context', 5, education, early ? education ? 'An education or qualification heading was recognized.' : 'No education heading was recognized for this early-career profile.' : 'This early-career check is not scored for the selected role.', 'Include relevant education or equivalent qualifications with accurate status and dates.', early);
        check('actions', 'Evidence', 'Specific contributions are described', 8, actionLines.length >= 2, actionLines.length + ' substantial statements contain recognized contribution verbs.', 'Describe what you personally built, analyzed, designed, led, or changed, not only your responsibilities.');
        check('context', 'Evidence', 'Work has concrete technical or business context', 8, contextLines.length >= 2, contextLines.length + ' statements name a system, product, workflow, team, or other work context.', 'Name the relevant problem, artifact, constraints, or users so the contribution can be understood.');
        check('outcomes', 'Evidence', 'Results or validation are visible', 8, outcomeLines.length >= 2, outcomeLines.length + ' statements include an outcome or validation signal. The reviewer cannot establish whether a claim is true.', 'Explain the effect or how the work was validated. Use a number only when you can substantiate its measurement and your contribution.');
        check('concise', 'Evidence', 'Evidence statements remain scannable', 6, longLines.length <= Math.max(1, Math.floor(statements.length / 5)), longLines.length + ' statements exceed the editorial 45-word guideline.', 'Shorten long evidence statements by keeping the action, relevant context, and supportable result. This guideline is not an employer rule.');
        check('examples', 'Integrity', 'Template placeholders removed', 5, !placeholders, placeholders ? 'Sample contact, organization, or placeholder text remains.' : 'No known sample markers were detected. This does not verify authenticity.', 'Replace all sample details with your own accurate experience before paying for a review or applying.');
        checks.push({ id: 'job-terms', category: 'Target Alignment', title: 'Job-description term coverage', maximum: 15, points: coverage.assessed ? Math.round(15 * coverage.matched.length / coverage.total) : null, status: !coverage.assessed ? 'not-assessed' : coverage.missing.length ? 'review' : 'pass', detail: coverage.assessed ? coverage.matched.length + ' of ' + coverage.total + ' supported or explicitly supplied requirements are mentioned.' : 'No supported requirements were supplied or recognized; role fit is not scored.', recommendation: coverage.missing.length ? 'Review missing requirements against your real experience. Keyword presence is not proficiency, eligibility, or evidence of hiring fit.' : '' });
        const assessed = checks.filter(item => item.points !== null);
        const available = assessed.reduce((sum, item) => sum + item.maximum, 0);
        const earned = assessed.reduce((sum, item) => sum + item.points, 0);
        const warnings = [...source.extractionWarnings];
        if (source.hasImages) warnings.push('Images or graphics are present. Photos are optional and can complicate parsing; check employer and regional requirements. Appearance is not scored.');
        if (source.headerContact) warnings.push('Contact-like text appears near a page edge. Verify that contact details are not confined to a header or footer.');
        if (source.pages && source.pages > (early ? 2 : normalized.role === 'research' ? 8 : 3)) warnings.push('Review document length for relevance to the selected role. There is no universal ATS page limit.');
        if (!coverage.assessed) warnings.push('No job-specific alignment score is available. Add an authorized job description or explicit key requirements for a targeted review.');
        const company = model.findCompany(normalized.company);
        return {
            version, role: normalized.role, company: normalized.company, source, wordCount: words.length,
            score: Math.round(earned / available * 100), earned, available, checks, coverage, warnings,
            sampleDetected: placeholders, eligibleForPurchase: !placeholders,
            label: 'Readiness checklist score',
            methodology: 'A transparent, local English-language checklist. Score = earned points / available points, rounded to 100. Unknown checks are excluded. Company selection changes guidance, not the score. Keyword matching uses supported terms and synonyms, not a semantic or proprietary employer ATS model.',
            limitation: 'This is not an employer ATS result, an authenticity check, an eligibility decision, or a prediction of interviews. It cannot verify career claims, link ownership, accessibility of external sites, or private screening rules.',
            guidance: { role: model.findRole(normalized.role).focus, companyName: company.name, company: company.advice, companyUrl: company.url || '', questions: ['Can you substantiate the scope, dates, and outcomes of each example?', 'Does the CV address the required qualifications in this particular job posting?', 'Does the actual application portal preserve your contact details and reading order?'] },
            examples: { action: actionLines.slice(0, 2).map(line => line.slice(0, 220)), outcome: outcomeLines.slice(0, 2).map(line => line.slice(0, 220)) },
            references
        };
    }

    async function fingerprint(input, cryptography = globalThis.crypto) {
        const normalized = normalizeInput(input);
        const content = JSON.stringify([version, normalized.text.replace(/\s+/g, ' '), normalized.role, normalized.company, normalized.jobText.replace(/\s+/g, ' '), normalized.explicit.map(term => term.toLowerCase()).sort(), normalized.source.kind, normalized.source.pages, normalized.source.columns, normalized.source.hasImages, normalized.source.bytes > 2.5 * 1024 * 1024]);
        const digest = await cryptography.subtle.digest('SHA-256', new TextEncoder().encode(content));
        return Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('');
    }

    function reportDefinition(report) {
        if (!report || report.version !== version || !Array.isArray(report.checks) || !Number.isFinite(report.score)) throw new Error('This review report could not be read.');
        const content = [
            { text: 'CV Readiness Review', fontSize: 22, bold: true, color: '#176b5b', margin: [0, 0, 0, 10] },
            { text: report.score + ' / 100', fontSize: 28, bold: true },
            { text: report.label + ' | ' + model.findRole(report.role).name + ' | ' + model.findCompany(report.company).name, margin: [0, 4, 0, 12] },
            { text: report.methodology, fontSize: 9, margin: [0, 0, 0, 8] },
            { text: report.limitation, fontSize: 9, color: '#764235', margin: [0, 0, 0, 14] },
            ...report.checks.flatMap(item => [
                { text: item.title + ' - ' + (item.points === null ? 'Not assessed' : item.points + '/' + item.maximum), bold: true, margin: [0, 8, 0, 3], headlineLevel: 1 },
                { text: item.detail, fontSize: 10 },
                ...(item.recommendation ? [{ text: item.recommendation, color: '#52665c', fontSize: 9, margin: [0, 3, 0, 0] }] : [])
            ]),
            { text: 'Job-description terms', bold: true, fontSize: 14, margin: [0, 18, 0, 7] },
            { text: report.coverage.assessed ? 'Mentioned: ' + (report.coverage.matched.join(', ') || 'None') + '\nNot found: ' + (report.coverage.missing.join(', ') || 'None') : 'No job-specific requirements were assessed.', fontSize: 10 },
            { text: 'Target role and company guidance', bold: true, fontSize: 14, margin: [0, 18, 0, 7] },
            { text: report.guidance.role + '\n\n' + report.guidance.company, fontSize: 10 },
            ...(report.warnings.length ? [{ text: 'Additional checks', bold: true, margin: [0, 14, 0, 6] }, { ul: report.warnings, fontSize: 9 }] : []),
            { text: 'References and scope', bold: true, margin: [0, 16, 0, 6] },
            ...report.references.map(reference => ({ text: reference.title + '\n' + reference.url + '\n' + reference.scope, link: reference.url, fontSize: 8, margin: [0, 0, 0, 7] }))
        ];
        return { pageSize: 'A4', pageMargins: [42, 42, 42, 42], defaultStyle: { font: 'Lato', fontSize: 10, color: '#20362e', lineHeight: 1.15 }, info: { title: 'CV Readiness Review', subject: 'Independent local readiness checklist, not an employer ATS result' }, content, footer: (page, total) => ({ text: page + ' / ' + total, alignment: 'center', fontSize: 8, margin: [0, 12, 0, 0] }), pageBreakBefore: (current, following, next, previous) => Boolean(current.headlineLevel && !following.length && previous.length && next.length) };
    }

    return { version, references, normalizeInput, containsTerm, keywordCoverage, analyze, fingerprint, reportDefinition };
});