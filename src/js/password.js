/**
 * oat - Password Toggle Enhancement
 * Adds show/hide toggle button to password inputs.
 * Progressive enhancement: native password works without JS.
 */

const EYE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E\")";
const EYE_OFF = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 2 20 20'/%3E%3Cpath d='M6.7 6.7C3.7 8.8 2 12 2 12s3 7 10 7c2 0 3.8-.6 5.3-1.7'/%3E%3Cpath d='M20 14.9A13.8 13.8 0 0 0 22 12s-3-7-10-7c-.7 0-1.4.1-2.1.3'/%3E%3Cpath d='m14.1 14.1a3 3 0 0 1-4.2-4.2'/%3E%3C/svg%3E\")";

const enhance = input => {
  if (input.dataset.pwEnhanced != null) return;
  input.dataset.pwEnhanced = '';

  const wrapper = document.createElement('span');
  wrapper.className = 'input-password';
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.tabIndex = -1;
  btn.className = 'input-password-toggle';
  btn.setAttribute('aria-label', 'Show password');
  btn.style.setProperty('--pw-icon', EYE);

  btn.addEventListener('click', () => {
    const visible = input.type === 'text';
    input.type = visible ? 'password' : 'text';
    btn.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
    btn.style.setProperty('--pw-icon', visible ? EYE : EYE_OFF);
    input.focus();
  });

  wrapper.appendChild(btn);
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[type=password]').forEach(enhance);

  new MutationObserver(muts => {
    for (const m of muts)
      for (const n of m.addedNodes) {
        if (n.nodeType !== 1) continue;
        if (n.matches?.('input[type=password]')) enhance(n);
        n.querySelectorAll?.('input[type=password]').forEach(enhance);
      }
  }).observe(document.body, { childList: true, subtree: true });
});
