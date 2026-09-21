import argparse
import hashlib
import html
import json
import re
import zipfile
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "https://yasirgrc08-techie.github.io/guides/"
UPDATED = "2026-09-21"
CSS = """
body { font-family: sans-serif; font-size: 10.2pt; line-height: 1.5; color: #182d29; }
h1 { font-family: sans-serif; font-size: 25pt; line-height: 1.13; margin: 4pt 0 13pt; color: #182d29; }
h2 { font-size: 14pt; line-height: 1.3; margin: 15pt 0 7pt; color: #087565; }
h3 { font-size: 11.3pt; line-height: 1.35; margin: 10pt 0 4pt; }
p { margin: 0 0 8pt; }
ul, ol { margin: 3pt 0 9pt; padding-left: 17pt; }
li { margin: 0 0 5pt; }
a { color: #087565; text-decoration: underline; }
.kicker { font-size: 8pt; color: #087565; margin-bottom: 8pt; }
.muted { color: #45625a; }
.small { font-size: 8.5pt; line-height: 1.4; }
.band { border-top: 2pt solid #087565; background-color: #edf5f1; padding: 10pt 12pt; margin: 9pt 0 12pt; }
.phase { border-top: 1pt solid #d5e1da; padding-top: 7pt; margin-top: 8pt; }
.label { font-weight: bold; color: #087565; }
.sources { font-size: 8.3pt; line-height: 1.5; }
"""


def escape(value):
    return html.escape(str(value), quote=True)


def paragraphs(values):
    return "".join(f"<p>{escape(value)}</p>" for value in values)


def bullets(values, ordered=False):
    tag = "ol" if ordered else "ul"
    return f"<{tag}>" + "".join(f"<li>{escape(value)}</li>" for value in values) + f"</{tag}>"


def section(title, content):
    return f"<h2>{escape(title)}</h2>{content}"


def page_bodies(guide):
    foundations = "".join(f"<h3>{escape(title)}</h3><p>{escape(text)}</p>" for title, text in guide["foundations"])
    first = (
        f'<p class="kicker">01 / ROADMAP AND FOUNDATIONS</p><h1>{escape(guide["title"])}</h1>'
        f'<p>{escape(guide["summary"])}</p>'
        f'<div class="band"><p><span class="label">For:</span> {escape(guide["audience"])}</p>'
        f'<p class="small">Suggested pace: {escape(guide["duration"])} | {escape(guide["level"])}</p></div>'
        + section("What you will be able to do", bullets(guide["outcomes"]))
        + section("Build the right mental model", foundations)
    )
    phases = "".join(
        f'<div class="phase"><h3>{escape(phase[0])}: {escape(phase[1])}</h3><p>{escape(phase[2])}</p>'
        f'<p class="small"><span class="label">Deliverable and check:</span> {escape(phase[3])}</p></div>'
        for phase in guide["plan"]
    )
    second = (
        '<p class="kicker">02 / A PLAN YOU CAN EXECUTE</p><h1>Study with evidence.</h1>'
        + f'<p>{escape(guide["studyRule"])}</p>'
        + phases
        + '<div class="band"><h3>A repeatable practice session</h3><p>Spend about 15 minutes recalling the previous topic without notes, 45 minutes on today\'s problem or lab, and 15 minutes explaining and checking the result. Record the failed assumption, not just the final answer. Revisit weak material after a few days and again the following week.</p></div>'
    )
    lab = guide["lab"]
    third = (
        '<p class="kicker">03 / WORKED APPLICATION</p><h1>Apply it. Explain it.</h1>'
        + section(lab["title"], f'<p>{escape(lab["scenario"])}</p>')
        + section("A worked approach", bullets(lab["steps"], ordered=True))
        + f'<div class="band"><h3>Expected result</h3><p>{escape(lab["result"])}</p></div>'
        + section("Verify the result", bullets(lab["checks"]))
        + section("Extend the exercise", f'<p>{escape(lab["extension"])}</p>')
    )
    questions = "".join(f"<h3>{escape(question)}</h3><p>{escape(answer)}</p>" for question, answer in guide["qa"])
    sources = "".join(f'<li><a href="{escape(url)}">{escape(title)}</a></li>' for title, url in guide["sources"])
    fourth = (
        '<p class="kicker">04 / INTERVIEW AND READINESS</p><h1>Make the learning stick.</h1>'
        + questions
        + section("Avoid these traps", bullets(guide["pitfalls"]))
        + section("Ready for the next step?", bullets(guide["readiness"]))
        + section("Reliable next reads", f'<ul class="sources">{sources}</ul>')
        + '<p class="small muted">An independent preparation guide, not an employer-endorsed syllabus or a guarantee of an offer. Company examples are practice contexts, not verified past interview questions. Use only public, synthetic, or authorized material in exercises.</p>'
    )
    return [first, second, third, fourth]


