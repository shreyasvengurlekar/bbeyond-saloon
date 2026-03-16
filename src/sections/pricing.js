import { PRICING } from '../data/services.data.js';

export function renderPricing() {
  const grid = document.getElementById('pricing-grid');
  if (!grid) return;

  grid.innerHTML = PRICING.map((p) => `
    <article class="price-card${p.featured ? ' featured' : ''}">
      <div class="price-tag">
        <div class="price-service-name">${p.name}</div>
        <div class="price-icon" aria-hidden="true">${p.icon}</div>
      </div>
      <div class="price-amount">${p.price} <span>${p.range}</span></div>
      <p class="price-desc">${p.desc}</p>
      <button
        class="price-book-btn"
        onclick="bookService('${p.value}')"
        aria-label="Book ${p.name}"
      >Book Now →</button>
    </article>
  `).join('');
}
