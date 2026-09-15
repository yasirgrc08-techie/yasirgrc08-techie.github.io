(function () {
    'use strict';

    const library = window.INTERVIEW_LIBRARY || { dsa: [], design: [], sources: [] };

    const entries = library.dsa.flatMap(group => group.questions.map(question => ({
        id: 'dsa-' + question[0],
        title: question[1],
        level: question[2],
        hint: question[3],
        companies: question[4]?.companies || [],
        solution: question[4]?.solution || null,
        track: 'dsa',
        topic: group.topic,
        reference: 'https://leetcode.com/problems/' + question[0] + '/'
    }))).concat(library.design.map(question => ({ ...question, id: question.track + '-' + question.id })));
    const entryIds = new Set(entries.map(entry => entry.id));
    const storageKey = 'yasir-prep-progress-v1';
    const trackNames = { all: 'All questions', dsa: 'DSA', hld: 'High-level design', lld: 'Low-level design', ai: 'AI systems' };
    const trackLabels = { dsa: 'DSA', hld: 'HLD', lld: 'LLD', ai: 'AI' };

    function sanitizeProgress(value) {
        const validIds = candidate => Array.isArray(candidate) ? [...new Set(candidate.filter(id => entryIds.has(id)))] : [];
        return { completed: validIds(value?.completed), bookmarked: validIds(value?.bookmarked) };
    }

    function filterEntries(collection, filters, progress) {
        const terms = (filters.query || '').toLowerCase().match(/[a-z0-9]+/g) || [];
        return collection.filter(entry => {
            if (filters.track && filters.track !== 'all' && entry.track !== filters.track) return false;
            if (filters.topic && filters.topic !== 'all' && entry.topic !== filters.topic) return false;
            if (filters.level && filters.level !== 'all' && entry.level !== filters.level) return false;
            if (filters.company && filters.company !== 'all' && !(entry.companies || []).includes(filters.company)) return false;
            if (filters.solutionsOnly && !entry.solution) return false;
            if (filters.status === 'completed' && !progress.completed.includes(entry.id)) return false;
            if (filters.status === 'todo' && progress.completed.includes(entry.id)) return false;
            if (filters.status === 'bookmarked' && !progress.bookmarked.includes(entry.id)) return false;
            const searchable = [entry.title, entry.topic, entry.hint, entry.prompt, entry.followUp, ...(entry.focus || []), ...(entry.companies || [])].join(' ').toLowerCase();
            const words = searchable.match(/[a-z0-9]+/g) || [];
            return terms.every(term => words.some(word => word.startsWith(term)));
        });
    }

    function bindPaidLibrary(section, sheetContent, initialize) {
        let initialized = false;
        function syncAccess() {
            const unlocked = Boolean(sheetContent && !sheetContent.classList.contains('paywall-blur'));
            section.hidden = !unlocked;
            section.inert = !unlocked;
            if (unlocked && !initialized) {
                initialize();
                initialized = true;
            }
        }
        if (sheetContent) {
            new MutationObserver(syncAccess).observe(sheetContent, { attributes: true, attributeFilter: ['class'] });
        }
        syncAccess();
    }

    window.InterviewPrep = { entries, filterEntries, sanitizeProgress, bindPaidLibrary, renderWorkedSolution };
    if (typeof document === 'undefined') return;

    try {
        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
    } catch {}

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    }

    function icon(name, fallback) {
        return '<i data-lucide="' + name + '" aria-hidden="true"></i><span class="prep-icon-fallback" aria-hidden="true">' + fallback + '</span>';
    }

    function renderIcons() {
        if (!window.lucide) return;
        window.lucide.createIcons();
        document.documentElement.classList.add('prep-icons-ready');
    }

    function renderWorkedSolution(entry) {
        const solution = entry.solution;
        if (!solution) return '';
        const list = values => '<ul>' + values.map(value => '<li>' + escapeHtml(value) + '</li>').join('') + '</ul>';
        const code = value => '<pre class="prep-code" tabindex="0"><code>' + escapeHtml(value) + '</code></pre>';
        if (entry.track === 'dsa') {
            return '<h4>Problem contract</h4><p>' + escapeHtml(solution.problem) + '</p><h4>Worked approach</h4>' + list(solution.approach) +
                '<h4>Python reference solution</h4>' + code(solution.code) + '<h4>Complexity</h4><p>' + escapeHtml(solution.complexity) +
                '</p><h4>Executable edge cases</h4>' + (entry.topic === 'Trees' ? '<p>Tree examples assume the standard TreeNode(val, left=None, right=None) node type.</p>' : '') + code(solution.tests.join('\n'));
        }
        return '<h4>Problem and assumptions</h4><p>' + escapeHtml(solution.problem) + '</p>' + list(solution.assumptions) +
            '<h4>Illustrative capacity estimate</h4><p>' + escapeHtml(solution.capacity) + '</p><h4>API contract</h4>' + code(solution.api) +
            '<h4>Data model</h4><p>' + escapeHtml(solution.dataModel) + '</p><h4>Architecture and request flow</h4>' + code(solution.architecture) +
            '<h4>Worked design</h4>' + list(solution.approach) + '<h4>Trade-offs</h4>' + list(solution.tradeoffs) +
            '<h4>Common failure modes</h4>' + list(solution.pitfalls) + '<h4>Follow-up</h4><p>' + escapeHtml(solution.followUpQuestion) + '</p><p>' + escapeHtml(solution.followUpAnswer) + '</p>';
    }

    function initializeLibrary(container) {
        const scope = container.dataset.interviewLibrary || 'all';
        const scopedEntries = entries.filter(entry => scope === 'all' || (scope === 'design' ? entry.track !== 'dsa' : entry.track === 'dsa'));
        const tracks = scope === 'dsa' ? ['dsa'] : scope === 'design' ? ['all', 'hld', 'lld', 'ai'] : ['all', 'dsa', 'hld', 'lld', 'ai'];
        const requestedCompany = new URLSearchParams(window.location.search).get('company');
        const companyGuides = library.companyGuides || {};
        const filters = { query: '', track: scope === 'dsa' ? 'dsa' : 'all', topic: 'all', level: 'all', status: 'all', company: Object.hasOwn(companyGuides, requestedCompany) ? requestedCompany : 'all', solutionsOnly: true };
        const pageSize = 12;
        let pageNumber = 1;
        let progress = { completed: [], bookmarked: [] };
        let storageAvailable = true;

        function readProgress() {
            try {
                const stored = window.localStorage.getItem(storageKey);
                progress = sanitizeProgress(stored ? JSON.parse(stored) : null);
            } catch {
                progress = { completed: [], bookmarked: [] };
                storageAvailable = false;
            }
        }

        readProgress();
        container.innerHTML = `
            <div class="prep-track-switch" role="group" aria-label="Question track">
                ${tracks.map(track => `<button type="button" class="prep-track" data-track="${track}" aria-pressed="${filters.track === track}">${trackNames[track]}<span>${track === 'all' ? scopedEntries.length : scopedEntries.filter(entry => entry.track === track).length}</span></button>`).join('')}
            </div>
            <div class="prep-toolbar">
                <label class="prep-search">${icon('search', '&#8981;')}<span class="prep-sr-only">Search questions</span><input type="search" name="question-search" placeholder="Search a question, pattern, or concept" autocomplete="off"></label>
                <label class="prep-filter"><span>Topic</span><select name="topic" aria-label="Filter by topic"></select></label>
                <label class="prep-filter"><span>Company prep</span><select name="company" aria-label="Filter by company preparation"><option value="all">All companies</option>${Object.keys(companyGuides).map(company => `<option>${escapeHtml(company)}</option>`).join('')}</select></label>
                <label class="prep-filter"><span>Practice level</span><select name="level" aria-label="Filter by difficulty"><option value="all">All levels</option><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
                <label class="prep-filter"><span>My list</span><select name="status" aria-label="Filter by progress"><option value="all">Everything</option><option value="todo">To do</option><option value="completed">Completed</option><option value="bookmarked">Bookmarked</option></select></label>
            </div>
            <label class="prep-solution-filter"><input type="checkbox" name="solutionsOnly" checked> Worked solutions only</label>
            <p class="prep-provenance">Company labels are recommended preparation tracks, not verified past questions or frequency rankings. Interview scope varies by team, level, and location.</p>
            <div class="prep-company-guide" hidden></div>
            <div class="prep-result-bar"><p class="prep-result-count" role="status" aria-live="polite"></p><div class="prep-progress"><span></span><progress max="${scopedEntries.length}" value="0" aria-label="Study progress"></progress></div></div>
            <p class="prep-storage-notice" role="status" hidden>Progress is available for this visit only; browser storage is unavailable.</p>
            <div class="prep-results"></div>
            <div class="prep-pagination"><button type="button" class="prep-icon-button" data-page="previous" aria-label="Previous page" title="Previous page">${icon('chevron-left', '&larr;')}</button><span class="prep-page-label"></span><button type="button" class="prep-icon-button" data-page="next" aria-label="Next page" title="Next page">${icon('chevron-right', '&rarr;')}</button></div>
            <details class="prep-sources"><summary>Sources &amp; curation</summary><p>Updated September 15, 2026. Worked entries contain original Python solutions or design reasoning. Other entries are practice prompts with hints. Company tracks are editorial preparation selections, not evidence that a company asked a specific question. Design workloads and difficulty are illustrative. No course or question list guarantees an offer.</p><div>${library.sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} ${icon('arrow-up-right', '&#8599;')}</a>`).join('')}</div></details>`;

        container.querySelector('[name="company"]').value = filters.company;
        const printSection = document.createElement('section');
        printSection.className = 'prep-print-solutions';
        printSection.innerHTML = '<h2>Additional worked solutions</h2><p>Company labels are editorial preparation tracks, not verified past interview questions.</p>' + scopedEntries.filter(entry => entry.solution).map(entry => `<article><h3>${escapeHtml(entry.title)}</h3><p>Preparation: ${escapeHtml(entry.companies.join(', '))}</p>${renderWorkedSolution(entry)}<p>Reference: ${escapeHtml(entry.reference)}</p></article>`).join('');
        document.getElementById('sheetContent').append(printSection);

        const results = container.querySelector('.prep-results');
        const search = container.querySelector('input[type="search"]');
        const topicSelect = container.querySelector('[name="topic"]');

        function updateTopics() {
            const topics = [...new Set(scopedEntries.filter(entry => filters.track === 'all' || entry.track === filters.track).map(entry => entry.topic))];
            topicSelect.innerHTML = '<option value="all">All topics</option>' + topics.map(topic => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`).join('');
            if (!topics.includes(filters.topic)) filters.topic = 'all';
            topicSelect.value = filters.topic;
        }

        function renderResults() {
            const focusedKey = container.contains(document.activeElement) ? document.activeElement.dataset.focusKey : null;
            const openIds = new Set([...results.querySelectorAll('details[open]')].map(details => details.dataset.question));
            const filtered = filterEntries(scopedEntries, filters, progress);
            const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
            pageNumber = Math.min(pageNumber, pageCount);
            const start = (pageNumber - 1) * pageSize;
            const visible = filtered.slice(start, start + pageSize);
            const completedCount = scopedEntries.filter(entry => progress.completed.includes(entry.id)).length;

            results.innerHTML = visible.length ? visible.map(entry => {
                const completed = progress.completed.includes(entry.id);
                const bookmarked = progress.bookmarked.includes(entry.id);
                const title = escapeHtml(entry.title);
                const notes = entry.solution ? renderWorkedSolution(entry) : entry.track === 'dsa'
                    ? `<h4>Approach to explore</h4><p>${escapeHtml(entry.hint)}</p><p class="prep-follow-up">Discuss the invariant, time and space complexity, and an edge case before coding.</p>`
                    : `<h4>Design prompt</h4><p>${escapeHtml(entry.prompt)}</p><h4>Discussion guide</h4><ul>${entry.focus.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ul><h4>Follow-up question</h4><p>${escapeHtml(entry.followUp)}</p>`;
                return `<article class="prep-question${completed ? ' is-completed' : ''}" data-id="${entry.id}">
                    <label class="prep-complete" title="Mark ${title} completed"><input type="checkbox" data-complete="${entry.id}" data-focus-key="complete-${entry.id}" aria-label="Mark ${title} completed" ${completed ? 'checked' : ''}></label>
                    <details data-question="${entry.id}" ${openIds.has(entry.id) ? 'open' : ''}>
                        <summary data-focus-key="question-${entry.id}"><span class="prep-question-heading"><span class="prep-question-title">${title}</span><span class="prep-question-topic">${escapeHtml(entry.topic)}${entry.solution ? ' / Worked solution' : ''}</span></span><span class="prep-track-badge track-${entry.track}">${trackLabels[entry.track]}</span><span class="prep-level level-${entry.level.toLowerCase()}">${entry.level}</span><span class="prep-expand">${icon('chevron-down', '&#8964;')}</span></summary>
                        <div class="prep-notes">${entry.companies?.length ? `<p class="prep-company-tags">Prep alignment: ${escapeHtml(entry.companies.join(' / '))}</p>` : ''}${notes}<a href="${escapeHtml(entry.reference)}" target="_blank" rel="noopener noreferrer">${entry.track === 'dsa' ? 'Practice on LeetCode' : 'Read supporting material'} ${icon('arrow-up-right', '&#8599;')}</a></div>
                    </details>
                    <button type="button" class="prep-icon-button prep-bookmark" data-bookmark="${entry.id}" data-focus-key="bookmark-${entry.id}" aria-pressed="${bookmarked}" aria-label="Bookmark ${title}" title="${bookmarked ? 'Remove bookmark' : 'Bookmark question'}">${icon('bookmark', '&#9734;')}</button>
                </article>`;
            }).join('') : `<div class="prep-empty"><h3>No matching questions</h3><p>Nothing matches the current filters.</p><button type="button" class="prep-reset">Clear filters</button></div>`;

            container.querySelector('.prep-result-count').textContent = filtered.length ? `${start + 1}-${Math.min(start + pageSize, filtered.length)} of ${filtered.length} questions` : '0 questions';
            container.querySelector('.prep-progress span').textContent = `${completedCount} / ${scopedEntries.length} completed`;
            container.querySelector('progress').value = completedCount;
            container.querySelector('.prep-page-label').textContent = `Page ${pageNumber} of ${pageCount}`;
            container.querySelector('[data-page="previous"]').disabled = pageNumber === 1;
            container.querySelector('[data-page="next"]').disabled = pageNumber === pageCount;
            container.querySelector('.prep-pagination').hidden = !filtered.length;
            container.querySelector('.prep-storage-notice').hidden = storageAvailable;
            const guide = companyGuides[filters.company];
            const guideElement = container.querySelector('.prep-company-guide');
            guideElement.hidden = !guide;
            guideElement.innerHTML = guide ? `<strong>${escapeHtml(filters.company)} preparation</strong><p>${escapeHtml(guide.focus)}</p><a href="${escapeHtml(guide.url)}" target="_blank" rel="noopener noreferrer">Official company resource ${icon('arrow-up-right', '&#8599;')}</a>` : '';
            container.querySelectorAll('[data-track]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.track === filters.track)));
            renderIcons();
            if (focusedKey) container.querySelector(`[data-focus-key="${focusedKey}"]`)?.focus({ preventScroll: true });
        }

        function saveProgress(kind, id) {
            const values = new Set(progress[kind]);
            if (values.has(id)) values.delete(id);
            else values.add(id);
            progress[kind] = [...values];
            try {
                window.localStorage.setItem(storageKey, JSON.stringify(progress));
            } catch {
                storageAvailable = false;
            }
            renderResults();
        }

        function setTrack(track) {
            if (!tracks.includes(track)) return;
            filters.track = track;
            filters.topic = 'all';
            pageNumber = 1;
            updateTopics();
            renderResults();
        }

        search.addEventListener('input', () => {
            filters.query = search.value;
            pageNumber = 1;
            renderResults();
        });

        container.addEventListener('change', event => {
            const target = event.target;
            if (target.dataset.complete) {
                saveProgress('completed', target.dataset.complete);
            } else if (target.name === 'solutionsOnly') {
                filters.solutionsOnly = target.checked;
                pageNumber = 1;
                renderResults();
            } else if (['topic', 'company', 'level', 'status'].includes(target.name)) {
                filters[target.name] = target.value;
                pageNumber = 1;
                renderResults();
            }
        });

        container.addEventListener('click', event => {
            const button = event.target.closest('button');
            if (!button) return;
            if (button.dataset.track) setTrack(button.dataset.track);
            else if (button.dataset.bookmark) saveProgress('bookmarked', button.dataset.bookmark);
            else if (button.dataset.page) {
                pageNumber += button.dataset.page === 'next' ? 1 : -1;
                renderResults();
                container.querySelector('.prep-result-bar').scrollIntoView({ block: 'start', behavior: 'instant' });
            } else if (button.classList.contains('prep-reset')) {
                Object.assign(filters, { query: '', topic: 'all', company: 'all', level: 'all', status: 'all', solutionsOnly: false });
                search.value = '';
                container.querySelector('[name="level"]').value = 'all';
                container.querySelector('[name="status"]').value = 'all';
                container.querySelector('[name="company"]').value = 'all';
                container.querySelector('[name="solutionsOnly"]').checked = false;
                setTrack(scope === 'dsa' ? 'dsa' : 'all');
                search.focus();
            }
        });

        document.querySelectorAll('[data-prep-track]').forEach(link => link.addEventListener('click', () => {
            Object.assign(filters, { query: '', level: 'all', status: 'all' });
            search.value = '';
            container.querySelector('[name="level"]').value = 'all';
            container.querySelector('[name="status"]').value = 'all';
            setTrack(link.dataset.prepTrack);
        }));

        window.addEventListener('storage', event => {
            if (event.key === storageKey || event.key === null) {
                readProgress();
                renderResults();
            }
        });

        updateTopics();
        renderResults();
    }

    document.querySelectorAll('[data-paid-library]').forEach(section => {
        const container = section.querySelector('[data-interview-library]');
        bindPaidLibrary(section, document.getElementById('sheetContent'), () => {
            if (container) initializeLibrary(container);
        });
    });

    const themeButton = document.getElementById('themeToggle');
    if (themeButton) {
        function updateThemeButton() {
            const light = document.documentElement.dataset.theme === 'light';
            themeButton.innerHTML = icon(light ? 'moon' : 'sun', light ? '&#9790;' : '&#9788;');
            themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
            themeButton.title = light ? 'Switch to dark theme' : 'Switch to light theme';
            renderIcons();
        }
        themeButton.addEventListener('click', updateThemeButton);
        updateThemeButton();
    }
    renderIcons();
})();