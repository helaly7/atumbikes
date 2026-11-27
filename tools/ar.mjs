// Arabic home page at /ar/ — written by build-bike-pages.mjs.
//
// Static page with one small script (the hero slideshow, same bikes and order as the English home): RTL, Arabic font, every bike grouped by
// category with an Arabic description, linking to the English bike pages for
// full specs. Bike names, photos, sizes and order come from BIKES in index.html,
// so a new or renamed bike shows up here on the next build. Only the Arabic
// wording lives in this file: add an entry to AR when a bike is added (the build
// warns if one is missing and falls back to the English description).

export const AR_PATH = '/ar/';

const CAT = {
  MTB: ['دراجات جبلية', 'MTB'],
  Road: ['دراجات طريق', 'Road'],
  Gravel: ['دراجات جرافل', 'Gravel'],
  Hybrid: ['دراجات هايبرد', 'Hybrid'],
  City: ['دراجات مدينة', 'City'],
};
const CAT_ORDER = ['MTB', 'Road', 'Gravel', 'Hybrid', 'City'];

// sub: one line under the name. desc: the paragraph.
const AR = {
  eclipse: {
    sub: 'هايبرد بمجموعة شيمانو 3 × 8 وفرامل تكترو',
    desc: 'دراجة هايبرد مقاس 700C بإطار ألومنيوم 6061 ومقود مستقيم، وناقل حركة شيمانو أسيرا وتورني 3 × 8، وفرامل تكترو كاليبر، ومحاور جوي تك، وستاند جانبي. مريحة للذهاب إلى العمل طوال الأسبوع، وتكفي لجولة طويلة يوم الإجازة. نسخة Eclipse X تضيف شوكة أمامية بمساعد قابل للقفل وفرامل ديسك تكترو M280.',
  },
  'eclipse-x': {
    sub: 'شوكة بمساعد قابل للقفل وفرامل ديسك تكترو M280',
    desc: 'نفس دراجة Eclipse مع شوكة أمامية بمساعد قابل للقفل وفرامل ديسك تكترو M280. باقي المواصفات كما هي: هايبرد 700C بإطار ألومنيوم 6061 ومقود مستقيم وناقل حركة شيمانو أسيرا وتورني 3 × 8.',
  },
  active: {
    sub: 'إطار منخفض سهل الركوب، شوكة بمساعد 110 مم، رفارف',
    desc: 'دراجة مدينة مقاس 26 بوصة بإطار ألومنيوم منخفض، وشوكة بمساعد بمشوار 110 مم، وفرامل ديسك، ورفارف فضية، وإطارات كيندا. الإطار المنخفض يجعل الركوب والنزول سهلًا. متوفرة بأربعة ألوان.',
  },
  storm: {
    sub: 'شيمانو 3 × 8، فرامل ديسك تكترو M280، شوكة بمساعد',
    desc: 'دراجة جبلية مقاس 29 بوصة بإطار ألومنيوم 6061، وشوكة بمساعد مع قفل وضبط للشد المسبق، وناقل حركة شيمانو ألتوس وتورني 3 × 8، وفرامل ديسك تكترو M280، ومحاور جوي تك، وإطارات كيندا. متوفرة بأربعة ألوان.',
  },
  alpha: {
    sub: 'شوكة 110 مم، شيمانو ألتوس 3 × 9، فرامل ديسك هيدروليك',
    desc: 'دراجة جبلية مقاس 29 بوصة بإطار ألومنيوم، وشوكة بمساعد بمشوار 110 مم، وناقل حركة شيمانو ألتوس 3 × 9، وفرامل ديسك هيدروليك، وإطارات كيندا. متوفرة بأربعة ألوان.',
  },
  evo: {
    sub: 'شوكة SR Suntour بمشوار 100 مم، شيمانو أليفيو 3 × 9، فرامل هيدروليك',
    desc: 'دراجة جبلية مقاس 29 بوصة بإطار ألومنيوم 6061 وكابلات داخلية، وشوكة SR Suntour XCM30 بمشوار 100 مم وقفل من المقود، وناقل حركة شيمانو أليفيو 3 × 9، وفرامل ديسك هيدروليك شيمانو MT200، وإطارات كيندا.',
  },
  'evo-pro': {
    sub: '20 سرعة شيمانو ديور، شوكة روك شوكس، فرامل هيدروليك',
    desc: 'دراجة جبلية مقاس 29 بوصة بإطار ألومنيوم 6061 وكابلات داخلية، وشوكة RockShox 30 Silver TK مع قفل Poploc من المقود، وناقل حركة شيمانو ديور 2 × 10، وفرامل ديسك هيدروليك شيمانو MT200، وإطارات كيندا.',
  },
  phantom: {
    sub: 'شيمانو تياجرا 2 × 10، شوكة كربون',
    desc: 'دراجة طريق بإطار ألومنيوم 6061، وشوكة كربون T800، ومجموعة شيمانو تياجرا 2 × 10، وفرامل تكترو كاليبر. متوفرة بلون تركواز مع أصفر أو أحمر مع أبيض. الوزن حوالي 10.9 كجم.',
  },
  'phantom-s': {
    sub: 'شيمانو سورا R3000 ‏2 × 9، شوكة كربون',
    desc: 'دراجة طريق بإطار ألومنيوم 6061 خفيف وكابلات داخلية بالكامل، وشوكة من ألياف الكربون تمتص اهتزازات الطريق، ومجموعة شيمانو سورا R3000 ‏2 × 9، ومحاور بِبلي مغلق، وإطارات كونتيننتال ألترا سبورت.',
  },
  pulse: {
    sub: 'شيمانو كلاريس R2000 ‏2 × 8، إطار طريق ألومنيوم',
    desc: 'دراجة طريق لمن يبدأ في السباقات: إطار ألومنيوم 6061 خفيف بكابلات داخلية، وتغيير سرعات شيمانو كلاريس R2000 بثماني سرعات من مقبض الفرامل، وجنزير أمامي بروويل أونس، وفرامل تكترو R313، وإطارات كيندا 700 × 25c.',
  },
  gravity: {
    sub: 'شيمانو أسيرا 3 × 8، شوكة SR Suntour، فرامل هيدروليك',
    desc: 'دراجة جبلية مقاس 29 بوصة بإطار ألومنيوم 6061 خفيف، وشوكة SR Suntour XCT-30 بقفل من المقود، وناقل حركة شيمانو أسيرا 3 × 8، ومحاور بِبلي مغلق، وفرامل ديسك هيدروليك شيمانو MT200.',
  },
  gravel: {
    sub: 'إطار ألومنيوم 700c، فرامل ديسك، مقود سباق',
    desc: 'دراجة جرافل مقاس 700c بإطار ألومنيوم ومقود سباق (دروب بار) وفرامل ديسك وإطارات كيندا، للأسفلت والطرق الترابية وكل ما بينهما. متوفرة بالأبيض مع الرمادي، أو البرتقالي مع الأسود.',
  },
};

