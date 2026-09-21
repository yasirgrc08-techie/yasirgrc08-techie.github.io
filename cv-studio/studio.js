import * as pdfjs from './vendor/pdf.mjs';
import { initCatalogue } from './catalog.js?v=20260921-catalog';
import { initReadiness } from './ats-ui.js?v=20260921-catalog';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdf.worker.mjs', import.meta.url).href;
if (document.readyState === 'loading') await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));

const model = window.CvModel;
const exporter = window.CvExport;
const storageKey = 'yasir-cv-studio-drafts-v1';
const element = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
const tool = (action, name, label, attributes = '') => `<button type="button" class="icon-button" data-action="${action}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" ${attributes}>${icon(name)}<span class="icon-fallback">${escapeHtml(label)}</span></button>`;
const clone = value => JSON.parse(JSON.stringify(value));
let library;
let storagePaused = false;
let storageFailed = false;
let lastPersisted = '';
let noticeTimer;
let previewTimer;
let saveTimer;
let lastHistoryKey = '';
let lastHistoryAt = 0;
let past = [];
let future = [];
let mode = 'details';
let sourceDirty = false;
let pdfDocument = null;
let pdfRenderTask = null;
let currentPage = 1;
let previewMode = 'pdf';
let previewSequence = 0;
let renderSequence = 0;
let zoom = 'fit';
let paying = false;
let exporting = false;
let billing;
let cropImage = null;
const invalidInputs = new Set();

function icons() { if (window.lucide) { window.lucide.createIcons(); document.documentElement.classList.add('icons-ready'); } }
function notify(message, permanent = false) {
    element('appNotice').textContent = message;
    clearTimeout(noticeTimer);
    if (!permanent) noticeTimer = setTimeout(() => { element('appNotice').textContent = ''; }, 5500);
}
function newRecord(resume) { return { id: crypto.randomUUID(), resume: model.normalizeResume(resume), updated: new Date().toISOString() }; }
function activeRecord() { return library.documents.find(record => record.id === library.activeId); }
function resume() { return activeRecord().resume; }

function loadDrafts() {
    try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            const stored = JSON.parse(raw);
            if (stored.version !== 1 || !Array.isArray(stored.documents) || !stored.documents.length || stored.documents.length > 10) throw new Error('Invalid library');
            const ids = new Set();
            const documents = stored.documents.map(record => {
                if (!record || typeof record.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(record.id) || ids.has(record.id)) throw new Error('Invalid draft');
                ids.add(record.id);
                return { id: record.id, updated: typeof record.updated === 'string' ? record.updated : new Date().toISOString(), resume: model.normalizeResume(record.resume) };
            });
            library = { version: 1, activeId: documents.some(record => record.id === stored.activeId) ? stored.activeId : documents[0].id, documents };
            lastPersisted = raw;
        }
    } catch {
        storagePaused = true;
        notify('Saved drafts could not be read. They have not been deleted. Saving is paused; keep a JSON backup of this visit.', true);
    }
    if (!library) { const first = newRecord(model.starter('graduate')); library = { version: 1, activeId: first.id, documents: [first] }; }
}

function save() {
    clearTimeout(saveTimer);
    if (storagePaused) { element('saveState').textContent = 'Saving paused / export a backup'; return; }
    try {
        const serialized = JSON.stringify(library);
        localStorage.setItem(storageKey, serialized);
        lastPersisted = serialized;
        storageFailed = false;
        element('saveState').textContent = 'Saved on this device';
    } catch {
        storageFailed = true;
        element('saveState').textContent = 'Not saved / storage unavailable';
        notify('Browser storage is unavailable. Download a JSON backup to keep your changes.', true);
    }
}

function commit(mutator, { fields = false, key = '', markEdited = true } = {}) {
    const before = clone(resume());
    const draft = clone(before);
    const changed = mutator(draft) || draft;
    const next = model.normalizeResume(changed);
    if (markEdited) next.example = false;
    if (JSON.stringify(before) === JSON.stringify(next)) return;
    const time = Date.now();
    if (!key || key !== lastHistoryKey || time - lastHistoryAt > 900) {
        past.push(before);
        if (past.length > 60) past.shift();
    }
    lastHistoryKey = key;
    lastHistoryAt = time;
    future = [];
    activeRecord().resume = next;
    activeRecord().updated = new Date().toISOString();
    if (fields) renderEditor();
    refreshControls();
    element('saveState').textContent = 'Saving...';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 400);
    queuePreview();
}

function historyMove(direction) {
    if (sourceDirty || invalidInputs.size) { notify('Apply source changes and correct highlighted fields before changing history.'); return; }
    const source = direction === 'undo' ? past : future;
    const destination = direction === 'undo' ? future : past;
    if (!source.length) return;
    destination.push(clone(resume()));
    activeRecord().resume = source.pop();
    activeRecord().updated = new Date().toISOString();
    lastHistoryKey = '';
    renderEditor(); refreshControls(); save(); queuePreview();
}

