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
