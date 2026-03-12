/**
 * oat - Command Palette Component
 * Global Cmd/Ctrl+K command palette with search and keyboard navigation.
 *
 * Usage:
 * <ot-command>
 *   <dialog id="cmd" closedby="any">
 *     <input type="search" placeholder="Type a command...">
 *     <div role="listbox">
 *       <span>Section</span>
 *       <button role="option">Item 1</button>
 *       <button role="option">Item 2</button>
 *     </div>
 *   </dialog>
 * </ot-command>
 */

import { OtBase } from './base.js';

class OtCommand extends OtBase {
  #dialog;
  #input;
  #items;
  #idx = -1;

  init() {
    this.#dialog = this.$('dialog') || this.#wrap();
    this.#input = this.$('input[type="search"]');

    document.addEventListener('keydown', this);
    this.#dialog.addEventListener('keydown', this);

    if (this.#input) this.#input.addEventListener('input', this);

    const listbox = this.$('[role="listbox"]');
    if (listbox) listbox.addEventListener('click', this);
  }

  #wrap() {
    const d = document.createElement('dialog');
    d.setAttribute('closedby', 'any');
    while (this.firstChild) d.appendChild(this.firstChild);
    this.appendChild(d);
    return d;
  }

  /** Open the command palette programmatically. */
  open() {
    this.#dialog.showModal();
    if (this.#input) {
      this.#input.value = '';
      this.#input.focus();
    }
    this.#reset();
  }

  #reset() {
    this.#idx = -1;
    this.$$('[role="listbox"] > *').forEach(el => (el.hidden = false));
    this.$$('[role="option"]').forEach(el => el.removeAttribute('aria-selected'));
  }

  onkeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.#dialog.open ? this.#dialog.close() : this.open();
      return;
    }

    if (!this.#dialog.open) return;

    this.#items = this.$$('[role="option"]:not([hidden])');
    if (!this.#items.length) return;

    const next = this.keyNav(e, this.#idx, this.#items.length, 'ArrowUp', 'ArrowDown', true);
    if (next >= 0) {
      this.#idx = next;
      this.#items.forEach((el, i) =>
        el.setAttribute('aria-selected', String(i === next))
      );
      this.#items[next].scrollIntoView({ block: 'nearest' });
    }

    if (e.key === 'Enter' && this.#idx >= 0) {
      e.preventDefault();
      this.#items[this.#idx].click();
      this.#dialog.close();
    }
  }

  oninput() {
    const q = this.#input.value.toLowerCase();
    let section = null;
    let hasVisible = false;

    for (const el of this.$$('[role="listbox"] > *')) {
      if (el.matches('[role="option"]')) {
        const match = !q || el.textContent.toLowerCase().includes(q);
        el.hidden = !match;
        if (match) hasVisible = true;
      } else {
        if (section) section.hidden = !hasVisible;
        section = el;
        hasVisible = false;
      }
    }
    if (section) section.hidden = !hasVisible;

    this.#idx = -1;
    this.$$('[role="option"]').forEach(el => el.removeAttribute('aria-selected'));
  }

  onclick(e) {
    if (e.target.closest('[role="option"]')) {
      this.#dialog.close();
    }
  }

  cleanup() {
    document.removeEventListener('keydown', this);
  }
}

customElements.define('ot-command', OtCommand);
