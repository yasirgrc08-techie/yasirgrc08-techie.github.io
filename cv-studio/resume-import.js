(function (root, factory) {
    const api = factory();
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvImport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    const maximumBytes = 5 * 1024 * 1024;

    function inspectFile(file) {
        if (!file || typeof file.name !== 'string' || !Number.isFinite(file.size) || file.size <= 0) throw new Error('Choose a nonempty PDF, DOCX, or TXT file.');
        if (file.size > maximumBytes) throw new Error('Choose a CV smaller than 5 MB. Compress images or export a text-based PDF.');
        const extension = file.name.toLowerCase().split('.').pop();
        if (!['pdf', 'docx', 'txt'].includes(extension)) throw new Error('Supported uploads are PDF, DOCX, and TXT. Export older DOC files as DOCX or paste the text.');
        return { kind: extension === 'txt' ? 'text' : extension, name: file.name.slice(0, 160), bytes: file.size };
    }

    function inspectDocx(input) {
        const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        if (bytes.length < 22 || view.getUint32(0, true) !== 0x04034b50) throw new Error('This is not a valid DOCX ZIP package.');
        let directoryEnd = -1;
        for (let offset = bytes.length - 22; offset >= Math.max(0, bytes.length - 65557); offset--) {
            if (view.getUint32(offset, true) === 0x06054b50 && offset + 22 + view.getUint16(offset + 20, true) === bytes.length) { directoryEnd = offset; break; }
        }
        if (directoryEnd < 0) throw new Error('The DOCX package is incomplete or unsupported.');
        const count = view.getUint16(directoryEnd + 10, true);
        const size = view.getUint32(directoryEnd + 12, true);
        const start = view.getUint32(directoryEnd + 16, true);
        if (view.getUint16(directoryEnd + 4, true) || view.getUint16(directoryEnd + 6, true) || count > 500 || start + size > directoryEnd) throw new Error('The DOCX archive is too complex or uses an unsupported ZIP format.');
        const files = [];
        const paths = new Set();
        let offset = start;
        let expanded = 0;
        for (let index = 0; index < count; index++) {
            if (offset + 46 > directoryEnd || view.getUint32(offset, true) !== 0x02014b50) throw new Error('Invalid DOCX archive directory.');
            const flags = view.getUint16(offset + 8, true);
            const method = view.getUint16(offset + 10, true);
            const compressedSize = view.getUint32(offset + 20, true);
            const originalSize = view.getUint32(offset + 24, true);
            const nameLength = view.getUint16(offset + 28, true);
            const extraLength = view.getUint16(offset + 30, true);
            const commentLength = view.getUint16(offset + 32, true);
            const localOffset = view.getUint32(offset + 42, true);
            const nextOffset = offset + 46 + nameLength + extraLength + commentLength;
            if (nextOffset > start + size || flags & 1 || ![0, 8].includes(method) || localOffset + 30 > start) throw new Error('Encrypted or unsupported DOCX content.');
            const name = new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
            if (paths.has(name) || name.includes('\\') || name.startsWith('/') || name.split('/').includes('..')) throw new Error('Unsafe or duplicate DOCX package path.');
            paths.add(name);
            expanded += originalSize;
            if (expanded > 20 * 1024 * 1024 || originalSize > 8 * 1024 * 1024 || originalSize / Math.max(1, compressedSize) > 300) throw new Error('The DOCX archive expands beyond the safe review limit.');
            if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error('Invalid DOCX entry.');
            const dataOffset = localOffset + 30 + view.getUint16(localOffset + 26, true) + view.getUint16(localOffset + 28, true);
            if (dataOffset + compressedSize > start) throw new Error('Invalid DOCX entry size.');
            if (!(flags & 8) && (view.getUint32(localOffset + 18, true) !== compressedSize || view.getUint32(localOffset + 22, true) !== originalSize)) throw new Error('Inconsistent DOCX entry sizes.');
            files.push({ name, bytes: originalSize });
            offset = nextOffset;
        }
        if (!paths.has('[Content_Types].xml') || !paths.has('word/document.xml')) throw new Error('The file does not contain a Word document.');
        if ([...paths].some(name => /vbaProject|word\/embeddings\//i.test(name))) throw new Error('Embedded executable or macro content is not supported. Export a plain DOCX or PDF.');
        return { files, expandedBytes: expanded, hasImages: files.some(file => file.name.startsWith('word/media/')), hasHeaders: files.some(file => /^word\/(header|footer)\d+\.xml$/.test(file.name)) };
    }

    async function extract(file, workerUrl = 'resume-import.worker.js') {
        const source = inspectFile(file);
        const buffer = await file.arrayBuffer();
        if (buffer.byteLength !== file.size) throw new Error('The file could not be read completely.');
        if (source.kind === 'text') return { text: new TextDecoder('utf-8', { fatal: true }).decode(buffer), source: { ...source, pages: null, columns: null, hasImages: null, extractionWarnings: ['Pasted or plain text does not expose the original page layout, photos, or headers.'] } };
        if (source.kind === 'docx') inspectDocx(buffer);
        return new Promise((resolve, reject) => {
            const worker = new Worker(workerUrl);
            const timer = setTimeout(() => { worker.terminate(); reject(new Error('The document took too long to parse. Export a simpler text-based PDF or paste its text. No payment has started.')); }, 20000);
            const finish = () => { clearTimeout(timer); worker.terminate(); };
            worker.onmessage = event => {
                if (event.data?.type !== 'cv-import-result') return;
                finish();
                if (event.data.error) reject(new Error(event.data.error));
                else resolve(event.data.result);
            };
            worker.onerror = () => { finish(); reject(new Error('The local document parser could not read this file. Try a text-based PDF or pasted text.')); };
            worker.postMessage({ type: 'cv-import', source, buffer }, [buffer]);
        });
    }

    return { maximumBytes, inspectFile, inspectDocx, extract };
});