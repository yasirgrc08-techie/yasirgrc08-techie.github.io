export function initReadiness({ model, readiness, importer, billingApi, config, storage, getCurrent, isBlocked, getPdf, download, notify, icons, onPurchase }) {
    const element = id => document.getElementById(id);
    const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
    const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
    const historyKey = 'yasir-cv-review-reports-v1';
    const roleOptions = model.roles.map(role => `<option value="${role.id}">${escapeHtml(role.name)}</option>`).join('');
    const companyOptions = model.companies.map(company => `<option value="${company.id}">${escapeHtml(company.name)}</option>`).join('');
    let source = null;
    let prepared = null;
    let client = null;
    let currentReport = null;
    let busy = false;
    let revision = 0;
    let reports = [];
    let historyPaused = false;

    element('atsApp').innerHTML = `<div class="ats-inner">
        <div class="catalog-heading"><div><p class="catalog-eyebrow">APPLICATION READINESS</p><h1>ATS &amp; CV Review</h1><p>Your CV, checked against readable-text and role-evidence guidelines.</p></div><div class="review-price"><strong>&#8377;9</strong><span>per report / no subscription</span></div></div>
        <div class="ats-layout">
            <form id="atsForm" class="ats-input">
                <fieldset id="atsFields">
                    <div class="ats-step"><span>01</span><h2>Your CV</h2></div>
                    <div class="ats-input-actions"><button class="command secondary" type="button" id="useStudioCv">${icon('file-pen-line')} Use current studio CV</button><button class="command secondary" type="button" id="chooseReviewFile">${icon('upload')} Upload your CV</button></div>
                    <input id="reviewFile" type="file" accept=".pdf,.docx,.txt" hidden>
                    <p class="ats-file-status" id="reviewFileStatus" role="status">PDF, DOCX, or TXT / up to 5 MB / English</p>
                    <label class="ats-label" for="reviewText">CV text * <span id="reviewTextLabel">or paste your own CV</span></label>
                    <textarea id="reviewText" rows="8" maxlength="75000" placeholder="Paste your CV text" spellcheck="false"></textarea>
                    <div class="ats-step"><span>02</span><h2>Target role</h2></div>
                    <div class="ats-targets"><label>Target role *<select id="reviewRole">${roleOptions}</select></label><label>Company guidance / optional<select id="reviewCompany">${companyOptions}</select></label></div>
                    <label class="ats-label" for="reviewJob">Job description <span>optional / local only</span></label><textarea id="reviewJob" rows="5" maxlength="12000" placeholder="Paste the relevant job description"></textarea>
                    <label class="ats-label" for="reviewRequirements">Key requirements <span>optional / comma separated</span></label><input id="reviewRequirements" maxlength="1000" placeholder="Python, PostgreSQL, mentoring">
                    <label class="ats-label" for="reviewEmail">Receipt email * <span>required only for a new purchase</span></label><input id="reviewEmail" type="email" autocomplete="email" maxlength="254" placeholder="you@example.com">
                    <div class="ats-step"><span>03</span><h2>Prepare review</h2></div>
                    <label class="check-label"><input type="checkbox" id="reviewConsent" required> I have permission to process this CV locally. *</label>
                    <p class="subtle">* Required input. Optional details do not automatically earn score points.</p>
                    <button class="command primary wide" type="submit" id="prepareReview">${icon('scan-text')} Check readability first</button>
                </fieldset>
                <p id="reviewStatus" class="ats-status" role="status" aria-live="polite"></p>
                <div id="reviewCheckout" class="review-checkout" hidden><h3 id="reviewPreparedTitle">Ready for review</h3><p id="reviewPreparedDetails"></p><button class="command primary wide" type="button" id="buyReview">${icon('credit-card')} Purchase report &middot; &#8377;9</button><p class="subtle">One report for this CV and selected target. A changed CV or target is a new review. Existing reports can be reopened and downloaded without another purchase.</p></div>
                <p class="ats-scope">Independent English-language checks, not an employer ATS result or interview prediction. No access to companies' private screening systems. A photo, name, age, or other personal characteristic does not improve the score.</p>
            </form>
            <section class="ats-output" aria-label="CV review results">
                <div id="reviewPlaceholder" class="review-placeholder"><i data-lucide="file-check-2" aria-hidden="true"></i><h2>Review report</h2><dl><div><dt>Document</dt><dd>Readable text and parsing warnings</dd></div><div><dt>Evidence</dt><dd>Contributions, context, and validation</dd></div><div><dt>Target</dt><dd>Job terms and public company guidance</dd></div></dl><p>No payment is requested for unreadable or sample-only content. Scanned images need OCR first.</p></div>
                <div id="reviewReport" hidden></div>
                <div class="review-history-heading"><h2>Saved reports</h2><button class="icon-button" type="button" id="restoreReview" title="Import saved report" aria-label="Import saved report">${icon('upload')}</button></div><div id="reviewHistory"></div><input id="reviewReportFile" type="file" accept=".json,application/json" hidden>
                <p class="subtle">Reports and purchase receipts are saved in this browser. Report backups contain CV excerpts and a purchase reference; keep them private. Clearing browser storage can remove local history.</p>
            </section>
        </div>
        <details class="review-method"><summary>Methodology, limitations, and references</summary><p>Each report shows earned points and available points. Unknown layout checks and missing job descriptions are not scored. The same CV receives the same checklist score across company selections; company selection adds guidance, not a fabricated employer pass threshold.</p><p>Term coverage uses supported terms and aliases plus the requirements you supply. It cannot establish skill proficiency, eligibility, truthfulness, or actual ATS acceptance. Scores are editorial, not a validated hiring model.</p><ul>${readiness.references.map(reference => `<li><a href="${reference.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(reference.title)}</a> &mdash; ${escapeHtml(reference.scope)}</li>`).join('')}</ul></details>
    </div>`;
    element('reviewRole').value = getCurrent().role;
    element('reviewCompany').value = getCurrent().company;

    function status(message) { element('reviewStatus').textContent = message; }
    function setBusy(value) {
        busy = value;
        element('atsFields').disabled = value;
        element('buyReview').disabled = value || !prepared || !client || (!client.state.ready && !client.state.active) || client.hasPending();
    }
    function invalidate() {
        revision++;
        prepared = null;
        client = null;
        element('reviewCheckout').hidden = true;
        currentReport = null;
        element('reviewReport').hidden = true;
        element('reviewPlaceholder').hidden = false;
    }
    function applyInput(value) {
        source = value.source;
        element('reviewText').value = value.text;
        element('reviewTextLabel').textContent = source.kind === 'text' ? 'pasted text / layout unknown' : 'extracted locally / verify reading order';
        element('reviewFileStatus').textContent = source.name + ' / ' + source.kind.toUpperCase() + (source.pages ? ' / ' + source.pages + ' pages' : '') + (source.bytes ? ' / ' + Math.ceil(source.bytes / 1024) + ' KB' : '');
        invalidate();
        status('CV text is ready for the free readability check. No payment has started.');
    }
    function inputSnapshot() {
        return { text: element('reviewText').value, role: element('reviewRole').value, company: element('reviewCompany').value, jobText: element('reviewJob').value, requiredTerms: element('reviewRequirements').value, source: source || { kind: 'text', name: 'Pasted CV', pages: null, columns: null, hasImages: null } };
    }
    function validRecord(value) {
        if (!value || value.version !== 1 || !/^[a-f0-9]{64}$/.test(value.fingerprint || '') || typeof value.createdAt !== 'string' || !Number.isFinite(Date.parse(value.createdAt))) return false;
        const report = value.report;
        if (!report || report.version !== readiness.version || !Number.isInteger(report.score) || report.score < 0 || report.score > 100 || !Array.isArray(report.checks) || report.checks.length > 30 || !Array.isArray(report.warnings) || report.warnings.length > 20) return false;
        if (!report.coverage || !Array.isArray(report.coverage.matched) || !Array.isArray(report.coverage.missing) || report.coverage.matched.length + report.coverage.missing.length > 45 || !report.guidance || !report.source) return false;
        const stringFields = [report.label, report.methodology, report.limitation, report.source.name, report.guidance.role, report.guidance.company, ...report.warnings, ...report.coverage.matched, ...report.coverage.missing];
        if (stringFields.some(text => typeof text !== 'string' || text.length > 3000)) return false;
        if (report.checks.some(check => !check || !['pass', 'review', 'not-assessed'].includes(check.status) || [check.title, check.detail, check.recommendation, check.category].some(text => typeof text !== 'string' || text.length > 3000) || !Number.isFinite(check.maximum) || check.maximum < 0 || check.maximum > 100 || (check.points !== null && (!Number.isFinite(check.points) || check.points < 0 || check.points > check.maximum)))) return false;
        if (report.revisions !== undefined && (!Array.isArray(report.revisions) || report.revisions.length > 2 || report.revisions.some(item => !item || [item.before, item.structure, item.prompt].some(text => typeof text !== 'string' || text.length > 1500)))) return false;
        const receipt = value.receipt;
        return Boolean(receipt && receipt.version === 2 && receipt.product === 'cv-readiness-v1' && receipt.scope === value.fingerprint && receipt.amount === 900 && receipt.currency === 'INR' && receipt.mode === 'razorpay-browser' && /^pay_[A-Za-z0-9]{6,40}$/.test(receipt.paymentId || ''));
    }
    function readHistory() {
        try {
            const raw = storage?.getItem(historyKey);
            if (!raw) return [];
            const values = JSON.parse(raw);
            if (!Array.isArray(values) || values.length > 30 || values.some(value => !validRecord(value))) throw new Error('Invalid history');
            return values;
        } catch {
            historyPaused = true;
            status('Saved report history could not be read. It has not been overwritten. Download a report backup after purchase.');
            return [];
        }
    }
    reports = readHistory();
    function saveRecord(record) {
        const latest = historyPaused ? reports : readHistory();
        reports = [record, ...latest.filter(item => item.fingerprint !== record.fingerprint)].slice(0, 30);
        if (historyPaused || !storage) { notify('Report is available for this visit. Download its JSON backup to keep it.'); return; }
        try { storage.setItem(historyKey, JSON.stringify(reports)); }
        catch { notify('Report could not be saved locally. Download its JSON backup now.'); }
    }
    function renderHistory() {
        element('reviewHistory').innerHTML = reports.length ? reports.map(record => `<div class="review-history-row"><button type="button" data-report="${record.fingerprint}"><strong>${escapeHtml(record.report.source.name)}</strong><span>${escapeHtml(model.findRole(record.report.role).name)} / ${escapeHtml(new Date(record.createdAt).toLocaleDateString())}</span></button><span>${record.report.score}/100</span><button class="icon-button" type="button" data-delete-report="${record.fingerprint}" title="Remove saved report" aria-label="Remove saved report">${icon('trash-2')}</button></div>`).join('') : '<p class="subtle">No saved reports yet.</p>';
        icons();
    }
    function showReport(record) {
        currentReport = record;
        const report = record.report;
        const company = model.findCompany(report.company);
        const plan = readiness.improvementPlan(report);
        element('reviewPlaceholder').hidden = true;
        element('reviewReport').hidden = false;
        element('reviewReport').innerHTML = `<div class="review-score"><div><span>${escapeHtml(report.label)}</span><strong>${report.score}<small>/100</small></strong><p>${escapeHtml(report.earned)} / ${escapeHtml(report.available)} available points</p></div><div><h2>${escapeHtml(report.source.name)}</h2><p>${escapeHtml(model.findRole(report.role).name)}</p><p>${escapeHtml(company.name)} / ${escapeHtml(report.wordCount)} words</p></div></div>
            <p class="review-rating"><strong>${escapeHtml(plan.rating)}</strong><span>${plan.assessed} of ${plan.total} checks assessed. ${escapeHtml(plan.scope)}</span></p>
            <p class="report-limitation">${escapeHtml(report.limitation)}</p>
            <div class="report-actions"><button class="command secondary" type="button" data-report-export="pdf">${icon('file-down')} PDF report</button><button class="command secondary" type="button" data-report-export="json">${icon('save')} Report backup</button></div>
            <section class="report-section"><h3>Priority improvements</h3>${plan.priorities.length ? `<ol class="report-priorities">${plan.priorities.slice(0, 6).map(item => `<li><h4>${escapeHtml(item.title)}${item.importance === 'important' ? ' <span class="field-important" aria-label="Important">*</span>' : ''}</h4><small>${item.recoverable} checklist points currently missing</small><p>${escapeHtml(item.detail)}</p><p class="report-recommendation">${escapeHtml(item.action)}</p></li>`).join('')}</ol>` : '<p>No failed assessed checks. Verify factual accuracy, job requirements, and reading order manually.</p>'}<p class="subtle">These are checklist gaps, not promised employer-score gains. Reassess only after making accurate, relevant changes.</p></section>
            ${(report.revisions || []).length ? `<section class="report-section"><h3>Strengthen your evidence</h3>${report.revisions.map(item => `<article class="revision-example"><h4>From your CV</h4><blockquote>${escapeHtml(item.before)}</blockquote><h4>A stronger structure</h4><p>${escapeHtml(item.structure)}</p><p class="subtle">${escapeHtml(item.prompt)}</p></article>`).join('')}</section>` : ''}
            <section class="report-section"><h3>Field importance</h3><dl class="field-review">${plan.fields.map(item => `<div><dt>${escapeHtml(item.title)} ${item.importance === 'important' ? '<span class="field-important" aria-label="Important">*</span>' : '<span class="field-optional">Optional</span>'}</dt><dd><strong>${item.status === 'pass' ? 'Detected' : item.status === 'review' ? 'Needs attention' : 'Manual check'}</strong> / ${escapeHtml(item.detail)}</dd></div>`).join('')}</dl></section>
            <h3 class="small-heading">All scored checks</h3>
            <div class="report-checks">${report.checks.map(check => `<article class="report-check ${check.status}"><div><span class="check-marker">${icon(check.status === 'pass' ? 'check' : check.status === 'review' ? 'circle-alert' : 'minus')}</span><h3>${escapeHtml(check.title)}</h3><span>${check.points === null ? 'N/A' : check.points + '/' + check.maximum}</span></div><p>${escapeHtml(check.detail)}</p>${check.recommendation ? `<p class="report-recommendation">${escapeHtml(check.recommendation)}</p>` : ''}</article>`).join('')}</div>
            <section class="report-section"><h3>Job-description terms</h3><p class="subtle">Mentioned terms are not proof of proficiency. Include a requirement only when supported by your actual experience.</p><div class="keyword-group">${report.coverage.matched.map(term => `<span class="keyword">${escapeHtml(term)}</span>`).join('')}${report.coverage.missing.map(term => `<span class="keyword missing">${escapeHtml(term)} / not found</span>`).join('')}</div>${!report.coverage.assessed ? '<p>No job-specific terms were assessed.</p>' : ''}</section>
            <section class="report-section"><h3>${escapeHtml(company.name)} and role guidance</h3><p>${escapeHtml(report.guidance.role)}</p><p>${escapeHtml(report.guidance.company)}</p>${company.url ? `<a href="${company.url}" target="_blank" rel="noopener noreferrer">Official company guidance ${icon('arrow-up-right')}</a>` : ''}</section>
            ${report.warnings.length ? `<section class="report-section"><h3>Manual checks</h3><ul>${report.warnings.map(warning => `<li>${escapeHtml(warning)}</li>`).join('')}</ul></section>` : ''}
            <details class="report-method"><summary>Score calculation and receipt</summary><p>${escapeHtml(report.methodology)}</p><p>Payment reference: ${escapeHtml(record.receipt.paymentId)}</p><p>Access record: browser receipt. This site does not independently verify refunds in this mode.</p></details>`;
        icons();
    }

    element('chooseReviewFile').addEventListener('click', () => element('reviewFile').click());
    element('reviewFile').addEventListener('change', async event => {
        const file = event.target.files[0];
        if (!file || busy) return;
        setBusy(true);
        status('Reading the document locally...');
        try { applyInput(await importer.extract(file)); }
        catch (error) { invalidate(); status(error.message + ' No payment has started.'); }
        finally { setBusy(false); event.target.value = ''; }
    });
    element('useStudioCv').addEventListener('click', async () => {
        if (busy) return;
        if (isBlocked()) { status('Apply source changes and correct highlighted CV fields before reviewing the draft.'); return; }
        setBusy(true);
        status('Preparing a local document snapshot...');
        try {
            const current = getCurrent();
            const pdf = await getPdf(current);
            const extracted = await importer.extract(new File([pdf], 'Studio CV.pdf', { type: 'application/pdf' }));
            applyInput({ text: model.plainText(current), source: { ...extracted.source, kind: 'studio', name: current.title, columns: model.findTemplate(current.template).layout !== 'single', hasImages: Boolean(current.basics.photo && model.findTemplate(current.template).photo) } });
            element('reviewRole').value = current.role;
            element('reviewCompany').value = current.company;
        } catch (error) { status(error.message); }
        finally { setBusy(false); }
    });
    element('reviewText').addEventListener('input', () => {
        source = { kind: 'text', name: 'Pasted CV', pages: null, columns: null, hasImages: null, extractionWarnings: ['Text-only review cannot inspect the original document layout, images, headers, or page count.'] };
        element('reviewTextLabel').textContent = 'pasted text / layout unknown';
        element('reviewFileStatus').textContent = 'Pasted CV / original layout not assessed';
        invalidate();
    });
    for (const id of ['reviewRole', 'reviewCompany', 'reviewJob', 'reviewRequirements']) element(id).addEventListener(id.startsWith('review') && ['reviewRole', 'reviewCompany'].includes(id) ? 'change' : 'input', invalidate);
    element('atsForm').addEventListener('submit', async event => {
        event.preventDefault();
        if (busy || !element('reviewConsent').checked) return;
        const snapshot = inputSnapshot();
        const expectedRevision = revision;
        setBusy(true);
        try {
            const report = readiness.analyze(snapshot);
            if (!report.eligibleForPurchase) throw new Error('Sample details remain. Replace the template contact, employers, and qualifications with your own accurate details before purchasing a review.');
            const fingerprint = await readiness.fingerprint(snapshot);
            if (expectedRevision !== revision) return;
            prepared = { report, fingerprint, revision };
            client = billingApi.createDigitalClient({ productId: 'cv-readiness-v1', scope: fingerprint, publicKey: config.publicKey, storage, onPurchase });
            await client.init();
            element('reviewCheckout').hidden = false;
            element('reviewPreparedTitle').textContent = 'Readable CV / ready for review';
            element('reviewPreparedDetails').textContent = report.wordCount + ' words' + (report.source.pages ? ' / ' + report.source.pages + ' pages' : '') + (report.coverage.assessed ? ' / Target requirements supplied' : ' / General readiness only; no job alignment score');
            element('buyReview').innerHTML = icon(client.state.active ? 'file-check-2' : 'credit-card') + (client.state.active ? ' Open purchased report' : ' Purchase report / INR 9');
            status(client.state.active ? 'This exact CV and target already have a purchase receipt. No second payment is needed.' : 'Readability preflight passed. No payment has been made.');
            icons();
        } catch (error) { prepared = null; client = null; element('reviewCheckout').hidden = true; status(error.message); }
        finally { setBusy(false); }
    });
    element('buyReview').addEventListener('click', async () => {
        if (busy || !prepared || !client) return;
        const selected = prepared;
        if (selected.revision !== revision) { status('The CV changed. Prepare a fresh review before purchasing.'); return; }
        const email = element('reviewEmail');
        if (!client.state.active) {
            email.required = true;
            if (!email.reportValidity()) return;
        }
        setBusy(true);
        try {
            const receipt = client.state.active ? (await client.authorize(), client.accessReceipt()) : await billingApi.openCheckout(client, { email: email.value.trim(), onStatus: status });
            const record = { version: 1, fingerprint: selected.fingerprint, createdAt: new Date().toISOString(), receipt, report: selected.report };
            saveRecord(record);
            showReport(record);
            renderHistory();
            element('reviewCheckout').hidden = true;
            status('Report ready. Keep your private report backup and payment reference.');
        } catch (error) { status(error.message); }
        finally { setBusy(false); }
    });
    element('reviewReport').addEventListener('click', async event => {
        const button = event.target.closest('[data-report-export]');
        if (!button || !currentReport) return;
        const record = currentReport;
        button.disabled = true;
        try {
            if (button.dataset.reportExport === 'json') download(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' }), 'cv-readiness-report.json');
            else {
                const report = { ...record.report, references: readiness.references };
                const bytes = await new Promise((resolve, reject) => { try { window.pdfMake.createPdf(readiness.reportDefinition(report)).getBuffer(resolve); } catch (error) { reject(error); } });
                download(new Blob([bytes], { type: 'application/pdf' }), 'cv-readiness-report.pdf');
            }
        } catch (error) { status(error.message); }
        finally { button.disabled = false; }
    });
    element('reviewHistory').addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button || busy) return;
        if (button.dataset.report) {
            const record = reports.find(item => item.fingerprint === button.dataset.report);
            if (record) showReport(record);
        }
        if (button.dataset.deleteReport) {
            const fingerprint = button.dataset.deleteReport;
            reports = reports.filter(record => record.fingerprint !== fingerprint);
            if (!historyPaused) { try { storage?.setItem(historyKey, JSON.stringify(reports)); } catch { status('Report was removed for this visit only; storage is unavailable.'); } }
            renderHistory();
        }
    });
    element('restoreReview').addEventListener('click', () => element('reviewReportFile').click());
    element('reviewReportFile').addEventListener('change', async event => {
        const file = event.target.files[0];
        if (!file || busy) return;
        setBusy(true);
        try {
            if (file.size > 300000) throw new Error('This is not a supported report backup.');
            const record = JSON.parse(await file.text());
            if (!validRecord(record)) throw new Error('Choose a CV Studio review report backup with its matching purchase receipt.');
            const restored = billingApi.createDigitalClient({ productId: 'cv-readiness-v1', scope: record.fingerprint, publicKey: config.publicKey, storage });
            await restored.restoreAccess(record.receipt);
            billingApi.recordDigitalPurchase(record.receipt, {}, storage);
            saveRecord(record);
            showReport(record);
            renderHistory();
            status('Saved report restored. No payment requested.');
        } catch (error) { status(error.message); }
        finally { setBusy(false); event.target.value = ''; }
    });
    renderHistory();
    icons();
    return { useCurrent: () => element('useStudioCv').click(), isBusy: () => busy, getReport: () => currentReport ? JSON.parse(JSON.stringify(currentReport)) : null };
}