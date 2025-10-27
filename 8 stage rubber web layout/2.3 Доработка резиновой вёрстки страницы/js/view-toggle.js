document.addEventListener("DOMContentLoaded", function () {
  const listBtn = document.querySelector(".btn--list");
  const gridBtn = document.querySelector(".btn--grid");
  const projectList = document.querySelector(".projects__list");
  const cards = document.querySelectorAll(".news-card");

  listBtn.addEventListener("click", () => {
    // Списком
    projectList.classList.remove("projects__list--grid");
    cards.forEach(card => card.classList.remove("news-card--grid"));

    listBtn.classList.add("btn--active");
    gridBtn.classList.remove("btn--active");
  });

  gridBtn.addEventListener("click", () => {
    // Плиткой
    projectList.classList.add("projects__list--grid");
    cards.forEach(card => card.classList.add("news-card--grid"));

    gridBtn.classList.add("btn--active");
    listBtn.classList.remove("btn--active");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const openBtn = document.querySelector('.header__menu:not(.header__menu--close)');
  const closeBtn = document.querySelector('.header__menu--close');

  if (openBtn && closeBtn && header) {
    openBtn.addEventListener('click', function () {
      header.classList.add('header--open');
    });

    closeBtn.addEventListener('click', function () {
      header.classList.remove('header--open');
    });
  }
});