const SIZE = s => s.replace(/″/g, ' بوصة').replace(/ cm$/, ' سم');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Arabic-only additions on top of the English stylesheet.
const RTL_CSS = `
:root{--disp:'Cairo','Archivo',Arial,sans-serif;--body:'Cairo','Instrument Sans',system-ui,Arial,sans-serif}
body{font-family:var(--body);line-height:1.75}
h1,h2,h3{line-height:1.3;letter-spacing:0;font-stretch:normal}
.ar-nav{display:flex;align-items:center;gap:18px;font-size:16px}
.ar-nav a{color:var(--muted);text-decoration:none;padding:11px 2px;white-space:nowrap}
.ar-nav a:hover{color:var(--ink)}
.ar-nav .lang{border:1px solid var(--line);border-radius:999px;padding:6px 12px;color:var(--ink);font-family:'Instrument Sans',system-ui,sans-serif;font-size:14px}
@media (max-width:639px){.ar-nav{gap:12px;font-size:15px}.ar-nav .hide-s{display:none}}
.hero h1{line-height:1.2;font-weight:800;letter-spacing:0;font-stretch:normal}
/* Mirror the English hero: text and button on the right, slideshow on the left */
.hero-art p{left:auto;right:0}
@media (min-width:901px){.hero-cta{left:auto;right:0}}
.hs,.hs-dots{margin-left:0;margin-right:auto}
.hs-dots{justify-content:flex-start}
.hs-cap small{letter-spacing:0;text-transform:none;font-size:14px}
.hs-cap #hsName{direction:ltr;unicode-bidi:isolate}
.ar-cats{display:flex;flex-wrap:wrap;gap:8px;margin:22px 0 8px}
.ar-cats a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1px solid var(--line);border-radius:999px;color:var(--ink);text-decoration:none}
.ar-cats a:hover{border-color:var(--ink)}
.ar-cat{padding-top:36px;scroll-margin-top:84px}
.ar-cat h3{font-size:24px;margin:0 0 18px}
.ar-cat h3 small{color:var(--muted);font-weight:500;font-size:15px;margin-inline-start:8px}
.card{text-align:right}
.card .meta h3{font-family:'Archivo',Arial,sans-serif;direction:ltr;unicode-bidi:isolate}
.card .desc{color:var(--muted);font-size:15px;margin:8px 0 0}
.card .more{display:inline-block;margin-top:8px;font-size:14px;font-weight:600;color:var(--link)}
.ccard .cv{direction:ltr;unicode-bidi:isolate;text-align:right}
.ccard .cv.ar{direction:rtl}
.note{color:var(--muted);font-size:15px;margin-top:18px}
footer .soc{margin-left:0;margin-right:8px}
`;

