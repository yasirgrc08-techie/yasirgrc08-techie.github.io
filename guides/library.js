(function () {
    'use strict';
    const aliases = { os: 'operating systems', dsa: 'dsa algorithms', cn: 'computer networks', sd: 'system design', ml: 'machine learning', ai: 'ai artificial intelligence' };
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

    function filterGuides(guides, filters) {
        const terms = String(filters.query || '').toLowerCase().match(/[a-z0-9]+(?:\+\+)?/g) || [];
        const selected = guides.filter(guide => {
            if (filters.guide && filters.guide !== guide.id) return false;
            if (filters.category && filters.category !== 'all' && filters.category !== guide.category) return false;
            const text = [guide.id.replaceAll('-', ' '), guide.title, guide.category, guide.summary, guide.level].join(' ').toLowerCase();
            const words = text.match(/[a-z0-9]+(?:\+\+)?/g) || [];
            return terms.every(term => {
                if (aliases[term]) return words.includes(term) || aliases[term].split(' ').every(alias => words.some(word => word.startsWith(alias)));
                return words.some(word => word.startsWith(term));
            });
        });
        if (filters.sort === 'title') selected.sort((first, second) => first.title.localeCompare(second.title));
        if (filters.sort === 'category') selected.sort((first, second) => first.category.localeCompare(second.category) || first.title.localeCompare(second.title));
        return selected;
    }

    function sizeLabel(bytes) {
        return bytes >= 1024 * 1024 ? (bytes / (1024 * 1024)).toFixed(1) + ' MB' : Math.ceil(bytes / 1024) + ' KB';
    }

    function guideCard(guide) {
        return `<article class="guide-card" data-guide="${escapeHtml(guide.id)}" data-category="${escapeHtml(guide.category)}">
            <div class="guide-top"><div><p class="guide-category">${escapeHtml(guide.category)}</p><h2 class="guide-title"><a href="${escapeHtml(guide.pdf)}" target="_blank" rel="noopener noreferrer">${escapeHtml(guide.title)}</a></h2></div><a class="guide-preview" href="${escapeHtml(guide.pdf)}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true"><img src="${escapeHtml(guide.preview)}" width="298" height="421" loading="lazy" alt=""></a></div>
            <p class="guide-summary">${escapeHtml(guide.summary)}</p><div class="guide-meta"><span class="duration">${escapeHtml(guide.duration)}</span><span>${escapeHtml(guide.level)}</span><span>4 pages / ${sizeLabel(guide.bytes)}</span></div>
            <div class="guide-actions"><a class="guide-open" href="${escapeHtml(guide.pdf)}" target="_blank" rel="noopener noreferrer"><i data-lucide="book-open" aria-hidden="true"></i> Open PDF</a><a class="guide-download" href="${escapeHtml(guide.pdf)}" download><i data-lucide="download" aria-hidden="true"></i> Download</a><button type="button" class="icon-button" data-share="${escapeHtml(guide.id)}" title="Copy PDF link" aria-label="Copy PDF link for ${escapeHtml(guide.title)}"><i data-lucide="link" aria-hidden="true"></i><span class="icon-fallback">Link</span></button></div>
        </article>`;
    }

    const api = { filterGuides, sizeLabel, guideCard };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    if (typeof document === 'undefined') return;
    window.FieldGuides = api;
    let catalog = null;
    let statusTimer;
    const parameters = new URLSearchParams(location.search);
    const filters = { query: parameters.get('q') || '', category: parameters.get('category') || 'all', guide: parameters.get('guide') || '', sort: parameters.get('sort') || 'recommended' };
    const search = document.getElementById('guideSearch');
    const sort = document.getElementById('guideSort');
    const list = document.getElementById('guideList');
    search.value = filters.query;
    if (!['recommended', 'title', 'category'].includes(filters.sort)) filters.sort = 'recommended';
    sort.value = filters.sort;

    function icons() {
        if (!window.lucide) return;
        window.lucide.createIcons();
        document.documentElement.classList.add('icons-ready');
    }

    function syncUrl() {
        const url = new URL(location.href);
        url.search = '';
        if (filters.query) url.searchParams.set('q', filters.query);
        if (filters.category !== 'all') url.searchParams.set('category', filters.category);
        if (filters.guide) url.searchParams.set('guide', filters.guide);
        if (filters.sort !== 'recommended') url.searchParams.set('sort', filters.sort);
        history.replaceState(null, '', url);
    }

    function render() {
        if (!catalog) return;
        const guides = filterGuides(catalog.guides, filters);
        list.innerHTML = guides.map(guideCard).join('');
        document.getElementById('resultCount').textContent = `${guides.length} of ${catalog.count} guides`;
        document.getElementById('emptyState').hidden = guides.length > 0;
        document.querySelectorAll('[data-category-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === filters.category)));
        icons();
        syncUrl();
    }

    function resetFilters() {
        Object.assign(filters, { query: '', category: 'all', guide: '', sort: 'recommended' });
        search.value = '';
        sort.value = 'recommended';
        render();
        search.focus();
    }

    async function share(url) {
        try {
            if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(url);
            const status = document.getElementById('shareStatus');
            status.textContent = 'Public link copied';
            clearTimeout(statusTimer);
            statusTimer = setTimeout(() => { status.textContent = ''; }, 3000);
        } catch {
            const input = document.getElementById('shareUrl');
            input.value = url;
            document.getElementById('shareDialog').showModal();
            input.focus();
            input.select();
        }
    }

    async function load() {
        document.getElementById('loadError').hidden = true;
        document.getElementById('resultCount').textContent = 'Loading guides...';
        try {
            const response = await fetch('catalog.json?v=20260921');
            if (!response.ok) throw new Error('Catalogue request failed');
            const data = await response.json();
            if (data.count !== 50 || !Array.isArray(data.guides) || data.guides.length !== data.count) throw new Error('Invalid catalogue');
            catalog = data;
            const categories = [...new Set(catalog.guides.map(guide => guide.category))];
            if (filters.category !== 'all' && !categories.includes(filters.category)) filters.category = 'all';
            document.getElementById('categoryList').innerHTML = ['all', ...categories].map(category => `<button type="button" class="category-button" data-category-filter="${escapeHtml(category)}" aria-pressed="${filters.category === category}">${escapeHtml(category === 'all' ? 'All guides' : category)}<span>${category === 'all' ? catalog.count : catalog.guides.filter(guide => guide.category === category).length}</span></button>`).join('');
            document.getElementById('archiveSize').textContent = sizeLabel(catalog.archive.bytes);
            render();
        } catch {
            list.replaceChildren();
            document.getElementById('emptyState').hidden = true;
            document.getElementById('loadError').hidden = false;
            document.getElementById('resultCount').textContent = 'Catalogue unavailable';
        }
    }

    document.getElementById('filterForm').addEventListener('submit', event => event.preventDefault());
    search.addEventListener('input', () => { filters.query = search.value; filters.guide = ''; render(); });
    sort.addEventListener('change', () => { filters.sort = sort.value; render(); });
    document.getElementById('categoryList').addEventListener('click', event => {
        const button = event.target.closest('[data-category-filter]');
        if (!button) return;
        filters.category = button.dataset.categoryFilter;
        filters.guide = '';
        render();
    });
    list.addEventListener('click', event => {
        const button = event.target.closest('[data-share]');
        if (!button || !catalog) return;
        const guide = catalog.guides.find(candidate => candidate.id === button.dataset.share);
        if (guide) share(new URL(guide.pdf, location.href).href);
    });
    document.getElementById('shareLibrary').addEventListener('click', () => share(new URL('./', location.href).href));
    document.getElementById('clearFilters').addEventListener('click', resetFilters);
    document.getElementById('resetEmpty').addEventListener('click', resetFilters);
    document.getElementById('retryLoad').addEventListener('click', load);
    icons();
    load();
})();