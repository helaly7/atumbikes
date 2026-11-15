// Builds one real page per bike at /bikes/<id>/index.html, plus sitemap.xml.
//
// index.html stays the single source: bike data, styles and scripts all live there.
// After you change a bike (name, photos, parts, description...) run:
//
//     node tools/build-bike-pages.mjs
//
// and commit the updated bikes/ folder, sitemap.xml and any new images/*-360.jpg and
// images/*-700.jpg files together with index.html.
//
// Each bike page is a copy of index.html with its own <title>, description,
// canonical URL, social preview (og:*) and structured data, and with the bike's
// content already in the HTML, so search engines and link previews see it
// without running JavaScript. In the browser the same script takes over as usual.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://atumbikes.com';
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// ---------------------------------------------------------------- run the page script with a stub DOM
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length !== 1) throw new Error(`expected one inline <script>, found ${scripts.length}`);
const logoSrc = (html.match(/<a class="logo"[^>]*><img[^>]*src="([^"]+)"/) || [])[1] || '';

function stub(store = {}) {
  return new Proxy(function () {}, {
    get(t, k) {
      if (k === Symbol.toPrimitive) return () => '';
      if (k === Symbol.iterator) return [][Symbol.iterator];
      if (k === 'then') return undefined;
      if (k === 'querySelectorAll') return () => [];
      if (k in store) return store[k];
      return (store[k] = stub());
    },
    set(t, k, v) { store[k] = v; return true; },
    apply() { return stub(); },
    construct() { return stub(); },
  });
}
const els = {};
const getEl = sel => (els[sel] ||= sel === '.logo img' ? { src: logoSrc } : stub({ innerHTML: '', hidden: false, dataset: {} }));
const sandbox = {
  document: {
    querySelector: getEl, getElementById: id => getEl('#' + id), querySelectorAll: () => [],
    addEventListener() {}, title: '', hidden: false,
  },
  location: { hash: '', pathname: '/', replace() {}, href: SITE + '/' },
  addEventListener() {}, scrollTo() {}, setInterval() { return 0; }, clearInterval() {}, setTimeout() { return 0; },
  matchMedia: () => ({ matches: true }), Image: function () {}, history: stub(), console,
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(
  scripts[0] + '\n;globalThis.__site={BIKES,IMGS,renderBike,bp:document.querySelector("#bikepage")};',
  sandbox, { filename: 'index.html <script>' },
);
const { BIKES, IMGS, renderBike, bp } = sandbox.__site;

// ---------------------------------------------------------------- helpers
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = p => (/^https?:/.test(p) ? p : SITE + (p.startsWith('/') ? p : '/' + p));
const KIND = { MTB: 'mountain bike', Road: 'road bike', Gravel: 'gravel bike', Hybrid: 'hybrid bike', City: 'city bike' };
function short(text, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = cut.lastIndexOf('. ');
  return stop > 80 ? cut.slice(0, stop + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
}
function setTag(doc, re, tag, what) {
  if (!re.test(doc)) throw new Error(`index.html: could not find ${what}`);
  return doc.replace(re, () => tag);
}

// The home page sections are not needed on bike pages; keep only the empty
// containers the script fills in, so it runs unchanged.
const homeShell = '<main id="top" hidden><div id="heroBike"></div><div id="chips"></div><div id="grid"></div>'
  + '<div id="gal"></div><div id="jchips"></div><div id="jbody"></div></main>';

// ---------------------------------------------------------------- one page per bike
rmSync(join(ROOT, 'bikes'), { recursive: true, force: true });
const urls = [];
for (const b of BIKES) {
  const url = `${SITE}/bikes/${b.id}/`;
  const kind = KIND[b.cat] || 'bike';
  const title = `${b.name} ${kind} | ATUM Bikes`;
  const sizes = (b.sizes || []).join(' and ');
  const raw = (b.desc || '').includes(': ') ? b.desc.slice(b.desc.indexOf(': ') + 2) : (b.desc || '');
  const intro = raw.charAt(0).toUpperCase() + raw.slice(1);
  const lead = `${b.name} ${kind} from ATUM Bikes, Egypt.`;
  const tail = sizes ? ` Size${b.sizes.length > 1 ? 's' : ''} ${sizes}.` : '';
  const desc = short(`${lead} ${short(intro, Math.max(40, 158 - lead.length - tail.length - 2))}${tail}`.replace(/\s+/g, ' ').trim());
  const photos = (b.photos || []).map(i => abs(IMGS[i]));
  const image = photos[0] || `${SITE}/images/og.jpg`;

  renderBike(b);
  const body = bp.innerHTML;
  if (!body || !body.includes(b.name)) throw new Error(`renderBike produced nothing for ${b.id}`);

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Product', name: b.name, url, image: photos.length ? photos : [image],
      description: b.desc, category: `${b.cat} bicycles`, brand: { '@type': 'Brand', name: 'ATUM' },
      ...(b.colors ? { color: b.colors.map(c => c.n).join(', ') } : {}),
      ...(b.sizes ? { size: b.sizes.join(', ') } : {}),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'All bikes', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: b.cat, item: `${SITE}/#cat-${b.cat.toLowerCase()}` },
        { '@type': 'ListItem', position: 3, name: b.name, item: url },
      ],
    },
  ];
  const ldTag = `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`;

  let doc = html;
  doc = setTag(doc, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, '<title>');
  doc = setTag(doc, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`, 'meta description');
  doc = setTag(doc, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(b.name + ' | ATUM Bikes')}">`, 'og:title');
  doc = setTag(doc, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`, 'og:description');
  doc = setTag(doc, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`, 'canonical');
  doc = setTag(doc, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`, 'og:url');
  doc = setTag(doc, /<meta property="og:type" content="[^"]*">/, '<meta property="og:type" content="product">', 'og:type');
  doc = setTag(doc, /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${esc(image)}">\n<meta property="og:image:alt" content="${esc(b.name + ', ' + kind)}">`, 'og:image');
  doc = doc.replace('</head>', () => `${ldTag}\n</head>`);
  doc = setTag(doc, /<a class="skip" href="#top">/, '<a class="skip" href="#bikepage">', 'skip link');
  doc = setTag(doc, /<main id="top">[\s\S]*?<\/main>\s*<main id="bikepage" hidden><\/main>/,
    `${homeShell}\n<main id="bikepage">${body}</main>`, 'the two <main> elements');

  const out = join(ROOT, 'bikes', b.id, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, doc);
  urls.push(url);
}

