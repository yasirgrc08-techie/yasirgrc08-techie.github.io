export function initCatalogue({ model, createDraft, applyLayout, isBlocked, onEdit, notify, icons }) {
    const element = id => document.getElementById(id);
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    let level = 'all';
    let selected = model.templates[0];
    let starting = false;
    let samplePhoto;
    const roleOptions = model.roles.map(role => `<option value="${role.id}">${escapeHtml(role.name)}</option>`).join('');
    element('catalogRole').innerHTML = '<option value="all">All roles</option>' + roleOptions;
    element('templateRole').innerHTML = roleOptions;
    element('catalogLevels').innerHTML = Object.entries({ all: 'All CVs', ...model.levels }).map(([id, label]) => `<button type="button" data-level="${id}" aria-pressed="${id === 'all'}">${escapeHtml(label)}</button>`).join('');

    function render() {
        const matches = model.searchTemplates({ query: element('catalogSearch').value, role: element('catalogRole').value, layout: element('catalogLayout').value, photo: element('catalogPhoto').checked, level });
        element('catalogCount').textContent = matches.length + ' of ' + model.templates.length + ' templates';
        element('catalogEmpty').hidden = matches.length > 0;
        element('catalogGrid').innerHTML = matches.map(template => `<button type="button" class="catalog-card" data-start-template="${template.id}" aria-label="Preview ${escapeHtml(template.name)} for ${escapeHtml(model.findRole(template.role).name)}"><div class="catalog-paper"><img src="previews/${template.id}.png?v=20260921-catalog" width="268" height="379" loading="lazy" alt="${escapeHtml(template.name)} CV sample for Yasir Sharfi"></div><div class="catalog-card-heading"><strong>${escapeHtml(template.name)}</strong>${template.photo ? '<i data-lucide="image" aria-label="Optional photo"></i>' : '<i data-lucide="arrow-up-right" aria-hidden="true"></i>'}</div><span class="catalog-role">${escapeHtml(model.findRole(template.role).name)}</span><span class="catalog-card-footer">${escapeHtml(model.levels[template.level])}<span>${template.source ? 'MIT source' : template.layout === 'single' ? 'Single column' : 'Two columns'}</span></span></button>`).join('');
        icons();
    }

    function openTemplate(id) {
        selected = model.findTemplate(id);
        element('templateDialogTitle').textContent = selected.name;
        element('templateDescription').textContent = selected.description;
        element('templateMetadata').textContent = model.levels[selected.level] + ' / ' + (selected.layout === 'single' ? 'Single column' : 'Two columns') + (selected.photo ? ' / Optional photo' : '');
        element('templatePreviewImage').src = 'previews/' + selected.id + '.png?v=20260921-catalog';
        element('templatePreviewImage').alt = selected.name + ' example for ' + model.findRole(selected.role).name;
        element('templateRole').value = selected.role;
        element('templateExample').checked = true;
        element('templateStatus').textContent = '';
        const source = model.sources[selected.source];
        element('templateAttribution').innerHTML = source ? `Format adapted from <a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.name)}</a> (${source.license}). <a href="${source.overleaf}" target="_blank" rel="noopener noreferrer">Original on Overleaf</a>. Attribution is retained in the source download.` : 'Original CV Studio layout. Example role and current draft can be changed independently.';
        element('templateDialog').showModal();
    }

    async function photoData() {
        if (samplePhoto) return samplePhoto;
        const response = await fetch('previews/sample-portrait.jpg');
        if (!response.ok) throw new Error('Sample photograph could not load. Start without sample details or try again.');
        const blob = await response.blob();
        samplePhoto = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Sample photograph could not be read.'));
            reader.readAsDataURL(blob);
        });
        return samplePhoto;
    }

    element('catalogSearch').addEventListener('input', render);
    for (const id of ['catalogRole', 'catalogLayout', 'catalogPhoto']) element(id).addEventListener('change', render);
    element('catalogLevels').addEventListener('click', event => {
        const button = event.target.closest('[data-level]');
        if (!button) return;
        level = button.dataset.level;
        element('catalogLevels').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        render();
    });
    element('resetCatalog').addEventListener('click', () => {
        element('catalogSearch').value = '';
        element('catalogRole').value = 'all';
        element('catalogLayout').value = 'all';
        element('catalogPhoto').checked = false;
        element('catalogLevels').querySelector('[data-level="all"]').click();
    });
    element('catalogGrid').addEventListener('click', event => {
        const button = event.target.closest('[data-start-template]');
        if (button) openTemplate(button.dataset.startTemplate);
    });
    element('templateStartForm').addEventListener('submit', async event => {
        event.preventDefault();
        if (starting || isBlocked()) { if (isBlocked()) notify('Apply source changes and correct highlighted fields before creating a CV.'); return; }
        const template = selected;
        const role = element('templateRole').value;
        const example = element('templateExample').checked;
        const button = event.currentTarget.querySelector('button[type="submit"]');
        starting = true;
        button.disabled = true;
        try {
            const draft = role === template.role ? model.starterForTemplate(template.id, !example) : model.applyTemplate(model.starter(role, !example), template.id);
            draft.title = template.name + ' - ' + model.findRole(role).name;
            if (template.photo && example) draft.basics.photo = await photoData();
            if (createDraft(draft)) { element('templateDialog').close(); onEdit(); }
        } catch (error) { element('templateStatus').textContent = error.message; }
        finally { starting = false; button.disabled = false; }
    });
    element('applyCatalogTemplate').addEventListener('click', () => {
        if (isBlocked()) { notify('Apply source changes and correct highlighted fields before changing the layout.'); return; }
        applyLayout(selected.id);
        element('templateDialog').close();
        onEdit();
    });
    element('continueEditing').addEventListener('click', onEdit);
    render();
    return { render, openTemplate };
}