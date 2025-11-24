document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.connect__tabs-control');
  const tabItems = document.querySelectorAll('.connect__tabs-item');

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Убираем активный класс со всех кнопок
      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      // Добавляем активный класс на нажатую кнопку
      button.classList.add('is-active');

      // Скрываем все табы
      tabItems.forEach(item => item.classList.remove('is-active'));
      // Показываем соответствующий таб
      tabItems[index].classList.add('is-active');
    });
  });
});
