+++
title = "Installation and usage"
+++

> **IMPORTANT:** The lib is currently sub v1 and is likely to have breaking changes until it hits v1.

### CDN

Include the CSS and JS files directly in your HTML:

```html
<link rel="stylesheet" href="https://unpkg.com/oat-glassed/oat-glassed.min.css">
<script src="https://unpkg.com/oat-glassed/oat-glassed.min.js" defer></script>
```

----------

### npm

```bash
npm install oat-glassed
```

Then import in your project:

```js
import 'oat-glassed/oat-glassed.min.css';
import 'oat-glassed/oat-glassed.min.js';
```

Or import individual files from `oat-glassed/css` and `oat-glassed/js`.

----------

### Download

Download the CSS and JS files:

```shell
wget https://raw.githubusercontent.com/good-lly/oat-glassed/refs/heads/gh-pages/oat-glassed.min.css
wget https://raw.githubusercontent.com/good-lly/oat-glassed/refs/heads/gh-pages/oat-glassed.min.js
```

Then include them in your project:

```html
<link rel="stylesheet" href="./oat-glassed.min.css">
<script src="./oat-glassed.min.js" defer></script>
```

## Basic usage

Oat Glassed styles semantic HTML elements by default. No classes needed for basic styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <link rel="stylesheet" href="oat-glassed.css">
  <script src="oat-glassed.js" defer></script>
</head>
<body>
  <h1>Hello World</h1>
  <p>This paragraph is styled automatically.</p>
  <button>Click me</button>
</body>
</html>
```

--------

# Local dev setup

### Requirements
- [zola](https://github.com/getzola/zola/releases) static site generator installed to preview the docs/demo site and to try out changes.
- [esbuild](https://esbuild.github.io/) installed for bundling+minifying JS and CSS.

### Running
- Clone the [oat-glassed repo](https://github.com/good-lly/oat-glassed)
- `cd docs` and run `zola serve` to access the docs/demo site at `http://localhost:1111`
- After changing any CSS or JS files, run `make dist`. The demo site auto-updates with the changes.
