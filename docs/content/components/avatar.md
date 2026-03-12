+++
title = "Avatar"
weight = 35
description = "User or entity representation with image or initials fallback."
+++

Use `.avatar` class. Displays an image or initials as a circular avatar.

{% demo() %}
```html
<span class="avatar small">S</span>
<span class="avatar">JD</span>
<span class="avatar large">AK</span>
<span class="avatar"><img src="https://i.pravatar.cc/96?img=1" alt="User"></span>
```
{% end %}

### Sizes

| Class | Size |
|-------|------|
| `.avatar.small` | 1.75rem |
| `.avatar` | 2.5rem (default) |
| `.avatar.large` | 3.5rem |

### Avatar group

Wrap avatars in `.avatar-group` for overlapping display.

{% demo() %}
```html
<div class="avatar-group">
  <span class="avatar"><img src="https://i.pravatar.cc/96?img=1" alt="User 1"></span>
  <span class="avatar"><img src="https://i.pravatar.cc/96?img=2" alt="User 2"></span>
  <span class="avatar"><img src="https://i.pravatar.cc/96?img=3" alt="User 3"></span>
  <span class="avatar">+4</span>
</div>
```
{% end %}
