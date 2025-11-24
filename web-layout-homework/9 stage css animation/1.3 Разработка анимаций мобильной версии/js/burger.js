document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const burgerBtn = document.querySelector(".header__burger");

  burgerBtn.addEventListener("click", () => {
    header.classList.toggle("header--open");
  });
});
