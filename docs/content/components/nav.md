+++
title = "Nav"
weight = 121
description = "Side and top navigation with responsive collapse, section labels, collapsible groups, and active states."
+++

Use `data-nav` on a `<nav>` element for side navigation. Use `data-topnav` for a responsive top navigation bar that collapses to a hamburger menu on mobile.

## Top Navigation (responsive)

Use `data-topnav` on a `<nav>` for a sticky horizontal navbar. Wrap links in `[data-topnav-menu]` and add a `[data-topnav-toggle]` button for mobile collapse. On screens wider than 768px the toggle is hidden and links display inline. On mobile the menu collapses and the toggle reveals it.

{% demo() %}
```html
<nav data-topnav>
  <strong>My App</strong>
  <button data-topnav-toggle aria-label="Toggle menu">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  <div data-topnav-menu>
    <a href="#" aria-current="page">Home</a>
    <a href="#">Docs</a>
    <a href="#">Components</a>
    <a href="#">About</a>
  </div>
</nav>
```
{% end %}

Works standalone or inside a `[data-sidebar-layout]`. When used inside a sidebar layout, you can combine `[data-sidebar-toggle]` (for the sidebar) with `[data-topnav-menu]` links.

#### Topnav Structure

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-topnav` | `<nav>` | Sticky top navigation bar |
| `data-topnav-toggle` | `<button>` | Hamburger toggle (visible on mobile only) |
| `data-topnav-menu` | `<div>` | Link container (inline on desktop, collapsible on mobile) |
| `data-topnav-open` | `<nav>` | Applied automatically when menu is open |
| `aria-current` | `<a>` | Active page indicator |

---

## Side Navigation

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
