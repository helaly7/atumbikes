# ATUM Bikes — design system

Direction: **confident, technical, quiet.** A navy-and-white studio where the bikes are the only
colour. Big condensed headlines (like a frame decal), one blue for actions, one yellow for the active
journey chip, everything else neutral. The journey section is a white panel framed by 3px navy
rules above and below; text on it is navy and dark grey (`#3B4866`), never white. Nothing is centred by default; text sits on a
left edge and photos get the room.

Not based on a live comparison of other sites (UXKIN was not connected). It is built from the
existing page, the ATUM logo blue and the studio photos.

## Colour

Light mode only (`color-scheme: light`). Values live in `:root` in `index.html`.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F1F4F9` | Page background (cool off-white) |
| `--surface` | `#FFFFFF` | Cards, table rows, image frames |
| `--ink` | `#0F1B3C` | Navy. Body text, headings, dark sections, primary chip border |
| `--muted` | `#52607F` | Secondary text, labels, nav links (5.2:1 on `--bg`) |
| `--line` | `#CCD5E5` | Hairlines, card borders, table rules |
| `--line-soft` | `#E8EDF8` | Row stripes, subtle fills |
| `--primary` | `#1E4CA2` | ATUM logo blue. Buttons, links, icon colour, focus ring (`--accent` is kept as an alias) |
| `--primary-hover` | `#0A3FA8` | Button hover |
| `--on-primary` | `#FFFFFF` | Text on primary |
| `--yellow` | `#F2B705` | Second accent: the active chip in the journey section only |
| `--navy-2` | `#14224A` | Raised panel inside a navy section |
| `--navy-3` | `#28386A` | Borders inside a navy section |
| `--ok` | `#1F8A4C` | Success (in stock, message sent) |
| `--warn` | `#B76E00` | Warning (low stock, last sizes) |
| `--err` | `#C0392B` | Error (form errors) |

Rules: one primary colour for every action. Yellow never appears on a light background (it fails
contrast). Gradients, glass effects and gradient text are not used; depth comes from the one
shadow and from navy sections.

## Typography

- **Display:** Archivo (variable; width 62–125, weight 500–900), used condensed (`font-stretch` 75–80 %)
  for h1/h2/h3 and bike names. Fallback: Arial Narrow, Arial.
- **Body:** Instrument Sans 400/500/600. Fallback: system-ui, Arial.
- Loaded from Google Fonts with `display=swap`.

| Step | Size / line | Use |
|---|---|---|
| `--t-hero` | `clamp(52px, 10vw, 132px)` / 0.95, 900, stretch 75 % | Home h1 |
| `--t-h1` | `clamp(40px, 6vw, 72px)` / 1.0, 900, stretch 75 % | Bike name on bike page |
| `--t-h2` | `clamp(36px, 5.5vw, 64px)` / 1.05, 800, stretch 80 % | Section headings |
| `--t-h3` | 22–26px / 1.1, 700, stretch 85 % | Card titles, journey titles |
| `--t-lede` | 19px / 1.55, 400, muted | Intro under a heading |
| `--t-body` | 17px / 1.6, 400 | Paragraphs, table cells |
| `--t-small` | 15px / 1.5 | Nav, chips, footer, breadcrumbs, captions |
| `--t-label` | 13px / 1.4, 500, uppercase, tracking .08em | Table heads, eyebrows ("Gravel" above the name) |

Measure: paragraphs capped at 52–60ch (`.lede` 52ch). Letter-spacing −0.02em on the hero,
−0.01em on h2, none on body.

## Spacing and layout

8-point scale: `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 ·
`--s-7` 48 · `--s-8` 64 · `--s-9` 96.

- Content width `--wrap` 1200px, side padding 24px (16px under 480px).
- Section padding: 64px top/bottom on desktop, 48px on phones.
- Card grids: `repeat(auto-fit, minmax(240–300px, 1fr))`, gap 14–24px.
- Sticky header, 60px tall, hairline bottom border. Every tap target ≥ 44px.
- Sections scroll with `scroll-margin-top: 84px` so anchors clear the header.

## Shape and depth

| Token | Value | Use |
|---|---|---|
| `--r-1` | 4px | Buttons, swatches' inner ring, table badges |
| `--r-2` | 6px | Photos, "Perfect for" cards, thumbnails |
| `--r-3` | 12px | Contact cards, journey panel |
| `--r-pill` | 99px | Chips |
| `--shadow-1` | `0 14px 30px rgba(15,27,60,.18)` | Lightbox image, hovered feature image. Nothing else floats. |

Borders are 1px `--line`; the selected swatch and chip use 1.5–2px `--ink`.

## Components

- **Primary button** `.btn`: primary fill, white 600/16px text, 13×22px padding, radius 4.
  Hover: `--primary-hover`. Focus: 3px solid `--primary` outline, 2px offset. Disabled: 45 % opacity,
  no pointer.
- **Quiet button / text link** `.btn2`: ink text, 600, underline offset 4px. Hover: primary.
- **Chip** `.chip`: pill, 1.5px ink border, 15px/500, min-height 44. Active: ink fill, bg text.
  On navy: yellow fill, ink text.
- **Link in prose**: primary, underlined. On navy: yellow.
- **Card** (bike): photo on `--surface` with 1px line and radius 6; name in display face;
  one muted line of spec; whole card is the link.
- **Contact card** `.ccard`: radius 12, 1px line, icon in primary (28px), value 17px/600.
- **Spec table**: header row 13px uppercase muted, 2px ink rule; body rows 1px line; brand logos
  as 80×28 badges (black for Shimano/Tektro/Kenda, white for ATUM/KMC).
- **Navigation**: text links in muted, current in ink; "Bikes" dropdown lists categories;
  social icons 20px after Contact on ≥ 640px; closes on navigation.
- **Footer**: hairline top, two muted 15px lines, email and social icons, tap targets 44px.
- **Lightbox**: navy 92 % backdrop, image with `--shadow-1`, close on Escape and backdrop click.
- **Forms** (when added): 44px inputs, 1px line border, radius 4, focus ring as buttons;
  error text in `--err` under the field; success state in `--ok`.

## Imagery and icons

- **Photos**: every bike on the same warm-grey studio backdrop with floor reflection and the
  white ATUM logo top-left (bottom-right on detail shots); 4:3 for listings, 1000px wide.
  Side-on view first, then close-ups. No dark renders mixed into the grid.
- **Icons**: inline SVG, 24-grid, 1.8px strokes, single colour (`currentColor`); brand marks
  (Facebook, Instagram, Shimano…) are used as supplied, never recoloured. No emoji.
- **Charts** (journey): one primary-blue line on the off-white panel, no gridlines.
