"""Render collected public research as a standalone daily review page."""
import json
import re
import sys
from datetime import datetime
from html import escape
from pathlib import Path
from urllib.parse import parse_qs, quote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
offer_files = sorted((ROOT / 'research').glob('offers-*.json'))
assert offer_files, 'At least one completed offer file is required'
latest_offers = json.loads(offer_files[-1].read_text())
reports_path = ROOT / 'research/reviews.json'
reports = json.loads(reports_path.read_text())['reports']
assert reports, 'At least one completed report is required'

# Rendering is not research: never synthesize checks or rewrite saved reports.
# Public-comparison rendering requires a separate, explicit authorization.
if sys.argv[1:] not in ([], ['--refresh-comparison']):
    raise SystemExit('Usage: build_daily_review.py [--refresh-comparison]')

reports = sorted(reports, key=lambda r: r['checked_at'], reverse=True)
e = lambda value: escape(str(value or ''), quote=True)

def item_html(item):
    url = item['source']
    if urlsplit(url).scheme != 'https' or not urlsplit(url).hostname:
        raise ValueError('Research sources must be HTTPS URLs')
    change = item['change']
    if change not in {'baseline', 'new', 'changed', 'unchanged', 'expired', 'inaccessible'}:
        raise ValueError('Unknown change classification')
    return f'''<article data-change="{e(change)}"><div class="row"><span class="pill {e(change)}">{e(change.title())}</span><span class="muted">Checked {e(item['checked_date'])}</span></div><h3>{e(item['builder'])}</h3><p class="muted">{e(item['community'])}</p><h4>{e(item['offer'])}</h4><p>{e(item['details'])}</p><p class="evidence">{e(item['evidence'])}</p><div class="row bottom"><span>{e(item.get('deadline') or 'Deadline not stated')}</span><a href="{e(url)}" target="_blank" rel="noopener noreferrer">{e(item['source_name'])} ↗</a></div></article>'''

