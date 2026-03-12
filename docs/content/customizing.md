+++
title = "Customizing"
description = "Customize and theme Oat Glassed by overriding CSS variables"
+++

Pretty much all properties of Oat Glassed are defined as CSS variables that can be overridden. See [theme.css](https://github.com/good-lly/oat-glassed/blob/master/src/css/01-theme.css) to see all variables. To override, redefine them in a CSS file in your project and include it after the lib's CSS files.

## Picking and choosing

While it is quite okay to bundle all of Oat Glassed given how tiny it is (~8KB CSS, ~3KB JS gzipped), it is possible to include components selectively.

##### Must include
- `00-base.css`
- `01-theme.css`
- `base.js`
- `your files after this`

-------

## Theming

The following color variables from theme.css control the theme. Oat Glassed uses the CSS `light-dark()` function, so each variable automatically adapts to light and dark modes. Override them to create your own theme.

The values shown below are the light-mode defaults (Tailwind gray palette). Many surfaces use alpha transparency for the glassmorphism effect.

```css
:root {

  /* Page background */
  --background: #ffffff;

  /* Primary text color */
  --foreground: #111827;

  /* Card background (semi-transparent for glass effect) */
  --card: rgb(255 255 255 / 0.55);

  /* Card text color */
  --card-foreground: #111827;

  /* Primary buttons and links */
  --primary: #111827;

  /* Text color on primary buttons */
  --primary-foreground: #ffffff;

  /* Secondary button background */
  --secondary: rgb(243 244 246 / 0.55);

  /* Text colour on secondary buttons */
  --secondary-foreground: #1f2937;

  /* Muted (lighter) background */
  --muted: rgb(243 244 246 / 0.45);

  /* Muted (lighter) text colour */
  --muted-foreground: #6b7280;

  /* Subtler than muted background */
  --faint: rgb(249 250 251 / 0.35);

  /* Subtler than muted text color */
  --faint-foreground: #9ca3af;

  /* Accent background */
  --accent: rgb(243 244 246 / 0.55);

  /* Link color */
  --link: #0284c7;

  /* Error/danger color */
  --danger: #ef4444;

  /* Text color on danger background */
  --danger-foreground: #ffffff;

  /* Success color */
  --success: #10b981;

  /* Text colour on success background */
  --success-foreground: #ffffff;

  /* Warning color */
  --warning: #f59e0b;

  /* Text colour on warning background */
  --warning-foreground: #111827;

  /* Border color (boxes) */
  --border: rgb(0 0 0 / 0.08);

  /* Input borders */
  --input: rgb(0 0 0 / 0.1);

  /* Focus ring color */
  --ring: #111827;
}
```

After these, include CSS and JS files for the respective components.

-------

## Glass effect

Oat Glassed adds glassmorphism (frosted-glass surfaces) via these variables:

```css
:root {
  --glass-blur: 12px;
  --glass-saturate: 120%;
  --glass-border: rgb(255 255 255 / 0.65);
  --glass-highlight: linear-gradient(135deg, rgb(255 255 255 / 0.7) 0%, rgb(255 255 255 / 0.15) 40%, rgb(255 255 255 / 0) 60%);
}
```

The glass effect is applied to nav, sidebar, and dialog components. Users who prefer reduced transparency will automatically get opaque fallbacks via `@media (prefers-reduced-transparency: reduce)`.

---------------

## Dark mode

Oat Glassed uses the CSS `light-dark()` function with `color-scheme: light dark`, so it automatically follows the user's system preference. To toggle the theme programmatically, set `color-scheme` on the root element:

```js
document.documentElement.style.colorScheme = 'dark'; // or 'light'
```

To customize dark-mode colors, override the variables using `light-dark()`:

```css
:root {
  --primary: light-dark(#111827, #f9fafb);
  --danger: light-dark(#ef4444, #f87171);
  /* etc. */
}
```
