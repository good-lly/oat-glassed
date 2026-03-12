+++
title = "Tag"
weight = 145
description = "Interactive tags / chips with optional dismiss button."
+++

Use `.tag` class. Like badges but designed for interactive use — filtering, selections, and dismissible items.

{% demo() %}
```html
<span class="tag">Default</span>
<span class="tag primary">Primary</span>
<span class="tag success">Success</span>
<span class="tag warning">Warning</span>
<span class="tag danger">Danger</span>
```
{% end %}

### Dismissible

Add a `<button>` inside the tag for dismiss functionality.

{% demo() %}
```html
<span class="tag">React <button aria-label="Remove">&times;</button></span>
<span class="tag success">Published <button aria-label="Remove">&times;</button></span>
```
{% end %}

Handle removal with a click listener:

```javascript
container.addEventListener('click', e => {
  const btn = e.target.closest('.tag > button');
  if (btn) btn.parentElement.remove();
});
```

#### Variants

| Class | Description |
|-------|-------------|
| `.tag` | Default (secondary background with glass) |
| `.tag.primary` | Primary color |
| `.tag.success` | Success / green |
| `.tag.warning` | Warning / amber |
| `.tag.danger` | Danger / red |
