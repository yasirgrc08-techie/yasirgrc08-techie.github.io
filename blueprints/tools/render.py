import base64
import csv
import hashlib
import io
import json
import math
import sys
import textwrap
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

import fitz


WIDTH = 540
HEIGHT = 675
BASE_URL = "https://yasirgrc08-techie.github.io/blueprints/"
SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)


def color(value):
    return tuple(int(value[index:index + 2], 16) / 255 for index in (1, 3, 5))


class Poster:
    def __init__(self, fonts):
        self.document = fitz.open()
        self.page = self.document.new_page(width=WIDTH, height=HEIGHT)
        self.fonts = {}
        self.sizes = []
        for weight, buffer in fonts.items():
            self.fonts[weight] = fitz.Font(fontbuffer=buffer)
            self.page.insert_font(fontname="Lato" + weight, fontbuffer=buffer)
        self.svg = ET.Element(f"{{{SVG}}}svg", {"width": "1080", "height": "1350", "viewBox": "0 0 540 675", "role": "img"})
        style = ET.SubElement(self.svg, f"{{{SVG}}}style")
        style.text = "@font-face{font-family:Lato;src:url('../fonts/Lato-Regular.ttf')}@font-face{font-family:Lato;src:url('../fonts/Lato-Bold.ttf');font-weight:700}text{font-family:Lato,sans-serif;letter-spacing:0}"

    def rect(self, left, top, right, bottom, fill, stroke=None, width=1):
        self.page.draw_rect(fitz.Rect(left, top, right, bottom), fill=color(fill), color=color(stroke) if stroke else None, width=width)
        ET.SubElement(self.svg, f"{{{SVG}}}rect", {"x": str(left), "y": str(top), "width": str(right - left), "height": str(bottom - top), "fill": fill, **({"stroke": stroke, "stroke-width": str(width)} if stroke else {})})

    def line(self, start, end, stroke, width=1):
        self.page.draw_line(start, end, color=color(stroke), width=width)
        ET.SubElement(self.svg, f"{{{SVG}}}line", {"x1": str(start[0]), "y1": str(start[1]), "x2": str(end[0]), "y2": str(end[1]), "stroke": stroke, "stroke-width": str(width)})

    def text(self, value, left, baseline, size, fill="#20362e", bold=False):
        weight = "bold" if bold else "regular"
        self.page.insert_text((left, baseline), value, fontname="Lato" + weight, fontsize=size, color=color(fill))
        node = ET.SubElement(self.svg, f"{{{SVG}}}text", {"x": str(left), "y": str(baseline), "font-size": str(size), "fill": fill, "font-weight": "700" if bold else "400"})
        node.text = value

    def wrapped(self, value, left, top, width, height, size, minimum, fill="#20362e", bold=False, leading=1.18):
        font = self.fonts["bold" if bold else "regular"]
        while size >= minimum:
            lines = []
            current = ""
            for word in value.split():
                candidate = (current + " " + word).strip()
                if font.text_length(candidate, fontsize=size) <= width:
                    current = candidate
                else:
                    if current:
                        lines.append(current)
                    current = word
                    if font.text_length(word, fontsize=size) > width:
                        raise ValueError("Unbreakable word is too wide: " + word)
            if current:
                lines.append(current)
            line_height = size * leading
            if len(lines) * line_height <= height:
                for index, line in enumerate(lines):
                    self.text(line, left, top + size + index * line_height, size, fill, bold)
                self.sizes.append(size)
                return len(lines) * line_height
            size = round(size - 0.5, 2)
        raise ValueError("Text does not fit: " + value)


def digest(filename):
    content = filename.read_bytes()
    return {"bytes": len(content), "sha256": hashlib.sha256(content).hexdigest()}


