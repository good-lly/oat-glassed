+++
title = "Empty State"
weight = 85
description = "Placeholder for empty pages, lists, or search results."
+++

Use `data-empty` on a container. Centers content vertically with icon, heading, description, and optional action button.

{% demo() %}
```html
<div data-empty>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M20 7h-9"/><path d="M14 17H5"/>
    <circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>
  </svg>
  <h4>No results found</h4>
  <p>Try adjusting your search or filters to find what you're looking for.</p>
  <button class="outline small">Clear filters</button>
</div>
```
{% end %}

### Without action

{% demo() %}
```html
<div data-empty>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
  <h4>No documents yet</h4>
  <p>Create your first document to get started.</p>
</div>
```
{% end %}

#### Structure

| Element | Purpose |
|---------|---------|
| `[data-empty]` | Container with centered flex layout |
| `<svg>` or `<img>` | Illustration (3rem, semi-transparent) |
| `<h4>` (any heading) | Title |
| `<p>` | Description (max-width 28rem) |
| `<button>` or `<a>` | Action button |
