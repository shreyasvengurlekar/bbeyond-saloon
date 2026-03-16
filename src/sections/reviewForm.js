import { showToast } from '../utils/toast.js';
import { getEl, qs }  from '../utils/dom.js';

export function initReviewForm(db) {
  window.submitReview = async function () {
    const name   = getEl('r-name')?.value.trim()               ?? '';
    const rating = qs('input[name="rating"]:checked');
    const best   = getEl('r-best')?.value                      ?? '';
    const review = getEl('r-review')?.value.trim()             ?? '';

    if (!name || !rating || !best || !review) {
      alert('Please fill all fields and select a star rating!');
      return;
    }

    const btn = getEl('review-submit-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

    try {
      await db.collection('reviews').add({
        name,
        rating:    parseInt(rating.value, 10),
        best,
        review,
        date:      new Date().toLocaleDateString('en-IN'),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Reset fields
      if (getEl('r-name'))   getEl('r-name').value   = '';
      if (getEl('r-best'))   getEl('r-best').value   = '';
      if (getEl('r-review')) getEl('r-review').value = '';
      document.querySelectorAll('input[name="rating"]').forEach((r) => (r.checked = false));

      showToast("🌟 Thank you for your review! It's now live.");
      loadLiveReviews(db);

    } catch (err) {
      console.error('[Review error]', err);
      alert('Could not submit review. Please try again.');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '⭐ Submit Review'; }
    }
  };
}

export function loadLiveReviews(db) {
  const list = getEl('live-review-list');
  if (!list) return;

  db.collection('reviews')
    .orderBy('timestamp', 'desc')
    .limit(10)
    .onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          list.innerHTML = '<div class="review-empty">No reviews yet. Be the first to review!</div>';
          return;
        }
        list.innerHTML = snapshot.docs.map((doc) => {
          const r     = doc.data();
          const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
          return `
            <div class="live-review-item">
              <div class="live-review-stars" aria-label="${r.rating} out of 5 stars">${stars}</div>
              <div class="live-review-text">"${r.review}"</div>
              <div style="font-size:0.75rem;color:var(--orange);margin-bottom:0.5rem;">🏆 Best part: ${r.best}</div>
              <div class="live-review-meta">
                <span class="live-review-name">— ${r.name}</span>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                  <span class="live-review-badge">Verified</span>
                  <span class="live-review-date">${r.date || ''}</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
      },
      (err) => {
        console.error('[Live reviews error]', err);
        list.innerHTML = '<div class="review-empty">Could not load reviews.</div>';
      }
    );
}
