(function () {
    'use strict';
    const button = document.getElementById('exportProgress');
    if (!button) return;
    button.addEventListener('click', () => {
        const status = document.getElementById('exportStatus');
        try {
            const raw = localStorage.getItem('yas-question-progress-v1');
            const ids = raw === null ? [] : JSON.parse(raw);
            if (!Array.isArray(ids) || ids.length > 500 || !ids.every(id => typeof id === 'string' && /^(dsa|os|cn|system-design)-(00[1-9]|0[1-9][0-9]|1[01][0-9]|12[0-5])$/.test(id))) {
                throw new Error('Existing progress could not be read. It has not been changed or deleted.');
            }
            if (!ids.length) { status.textContent = 'No saved question checkmarks were found in this browser. Try the browser and device where you used the checklist.'; return; }
            const unique = [...new Set(ids)];
            const blob = new Blob([JSON.stringify({ version: 1, ids: unique }, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url; link.download = 'yasir-question-progress.json';
            document.body.append(link); link.click(); link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 30000);
            status.textContent = `Prepared ${unique.length} checkmarks for export. Import this JSON in your signed-in owner dashboard. The original browser marks are unchanged.`;
        } catch (error) {
            console.warn('Question progress export unavailable.', error.name);
            status.textContent = error.message || 'Browser storage is unavailable. Your existing data has not been overwritten.';
        }
    });
})();
