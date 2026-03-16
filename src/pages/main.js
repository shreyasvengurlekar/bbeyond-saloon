import { FIREBASE_CONFIG, EMAILJS_PUBLIC_KEY } from '../data/firebase.config.js';

import { initNav }              from '../components/nav.js';
import { initLightbox }         from '../components/lightbox.js';
import { initScrollAnimations } from '../utils/scrollAnimation.js';

import { renderServices }       from '../sections/services.js';
import { renderPricing }        from '../sections/pricing.js';
import { renderGallery }        from '../sections/gallery.js';
import { renderWhyFeatures }    from '../sections/why.js';
import { renderStaticReviews }  from '../sections/reviews.js';

import { initBooking }                     from '../sections/booking.js';
import { initReviewForm, loadLiveReviews } from '../sections/reviewForm.js';
import { initAdmin }                       from '../sections/admin.js';

// ── 1. Firebase + EmailJS init ────────────────────────────────────────────────
firebase.initializeApp(FIREBASE_CONFIG);
const db   = firebase.firestore();
const auth = firebase.auth();
emailjs.init(EMAILJS_PUBLIC_KEY);

// ── 2. Render dynamic sections from data ──────────────────────────────────────
renderServices();
renderPricing();
renderGallery();
renderWhyFeatures();
renderStaticReviews();

// ── 3. Init components & animations ──────────────────────────────────────────
initNav();
initLightbox();
initScrollAnimations(); // must run AFTER rendering so all .fade-up els exist

// ── 4. Init form logic ────────────────────────────────────────────────────────
initBooking(db);
initReviewForm(db);
initAdmin(db, auth);
loadLiveReviews(db);

// ── 5. Global keyboard shortcuts ──────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('login-modal')?.classList.contains('active')) {
    window.adminLogin?.();
  }
  if (e.key === 'Escape') {
    document.getElementById('login-modal')?.classList.remove('active');
    window.closeLightbox?.();
    window.closeMenu?.();
  }
});
