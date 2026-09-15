(function () {
    'use strict';
    const courses = window.PREP_COURSES || [];
    const findCourse = id => courses.find(course => course.id === id);
    const courseKeys = course => ({ access: 'yasir-course-access-v1:' + course.id, progress: 'yasir-course-progress-v1:' + course.id });
    const validReceipt = (receipt, course) => Boolean(receipt && receipt.courseId === course.id && receipt.version === 1 && /^pay_[a-zA-Z0-9]+$/.test(receipt.paymentId || ''));
    const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

    function sanitizeProgress(value, course) {
        const ids = new Set(course.lessons.map(lesson => lesson.id));
        return Array.isArray(value) ? [...new Set(value.filter(id => ids.has(id)))] : [];
    }

    function checkoutOptions(course, email, handler, dismiss) {
        return {
            key: 'rzp_live_SdMpxrq9I6XhNj', amount: course.price * 100, currency: 'INR',
            name: 'Yasir Arafat Sharfi', description: course.title + ' - self-study course',
            image: 'https://yasirgrc08-techie.github.io/images/personal/yasir_amazon.jpeg',
            prefill: { email }, theme: { color: '#087565' },
            notes: { product_id: course.id, product_type: 'interview-prep-course' },
            handler, modal: { ondismiss: dismiss }
        };
    }

    function renderLesson(lesson, index) {
        return `<section class="course-lesson" id="lesson-${lesson.id}">
            <div class="course-lesson-title"><span>${String(index + 1).padStart(2, '0')}</span><h2>${escapeHtml(lesson.title)}</h2><label class="course-completion"><input type="checkbox" data-lesson-complete="${lesson.id}" aria-label="Mark ${escapeHtml(lesson.title)} completed"><span>Completed</span></label></div>
            ${lesson.notes.map(note => `<p>${escapeHtml(note)}</p>`).join('')}
            <h3>Interview questions and answers</h3>
            ${lesson.qa.map(([question, answer]) => `<details class="course-answer"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')}
            <h3>Practice exercise</h3><p>${escapeHtml(lesson.exercise[0])}</p>
            <details class="course-answer"><summary>Worked answer</summary><p>${escapeHtml(lesson.exercise[1])}</p></details>
            ${lesson.code ? `<h3>${lesson.code.language === 'sql' ? 'SQL solution' : 'Python example'}</h3><pre class="prep-code" tabindex="0"><code>${escapeHtml(lesson.code.body)}</code></pre>${lesson.code.tests ? `<details class="course-answer"><summary>Executable checks</summary><pre class="prep-code" tabindex="0"><code>${escapeHtml(lesson.code.tests.join('\n'))}</code></pre></details>` : `<details class="course-answer"><summary>Example data and expected result</summary><pre class="prep-code" tabindex="0"><code>${escapeHtml(lesson.code.fixture)}\n\n${escapeHtml(JSON.stringify(lesson.code.expected, null, 2))}</code></pre><p>The supplied SQL is compatible with PostgreSQL and tested against SQLite for these examples. Date arithmetic and some query-planning details differ by database.</p></details>`}` : ''}
        </section>`;
    }

    window.CoursePage = { findCourse, courseKeys, validReceipt, sanitizeProgress, checkoutOptions, renderLesson };
    if (typeof document === 'undefined') return;
    const host = document.getElementById('courseApp');
    if (!host) return;
    const requested = new URLSearchParams(window.location.search).get('id') || 'faang';
    const course = findCourse(requested);
    if (!course) {
        host.innerHTML = '<h1>Course not found</h1><p><a href="../index.html#courses">View available interview courses</a></p>';
        document.title = 'Course not found | Yasir Arafat Sharfi';
        return;
    }

    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') document.documentElement.dataset.theme = savedTheme;
    } catch {}
    document.title = course.title + ' - INR 49 | Yasir Arafat Sharfi';
    document.querySelector('meta[name="description"]').content = course.summary + ' Eight self-study lessons. INR 49 one-time purchase.';
    const keys = courseKeys(course);
    let receipt = null;
    let completed = [];
    let storageAvailable = true;
    let readerRendered = false;
    let opening = false;

    function readStored() {
        try {
            const savedReceipt = JSON.parse(localStorage.getItem(keys.access) || 'null');
            receipt = validReceipt(savedReceipt, course) ? savedReceipt : null;
        } catch {
            receipt = null;
        }
        try {
            completed = sanitizeProgress(JSON.parse(localStorage.getItem(keys.progress) || '[]'), course);
        } catch {
            completed = [];
        }
    }

    readStored();
    host.innerHTML = `<header class="course-header">
        <span class="prep-edition">INTERVIEW PREPARATION / SELF-STUDY COURSE</span>
        <h1>${escapeHtml(course.title)}</h1><p class="course-lead">${escapeHtml(course.summary)}</p>
        <div class="course-facts"><span>8 lessons</span><span>16 answered interview questions</span><span>8 worked exercises</span><span>PDF included</span></div>
        <p class="course-format">Text-based self-study. No videos or live mentoring. Interview formats vary; no offer or placement guarantee.</p>
    </header>
    <div class="course-overview" id="courseOverview">
        <section class="course-syllabus"><h2>Course syllabus</h2><ol>${course.lessons.map(lesson => `<li>${escapeHtml(lesson.title)}</li>`).join('')}</ol><h3>Who this is for</h3><p>${escapeHtml(course.audience)}</p><h3>Prerequisites</h3><p>${escapeHtml(course.prerequisites)}</p><h3>Learning goals</h3><ul>${course.outcomes.map(outcome => `<li>${escapeHtml(outcome)}</li>`).join('')}</ul></section>
        <aside class="course-purchase" aria-labelledby="coursePurchaseTitle"><h2 id="coursePurchaseTitle">Get this course</h2><div class="package-price"><strong>&#8377;${course.price}</strong><span>One-time purchase</span></div><p>Includes this course's lessons, worked answers, exercises, and printable PDF. Other sheets and courses are sold separately.</p>
            <form id="coursePurchaseForm"><label for="courseEmail">Email</label><input type="email" id="courseEmail" name="email" required autocomplete="email" placeholder="you@example.com"><button type="submit" class="package-book" id="courseBuy">Unlock course &middot; &#8377;49 <i data-lucide="lock-keyhole" aria-hidden="true"></i></button></form>
            <p class="course-access-policy">Access is saved in this browser. For access on another device or after clearing browser data, contact Yasir with your payment ID.</p>
            <a class="course-support" href="mailto:yasir.grc08@gmail.com?subject=${encodeURIComponent(course.title + ' - access support')}">Purchase or access support</a>
        </aside>
    </div>
    <p id="courseStatus" class="course-status" role="status" aria-live="polite"></p>
    <section id="courseOwned" class="course-owned" hidden><div><strong>Course access active</strong><p id="courseReceipt"></p></div><button type="button" class="package-book" id="coursePrint"><i data-lucide="download" aria-hidden="true"></i> Download course PDF</button></section>
    <div id="courseReader" class="course-reader" hidden inert></div>
    <footer class="course-footer"><a href="../index.html#courses">All &#8377;49 courses</a><a href="dsa.html">DSA Sheet &middot; &#8377;49</a><a href="system-design.html">System Design Sheet &middot; &#8377;49</a><a href="behavioral.html">Behavioral Prep &middot; &#8377;29</a></footer>`;

    function renderIcons() {
        if (window.lucide) window.lucide.createIcons();
    }

    function setStatus(message) {
        document.getElementById('courseStatus').textContent = message;
    }

    function renderProgress() {
        const reader = document.getElementById('courseReader');
        reader.querySelectorAll('[data-lesson-complete]').forEach(input => { input.checked = completed.includes(input.dataset.lessonComplete); });
        const label = reader.querySelector('.course-progress-label');
        if (label) label.textContent = completed.length + ' / ' + course.lessons.length + ' lessons completed';
        const meter = reader.querySelector('progress');
        if (meter) meter.value = completed.length;
    }

    function renderReader() {
        const reader = document.getElementById('courseReader');
        reader.innerHTML = `<nav class="course-contents" aria-label="Course contents"><strong>Contents</strong><span class="course-progress-label" role="status"></span><progress max="${course.lessons.length}" value="0" aria-label="Course progress"></progress><a href="#coursePlan">Preparation plan</a>${course.lessons.map((lesson, index) => `<a href="#lesson-${lesson.id}">${index + 1}. ${escapeHtml(lesson.title)}</a>`).join('')}<a href="#courseMock">Final mock</a><a href="#courseSources">References</a></nav>
            <div class="course-reading"><section class="course-lesson" id="coursePlan"><h2>Preparation plan</h2>${course.plans.map(([period, plan]) => `<h3>${escapeHtml(period)}</h3><p>${escapeHtml(plan)}</p>`).join('')}</section>${course.lessons.map(renderLesson).join('')}
            <section class="course-lesson" id="courseMock"><h2>Final interview mock</h2><p>${escapeHtml(course.assessment.prompt)}</p><h3>Review rubric</h3><ul>${course.assessment.rubric.map(point => `<li>${escapeHtml(point)}</li>`).join('')}</ul></section>
            <section class="course-lesson" id="courseSources"><h2>References and scope</h2><p>Original interview-preparation explanations, updated September 15, 2026. These references support the technical concepts and role guidance; they do not verify that a named company asked a specific practice question. Some resources may require an account or separate subscription.</p><ul>${course.sources.map(([title, url]) => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a></li>`).join('')}</ul></section></div>`;
        readerRendered = true;
        renderProgress();
    }

    function syncAccess() {
        const owned = validReceipt(receipt, course);
        document.getElementById('courseOverview').hidden = owned;
        document.getElementById('courseOwned').hidden = !owned;
        const reader = document.getElementById('courseReader');
        reader.hidden = !owned;
        reader.inert = !owned;
        if (owned) {
            if (!readerRendered) renderReader();
            document.getElementById('courseReceipt').textContent = 'Payment ID: ' + receipt.paymentId;
            renderProgress();
        } else {
            reader.replaceChildren();
            readerRendered = false;
        }
        renderIcons();
    }

    function finishCheckout() {
        opening = false;
        document.getElementById('courseBuy').disabled = false;
        document.getElementById('courseBuy').innerHTML = 'Unlock course &middot; &#8377;49 <i data-lucide="lock-keyhole" aria-hidden="true"></i>';
        renderIcons();
    }

    document.getElementById('coursePurchaseForm').addEventListener('submit', event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity() || opening || validReceipt(receipt, course)) return;
        if (typeof window.Razorpay !== 'function') {
            setStatus('Checkout could not load. Check your connection and retry; no payment has been started.');
            return;
        }
        opening = true;
        document.getElementById('courseBuy').disabled = true;
        document.getElementById('courseBuy').textContent = 'Opening checkout...';
        setStatus('');
        const email = document.getElementById('courseEmail').value.trim();
        const handler = response => {
            const candidate = { version: 1, courseId: course.id, paymentId: response?.razorpay_payment_id, purchasedAt: new Date().toISOString() };
            if (!validReceipt(candidate, course)) {
                finishCheckout();
                setStatus('The checkout response did not contain a payment reference. Contact support before paying again.');
                return;
            }
            receipt = candidate;
            try { localStorage.setItem(keys.access, JSON.stringify(receipt)); } catch { storageAvailable = false; }
            finishCheckout();
            syncAccess();
            setStatus(storageAvailable ? 'Course opened. Keep your payment ID for access support.' : 'Course opened for this visit only because browser storage is unavailable. Download the PDF and keep your payment ID.');
            if (window.emailjs) {
                try {
                    window.emailjs.init('97FdG6E2hT9AYtA_4');
                    window.emailjs.send('service_phdrjfp', 'template_k2ysz6k', { session: course.title + ' purchased', date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), name: email, email, phone: 'N/A', message: 'Course: ' + course.id + '\nPayment reference: ' + receipt.paymentId, amount: 'INR 49', payment_id: receipt.paymentId, to_email: 'yasir.grc08@gmail.com' }).catch(() => {});
                } catch {}
            }
        };
        try {
            const checkout = new window.Razorpay(checkoutOptions(course, email, handler, () => {
                finishCheckout();
                if (!validReceipt(receipt, course)) setStatus('Checkout closed. The course remains locked. If your bank shows a debit, contact support before retrying.');
            }));
            checkout.on('payment.failed', () => {
                finishCheckout();
                setStatus('Payment was not completed. The course remains locked. Check the payment status before retrying.');
            });
            checkout.open();
        } catch {
            finishCheckout();
            setStatus('Unable to open checkout. No course access was granted; contact support if a payment was deducted.');
        }
    });

    host.addEventListener('change', event => {
        const id = event.target.dataset.lessonComplete;
        if (!id || !validReceipt(receipt, course)) return;
        const next = new Set(completed);
        if (event.target.checked) next.add(id);
        else next.delete(id);
        completed = sanitizeProgress([...next], course);
        try { localStorage.setItem(keys.progress, JSON.stringify(completed)); } catch { setStatus('Progress is available for this visit only because browser storage is unavailable.'); }
        renderProgress();
    });

    let printState = [];
    const preparePrint = () => {
        if (!validReceipt(receipt, course) || printState.length) return;
        printState = [...document.querySelectorAll('#courseReader details')].map(element => [element, element.open]);
        printState.forEach(([element]) => { element.open = true; });
    };
    window.addEventListener('beforeprint', preparePrint);
    window.addEventListener('afterprint', () => {
        printState.forEach(([element, open]) => { element.open = open; });
        printState = [];
    });
    document.getElementById('coursePrint').addEventListener('click', () => {
        if (!validReceipt(receipt, course)) return;
        preparePrint();
        window.print();
    });
    window.addEventListener('storage', event => {
        if (event.key === keys.access || event.key === keys.progress || event.key === null) {
            readStored();
            syncAccess();
        }
    });
    syncAccess();
})();