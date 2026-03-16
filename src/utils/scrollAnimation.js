export function initScrollAnimations() {
  const fadeEls = document.querySelectorAll('.fade-up');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  fadeEls.forEach((el) => observer.observe(el));
}
