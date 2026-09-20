"""Optional local preview. Serves the editable files directly; no build step."""
from pathlib import Path
from urllib.parse import unquote, urlsplit, parse_qs
import functools
import http.server
import json

ROOT = Path(__file__).resolve().parents[1]
PAGES = json.loads((ROOT / 'docs/page-map.json').read_text())
QUERIES = json.loads((ROOT / 'docs/legacy-queries.json').read_text())


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        url = urlsplit(self.path)
        path = unquote(url.path)
        route = path.removesuffix('/index.html').rstrip('/') or '/'
        params = parse_qs(url.query)
        target = None
        for item in QUERIES:
            if route == item['path'] and all(params.get(k) == v for k, v in parse_qs(item['query']).items()):
                target = item['target']
                break
        target = target or PAGES.get(route)
        if target and path != '/' + target and route != '/':
            self.send_response(302)
            self.send_header('Location', '/' + target + ('?' + url.query if url.query else ''))
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        return super().send_head()


if __name__ == '__main__':
    handler = functools.partial(PreviewHandler, directory=str(ROOT))
    print('Freedom Fire preview: http://127.0.0.1:8000 — edit, save, refresh.', flush=True)
    http.server.ThreadingHTTPServer(('127.0.0.1', 8000), handler).serve_forever()
