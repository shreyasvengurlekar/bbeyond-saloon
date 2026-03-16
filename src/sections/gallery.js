import { GALLERY_IMAGES } from '../data/gallery.data.js';

export function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = GALLERY_IMAGES.map((img) => `
    <div
      class="gallery-item"
      onclick="openLightbox('${img.srcFull}')"
      role="button"
      tabindex="0"
      aria-label="View ${img.label} full size"
      onkeydown="if(event.key==='Enter'||event.key===' ')openLightbox('${img.srcFull}')"
    >
      <img src="${img.src}" alt="${img.alt}" loading="lazy" />
      <div class="gallery-overlay" aria-hidden="true">
        <span>${img.label}</span>
      </div>
    </div>
  `).join('');
}
