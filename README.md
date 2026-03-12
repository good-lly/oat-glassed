<div align="center">

# Oat Glassed

**Ultra-lightweight, zero-dependency, semantic UI component library with glassmorphism design.**

[![npm version](https://img.shields.io/npm/v/oat-glassed?color=6c5ce7&style=flat-square)](https://www.npmjs.com/package/oat-glassed)
[![npm bundle size](https://img.shields.io/badge/gzipped-~11KB-44cc11?style=flat-square)](https://www.npmjs.com/package/oat-glassed)
[![license](https://img.shields.io/npm/l/oat-glassed?color=blue&style=flat-square)](LICENSE)
[![zero deps](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](#)

[Live Demo & Docs](https://good-lly.github.io/oat-glassed) &bull; [Changelog](CHANGELOG.md) &bull; [npm](https://www.npmjs.com/package/oat-glassed)

<br />

<img width="739" alt="Oat Glassed screenshot" src="https://github.com/good-lly/oat-glassed/blob/main/docs/static/screenshot.png?raw=true" />

</div>

<br />

## Why Oat Glassed?

- **Zero dependencies** &mdash; pure HTML, CSS, and vanilla JS. No framework lock-in.
- **~11KB total** &mdash; 8KB CSS + 3KB JS (gzipped). Smaller than most single components in other libraries.
- **Semantic first** &mdash; styles apply to native HTML elements and ARIA attributes, not utility classes. Write clean markup, get beautiful UI.
- **Glassmorphism design** &mdash; modern frosted-glass aesthetic with automatic light/dark mode.
- **WebComponents** &mdash; interactive elements use native `<ot-*>` custom elements with proper lifecycle, keyboard nav, and accessibility.
- **Progressive enhancement** &mdash; everything works without JavaScript where possible. JS enhances, never gates.
- **Performance-optimized** &mdash; `contain: paint`, `will-change` hints, reduced blur/saturate for smooth 60fps glassmorphism.

<br />

## Quick Start

### CDN (fastest)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/oat-glassed@latest/oat-glassed.min.css" />
<script src="https://cdn.jsdelivr.net/npm/oat-glassed@latest/oat-glassed.min.js"></script>
```

<details>
<summary>unpkg alternative</summary>

```html
<link rel="stylesheet" href="https://unpkg.com/oat-glassed@latest/oat-glassed.min.css" />
<script src="https://unpkg.com/oat-glassed@latest/oat-glassed.min.js"></script>
```
</details>

### npm

```bash
npm install oat-glassed
```

```js
import "oat-glassed/oat-glassed.min.css";
import "oat-glassed/oat-glassed.min.js";
```

Then just write semantic HTML:

```html
<button>Default</button>
<button class="primary">Primary</button>
<button class="danger">Danger</button>

<dialog open>
  <h3>Glassmorphism dialog</h3>
  <p>No classes needed. Just semantic HTML.</p>
</dialog>
```

<br />

## Components

### CSS Components (no JS required)

| Component | Element / Selector | Description |
| :--- | :--- | :--- |
| **Accordion** | `<details>` / `<summary>` | Collapsible sections using native HTML |
| **Alert** | `<output>` | Contextual feedback messages |
| **Avatar** | `.avatar` | User profile images with fallbacks |
| **Badge** | `<sup>`, `.badge` | Status indicators and counts |
| **Breadcrumb** | `<nav>` with `<ol>` | Navigation path indicator |
| **Button** | `<button>`, `<a role="button">` | Multiple variants: primary, secondary, danger, outline |
| **Card** | `<article>`, `.card` | Glass-effect content containers |
| **Dialog** | `<dialog>` | Modal windows with glassmorphism backdrop |
| **Empty State** | `.empty-state` | Placeholder for empty content areas |
| **Form** | `<form>`, `<input>`, `<select>`, `<textarea>` | Inputs, checkboxes, radios, selects &mdash; all semantic |
| **Grid** | `.grid` | Responsive layout system |
| **Meter** | `<meter>` | Gauge / measurement display |
| **Nav** | `<nav>` | Navigation bar |
| **Progress** | `<progress>` | Progress bars |
| **Sidebar** | `.sidebar` | Collapsible sidebar layout |
| **Skeleton** | `.skeleton` | Loading placeholder animations |
| **Spinner** | `.spinner` | Loading indicators |
| **Switch** | `<input type="checkbox" role="switch">` | Toggle switches |
| **Table** | `<table>` | Styled data tables |
| **Tag** | `.tag` | Categorization labels |
| **Typography** | `<h1>`&ndash;`<h6>`, `<p>`, `<blockquote>`, etc. | Styled out of the box |
| **Utilities** | Various | Text, spacing, visibility, and layout helpers |

### Interactive WebComponents (JS)

| Component | Element | Features |
| :--- | :--- | :--- |
| **Tabs** | `<ot-tabs>` | Arrow key navigation, ARIA states, `ot-tab-change` event |
| **Dropdown** | `<ot-dropdown>` | Auto-flip positioning, keyboard nav, popover API |
| **Command Palette** | `<ot-command>` | `Cmd/Ctrl+K` global shortcut, real-time search, sections |
| **Toast** | `window.ot.toast()` | Configurable placement, duration, pause-on-hover, variants |
| **Tooltip** | `title` attribute | Progressive enhancement of native `title` to styled tooltips |
| **Sidebar Toggle** | Sidebar JS | Auto-dismiss on outside click (mobile), responsive |

<br />

## Theming

Oat Glassed uses CSS custom properties for full theme control. Override any variable on `:root`:

```css
:root {
  --primary: oklch(0.65 0.25 270);
  --background: oklch(0.15 0.02 260);
  --glass-blur: 16px;
  --glass-saturate: 140%;
  --radius-medium: 8px;
  --space-4: 1.5rem;
}
```

### Key design tokens

| Token | Default | Description |
| :--- | :--- | :--- |
| `--primary` | Brand blue | Primary action color |
| `--danger` | Red | Destructive action color |
| `--success` | Green | Positive feedback color |
| `--warning` | Yellow | Warning color |
| `--glass-blur` | `12px` | Backdrop blur intensity |
| `--glass-saturate` | `120%` | Backdrop saturation |
| `--radius-medium` | Border radius for components |
| `--space-1` &ndash; `--space-8` | Spacing scale |
| `--text-1` &ndash; `--text-7` | Type scale |

Light and dark modes are automatic via `prefers-color-scheme` using CSS `light-dark()`.

<br />

## Toast API

```js
// Simple text toast
window.ot.toast("File saved successfully", {
  variant: "success",       // "info" | "success" | "danger" | "warning"
  duration: 4000,           // ms, 0 = persistent
  placement: "top-right",   // "top-right" | "top-center" | "bottom-right" | "bottom-center" | "bottom-left"
});

// Custom element toast
window.ot.toast.el(myElement, { placement: "bottom-center" });

// Clear all toasts
window.ot.toast.clear();
```

<br />

## Bundle Size

| File | Raw | Gzipped |
| :--- | ---: | ---: |
| `oat-glassed.min.css` | 41.8 KB | **8.2 KB** |
| `oat-glassed.min.js` | 7.8 KB | **2.9 KB** |
| **Total** | **49.6 KB** | **~11.1 KB** |

Individual source files are also available in the `css/` and `js/` directories if you prefer to import only what you need.

<br />

## Browser Support

Oat Glassed targets modern evergreen browsers:

- Chrome / Edge 110+
- Firefox 115+
- Safari 16.4+

Uses modern CSS features: `@layer`, `light-dark()`, `oklch()`, `backdrop-filter`, Popover API.

<br />

## Development

```bash
# Build CSS + JS
make dist

# Build CSS only
make css

# Build JS only
make js

# Show bundle sizes
make size

# Clean build artifacts
make clean
```

Build tooling is intentionally minimal &mdash; just `esbuild` via `npx` and `gzip`. No webpack, no PostCSS, no config files.

<br />

## Accessibility

- Keyboard navigation for all interactive components (Arrow keys, Home, End, Enter, Escape)
- ARIA attributes managed automatically (`aria-selected`, `aria-expanded`, `aria-controls`, `aria-labelledby`)
- Semantic HTML elements used wherever possible (`<dialog>`, `<details>`, `<output>`, `<meter>`, `<progress>`)
- Progressive enhancement &mdash; tooltips fall back to native `title`, accordions work without JS
- Screen reader tested

<br />

## Credits

Forked from [Oat UI](https://github.com/knadh/oat) by [Kailash Nadh](https://github.com/knadh). Glassmorphism redesign and additional components by [good-lly](https://github.com/good-lly).

## License

[MIT](LICENSE)
