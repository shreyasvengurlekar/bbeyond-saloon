import { WHY_FEATURES } from '../data/content.data.js';

export function renderWhyFeatures() {
  const grid = document.getElementById('features-grid');
  if (!grid) return;

  grid.innerHTML = WHY_FEATURES.map((f) => `
    <div class="feature-block">
      <div class="feature-num" aria-hidden="true">${f.num}</div>
      <div class="feature-icon" aria-hidden="true">${f.icon}</div>
      <h3 class="feature-title">${f.title}</h3>
      <p class="feature-desc">${f.desc}</p>
    </div>
  `).join('');
}
