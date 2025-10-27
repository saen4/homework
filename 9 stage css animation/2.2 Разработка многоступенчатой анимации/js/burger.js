document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.header__burger');
  const header = document.querySelector('.header');

  if (burgerButton && header) {
    burgerButton.addEventListener('click', () => {
      header.classList.toggle('header--open');
    });
  }
});
