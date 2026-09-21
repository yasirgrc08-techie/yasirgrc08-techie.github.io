(function (root, factory) {
    const api = factory(typeof module !== 'undefined' && module.exports ? require('./cv-model.js') : root.CvModel);
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else root.CvExport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (model) {
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
        const content = [
            { text: resume.basics.name || 'Your Name', fontSize: template.id === 'compact' ? 23 : 28, bold: true, color: '#172d27', alignment: template.header, margin: [0, 0, 0, 4] },
            ...(resume.basics.headline ? [{ text: resume.basics.headline, fontSize: settings.fontSize + 1, color: accent, alignment: template.header, margin: [0, 0, 0, 5] }] : []),
            ...(contacts.length ? [{ text: contacts, fontSize: Math.max(8, settings.fontSize - 1), alignment: template.header, margin: [0, 0, 0, gap + 2] }] : [])
        ];

        function sectionHeading(section) {
            const heading = { text: template.heading === 'label' ? section.title.toUpperCase() : section.title, bold: true, fontSize: settings.fontSize + 1, color: accent, headlineLevel: 1, margin: [0, gap + 3, 0, 5] };
            if (template.heading === 'band') return { ...heading, background: '#eaf0ed' };
            if (template.heading === 'rule') heading.decoration = 'underline';
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
            if (side.length && main.length) content.push({ columns: [{ width: 145, stack: side, ...(template.layout === 'sidebar' ? { background: '#edf4f0' } : {}) }, { width: '*', stack: main }], columnGap: 24 });
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

    function latex(input) {
        const resume = model.normalizeResume(input);
        const escaped = value => escapeTex(value).replace(/\r?\n/g, '\\\\ ');
        const lines = [
            '\\documentclass[' + resume.settings.fontSize + 'pt,' + (resume.settings.paper === 'LETTER' ? 'letterpaper' : 'a4paper') + ']{article}',
            '\\usepackage[margin=' + (resume.settings.margins / 72).toFixed(3) + 'in]{geometry}',
            '\\usepackage{fontspec}',
            '\\setmainfont{' + (resume.settings.font === 'PlexSerif' ? 'TeX Gyre Pagella' : 'TeX Gyre Heros') + '}',
            '\\usepackage{xcolor}',
            '\\definecolor{accent}{HTML}{' + resume.settings.accent.slice(1) + '}',
            '\\usepackage{enumitem}',
            '\\usepackage[hidelinks]{hyperref}',
            '\\setlength{\\parindent}{0pt}',
            '\\setlength{\\parskip}{4pt}',
            '\\setlist[itemize]{leftmargin=*,itemsep=2pt,topsep=3pt}',
            resume.settings.pageNumbers ? '\\pagestyle{plain}' : '\\pagestyle{empty}',
            '\\begin{document}',
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

    function filename(input, extension) {
        const name = model.normalizeResume(input).basics.name || 'my-cv';
        const base = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 65) || 'my-cv';
        return base.toLowerCase() + '-cv.' + extension;
    }

    return { pdfDefinition, escapeTex, latex, filename };
});