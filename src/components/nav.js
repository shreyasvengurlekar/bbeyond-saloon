export function initNav() {
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mainNav       = document.getElementById('main-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-bottom-nav a');
  const sections      = document.querySelectorAll('section[id]');

  if (!hamburger || !mobileMenu) return;

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Exposed globally for mobile drawer link onclick attributes
  window.closeMenu = function () {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // Nav scroll shadow + active bottom nav link
  window.addEventListener('scroll', () => {
    // Shadow
    if (mainNav) {
      mainNav.style.boxShadow = window.scrollY > 30
        ? '0 4px 28px rgba(0,0,0,0.5)'
        : 'none';
    }

    // Active link
    let currentId = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) currentId = s.id;
    });
    mobileNavLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }, { passive: true });
}
