+++
title = "Nav"
weight = 121
description = "Side navigation with section labels, collapsible groups, and active states."
+++

Use `data-nav` on a `<nav>` element. Supports section labels via `<small>`, active state via `[aria-current]`, and collapsible groups via native `<details>`.

Works standalone or inside a sidebar layout.

{% demo() %}
```html
<nav data-nav>
  <small>Overview</small>
  <a href="#" aria-current="page">Dashboard</a>
  <a href="#">Users</a>
  <a href="#">Projects</a>
  <small>Settings</small>
  <details open>
    <summary>Account</summary>
    <a href="#">Profile</a>
    <a href="#">Billing</a>
    <a href="#">Security</a>
  </details>
  <details>
    <summary>Integrations</summary>
    <a href="#">Slack</a>
    <a href="#">GitHub</a>
  </details>
  <hr>
  <a href="#">Help & Support</a>
</nav>
```
{% end %}

### With icons and badges

Add SVG icons before link text. Use `.badge` for counts.

```html
<nav data-nav>
  <a href="#" aria-current="page">
    <svg>...</svg>
    Dashboard
  </a>
  <a href="#">
    <svg>...</svg>
    Users
    <span class="badge secondary">12</span>
  </a>
</nav>
```

### Inside sidebar

Combine with the [Sidebar](/oat-glassed/components/sidebar/) layout.

```html
<div data-sidebar-layout>
  <aside data-sidebar>
    <nav data-nav>
      <small>Menu</small>
      <a href="#" aria-current="page">Home</a>
      <a href="#">Settings</a>
    </nav>
  </aside>
  <main>Content</main>
</div>
```

#### Structure

| Element | Purpose |
|---------|---------|
| `[data-nav]` | Nav container with styling |
| `<small>` | Section label (uppercase, muted) |
| `<a>` | Navigation item |
| `[aria-current]` | Active/current page indicator |
| `<details>/<summary>` | Collapsible section group |
| `<hr>` | Visual separator |
| `.badge` inside `<a>` | Count or status indicator (auto right-aligned) |
