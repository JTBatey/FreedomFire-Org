"""Optional read-only checks. No build tools or third-party packages required."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import html
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        for attr in ('src', 'href', 'action'):
            if attrs.get(attr):
                self.references.append(attrs[attr])
        self.references.extend(re.findall(r"url\(['\"]?([^)'\"\s]+)", attrs.get('style', '')))


def check():
    errors = []
    pages = sorted(ROOT.glob('*.html')) + sorted((ROOT / 'blog').glob('*.html'))
    shared = {}

    def target_for(page, reference):
        url = urlparse(html.unescape(reference))
        if url.scheme or url.netloc or not url.path:
            return None
        return ((ROOT / unquote(url.path.lstrip('/'))) if url.path.startswith('/')
                else (page.parent / unquote(url.path))).resolve()

    for page in pages:
        markup = page.read_text()
        parser = PageParser()
        parser.feed(markup)
        if len(parser.ids) != len(set(parser.ids)):
            errors.append(f'{page.relative_to(ROOT)}: duplicate ids')
        for reference in parser.references:
            target = target_for(page, reference)
            if target is None or (page.name == '404.html' and reference == '/'):
                continue
            if not target.is_file():
                errors.append(f'{page.relative_to(ROOT)}: missing file or directory link: {reference}')
            if not target.is_relative_to(ROOT):
                errors.append(f'{page.relative_to(ROOT)}: reference outside website: {reference}')
        if page.name == '404.html':
            continue
        for part in ('HEADER', 'FOOTER'):
            match = re.search(r'<!-- SHARED ' + part + r':.*?<!-- END SHARED ' + part + r' -->', markup, re.S)
            if not match:
                errors.append(f'{page.relative_to(ROOT)}: missing shared {part} markers')
                continue
            def normalize_ref(m):
                target = target_for(page, m[2])
                return m[1] + '="' + (str(target) if target else m[2]) + '"'
            normalized = re.sub(r'(href|src)="([^"]+)"', normalize_ref, match[0])
            if part not in shared:
                shared[part] = normalized
            elif shared[part] != normalized:
                errors.append(f'{page.relative_to(ROOT)}: shared {part.lower()} differs from other pages')

    for css in (ROOT / 'css').glob('*.css'):
        for reference in re.findall(r"url\(['\"]?([^)'\"\s]+)", css.read_text()):
            target = target_for(css, reference)
            if target is not None and not target.is_file():
                errors.append(f'{css.relative_to(ROOT)}: missing {reference}')
            if urlparse(reference).scheme in ('http', 'https'):
                errors.append(f'{css.relative_to(ROOT)}: unexpected remote stylesheet asset: {reference}')

    for family in ('Figtree', 'Jost'):
        license_file = ROOT / 'assets/fonts' / (family + '-LICENSE.txt')
        if not license_file.is_file() or 'SIL OPEN FONT LICENSE' not in license_file.read_text():
            errors.append(f'{family}: missing bundled font license')

    page_map = json.loads((ROOT / 'docs/page-map.json').read_text())
    not_found = (ROOT / '404.html').read_text()
    embedded = re.search(r'const legacyPages = (.*?);\n', not_found, re.S)
    if not embedded or json.loads(embedded[1]) != page_map:
        errors.append('404.html legacy map differs from docs/page-map.json')
    queries = re.search(r'const legacyQueries = (.*?);\n', not_found, re.S)
    if not queries or json.loads(queries[1]) != json.loads((ROOT / 'docs/legacy-queries.json').read_text()):
        errors.append('404.html query map differs from docs/legacy-queries.json')
    for route, target in page_map.items():
        if not (ROOT / target).is_file():
            errors.append(f'Legacy route {route}: missing {target}')
    for asset in json.loads((ROOT / 'docs/asset-sources.json').read_text()):
        if not (ROOT / asset.lstrip('/')).is_file():
            errors.append(f'Asset manifest: missing {asset}')
    for error in errors:
        print(error)
    print(f'{len(pages)} HTML files checked; {len(errors)} errors')
    return bool(errors)


if __name__ == '__main__':
    sys.exit(check())
