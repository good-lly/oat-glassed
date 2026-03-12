+++
title = "Command Palette"
weight = 65
description = "Global Cmd/Ctrl+K command palette with search and keyboard navigation."
+++

Use `<ot-command>` WebComponent. Provides a searchable command palette dialog triggered globally with `⌘K` / `Ctrl+K`. Includes fuzzy filtering, keyboard navigation, and section grouping.

{% demo() %}
```html
<ot-command>
  <dialog id="my-cmd" closedby="any">
    <input type="search" placeholder="Type a command...">
    <div role="listbox">
      <span>Navigation</span>
      <button role="option">Home</button>
      <button role="option">Dashboard</button>
      <button role="option">Settings</button>
      <span>Actions</span>
      <button role="option">New Project</button>
      <button role="option">Import Data</button>
    </div>
  </dialog>
</ot-command>
```
{% end %}

### With icons and keyboard shortcuts

Add SVGs for icons and `<kbd>` for shortcut hints.

```html
<button role="option">
  <svg>...</svg>
  New Project
  <kbd>⌘N</kbd>
</button>
```

### Opening programmatically

Besides the global `⌘K` shortcut, open via JavaScript:

```javascript
document.querySelector('ot-command').open();
```

### Handling selection

Listen for clicks on options:

```javascript
document.querySelector('ot-command [role="listbox"]').addEventListener('click', e => {
  const option = e.target.closest('[role="option"]');
  if (option) console.log('Selected:', option.textContent);
});
```

#### Keyboard navigation

| Key | Action |
|-----|--------|
| `⌘K` / `Ctrl+K` | Toggle command palette |
| `↑` / `↓` | Navigate options |
| `Home` / `End` | Jump to first / last option |
| `Enter` | Select highlighted option |
| `Escape` | Close palette |

#### Structure

| Element | Purpose |
|---------|---------|
| `<ot-command>` | WebComponent wrapper |
| `<dialog>` | Modal container (auto-created if omitted) |
| `<input type="search">` | Search/filter input |
| `<div role="listbox">` | Options container |
| `<span>` inside listbox | Section label |
| `<button role="option">` | Selectable option |
| `<kbd>` inside option | Keyboard shortcut hint (auto right-aligned) |