function field(label, fieldName, value, { full = false, area = false, limit = 350, attributes = '' } = {}) {
    return `<label class="${full ? 'full' : ''}">${escapeHtml(label)}${area ? `<textarea data-field="${fieldName}" maxlength="${limit}" rows="4" ${attributes}>${escapeHtml(value)}</textarea>` : `<input data-field="${fieldName}" maxlength="${limit}" value="${escapeHtml(value)}" ${attributes}>`}</label>`;
}

function renderEditor() {
    invalidInputs.clear();
    const existing = element('editorFields').querySelectorAll('details');
    const open = existing.length ? new Set([...existing].filter(details => details.open).map(details => details.dataset.block)) : new Set(['contact', 'experience']);
    const document = resume();
    const contactFields = [['Full name','name'],['Professional headline','headline'],['Email','email'],['Phone','phone'],['Location','location'],['Portfolio / website','website'],['LinkedIn URL','linkedin'],['GitHub URL','github']];
    element('editorFields').innerHTML = `<details class="editor-section" data-block="contact" ${open.has('contact') ? 'open' : ''}><summary>Contact <small>Identity &amp; links</small></summary><div class="field-grid" data-basics>${contactFields.map(([label, name]) => field(label, name, document.basics[name], { full: ['name','headline'].includes(name), limit: name === 'headline' ? 180 : 350, attributes: name === 'email' ? 'type="email" autocomplete="email"' : '' })).join('')}</div></details>` + document.sections.map((section, sectionIndex) => {
        const attributes = `data-section="${section.id}"`;
        const simple = ['summary', 'skills', 'languages'].includes(section.kind);
        return `<details class="editor-section${section.visible ? '' : ' is-hidden'}" data-block="${section.id}" ${attributes} ${open.has(section.id) ? 'open' : ''}><summary>${escapeHtml(section.title)}${section.visible ? '' : '<small>Hidden</small>'}</summary>
            <div class="section-actions"><label class="check-label"><input type="checkbox" data-visible ${section.visible ? 'checked' : ''}> Include</label>${tool('section-up','arrow-up','Move section up',sectionIndex === 0 ? 'disabled' : '')}${tool('section-down','arrow-down','Move section down',sectionIndex === document.sections.length - 1 ? 'disabled' : '')}${tool('section-delete','trash-2','Remove section')}</div>
            <label class="sr-only">Section heading</label><input class="section-title-input" aria-label="Section heading" data-section-title maxlength="80" value="${escapeHtml(section.title)}">
            ${simple ? `<div class="field-grid">${field(section.kind === 'summary' ? 'Professional summary' : section.kind === 'skills' ? 'Skills grouped by category' : 'Languages and proficiency', 'content', section.content, { full: true, area: true, limit: 3500 })}</div>` : section.items.map((item, index) => `<div class="entry-block" data-item="${index}"><div class="entry-heading"><h3>Entry ${index + 1}</h3><div class="entry-actions">${tool('item-up','arrow-up','Move entry up',index === 0 ? 'disabled' : '')}${tool('item-down','arrow-down','Move entry down',index === section.items.length - 1 ? 'disabled' : '')}${tool('item-delete','trash-2','Remove entry')}</div></div><div class="field-grid">${field(section.kind === 'education' ? 'Degree / qualification' : section.kind === 'projects' ? 'Project name' : 'Role / title', 'heading', item.heading, { full: true, limit: 180 })}${field(section.kind === 'education' ? 'Institution' : 'Organization / context', 'subheading', item.subheading, { full: true, limit: 180 })}${field('Start', 'start', item.start, { limit: 40 })}${field('End', 'end', item.end, { limit: 40 })}${field('Location', 'location', item.location, { full: true, limit: 120 })}${field('Public link', 'url', item.url, { full: true })}${field('Evidence bullets / one per line', 'bullets', item.bullets.join('\n'), { full: true, area: true, limit: 10500 })}</div></div>`).join('')}
            ${simple ? '' : `<button type="button" class="command secondary entry-add" data-action="item-add">${icon('plus')} Add entry</button>`}
        </details>`;
    }).join('');
    if (!sourceDirty) element('sourceEditor').value = JSON.stringify(document, null, 2);
    icons();
}

function renderTemplates() {
    const family = element('templateFilter').value;
    element('templateGrid').innerHTML = model.templates.filter(template => family === 'all' || template.family === family).map(template => `<button type="button" class="template-option" data-template="${template.id}" aria-pressed="${resume().template === template.id}" title="${escapeHtml(template.description)}"><img src="previews/${template.id}.png?v=20260921-catalog" width="268" height="379" loading="lazy" alt="${escapeHtml(template.name)} CV layout"><strong>${escapeHtml(template.name)}</strong><small>${template.layout === 'single' ? 'Single column' : 'Two columns'} / ${template.photo ? 'Photo' : template.font === 'Lato' ? 'Sans' : 'Serif'}</small></button>`).join('');
}