export function buildArabic({ html, BIKES, IMGS, SITE, logoSrc }) {
  const missing = BIKES.filter(b => !AR[b.id]).map(b => b.id);
  if (missing.length) console.warn(`ar: no Arabic text for ${missing.join(', ')} — using English. Add them to AR in tools/ar.mjs`);

  const style = (html.match(/<style>[\s\S]*?<\/style>/) || [''])[0].replace('</style>', RTL_CSS + '</style>');
  const fonts = (html.match(/<link[^>]+fonts\.googleapis\.com\/css2[^>]*>/) || [''])[0];
  const preconnect = [...html.matchAll(/<link rel="preconnect"[^>]*>/g)].map(m => m[0]).join('\n');
  const arFonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap">';
  const contact = (html.match(/<section id="contact">[\s\S]*?<\/section>/) || [''])[0];
  const svgOf = name => (contact.match(new RegExp(`(<svg(?:(?!<svg)[\\s\\S])*?<\\/svg>)<span class="sr">${name}`)) || [, ''])[1];

  const img = (i, alt, sizes, eager) => {
    const p = IMGS[i];
    if (!p.endsWith('.jpg')) return `<img src="${p.replace(/\.webp$/, '-poster.jpg')}" alt="${esc(alt)}" loading="lazy">`;
    const b = p.replace(/\.jpg$/, '');
    return `<img src="${p}" srcset="${b}-360.jpg 360w, ${b}-700.jpg 700w, ${p} 1000w" sizes="${sizes}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'}>`;
  };

  const card = b => {
    const t = AR[b.id] || { sub: b.sub || '', desc: b.desc || '' };
    const kind = CAT[b.cat] ? CAT[b.cat][0].replace('دراجات', 'دراجة') : b.cat;
    return `<a class="card" href="/bikes/${b.id}/" lang="ar"><div class="pic ph">${b.photos ? img(b.photos[0], `${b.name} — ${kind}`, '(max-width:760px) 92vw, 380px') : ''}</div>`
      + `<div class="meta"><h3 lang="en">${esc(b.name)}</h3><span class="price">اسأل عن السعر</span></div>`
      + `<p class="cat">${esc(t.sub)}. المقاسات: ${b.sizes.map(SIZE).join('، ')}</p>`
      + `<p class="desc">${esc(t.desc)}</p><span class="more">المواصفات الكاملة والصور ←</span></a>`;
  };

  const cats = CAT_ORDER.filter(c => BIKES.some(b => b.cat === c));
  const sections = cats.map(c => {
    const list = BIKES.filter(b => b.cat === c);
    return `<div class="ar-cat" id="cat-${c.toLowerCase()}"><h3>${CAT[c][0]} <small>${list.length} ${list.length > 2 && list.length < 11 ? 'موديلات' : 'موديل'}</small></h3><div class="grid">${list.map(card).join('')}</div></div>`;
  }).join('\n');

  // Hero slideshow: same bikes and order as the English home page.
  const HO = ['pulse', 'gravity', 'phantom', 'gravel'];
  const HB = BIKES.filter(b => b.photos && b.photos.length)
    .sort((p, q) => { const i = HO.indexOf(p.id), j = HO.indexOf(q.id); return (i < 0 ? HO.length : i) - (j < 0 ? HO.length : j); });
  const catOne = c => (CAT[c] ? CAT[c][0].replace('دراجات', 'دراجة') : c);
  const hb0 = HB[0];
  const slides = `<a class="hs" id="hsLink" href="/bikes/${hb0.id}/"><img class="hs-a on" src="${IMGS[hb0.photos[0]]}" alt="ATUM ${esc(hb0.name)}"><img class="hs-b" alt=""><span class="hs-cap"><span id="hsName">${esc(hb0.name)}</span><small id="hsCat">${catOne(hb0.cat)}</small></span></a>`
    + `<div class="hs-dots" role="tablist" aria-label="دراجات مختارة">${HB.map((b, i) => `<button role="tab" aria-label="${esc(b.name)}" aria-selected="${i === 0}" data-i="${i}"></button>`).join('')}</div>`
    + `<script>(function(){const HB=${JSON.stringify(HB.map(b => [b.id, b.name, catOne(b.cat), IMGS[b.photos[0]]]))};`
    + `const el=document.getElementById('heroBike'),A=el.querySelector('.hs-a'),B=el.querySelector('.hs-b'),dots=[...el.querySelectorAll('.hs-dots button')];let front=A,back=B,hi=0,tm;`
    + `function show(i){hi=(i+HB.length)%HB.length;const b=HB[hi];back.src=b[3];back.alt='ATUM '+b[1];back.onload=()=>{back.classList.add('on');front.classList.remove('on');[front,back]=[back,front]};`
    + `document.getElementById('hsName').textContent=b[1];document.getElementById('hsCat').textContent=b[2];document.getElementById('hsLink').href='/bikes/'+b[0]+'/';dots.forEach((d,n)=>d.setAttribute('aria-selected',n===hi))}`
    + `const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;function stop(){clearInterval(tm)}function start(){if(rm)return;stop();tm=setInterval(()=>show(hi+1),3000)}`
    + `el.onmouseenter=stop;el.onmouseleave=start;el.addEventListener('focusin',stop);el.addEventListener('focusout',start);`
    + `el.querySelector('.hs-dots').onclick=e=>{const i=e.target.dataset.i;if(i!=null){show(+i);start()}};`
    + `document.addEventListener('visibilitychange',()=>document.hidden?stop():start());start()})()<\/script>`;
  const url = SITE + AR_PATH;
  const title = 'دراجات أتوم ATUM | دراجات جبلية وطريق وهايبرد بمكونات شيمانو';
  const desc = `أتوم ATUM: ${BIKES.length} موديل دراجات جبلية وطريق وجرافل وهايبرد ومدينة بمكونات شيمانو وضمان مدى الحياة على الإطار. شوف المواصفات والمقاسات والألوان وأماكن البيع في مصر.`;

  const ld = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'دراجات أتوم', inLanguage: 'ar',
    itemListElement: BIKES.map((b, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/bikes/${b.id}/`, name: b.name })),
  };

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#1E4CA2">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ar" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE}/">
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<meta property="og:title" content="دراجات أتوم ATUM">
<meta property="og:description" content="دراجات جبلية وطريق وجرافل وهايبرد ومدينة بمكونات شيمانو.">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ar_EG">
<meta property="og:image" content="${SITE}/images/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/images/img00-a1500afe.png">
<link rel="apple-touch-icon" href="/images/img01-1beb9f46.png">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
${preconnect}
${fonts}
${arFonts}
${style}
</head>
<body>
<a class="skip" href="#top">تخطَّ إلى المحتوى</a>
<header><div class="wrap"><a class="logo" href="${AR_PATH}" aria-label="الصفحة الرئيسية لأتوم"><img src="${logoSrc}" alt="ATUM" width="380" height="149"></a>
<nav class="ar-nav" aria-label="القائمة الرئيسية"><a href="#bikes">الدراجات</a><a href="/where-to-buy/">أماكن البيع</a><a class="hide-s" href="#contact">تواصل معنا</a><a class="lang" href="/" hreflang="en" lang="en">English</a></nav></div></header>

<main id="top">
<div class="wrap hero">
<h1>أتوم |<br>دراجات رائعة<br>لناس رائعين.</h1>
<div class="hero-art"><p>دراجات تجمع بين القوة والأناقة والدقة، مصنوعة بمكونات شيمانو، لطرق الجبال وشوارع المدينة وكل ما بينهما.</p><a class="btn hero-cta" href="#bikes">تصفّح الدراجات</a><div id="heroBike">${slides}</div></div>
</div>

<section id="bikes"><div class="wrap">
<h2>تشكيلة أتوم</h2>
<p class="lede">اختر الفئة، ثم افتح أي دراجة لترى كل المواصفات والصور والألوان.</p>
<nav class="ar-cats" aria-label="الفئات">${cats.map(c => `<a href="#cat-${c.toLowerCase()}">${CAT[c][0]}</a>`).join('')}</nav>
${sections}
<p class="note">صفحات الدراجات التفصيلية (جدول المواصفات والصور) باللغة الإنجليزية حاليًا.</p>
</div></section>

<section id="contact"><div class="wrap">
<h2>تواصل معنا</h2>
<p class="lede">اسأل عن دراجة أو مقاس أو سعر. نرد عبر البريد الإلكتروني وفيسبوك وإنستجرام.</p>
<div class="cgrid">
<a class="ccard" href="mailto:atumbikes@gmail.com?subject=${encodeURIComponent('استفسار عن دراجات أتوم')}" target="_blank" rel="noopener"><span class="ck">${svgOf('Email')}<span class="sr">البريد الإلكتروني</span></span><span class="cv">atumbikes@gmail.com</span></a>
<a class="ccard" href="https://www.facebook.com/atumbikesofficial/" target="_blank" rel="noopener"><span class="ck">${svgOf('Facebook')}<span class="sr">فيسبوك</span></span><span class="cv">facebook.com/atumbikesofficial</span></a>
<a class="ccard" href="https://www.instagram.com/atumbikesofficial/" target="_blank" rel="noopener"><span class="ck">${svgOf('Instagram')}<span class="sr">إنستجرام</span></span><span class="cv">@atumbikesofficial</span></a>
<a class="ccard" href="/where-to-buy/"><span class="ck">${svgOf('Warranty')}<span class="sr">أماكن البيع</span></span><span class="cv ar">أماكن البيع: محلات أتوم المعتمدة</span></a>
</div>
</div></section>
</main>

<footer><div class="wrap"><span>دراجات أتوم. دراجات رائعة لناس رائعين.</span><span>ضمان محدود مدى الحياة على إطارات أتوم. <a href="mailto:atumbikes@gmail.com" target="_blank" rel="noopener">atumbikes@gmail.com</a> · <a href="/" hreflang="en" lang="en">English</a></span></div></footer>
</body>
</html>
`;
}
