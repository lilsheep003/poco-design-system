"""Render a markdown file to a styled PDF using Playwright (Chromium).
Usage: python _render_pdf.py <input.md> <output.pdf>
"""
import sys, os, html, re, tempfile, pathlib
from playwright.sync_api import sync_playwright

try:
    import markdown as md_lib
except ImportError:
    os.system(f'"{sys.executable}" -m pip install markdown --quiet')
    import markdown as md_lib

CSS = r"""
@page { size: A4; margin: 20mm 18mm 22mm 18mm; }

html, body {
  font-family: 'Source Serif Pro', 'Cambria', 'Georgia', 'Noto Serif', serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: #1c1b1a;
  background: #fff;
  margin: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

h1, h2, h3, h4 {
  font-family: 'Inter', 'Source Sans Pro', 'Segoe UI', system-ui, sans-serif;
  color: #111;
  line-height: 1.25;
  letter-spacing: -0.005em;
  page-break-after: avoid;
}
h1 { font-size: 22pt; font-weight: 800; margin: 0 0 8pt; letter-spacing: -0.015em; }
h2 { font-size: 15pt; font-weight: 700; margin: 22pt 0 6pt;
     border-bottom: 0.5pt solid #bbb; padding-bottom: 3pt; }
h3 { font-size: 12pt; font-weight: 700; margin: 16pt 0 4pt; }
h4 { font-size: 10.5pt; font-weight: 700; margin: 12pt 0 3pt; color: #333; }

p { margin: 0 0 8pt; text-align: justify; hyphens: auto; }
em { color: #3a3938; }
strong { color: #000; }

ul, ol { margin: 0 0 10pt; padding-left: 18pt; }
li { margin-bottom: 3pt; }

blockquote {
  margin: 8pt 0 10pt;
  padding: 6pt 14pt;
  background: #f5f3ee;
  border-left: 2pt solid #7a6b48;
  font-style: italic;
  color: #3a3938;
  page-break-inside: avoid;
}

code {
  font-family: 'JetBrains Mono', 'Consolas', 'Menlo', monospace;
  font-size: 9pt;
  background: #f1efe9;
  padding: 1pt 4pt;
  border-radius: 2pt;
  color: #2a2a28;
}
pre {
  background: #f5f3ee;
  border-radius: 4pt;
  padding: 8pt 10pt;
  font-size: 8.5pt;
  line-height: 1.4;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  page-break-inside: avoid;
  margin: 0 0 10pt;
}
pre code { background: transparent; padding: 0; font-size: 8.5pt; }

table {
  width: 100%;
  border-collapse: collapse;
  margin: 6pt 0 12pt;
  font-size: 9.5pt;
  page-break-inside: avoid;
}
th, td {
  padding: 4pt 7pt;
  text-align: left;
  vertical-align: top;
  border-bottom: 0.4pt solid #d6d2c7;
}
th {
  background: #ece8dd;
  color: #2a2a28;
  font-weight: 700;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 9pt;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 0.8pt solid #7a6b48;
}
tr:nth-child(even) td { background: #fbfaf6; }

hr { border: 0; border-top: 0.4pt solid #c7c4bb; margin: 14pt 0; }

a { color: #0a5d9e; text-decoration: none; }

/* Input-checkbox rendering (for GitHub-style `- [ ]` checklists) */
.task-list-item { list-style: none; margin-left: -16pt; }
.task-list-item input[type=checkbox] { margin-right: 4pt; }

.footer-meta {
  margin-top: 20pt;
  padding-top: 8pt;
  border-top: 0.4pt dashed #c7c4bb;
  font-size: 8.5pt;
  color: #555;
  text-align: center;
}
"""

HTML_TPL = """<!doctype html>
<html><head>
<meta charset='utf-8'>
<title>{title}</title>
<style>{css}</style>
</head><body>
{body}
</body></html>
"""

def render(md_path, pdf_path):
    raw = pathlib.Path(md_path).read_text(encoding="utf-8")
    # Convert the [ ] / [x] task-list markers so they survive as <input type=checkbox>.
    raw = re.sub(r"(^|\n)-\s+\[( |x|X)\]\s", lambda m: f"{m.group(1)}- <input type='checkbox' disabled" + (" checked" if m.group(2).lower() == 'x' else "") + "> ", raw)

    body = md_lib.markdown(
        raw,
        extensions=['tables', 'fenced_code', 'toc', 'sane_lists'],
    )
    title = pathlib.Path(md_path).stem
    full = HTML_TPL.format(title=html.escape(title), css=CSS, body=body)

    # Write to a temp HTML, then open in headless Chromium and print to PDF.
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(full)
        html_path = f.name

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("file:///" + html_path.replace("\\", "/"))
            page.wait_for_load_state("load")
            page.pdf(
                path=pdf_path,
                format="A4",
                print_background=True,
                margin={"top": "20mm", "right": "18mm", "bottom": "22mm", "left": "18mm"},
                display_header_footer=True,
                header_template="<div></div>",
                footer_template="<div style='width:100%;font-family:Inter,system-ui,sans-serif;font-size:8pt;color:#777;padding:0 14mm;display:flex;justify-content:space-between;'><span>" + html.escape(title) + "</span><span><span class='pageNumber'></span> / <span class='totalPages'></span></span></div>",
            )
            browser.close()
    finally:
        try: os.unlink(html_path)
        except Exception: pass

    print(f"wrote: {pdf_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("usage: python _render_pdf.py <input.md> <output.pdf>", file=sys.stderr)
        sys.exit(2)
    render(sys.argv[1], sys.argv[2])