function renderReview() {
    const review = model.review(resume(), element('jobDescription').value);
    element('wordCount').textContent = review.wordCount + ' words';
    element('reviewFindings').innerHTML = review.findings.map(finding => `<article class="review-item ${finding.level}"><strong>${icon(finding.level === 'required' ? 'circle-alert' : finding.level === 'review' ? 'search-check' : 'info')}${escapeHtml(finding.title)}</strong><p>${escapeHtml(finding.detail)}</p></article>`).join('');
    element('keywordReview').innerHTML = review.matched.length || review.missing.length ? `<p>Present in document (${review.matched.length})</p><div class="keyword-group">${review.matched.map(word => `<span class="keyword">${escapeHtml(word)}</span>`).join('')}</div><p>Not found (${review.missing.length})</p><div class="keyword-group">${review.missing.map(word => `<span class="keyword missing">${escapeHtml(word)}</span>`).join('')}</div>` : '<p>No job description supplied.</p>';
    icons();
}

function refreshControls() {
    const document = resume();
    if (window.document.activeElement !== element('documentTitle')) element('documentTitle').value = document.title;
    element('currentTemplate').textContent = model.findTemplate(document.template).name;
    element('roleLabel').textContent = model.findRole(document.role).name;
    for (const [id, value] of Object.entries({ cvFont: document.settings.font, fontSize: document.settings.fontSize, spacing: document.settings.spacing, paper: document.settings.paper, margins: document.settings.margins, targetRole: document.role, targetCompany: document.company })) element(id).value = value;
    element('pageNumbers').checked = document.settings.pageNumbers;
    window.document.querySelectorAll('[data-template]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.template === document.template)));
    window.document.querySelectorAll('[name="accent"]').forEach(input => { input.checked = input.value === document.settings.accent; });
    const role = model.findRole(document.role);
    const company = model.findCompany(document.company);
    element('targetGuidance').innerHTML = `<h3>${escapeHtml(role.name)}</h3><p>${escapeHtml(role.focus)}</p><h3>${escapeHtml(company.name)}</h3><p>${escapeHtml(company.advice)}</p>${company.url ? `<a href="${escapeHtml(company.url)}" target="_blank" rel="noopener noreferrer">Official company resource ${icon('arrow-up-right')}</a>` : ''}`;
    element('undo').disabled = !past.length || sourceDirty;
    element('redo').disabled = !future.length || sourceDirty;
    element('exampleLabel').textContent = document.example ? 'Fictional example' : 'Local document';
    if (mode === 'review') renderReview();
    if (!sourceDirty) element('sourceEditor').value = JSON.stringify(document, null, 2);
    element('textPreview').textContent = model.plainText(document);
    element('photoControls').hidden = !model.findTemplate(document.template).photo;
    element('profilePhoto').hidden = !document.basics.photo;
    if (document.basics.photo) element('profilePhoto').src = document.basics.photo;
    else element('profilePhoto').removeAttribute('src');
    element('removePhoto').disabled = !document.basics.photo;
    icons();
}

function showScreen(screen) {
    if (!['catalog', 'editor', 'ats'].includes(screen)) screen = 'catalog';
    if (screen !== 'editor' && (sourceDirty || invalidInputs.size)) { notify('Apply source changes and correct highlighted fields before leaving the editor.'); return false; }
    document.body.dataset.screen = screen;
    element('catalogScreen').hidden = screen !== 'catalog';
    element('atsScreen').hidden = screen !== 'ats';
    element('workspace').hidden = screen !== 'editor';
    document.querySelector('.workspace-toolbar').hidden = screen !== 'editor';
    document.querySelectorAll('button[data-screen]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.screen === screen)));
    const url = new URL(location.href);
    url.searchParams.set('view', screen);
    history.replaceState(null, '', url);
    if (screen === 'editor') requestAnimationFrame(renderPage);
    return true;
}

function queuePreview() {
    element('renderState').textContent = 'Rendering...';
    clearTimeout(previewTimer);
    previewTimer = setTimeout(generatePreview, 350);
}

async function bufferFor(document, watermark) {
    if (document.basics.photo && model.findTemplate(document.template).photo) {
        const bytes = Uint8Array.from(atob(document.basics.photo.split(',')[1]), character => character.charCodeAt(0));
        let image;
        try { image = await createImageBitmap(new Blob([bytes], { type: document.basics.photo.startsWith('data:image/png;') ? 'image/png' : 'image/jpeg' })); }
        catch { throw new Error('The profile photo could not be decoded. Remove it or choose a valid JPEG/PNG.'); }
        const oversized = image.width * image.height > 4000000;
        image.close();
        if (oversized) throw new Error('Crop the profile photo before exporting; imported photos must be below 4 megapixels.');
    }
    return new Promise((resolve, reject) => {
        try { window.pdfMake.createPdf(exporter.pdfDefinition(document, { watermark })).getBuffer(resolve); } catch (error) { reject(error); }
    });
}

async function generatePreview() {
    const sequence = ++previewSequence;
    try {
        const bytes = await bufferFor(clone(resume()), !billing?.state.active);
        if (sequence !== previewSequence) return;
        const next = await pdfjs.getDocument({ data: new Uint8Array(bytes).slice(), isEvalSupported: false }).promise;
        if (sequence !== previewSequence) { await next.destroy(); return; }
        if (pdfRenderTask) { pdfRenderTask.cancel(); pdfRenderTask = null; }
        const old = pdfDocument;
        pdfDocument = next;
        currentPage = Math.min(currentPage, next.numPages);
        element('previewError').hidden = true;
        element('renderState').textContent = next.numPages + (next.numPages === 1 ? ' page' : ' pages') + ' / ' + resume().settings.paper;
        await renderPage();
        if (old) await old.destroy();
    } catch (error) {
        if (sequence !== previewSequence || error.name === 'RenderingCancelledException') return;
        element('previewError').hidden = false;
        element('previewError').textContent = 'PDF preview could not render. Your local draft is unchanged. ' + (error.message || 'Try another layout or reduce an unusually large entry.');
        element('renderState').textContent = 'Preview error';
    }
}

async function renderPage() {
    if (!pdfDocument) return;
    const sequence = ++renderSequence;
    if (pdfRenderTask) { pdfRenderTask.cancel(); pdfRenderTask = null; }
    element('pageLabel').textContent = currentPage + ' / ' + pdfDocument.numPages;
    element('previousPage').disabled = currentPage <= 1;
    element('nextPage').disabled = currentPage >= pdfDocument.numPages;
    if (previewMode !== 'pdf' || element('previewScroll').clientWidth < 20) return;
    try {
        const page = await pdfDocument.getPage(currentPage);
        if (sequence !== renderSequence) return;
        const original = page.getViewport({ scale: 1 });
        const available = Math.max(180, element('previewScroll').clientWidth - (innerWidth <= 680 ? 24 : 48));
        const width = zoom === 'fit' ? Math.min(available, innerWidth > 1700 ? 740 : 650) : original.width * Number(zoom);
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: width / original.width * ratio });
        element('pdfSheet').style.width = width + 'px';
        element('pdfSheet').style.aspectRatio = original.width + ' / ' + original.height;
        const canvas = element('pdfCanvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        pdfRenderTask = page.render({ canvasContext: canvas.getContext('2d'), viewport });
        await pdfRenderTask.promise;
        if (sequence === renderSequence) pdfRenderTask = null;
    } catch (error) {
        if (error.name !== 'RenderingCancelledException') notify('Unable to display this PDF page. Your draft is still available.');
    }
}

function confirmChange(message) {
    element('confirmMessage').textContent = message;
    const dialog = element('confirmDialog');
    dialog.returnValue = '';
    dialog.showModal();
    return new Promise(resolve => dialog.addEventListener('close', () => resolve(dialog.returnValue === 'confirm'), { once: true }));
}

function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = filename;
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function backup() {
    if (sourceDirty || invalidInputs.size) { notify('Apply source changes and correct highlighted fields before creating a backup.'); return; }
    download(new Blob([JSON.stringify(resume(), null, 2) + '\n'], { type: 'application/json' }), exporter.filename(resume(), 'json'));
    notify('JSON backup prepared. It contains your CV data.');
}

function showDrafts() {
    element('draftList').innerHTML = library.documents.map(record => `<div class="draft-row"><button type="button" data-open-draft="${record.id}"><strong>${escapeHtml(record.resume.title)}${record.id === library.activeId ? ' / current' : ''}</strong><small>${escapeHtml(model.findRole(record.resume.role).name)}</small></button><button class="icon-button" data-duplicate-draft="${record.id}" title="Duplicate draft" aria-label="Duplicate ${escapeHtml(record.resume.title)}">${icon('copy')}</button><button class="icon-button" data-delete-draft="${record.id}" title="Delete local draft" aria-label="Delete ${escapeHtml(record.resume.title)}">${icon('trash-2')}</button></div>`).join('');
    icons();
    if (!element('draftDialog').open) element('draftDialog').showModal();
}

function activate(id) {
    library.activeId = id;
    past = []; future = []; lastHistoryKey = ''; sourceDirty = false;
    element('sourceStatus').textContent = '';
    element('editorFields').replaceChildren();
    currentPage = 1;
    renderEditor(); renderTemplates(); refreshControls(); save(); queuePreview();
    showScreen('editor');
}

function addDraft(document) {
    if (library.documents.length >= 10) { notify('There are 10 local drafts. Back up and remove an unneeded draft before adding another.'); return false; }
    const record = newRecord(document);
    library.documents.push(record);
    activate(record.id);
    return true;
}

function billingChanged(state) {
    element('billingStatus').textContent = state.message;
    element('payButton').disabled = !state.ready || state.active || paying || billing?.hasPending() || billing?.hasAccess();
    element('purchaseForm').hidden = state.active;
    element('downloadPdf').disabled = !state.active || exporting;
    element('downloadTex').disabled = !state.active || exporting;
    element('downloadProject').disabled = !state.active || exporting;
    element('retryPayment').hidden = billing?.mode === 'razorpay' || (!billing?.hasPending() && !(billing?.hasAccess() && !state.active));
    element('backupAccess').disabled = !state.active;
    element('accessBadge').textContent = state.active ? billing?.mode === 'razorpay' ? 'Access saved' : 'Access verified' : state.ready ? 'All templates / INR 49' : 'Checkout unavailable';
    element('accessBadge').classList.toggle('active', state.active);
}

async function exportPaid(format) {
    if (sourceDirty || invalidInputs.size) { notify('Apply source changes and correct highlighted fields before exporting.'); return; }
    if (exporting) return;
    exporting = true; billingChanged(billing.state);
    try {
        await billing.authorize();
        const document = clone(resume());
        if (format === 'pdf') download(new Blob([await bufferFor(document, false)], { type: 'application/pdf' }), exporter.filename(document, 'pdf'));
        else if (format === 'project') {
            const files = Object.fromEntries(Object.entries(exporter.projectFiles(document)).map(([name, data]) => [name, typeof data === 'string' ? window.fflate.strToU8(data) : data]));
            files['resume.pdf'] = new Uint8Array(await bufferFor(document, false));
            download(new Blob([window.fflate.zipSync(files)], { type: 'application/zip' }), exporter.filename(document, 'zip'));
        } else download(new Blob([exporter.latex(document)], { type: 'application/x-tex;charset=utf-8' }), exporter.filename(document, 'tex'));
        notify(format === 'pdf' ? 'PDF export prepared.' : format === 'project' ? 'Complete template package prepared.' : 'LaTeX source prepared for XeLaTeX.');
    } catch (error) { element('billingStatus').textContent = error.message; }
    finally { exporting = false; billingChanged({ ...billing.state, message: element('billingStatus').textContent }); }
}

loadDrafts();
element('templateFilter').innerHTML = '<option value="all">All layouts</option>' + [...new Set(model.templates.map(template => template.family))].map(family => `<option>${escapeHtml(family)}</option>`).join('');
for (const id of ['targetRole', 'newRole']) element(id).innerHTML = model.roles.map(role => `<option value="${role.id}">${escapeHtml(role.name)}</option>`).join('');
element('targetCompany').innerHTML = model.companies.map(company => `<option value="${company.id}">${escapeHtml(company.name)}</option>`).join('');
element('sectionKind').innerHTML = Object.entries(model.sectionNames).map(([kind, title]) => `<option value="${kind}">${escapeHtml(title)}</option>`).join('');
element('accentSwatches').innerHTML = model.colors.map((color, index) => `<input type="radio" class="swatch" name="accent" value="${color}" style="background:${color}" aria-label="${['Forest','Blue','Graphite','Terracotta','Plum gray','Petrol'][index]} accent" title="${['Forest','Blue','Graphite','Terracotta','Plum gray','Petrol'][index]}">`).join('');
renderEditor(); renderTemplates(); refreshControls(); save();
let storage;
try { storage = window.localStorage; } catch {}
const checkoutConfig = window.CV_STUDIO_CONFIG || {};
const purchaseRecorded = (receipt, details) => {
    window.CvBilling.recordDigitalPurchase(receipt, details, storage);
    return window.CvBilling.notifyDigitalPurchase(receipt, details, checkoutConfig);
};
billing = checkoutConfig.checkoutMode === 'razorpay'
    ? window.CvBilling.createDigitalClient({ publicKey: checkoutConfig.publicKey, storage, onChange: billingChanged, onPurchase: purchaseRecorded })
    : window.CvBilling.createClient({ apiBase: checkoutConfig.apiBase, currentHost: location.hostname, storage, onChange: billingChanged });
queuePreview();
billing.init().then(() => { if (billing.state.active) queuePreview(); });

element('editorFields').addEventListener('input', event => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    const sectionId = target.closest('[data-section]')?.dataset.section;
    const itemIndex = target.closest('[data-item]')?.dataset.item;
    try {
        commit(draft => {
            if (target.closest('[data-basics]')) draft.basics[target.dataset.field] = target.value;
            else {
                const section = draft.sections.find(candidate => candidate.id === sectionId);
                if (target.hasAttribute('data-section-title')) section.title = target.value;
                else if (target.hasAttribute('data-visible')) section.visible = target.checked;
                else if (itemIndex !== undefined) section.items[Number(itemIndex)][target.dataset.field] = target.dataset.field === 'bullets' ? target.value.split(/\r?\n/) : target.value;
                else section[target.dataset.field] = target.value;
            }
        }, { key: [sectionId || 'contact', itemIndex, target.dataset.field || target.getAttribute('aria-label')].join(':') });
        target.setCustomValidity('');
        target.removeAttribute('aria-invalid');
        invalidInputs.delete(target);
        if (sectionId && (target.hasAttribute('data-section-title') || target.hasAttribute('data-visible'))) {
            const section = resume().sections.find(candidate => candidate.id === sectionId);
            const details = target.closest('details');
            details.classList.toggle('is-hidden', !section.visible);
            details.querySelector('summary').innerHTML = escapeHtml(section.title) + (section.visible ? '' : '<small>Hidden</small>');
        }
    } catch (error) {
        invalidInputs.add(target);
        target.setCustomValidity(error.message);
        target.setAttribute('aria-invalid', 'true');
        target.reportValidity();
        notify('Not saved: ' + error.message);
    }
});

