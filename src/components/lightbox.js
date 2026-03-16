export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

export function openLightbox(src) {
  const img      = document.getElementById('lightbox-img');
  const lightbox = document.getElementById('lightbox');
  if (!img || !lightbox) return;
  img.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Expose globally so dynamically rendered gallery HTML can call them
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;
