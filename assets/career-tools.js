(function () {
    'use strict';
    const button = document.getElementById('careerToolsButton');
    const panel = document.getElementById('careerToolsPanel');
    if (!button || !panel) return;
    const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const products = { 'cv-studio-v1': { title: 'CV Studio / all templates', amount: 49 }, 'cv-readiness-v1': { title: 'CV readiness report', amount: 9 } };
    function records() {
        try {
            const value = JSON.parse(localStorage.getItem('yas_digital_orders') || '[]');
            return Array.isArray(value) ? value.filter(order => order && Object.hasOwn(products, order.product) && order.amount === products[order.product].amount && /^pay_[A-Za-z0-9]{6,40}$/.test(order.paymentId || '')).slice(-100).reverse() : [];
        } catch { return []; }
    }
    function refresh() {
        let documents = [];
        try { const library = JSON.parse(localStorage.getItem('yasir-cv-studio-drafts-v1') || 'null'); if (library?.version === 1 && Array.isArray(library.documents)) documents = library.documents; } catch {}
        document.getElementById('careerDraftStatus').textContent = documents.length ? documents.length + ' local draft' + (documents.length === 1 ? '' : 's') : 'Start a new CV';
        document.getElementById('careerOrderCount').textContent = records().length;
    }
    panel.addEventListener('toggle', event => {
        button.setAttribute('aria-expanded', String(event.newState === 'open'));
        if (event.newState === 'open') refresh();
    });
    document.getElementById('careerOrdersButton').addEventListener('click', () => {
        panel.hidePopover();
        const orders = records();
        document.getElementById('careerOrdersList').innerHTML = orders.length ? orders.map(order => `<article class="career-order"><div><strong>${escapeHtml(products[order.product].title)}</strong><span>INR ${order.amount}</span></div><p>${escapeHtml(order.paymentId)}</p><small>${Number.isFinite(Date.parse(order.purchasedAt)) ? escapeHtml(new Date(order.purchasedAt).toLocaleString()) : 'Purchase date unavailable'}</small></article>`).join('') : '<p>No CV Studio purchases are saved on this browser.</p>';
        document.getElementById('careerOrdersDialog').showModal();
    });
    document.getElementById('closeCareerOrders').addEventListener('click', () => document.getElementById('careerOrdersDialog').close());
    window.addEventListener('storage', event => { if (['yas_digital_orders', 'yasir-cv-studio-drafts-v1'].includes(event.key) || event.key === null) refresh(); });
    refresh();
    if (window.lucide) window.lucide.createIcons();
})();