import { STATIC_REVIEWS } from '../data/content.data.js';

export function renderStaticReviews() {
  const grid = document.getElementById('static-reviews-grid');
  if (!grid) return;

  grid.innerHTML = STATIC_REVIEWS.map((r) => `
    <article class="review-card">
      <div class="stars" aria-label="${r.stars.length} star review">${r.stars}</div>
      <blockquote class="review-quote">"${r.quote}"</blockquote>
      <div class="review-author">
        <div class="review-avatar" aria-hidden="true">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-tag">${r.tag}</div>
        </div>
      </div>
    </article>
  `).join('');
}
