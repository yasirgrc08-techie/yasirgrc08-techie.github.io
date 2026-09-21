(function (root, factory) {
    const api = factory(typeof module !== 'undefined' && module.exports ? require('./cv-model.js') : root.CvModel, typeof module !== 'undefined' && module.exports ? require('./vendor/template-sources.js') : root.CV_TEMPLATE_SOURCES);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvExport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (model, templateSources) {
    'use strict';

    function pdfDefinition(input, options = {}) {
        const resume = model.normalizeResume(input);
        const template = model.findTemplate(resume.template);
        const settings = resume.settings;
        const accent = settings.accent;
        const gap = { compact: 6, regular: 9, airy: 13 }[settings.spacing];
        const linkText = (value, label) => {
            const link = model.safeLink(value);
            return { text: label || value, ...(link ? { link, color: accent } : {}) };
        };
        const contacts = [];
        const addContact = item => { if (contacts.length) contacts.push({ text: '  |  ', color: '#65716d' }); contacts.push(item); };
        if (resume.basics.email) addContact({ text: resume.basics.email, ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.basics.email) ? { link: 'mailto:' + resume.basics.email } : {}) });
        for (const field of ['phone', 'location']) if (resume.basics[field]) addContact({ text: resume.basics[field] });
        for (const field of ['website', 'linkedin', 'github']) if (resume.basics[field]) addContact(linkText(resume.basics[field]));
        const header = [
            { text: resume.basics.name || 'Your Name', fontSize: template.id === 'compact' ? 23 : 28, bold: true, color: '#172d27', alignment: template.header, margin: [0, 0, 0, 4] },
            ...(resume.basics.headline ? [{ text: resume.basics.headline, fontSize: settings.fontSize + 1, color: accent, alignment: template.header, margin: [0, 0, 0, 5] }] : []),
            ...(contacts.length ? [{ text: contacts, fontSize: Math.max(8, settings.fontSize - 1), alignment: template.header, margin: [0, 0, 0, gap + 2] }] : [])
        ];
        const content = [];
        if (template.photo && resume.basics.photo) {
            const photo = { image: resume.basics.photo, fit: [68, 88], width: 68, margin: [0, 0, 0, 8] };
            const identity = { stack: header, width: '*' };
            content.push({ columns: template.photo === 'left' ? [photo, identity] : [identity, photo], columnGap: 18 });
        } else if (template.source === 'bajaj') {
            content.push({ columns: [{ stack: header.slice(0, resume.basics.headline ? 2 : 1), width: '*' }, { text: contacts, fontSize: 9, width: 210, alignment: 'right' }], columnGap: 14 });
        } else content.push(...header);
        if (template.nameRule) content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: (settings.paper === 'A4' ? 595.28 : 612) - settings.margins * 2, y2: 0, lineWidth: 1.5, lineColor: accent }], margin: [0, 2, 0, 5] });

        function sectionHeading(section) {
            const heading = { text: template.heading === 'label' ? section.title.toUpperCase() : section.title, bold: true, fontSize: settings.fontSize + 1, color: accent, headlineLevel: 1, margin: [0, gap + 3, 0, 5] };
            if (template.heading === 'band') return { ...heading, background: '#eaf0ed' };
            if (template.heading === 'rule') return { stack: [{ ...heading, margin: [0, 0, 0, 2] }, { canvas: [{ type: 'line', x1: 0, y1: 0, x2: template.layout === 'single' ? (settings.paper === 'A4' ? 595.28 : 612) - settings.margins * 2 : 100, y2: 0, lineWidth: 0.5, lineColor: accent }] }], headlineLevel: 1, margin: [0, gap + 3, 0, 5] };
            return heading;
        }

        function sectionNodes(section) {
            const nodes = [];
            const items = section.items.filter(item => item.heading || item.subheading || item.bullets.some(Boolean));
            if (!section.content.trim() && !items.length) return nodes;
            nodes.push(sectionHeading(section));
            if (section.content.trim()) nodes.push({ text: section.content, margin: [0, 0, 0, 3] });
            items.forEach((item, index) => {
                const dates = [item.start, item.end].filter(Boolean).join(' - ');
                nodes.push({ columns: [{ text: item.heading, bold: true, width: '*', ...(model.safeLink(item.url) ? { link: model.safeLink(item.url) } : {}) }, ...(dates ? [{ text: dates, width: 'auto', alignment: 'right', color: '#42594e', fontSize: settings.fontSize - 0.5 }] : [])], columnGap: 10, headlineLevel: 2, margin: [0, index ? gap : 1, 0, 2] });
                const detail = [item.subheading, item.location].filter(Boolean).join(' | ');
                if (detail) nodes.push({ text: detail, italics: true, color: '#42594e', margin: [0, 0, 0, 3] });
                if (item.url) nodes.push({ ...linkText(item.url), fontSize: Math.max(8, settings.fontSize - 1), margin: [0, 0, 0, 3] });
                const bullets = item.bullets.filter(bullet => bullet.trim());
                if (bullets.length) nodes.push({ ul: bullets.map(bullet => ({ text: bullet, margin: [0, 0, 0, settings.spacing === 'compact' ? 2 : 4] })), margin: [10, 0, 0, 1] });
            });
            return nodes;
        }

        const sections = resume.sections.filter(section => section.visible);
        if (template.layout === 'single') content.push(...sections.flatMap(sectionNodes));
        else {
            const sideKinds = ['skills', 'education', 'certifications', 'languages'];
            const side = sections.filter(section => sideKinds.includes(section.kind)).flatMap(sectionNodes);
            const main = sections.filter(section => !sideKinds.includes(section.kind)).flatMap(sectionNodes);
            if (side.length && main.length) {
                const sideColumn = { width: 145, stack: side };
                const mainColumn = { width: '*', stack: main };
                if (template.layout === 'sidebar') content.push({ table: { widths: [145, '*'], body: [[{ stack: side, fillColor: '#edf4f0', margin: [8, 2, 8, 8] }, { stack: main, margin: [14, 0, 0, 0] }]] }, layout: { hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 } });
                else content.push({ columns: template.sideRight ? [mainColumn, sideColumn] : [sideColumn, mainColumn], columnGap: 24 });
            }
            else content.push(...sections.flatMap(sectionNodes));
        }
        if (content.length === 1) content.push({ text: ' ', margin: [0, 4, 0, 0] });
        return {
            info: { title: resume.title, author: resume.basics.name, subject: 'Curriculum vitae' },
            pageSize: settings.paper, pageMargins: [settings.margins, settings.margins, settings.margins, settings.margins],
            defaultStyle: { font: settings.font, fontSize: settings.fontSize, lineHeight: settings.spacing === 'compact' ? 1.08 : 1.17, color: '#25382f' },
            content,
            footer: settings.pageNumbers ? (pageNumber, pageCount) => ({ text: pageNumber + ' / ' + pageCount, alignment: 'center', font: settings.font, fontSize: 8, color: '#5d7168', margin: [0, 12, 0, 0] }) : undefined,
            watermark: options.watermark ? { text: 'PREVIEW', color: '#718c81', opacity: 0.07, bold: true, fontSize: 65, angle: -35 } : undefined,
            pageBreakBefore: (current, following, next, previous) => Boolean(current.headlineLevel && !following.length && previous.length && next.length)
        };
    }

    function escapeTex(value) {
        return String(value).replace(/[\\{}$&%#_~^]/g, character => ({ '\\': '\\textbackslash{}', '{': '\\{', '}': '\\}', '$': '\\$', '&': '\\&', '%': '\\%', '#': '\\#', '_': '\\_', '~': '\\textasciitilde{}', '^': '\\textasciicircum{}' }[character]));
    }

        function communityLatex(resume) {
            const source = templateSources?.bajaj;
            if (!source) throw new Error('The licensed template source could not load. Reload the studio before exporting.');
            const escaped = value => escapeTex(value).replace(/\r?\n/g, '\\\\ ');
            const preamble = source.preamble
                .replace('\\documentclass[letterpaper,11pt]{article}', '\\documentclass[' + (resume.settings.paper === 'LETTER' ? 'letterpaper' : 'a4paper') + ',11pt]{article}')
                .replace('\\input{glyphtounicode}', '\\usepackage{fontspec}\n\\setmainfont{TeX Gyre Pagella}')
                .replace('\\pdfgentounicode=1', '');
            const lines = [preamble, ...source.license.split(/\r?\n/).map(line => '% ' + line), '% CV Studio adaptation: Unicode font setup, selected paper size, and user-authored document content.', '\\begin{document}',
                '\\resumeHeading{' + escaped(resume.basics.name || 'Your Name') + '}{' + escaped(resume.basics.email) + '}{' + escaped(resume.basics.headline) + '}{' + escaped(resume.basics.location) + '}'];
            const otherContacts = ['phone', 'website', 'linkedin', 'github'].map(field => resume.basics[field]).filter(Boolean);
            if (otherContacts.length) lines.push('\\vspace{6pt}{\\small ' + otherContacts.map(escaped).join(' \\textbar{} ') + '}\\par');
            for (const section of resume.sections.filter(section => section.visible)) {
                const items = section.items.filter(item => item.heading || item.subheading || item.bullets.some(Boolean));
                if (!section.content.trim() && !items.length) continue;
                lines.push('\\section{' + escaped(section.title) + '}');
                if (section.content) lines.push(escaped(section.content) + '\\par');
                for (const item of items) {
                    lines.push('\\resumeHeading{' + escaped(item.heading) + '}{' + escaped([item.start, item.end].filter(Boolean).join(' -- ')) + '}{' + escaped(item.subheading) + '}{' + escaped(item.location) + '}');
                    if (item.url) lines.push('\\vspace{4pt}{\\small ' + escaped(item.url) + '}\\par');
                    const bullets = item.bullets.filter(bullet => bullet.trim());
                    if (bullets.length) lines.push('\\resumeItemListStart', ...bullets.map(bullet => '\\resumeItemPlain{' + escaped(bullet) + '}'), '\\resumeItemListEnd');
                }
            }
            lines.push('\\end{document}');
            return lines.join('\n') + '\n';
        }

    function latex(input) {
        const resume = model.normalizeResume(input);
        if (model.findTemplate(resume.template).source === 'bajaj') return communityLatex(resume);
        const escaped = value => escapeTex(value).replace(/\r?\n/g, '\\\\ ');
        const lines = [
            '\\documentclass[' + resume.settings.fontSize + 'pt,' + (resume.settings.paper === 'LETTER' ? 'letterpaper' : 'a4paper') + ']{article}',
            '\\usepackage[margin=' + (resume.settings.margins / 72).toFixed(3) + 'in]{geometry}',
            '\\usepackage{fontspec}',
            '\\setmainfont{' + (resume.settings.font === 'PlexSerif' ? 'TeX Gyre Pagella' : 'TeX Gyre Heros') + '}',
            '\\usepackage{xcolor}',
            '\\usepackage{graphicx}',
            '\\definecolor{accent}{HTML}{' + resume.settings.accent.slice(1) + '}',
            '\\usepackage{enumitem}',
            '\\usepackage[hidelinks]{hyperref}',
            '\\setlength{\\parindent}{0pt}',
            '\\setlength{\\parskip}{4pt}',
            '\\setlist[itemize]{leftmargin=*,itemsep=2pt,topsep=3pt}',
            resume.settings.pageNumbers ? '\\pagestyle{plain}' : '\\pagestyle{empty}',
            '\\begin{document}',
            ...(resume.basics.photo && model.findTemplate(resume.template).photo ? ['\\IfFileExists{portrait.' + (resume.basics.photo.startsWith('data:image/png;') ? 'png' : 'jpg') + '}{\\includegraphics[width=1.8cm]{portrait.' + (resume.basics.photo.startsWith('data:image/png;') ? 'png' : 'jpg') + '}\\par}{}'] : []),
            '{\\LARGE\\bfseries ' + escaped(resume.basics.name || 'Your Name') + '}\\par',
            ...(resume.basics.headline ? ['{\\color{accent} ' + escaped(resume.basics.headline) + '}\\par'] : [])
        ];
        const contacts = ['email', 'phone', 'location', 'website', 'linkedin', 'github'].map(field => resume.basics[field]).filter(Boolean);
        if (contacts.length) lines.push('{\\small ' + contacts.map(escaped).join(' \\textbar{} ') + '}\\par');
        for (const section of resume.sections.filter(section => section.visible)) {
            const items = section.items.filter(item => item.heading || item.subheading || item.bullets.some(Boolean));
            if (!section.content.trim() && !items.length) continue;
            lines.push('\\section*{\\color{accent}' + escaped(section.title) + '}');
            if (section.content) lines.push(escaped(section.content) + '\\par');
            for (const item of items) {
                const dates = [item.start, item.end].filter(Boolean).join(' -- ');
                lines.push('\\textbf{' + escaped(item.heading) + '}' + (dates ? ' \\hfill ' + escaped(dates) : '') + '\\par');
                const detail = [item.subheading, item.location].filter(Boolean).join(' | ');
                if (detail) lines.push('\\textit{' + escaped(detail) + '}\\par');
                if (item.url) lines.push(escaped(item.url) + '\\par');
                const bullets = item.bullets.filter(bullet => bullet.trim());
                if (bullets.length) lines.push('\\begin{itemize}', ...bullets.map(bullet => '\\item ' + escaped(bullet)), '\\end{itemize}');
            }
        }
        lines.push('\\end{document}');
        return lines.join('\n') + '\n';
    }

    function projectFiles(input) {
        const resume = model.normalizeResume(input);
        const files = {
            'resume.tex': latex(resume),
            'cv-studio.json': JSON.stringify(resume, null, 2),
            'README.txt': 'Open resume.tex with XeLaTeX, including in Overleaf. Import cv-studio.json into CV Studio to continue editing the exact studio layout. PDF preview and LaTeX use different rendering engines and can paginate differently. Replace all illustrative example details before applying. No ATS or interview guarantee.\n'
        };
        if (resume.basics.photo && model.findTemplate(resume.template).photo) {
            files['portrait.' + (resume.basics.photo.startsWith('data:image/png;') ? 'png' : 'jpg')] = Uint8Array.from(atob(resume.basics.photo.split(',')[1]), character => character.charCodeAt(0));
        }
        if (model.findTemplate(resume.template).source === 'bajaj') {
            files['LICENSE-template.txt'] = templateSources.bajaj.license;
            files['README.txt'] += 'Format adapted from Sourabh Bajaj\'s MIT-licensed resume: ' + templateSources.bajaj.url + ' at ' + templateSources.bajaj.commit + '. Original personal career content is not included. Modifications: generated body, Unicode font setup, and selected paper size. No endorsement or support by the original author is implied.\n';
        }
        return files;
    }

    function filename(input, extension) {
        const name = model.normalizeResume(input).basics.name || 'my-cv';
        const base = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 65) || 'my-cv';
        return base.toLowerCase() + '-cv.' + extension;
    }

    return { pdfDefinition, escapeTex, latex, projectFiles, filename };
});