element('editorFields').addEventListener('click', async event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    if (invalidInputs.size) { notify('Correct the highlighted field before changing entries or sections.'); return; }
    const action = button.dataset.action;
    const id = button.closest('[data-section]').dataset.section;
    const item = Number(button.closest('[data-item]')?.dataset.item);
    if (action.endsWith('delete') && !await confirmChange(action === 'section-delete' ? 'Remove this section and its entries from this draft? You can undo this change.' : 'Remove this entry from the draft? You can undo this change.')) return;
    try {
        commit(draft => {
            const index = draft.sections.findIndex(section => section.id === id);
            const section = draft.sections[index];
            if (action === 'section-delete') draft.sections.splice(index, 1);
            if (action === 'section-up' && index > 0) [draft.sections[index - 1], draft.sections[index]] = [section, draft.sections[index - 1]];
            if (action === 'section-down' && index < draft.sections.length - 1) [draft.sections[index + 1], draft.sections[index]] = [section, draft.sections[index + 1]];
            if (action === 'item-add') section.items.push(model.newItem());
            if (action === 'item-delete') section.items.splice(item, 1);
            if (action === 'item-up' && item > 0) [section.items[item - 1], section.items[item]] = [section.items[item], section.items[item - 1]];
            if (action === 'item-down' && item < section.items.length - 1) [section.items[item + 1], section.items[item]] = [section.items[item], section.items[item + 1]];
        }, { fields: true });
        if (action === 'item-add') element('editorFields').querySelector(`[data-section="${id}"] .entry-block:last-of-type [data-field="heading"]`)?.focus();
    } catch (error) { notify(error.message); }
});

