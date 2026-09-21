(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.SiteAssistantCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    const actions = {
        templates: { label: 'Browse CV templates', href: '/cv-studio/?view=catalog', icon: 'layout-grid' },
        editor: { label: 'Continue my CV', href: '/cv-studio/?view=editor', icon: 'file-pen-line' },
        review: { label: 'Review a CV / INR 9', href: '/cv-studio/?view=ats', icon: 'scan-text' },
        guides: { label: 'Free study guides', href: '/guides/', icon: 'book-open' },
        courses: { label: 'Explore INR 49 courses', href: '/#courses', icon: 'graduation-cap' },
        dsa: { label: 'DSA sheet / INR 49', href: '/sheets/dsa.html', icon: 'braces' },
        design: { label: 'System design / INR 49', href: '/sheets/system-design.html', icon: 'network' },
        behavioral: { label: 'Behavioral prep / INR 29', href: '/sheets/behavioral.html', icon: 'messages-square' },
        mentoring: { label: 'View mentoring packages', href: '/#packages', icon: 'users' },
        sessions: { label: 'View sessions', href: '/#sessions', icon: 'calendar-days' },
        websites: { label: 'Website and product services', href: '/#services', icon: 'panels-top-left' },
        contact: { label: 'Contact Yasir', href: '/#contact', icon: 'mail' },
        about: { label: 'About Yasir', href: '/#about', icon: 'user-round' },
        experience: { label: 'Career experience', href: '/#experience', icon: 'briefcase-business' },
        support: { label: 'Email purchase support', href: 'mailto:yasir.grc08@gmail.com?subject=Website%20purchase%20support', icon: 'life-buoy' }
    };

    const studioActions = {
        'edit-contact': ['Contact details', 'contact', 'contact-round'],
        'edit-summary': ['Edit summary', 'summary', 'text'],
        'edit-experience': ['Edit experience', 'experience', 'briefcase-business'],
        'edit-projects': ['Edit projects', 'projects', 'folder-code'],
        'edit-education': ['Edit education', 'education', 'graduation-cap'],
        'edit-skills': ['Edit skills', 'skills', 'list-checks'],
        'content-checks': ['Check current CV content', 'checks', 'list-checks'],
        'open-drafts': ['Open local drafts', 'drafts', 'folder-open'],
        'backup-cv': ['Back up current CV', 'backup', 'save'],
        'open-exports': ['Open CV exports / INR 49', 'exports', 'download'],
        'review-current': ['Prepare current CV review', 'review-current', 'scan-text']
    };
    for (const [id, [label, command, icon]] of Object.entries(studioActions)) actions[id] = { label, command, icon, href: '/cv-studio/?view=editor&help=' + command };

    const profiles = [
        { id: 'graduate', label: 'Fresher / graduate', aliases: ['fresher', 'graduate', 'new grad', 'entry level', 'beginner'], template: 'graduate' },
        { id: 'intern', label: 'Student / intern', aliases: ['student', 'intern', 'internship'], template: 'internship' },
        { id: 'frontend', label: 'Frontend engineer', aliases: ['frontend', 'front end', 'react developer', 'web developer'], template: 'centered' },
        { id: 'full-stack', label: 'Full-stack engineer', aliases: ['full stack', 'fullstack', 'full-stack'], template: 'compact' },
        { id: 'backend', label: 'Backend engineer', aliases: ['backend', 'back end', 'api developer'], template: 'classic' },
        { id: 'engineering-manager', label: 'Engineering manager', aliases: ['engineering manager', 'software manager', 'manager', 'people leader'], template: 'manager' },
        { id: 'director', label: 'Engineering director', aliases: ['director', 'head of engineering'], template: 'director' },
        { id: 'principal', label: 'Staff / principal engineer', aliases: ['principal', 'staff engineer', 'architect'], template: 'principal' },
        { id: 'lead', label: 'Senior / technical lead', aliases: ['senior', 'experienced', 'tech lead', 'technical lead'], template: 'senior' },
        { id: 'career-change', label: 'Career switch / lateral', aliases: ['career switch', 'career change', 'lateral', 'switcher'], template: 'career-switch' },
        { id: 'ml', label: 'AI / ML engineer', aliases: ['machine learning', 'ml engineer', 'ai engineer', 'ai ml'], template: 'split' },
        { id: 'data', label: 'Data engineer', aliases: ['data engineer', 'data engineering', 'etl'], template: 'ledger' },
        { id: 'analyst', label: 'Data analyst', aliases: ['data analyst', 'bi analyst', 'analytics'], template: 'analyst' },
        { id: 'business-analyst', label: 'Business analyst', aliases: ['business analyst', 'requirements analyst'], template: 'business-case' },
        { id: 'product-manager', label: 'Product manager', aliases: ['product manager', 'product management'], template: 'product' },
        { id: 'platform', label: 'Platform / SRE', aliases: ['sre', 'devops', 'platform', 'reliability'], template: 'signal' },
        { id: 'systems', label: 'Systems / embedded engineer', aliases: ['systems', 'embedded', 'c++', 'firmware'], template: 'technical' },
        { id: 'security', label: 'Security engineer', aliases: ['security', 'cybersecurity'], template: 'minimal' },
        { id: 'mobile', label: 'Mobile engineer', aliases: ['mobile', 'android', 'ios', 'kotlin', 'swift'], template: 'folio' },
        { id: 'qa', label: 'QA / SDET', aliases: ['qa', 'sdet', 'test engineer', 'quality assurance'], template: 'quality' },
        { id: 'designer', label: 'Product / UX designer', aliases: ['designer', 'ux', 'ui design'], template: 'portrait' },
        { id: 'research', label: 'Research / academic', aliases: ['research', 'academic', 'phd'], template: 'research' },
        { id: 'cloud', label: 'Cloud architect', aliases: ['cloud architect', 'cloud engineer', 'solutions architect'], template: 'profile' },
        { id: 'technical-writer', label: 'Technical writer', aliases: ['technical writer', 'technical writing', 'documentation engineer'], template: 'bajaj-editorial' }
    ];
    const goals = {
        coding: { label: 'Software / coding interviews', guide: 'dsa', course: 'faang', paid: 'dsa', focus: 'data structures, problem solving, debugging, and explaining trade-offs' },
        design: { label: 'Senior / system design', guide: 'system design', course: 'faang', paid: 'design', focus: 'requirements, capacity, APIs, data models, failure recovery, and technical leadership' },
        ml: { label: 'AI / ML / RAG', guide: 'ml', course: 'ai-ml', paid: 'courses', focus: 'baselines, evaluation, leakage, serving constraints, and a reproducible project' },
        data: { label: 'SQL / data roles', guide: 'sql', course: 'sql-data', paid: 'courses', focus: 'SQL correctness, data grain, modeling, pipeline recovery, and analysis evidence' }
    };
    const courses = new Set(['faang', 'ai-ml', 'rag', 'ml-system-design', 'sql-data']);
    const styles = new Set(['simple', 'photo', 'projects', 'community']);
    const templateIds = new Set(profiles.map(profile => profile.template).concat(['bajaj-clean', 'photo-graduate', 'photo-manager', 'project-first']));
    const quickChoices = [
        { label: 'Build a CV', value: 'Help me build a CV' },
        { label: 'Review my CV', value: 'How can I review my CV?' },
        { label: 'Career plan', value: 'Create a career preparation plan' },
        { label: 'Website project', value: 'Help me plan a website project' },
        { label: 'Payment help', value: 'I need payment and access support' }
    ];

    const knowledge = [
        { id: 'about', title: 'About this website', terms: ['yasir', 'who are you', 'who built', 'about the author', 'about this website'], text: 'This is Yasir Arafat Sharfi\'s personal portfolio and preparation-resource website. The homepage presents his software-engineering experience, including Microsoft, alongside independent CV tools, guides, paid preparation products, mentoring, and website services. This helper is an automated site guide, not Yasir or an official Microsoft representative.', actions: ['about', 'experience', 'contact'] },
        { id: 'cv', title: 'Create and edit a CV', terms: ['cv', 'resume', 'résumé', 'template', 'fresher', 'graduate', 'manager', 'photo', 'latex'], text: 'CV Studio has 32 layouts and 24 role examples. Start with a template, choose your role, replace the sample details, and edit with a live PDF preview. Editing and local JSON backups are free. INR 49 once unlocks all layouts and PDF, LaTeX, and complete ZIP exports. No calendar booking is involved. Samples use Yasir Sharfi as an illustrative identity, not a biography.', actions: ['templates', 'editor', 'review'] },
        { id: 'review', title: 'ATS and CV readiness review', terms: ['ats', 'review cv', 'review resume', 'check cv', 'validate', 'scanner', 'score', 'upload', 'docx'], text: 'The INR 9 readiness reviewer accepts your PDF, DOCX, TXT, pasted text, or a studio CV. Readability is checked before payment. Choose the role, optionally add a job description, then purchase one report for that CV and target. The same report can be reopened without another purchase. This is a local English-language checklist, not an employer ATS result or interview prediction. Scanned-only files need OCR elsewhere first.', actions: ['review'] },
        { id: 'career', title: 'Career and interview preparation', terms: ['career', 'guidance', 'roadmap', 'interview', 'faang', 'big tech', 'microsoft', 'amazon', 'google', 'preparation', 'job search'], text: 'This site combines free study guides, paid interview sheets, five INR 49 text courses, CV tools, and one-to-one mentoring. Company labels are preparation guidance, not verified past questions or an offer guarantee. I can help select a path for your role, available time, and budget using those resources.', actions: ['guides', 'courses', 'mentoring'] },
        { id: 'dsa', title: 'Coding interview preparation', terms: ['dsa', 'algorithm', 'algorithms', 'data structures', 'coding interview', 'leetcode', 'python solution'], text: 'The DSA sheet costs INR 49 and includes the original 99-problem sheet plus expanded worked practice. The library has 174 practice questions. Use it with the free DSA study guides and the FAANG preparation course when you need a structured plan. Existing purchases stay separate from CV Studio access.', actions: ['dsa', 'guides', 'courses'] },
        { id: 'design', title: 'System design preparation', terms: ['system design', 'hld', 'lld', 'architecture', 'distributed systems'], text: 'The INR 49 system-design sheet includes the original material, an expanded 57-prompt library, and worked design cases. Free architecture guides and the separate ML system-design course are also available. Choose the material that matches your actual interview role.', actions: ['design', 'guides', 'courses'] },
        { id: 'behavioral', title: 'Behavioral interviews', terms: ['behavioral', 'behavioural', 'star', 'leadership principles', 'stories', 'communication interview'], text: 'Behavioral Prep costs INR 29. It covers STAR, ownership, collaboration, and leadership examples. Use truthful stories from your own work and distinguish your contribution from the team result. Mentoring is available separately for feedback.', actions: ['behavioral', 'mentoring'] },
        { id: 'courses', title: 'Self-study courses', terms: ['course', 'courses', 'rag', 'llm', 'ai ml', 'machine learning', 'sql', 'data practice'], text: 'Five text-based courses cost INR 49 each: FAANG Interview Preparation, AI/ML Foundations, RAG and LLM Engineering, ML System Design, and SQL/Data Practice. Each has eight lessons, answered questions, worked exercises, and a printable PDF. They do not include videos or live mentoring.', actions: ['courses', 'guides'] },
        { id: 'guides', title: 'Free PDF guides', terms: ['free', 'pdf guides', 'study guide', 'study guides', 'download guides', 'library', 'notes'], text: 'The public guide library contains 50 four-page PDFs. You can search by topic, filter categories, download individual guides, or get the complete ZIP without login or payment. Paid sheets, courses, CV exports, and reviews are separate products.', actions: ['guides'] },
        { id: 'mentoring', title: 'Mentoring and sessions', terms: ['mentor', 'mentoring', 'mentorship', 'session', 'booking', 'calendar', 'mock', 'referral'], text: 'The website lists mentoring packages and other sessions with their own prices, durations, and booking details. View the relevant listing before deciding. I cannot promise availability, confirm a booking, submit a referral, or charge you. CV template purchases and readiness reviews do not use the session calendar.', actions: ['mentoring', 'sessions', 'contact'] },
        { id: 'websites', title: 'Website and product services', terms: ['website', 'web site', 'portfolio site', 'landing page', 'web app', 'build site', 'make site', 'app development', 'hire'], text: 'Yasir offers website and product-building services through the website. I can help outline a brief with your audience, pages, features, content, hosting needs, and target timeline, then direct you to the service listing or contact form. Pricing, scope, availability, and delivery need Yasir\'s confirmation; this helper cannot deploy a site or enter an agreement for you.', actions: ['websites', 'contact'] },
        { id: 'payments', title: 'Payment and access support', terms: ['payment', 'paid', 'pay', 'price', 'pricing', 'cost', 'refund', 'receipt', 'razorpay', 'charged', 'unlock', 'purchase', 'lost access'], text: 'CV templates and exports cost INR 49 once; a readiness report costs INR 9 for one CV/target snapshot. DSA and System Design sheets cost INR 49 each, Behavioral Prep INR 29, and each text course INR 49. These are separate purchases; mentoring has its own listed price. Access uses browser receipts, not cloud accounts or independently verified payment records. If a payment was deducted without access, do not pay again: keep the payment reference and contact Yasir. Never share card numbers, passwords, OTPs, API keys, or private receipts in this chat. I cannot verify, refund, or bypass a purchase.', actions: ['support', 'contact'] },
        { id: 'drafts', title: 'Drafts, downloads, and privacy', terms: ['save', 'saved', 'draft', 'drafts', 'backup', 'restore', 'export', 'download cv', 'download resume', 'privacy', 'data'], text: 'CV drafts, photos, and review calculations stay on your device. Drafts are saved in this browser, not a cloud account. Keep a private JSON backup for future editing or another device. After purchase, the editor offers PDF, LaTeX, and complete ZIP exports. Keep access receipts and report backups private. Clearing browser storage can remove local access and drafts.', actions: ['editor', 'support'] }
    ];

    function normalize(value) {
        return String(value || '').normalize('NFKC').toLowerCase().replace(/[’']/g, '').replace(/[^\p{L}\p{N}+#.\s-]/gu, ' ').replace(/\b(prices|templates|resumes|websites|cvs)\b/g, word => word.slice(0, -1)).replace(/\s+/g, ' ').trim();
    }

    function phrasePresent(text, phrase) {
        const escaped = normalize(phrase).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('(^|[^\\p{L}\\p{N}])' + escaped + '($|[^\\p{L}\\p{N}])', 'u').test(text);
    }

    function safeAction(id) {
        return Object.hasOwn(actions, id) ? { id, ...actions[id] } : null;
    }

    function resolveAction(value) {
        if (!value || typeof value !== 'object') return null;
        if (Object.hasOwn(actions, value.id)) return safeAction(value.id);
        if (value.id === 'template' && templateIds.has(value.template) && profiles.some(profile => profile.id === value.role)) return { id: 'template', template: value.template, role: value.role, label: 'Prepare my CV template', icon: 'file-plus-2', href: '/cv-studio/?template=' + value.template + '&role=' + value.role + '&sample=blank' };
        if (value.id === 'guide-search' && ['dsa', 'system design', 'ml', 'sql', 'resume', 'microsoft', 'network', 'os'].includes(value.query)) return { id: value.id, query: value.query, label: 'Find free ' + value.query.toUpperCase() + ' guides', icon: 'book-open', href: '/guides/?q=' + encodeURIComponent(value.query) };
        if (value.id === 'course' && courses.has(value.course)) return { id: value.id, course: value.course, label: 'Open ' + value.course.toUpperCase() + ' course / INR 49', icon: 'graduation-cap', href: '/sheets/course.html?id=' + value.course };
        return null;
    }

    function safeState(value) {
        if (!value || typeof value !== 'object') return {};
        const state = {};
        if (knowledge.some(topic => topic.id === value.topic) || value.topic === 'scope') state.topic = value.topic;
        if (['cv', 'career', 'website'].includes(value.flow)) state.flow = value.flow;
        if (['role', 'style', 'goal', 'time', 'budget', 'type', 'features', 'timeline', 'done'].includes(value.step)) state.step = value.step;
        if (profiles.some(profile => profile.id === value.role)) state.role = value.role;
        if (styles.has(value.style)) state.style = value.style;
        if (Object.hasOwn(goals, value.goal)) state.goal = value.goal;
        if ([30, 60, 90].includes(value.days)) state.days = value.days;
        if (['free', 'self-study', 'mentoring'].includes(value.budget)) state.budget = value.budget;
        if (['Portfolio', 'Business website', 'Web application'].includes(value.project)) state.project = value.project;
        for (const name of ['features', 'timeline']) if (typeof value[name] === 'string') state[name] = value[name].replace(/[\u0000-\u001f]/g, ' ').slice(0, 220);
        return state;
    }

    function detectProfile(text) {
        const normalized = normalize(text);
        const matches = profiles.flatMap(profile => profile.aliases.filter(alias => phrasePresent(normalized, alias)).map(alias => ({ profile, length: alias.length })));
        return matches.sort((left, right) => right.length - left.length)[0]?.profile;
    }

    function looksPrivate(message) {
        return /-----BEGIN|\b(?:sk-[A-Za-z0-9_-]{12,}|(?:pay|order)_[A-Za-z0-9]{6,40}|eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+|Bearer\s+[A-Za-z0-9._-]{16,}|(?:password|passphrase|api[_ -]?key|secret|otp|cvv)\s*[:=]\s*\S+)|\b(?:\d[ -]?){13,19}\b/i.test(message);
    }

    function rank(message) {
        const text = normalize(message);
        return knowledge.map(topic => ({ topic, score: topic.terms.reduce((score, term) => score + (phrasePresent(text, term) ? term.includes(' ') ? 4 : 2 : 0), 0) })).filter(item => item.score > 0).sort((left, right) => right.score - left.score);
    }

    function response(topic, text, extra = {}) {
        return { text, topic: topic?.id || 'scope', actions: (topic?.actions || ['templates', 'guides', 'websites']).map(safeAction), choices: topic ? [] : quickChoices, sources: topic ? [topic.id] : [], state: { topic: topic?.id || 'scope' }, ...extra };
    }

    function flowResponse(state, text, choices = [], extra = {}) {
        const topic = knowledge.find(item => item.id === (state.flow === 'website' ? 'websites' : state.flow));
        return response(topic, text, { actions: [], choices, state: { ...state, topic: topic.id }, ...extra });
    }

    function cvFlow(message, previous) {
        const state = { ...previous, flow: 'cv' };
        const profile = detectProfile(message);
        if (profile) state.role = profile.id;
        if (!state.role) return flowResponse({ ...state, step: 'role' }, 'What kind of CV are you creating? Choose a starting point or name your role; the catalogue has 24 role profiles.', ['Fresher / graduate', 'Backend engineer', 'Frontend engineer', 'Engineering manager', 'Senior engineer', 'Data analyst', 'AI / ML engineer', 'Career switch'].map(label => ({ label, value: label })));
        const text = normalize(message);
        if (/\b(photo|portrait)\b/.test(text)) state.style = 'photo';
        else if (/\b(project|projects)\b/.test(text)) state.style = 'projects';
        else if (/\b(community|bajaj|overleaf|latex)\b/.test(text)) state.style = 'community';
        else if (/\b(simple|clean|single|plain)\b/.test(text)) state.style = 'simple';
        if (!state.style) return flowResponse({ ...state, step: 'style' }, 'For a ' + profiles.find(item => item.id === state.role).label.toLowerCase() + ' CV, which format do you prefer? A simple single-column copy is a conservative application choice. Photos are optional, not an ATS advantage.', [{ label: 'Simple / single column', value: 'Simple single column' }, { label: 'Project-first', value: 'Project-first' }, { label: 'Optional photo', value: 'Optional photo' }, { label: 'Licensed LaTeX format', value: 'Licensed Overleaf format' }]);
        const selected = profiles.find(item => item.id === state.role);
        const template = state.style === 'community' ? 'bajaj-clean' : state.style === 'projects' ? 'project-first' : state.style === 'photo' ? ['engineering-manager', 'director', 'lead', 'principal'].includes(state.role) ? 'photo-manager' : ['graduate', 'intern'].includes(state.role) ? 'photo-graduate' : 'portrait' : selected.template === 'portrait' || selected.template === 'profile' ? 'classic' : selected.template;
        return flowResponse({ ...state, step: 'done' }, 'Your ' + selected.label.toLowerCase() + ' starting point is ready. The template opens as a blank CV; you confirm creation there, so no existing draft is replaced. Editing and backups are free; all-template exports cost INR 49 once.', [], {
            actions: [resolveAction({ id: 'template', template, role: state.role }), safeAction('open-drafts')],
            steps: ['Create the new draft and enter your own contact details.', 'Add relevant experience or projects: your action, technical context, and supportable outcome.', 'Check education, dates, and genuine role-specific skills.', 'Use the content checks, keep a JSON backup, and choose PDF or a complete template ZIP when ready.'],
            choices: [{ label: 'Help with CV sections', value: 'What should I put in my CV sections?' }, { label: 'How do I save it?', value: 'How do I save my CV for later?' }, { label: 'Review before export', value: 'Review my current CV' }]
        });
    }

    function careerFlow(message, previous) {
        const state = { ...previous, flow: 'career' };
        const text = normalize(message);
        if (/\b(sql|data analyst|data engineer|data roles)\b/.test(text)) state.goal = 'data';
        else if (/\b(ml|ai|rag|machine learning)\b/.test(text)) state.goal = 'ml';
        else if (/\b(senior|system design|architecture)\b/.test(text)) state.goal = 'design';
        else if (/\b(software|coding|dsa|fresher|graduate|frontend|backend|full.stack|faang)\b/.test(text)) state.goal = 'coding';
        const duration = text.match(/\b(30|60|90)\s*(?:day|days)?\b/);
        if (duration) state.days = Number(duration[1]);
        if (!state.goal) return flowResponse({ ...state, step: 'goal' }, 'Which preparation path matches your next role?', Object.values(goals).map(goal => ({ label: goal.label, value: goal.label })));
        if (!state.days) return flowResponse({ ...state, step: 'time' }, 'How much time should the plan cover? I will use the study material already on this site.', [30, 60, 90].map(days => ({ label: days + ' days', value: days + ' days' })));
        if (/\b(free|no budget|zero budget)\b/.test(text)) state.budget = 'free';
        else if (/\b(mentoring|mentor|feedback)\b/.test(text)) state.budget = 'mentoring';
        else if (/\b(self.study|paid|course|courses)\b/.test(text)) state.budget = 'self-study';
        if (!state.budget) return flowResponse({ ...state, step: 'budget' }, 'Should the plan use free resources only, paid self-study material, or include an option for mentoring?', [{ label: 'Free resources', value: 'Free resources only' }, { label: 'Paid self-study', value: 'Paid self-study' }, { label: 'Add mentoring', value: 'Include mentoring' }]);
        const goal = goals[state.goal];
        const quarter = Math.round(state.days / 4);
        const steps = [
            'Days 1-' + quarter + ': Read the relevant free guides. Assess your current knowledge and record gaps in ' + goal.focus + '.',
            'Days ' + (quarter + 1) + '-' + quarter * 2 + ': Work through focused exercises. Keep explanations, tests, and a mistake log instead of only counting completed questions.',
            'Days ' + (quarter * 2 + 1) + '-' + quarter * 3 + ': Complete one role-relevant project or design case and practice explaining decisions and limitations.',
            'Days ' + (quarter * 3 + 1) + '-' + state.days + ': Revisit weak areas, run timed practice, prepare truthful experience stories, and tailor your CV to an actual job description.'
        ];
        const links = [resolveAction({ id: 'guide-search', query: goal.guide }), safeAction('templates')];
        if (state.budget !== 'free') links.push(resolveAction({ id: 'course', course: goal.course }), safeAction(goal.paid));
        if (state.budget === 'mentoring') links.push(safeAction('mentoring'));
        const heading = state.days + '-day ' + goal.label.toLowerCase() + ' plan';
        const note = 'Use roughly 45-60 minutes on most study days and adjust to your workload. This is an editorial study plan, not a hiring promise. ' + (state.budget === 'free' ? 'This path does not require a purchase.' : 'Courses, sheets, and mentoring are separate purchases; confirm the displayed price before checkout.');
        return flowResponse({ ...state, step: 'done' }, heading + '. ' + note, [{ label: 'Create a matching CV', value: 'Help me build a CV' }, { label: 'Change my plan', value: 'Create a career preparation plan' }], { steps, actions: links.filter((action, index, values) => values.findIndex(item => item.id === action.id && item.href === action.href) === index), artifact: { name: 'career-preparation-plan.txt', title: 'Download preparation plan', text: heading + '\n\n' + steps.join('\n\n') + '\n\n' + note + '\n\nResources:\n' + links.map(action => 'https://yasirgrc08-techie.github.io' + action.href).join('\n') } });
    }

    function websiteFlow(message, previous) {
        const state = { ...previous, flow: 'website' };
        const text = normalize(message);
        if (/\b(portfolio|personal)\b/.test(text)) state.project = 'Portfolio';
        else if (/\b(web app|application|saas|dashboard)\b/.test(text)) state.project = 'Web application';
        else if (/\b(business|company|landing|shop)\b/.test(text)) state.project = 'Business website';
        if (!state.project) return flowResponse({ ...state, step: 'type' }, 'What kind of project should the website-services brief describe?', ['Portfolio', 'Business website', 'Web application'].map(label => ({ label, value: label })));
        if (previous.step === 'features') state.features = message.replace(/[\u0000-\u001f]/g, ' ').slice(0, 220);
        if (!state.features) return flowResponse({ ...state, step: 'features' }, 'Which features matter for this ' + state.project.toLowerCase() + '? Choose a starting scope or describe it in one short sentence. Do not include passwords or private customer data.', ['Portfolio and contact', 'Business pages and enquiries', 'Accounts and dashboard', 'Product catalogue and payments'].map(label => ({ label, value: label })));
        if (previous.step === 'timeline') state.timeline = message.replace(/[\u0000-\u001f]/g, ' ').slice(0, 120);
        if (!state.timeline) return flowResponse({ ...state, step: 'timeline' }, 'What is your preferred timeline? This records your request, not a delivery commitment.', ['Within a month', 'One to three months', 'Flexible / need advice'].map(label => ({ label, value: label })));
        const brief = 'Website project enquiry\n\nProject type: ' + state.project + '\nRequested features: ' + state.features + '\nPreferred timeline: ' + state.timeline + '\n\nTo confirm with Yasir:\n- Target audience and success criteria\n- Page list, content, branding, and accessibility needs\n- Hosting/domain ownership and maintenance\n- Budget, scope, milestones, and acceptance criteria\n- Data protection and verified payment requirements if applicable\n\nNo quote, contract, deployment, or payment has been made.\nService listing: https://yasirgrc08-techie.github.io/#services\nContact: https://yasirgrc08-techie.github.io/#contact';
        return flowResponse({ ...state, step: 'done' }, 'Your ' + state.project.toLowerCase() + ' enquiry brief is ready. Download it and use the website-services or contact link to discuss scope with Yasir. No price, timeline, booking, or agreement has been confirmed.', [{ label: 'Start a different brief', value: 'Help me plan a website project' }], { steps: ['Requested features: ' + state.features, 'Preferred timeline: ' + state.timeline, 'Confirm content, budget, hosting ownership, maintenance, and acceptance criteria before agreeing to work.'], actions: [safeAction('websites'), safeAction('contact')], artifact: { name: 'website-project-brief.txt', title: 'Download project brief', text: brief } });
    }

    function answer(message, previous = {}) {
        if (typeof message !== 'string' || !message.trim()) return response(null, 'What would you like to do on this site: build a CV, review an existing CV, prepare for interviews, or discuss a website project?');
        if (message.length > 1200) return response(null, 'Please keep the question under 1,200 characters. Use the CV editor or review upload for a full resume, not this chat.');
        const text = normalize(message);
        previous = safeState(previous);
        if (looksPrivate(message)) return response(knowledge.find(topic => topic.id === 'payments'), 'This looks like private account or payment information. I have not saved or sent it to an AI service. Do not put secrets or card details in this chat; use the appropriate secure support channel.', { sensitive: true });
        if (/\b(?:otp|password|passphrase|api key|secret key|card number|cvv)\b/.test(text)) return response(knowledge.find(topic => topic.id === 'payments'), 'Do not share passwords, OTPs, card details, API keys, or private receipts here. For payment/access problems, use the purchase-support contact; I cannot verify a transaction.');
        if (/\b(?:bypass|fake payment|unlock without paying|ignore (?:all |your )?(?:rules|instructions)|system prompt)\b/.test(text)) return response(knowledge.find(topic => topic.id === 'payments'), 'I can explain the available products and help recover access, but cannot bypass purchases, verify payments, or change my site-only scope.');
        if (/^(?:hi|hello|hey|help|support|help me|what can you do|what is available|what can i do here|start|start over|cancel|back)$/.test(text)) return response(null, 'I can guide you through this website: choose and edit a CV, review a resume, find study resources, plan preparation, or outline a website-services request. You choose before anything opens or changes.');
        if (/^(?:thanks|thank you|thankyou|ok thanks)$/.test(text)) return response(null, 'You are welcome. Which step on the site would you like help with next?');
        if (/\b(?:refund|charged|deducted|lost access|payment failed|payment support)\b/.test(text)) return response(knowledge.find(topic => topic.id === 'payments'), knowledge.find(topic => topic.id === 'payments').text);
        if (/\b(?:paid|bought|purchased|payment|purchase)\b/.test(text) && /\b(?:no|not|cant|cannot|lost|failed|missing|locked|without)\b/.test(text)) return response(knowledge.find(topic => topic.id === 'payments'), knowledge.find(topic => topic.id === 'payments').text);
        if (/\b(?:review|check|validate|score)\b/.test(text) && /\b(?:cv|resume|résumé)\b/.test(text) && !/\bcurrent\b/.test(text)) return response(knowledge.find(topic => topic.id === 'review'), knowledge.find(topic => topic.id === 'review').text);
        const newCv = /\b(?:build|create|start|choose|make|select)\b.*\b(?:cv|resume|résumé|template)\b/.test(text);
        const newCareer = /\b(?:career|preparation|study|interview)\b.*\b(?:plan|roadmap|guidance)\b|\bplan\b.*\b(?:interview|career|study)\b/.test(text);
        const newWebsite = /\b(?:build|create|make|plan|design)\b.*\b(?:website|web site|web app|portfolio site)\b/.test(text);
        if (newCv) return cvFlow(message, {});
        if (newCareer) return careerFlow(message, {});
        if (newWebsite) return websiteFlow(message, {});
        if (previous.flow && previous.step !== 'done') {
            const newTopic = rank(message)[0]?.topic.id;
            const unrelated = newTopic && ['payments', 'review', 'drafts', 'guides', 'courses'].includes(newTopic) && !(previous.flow === 'website' && previous.step === 'features' && /payments/.test(text)) && !(previous.flow === 'career' && ['goal', 'budget'].includes(previous.step));
            if (!unrelated) {
                if (previous.flow === 'cv') return cvFlow(message, previous);
                if (previous.flow === 'career') return careerFlow(message, previous);
                if (previous.flow === 'website') return websiteFlow(message, previous);
            }
        }
        if (/\b(?:current cv|current resume)\b/.test(text) && /\b(?:review|check|validate|ats)\b/.test(text)) return response(knowledge.find(topic => topic.id === 'review'), 'I can open the local reviewer and prepare a snapshot of your current CV. You still confirm permission, run the free readability check, and explicitly choose whether to buy the INR 9 report.', { actions: [safeAction('review-current'), safeAction('content-checks')] });
        if (/\b(?:sections|summary|experience|skills|education|projects|bullet|bullets)\b/.test(text) && (/\b(?:cv|resume|résumé)\b/.test(text) || previous.topic === 'cv')) return response(knowledge.find(topic => topic.id === 'cv'), 'Keep every statement accurate and specific. A useful evidence bullet is: what you did + relevant technical or business context + a result or validation you can support. Do not invent metrics or copy sample experience.', { steps: ['Summary: your role, strongest relevant capabilities, and actual work context.', 'Experience and projects: your contribution, decisions, constraints, and validated result.', 'Skills and education: genuine relevant capabilities, accurate dates, and qualification status.'], actions: ['edit-summary', 'edit-experience', 'edit-projects', 'edit-skills', 'edit-education'].map(safeAction) });
        if (/\b(?:save|backup|restore|drafts)\b/.test(text) && (/\b(?:cv|resume|draft|drafts|it)\b/.test(text) || previous.topic === 'cv')) return response(knowledge.find(topic => topic.id === 'drafts'), 'Your CV is saved locally in this browser, not a cloud account. Download a private JSON backup before clearing storage or moving devices. JSON backup is free and includes any selected photograph. Restoring it creates a separate draft rather than replacing the current one.', { actions: ['backup-cv', 'open-drafts', 'editor'].map(safeAction) });
        if (/\b(?:download|export)\b/.test(text) && (/\b(?:cv|resume|pdf|latex|zip)\b/.test(text) || previous.topic === 'cv')) return response(knowledge.find(topic => topic.id === 'drafts'), 'Use the export dialog for PDF, LaTeX, or a complete ZIP. INR 49 once covers all template layouts; the optional readiness report is a separate INR 9 purchase. I can open exports, but you must start and complete checkout yourself.', { actions: ['open-exports', 'backup-cv', 'review-current'].map(safeAction) });
        const matches = rank(message);
        let topic = matches[0]?.topic;
        if (/^(?:how much|price|cost|what does it cost|is it free|is this free)$/.test(text) && knowledge.some(item => item.id === previous.topic)) topic = knowledge.find(item => item.id === previous.topic);
        if (!topic && /^(?:how much|price|cost|what next|next|how|yes|tell me more|more|where|open it)\??$/.test(text)) topic = knowledge.find(item => item.id === previous.topic);
        if (!topic) return response(null, 'I only help with this website and its CV tools, resume reviews, interview resources, mentoring, and website services. Which of those do you need?');
        return response(topic, topic.text, { matches: matches.slice(0, 3).map(item => item.topic.id), choices: topic.id === 'cv' ? [{ label: 'Choose my template', value: 'Help me create a CV' }, { label: 'Write better sections', value: 'What should I put in my CV sections?' }] : topic.id === 'career' ? [{ label: 'Build a preparation plan', value: 'Create a career preparation plan' }] : topic.id === 'websites' ? [{ label: 'Prepare a project brief', value: 'Help me plan a website project' }] : [] });
    }

    return { version: 1, actions, knowledge, profiles, quickChoices, normalize, phrasePresent, safeAction, resolveAction, safeState, looksPrivate, rank, answer };
});