latest = reports[0]
cards = ''.join(item_html(i) for i in latest['items'])
history = ''.join(f'<details><summary>{e(r["checked_at"])} · {len(r["items"])} records</summary><p>{e(r["summary"])}</p><div class="grid">'+''.join(item_html(i) for i in r['items'])+'</div></details>' for r in reports[1:])
page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Charlotte Builder Incentive Updates | Daily Review</title><link rel="canonical" href="https://charlotte-builder-deals.vercel.app/daily-review.html"><meta name="description" content="Daily Charlotte new construction incentive updates, including builder rate changes, closing-cost offers, deadlines, and source verification notes."><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="googlebot" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="theme-color" content="#07152f"><meta property="og:type" content="website"><meta property="og:site_name" content="Charlotte Builder Deals"><meta property="og:title" content="Charlotte Builder Incentive Updates | Daily Review"><meta property="og:description" content="Daily Charlotte-area new construction incentive changes, deadlines, and verification notes."><meta property="og:url" content="https://charlotte-builder-deals.vercel.app/daily-review.html"><meta name="twitter:card" content="summary"><script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","@id":"https://charlotte-builder-deals.vercel.app/daily-review.html#webpage","url":"https://charlotte-builder-deals.vercel.app/daily-review.html","name":"Charlotte Builder Incentive Updates | Daily Review","description":"Daily Charlotte new construction incentive updates, builder rate changes, deadlines, and source verification notes.","isPartOf":{"@id":"https://charlotte-builder-deals.vercel.app/#website"},"dateModified":"REPORT_LASTMOD","inLanguage":"en-US"}</script><style>
:root{color-scheme:light;--ink:#07152f;--muted:#5a6980;--line:#d9e0ec;--lime:#d7f263}*{box-sizing:border-box}body{margin:0;background:#f5f8fc;color:var(--ink);font:16px/1.5 system-ui,sans-serif}a{color:inherit}nav{background:white;border-bottom:1px solid var(--line);padding:20px max(20px,calc((100% - 1160px)/2));display:flex;justify-content:space-between;gap:20px}nav a{text-decoration:none;font-weight:750}header{background:var(--ink);color:white;padding:36px max(20px,calc((100% - 1160px)/2))}h1{font-size:clamp(2rem,5vw,3.4rem);letter-spacing:-.045em;line-height:1.1;margin:12px 0}header p{max-width:800px;color:#cbd5eb}header small{color:var(--lime)}main{max-width:1200px;margin:auto;padding:28px 20px 70px}.summary{background:#e8f4fd;border-radius:12px;padding:20px;margin:0 0 22px}.toolbar{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:18px;flex-wrap:wrap}select{font:inherit;padding:10px;border:1px solid var(--line);border-radius:8px;background:white}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}article{background:white;border:1px solid var(--line);border-radius:14px;padding:22px}h3{font-size:1.25rem;margin:14px 0 0}h4{font-size:1.15rem;margin:16px 0 8px}p{margin:7px 0 14px}.muted{color:var(--muted);font-size:.875rem}.row{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.pill{padding:4px 8px;border-radius:6px;background:#edf1f7;font-size:.875rem;font-weight:750}.new{background:#e7f4ec;color:#14643c}.changed{background:#e4edff;color:#254b97}.expired,.inaccessible{background:#fff0d8;color:#76500d}.evidence{font-size:.875rem;color:var(--muted)}.bottom{border-top:1px solid var(--line);padding-top:14px;font-size:.875rem}.bottom a{font-weight:700;overflow-wrap:anywhere}details{margin:16px 0}summary{cursor:pointer;font-weight:700;padding:14px 0}footer{text-align:center;padding:22px;border-top:1px solid var(--line);color:var(--muted);font-size:.875rem}:focus-visible{outline:3px solid #5c83d2;outline-offset:4px}[hidden]{display:none!important}@media(max-width:700px){.grid{grid-template-columns:1fr}nav{font-size:.875rem}article{padding:18px}}
</style><link rel="stylesheet" href="/review-design.css"></head><body><nav><a href="/">Charlotte Builder Deals</a><a href="/">Back to offers</a></nav><header><small>DAILY RESEARCH AGENT</small><h1>Your morning deal review.</h1><p>New incentives, changed terms, approaching deadlines, and evidence that needs a closer look.</p><p>Scheduled each morning around 8 a.m. Eastern. Completed findings appear here, with a summary in ChatGPT.</p></header><main>'''
page += f'<section class="summary"><strong>Last completed research: {e(latest["checked_at"])}</strong><p>{e(latest["summary"])}</p><small>These are public-source research findings for review. Adding a finding here does not update the main offer comparison.</small></section>'
page += '<div class="toolbar"><h2>Latest findings</h2><label>Show <select id="filter"><option value="">All findings</option><option value="new">New</option><option value="changed">Changed</option><option value="expired">Expired</option><option value="inaccessible">Access / evidence gaps</option><option value="unchanged">Unchanged</option><option value="baseline">Initial baseline</option></select></label><span id="count" aria-live="polite"></span></div>'
page += '<div class="grid" id="findings">'+cards+'</div><p id="empty" hidden>No findings in this category for this report.</p>'
page += '<section><h2>Previous reports</h2>'+ (history or '<p class="muted">Today’s research is the starting baseline. Future completed runs will appear here.</p>')+'</section></main><footer>Charlotte Builder Deals · Public research · Verify terms with the builder and lender.</footer>'
page += '''<script>const filter=document.querySelector('#filter');function render(){let n=0;document.querySelectorAll('#findings article').forEach(c=>{c.hidden=!!filter.value&&c.dataset.change!==filter.value;if(!c.hidden)n++});document.querySelector('#count').textContent=n+' findings';document.querySelector('#empty').hidden=n>0}filter.addEventListener('change',render);render();</script></body></html>'''
lastmod = latest['checked_at'][:10]
page = page.replace('REPORT_LASTMOD', e(lastmod))
(ROOT / 'dist/daily-review.html').write_text(page)

if '--refresh-comparison' not in sys.argv:
    print(f'Rendered {len(latest["items"])} findings; {len(reports)} preserved reports; public comparison untouched')
    raise SystemExit(0)

index_path = ROOT / 'dist/index.html'
index = index_path.read_text()
index = re.sub(
    r'<a href="https://www\.truehomesusa\.com/"[^>]*><b>True Homes</b><br><small>.*?</small></a>',
    '',
    index,
)
index = re.sub(
    r'<a href="https://www\.davidweekleyhomes\.com/new-homes/nc/charlotte"[^>]*><b>David Weekley Homes</b><br><small>.*?</small></a>',
    '',
    index,
)
index = re.sub(
    r'<a href="https://www\.pulte\.com/homes/north-carolina/charlotte"[^>]*><b>Pulte Homes</b><br><small>.*?</small></a>',
    '',
    index,
)
index = re.sub(
    r'<a href="https://www\.mihomes\.com/incentives"[^>]*><b>M/I Homes</b><br><small>.*?</small></a>',
    '',
    index,
)
index = re.sub(
    r'<a href="https://www\.eastwoodhomes\.com/special-offers"[^>]*><b>Eastwood Homes</b><br><small>.*?</small></a>',
    '',
    index,
)
if 'id="coverage-drh"' not in index:
    drh_tile = '<a id="coverage-drh" href="https://www.drhorton.com/north-carolina/charlotte" target="_blank" rel="noopener" style="padding:13px;border:1px solid var(--line);border-radius:9px;text-decoration:none"><b>D.R. Horton</b><br><small>Current Charlotte offer terms could not be re-verified</small></a>'
    index = index.replace(
        '<a href="https://www.eastwoodhomes.com/special-offers"',
        drh_tile + '<a href="https://www.eastwoodhomes.com/special-offers"',
    )
index = re.sub(
    r'(<a id="coverage-drh"[^>]*>.*?<b>D\.R\. Horton</b><br><small>).*?(</small></a>)',
    r'\g<1>30 communities verified · official inventory pages conflict at 245–249 homes; regional page shows 336\g<2>',
    index,
    count=1,
    flags=re.S,
)
reviewed = latest_offers['reviewed']
reviewed_human = datetime.strptime(reviewed, '%Y-%m-%d').strftime('%B %-d, %Y')
deals_json = json.dumps(latest_offers['offers'], ensure_ascii=False)

def is_expired(offer):
    return offer.get('kind') != 'official' or bool(offer.get('end') and offer['end'] < reviewed)

def offer_badge(offer):
    labels = {'rate': 'Financing', 'closing': 'Closing costs', 'price': 'Price savings', 'upgrade': 'Upgrades / package'}
    return ' · '.join(labels[tag] for tag in offer.get('tags', []) if tag in labels) or 'Builder update'

def offer_card(offer, index):
    coverage = '' if offer.get('tags') else ' coverageCard'
    deadline_type = offer.get('deadlineType', 'Offer deadline')
    deadline = f"{deadline_type}: {offer['end']}" if offer.get('end') else f'{deadline_type}: Not stated'
    return (
        f'<article id="offer-{e(offer["id"])}" class="card{coverage}">'
        f'<div class="cardTop"><span class="badge">{e(offer_badge(offer))}</span><h3>{e(offer["b"])}</h3>'
        f'<div class="place">{e(offer["c"])} · {e(offer["city"])}</div></div>'
        f'<div class="offer">{e(offer["offer"])}</div><div class="terms">{e(offer["terms"])}</div>'
        f'<div class="meta">Checked {e(offer["checked"])} · {e(deadline)}</div>'
        f'<div class="source"><a href="{e(offer["source"])}" target="_blank" rel="noopener noreferrer">'
        f'View {e(offer["sourceName"])} source</a></div>'
        f'<button class="details" data-id="{index}">View eligibility &amp; sources</button></article>'
    )

active_offers = [(index, offer) for index, offer in enumerate(latest_offers['offers']) if not is_expired(offer)]
server_cards = ''.join(offer_card(offer, index) for index, offer in active_offers)

# Build a source-backed location switcher from exact addresses that builders
# publish with their communities. The Google Maps links remain available even
# when the embedded preview is blocked by a browser's privacy settings.
map_pins = []
seen_pins = set()
builder_colors = {
    'Meritage Homes': '#2563eb',
    'Smith Douglas Homes': '#dc2626',
    'David Weekley Homes': '#0f766e',
    'D.R. Horton': '#7c3aed',
    'Taylor Morrison': '#d97706',
    'True Homes': '#059669',
}
for offer in latest_offers['offers']:
    for source in offer.get('extraSources', []):
        if source.get('name') != 'Google Maps directions':
            continue
        query = parse_qs(urlsplit(source['url']).query).get('query', [''])[0]
        community = source.get('community') or offer['c'].split(' · ')[0]
        key = (offer['b'], community, query)
        if not query or key in seen_pins:
            continue
        seen_pins.add(key)
        map_pins.append({
            'builder': offer['b'],
            'community': community,
            'address': query,
            'url': source['url'],
            'color': builder_colors.get(offer['b'], '#64748b'),
        })
map_pins.sort(key=lambda pin: (pin['builder'], pin['community']))
pin_buttons = ''.join(
    f'<button class="mapPin" type="button" data-map-query="{e(pin["address"])}" style="text-align:left;border:1px solid var(--line);border-left:6px solid {e(pin["color"])};background:#f8fafc;border-radius:9px;padding:12px;color:var(--ink)"><b style="display:block">{e(pin["community"])}</b><small style="display:block;color:var(--muted);margin-top:3px">{e(pin["builder"])} · {e(pin["address"])}</small></button>'
    for pin in map_pins
)
pin_links = ''.join(
    f'<a href="{e(pin["url"])}" target="_blank" rel="noopener noreferrer">{e(pin["community"])} ↗</a>'
    for pin in map_pins
)
map_section = (
    '<section id="community-map" style="margin-top:24px;background:white;border:1px solid var(--line);border-radius:16px;padding:27px">'
    '<span class="sectionKicker">SOURCE-BACKED LOCATIONS</span><h2 style="margin:5px 0 8px;letter-spacing:-.04em">Community map updates.</h2>'
    '<p style="margin:0 0 18px;color:#42516b">Choose a community to center the map on its exact builder-published address. Charlotte remains the starting hub.</p>'
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:18px">'
    f'<div class="mapPinList" style="display:grid;gap:9px;align-content:start">{pin_buttons}</div>'
    '<iframe id="builderMap" title="Charlotte-area builder community map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
    'src="https://www.google.com/maps?q=Charlotte%2C%20NC&amp;output=embed" style="border:0;width:100%;min-height:420px;border-radius:12px" allowfullscreen></iframe>'
    '</div><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:14px">'
    f'{pin_links}<a href="https://homefinder.truehomesusa.com/" target="_blank" rel="noopener noreferrer">True Homes neighborhood map ↗</a>'
    '</div></section>'
)
schema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebSite',
            '@id': 'https://charlotte-builder-deals.vercel.app/#website',
            'url': 'https://charlotte-builder-deals.vercel.app/',
            'name': 'Charlotte Builder Deals',
            'description': 'A buyer-first comparison of Charlotte-area new construction homes, builder incentives, and financing offers.',
            'inLanguage': 'en-US',
        },
        {
            '@type': 'WebPage',
            '@id': 'https://charlotte-builder-deals.vercel.app/#webpage',
            'url': 'https://charlotte-builder-deals.vercel.app/',
            'name': 'Charlotte New Construction Homes & Builder Incentives',
            'description': 'Find Charlotte new construction homes and compare builder mortgage rates, closing-cost credits, price reductions, and quick move-in deals.',
            'isPartOf': {'@id': 'https://charlotte-builder-deals.vercel.app/#website'},
            'about': [
                {'@type': 'Thing', 'name': 'New construction homes'},
                {'@type': 'Thing', 'name': 'Home builder incentives'},
                {'@type': 'Place', 'name': 'Charlotte metropolitan area'},
            ],
            'audience': {'@type': 'Audience', 'audienceType': 'New construction home buyers'},
            'inLanguage': 'en-US',
            'dateModified': reviewed,
        },
        {
            '@type': 'ItemList',
            'name': 'Charlotte-area home builder incentives',
            'numberOfItems': len(active_offers),
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': position,
                    'name': f'{offer["b"]} · {offer["c"]}',
                    'url': f'https://charlotte-builder-deals.vercel.app/#offer-{offer["id"]}',
                }
                for position, (_, offer) in enumerate(active_offers, 1)
            ],
        },
    ],
}
index = re.sub(
    r'<script type="application/ld\+json">.*?</script>',
    '<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False, separators=(',', ':')) + '</script>',
    index,
    count=1,
    flags=re.S,
)
index = re.sub(r'<section id="community-map".*?</section>', '', index, flags=re.S)
index = index.replace(
    '<section id="coverage"',
    map_section + '<section id="coverage"',
    1,
)
index = re.sub(
    r'(<section class="deals" id="cards" aria-label="Builder offers">).*?(</section></div>)',
    r'\1' + server_cards + r'\2',
    index,
    count=1,
    flags=re.S,
)
index = re.sub(r'const RESEARCH_DATE="[^"]+";', f'const RESEARCH_DATE="{reviewed}";', index)
index = re.sub(r'const deals=\[.*?\];\nconst \$=', f'const deals={deals_json};\nconst $=', index, flags=re.S)
index = re.sub(r'Reviewed [A-Z][a-z]+ \d{1,2}, 2026', f'Reviewed {reviewed_human}', index)
index = re.sub(
    r'<b id="dealCount">\d+</b><span>[^<]+</span>',
    f'<b id="dealCount">{sum(o.get("kind") == "official" and bool(o.get("tags")) and (not o.get("end") or o["end"] >= reviewed) for o in latest_offers["offers"])}</b><span>published offers</span>',
    index,
)
index = index.replace('Realtor reports and social excerpts remain unconfirmed. Missing deadlines stay labeled; expired offers are hidden by default.', 'Only current official builder pages and public builder listings appear in the live comparison. Missing terms stay labeled unavailable; expired offers are hidden by default.')
index = index.replace('Source-linked offers and leads. Check each deadline and evidence label.', 'Current builder-source offers only. Check each deadline and eligibility label.')
index = index.replace('offers and leads · researched', 'verified offers · researched')
map_script = """<script id="community-map-script">document.addEventListener('click',event=>{const button=event.target.closest('.mapPin');if(!button)return;document.querySelectorAll('.mapPin').forEach(pin=>pin.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');document.querySelector('#builderMap').src='https://www.google.com/maps?q='+encodeURIComponent(button.dataset.mapQuery)+'&output=embed';});</script>"""
index = re.sub(r'<script id="community-map-script">.*?</script>', '', index, flags=re.S)
index = index.replace('</body>', map_script + '</body>', 1)
index_path.write_text(index)

(ROOT / 'dist/sitemap.xml').write_text(f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://charlotte-builder-deals.vercel.app/</loc><lastmod>{lastmod}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://charlotte-builder-deals.vercel.app/daily-review.html</loc><lastmod>{lastmod}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>https://charlotte-builder-deals.vercel.app/compare-townhomes.html</loc><lastmod>{lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>
''')
print(f'Rendered {len(latest["items"])} findings, {len(latest_offers["offers"])} live offers; {len(reports)} report(s)')