element('documentTitle').addEventListener('input', event => commit(draft => { draft.title = event.target.value; }, { key: 'title', markEdited: false }));
element('addSection').addEventListener('click', () => {
    if (invalidInputs.size) { notify('Correct the highlighted field before adding a section.'); return; }
    try {
        const kind = element('sectionKind').value;
        const id = kind + '-' + crypto.randomUUID();
        commit(draft => { draft.sections.push(model.newSection(kind, id)); }, { fields: true });
        const details = element('editorFields').querySelector(`[data-section="${id}"]`);
        details.open = true;
        details.querySelector('[data-section-title]').focus();
    } catch (error) { notify(error.message); }
});
element('undo').addEventListener('click', () => historyMove('undo'));
element('redo').addEventListener('click', () => historyMove('redo'));
element('templateFilter').addEventListener('change', renderTemplates);
element('templateGrid').addEventListener('click', event => {
    const button = event.target.closest('[data-template]');
    if (button) commit(draft => model.applyTemplate(draft, button.dataset.template), { markEdited: false });
});
for (const [id, setting] of [['cvFont','font'],['fontSize','fontSize'],['spacing','spacing'],['paper','paper'],['margins','margins'],['pageNumbers','pageNumbers']]) element(id).addEventListener('change', event => commit(draft => { draft.settings[setting] = setting === 'pageNumbers' ? event.target.checked : ['fontSize','margins'].includes(setting) ? Number(event.target.value) : event.target.value; }, { markEdited: false }));
element('accentSwatches').addEventListener('change', event => commit(draft => { draft.settings.accent = event.target.value; }, { markEdited: false }));
for (const [id, fieldName] of [['targetRole','role'],['targetCompany','company']]) element(id).addEventListener('change', event => commit(draft => { draft[fieldName] = event.target.value; }, { markEdited: false }));

