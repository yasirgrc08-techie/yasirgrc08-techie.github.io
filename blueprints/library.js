(function (root, factory) {
    const api = factory(typeof module !== 'undefined' && module.exports ? require('./blueprint-model.js') : root.BlueprintModel);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.BlueprintLibrary = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (model) {
    'use strict';
    const pageSize = 24;
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const sizeLabel = bytes => bytes >= 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + ' MB' : Math.ceil(bytes / 1024) + ' KB';
    const safeId = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*--(?:roadmap|decisions|incident|metrics|lab)$/.test(value);

    function validateCatalog(data) {
        if (!data || data.count !== 500 || data.topicCount !== 100 || !Array.isArray(data.posts) || data.posts.length !== 500 || new Set(data.posts.map(post => post.id)).size !== 500) throw new Error('Invalid collection.');
        if (data.archive?.url !== 'engineering-content-templates.zip' || !Number.isFinite(data.archive.bytes)) throw new Error('Invalid archive.');
        for (const post of data.posts) {
            if (!safeId(post.id) || !/^[a-z0-9-]+$/.test(post.topicId) || !model.formats.some(format => format.id === post.format) || !/^#[0-9a-f]{6}$/i.test(post.accent)) throw new Error('Invalid template.');
            for (const field of ['title', 'headline', 'category', 'formatName', 'hook', 'premise', 'takeaway', 'caption', 'disclaimer', 'origin']) if (typeof post[field] !== 'string' || post[field].length > 7000) throw new Error('Invalid template text.');
            if (!Array.isArray(post.rows) || post.rows.length !== 6 || post.rows.some(row => typeof row.title !== 'string' || typeof row.detail !== 'string')) throw new Error('Invalid content rows.');
            if (!Array.isArray(post.storyboard) || post.storyboard.length !== 8 || post.storyboard.some(beat => typeof beat.time !== 'string' || typeof beat.visual !== 'string' || typeof beat.narration !== 'string')) throw new Error('Invalid script.');
            if (!Array.isArray(post.tags) || post.tags.some(tag => typeof tag !== 'string') || !Array.isArray(post.sources)) throw new Error('Invalid metadata.');
            for (const source of post.sources) {
                const url = new URL(source.url);
                if (url.protocol !== 'https:' || url.username || url.password || typeof source.title !== 'string') throw new Error('Invalid reference.');
            }
            for (const [field, directory, extension] of [['image', 'images', 'png'], ['preview', 'previews', 'png'], ['svg', 'svg', 'svg'], ['notes', 'posts', 'md']]) if (post[field] !== directory + '/' + post.id + '.' + extension) throw new Error('Invalid asset path.');
        }
        return data;
    }

    function card(post, saved = false) {
        return `<article class="template-card" data-post="${post.id}" style="--post-accent:${post.accent}"><button type="button" class="preview-button" data-open="${post.id}" aria-label="Preview ${escapeHtml(post.title)}"><img src="${post.preview}" width="324" height="405" loading="lazy" alt="${escapeHtml(post.title)} post image"></button><div class="card-copy"><div class="card-format"><span>${escapeHtml(post.formatName)}</span><button type="button" class="icon-button card-save" data-save="${post.id}" aria-pressed="${saved}" aria-label="${saved ? 'Unsave' : 'Save'} ${escapeHtml(post.title)}" title="${saved ? 'Unsave' : 'Save'} template"><i data-lucide="bookmark" aria-hidden="true"></i></button></div><h2><button type="button" data-open="${post.id}">${escapeHtml(post.headline)}</button></h2><p>${escapeHtml(post.hook)}</p><div class="card-footer"><span>${escapeHtml(post.category)}</span><span>${post.durationSeconds}s script</span></div></div></article>`;
    }

    function selectPage(posts, filters, saved) {
        const selected = model.filterPosts(posts, { ...filters, saved: filters.saved ? saved : null });
        if (filters.sort === 'title') selected.sort((left, right) => left.headline.localeCompare(right.headline) || left.number - right.number);
        if (filters.sort === 'duration') selected.sort((left, right) => left.durationSeconds - right.durationSeconds || left.number - right.number);
        const pages = Math.max(1, Math.ceil(selected.length / pageSize));
        const page = Math.max(1, Math.min(pages, Number.isInteger(filters.page) ? filters.page : 1));
        return { page, pages, total: selected.length, posts: selected.slice((page - 1) * pageSize, page * pageSize) };
    }

    const api = { validateCatalog, card, selectPage, sizeLabel, pageSize };
    if (typeof document === 'undefined') return api;
    const element = id => document.getElementById(id);
    const savedKey = 'yasir-engineering-blueprints-saved-v1';
    const parameters = new URLSearchParams(location.search);
    const filters = { query: (parameters.get('q') || '').slice(0, 120), category: parameters.get('category') || 'all', format: parameters.get('format') || 'all', topic: parameters.get('topic') || '', saved: parameters.get('saved') === '1', sort: ['collection', 'title', 'duration'].includes(parameters.get('sort')) ? parameters.get('sort') : 'collection', page: Math.max(1, Number.parseInt(parameters.get('page'), 10) || 1) };
    let catalog;
    let selectedPost = null;
    let saved = new Set();
    let writable = true;
    let noticeTimer;
    let downloading = false;
    let sourceFonts;
    let previousFocus;

    function icons() { if (window.lucide) window.lucide.createIcons(); }
    function status(message) { element('appStatus').textContent = message; clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { element('appStatus').textContent = ''; }, 6000); }
    function syncUrl(postId = selectedPost?.id) {
        const url = new URL(location.href);
        url.search = '';
        if (filters.query) url.searchParams.set('q', filters.query);
        if (filters.category !== 'all') url.searchParams.set('category', filters.category);
        if (filters.format !== 'all') url.searchParams.set('format', filters.format);
        if (filters.topic) url.searchParams.set('topic', filters.topic);
        if (filters.saved) url.searchParams.set('saved', '1');
        if (filters.sort !== 'collection') url.searchParams.set('sort', filters.sort);
        if (filters.page > 1) url.searchParams.set('page', filters.page);
        if (postId) url.searchParams.set('post', postId);
        history.replaceState(null, '', url);
    }
    function render() {
        if (!catalog) return;
        const result = selectPage(catalog.posts, filters, saved);
        filters.page = result.page;
        element('templateList').innerHTML = result.posts.map(post => card(post, saved.has(post.id))).join('');
        element('resultCount').textContent = result.total + ' of ' + catalog.count + ' templates' + (filters.topic ? ' / one topic' : '');
        element('pageCount').textContent = result.page + ' / ' + result.pages;
        element('previousPage').disabled = result.page <= 1;
        element('nextPage').disabled = result.page >= result.pages;
        element('emptyState').hidden = result.total > 0;
        element('savedCount').textContent = saved.size;
        element('savedFilter').setAttribute('aria-pressed', String(filters.saved));
        element('categoryList').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === filters.category)));
        syncUrl();
        icons();
    }
    function toggleSaved(id) {
        if (!catalog.posts.some(post => post.id === id)) return;
        if (saved.has(id)) saved.delete(id); else saved.add(id);
        if (writable) { try { localStorage.setItem(savedKey, JSON.stringify([...saved])); } catch { writable = false; status('Bookmarks are available for this visit only; browser storage is unavailable.'); } }
        render();
        if (selectedPost) element('saveDetail').setAttribute('aria-pressed', String(saved.has(selectedPost.id)));
    }
    function reset() {
        Object.assign(filters, { query: '', category: 'all', format: 'all', topic: '', saved: false, sort: 'collection', page: 1 });
        element('templateSearch').value = '';
        element('formatFilter').value = 'all';
        element('sortOrder').value = 'collection';
        render();
    }
    function scriptText(post) { return post.title + '\n\n' + post.storyboard.map(beat => beat.time + ' / ' + beat.visual + '\n' + beat.narration).join('\n\n') + '\n\n' + post.disclaimer; }
    async function copy(text) {
        try { await navigator.clipboard.writeText(text); status('Copied.'); }
        catch {
            element('copyText').value = text;
            element('copyDialog').showModal();
            element('copyText').focus();
            element('copyText').select();
        }
    }
    function chooseTab(name) {
        document.querySelectorAll('[data-tab]').forEach(button => { button.setAttribute('aria-selected', String(button.dataset.tab === name)); button.tabIndex = button.dataset.tab === name ? 0 : -1; });
        for (const key of ['blueprint', 'caption', 'script', 'sources']) element(key + 'Panel').hidden = key !== name;
    }
    function openPost(id) {
        const post = catalog.posts.find(item => item.id === id);
        if (!post) { status('That template is not in this collection.'); return; }
        selectedPost = post;
        element('detailTitle').textContent = post.headline;
        element('detailEyebrow').textContent = String(post.number).padStart(3, '0') + ' / ' + post.category + ' / ' + post.formatName;
        element('detailImage').src = post.image;
        element('detailImage').alt = post.title + ' by Yasir Sharfi';
        element('fullImage').href = post.image;
        element('downloadPng').href = post.image;
        element('downloadSvg').href = post.svg;
        element('downloadNotes').href = post.notes;
        element('detailPremise').textContent = post.premise;
        element('detailTakeaway').textContent = post.takeaway;
        element('detailRows').innerHTML = post.rows.map(row => `<li><h3>${escapeHtml(row.title)}</h3><p>${escapeHtml(row.detail)}</p></li>`).join('');
        element('captionText').value = post.caption;
        element('captionCount').textContent = post.caption.length + ' / 2,200 characters';
        element('scriptDuration').textContent = 'About ' + post.durationSeconds + ' seconds / 8 beats';
        element('storyboard').innerHTML = post.storyboard.map(beat => `<article class="script-beat"><span>${escapeHtml(beat.time)}</span><div><h3>${escapeHtml(beat.visual)}</h3><p>${escapeHtml(beat.narration)}</p></div></article>`).join('');
        element('detailOrigin').textContent = post.origin;
        element('detailScope').textContent = post.disclaimer;
        element('detailSources').innerHTML = post.sources.map(source => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a></li>`).join('');
        element('relatedFormats').innerHTML = catalog.posts.filter(item => item.topicId === post.topicId).map(item => `<button type="button" data-related="${item.id}" aria-pressed="${item.id === post.id}">${escapeHtml(item.formatName)}</button>`).join('');
        element('saveDetail').setAttribute('aria-pressed', String(saved.has(id)));
        element('downloadStatus').textContent = '';
        chooseTab('blueprint');
        if (!element('templateDialog').open) { previousFocus = document.activeElement; element('templateDialog').showModal(); }
        element('templateDialog').scrollTop = 0;
        syncUrl(id);
        icons();
    }
    async function fetchBytes(path) {
        const response = await fetch(path, { signal: AbortSignal.timeout(20000) });
        if (!response.ok) throw new Error('A template asset could not be downloaded. Please retry.');
        return new Uint8Array(await response.arrayBuffer());
    }
    async function downloadSource() {
        if (!selectedPost || downloading) return;
        const post = selectedPost;
        downloading = true;
        element('downloadTemplate').disabled = true;
        element('downloadStatus').textContent = 'Preparing source package...';
        try {
            if (!window.fflate) throw new Error('The ZIP library did not load. Use the full-collection download instead.');
            if (!sourceFonts) sourceFonts = Promise.all(['Lato-Regular.ttf', 'Lato-Bold.ttf', 'OFL-Lato.txt'].map(name => fetchBytes('fonts/' + name).then(bytes => [name, bytes]))).catch(error => { sourceFonts = null; throw error; });
            const [image, svg, notes, fonts] = await Promise.all([fetchBytes(post.image), fetchBytes(post.svg), fetchBytes(post.notes), sourceFonts]);
            const files = { [post.image]: image, [post.svg]: svg, [post.notes]: notes, 'caption.txt': window.fflate.strToU8(post.caption), 'reel-script.txt': window.fflate.strToU8(scriptText(post)), 'template.json': window.fflate.strToU8(JSON.stringify(post, null, 2)), 'README.txt': window.fflate.strToU8('Engineering Content Template / Yasir Sharfi\n\nPNG is ready at 1080x1350. SVG is editable; retain the fonts folder or install the included OFL-licensed fonts in your design application. Caption and reel script are original educational content. No rendered video, music, or stock footage is included.\n\n' + post.disclaimer) };
            for (const [name, bytes] of fonts) files['fonts/' + name] = bytes;
            const blob = new Blob([window.fflate.zipSync(files)], { type: 'application/zip' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url; anchor.download = post.id + '.zip'; anchor.click();
            setTimeout(() => URL.revokeObjectURL(url), 30000);
            element('downloadStatus').textContent = 'Source package prepared / ' + sizeLabel(blob.size);
        } catch (error) { element('downloadStatus').textContent = error.message; }
        finally { downloading = false; element('downloadTemplate').disabled = false; }
    }
    async function load() {
        element('loadError').hidden = true;
        element('resultCount').textContent = 'Loading collection...';
        try {
            const response = await fetch('catalog.json?v=20260921', { signal: AbortSignal.timeout(30000) });
            if (!response.ok) throw new Error('Collection unavailable.');
            catalog = validateCatalog(await response.json());
            const categories = [...new Set(catalog.posts.map(post => post.category))];
            if (!categories.includes(filters.category)) filters.category = 'all';
            if (!model.formats.some(format => format.id === filters.format)) filters.format = 'all';
            if (filters.topic && !catalog.posts.some(post => post.topicId === filters.topic)) filters.topic = '';
            try {
                const raw = localStorage.getItem(savedKey);
                const ids = raw ? JSON.parse(raw) : [];
                if (!Array.isArray(ids) || ids.length > 500 || ids.some(id => !safeId(id))) throw new Error('Invalid saved collection');
                saved = new Set(ids.filter(id => catalog.posts.some(post => post.id === id)));
            } catch { writable = false; status('Saved selections could not load. They were not overwritten; bookmarks are temporary for this visit.'); }
            element('categoryList').innerHTML = ['all', ...categories].map(category => `<button type="button" data-category="${escapeHtml(category)}" aria-pressed="${category === filters.category}"><span>${escapeHtml(category === 'all' ? 'All topics' : category)}</span><small>${category === 'all' ? catalog.count : catalog.posts.filter(post => post.category === category).length}</small></button>`).join('');
            element('templateSearch').value = filters.query;
            element('formatFilter').value = filters.format;
            element('sortOrder').value = filters.sort;
            element('archiveSize').textContent = sizeLabel(catalog.archive.bytes);
            render();
            if (parameters.has('post')) openPost(parameters.get('post'));
        } catch {
            element('templateList').replaceChildren();
            element('loadError').hidden = false;
            element('resultCount').textContent = 'Collection unavailable';
        }
    }
    element('filterForm').addEventListener('submit', event => event.preventDefault());
    element('templateSearch').addEventListener('input', event => { filters.query = event.target.value; filters.page = 1; filters.topic = ''; render(); });
    element('formatFilter').addEventListener('change', event => { filters.format = event.target.value; filters.page = 1; render(); });
    element('sortOrder').addEventListener('change', event => { filters.sort = event.target.value; filters.page = 1; render(); });
    element('savedFilter').addEventListener('click', () => { filters.saved = !filters.saved; filters.page = 1; render(); });
    element('categoryList').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (button) { filters.category = button.dataset.category; filters.page = 1; filters.topic = ''; render(); } });
    element('templateList').addEventListener('click', event => { const open = event.target.closest('[data-open]'); const save = event.target.closest('[data-save]'); if (open) openPost(open.dataset.open); else if (save) toggleSaved(save.dataset.save); });
    for (const id of ['resetFilters', 'resetEmpty']) element(id).addEventListener('click', reset);
    for (const [id, delta] of [['previousPage', -1], ['nextPage', 1]]) element(id).addEventListener('click', () => { filters.page += delta; render(); element('templateList').scrollIntoView({ block: 'start' }); element('templateList').focus({ preventScroll: true }); });
    element('retryLoad').addEventListener('click', load);
    element('closeDetail').addEventListener('click', () => element('templateDialog').close());
    element('templateDialog').addEventListener('close', () => { selectedPost = null; syncUrl(''); if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true }); });
    document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => chooseTab(button.dataset.tab)));
    document.querySelector('.detail-tabs').addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const tabs = [...document.querySelectorAll('[data-tab]')];
        const current = tabs.indexOf(document.activeElement);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault(); chooseTab(tabs[next].dataset.tab); tabs[next].focus();
    });
    document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => { if (selectedPost) copy(button.dataset.copy === 'caption' ? selectedPost.caption : scriptText(selectedPost)); }));
    element('relatedFormats').addEventListener('click', event => { const button = event.target.closest('[data-related]'); if (button) openPost(button.dataset.related); });
    element('downloadTemplate').addEventListener('click', downloadSource);
    element('saveDetail').addEventListener('click', () => { if (selectedPost) toggleSaved(selectedPost.id); });
    element('shareDetail').addEventListener('click', () => { if (selectedPost) { const url = new URL('./', location.href); url.searchParams.set('post', selectedPost.id); copy(url.href); } });
    icons();
    load();
    return api;
});