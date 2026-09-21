importScripts('resume-import.js');

self.addEventListener('message', async event => {
    if (event.data?.type !== 'cv-import') return;
    try {
        const { source, buffer } = event.data;
        let text = '';
        const extractionWarnings = [];
        let pages = null;
        let columns = null;
        let hasImages = false;
        let headerContact = false;
        if (source.kind === 'docx') {
            const archive = self.CvImport.inspectDocx(buffer);
            importScripts('vendor/mammoth.browser.min.js');
            const result = await self.mammoth.extractRawText({ arrayBuffer: buffer });
            text = result.value;
            hasImages = archive.hasImages;
            if (archive.hasHeaders) extractionWarnings.push('The DOCX has header or footer parts. Their contents may not appear in extracted body text.');
            extractionWarnings.push('DOCX page count and visual column layout are not measured. Check the extracted text against the original file.');
            if (result.messages.length) extractionWarnings.push('The Word parser returned ' + result.messages.length + ' conversion notices; verify the extracted text.');
        } else {
            const bytes = new Uint8Array(buffer);
            if (!new TextDecoder().decode(bytes.subarray(0, 1024)).includes('%PDF-')) throw new Error('The file is not a recognizable PDF.');
            const pdfjs = await import('./vendor/pdf.mjs');
            const engine = await import('./vendor/pdf.worker.mjs');
            self.pdfjsWorker = engine;
            const document = await pdfjs.getDocument({ data: bytes, isEvalSupported: false, useSystemFonts: false, disableFontFace: true, disableAutoFetch: true }).promise;
            try {
                pages = document.numPages;
                if (pages > 12) throw new Error('Review supports CVs up to 12 pages. Upload a focused application version.');
                const parts = [];
                let columnSignals = 0;
                for (let pageIndex = 1; pageIndex <= pages; pageIndex++) {
                    const page = await document.getPage(pageIndex);
                    const viewport = page.getViewport({ scale: 1 });
                    const content = await page.getTextContent();
                    if (content.items.length > 15000) throw new Error('The PDF text layout is too complex for a reliable local review.');
                    const rows = new Map();
                    let previousY = null;
                    let pageText = '';
                    for (const item of content.items) {
                        if (!('str' in item)) continue;
                        const vertical = Math.round(item.transform[5]);
                        if (previousY !== null && Math.abs(vertical - previousY) > 4) pageText += '\n';
                        pageText += item.str + (item.hasEOL ? '\n' : ' ');
                        previousY = vertical;
                        const rowKey = Math.round(vertical / 4);
                        if (!rows.has(rowKey)) rows.set(rowKey, []);
                        if (item.str.trim()) rows.get(rowKey).push({ start: item.transform[4], end: item.transform[4] + item.width, text: item.str });
                        if (item.str.includes('@') && (vertical < 28 || vertical > viewport.height - 28)) headerContact = true;
                    }
                    for (const row of rows.values()) {
                        row.sort((left, right) => left.start - right.start);
                        for (let index = 1; index < row.length; index++) {
                            const gap = row[index].start - row[index - 1].end;
                            const right = row.slice(index).map(item => item.text).join(' ');
                            const left = row.slice(0, index).map(item => item.text).join(' ');
                            if (gap > 22 && row[index].start > viewport.width * 0.32 && row[index - 1].end < viewport.width * 0.76 && /[A-Za-z]{3}/.test(left) && /[A-Za-z]{3}/.test(right) && !/^(?:\d|Jan |Feb |Mar |Apr |May |Jun |Jul |Aug |Sep |Oct |Nov |Dec |Present\b)/i.test(right.trim())) columnSignals++;
                        }
                    }
                    const operators = await page.getOperatorList();
                    if (operators.fnArray.some(operation => [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintInlineImageXObject, pdfjs.OPS.paintImageMaskXObject].includes(operation))) hasImages = true;
                    if (pageText.trim().split(/\s+/).length < 10) extractionWarnings.push('Page ' + pageIndex + ' contains very little extractable text. It may be scanned or contain graphics.');
                    parts.push(pageText);
                    if (parts.reduce((total, part) => total + part.length, 0) > 75000) throw new Error('The extracted CV exceeds the review text limit.');
                    page.cleanup();
                }
                columns = columnSignals >= 6;
                text = parts.join('\n\n');
                extractionWarnings.push('PDF column detection is heuristic. Compare the extracted reading order with the original PDF.');
            } finally { await document.destroy(); }
        }
        if (text.length > 75000) throw new Error('The extracted CV exceeds the 75,000-character review limit.');
        self.postMessage({ type: 'cv-import-result', result: { text, source: { ...source, pages, columns, hasImages, headerContact, extractionWarnings } } });
    } catch (error) {
        const message = error.name === 'PasswordException' ? 'Password-protected PDFs are not supported. Unlock a copy locally before uploading; do not share the password.' : error.message || 'The file could not be parsed.';
        self.postMessage({ type: 'cv-import-result', error: message });
    }
});