document.querySelectorAll('[data-side]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-side]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
    for (const name of ['templates', 'style', 'target']) element(name + 'Panel').hidden = name !== button.dataset.side;
}));
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', async () => {
    if (invalidInputs.size) { notify('Correct the highlighted field before changing editor mode.'); return; }
    if (mode === 'source' && sourceDirty && button.dataset.mode !== 'source') {
        if (!await confirmChange('Discard unapplied JSON source edits? The last valid CV remains unchanged.')) return;
        sourceDirty = false; element('sourceStatus').textContent = ''; element('sourceEditor').value = JSON.stringify(resume(), null, 2);
    }
    mode = button.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
    for (const name of ['details','source','review']) element(name + 'Panel').hidden = name !== mode;
    if (mode === 'review') renderReview();
    if (mode === 'source' && !sourceDirty) element('sourceEditor').value = JSON.stringify(resume(), null, 2);
    refreshControls();
}));
element('sourceEditor').addEventListener('input', () => { sourceDirty = true; element('sourceStatus').textContent = 'Unapplied source changes'; element('undo').disabled = true; element('redo').disabled = true; });
element('applySource').addEventListener('click', () => {
    try {
        if (element('sourceEditor').value.length > 500000) throw new Error('The document exceeds the 500 KB source limit.');
        const next = model.normalizeResume(JSON.parse(element('sourceEditor').value));
        sourceDirty = false;
        commit(() => next, { fields: true });
        element('sourceStatus').textContent = 'Source applied';
    } catch (error) { element('sourceStatus').textContent = 'Not applied: ' + error.message; }
});
element('jobDescription').addEventListener('input', renderReview);
element('sideToggle').addEventListener('click', () => { element('sidePanel').classList.add('drawer-open'); element('tabTemplates').focus(); });
element('closeSide').addEventListener('click', () => { element('sidePanel').classList.remove('drawer-open'); element('sideToggle').focus(); });
document.querySelectorAll('[data-view]').forEach(button => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.addEventListener('click', () => { element('workspace').dataset.view = button.dataset.view; document.querySelectorAll('button[data-view]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button))); requestAnimationFrame(renderPage); });
});
document.querySelectorAll('[data-preview-mode]').forEach(button => button.addEventListener('click', () => {
    previewMode = button.dataset.previewMode;
    element('pdfSheet').hidden = previewMode !== 'pdf'; element('textPreview').hidden = previewMode !== 'text';
    document.querySelectorAll('[data-preview-mode]').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    renderPage();
}));
element('previousPage').addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderPage(); element('previewScroll').scrollTop = 0; } });
element('nextPage').addEventListener('click', () => { if (pdfDocument && currentPage < pdfDocument.numPages) { currentPage++; renderPage(); element('previewScroll').scrollTop = 0; } });
element('zoom').addEventListener('change', event => { zoom = event.target.value; renderPage(); });
let resizeTimer;
new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(renderPage, 120); }).observe(element('previewScroll'));

