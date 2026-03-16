import { getEl } from './dom.js';

export function showToast(msg, duration = 3500) {
  const toast = getEl('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
