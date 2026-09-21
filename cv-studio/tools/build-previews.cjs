const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const model = require('../cv-model.js');
const exporter = require('../cv-export.js');
const pdfMake = require('../vendor/pdfmake.min.js');
const fontData = require('../vendor/fonts.js');

pdfMake.addVirtualFileSystem(fontData.vfs);
pdfMake.fonts = fontData.fonts;
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-studio-pdfs-'));
const previewDirectory = path.join(__dirname, '..', 'previews');
fs.mkdirSync(previewDirectory, { recursive: true });

function pdfBuffer(document) {
    return new Promise(resolve => pdfMake.createPdf(exporter.pdfDefinition(document)).getBuffer(resolve));
}

function pythonPath(filename) {
    return process.platform === 'win32' && !process.env.PYTHON_BIN ? filename.replace(/^([a-zA-Z]):/, (_, drive) => '/mnt/' + drive.toLowerCase()).replaceAll('\\', '/') : filename;
}

(async () => {
    const files = [];
    for (const template of model.templates) {
        const resume = model.applyTemplate(model.starter('backend'), template.id);
        const filename = path.join(scratch, template.id + '.pdf');
        fs.writeFileSync(filename, await pdfBuffer(resume));
        files.push({ id: template.id, file: pythonPath(filename), preview: pythonPath(path.join(previewDirectory, template.id + '.png')), expected: ['Alex Morgan', 'Reliable Task Service', 'Example Company'] });
    }
    for (const role of model.roles) {
        const resume = model.starter(role.id);
        const filename = path.join(scratch, 'role-' + role.id + '.pdf');
        fs.writeFileSync(filename, await pdfBuffer(resume));
        files.push({ id: 'role-' + role.id, file: pythonPath(filename), expected: ['Alex Morgan', role.project, role.experience] });
    }
    const long = model.starter('research');
    const projects = long.sections.find(section => section.kind === 'projects');
    projects.items = Array.from({ length: 14 }, (_, index) => ({ ...model.newItem(), heading: 'Research Project ' + (index + 1), subheading: 'Independent study', start: '2020', end: '2024', bullets: ['Implemented a reproducible experiment with a documented baseline, synthetic dataset, and independent validation checks.', 'Reviewed alternative approaches and reported quality, latency, resource consumption, and the limits of the evaluation.', 'Documented the research question, experimental method, failure cases, and follow-up work in an inspectable report.'] }));
    const longFile = path.join(scratch, 'long-cv.pdf');
    fs.writeFileSync(longFile, await pdfBuffer(long));
    files.push({ id: 'long-cv', file: pythonPath(longFile), expected: ['Research Project 1', 'Research Project 14'], multiplePages: true });
    const script = `import json,sys,fitz
results=[]
for item in json.load(sys.stdin):
    document=fitz.open(item["file"])
    text="\\n".join(page.get_text() for page in document)
    for expected in item["expected"]:
        assert expected in text, item["id"]+": missing "+expected
    assert len(document)>=1, item["id"]
    if item.get("multiplePages"):
        assert len(document)>1, "Long CV did not paginate"
    for page in document:
        assert len(page.get_text().strip())>10, item["id"]+": blank page"
        for word in page.get_text("words"):
            assert word[0]>=20 and word[2]<=page.rect.width-18, item["id"]+": horizontal overflow"
            assert word[1]>=15 and word[3]<=page.rect.height-12, item["id"]+": vertical overflow"
    if item.get("preview"):
        document[0].get_pixmap(matrix=fitz.Matrix(0.45,0.45),alpha=False).save(item["preview"])
    results.append({"id":item["id"],"pages":len(document),"words":len(text.split())})
print(json.dumps(results))`;
    const windows = process.platform === 'win32' && !process.env.PYTHON_BIN;
    const result = spawnSync(process.env.PYTHON_BIN || (windows ? 'wsl.exe' : 'python3'), windows ? ['--exec', 'python3', '-c', script] : ['-c', script], { input: JSON.stringify(files), encoding: 'utf8', timeout: 60000 });
    if (result.status !== 0) throw new Error(result.stderr || String(result.error));
    const report = JSON.parse(result.stdout);
    console.log('PASS: ' + report.length + ' real PDFs verified for selectable text, pagination, and page bounds; 16 template previews generated.');
    console.log('PDF_REVIEW_DIRECTORY=' + scratch);
    console.log(JSON.stringify(report.filter(item => item.pages > 1)));
})().catch(error => { console.error(error); process.exitCode = 1; });