document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => element(button.dataset.close).close()));
element('openDrafts').addEventListener('click', showDrafts);
function openNew() { element('draftDialog').close(); element('newRole').value = resume().role; element('newDialog').showModal(); }
element('newDraft').addEventListener('click', openNew);
element('newFromRole').addEventListener('click', openNew);
element('newForm').addEventListener('submit', event => {
    event.preventDefault();
    if (sourceDirty || invalidInputs.size) { notify('Apply source changes and correct highlighted fields before creating a draft.'); return; }
    const document = model.starter(element('newRole').value, !element('useExample').checked);
    document.title = element('newTitle').value;
    if (addDraft(document)) element('newDialog').close();
});
element('draftList').addEventListener('click', async event => {
    const button = event.target.closest('button'); if (!button) return;
    if (sourceDirty || invalidInputs.size) { notify('Apply source changes and correct highlighted fields before changing drafts.'); return; }
    if (button.dataset.openDraft) { save(); activate(button.dataset.openDraft); element('draftDialog').close(); }
    if (button.dataset.duplicateDraft) { const copied = clone(library.documents.find(record => record.id === button.dataset.duplicateDraft).resume); copied.title = (copied.title + ' copy').slice(0, 100); if (addDraft(copied)) showDrafts(); }
    if (button.dataset.deleteDraft) {
        const id = button.dataset.deleteDraft;
        if (!await confirmChange('Delete this local draft? This cannot be undone. Download a JSON backup first if you need it.')) return;
        library.documents = library.documents.filter(record => record.id !== id);
        if (!library.documents.length) library.documents.push(newRecord(model.starter('backend', true)));
        activate(library.documents.some(record => record.id === library.activeId) ? library.activeId : library.documents[0].id);
        showDrafts();
    }
});
element('importJson').addEventListener('click', () => element('jsonFile').click());
element('jsonFile').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file) return;
    try {
        if (sourceDirty || invalidInputs.size) throw new Error('Apply source changes and correct highlighted fields before importing.');
        if (file.size > 500000) throw new Error('JSON files must be smaller than 500 KB.');
        const document = model.normalizeResume(JSON.parse(await file.text()));
        if (addDraft(document)) notify('Imported as a new local draft.');
    } catch (error) { notify('Import not applied: ' + error.message); }
    event.target.value = '';
});
element('backupJson').addEventListener('click', backup);
element('exportBackup').addEventListener('click', backup);
element('openExport').addEventListener('click', () => { billingChanged(billing.state); element('exportDialog').showModal(); });
element('openPrivacy').addEventListener('click', () => element('privacyDialog').showModal());
element('downloadPdf').addEventListener('click', () => exportPaid('pdf'));
element('downloadTex').addEventListener('click', () => exportPaid('tex'));
element('downloadProject').addEventListener('click', () => exportPaid('project'));
element('retryPayment').addEventListener('click', async () => { try { if (billing.hasPending()) await billing.verifyPending(); else await billing.authorize(); queuePreview(); } catch (error) { element('billingStatus').textContent = error.message; } });
element('backupAccess').addEventListener('click', () => {
    try { download(new Blob([JSON.stringify(billing.accessReceipt(), null, 2)], { type: 'application/json' }), 'cv-studio-access-receipt.json'); }
    catch (error) { element('billingStatus').textContent = error.message; }
});
element('restoreAccess').addEventListener('click', () => element('receiptFile').click());
element('receiptFile').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
        if (file.size > 5000) throw new Error('This is not a valid access receipt.');
        await billing.restoreAccess(JSON.parse(await file.text()));
        if (billing.mode === 'razorpay') window.CvBilling.recordDigitalPurchase(billing.accessReceipt(), {}, storage);
        queuePreview();
    } catch (error) { element('billingStatus').textContent = 'Access not restored: ' + error.message; }
    event.target.value = '';
});
element('purchaseForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || paying || !billing.state.ready) return;
    paying = true; billingChanged(billing.state);
    let message = billing.state.message;
    try {
        await window.CvBilling.openCheckout(billing, { email: element('checkoutEmail').value.trim(), beforeOpen: () => element('exportDialog').close(), onStatus: value => { message = value; element('billingStatus').textContent = value; } });
        message = billing.state.message;
        queuePreview();
    } catch (error) { message = error.message; }
    finally {
        paying = false;
        billingChanged({ ...billing.state, message });
        if (!element('exportDialog').open) element('exportDialog').showModal();
    }
});

