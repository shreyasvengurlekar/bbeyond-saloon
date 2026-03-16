import { SERVICES } from '../data/services.data.js';

export function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = SERVICES.map((s) => `
    <article class="service-card">
      <div class="service-num" aria-hidden="true">${s.num}</div>
      <div class="service-icon" aria-hidden="true">${s.icon}</div>
      <h3 class="service-name">${s.name}</h3>
      <p class="service-desc">${s.desc}</p>
      <button
        class="service-book-btn"
        onclick="bookService('${s.value}')"
        aria-label="Book ${s.name}"
      >Book Now</button>
    </article>
  `).join('');
}
