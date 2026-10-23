# Batumi Oil Terminal — Design System (Harbor Light · Green)

Approved redesign direction. Reference demo: [../../design-demos/v2-harbor-light.html](../../design-demos/v2-harbor-light.html)
(the dark alternative, not selected: [../../design-demos/v1-control-room.html](../../design-demos/v1-control-room.html)).

## Direction
- Light, airy, Bento-style cards, data-first. Left vertical sidebar + sticky top bar.
- Georgian UI: `Noto Sans Georgian` is mandatory for text (Inter/Fira have no Georgian glyphs). Latin/numerals: `Inter`; numeric values and codes: `JetBrains Mono`.
- Demo data (vessel names, status numbers) is fictional; norms and product codes come from the real app.

## Tokens
| Token | Value | Use |
|---|---|---|
| `--accent` / gradient | `#85C811`; `linear-gradient(120deg,#70B607,#85C811 55%,#9CD61E)` | Fills: active nav, page banner, primary buttons, selected chips, chat header |
| `--accent-ink` | `#10230A` | Text/icons ON green fills (white fails contrast, ~2.3:1) |
| `--accent-deep` | `#3F6B00` | Green text/icons on white (logo, hover, group headers, map vessels), focus ring |
| `--accent-line` | `#6AAE00` | Hover/focus borders |
| `--accent-soft` | `#EDF7D9` | Hover backgrounds, soft chips |
| `--warm` | `#C2410C` (hover `#9A3412`) | Signal CTA: «განაცხადები», chat button, notification count |
| `--bg` / `--surface` / `--surface-2` | `#F2F5FA` / `#FFFFFF` / `#F1F5FA` | Page / cards / inset blocks |
| `--border` | `#DDE5F0` | All borders |
| `--text` / `--muted` | `#0F172A` / `#475569` | Body / secondary |
| `--ok` / `--ok-bg` | `#047857` / `#D8F5E8` | Within norm, live |
| `--bad` / `--bad-bg` | `#B91C1C` / `#FDE2E2` | Over norm, sanctioned |
| Radius | cards `22px`, controls `14px`, pills `999px` | |

## Layout
- Sidebar `312px` (sticky, scrolls), content max-width `1280px`, 12-column grid, gap `20px`.
- ≤1100px: cards stack to full width. ≤980px: sidebar becomes an off-canvas drawer (hamburger + scrim, Esc closes).

## Rules (from UI/UX Pro Max checklist)
- Touch targets ≥ 44px; visible `:focus-visible` ring; icons are inline SVG (no emoji icons).
- Status is never color-only: badges carry text («ნორმის ფარგლებში» / «ნორმას აჭარბებს»).
- Respect `prefers-reduced-motion`. Animate only `transform`/`opacity`/`width` of bars.
- Orange `#EA580C` is decorative only (bars); orange TEXT must use `#C2410C`.

## Pages in the demo
Measurement error (live calculator + gauge at 0.5%), natural losses (product chips + bars), sanctions (tabs + filter table),
live map (schematic Black Sea). Other sections are placeholders; chatbot greeting «რით შემიძლია დაგეხმარო?», status `live`.

## Next step (not done yet)
Port to the React app (`src/`): replace `GlobalStyles.jsx` tokens, rebuild `Aside`/`Navigation`/`Header`, restyle `CategoryHeader`, tables and `Chatbot`.