window.addEventListener('pagehide', save);
window.addEventListener('beforeunload', event => { if (sourceDirty || storageFailed || storagePaused || invalidInputs.size) { event.preventDefault(); event.returnValue = ''; } });
window.addEventListener('storage', event => {
    if (event.key !== storageKey || event.newValue === lastPersisted) return;
    storagePaused = true;
    clearTimeout(saveTimer);
    element('saveState').textContent = 'Saving paused / another tab changed drafts';
    notify('Drafts changed in another tab. Local saving is paused to avoid overwriting them. Back up this draft before reloading.', true);
});
window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && element('sidePanel').classList.contains('drawer-open')) element('closeSide').click();
});
const catalogue = initCatalogue({ model, createDraft: addDraft, applyLayout: id => commit(draft => model.applyTemplate(draft, id), { markEdited: false }), isBlocked: () => Boolean(sourceDirty || invalidInputs.size), onEdit: () => showScreen('editor'), notify, icons });
document.querySelectorAll('button[data-screen]').forEach(button => button.addEventListener('click', () => showScreen(button.dataset.screen)));
const initialParameters = new URLSearchParams(location.search);
showScreen(initialParameters.get('view') === 'review' ? 'ats' : initialParameters.get('view') || 'catalog');
if (model.templates.some(template => template.id === initialParameters.get('template'))) catalogue.openTemplate(initialParameters.get('template'));

function drawPhotoCrop() {
    if (!cropImage) return;
    const canvas = element('photoCropCanvas');
    const scale = Math.max(canvas.width / cropImage.width, canvas.height / cropImage.height) * Number(element('photoZoom').value);
    const sourceWidth = canvas.width / scale;
    const sourceHeight = canvas.height / scale;
    const sourceX = (cropImage.width - sourceWidth) * Number(element('photoX').value) / 100;
    const sourceY = (cropImage.height - sourceHeight) * Number(element('photoY').value) / 100;
    canvas.getContext('2d').drawImage(cropImage, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
}
element('uploadPhoto').addEventListener('click', () => element('photoFile').click());
element('removePhoto').addEventListener('click', () => commit(draft => { draft.basics.photo = ''; }));
element('photoFile').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
        if (sourceDirty || invalidInputs.size) throw new Error('Correct the highlighted fields before changing the photograph.');
        if (!['image/jpeg', 'image/png'].includes(file.type) || file.size > 6000000) throw new Error('Choose a PNG or JPEG smaller than 6 MB.');
        const image = await createImageBitmap(file);
        if (image.width * image.height > 25000000) { image.close(); throw new Error('Choose a photo below 25 megapixels.'); }
        cropImage?.close();
        cropImage = image;
        element('photoZoom').value = '1';
        element('photoX').value = '50';
        element('photoY').value = '50';
        drawPhotoCrop();
        element('photoDialog').showModal();
    } catch (error) { notify(error.message); }
    event.target.value = '';
});
for (const id of ['photoZoom', 'photoX', 'photoY']) element(id).addEventListener('input', drawPhotoCrop);
element('applyPhoto').addEventListener('click', () => {
    if (!cropImage) return;
    const photo = element('photoCropCanvas').toDataURL('image/jpeg', 0.88);
    commit(draft => { draft.basics.photo = photo; });
    element('photoDialog').close();
});
element('photoDialog').addEventListener('close', () => { cropImage?.close(); cropImage = null; });
const readinessView = initReadiness({ model, readiness: window.CvReadiness, importer: window.CvImport, billingApi: window.CvBilling, config: checkoutConfig, storage, getCurrent: () => clone(resume()), isBlocked: () => Boolean(sourceDirty || invalidInputs.size), getPdf: document => bufferFor(document, false), download, notify, icons, onPurchase: purchaseRecorded });
element('reviewBeforeExport').addEventListener('click', () => {
    if (sourceDirty || invalidInputs.size) { notify('Apply source changes and correct highlighted fields before reviewing.'); return; }
    element('exportDialog').close();
    showScreen('ats');
    readinessView.useCurrent();
});
window.CvStudio = { current: () => clone(resume()), pdfPages: () => pdfDocument?.numPages || 0, navigate: showScreen, hasUnappliedEdits: () => Boolean(sourceDirty || invalidInputs.size), currentReport: readinessView.getReport };