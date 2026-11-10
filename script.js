const languageLinks = document.querySelectorAll('[data-language]');
const preferredLanguageKey = 'peka-language';

try {
  if (location.pathname.endsWith('/') && !location.hash &&
      localStorage.getItem(preferredLanguageKey) === 'en') {
    location.replace(new URL('english.html', location.href));
  }
} catch {
  // The language links still work when storage is unavailable.
}

languageLinks.forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      localStorage.setItem(preferredLanguageKey, link.dataset.language);
    } catch {
      // Allow navigation even when the browser blocks storage.
    }
    link.hash = location.hash;
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('arrived');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
