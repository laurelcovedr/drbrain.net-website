import json
import pathlib
import re
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT = pathlib.Path(__file__).resolve().parent

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canon = []
        self.robots = []
        self.links = []
        self.h1 = 0
        self.schema = []
        self.text = []
        self.script = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        assert tag not in {'img','iframe','object','embed','video','audio','image','use','foreignobject'}, 'Unapproved resource element'
        assert not any(k.lower().startswith('on') for k in a), 'Inline event handler prohibited'
        assert not any(k.lower() in {'src','srcset','xlink:href'} for k in a), 'External asset reference prohibited'
        if tag == 'h1': self.h1 += 1
        if tag == 'link' and a.get('rel') == 'canonical': self.canon.append(a['href'])
        if tag == 'meta' and a.get('name') == 'robots': self.robots.append(a['content'])
        if tag == 'a': self.links.append(a.get('href', ''))
        if tag == 'script':
            assert a.get('type') == 'application/ld+json', 'Executable scripts prohibited'
            self.script = True
    def handle_endtag(self, tag):
        if tag == 'script': self.script = False
    def handle_data(self, value):
        if self.script: self.schema.append(json.loads(value))
        else: self.text.append(value)

def validate(root=ROOT):
    config = json.loads((root/'config.json').read_text())
    manifest = json.loads((root/'build-manifest.json').read_text())
    origin = config['origin'].rstrip('/')
    release = config['mode'] == 'release'
    assert manifest['origin'] == origin and manifest['mode'] == config['mode']
    routes = {p['route'] for p in manifest['pages']}
    assert len(routes) == 11
    expected = {'style.css','robots.txt','sitemap.xml','llms.txt','404.html'}
    expected |= {((r.strip('/')+'/') if r != '/' else '')+'index.html' for r in routes}
    actual = {p.relative_to(root/'dist').as_posix() for p in (root/'dist').rglob('*') if p.is_file()}
    assert actual == expected, 'Unexpected or missing build files: '+str(actual ^ expected)
    css = (root/'dist/style.css').read_text()
    assert not re.search(r'url\s*\(|@import',css,re.I), 'Remote or embedded CSS assets prohibited'
    count = 0
    for route in routes:
        raw = (root/'dist'/route.strip('/')/'index.html').read_text()
        assert not re.search(r'/resources/|\.pdf|chatgpt\.site|wangsilun|report-data|\bBP\b|suppliedPdf',raw,re.I), 'Restricted content/reference'
        p = Page(); p.feed(raw)
        assert p.h1 == 1
        assert p.canon == [origin+route]
        assert p.robots == [('index,follow' if release else 'noindex,nofollow')]
        assert f'<meta property="og:url" content="{origin+route}">' in raw
        assert len(p.schema) == 1
        graph = p.schema[0]['@graph']
        assert any(n.get('@type') == 'WebPage' and n['url'] == origin+route for n in graph)
        visible = '\n'.join(p.text)
        for n in graph:
            if n['@type'] == 'FAQPage':
                assert len(n['mainEntity']) == 4
                for q in n['mainEntity']:
                    assert q['name'] in visible and q['acceptedAnswer']['text'] in visible
                    count += 1
            if n['@type'] == 'ItemList':
                assert n['numberOfItems'] == len(n['itemListElement'])
                for item in n['itemListElement']:
                    a = item['item']
                    assert a['abstract'] in visible and a['description'] in visible
        for href in p.links:
            assert href == '#main' or href in routes or href.startswith('https://doi.org/'), 'Unapproved target '+href
    assert count == 16
    urls = {e.text for e in ET.parse(root/'dist/sitemap.xml').findall('.//{*}loc')}
    assert urls == {origin+r for r in routes}
    llms = (root/'dist/llms.txt').read_text()
    assert set(re.findall(r'\]\((https:[^)]+)\)',llms)) == urls
    robots = (root/'dist/robots.txt').read_text()
    assert robots == f"User-agent: *\n{'Allow: /' if release else 'Disallow: /'}\nSitemap: {origin}/sitemap.xml\n"
    return {'pages':len(routes),'faq_answers':count,'sitemap_urls':len(urls),'asset_allowlist':True,'schema_visible_content_matches':True,'mode':config['mode']}

if __name__ == '__main__':
    print(json.dumps(validate(),indent=2))
