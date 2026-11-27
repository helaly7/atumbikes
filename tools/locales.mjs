// Translated home pages (/ar/, /es/ …) and the language menu — used by build-bike-pages.mjs.
//
// Each language is one file in tools/locales/ holding only its wording (and, for
// Arabic, its RTL font and CSS). The layout below is shared: hero with the same
// rotating bike slideshow as the English home, every bike grouped by category
// with a translated description (cards link to the English bike pages), contact
// and footer. Bike names, photos, sizes and order come from BIKES in index.html.
//
// To add a language: copy tools/locales/es.mjs, translate it, and add it to
// LOCALES below. The build then writes its page, adds it to the sitemap, the
// hreflang tags and the language menu on every page.

import ar from './locales/ar.mjs';
import es from './locales/es.mjs';

export const LOCALES = [ar, es];

// Order in the language menu.
const MENU = [{ code: 'en', path: '/', name: 'English', short: 'EN' }, ...LOCALES];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const GLOBE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.8 5.7 3.8 9s-1.2 6.3-3.8 9c-2.6-2.7-3.8-5.7-3.8-9S9.4 5.7 12 3z"/></g></svg>';

// The language dropdown. <details> opens and closes without script; LANG_JS
// only adds closing on an outside click or Escape.
export function langMenu(current, label = 'Language') {
  const cur = MENU.find(l => l.code === current) || MENU[0];
  return `<details class="lng"><summary aria-label="${esc(label)}: ${esc(cur.name)}">${GLOBE}<span>${esc(cur.short)}</span><span class="car" aria-hidden="true">▾</span></summary><ul>`
    + MENU.map(l => `<li><a href="${l.path}" lang="${l.code}" hreflang="${l.code}"${l.code === current ? ' aria-current="page"' : ''}>${esc(l.name)}</a></li>`).join('')
    + '</ul></details>';
}
export const LANG_JS = "document.addEventListener('click',e=>{document.querySelectorAll('details.lng[open]').forEach(d=>{if(!d.contains(e.target))d.open=false})});document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('details.lng[open]').forEach(d=>{d.open=false;d.querySelector('summary').focus()})});";

// <link rel="alternate"> for the home page in every language.
export const hreflangLinks = SITE => [`<link rel="alternate" hreflang="en" href="${SITE}/">`]
  .concat(LOCALES.map(L => `<link rel="alternate" hreflang="${L.code}" href="${SITE}${L.path}">`))
  .concat(`<link rel="alternate" hreflang="x-default" href="${SITE}/">`).join('\n') + '\n';

// Layout pieces every translated page adds on top of the English stylesheet.
const SHARED_CSS = `
.tnav{display:flex;align-items:center;gap:18px;font-size:16px}
.tnav>a{color:var(--muted);text-decoration:none;padding:11px 2px;white-space:nowrap}
.tnav>a:hover{color:var(--ink)}
@media (max-width:639px){.tnav{gap:12px;font-size:15px}.tnav .hide-s{display:none}}
.tcats{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 8px}
.tcats a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1px solid var(--line);border-radius:999px;color:var(--ink);text-decoration:none}
.tcats a:hover{border-color:var(--ink)}
.tcat{padding-top:36px;scroll-margin-top:84px}
.tcat h3{font-size:24px;margin:0 0 18px}
.tcat h3 small{color:var(--muted);font-weight:500;font-size:15px;margin-inline-start:8px}
.card .desc{color:var(--muted);font-size:15px;margin:8px 0 0}
.card .more{display:inline-block;margin-top:8px;font-size:14px;font-weight:600;color:var(--link)}
.note{color:var(--muted);font-size:15px;margin-top:18px}
`;