def validate_guide(guide):
    required = ["id", "title", "category", "duration", "level", "audience", "summary", "outcomes", "foundations", "studyRule", "plan", "lab", "qa", "pitfalls", "readiness", "sources"]
    for key in required:
        if not guide.get(key):
            raise ValueError(f"{guide.get('id')}: missing {key}")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", guide["id"]):
        raise ValueError(f"Invalid slug: {guide['id']}")
    for key, count in [("outcomes", 4), ("foundations", 3), ("plan", 4), ("qa", 3), ("pitfalls", 3), ("readiness", 4)]:
        if len(guide[key]) != count:
            raise ValueError(f"{guide['id']}: expected {count} {key} entries")
    for key in ["title", "scenario", "steps", "result", "checks", "extension"]:
        if not guide["lab"].get(key):
            raise ValueError(f"{guide['id']}: missing lab {key}")
    if len(guide["lab"]["steps"]) < 3 or len(guide["sources"]) < 2:
        raise ValueError(f"{guide['id']}: insufficient worked steps or sources")
    for title, url in guide["sources"]:
        if not title or not url.startswith("https://"):
            raise ValueError(f"{guide['id']}: invalid reference")


def build_pdf(guide, ordinal):
    document = fitz.open()
    heights = []
    for number, body in enumerate(page_bodies(guide), start=1):
        page = document.new_page(width=595.28, height=841.89)
        page.draw_rect(fitz.Rect(0, 0, page.rect.width, 9), color=None, fill=(0.03, 0.46, 0.4))
        page.insert_text((42, 32), f"YASIR SHARFI / ENGINEERING FIELD GUIDES / {ordinal:02d}", fontsize=8, color=(0.2, 0.34, 0.3))
        page.insert_text((42, 48), guide["category"].upper(), fontsize=7.5, color=(0.3, 0.39, 0.35))
        available = fitz.Rect(42, 65, page.rect.width - 42, 781)
        spare_height, scale = page.insert_htmlbox(available, body, css=CSS, scale_low=1)
        if spare_height < 0 or scale < 0.999:
            raise ValueError(f"{guide['id']} page {number}: content exceeds the page; shorten or restructure it")
        heights.append(round(available.height - spare_height, 2))
        page.draw_line((42, 799), (page.rect.width - 42, 799), color=(0.8, 0.86, 0.82), width=0.6)
        page.insert_text((42, 816), f"Yasir Arafat Sharfi | Updated {UPDATED} | Independent learning guide", fontsize=7.3, color=(0.3, 0.39, 0.35))
        page.insert_text((page.rect.width - 69, 816), f"{number} / 4", fontsize=8, color=(0.03, 0.46, 0.4))
        page.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(42, 804, 300, 826), "uri": BASE_URL + "?guide=" + guide["id"]})
    document.set_toc([[1, "Roadmap and foundations", 1], [1, "Study plan", 2], [1, "Worked application", 3], [1, "Interview and readiness", 4]])
    document.set_metadata({"title": guide["title"], "author": "Yasir Arafat Sharfi", "subject": guide["summary"], "keywords": guide["category"] + ", interview preparation, engineering", "creator": "Engineering Field Guides PDF builder"})
    destination = ROOT / "pdfs" / (guide["id"] + ".pdf")
    destination.parent.mkdir(parents=True, exist_ok=True)
    document.save(destination, garbage=4, deflate=True)
    document.close()
    with fitz.open(destination) as verified:
        if len(verified) != 4:
            raise AssertionError(f"{guide['id']}: expected exactly four pages")
        words = []
        for index, page in enumerate(verified):
            text = page.get_text()
            count = len(text.split())
            if count < 150:
                raise AssertionError(f"{guide['id']} page {index + 1}: only {count} words")
            for word in page.get_text("words"):
                if word[0] < 30 or word[2] > page.rect.width - 28 or word[1] < 15 or word[3] > page.rect.height - 12:
                    raise AssertionError(f"{guide['id']} page {index + 1}: text outside the safe page bounds")
            words.append(count)
        if not any(link.get("uri", "").startswith("https://") for link in verified[3].get_links()):
            raise AssertionError(f"{guide['id']}: source links missing from final page")
        preview = ROOT / "previews" / (guide["id"] + ".png")
        preview.parent.mkdir(parents=True, exist_ok=True)
        verified[0].get_pixmap(matrix=fitz.Matrix(0.5, 0.5), alpha=False).save(preview)
    return {"id": guide["id"], "title": guide["title"], "category": guide["category"], "duration": guide["duration"], "level": guide["level"], "summary": guide["summary"], "pages": 4, "pdf": "pdfs/" + destination.name, "preview": "previews/" + preview.name, "bytes": destination.stat().st_size, "sha256": hashlib.sha256(destination.read_bytes()).hexdigest(), "wordsPerPage": words, "contentHeights": heights}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--id")
    parser.add_argument("--expect-count", type=int)
    args = parser.parse_args()
    guides = []
    for filename in sorted((ROOT / "content").glob("*.json")):
        guides.extend(json.loads(filename.read_text(encoding="utf-8")))
    if args.expect_count and len(guides) != args.expect_count:
        raise ValueError(f"Expected {args.expect_count} guides, found {len(guides)}")
    if len({guide["id"] for guide in guides}) != len(guides):
        raise ValueError("Duplicate guide IDs")
    results = []
    for ordinal, guide in enumerate(guides, start=1):
        validate_guide(guide)
        if args.id and args.id != guide["id"]:
            continue
        result = build_pdf(guide, ordinal)
        results.append(result)
        print(f"PASS {guide['id']}: 4 pages, {sum(result['wordsPerPage'])} words", flush=True)
    if not results:
        raise ValueError("No guides selected")
    if not args.id:
        archive = ROOT / "engineering-field-guides.zip"
        with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
            for result in results:
                bundle.write(ROOT / result["pdf"], arcname=Path(result["pdf"]).name)
            index = "Engineering Field Guides - Yasir Arafat Sharfi\n" + BASE_URL + "\nUpdated " + UPDATED + "\n\n"
            index += "\n".join(f"{number:02d}. {result['title']}\n    {Path(result['pdf']).name}" for number, result in enumerate(results, start=1))
            bundle.writestr("GUIDE-INDEX.txt", index + "\n")
        with zipfile.ZipFile(archive) as bundle:
            if bundle.testzip() is not None or sum(name.endswith(".pdf") for name in bundle.namelist()) != len(results):
                raise AssertionError("ZIP verification failed")
        payload = {"updated": UPDATED, "count": len(results), "archive": {"url": archive.name, "bytes": archive.stat().st_size, "sha256": hashlib.sha256(archive.read_bytes()).hexdigest()}, "guides": results}
        (ROOT / "catalog.json").write_text(json.dumps(payload, ensure_ascii=True, indent=2) + "\n", encoding="utf-8")
    print(f"Verified {len(results)} PDFs / {4 * len(results)} pages; no overflow or blank pages.")


if __name__ == "__main__":
    main()