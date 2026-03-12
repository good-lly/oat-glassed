# Contributing to Oat Glassed

Contributions are welcome! This project is a glassmorphism fork of [Oat UI](https://github.com/knadh/oat), so please also consider contributing to the upstream project.

## Guidelines

### Bug Fixes

- **Open an issue first** describing the bug so it can be confirmed before you send a PR.
- Include screenshots of any visual changes in the PR description.

### New Components & Features

- **Open an issue first** to discuss the proposal before sending a PR.
- This library aims to stay minimal and compact — new components are added judiciously.
- A broad goal is to keep the total bundle under ~10KB gzipped. It should cover ~90% of the most commonly used components; users bring the remaining 10%.

### Typos & Minor Fixes

- Small corrections (typos, formatting) can go straight to a PR without an issue.

## Local Development Setup

```bash
# Clone the repo
git clone https://github.com/good-lly/oat-glassed.git
cd oat-glassed

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

Build tooling is intentionally minimal — just `esbuild` via `npx` and `gzip`. No webpack, no PostCSS, no config files.

## PR Checklist

- [ ] Bug fixes include a description and screenshot (if visual)
- [ ] New features were discussed in an issue first
- [ ] Bundle size stays under ~10KB gzipped
- [ ] Semantic HTML and accessibility are preserved
- [ ] Tested in Chrome, Firefox, and Safari

## Supporting Upstream

Oat Glassed is built on top of [Oat UI](https://github.com/knadh/oat) by [Kailash Nadh](https://github.com/knadh). If your contribution applies to the base library as well, please consider opening a PR or issue upstream too. See the [upstream PR guidelines](https://github.com/knadh/oat/issues/74) for their process.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