export function buildLocale(L, { html, BIKES, IMGS, SITE, logoSrc }) {
  const missing = BIKES.filter(b => !L.bikes[b.id]).map(b => b.id);
  if (missing.length) console.warn(`${L.code}: no text for ${missing.join(', ')} — using English. Add them to tools/locales/${L.code}.mjs`);

  const style = (html.match(/<style>[\s\S]*?<\/style>/) || [''])[0].replace('</style>', SHARED_CSS + L.css + '</style>');
  const fonts = (html.match(/<link[^>]+fonts\.googleapis\.com\/css2[^>]*>/) || [''])[0];
  const preconnect = [...html.matchAll(/<link rel="preconnect"[^>]*>/g)].map(m => m[0]).join('\n');
  const contact = (html.match(/<section id="contact">[\s\S]*?<\/section>/) || [''])[0];
  const svgOf = name => (contact.match(new RegExp(`(<svg(?:(?!<svg)[\\s\\S])*?<\\/svg>)<span class="sr">${name}`)) || [, ''])[1];
  const catName = c => L.cat[c] || c;
  const catOne = c => L.catOne(catName(c));

  const img = (i, alt, sizes) => {
    const p = IMGS[i];
    if (!p.endsWith('.jpg')) return `<img src="${p.replace(/\.webp$/, '-poster.jpg')}" alt="${esc(alt)}" loading="lazy">`;
    const b = p.replace(/\.jpg$/, '');
    return `<img src="${p}" srcset="${b}-360.jpg 360w, ${b}-700.jpg 700w, ${p} 1000w" sizes="${sizes}" alt="${esc(alt)}" loading="lazy">`;
  };

  const card = b => {
    const t = L.bikes[b.id] || { sub: b.sub || '', desc: b.desc || '' };
    return `<a class="card" href="/bikes/${b.id}/"><div class="pic ph">${b.photos ? img(b.photos[0], `${b.name} — ${catOne(b.cat)}`, '(max-width:760px) 92vw, 380px') : ''}</div>`
      + `<div class="meta"><h3 lang="en">${esc(b.name)}</h3><span class="price">${L.price}</span></div>`
      + `<p class="cat">${esc(t.sub)}. ${L.sizes}: ${b.sizes.map(L.size).join(L.sep)}</p>`
      + `<p class="desc">${esc(t.desc)}</p><span class="more">${L.more}</span></a>`;
  };

  const cats = ['MTB', 'Road', 'Gravel', 'Hybrid', 'City'].filter(c => BIKES.some(b => b.cat === c));
  const sections = cats.map(c => {
    const list = BIKES.filter(b => b.cat === c);
    return `<div class="tcat" id="cat-${c.toLowerCase()}"><h3>${catName(c)} <small>${L.models(list.length)}</small></h3><div class="grid">${list.map(card).join('')}</div></div>`;
  }).join('\n');

  // Hero slideshow: same bikes and order as the English home page (HO there).
  const HO = ['pulse', 'gravity', 'phantom', 'gravel'];
  const HB = BIKES.filter(b => b.photos && b.photos.length)
    .sort((p, q) => { const i = HO.indexOf(p.id), j = HO.indexOf(q.id); return (i < 0 ? HO.length : i) - (j < 0 ? HO.length : j); });
  const hb0 = HB[0];
  const slides = `<a class="hs" id="hsLink" href="/bikes/${hb0.id}/"><img class="hs-a on" src="${IMGS[hb0.photos[0]]}" alt="ATUM ${esc(hb0.name)}"><img class="hs-b" alt=""><span class="hs-cap"><span id="hsName">${esc(hb0.name)}</span><small id="hsCat">${catOne(hb0.cat)}</small></span></a>`
    + `<div class="hs-dots" role="tablist" aria-label="${L.featured}">${HB.map((b, i) => `<button role="tab" aria-label="${esc(b.name)}" aria-selected="${i === 0}" data-i="${i}"></button>`).join('')}</div>`;
  const script = `(function(){const HB=${JSON.stringify(HB.map(b => [b.id, b.name, catOne(b.cat), IMGS[b.photos[0]]]))};`
    + `const el=document.getElementById('heroBike'),A=el.querySelector('.hs-a'),B=el.querySelector('.hs-b'),dots=[...el.querySelectorAll('.hs-dots button')];let front=A,back=B,hi=0,tm;`
    + `function show(i){hi=(i+HB.length)%HB.length;const b=HB[hi];back.src=b[3];back.alt='ATUM '+b[1];back.onload=()=>{back.classList.add('on');front.classList.remove('on');[front,back]=[back,front]};`
    + `document.getElementById('hsName').textContent=b[1];document.getElementById('hsCat').textContent=b[2];document.getElementById('hsLink').href='/bikes/'+b[0]+'/';dots.forEach((d,n)=>d.setAttribute('aria-selected',n===hi))}`
    + `const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;function stop(){clearInterval(tm)}function start(){if(rm)return;stop();tm=setInterval(()=>show(hi+1),3000)}`
    + `el.onmouseenter=stop;el.onmouseleave=start;el.addEventListener('focusin',stop);el.addEventListener('focusout',start);`
    + `el.querySelector('.hs-dots').onclick=e=>{const i=e.target.dataset.i;if(i!=null){show(+i);start()}};`
    + `document.addEventListener('visibilitychange',()=>document.hidden?stop():start());start()})();` + LANG_JS;

  const url = SITE + L.path;
  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: L.listName, inLanguage: L.code,
    itemListElement: BIKES.map((b, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/bikes/${b.id}/`, name: b.name })),
  };

  return `<!DOCTYPE html>
<html lang="${L.code}"${L.dir === 'rtl' ? ' dir="rtl"' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(L.title)}</title>
<meta name="description" content="${esc(L.desc(BIKES.length))}">
<meta name="theme-color" content="#1E4CA2">
<link rel="canonical" href="${url}">
${hreflangLinks(SITE)}<meta property="og:title" content="${esc(L.ogTitle)}">
<meta property="og:description" content="${esc(L.ogDesc)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${L.ogLocale}">
<meta property="og:image" content="${SITE}/images/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/images/img00-a1500afe.png">
<link rel="apple-touch-icon" href="/images/img01-1beb9f46.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${preconnect}
${fonts}
${L.fontLink}
${style}
</head>
<body>
<a class="skip" href="#top">${L.skip}</a>
<header><div class="wrap"><a class="logo" href="${L.path}" aria-label="${esc(L.home)}"><img src="${logoSrc}" alt="ATUM" width="380" height="149"></a>
<nav class="tnav" aria-label="${esc(L.navLabel)}"><a href="#bikes">${L.nav.bikes}</a><a href="/where-to-buy/">${L.nav.buy}</a><a class="hide-s" href="#contact">${L.nav.contact}</a>${langMenu(L.code, L.langLabel)}</nav></div></header>

<main id="top">
<div class="wrap hero">
<h1>${L.h1}</h1>
<div class="hero-art"><p>${L.heroP}</p><a class="btn hero-cta" href="#bikes">${L.heroCta}</a><div id="heroBike">${slides}</div></div>
</div>

<section id="bikes"><div class="wrap">
<h2>${L.rangeH}</h2>
<p class="lede">${L.rangeLede}</p>
<nav class="tcats" aria-label="${esc(L.catsLabel)}">${cats.map(c => `<a href="#cat-${c.toLowerCase()}">${catName(c)}</a>`).join('')}</nav>
${sections}
<p class="note">${L.note}</p>
</div></section>

<section id="contact"><div class="wrap">
<h2>${L.contactH}</h2>
<p class="lede">${L.contactLede}</p>
<div class="cgrid">
<a class="ccard" href="mailto:atumbikes@gmail.com?subject=${encodeURIComponent(L.mailSubject)}" target="_blank" rel="noopener"><span class="ck">${svgOf('Email')}<span class="sr">${L.sr.email}</span></span><span class="cv">atumbikes@gmail.com</span></a>
<a class="ccard" href="https://www.facebook.com/atumbikesofficial/" target="_blank" rel="noopener"><span class="ck">${svgOf('Facebook')}<span class="sr">${L.sr.fb}</span></span><span class="cv">facebook.com/atumbikesofficial</span></a>
<a class="ccard" href="https://www.instagram.com/atumbikesofficial/" target="_blank" rel="noopener"><span class="ck">${svgOf('Instagram')}<span class="sr">${L.sr.ig}</span></span><span class="cv">@atumbikesofficial</span></a>
<a class="ccard" href="/where-to-buy/"><span class="ck">${svgOf('Warranty')}<span class="sr">${L.sr.buy}</span></span><span class="cv tx">${L.buyCard}</span></a>
</div>
</div></section>
</main>

<footer><div class="wrap"><span>${L.footer1}</span><span>${L.footer2} <a href="mailto:atumbikes@gmail.com" target="_blank" rel="noopener">atumbikes@gmail.com</a></span></div></footer>
<script>${script}</script>
</body>
</html>
`;
}
