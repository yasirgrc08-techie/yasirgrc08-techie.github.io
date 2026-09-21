(function () {
    'use strict';
    const core = window.SiteAssistantCore;
    const script = document.currentScript;
    if (!core || !script || document.getElementById('site-assistant')) return;
    const assets = new URL('.', script.src);
    const siteRoot = new URL('../', assets);
    const storageKey = 'yasir-site-assistant-tab-v1';
    const host = document.createElement('div');
    host.id = 'site-assistant';
    host.dataset.home = String(location.pathname === siteRoot.pathname || location.pathname === siteRoot.pathname + 'index.html');
    const shadow = host.attachShadow({ mode: 'open' });
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('site-assistant.css?v=20260921', assets).href;
    shadow.append(stylesheet);
    const shell = document.createElement('div');
    shell.innerHTML = `<button id="help-launcher" type="button" aria-expanded="false" aria-controls="help-panel" title="Website help and guided tasks"><span data-icon="MessageCircle" aria-hidden="true">?</span><span>Help</span></button>
        <section id="help-panel" role="dialog" aria-modal="false" aria-labelledby="help-title" hidden>
            <header><div class="help-mark" data-icon="Compass" aria-hidden="true"></div><div class="help-heading"><h2 id="help-title">Site Assistant</h2><span id="help-mode">Local site guide</span></div><button type="button" class="tool" id="help-clear" title="Clear this chat" aria-label="Clear this chat"><span data-icon="RotateCcw" aria-hidden="true"></span></button><a class="tool" id="help-human" title="Contact human support" aria-label="Contact human support"><span data-icon="Mail" aria-hidden="true"></span></a><button type="button" class="tool" id="help-close" title="Close help" aria-label="Close help"><span data-icon="X" aria-hidden="true"></span></button></header>
            <div id="help-context"></div>
            <div id="help-log" role="log" aria-label="Support conversation" aria-live="polite" aria-relevant="additions text" tabindex="0"></div>
            <div id="help-ai-control" hidden><label><input id="help-ai" type="checkbox"> AI-assisted understanding</label><span>Questions go to the configured AI service only when enabled.</span></div>
            <p id="help-status" role="status" aria-live="polite"></p>
            <form id="help-form"><label class="sr-only" for="help-input">Question about this website</label><textarea id="help-input" rows="2" maxlength="1200" placeholder="What do you need help with?" required></textarea><button type="submit" id="help-send" title="Send question" aria-label="Send question"><span data-icon="ArrowUp" aria-hidden="true"></span></button></form>
            <footer><span>Site topics only. No passwords or payment details.</span><span id="help-storage">Saved in this tab / Clear chat to erase</span></footer>
        </section>`;
    shadow.append(shell);
    document.body.append(host);
    const element = id => shadow.getElementById(id);
    const panel = element('help-panel');
    const log = element('help-log');
    const input = element('help-input');
    const launcher = element('help-launcher');
    let questions = [];
    let state = {};
    let busy = false;
    let storageBlocked = false;
    let controller = null;
    let requestSequence = 0;
    let open = false;
    let iconPromise;

    function siteUrl(href) {
        return href.startsWith('mailto:') ? href : new URL(href.replace(/^\//, ''), siteRoot).href;
    }
    element('help-human').href = siteUrl(core.safeAction('support').href);
    function setStatus(text) { element('help-status').textContent = text; }
    function icons() {
        if (!window.lucide?.createElement) return;
        shadow.querySelectorAll('[data-icon]').forEach(node => {
            const definition = window.lucide.icons[node.dataset.icon];
            if (!definition) return;
            const svg = window.lucide.createElement(definition);
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('focusable', 'false');
            node.replaceChildren(svg);
            node.removeAttribute('data-icon');
        });
    }
    function loadIcons() {
        if (window.lucide) { icons(); return; }
        if (!iconPromise) iconPromise = new Promise(resolve => {
            const dependency = document.createElement('script');
            dependency.src = new URL('cv-studio/vendor/lucide.min.js', siteRoot).href;
            dependency.onload = () => { icons(); resolve(); };
            dependency.onerror = () => resolve();
            document.head.append(dependency);
        });
    }
    function persist() {
        if (storageBlocked) return;
        try { sessionStorage.setItem(storageKey, JSON.stringify({ version: 1, questions: questions.slice(-24), open })); }
        catch { storageBlocked = true; element('help-storage').textContent = 'Chat is available for this visit only'; }
    }
    function currentPage() {
        const path = location.pathname.replace(siteRoot.pathname, '');
        if (path.startsWith('cv-studio')) return new URLSearchParams(location.search).get('view') === 'ats' ? { label: 'CV readiness review', question: 'How can I review my CV?' } : { label: 'CV Studio', question: 'Help me with CV sections' };
        if (path.startsWith('guides/')) return { label: 'Free guide library', question: 'How do I find free study guides?' };
        if (path.endsWith('dsa.html')) return { label: 'DSA sheet', question: 'Help me use the DSA sheet' };
        if (path.endsWith('system-design.html')) return { label: 'System design sheet', question: 'Help me use the system design sheet' };
        if (path.endsWith('behavioral.html')) return { label: 'Behavioral prep', question: 'Help with behavioral interview preparation' };
        if (path.endsWith('course.html')) return { label: 'Self-study courses', question: 'Help me use the courses on this site' };
        return { label: 'Yasir Sharfi / portfolio', question: 'What can you do?' };
    }
    function refreshContext() {
        const context = currentPage();
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'context-button';
        button.textContent = 'Help with ' + context.label;
        button.addEventListener('click', () => submitQuestion(context.question));
        element('help-context').replaceChildren(button);
    }
    function scrollLatest() { log.scrollTop = log.scrollHeight; }
    function show() {
        open = true;
        panel.hidden = false;
        launcher.setAttribute('aria-expanded', 'true');
        refreshContext();
        loadIcons();
        scrollLatest();
        input.focus({ preventScroll: true });
        persist();
    }
    function close({ focus = true } = {}) {
        open = false;
        panel.hidden = true;
        launcher.setAttribute('aria-expanded', 'false');
        persist();
        if (focus) launcher.focus({ preventScroll: true });
    }
    function appendUser(text) {
        const article = document.createElement('article');
        article.className = 'message user';
        const label = document.createElement('span');
        label.className = 'message-label';
        label.textContent = 'You';
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        article.append(label, paragraph);
        log.append(article);
    }
    function iconNode(name) {
        const node = document.createElement('span');
        node.dataset.icon = name.replace(/(^|-)([a-z])/g, (_, dash, letter) => letter.toUpperCase());
        node.setAttribute('aria-hidden', 'true');
        return node;
    }
    async function runAction(raw) {
        const action = core.resolveAction(raw);
        if (!action || busy) return;
        if (action.id === 'template' && window.CvStudio?.supportTemplate) {
            const result = window.CvStudio.supportTemplate(action.template, action.role);
            if (result.ok) close({ focus: false });
            else setStatus(result.message);
            return;
        }
        if (action.command && location.pathname.includes('/cv-studio/') && window.CvStudio?.supportAction) {
            try {
                const result = await window.CvStudio.supportAction(action.command);
                if (result?.ok) { setStatus('Opened: ' + action.label); close({ focus: false }); }
                else setStatus(result?.message || 'Finish or discard unapplied editor changes before continuing.');
            } catch { setStatus('This step could not open. Your draft has not been replaced.'); }
            return;
        }
        if (action.command && ['backup', 'review-current'].includes(action.command) && !location.pathname.includes('/cv-studio/')) {
            const result = core.answer(action.command === 'backup' ? 'How do I save my CV?' : 'Review my current CV');
            result.text = 'Open your current CV first, then choose this action from Help inside the studio. I will not automatically download a file or process a draft just by changing pages.';
            result.actions = [core.safeAction('editor')];
            appendAssistant(result);
            return;
        }
        if (action.href.startsWith('mailto:')) {
            const anchor = document.createElement('a');
            anchor.href = siteUrl(action.href);
            anchor.click();
            setStatus('A support email draft was requested. Nothing has been sent by this helper.');
            return;
        }
        close({ focus: false });
        location.assign(siteUrl(action.href));
    }
    function downloadArtifact(artifact) {
        if (!artifact || !['career-preparation-plan.txt', 'website-project-brief.txt'].includes(artifact.name) || typeof artifact.text !== 'string' || artifact.text.length > 10000) return;
        const url = URL.createObjectURL(new Blob([artifact.text], { type: 'text/plain;charset=utf-8' }));
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = artifact.name;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        setStatus('Your ' + (artifact.name.startsWith('career') ? 'preparation plan' : 'project brief') + ' is ready to download.');
    }
    function appendAssistant(result, { replay = false } = {}) {
        log.querySelectorAll('.choices').forEach(node => node.remove());
        const article = document.createElement('article');
        article.className = 'message assistant';
        const label = document.createElement('span');
        label.className = 'message-label';
        label.textContent = result.ai ? 'Site guide / AI-assisted match' : 'Site guide';
        const paragraph = document.createElement('p');
        paragraph.textContent = result.text;
        article.append(label, paragraph);
        if (Array.isArray(result.steps) && result.steps.length) {
            const list = document.createElement('ol');
            result.steps.forEach(step => { const item = document.createElement('li'); item.textContent = step; list.append(item); });
            article.append(list);
        }
        if (result.sources?.length) {
            const source = document.createElement('span');
            source.className = 'source';
            source.textContent = 'Source: ' + result.sources.map(id => core.knowledge.find(topic => topic.id === id)?.title).filter(Boolean).join(', ');
            article.append(source);
        }
        if (result.actions?.length) {
            const group = document.createElement('div');
            group.className = 'actions';
            result.actions.forEach(raw => {
                const action = core.resolveAction(raw);
                if (!action) return;
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.action = action.id;
                button.append(iconNode(action.icon), document.createTextNode(action.label));
                button.addEventListener('click', () => runAction(action));
                group.append(button);
            });
            article.append(group);
        }
        if (result.artifact) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'artifact';
            button.append(iconNode('download'), document.createTextNode(result.artifact.title));
            button.addEventListener('click', () => downloadArtifact(result.artifact));
            article.append(button);
        }
        if (result.choices?.length) {
            const group = document.createElement('div');
            group.className = 'choices';
            result.choices.forEach(choice => {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = choice.label;
                button.addEventListener('click', () => submitQuestion(choice.value));
                group.append(button);
            });
            article.append(group);
        }
        log.append(article);
        while (log.children.length > 51) log.firstElementChild.remove();
        icons();
        if (!replay) scrollLatest();
    }
    function validatedBase(value) {
        if (!value) return '';
        try {
            const url = new URL(value);
            const local = ['localhost', '127.0.0.1'].includes(url.hostname) && ['localhost', '127.0.0.1'].includes(location.hostname);
            if ((url.protocol !== 'https:' && !(local && url.protocol === 'http:')) || url.pathname !== '/' || url.username || url.password || url.search || url.hash) return '';
            return url.origin;
        } catch { return ''; }
    }
    const aiBase = validatedBase(window.SITE_ASSISTANT_CONFIG?.aiBase);
    element('help-ai-control').hidden = !aiBase;
    async function submitQuestion(value) {
        const message = String(value).trim();
        if (!message || busy) return;
        if (message.length > 1200) { setStatus('Keep questions under 1,200 characters. Use the CV tools for complete resumes.'); return; }
        const local = core.answer(message, state);
        if (local.sensitive) { appendAssistant(local); input.value = ''; return; }
        const currentSequence = ++requestSequence;
        input.value = '';
        appendUser(message);
        questions.push(message);
        if (questions.length > 24) questions = questions.slice(-24);
        let result = local;
        busy = true;
        element('help-send').disabled = true;
        try {
            if (aiBase && element('help-ai').checked && !local.state.flow && local.topic !== 'payments' && !/\b(?:password|otp|cvv|api key)\b/i.test(message)) {
                const requestController = new AbortController();
                controller = requestController;
                const timer = setTimeout(() => requestController.abort(), 9000);
                setStatus('Matching your question to the site knowledge...');
                try {
                    const response = await fetch(aiBase + '/api/assist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, previousTopic: state.topic || 'scope' }), signal: requestController.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
                    if (!response.ok) throw new Error('Service unavailable');
                    const data = await response.json();
                    const topic = core.knowledge.find(item => item.id === data.topic);
                    if (topic && data.mode === 'ai') result = { ...core.answer(topic.terms[0]), ai: true };
                    setStatus('');
                } catch {
                    if (currentSequence !== requestSequence) return;
                    setStatus('AI service unavailable. The local site guide is still working.');
                } finally { clearTimeout(timer); if (controller === requestController) controller = null; }
            } else setStatus('');
            if (currentSequence !== requestSequence) return;
            state = core.safeState(result.state);
            appendAssistant(result);
            persist();
        } finally {
            if (currentSequence === requestSequence) {
                busy = false;
                element('help-send').disabled = false;
                input.focus({ preventScroll: true });
            }
        }
    }
    function restore() {
        let saved;
        try {
            const raw = sessionStorage.getItem(storageKey);
            if (raw && raw.length > 40000) throw new Error('Oversized support history');
            if (raw) saved = JSON.parse(raw);
            if (saved && (saved.version !== 1 || !Array.isArray(saved.questions) || saved.questions.length > 24 || saved.questions.some(question => typeof question !== 'string' || question.length > 1200 || core.looksPrivate(question)))) throw new Error('Invalid support history');
        } catch { saved = null; storageBlocked = true; element('help-storage').textContent = 'Saved chat could not load / Clear chat to reset'; }
        log.setAttribute('aria-live', 'off');
        appendAssistant(core.answer('hello'), { replay: true });
        if (saved) {
            questions = saved.questions;
            for (const question of questions) {
                appendUser(question);
                const reply = core.answer(question, state);
                state = core.safeState(reply.state);
                appendAssistant(reply, { replay: true });
            }
        }
        log.setAttribute('aria-live', 'polite');
        if (saved?.open) show();
    }
    launcher.addEventListener('click', () => open ? close() : show());
    element('help-close').addEventListener('click', () => close());
    element('help-form').addEventListener('submit', event => { event.preventDefault(); submitQuestion(input.value); });
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) { event.preventDefault(); submitQuestion(input.value); }
    });
    shadow.addEventListener('keydown', event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); close(); } });
    document.addEventListener('beforetoggle', event => {
        if (open && event.newState === 'open' && event.target instanceof Element && event.target.matches('dialog, [popover]')) close({ focus: false });
    }, true);
    element('help-clear').addEventListener('click', () => {
        requestSequence++;
        controller?.abort();
        controller = null;
        busy = false;
        element('help-send').disabled = false;
        element('help-ai').checked = false;
        element('help-mode').textContent = 'Local site guide';
        questions = [];
        state = {};
        storageBlocked = false;
        try { sessionStorage.removeItem(storageKey); } catch { storageBlocked = true; }
        element('help-storage').textContent = storageBlocked ? 'Chat is available for this visit only' : 'Saved in this tab / Clear chat to erase';
        log.replaceChildren();
        appendAssistant(core.answer('hello'));
        setStatus('Chat cleared. Your CV drafts and purchases were not changed.');
        input.focus();
    });
    element('help-ai').addEventListener('change', event => {
        element('help-mode').textContent = event.target.checked ? 'AI-assisted site guide' : 'Local site guide';
        setStatus(event.target.checked ? 'Only your next support questions and topic are sent to the configured AI service. No CV, purchase record, or page content is attached.' : 'Local mode. Questions are not sent to an AI service.');
    });
    function theme() { host.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'; }
    new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    theme();
    refreshContext();
    restore();
    loadIcons();
    window.SiteAssistant = { open: show, close, ask: message => { show(); return submitQuestion(message); }, mode: aiBase ? 'ai-optional' : 'local', context: () => currentPage().label };
})();