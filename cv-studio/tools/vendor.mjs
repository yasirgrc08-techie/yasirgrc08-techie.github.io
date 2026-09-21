import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'vendor');
await mkdir(root, { recursive: true });
const manifest = [];

async function download(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error(response.status + ' downloading ' + url);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 100) throw new Error('Unexpectedly short dependency: ' + url);
    manifest.push({ url, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
    return bytes;
}

const files = [
    ['pdfmake.min.js', 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.20/build/pdfmake.min.js'],
    ['pdf.mjs', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs'],
    ['pdf.worker.mjs', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs'],
    ['lucide.min.js', 'https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js'],
    ['LICENSE-pdfmake.txt', 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.20/LICENSE'],
    ['LICENSE-pdfjs.txt', 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/LICENSE'],
    ['LICENSE-lucide.txt', 'https://cdn.jsdelivr.net/npm/lucide@0.468.0/LICENSE'],
    ['OFL-Lato.txt', 'https://raw.githubusercontent.com/google/fonts/main/ofl/lato/OFL.txt'],
    ['OFL-PlexSerif.txt', 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexserif/OFL.txt']
];

for (const [filename, url] of files) {
    await writeFile(join(root, filename), await download(url));
    console.log('Vendored ' + filename);
}

const vfs = {};
const fonts = {};
for (const [family, directory, prefix] of [['Lato', 'lato', 'Lato'], ['PlexSerif', 'ibmplexserif', 'IBMPlexSerif']]) {
    fonts[family] = {};
    for (const [weight, suffix] of [['normal', 'Regular'], ['bold', 'Bold'], ['italics', 'Italic'], ['bolditalics', 'BoldItalic']]) {
        const filename = prefix + '-' + suffix + '.ttf';
        vfs[filename] = (await download('https://raw.githubusercontent.com/google/fonts/main/ofl/' + directory + '/' + filename)).toString('base64');
        fonts[family][weight] = filename;
    }
}
const generated = '(function(root){const vfs=' + JSON.stringify(vfs) + ';const fonts=' + JSON.stringify(fonts) + ';if(typeof module!=="undefined"&&module.exports){module.exports={vfs,fonts};}else{root.CV_FONT_DATA={vfs,fonts};root.pdfMake.addVirtualFileSystem(vfs);root.pdfMake.fonts=fonts;}})(typeof globalThis!=="undefined"?globalThis:this);\n';
await writeFile(join(root, 'fonts.js'), generated);
await writeFile(join(root, 'manifest.json'), JSON.stringify({ libraries: { pdfmake: '0.2.20', pdfjs: '4.10.38', lucide: '0.468.0' }, assets: manifest }, null, 2) + '\n');
console.log('PASS: PDF engines, icon library, 8 local font faces, and licenses vendored.');