const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const model = require('../blueprint-model.js');
const fontData = require('../../cv-studio/vendor/fonts.js');
const { adaptGuides } = require('./adapt-guides.cjs');

const root = path.join(__dirname, '..');
const windows = process.platform === 'win32' && !process.env.PYTHON_BIN;
const pythonPath = filename => windows ? filename.replace(/^([a-zA-Z]):/, (_, drive) => '/mnt/' + drive.toLowerCase()).replaceAll('\\', '/') : filename;
const topics = fs.readdirSync(path.join(root, 'content')).filter(name => name.endsWith('.json') && !name.startsWith('generated-')).sort().flatMap(name => JSON.parse(fs.readFileSync(path.join(root, 'content', name), 'utf8')));
const guidesRoot = path.join(root, '..', 'guides', 'content');
const guides = fs.readdirSync(guidesRoot).filter(name => name.endsWith('.json')).sort().flatMap(name => JSON.parse(fs.readFileSync(path.join(guidesRoot, name), 'utf8')));
const adapted = adaptGuides(guides);
topics.push(...adapted);
const expected = process.argv.includes('--expect-500') ? 500 : null;
const posts = model.expandTopics(topics);
if (expected && posts.length !== expected) throw new Error('Expected 500 templates, found ' + posts.length);
fs.writeFileSync(path.join(root, 'content', 'generated-guides.json'), JSON.stringify(adapted, null, 2) + '\n');
if (process.argv.includes('--check-only')) {
    console.log('PASS: ' + topics.length + ' topics / ' + posts.length + ' distinct templates validated.');
    process.exit(0);
}
const payload = {
    root: pythonPath(root), posts: posts.map(post => ({ ...post, markdown: model.markdown(post) })),
    fonts: { regular: fontData.vfs[fontData.fonts.Lato.normal], bold: fontData.vfs[fontData.fonts.Lato.bold] },
    fontLicense: fs.readFileSync(path.join(root, '..', 'cv-studio', 'vendor', 'OFL-Lato.txt'), 'utf8')
};
const result = spawnSync(process.env.PYTHON_BIN || (windows ? 'wsl.exe' : 'python3'), [...(windows ? ['--exec', 'python3'] : []), pythonPath(path.join(__dirname, 'render.py'))], { input: JSON.stringify(payload), encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 600000 });
if (result.stdout) process.stdout.write(result.stdout);
if (result.status !== 0) { if (result.stderr) process.stderr.write(result.stderr); process.exitCode = 1; }