// ---------------------------------------------------------------- smaller photo copies
// The page asks for <name>-360.jpg and <name>-700.jpg next to every 1000 px photo in
// IMGS (see SRC() in index.html). Make any that are missing. Needs sharp the first
// time a new photo is added:  npm install sharp
const missing = [];
for (const src of new Set(IMGS)) {
  if (!src.endsWith('.jpg')) continue;
  for (const w of [360, 700]) {
    const out = join(ROOT, src.replace(/\.jpg$/, `-${w}.jpg`));
    if (!existsSync(out)) missing.push([join(ROOT, src), out, w]);
  }
}
if (missing.length) {
  let sharp;
  try { sharp = createRequire(import.meta.url)('sharp'); }
  catch { throw new Error(`${missing.length} smaller photo copies are missing and sharp is not installed. Run: npm install sharp`); }
  for (const [from, to, w] of missing) {
    await sharp(from).resize({ width: w }).jpeg({ quality: 80, mozjpeg: true }).toFile(to);
  }
  console.log(`Made ${missing.length} smaller photo copies`);
}

// ---------------------------------------------------------------- sitemap
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${SITE}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>
${urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
if (!existsSync(join(ROOT, 'CNAME'))) console.warn('note: no CNAME file found');
console.log(`Built ${urls.length} bike pages and sitemap.xml`);
