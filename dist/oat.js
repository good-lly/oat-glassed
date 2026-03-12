(() => {
  // src/js/base.js
  var OtBase = class extends HTMLElement {
    #initialized = false;
    // Called when element is added to DOM.
    connectedCallback() {
      if (this.#initialized) return;
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => this.#setup(), { once: true });
      } else {
        this.#setup();
      }
    }
    // Private setup to ensure that init() is only called once.
    #setup() {
      if (this.#initialized) return;
      this.#initialized = true;
      this.init();
    }
    // Called when element is removed from DOM.
    disconnectedCallback() {
      this.cleanup();
    }
    // Override in subclass for cleanup logic.
    cleanup() {
    }
    // Central event handler - enables automatic cleanup.
    // Usage: element.addEventListener('click', this)
    handleEvent(event) {
      const handler = this[`on${event.type}`];
      if (handler) handler.call(this, event);
    }
    // Given a keyboard event (left, right, home, end), the current selection idx
    // total items in a list, return 0-n index of the next/previous item
    // for doing a roving keyboard nav.
    keyNav(event, idx, len, prevKey, nextKey, homeEnd = false) {
      const { key } = event;
      let next = -1;
      if (key === nextKey) {
        next = (idx + 1) % len;
      } else if (key === prevKey) {
        next = (idx - 1 + len) % len;
      } else if (homeEnd) {
        if (key === "Home") {
          next = 0;
        } else if (key === "End") {
          next = len - 1;
        }
      }
      if (next >= 0) event.preventDefault();
      return next;
    }
    // Emit a custom event.
    emit(name, detail = null) {
      return this.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail
      }));
    }
    // Query selector within this element.
    $(selector) {
      return this.querySelector(selector);
    }
    // Query selector all within this element.
    $$(selector) {
      return Array.from(this.querySelectorAll(selector));
    }
    // Generate a unique ID string.
    uid() {
      return Math.random().toString(36).slice(2, 10);
    }
  };
  if (!("commandForElement" in HTMLButtonElement.prototype)) {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("button[commandfor]");
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute("commandfor"));
      if (!target) return;
      const command = btn.getAttribute("command") || "toggle";
      if (target instanceof HTMLDialogElement) {
        if (command === "show-modal") target.showModal();
        else if (command === "close") target.close();
        else target.open ? target.close() : target.showModal();
      }
    });
  }

  // src/js/tabs.js
  var OtTabs = class extends OtBase {
    #tabs = [];
    #panels = [];
    init() {
      const tablist = this.$(':scope > [role="tablist"]');
      this.#tabs = tablist ? [...tablist.querySelectorAll('[role="tab"]')] : [];
      this.#panels = this.$$(':scope > [role="tabpanel"]');
      if (this.#tabs.length === 0 || this.#panels.length === 0) {
        console.warn("ot-tabs: Missing tab or tabpanel elements");
        return;
      }
      this.#tabs.forEach((tab, i) => {
        const panel = this.#panels[i];
        if (!panel) return;
        const tabId = tab.id || `ot-tab-${this.uid()}`;
        const panelId = panel.id || `ot-panel-${this.uid()}`;
        tab.id = tabId;
        panel.id = panelId;
        tab.setAttribute("aria-controls", panelId);
        panel.setAttribute("aria-labelledby", tabId);
      });
      tablist.addEventListener("click", this);
      tablist.addEventListener("keydown", this);
      const activeTab = this.#tabs.findIndex((t) => t.ariaSelected === "true");
      this.#activate(activeTab >= 0 ? activeTab : 0);
    }
    onclick(e) {
      const index = this.#tabs.indexOf(e.target.closest('[role="tab"]'));
      if (index >= 0) this.#activate(index);
    }
    onkeydown(e) {
      if (!e.target.closest('[role="tab"]')) return;
      const next = this.keyNav(e, this.activeIndex, this.#tabs.length, "ArrowLeft", "ArrowRight");
      if (next >= 0) {
        this.#activate(next);
        this.#tabs[next].focus();
      }
    }
    #activate(idx) {
      this.#tabs.forEach((tab, i) => {
        const isActive = i === idx;
        tab.ariaSelected = String(isActive);
        tab.tabIndex = isActive ? 0 : -1;
      });
      this.#panels.forEach((panel, i) => {
        panel.hidden = i !== idx;
      });
      this.emit("ot-tab-change", { index: idx, tab: this.#tabs[idx] });
    }
    get activeIndex() {
      return this.#tabs.findIndex((t) => t.ariaSelected === "true");
    }
    set activeIndex(value) {
      if (value >= 0 && value < this.#tabs.length) {
        this.#activate(value);
      }
    }
  };
  customElements.define("ot-tabs", OtTabs);

  // src/js/dropdown.js
  var OtDropdown = class extends OtBase {
    #menu;
    #trigger;
    #position;
    #items;
    init() {
      this.#menu = this.$("[popover]");
      this.#trigger = this.$("[popovertarget]");
      if (!this.#menu || !this.#trigger) return;
      this.#menu.addEventListener("toggle", this);
      this.#menu.addEventListener("keydown", this);
      this.#position = () => {
        const r = this.#trigger.getBoundingClientRect();
        const m = this.#menu.getBoundingClientRect();
        this.#menu.style.top = `${r.bottom + m.height > window.innerHeight ? r.top - m.height : r.bottom}px`;
        this.#menu.style.left = `${r.left + m.width > window.innerWidth ? r.right - m.width : r.left}px`;
      };
    }
    ontoggle(e) {
      if (e.newState === "open") {
        this.#position();
        window.addEventListener("scroll", this.#position, true);
        window.addEventListener("resize", this.#position);
        this.#items = this.$$('[role="menuitem"]');
        this.#items[0]?.focus();
        this.#trigger.ariaExpanded = "true";
      } else {
        this.cleanup();
        this.#items = null;
        this.#trigger.ariaExpanded = "false";
        this.#trigger.focus();
      }
    }
    onkeydown(e) {
      if (!e.target.matches('[role="menuitem"]')) return;
      const idx = this.#items.indexOf(e.target);
      const next = this.keyNav(e, idx, this.#items.length, "ArrowUp", "ArrowDown", true);
      if (next >= 0) this.#items[next].focus();
    }
    cleanup() {
      window.removeEventListener("scroll", this.#position, true);
      window.removeEventListener("resize", this.#position);
    }
  };
  customElements.define("ot-dropdown", OtDropdown);

  // src/js/tooltip.js
  document.addEventListener("DOMContentLoaded", () => {
    const _attrib = "title", _sel = "[title]";
    const apply = (el) => {
      const t = el.getAttribute(_attrib);
      if (!t) return;
      el.setAttribute("data-tooltip", t);
      el.hasAttribute("aria-label") || el.setAttribute("aria-label", t);
      el.removeAttribute(_attrib);
    };
    document.querySelectorAll(_sel).forEach(apply);
    new MutationObserver((muts) => {
      for (const m of muts) {
        apply(m.target);
        for (const n of m.addedNodes)
          if (n.nodeType === 1) {
            apply(n);
            n.querySelectorAll(_sel).forEach(apply);
          }
      }
    }).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [_attrib]
    });
  });

  // src/js/sidebar.js
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-sidebar-toggle]");
    if (toggle) {
      const layout = toggle.closest("[data-sidebar-layout]");
      layout?.toggleAttribute("data-sidebar-open");
      return;
    }
    if (!e.target.closest("[data-sidebar]")) {
      const layout = document.querySelector("[data-sidebar-layout][data-sidebar-open]");
      if (layout && window.matchMedia("(max-width: 768px)").matches) {
        layout.removeAttribute("data-sidebar-open");
      }
    }
  });

  // src/js/command.js
  var OtCommand = class extends OtBase {
    #dialog;
    #input;
    #items;
    #idx = -1;
    init() {
      this.#dialog = this.$("dialog") || this.#wrap();
      this.#input = this.$('input[type="search"]');
      document.addEventListener("keydown", this);
      this.#dialog.addEventListener("keydown", this);
      if (this.#input) this.#input.addEventListener("input", this);
      const listbox = this.$('[role="listbox"]');
      if (listbox) listbox.addEventListener("click", this);
    }
    #wrap() {
      const d = document.createElement("dialog");
      d.setAttribute("closedby", "any");
      while (this.firstChild) d.appendChild(this.firstChild);
      this.appendChild(d);
      return d;
    }
    /** Open the command palette programmatically. */
    open() {
      this.#dialog.showModal();
      if (this.#input) {
        this.#input.value = "";
        this.#input.focus();
      }
      this.#reset();
    }
    #reset() {
      this.#idx = -1;
      this.$$('[role="listbox"] > *').forEach((el) => el.hidden = false);
      this.$$('[role="option"]').forEach((el) => el.removeAttribute("aria-selected"));
    }
    onkeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        this.#dialog.open ? this.#dialog.close() : this.open();
        return;
      }
      if (!this.#dialog.open) return;
      this.#items = this.$$('[role="option"]:not([hidden])');
      if (!this.#items.length) return;
      const next = this.keyNav(e, this.#idx, this.#items.length, "ArrowUp", "ArrowDown", true);
      if (next >= 0) {
        this.#idx = next;
        this.#items.forEach(
          (el, i) => el.setAttribute("aria-selected", String(i === next))
        );
        this.#items[next].scrollIntoView({ block: "nearest" });
      }
      if (e.key === "Enter" && this.#idx >= 0) {
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
      this.$$('[role="option"]').forEach((el) => el.removeAttribute("aria-selected"));
    }
    onclick(e) {
      if (e.target.closest('[role="option"]')) {
        this.#dialog.close();
      }
    }
    cleanup() {
      document.removeEventListener("keydown", this);
    }
  };
  customElements.define("ot-command", OtCommand);

  // src/js/toast.js
  var toasts = {};
  function _get(placement) {
    if (!toasts[placement]) {
      const el = document.createElement("div");
      el.className = "toast-container";
      el.setAttribute("popover", "manual");
      el.setAttribute("data-placement", placement);
      document.body.appendChild(el);
      toasts[placement] = el;
    }
    return toasts[placement];
  }
  function _show(el, options = {}) {
    const { placement = "top-right", duration = 4e3 } = options;
    const p = _get(placement);
    el.classList.add("toast");
    let timeout;
    el.onmouseenter = () => clearTimeout(timeout);
    el.onmouseleave = () => {
      if (duration > 0) {
        timeout = setTimeout(() => _remove(el, p), duration);
      }
    };
    el.setAttribute("data-entering", "");
    p.appendChild(el);
    p.showPopover();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.removeAttribute("data-entering");
      });
    });
    if (duration > 0) {
      timeout = setTimeout(() => _remove(el, p), duration);
    }
    return el;
  }
  function _remove(el, container) {
    if (el.hasAttribute("data-exiting")) {
      return;
    }
    el.setAttribute("data-exiting", "");
    const cleanup = () => {
      el.remove();
      if (!container.children.length) {
        container.hidePopover();
      }
    };
    el.addEventListener("transitionend", cleanup, { once: true });
    const t = getComputedStyle(el).getPropertyValue("--transition").trim();
    const val = parseFloat(t);
    const ms = t.endsWith("ms") ? val : val * 1e3;
    setTimeout(cleanup, ms);
  }
  function toast(message, title, options = {}) {
    const { variant = "info", ...rest } = options;
    const el = document.createElement("output");
    el.setAttribute("data-variant", variant);
    if (title) {
      const titleEl = document.createElement("h6");
      titleEl.className = "toast-title";
      titleEl.textContent = title;
      el.appendChild(titleEl);
    }
    const msgEl = document.createElement("div");
    msgEl.className = "toast-message";
    msgEl.textContent = message;
    el.appendChild(msgEl);
    return _show(el, rest);
  }
  function toastEl(el, options = {}) {
    let t;
    if (el instanceof HTMLTemplateElement) {
      t = el.content.firstElementChild?.cloneNode(true);
    } else if (el) {
      t = el.cloneNode(true);
    }
    if (!t) {
      return;
    }
    t.removeAttribute("id");
    return _show(t, options);
  }
  function toastClear(placement) {
    if (placement && toasts[placement]) {
      toasts[placement].innerHTML = "";
      toasts[placement].hidePopover();
    } else {
      Object.values(toasts).forEach((c) => {
        c.innerHTML = "";
        c.hidePopover();
      });
    }
  }

  // src/js/index.js
  var ot = window.ot || (window.ot = {});
  ot.toast = toast;
  ot.toast.el = toastEl;
  ot.toast.clear = toastClear;
})();