def render(post, root, fonts, total):
    poster = Poster(fonts)
    accent = post["accent"]
    poster.rect(0, 0, WIDTH, HEIGHT, "#f9fbfa")
    poster.rect(0, 0, 12, HEIGHT, accent)
    poster.text("ENGINEERING / FIELD NOTES", 32, 30, 9, accent, True)
    poster.text(f'{post["number"]:03d} / {total:03d}', 450, 30, 9, "#536a5d")
    poster.wrapped(post["headline"], 32, 47, 474, 65, 27, 20, bold=True)
    poster.text(post["formatName"].upper(), 32, 133, 10, accent, True)
    poster.wrapped(post["hook"], 32, 143, 476, 34, 11.5, 10.5, "#536a5d")
    poster.line((32, 186), (508, 186), "#cfdbd3")
    row_top = 202
    for index, row in enumerate(post["rows"]):
        top = row_top + index * 58
        poster.rect(32, top, 58, top + 26, accent)
        poster.text(f"{index + 1:02d}", 38, top + 18, 10, "#ffffff", True)
        if index < 5:
            poster.line((45, top + 29), (45, top + 53), "#c9d7cd", 1)
        poster.wrapped(row["title"], 73, top - 2, 435, 19, 13.5, 11.5, bold=True)
        poster.wrapped(row["detail"], 73, top + 20, 435, 32, 10.5, 9.5, "#465e51")
    poster.rect(32, 564, 508, 620, "#eaf0ec")
    poster.text("THE TAKEAWAY", 44, 580, 8, accent, True)
    poster.wrapped(post["takeaway"], 44, 588, 448, 25, 10.5, 10, bold=True)
    poster.text("YASIR SHARFI", 32, 648, 10, "#20362e", True)
    poster.text("MEASURE FIRST. MAKE TRADE-OFFS EXPLICIT.", 175, 648, 7.3, "#536a5d")
    poster.text("yasirgrc08-techie.github.io/blueprints", 32, 663, 7.5, "#536a5d")
    ET.SubElement(poster.svg, f"{{{SVG}}}title").text = post["title"]
    ET.SubElement(poster.svg, f"{{{SVG}}}desc").text = post["hook"] + " " + post["takeaway"]
    for word in poster.page.get_text("words"):
        if word[0] < 24 or word[2] > 514 or word[1] < 12 or word[3] > 669:
            raise AssertionError(post["id"] + ": text outside safe bounds")
    text = " ".join(poster.page.get_text().replace("\u2010", "-").split())
    if " ".join(post["headline"].split()) not in text:
        raise AssertionError(post["id"] + ": title missing from render")
    for row in post["rows"]:
        if " ".join(row["detail"].split()) not in text:
            raise AssertionError(post["id"] + ": rendered row text missing: " + row["detail"] + "\nExtracted: " + text)
    image = root / "images" / (post["id"] + ".png")
    thumbnail = root / "previews" / (post["id"] + ".png")
    source = root / "svg" / (post["id"] + ".svg")
    notes = root / "posts" / (post["id"] + ".md")
    poster.page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False).save(image)
    poster.page.get_pixmap(matrix=fitz.Matrix(0.6, 0.6), alpha=False).save(thumbnail)
    ET.ElementTree(poster.svg).write(source, encoding="utf-8", xml_declaration=True)
    notes.write_text(post["markdown"], encoding="utf-8")
    pixmap = fitz.Pixmap(image)
    if (pixmap.width, pixmap.height) != (1080, 1350):
        raise AssertionError("Incorrect PNG dimensions")
    poster.document.close()
    return {**{key: value for key, value in post.items() if key != "markdown"}, "image": "images/" + image.name, "preview": "previews/" + thumbnail.name, "svg": "svg/" + source.name, "notes": "posts/" + notes.name, "imageMeta": digest(image), "minimumFontSize": min(poster.sizes)}


def main():
    payload = json.load(sys.stdin)
    root = Path(payload["root"])
    posts = payload["posts"]
    fonts = {name: base64.b64decode(value) for name, value in payload["fonts"].items()}
    for directory in ("images", "previews", "svg", "posts", "fonts"):
        (root / directory).mkdir(parents=True, exist_ok=True)
    (root / "fonts" / "Lato-Regular.ttf").write_bytes(fonts["regular"])
    (root / "fonts" / "Lato-Bold.ttf").write_bytes(fonts["bold"])
    (root / "fonts" / "OFL-Lato.txt").write_text(payload["fontLicense"], encoding="utf-8")
    results = [render(post, root, fonts, len(posts)) for post in posts]
    index = io.StringIO()
    writer = csv.writer(index)
    writer.writerow(["number", "id", "topic", "format", "category", "image", "source", "script_seconds"])
    for post in results:
        writer.writerow([post["number"], post["id"], post["headline"], post["formatName"], post["category"], post["image"], post["svg"], post["durationSeconds"]])
    (root / "template-index.csv").write_text(index.getvalue(), encoding="utf-8")
    archive = root / "engineering-content-templates.zip"
    with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as bundle:
        for post in results:
            for field in ("image", "svg", "notes"):
                bundle.write(root / post[field], arcname=post[field])
        for file in (root / "fonts").iterdir():
            bundle.write(file, arcname="fonts/" + file.name)
        bundle.writestr("template-index.csv", index.getvalue())
        bundle.writestr("README.txt", f"Engineering Content Templates / Yasir Sharfi\n{BASE_URL}\n\n{len(results)} templates across {len(results) // 5} topics and five formats.\nImages: 1080 x 1350 PNG. Editable SVG sources use the included OFL-licensed Lato fonts.\nEach Markdown file contains a caption, estimated reel storyboard, references, and scope. These are reusable images and scripts, not rendered video clips.\nAll examples are educational; measure your workload before applying architecture advice.\nOriginal content and adaptations of this site's public engineering guides. The Instagram reference inspired the concise explainer format; its footage and artwork are not copied.\n")
    if archive.stat().st_size > 90 * 1024 * 1024:
        raise AssertionError("Archive exceeds the 90 MB repository safety limit")
    with zipfile.ZipFile(archive) as bundle:
        if bundle.testzip() or sum(name.endswith(".png") for name in bundle.namelist()) != len(results):
            raise AssertionError("Template archive integrity failed")
    catalog = {"updated": "2026-09-21", "count": len(results), "topicCount": len(results) // 5, "formats": 5, "imageSize": [1080, 1350], "archive": {"url": archive.name, **digest(archive)}, "posts": results}
    (root / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=True, separators=(",", ":")) + "\n", encoding="utf-8")
    print(f"PASS: {len(results)} distinct 1080x1350 PNGs, editable SVGs, captions, and storyboards; text bounds and ZIP verified.")
    print(f"Archive: {archive.stat().st_size / 1024 / 1024:.1f} MB; minimum poster body size {min(post['minimumFontSize'] for post in results):.1f} pt.")


if __name__ == "__main__":
    main()