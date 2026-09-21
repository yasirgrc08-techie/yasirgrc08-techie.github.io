(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    const templates = [
        { id: 'classic', name: 'Classic', family: 'Essential', layout: 'single', font: 'Lato', heading: 'rule', header: 'left', color: '#176b5b', density: 'regular', description: 'Single-column, familiar section order, restrained rules.' },
        { id: 'compact', name: 'Compact', family: 'Essential', layout: 'single', font: 'Lato', heading: 'plain', header: 'left', color: '#273541', density: 'compact', description: 'Tighter spacing for a concise engineering resume.' },
        { id: 'centered', name: 'Centered', family: 'Essential', layout: 'single', font: 'Lato', heading: 'rule', header: 'center', color: '#273541', density: 'regular', description: 'Centered identity above a clear chronological document.' },
        { id: 'minimal', name: 'Minimal', family: 'Essential', layout: 'single', font: 'Lato', heading: 'plain', header: 'left', color: '#273541', density: 'airy', description: 'Typography and whitespace, without decorative elements.' },
        { id: 'graduate', name: 'Graduate', family: 'Early Career', layout: 'single', font: 'Lato', heading: 'label', header: 'left', color: '#245ca7', density: 'regular', description: 'Distinct section labels for education and project evidence.' },
        { id: 'research', name: 'Research', family: 'Academic', layout: 'single', font: 'PlexSerif', heading: 'rule', header: 'center', color: '#273541', density: 'regular', description: 'Serif typography suited to research and publications.' },
        { id: 'scholar', name: 'Scholar', family: 'Academic', layout: 'single', font: 'PlexSerif', heading: 'plain', header: 'left', color: '#574144', density: 'airy', description: 'An open academic CV that grows across pages.' },
        { id: 'executive', name: 'Executive', family: 'Experienced', layout: 'single', font: 'PlexSerif', heading: 'label', header: 'left', color: '#273541', density: 'regular', description: 'A strong hierarchy for ownership and leadership experience.' },
        { id: 'principal', name: 'Principal', family: 'Experienced', layout: 'single', font: 'Lato', heading: 'rule', header: 'left', color: '#245ca7', density: 'airy', description: 'Generous spacing for architecture and technical leadership.' },
        { id: 'technical', name: 'Technical', family: 'Engineering', layout: 'single', font: 'Lato', heading: 'label', header: 'left', color: '#176b5b', density: 'compact', description: 'Compact labels that keep technical evidence easy to scan.' },
        { id: 'ledger', name: 'Ledger', family: 'Engineering', layout: 'single', font: 'PlexSerif', heading: 'rule', header: 'left', color: '#245ca7', density: 'compact', description: 'A structured serif layout for detailed technical careers.' },
        { id: 'signal', name: 'Signal', family: 'Engineering', layout: 'single', font: 'Lato', heading: 'band', header: 'left', color: '#a14337', density: 'regular', description: 'Lightly tinted headings with a clear single reading order.' },
        { id: 'folio', name: 'Folio', family: 'Portfolio', layout: 'single', font: 'PlexSerif', heading: 'band', header: 'center', color: '#176b5b', density: 'regular', description: 'Editorial type with subtle section highlights.' },
        { id: 'split', name: 'Split', family: 'Two Column', layout: 'split', font: 'Lato', heading: 'rule', header: 'left', color: '#245ca7', density: 'regular', description: 'Skills and education beside the experience narrative.' },
        { id: 'sidebar', name: 'Sidebar', family: 'Two Column', layout: 'sidebar', font: 'Lato', heading: 'label', header: 'left', color: '#176b5b', density: 'regular', description: 'A tinted side column for supporting credentials.' },
        { id: 'duet', name: 'Duet', family: 'Two Column', layout: 'split', font: 'PlexSerif', heading: 'plain', header: 'center', color: '#574144', density: 'airy', description: 'Serif contrast and a two-column supporting section.' }
    ];

    const roles = [
        { id: 'graduate', name: 'Student / New Graduate', headline: 'Software Engineering Graduate', focus: 'Lead with education and substantial projects when professional experience is limited. Explain your own implementation, tests, and constraints.', skills: 'Languages: Python, Java, SQL\nFoundations: Data structures, operating systems, networking\nTools: Git, pytest, Linux', project: 'Campus Study Planner', projectLine: 'Built a course-planning tool with prerequisite validation and tests for conflicting schedules.', experience: 'Software Engineering Intern', experienceLine: 'Added input-validation tests and documented a reproducible local development workflow.', educationFirst: true },
        { id: 'backend', name: 'Backend Engineering', headline: 'Backend Software Engineer', focus: 'Show API contracts, data ownership, correctness, reliability, and operational responsibility. Include measured outcomes only when you can substantiate them.', skills: 'Languages: Python, TypeScript, SQL\nBackend: REST APIs, PostgreSQL, Redis\nTools: Docker, Git, automated testing', project: 'Reliable Task Service', projectLine: 'Implemented idempotent task creation and worker-restart recovery with integration tests.', experience: 'Software Engineer', experienceLine: 'Implemented an API change with schema validation, migration tests, and documented failure handling.' },
        { id: 'frontend', name: 'Frontend Engineering', headline: 'Frontend Engineer', focus: 'Describe user workflows, accessibility, state management, tested behavior, and measured performance. Distinguish visual polish from product and engineering outcomes.', skills: 'Languages: TypeScript, JavaScript, HTML, CSS\nFrontend: React, accessibility, responsive design\nTools: Playwright, Git, browser profiling', project: 'Accessible Project Dashboard', projectLine: 'Built keyboard-accessible filtering and tested responsive layouts and empty states.', experience: 'Frontend Engineer', experienceLine: 'Delivered a reusable form workflow with validation, error recovery, and automated interaction tests.' },
        { id: 'full-stack', name: 'Full-Stack Engineering', headline: 'Full-Stack Software Engineer', focus: 'Explain one complete user journey across UI, API, and database. Be specific about ownership and avoid listing every framework you have briefly tried.', skills: 'Languages: TypeScript, Python, SQL\nStack: React, Node.js, PostgreSQL\nPractices: API design, testing, CI/CD', project: 'Appointment Booking Service', projectLine: 'Connected a booking interface to transactional availability checks and a tested cancellation flow.', experience: 'Full-Stack Engineer', experienceLine: 'Implemented a feature across the client and service layers with contract and regression tests.' },
        { id: 'mobile', name: 'Mobile Engineering', headline: 'Mobile Software Engineer', focus: 'Emphasize lifecycle, offline behavior, accessibility, battery/network considerations, releases, and crash diagnosis relevant to your actual platform experience.', skills: 'Languages: Kotlin, Swift\nMobile: Android, iOS, offline synchronization\nPractices: UI tests, profiling, release validation', project: 'Offline Reading App', projectLine: 'Implemented versioned local storage and a conflict-aware synchronization flow for saved articles.', experience: 'Mobile Engineer', experienceLine: 'Added lifecycle-aware request cancellation and tests for interrupted navigation and network recovery.' },
        { id: 'platform', name: 'Platform / SRE', headline: 'Platform and Reliability Engineer', focus: 'Show service ownership, observability, capacity, automation, and incident learning. State the workload and method behind reliability or latency claims.', skills: 'Languages: Go, Python, Bash\nPlatform: Linux, containers, Kubernetes\nReliability: Observability, incident response, CI/CD', project: 'Service Health Monitor', projectLine: 'Built a local monitoring demo with explicit health checks, alert thresholds, and a recovery runbook.', experience: 'Platform Engineer', experienceLine: 'Improved a deployment workflow with readiness checks, rollback validation, and structured logs.' },
        { id: 'data', name: 'Data Engineering', headline: 'Data Engineer', focus: 'Make data grain, quality, lineage, orchestration, backfills, and recovery visible. Distinguish a pipeline prototype from production-scale operation.', skills: 'Languages: Python, SQL\nData: PostgreSQL, batch pipelines, data modeling\nPractices: Data quality, orchestration, lineage', project: 'Versioned Analytics Pipeline', projectLine: 'Created an incremental pipeline with duplicate-event handling and reproducible backfill tests.', experience: 'Data Engineer', experienceLine: 'Added schema and freshness checks to a data transformation workflow and documented recovery steps.' },
        { id: 'ml', name: 'AI / ML Engineering', headline: 'Machine Learning Engineer', focus: 'State the prediction problem, valid split, baseline, metric, and deployment constraints. Avoid unsupported accuracy figures or claims that omit leakage and evaluation details.', skills: 'Languages: Python, SQL\nML: scikit-learn, PyTorch, model evaluation\nSystems: Feature pipelines, serving, experiment tracking', project: 'Document Retrieval Evaluation', projectLine: 'Compared lexical and vector retrieval on a versioned query set with separate relevance and latency measurements.', experience: 'ML Engineer', experienceLine: 'Built a reproducible baseline and checked feature timing, data leakage, and evaluation consistency.' },
        { id: 'security', name: 'Security Engineering', headline: 'Security Engineer', focus: 'Describe authorized defensive work, risk reduction, secure design, and validation. Never publish customer vulnerabilities, secrets, or confidential incident details.', skills: 'Languages: Python, Go\nSecurity: Threat modeling, application security, IAM\nPractices: Secure review, testing, incident analysis', project: 'API Authorization Test Harness', projectLine: 'Created synthetic tenant-isolation tests for object-level authorization and token validation.', experience: 'Security Engineer', experienceLine: 'Reviewed a service boundary and added regression tests for invalid credentials and cross-tenant access.' },
        { id: 'systems', name: 'Systems / Embedded', headline: 'Systems Software Engineer', focus: 'Explain resource lifetime, concurrency, hardware/software interfaces, debugging, and performance evidence. Keep proprietary platform details out of public resumes.', skills: 'Languages: C, C++, Python\nSystems: Linux, concurrency, networking\nTools: GDB, sanitizers, profiling', project: 'Bounded Work Queue', projectLine: 'Implemented a producer-consumer queue with graceful shutdown and contention-focused tests.', experience: 'Systems Engineer', experienceLine: 'Diagnosed a resource-lifetime defect and added a regression test for the relevant shutdown ordering.' },
        { id: 'lead', name: 'Senior / Technical Lead', headline: 'Senior Software Engineer', focus: 'Show technical scope, decisions, cross-team influence, mentoring, and verified outcomes. Separate your own actions from the broader team achievement.', skills: 'Engineering: Architecture, API design, reliability\nLeadership: Technical planning, mentoring, reviews\nTools: Your strongest production stack', project: 'Migration Design Case Study', projectLine: 'Documented a staged migration with compatibility checks, rollback criteria, and operational ownership.', experience: 'Senior Software Engineer', experienceLine: 'Led a design review that clarified ownership, failure boundaries, and a testable rollout plan.' },
        { id: 'research', name: 'Research / Academic', headline: 'Research Engineer', focus: 'Use the length your actual work requires. Include research questions, methods, reproducible artifacts, and correctly attributed publications rather than forcing an academic CV into one page.', skills: 'Languages: Python, C++\nResearch: Experimental design, evaluation, reproducibility\nTools: PyTorch, LaTeX, Git', project: 'Reproducible Model Benchmark', projectLine: 'Built a controlled comparison with documented datasets, parameters, baselines, and limitations.', experience: 'Research Assistant', experienceLine: 'Implemented an experiment pipeline and reviewed reproducibility, data provenance, and error analysis.', educationFirst: true }
    ];

    const companies = [
        { id: 'general', name: 'Big Tech / General', advice: 'Match the actual role requirements. Prefer clear evidence of ownership, implementation, testing, and results. No template guarantees ATS acceptance or an interview.' },
        { id: 'microsoft', name: 'Microsoft', advice: 'Use the role description to select relevant problem solving, design, coding, testing, and domain evidence. Be precise about your contribution; this is not an official Microsoft CV template.', url: 'https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing' },
        { id: 'google', name: 'Google', advice: 'Highlight relevant technical work and explain scope and outcomes with evidence. Confirm role and level requirements. This track is preparation guidance, not an employer-approved format.', url: 'https://www.google.com/about/careers/applications/how-we-hire/' },
        { id: 'amazon', name: 'Amazon', advice: 'Show ownership, customer context, technical decisions, and supportable results. Use real examples rather than adding Leadership Principle slogans to every bullet.', url: 'https://www.amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep' },
        { id: 'meta', name: 'Meta', advice: 'Make product impact, implementation, collaboration, and engineering depth easy to find when relevant to the role. Do not imply a standard template or a verified screening formula.' },
        { id: 'apple', name: 'Apple', advice: 'Prioritize the specialization in the job description and show detail-oriented engineering and collaboration. Do not expose confidential product or hardware information.', url: 'https://www.apple.com/careers/us/work-at-apple.html' },
        { id: 'netflix', name: 'Netflix', advice: 'Connect technical decisions to the product, operational judgment, and your actual scope. Be candid about trade-offs and lessons instead of exaggerating scale.', url: 'https://jobs.netflix.com/culture' },
        { id: 'nvidia', name: 'NVIDIA', advice: 'For relevant roles, emphasize systems, performance, memory, concurrency, or ML-serving evidence. Include workload and measurement context for performance results.', url: 'https://www.nvidia.com/en-us/about-nvidia/careers/how-we-hire/' }
    ];

    const sectionNames = { summary: 'Summary', skills: 'Technical Skills', experience: 'Experience', projects: 'Projects', education: 'Education', certifications: 'Certifications', publications: 'Publications', awards: 'Awards and Leadership', languages: 'Languages', custom: 'Additional Experience' };
    const colors = ['#176b5b', '#245ca7', '#273541', '#a14337', '#574144', '#166875'];
    const findTemplate = id => templates.find(template => template.id === id) || templates[0];
    const findRole = id => roles.find(role => role.id === id) || roles[1];
    const findCompany = id => companies.find(company => company.id === id) || companies[0];

    function text(value, limit = 500) {
        if (value === undefined || value === null) return '';
        if (typeof value !== 'string') throw new Error('Text fields must contain text, not objects or numbers.');
        if (value.length > limit) throw new Error('A text field exceeds the ' + limit + '-character limit.');
        return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '');
    }

    function safeLink(value) {
        if (!value || typeof value !== 'string') return null;
        const candidate = value.trim();
        if (/^[a-z][a-z0-9+.-]*:/i.test(candidate) && !/^https?:/i.test(candidate)) return null;
        try {
            const url = new URL(/^https?:\/\//i.test(candidate) ? candidate : 'https://' + candidate);
            if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) return null;
            return url.href;
        } catch { return null; }
    }

    function newItem() {
        return { heading: '', subheading: '', location: '', start: '', end: '', url: '', bullets: [] };
    }

    function newSection(kind, id) {
        return { id: id || kind, kind, title: sectionNames[kind] || 'Additional Section', visible: true, content: '', items: ['summary', 'skills', 'languages'].includes(kind) ? [] : [newItem()] };
    }

    function normalizeResume(input) {
        if (!input || typeof input !== 'object' || Array.isArray(input) || input.version !== 1) throw new Error('Choose a CV Studio version 1 JSON document.');
        if (!input.basics || typeof input.basics !== 'object' || Array.isArray(input.basics)) throw new Error('The document is missing contact information.');
        if (!Array.isArray(input.sections) || input.sections.length > 16) throw new Error('A CV can contain up to 16 sections.');
        const ids = new Set();
        const sections = input.sections.map(section => {
            if (!section || !/^[a-z][a-z0-9-]{0,70}$/.test(section.id) || ids.has(section.id)) throw new Error('Section IDs must be unique letters, digits, and hyphens.');
            if (!Object.hasOwn(sectionNames, section.kind)) throw new Error('Unsupported section kind.');
            ids.add(section.id);
            const items = section.items || [];
            if (!Array.isArray(items) || items.length > 35) throw new Error('A section can contain up to 35 entries.');
            return {
                id: section.id, kind: section.kind, title: text(section.title || sectionNames[section.kind], 80), visible: section.visible !== false,
                content: text(section.content, 3500), items: items.map(item => {
                    if (!item || typeof item !== 'object') throw new Error('Invalid CV entry.');
                    if (!Array.isArray(item.bullets || []) || (item.bullets || []).length > 15) throw new Error('An entry can contain up to 15 bullets.');
                    return { heading: text(item.heading, 180), subheading: text(item.subheading, 180), location: text(item.location, 120), start: text(item.start, 40), end: text(item.end, 40), url: text(item.url, 350), bullets: (item.bullets || []).map(bullet => text(bullet, 700)) };
                })
            };
        });
        const basics = {};
        for (const field of ['name', 'headline', 'email', 'phone', 'location', 'website', 'linkedin', 'github']) basics[field] = text(input.basics[field], field === 'headline' ? 180 : 350);
        const settings = input.settings || {};
        const template = findTemplate(input.template);
        return {
            version: 1, title: text(input.title || 'Untitled CV', 100), template: template.id,
            role: findRole(input.role).id, company: findCompany(input.company).id, example: input.example === true,
            settings: { paper: settings.paper === 'LETTER' ? 'LETTER' : 'A4', fontSize: [9, 10, 11, 12].includes(settings.fontSize) ? settings.fontSize : 10, spacing: ['compact', 'regular', 'airy'].includes(settings.spacing) ? settings.spacing : template.density, accent: colors.includes(settings.accent) ? settings.accent : template.color, font: ['Lato', 'PlexSerif'].includes(settings.font) ? settings.font : template.font, margins: [32, 40, 48, 56].includes(settings.margins) ? settings.margins : 40, pageNumbers: settings.pageNumbers === true },
            basics, sections
        };
    }

    function starter(roleId = 'backend', blank = false) {
        const role = findRole(roleId);
        const template = role.id === 'research' ? 'research' : role.id === 'graduate' ? 'graduate' : 'classic';
        const sections = [newSection('summary'), newSection('skills'), newSection('experience'), newSection('projects'), newSection('education')];
        if (!blank) {
            sections[0].content = role.headline + ' focused on clear software contracts, tested implementations, and maintainable systems. This fictional example is a starting point, not a claim about your experience.';
            sections[1].content = role.skills;
            sections[2].items = [{ ...newItem(), heading: role.experience, subheading: 'Example Company', location: 'Your city', start: '2024', end: 'Present', bullets: [role.experienceLine, 'Collaborated on code reviews and documented the assumptions and limitations of the change.'] }];
            sections[3].items = [{ ...newItem(), heading: role.project, subheading: 'Personal project', url: 'https://example.com/project', bullets: [role.projectLine, 'Published setup instructions, synthetic test data, and a description of the design trade-offs.'] }];
            sections[4].items = [{ ...newItem(), heading: 'B.Tech. in Computer Science', subheading: 'Example University', location: 'Your city', start: '2020', end: '2024', bullets: ['Relevant coursework: Algorithms, databases, operating systems.'] }];
        }
        if (role.educationFirst) sections.splice(1, 0, sections.pop());
        return normalizeResume({ version: 1, title: blank ? 'Untitled CV' : role.name + ' CV', template, role: role.id, company: 'general', example: !blank, settings: {}, basics: { name: blank ? '' : 'Alex Morgan', headline: blank ? '' : role.headline, email: blank ? '' : 'alex@example.com', phone: '', location: blank ? '' : 'Your city, Country', website: '', linkedin: '', github: '' }, sections });
    }

    function applyTemplate(input, id) {
        const document = normalizeResume(input);
        const template = findTemplate(id);
        document.template = template.id;
        Object.assign(document.settings, { accent: template.color, font: template.font, spacing: template.density });
        return document;
    }

    function plainText(input) {
        const document = normalizeResume(input);
        const lines = [document.basics.name, document.basics.headline, ...['email', 'phone', 'location', 'website', 'linkedin', 'github'].map(field => document.basics[field])].filter(Boolean);
        for (const section of document.sections.filter(section => section.visible)) {
            lines.push('', section.title);
            if (section.content) lines.push(section.content);
            for (const item of section.items) {
                lines.push([item.heading, item.subheading, item.location, [item.start, item.end].filter(Boolean).join(' - ')].filter(Boolean).join(' | '));
                if (item.url) lines.push(item.url);
                lines.push(...item.bullets.filter(Boolean).map(bullet => '- ' + bullet));
            }
        }
        return lines.join('\n');
    }

    function review(input, jobText = '') {
        const document = normalizeResume(input);
        const findings = [];
        if (!document.basics.name.trim()) findings.push({ level: 'required', title: 'Add your name', detail: 'Use the name you want recruiters to see.' });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.basics.email)) findings.push({ level: 'required', title: 'Check your email', detail: 'A valid contact email is missing.' });
        const content = plainText(document);
        if (/Example Company|Example University|alex@example\.com|fictional example|Your city/i.test(content)) findings.push({ level: 'review', title: 'Replace example information', detail: 'Fictional sample details remain. Only submit your real experience and credentials.' });
        const visible = document.sections.filter(section => section.visible);
        if (!visible.some(section => ['experience', 'projects'].includes(section.kind) && section.items.some(item => item.heading.trim()))) findings.push({ level: 'review', title: 'Add evidence of your work', detail: 'Include relevant experience or substantial projects with your specific contribution.' });
        const longBullets = visible.flatMap(section => section.items).flatMap(item => item.bullets).filter(bullet => bullet.trim().split(/\s+/).length > 45).length;
        if (longBullets) findings.push({ level: 'review', title: 'Shorten ' + longBullets + ' long bullet' + (longBullets === 1 ? '' : 's'), detail: 'Prioritize the action, technical context, and supportable result. Do not invent a metric to shorten the story.' });
        const links = [...['website', 'linkedin', 'github'].map(field => document.basics[field]), ...visible.flatMap(section => section.items.map(item => item.url))].filter(Boolean);
        if (links.some(link => !safeLink(link))) findings.push({ level: 'review', title: 'Check link format', detail: 'Only public HTTP/HTTPS links are exported as clickable links. Unsupported schemes remain plain text.' });
        if (findTemplate(document.template).layout !== 'single') findings.push({ level: 'note', title: 'Check two-column reading order', detail: 'Some parsing systems read columns differently. Prefer a single-column layout when the employer does not specify a format.' });
        findings.push({ level: 'note', title: 'Validate every achievement', detail: 'Use metrics only when you can explain the measurement and your contribution. No layout guarantees an interview or an ATS result.' });
        const stop = new Set('and the for with your this that from will are our you have has into about role team work years required experience skills preferred ability using knowledge strong excellent must should their them each also more such than some'.split(' '));
        const tokens = [...new Set(String(jobText).toLowerCase().match(/[a-z][a-z0-9+#.-]{2,}/g) || [])].filter(token => !stop.has(token)).slice(0, 45);
        const lower = content.toLowerCase();
        return { findings, wordCount: content.trim().split(/\s+/).filter(Boolean).length, matched: tokens.filter(token => lower.includes(token)), missing: tokens.filter(token => !lower.includes(token)) };
    }

    return { templates, roles, companies, colors, sectionNames, findTemplate, findRole, findCompany, safeLink, newItem, newSection, normalizeResume, starter, applyTemplate, plainText, review };
});