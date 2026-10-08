const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const model = require('../cv-model.js');
const exporter = require('../cv-export.js');
const readiness = require('../ats-review.js');
const zip = require('../vendor/fflate.min.js');
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
    const texFiles = [];
    const portraitFile = path.join(previewDirectory, 'sample-portrait.jpg');
    const sourcePhoto = path.join(__dirname, '..', '..', 'images', 'personal', 'yasir_microsoft_window.jpeg');
    const windows = process.platform === 'win32' && !process.env.PYTHON_BIN;
    const photoScript = 'import fitz,sys\nimage=fitz.open(sys.argv[1])\npage=image[0]\nwidth,height=page.rect.width,page.rect.height\npage.get_pixmap(matrix=fitz.Matrix(1.4,1.4),clip=fitz.Rect(width*.56,height*.035,width*.91,height*.37),alpha=False).save(sys.argv[2])';
    const photoResult = spawnSync(process.env.PYTHON_BIN || (windows ? 'wsl.exe' : 'python3'), [...(windows ? ['--exec', 'python3'] : []), '-c', photoScript, pythonPath(sourcePhoto), pythonPath(portraitFile)], { encoding: 'utf8', timeout: 30000 });
    if (photoResult.status !== 0) throw new Error(photoResult.stderr || 'Sample portrait generation failed.');
    const portrait = 'data:image/jpeg;base64,' + fs.readFileSync(portraitFile).toString('base64');
    for (const template of model.templates) {
        const resume = model.starterForTemplate(template.id);
        if (template.photo) resume.basics.photo = portrait;
        const filename = path.join(scratch, template.id + '.pdf');
        fs.writeFileSync(filename, await pdfBuffer(resume));
        files.push({ id: template.id, file: pythonPath(filename), preview: pythonPath(path.join(previewDirectory, template.id + '.png')), hasPhoto: Boolean(template.photo), expected: ['Yasir Sharfi', model.findRole(resume.role).project, model.findRole(resume.role).experience] });
        if (['classic', 'research', 'photo-graduate', 'bajaj-clean'].includes(template.id)) {
            const projectDirectory = path.join(scratch, 'project-' + template.id);
            fs.mkdirSync(projectDirectory, { recursive: true });
            const project = exporter.projectFiles(resume);
            for (const [name, data] of Object.entries(project)) fs.writeFileSync(path.join(projectDirectory, name), data);
            const archive = zip.zipSync(Object.fromEntries(Object.entries(project).map(([name, data]) => [name, typeof data === 'string' ? zip.strToU8(data) : data])));
            const unpacked = zip.unzipSync(archive);
            if (zip.strFromU8(unpacked['resume.tex']) !== exporter.latex(resume)) throw new Error('Template archive did not preserve the source.');
            texFiles.push({ id: template.id, directory: projectDirectory, file: path.join(projectDirectory, 'resume.tex') });
        }
    }
    for (const role of model.roles) {
        const resume = model.starter(role.id);
        const filename = path.join(scratch, 'role-' + role.id + '.pdf');
        fs.writeFileSync(filename, await pdfBuffer(resume));
        files.push({ id: 'role-' + role.id, file: pythonPath(filename), expected: ['Yasir Sharfi', role.project, role.experience] });
    }
    const long = model.starter('research');
    const projects = long.sections.find(section => section.kind === 'projects');
    projects.items = Array.from({ length: 14 }, (_, index) => ({ ...model.newItem(), heading: 'Research Project ' + (index + 1), subheading: 'Independent study', start: '2020', end: '2024', bullets: ['Implemented a reproducible experiment with a documented baseline, synthetic dataset, and independent validation checks.', 'Reviewed alternative approaches and reported quality, latency, resource consumption, and the limits of the evaluation.', 'Documented the research question, experimental method, failure cases, and follow-up work in an inspectable report.'] }));
    const longFile = path.join(scratch, 'long-cv.pdf');
    fs.writeFileSync(longFile, await pdfBuffer(long));
    files.push({ id: 'long-cv', file: pythonPath(longFile), expected: ['Research Project 1', 'Research Project 14'], multiplePages: true });
    const reviewInput = model.plainText(model.starter('backend')).replaceAll('Sample Product Co.', 'Northstar Labs Ltd.').replaceAll('Sample Institute of Technology', 'City Technical University').replaceAll('example.com', 'candidate.test');
    for (const [id, options] of [['readiness-targeted', { jobText: 'Python and PostgreSQL APIs with testing and Kubernetes for reliable software delivery.', source: { kind: 'pdf', bytes: 45000, pages: 1, columns: false, hasImages: false } }], ['readiness-general', { source: { kind: 'text' } }]]) {
        const report = readiness.analyze({ text: reviewInput, role: 'backend', company: 'microsoft', ...options });
        const filename = path.join(scratch, id + '.pdf');
        const bytes = await new Promise(resolve => pdfMake.createPdf(readiness.reportDefinition(report)).getBuffer(resolve));
        fs.writeFileSync(filename, bytes);
        files.push({ id, file: pythonPath(filename), expected: ['CV Readiness Review', 'Readiness checklist score', 'Contact email present'] });
    }
    if (process.env.CV_TECTONIC) {
        for (const project of texFiles) {
            const result = spawnSync(process.env.CV_TECTONIC, ['--keep-logs', '--outdir', project.directory, project.file], { cwd: project.directory, encoding: 'utf8', timeout: 180000 });
            if (result.status !== 0) throw new Error('TeX compilation failed for ' + project.id + ':\n' + result.stdout + '\n' + result.stderr);
            files.push({ id: 'tex-' + project.id, file: pythonPath(path.join(project.directory, 'resume.pdf')), expected: ['Yasir Sharfi'] });
        }
        console.log('PASS: ' + texFiles.length + ' representative XeTeX source projects compiled.');
    }
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
    if item.get("hasPhoto"):
        assert any(page.get_images() for page in document), item["id"]+": missing photo"
    for page in document:
        assert len(page.get_text().strip())>10, item["id"]+": blank page"
        for word in page.get_text("words"):
            assert word[0]>=20 and word[2]<=page.rect.width-18, item["id"]+": horizontal overflow"
            assert word[1]>=15 and word[3]<=page.rect.height-12, item["id"]+": vertical overflow"
    if item.get("preview"):
        document[0].get_pixmap(matrix=fitz.Matrix(0.45,0.45),alpha=False).save(item["preview"])
    results.append({"id":item["id"],"pages":len(document),"words":len(text.split())})
print(json.dumps(results))`;
    const result = spawnSync(process.env.PYTHON_BIN || (windows ? 'wsl.exe' : 'python3'), windows ? ['--exec', 'python3', '-c', script] : ['-c', script], { input: JSON.stringify(files), encoding: 'utf8', timeout: 60000 });
    if (result.status !== 0) throw new Error(result.stderr || String(result.error));
    const report = JSON.parse(result.stdout);
    console.log('PASS: ' + report.length + ' real PDFs verified for selectable text, pagination, and page bounds; ' + model.templates.length + ' template previews generated.');
    console.log('PDF_REVIEW_DIRECTORY=' + scratch);
    console.log(JSON.stringify(report.filter(item => item.pages > 1)));
})().catch(error => { console.error(error); process.exitCode = 1; });