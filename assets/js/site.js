const navToggle = document.querySelector('[data-nav-toggle]');
const navigation = document.querySelector('[data-nav]');

if (navToggle && navigation) {
  navToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navigation.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
const yearTarget = document.querySelector('[data-current-year]');
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}
