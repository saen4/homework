const userSurname = document.querySelector('#surname');
const userName = document.querySelector('#name');
const userSurnameCard = document.querySelector('.card__user--surname');
const userNameCard = document.querySelector('.card__user--name');
const selectColor = document.querySelector('.custom-select__field');
const card = document.querySelector('.card');

userSurname.addEventListener('focus', function (e) {
    userSurname.style.border = '1px solid blue'
    userSurname.style.outline = 'none'
});

userSurname.addEventListener('blur', function (e) {
    userSurname.style.border = '1px solid #cccccc'
});

userName.addEventListener('focus', function (e) {
    userName.style.border = '1px solid blue'
    userName.style.outline = 'none'
});

userName.addEventListener('blur', function (e) {
    userName.style.border = '1px solid #cccccc'
});

userSurname.addEventListener('input', function (e) {
    userSurnameCard.textContent = userSurname.value;
});

userName.addEventListener('input', function (e) {
    userNameCard.textContent = userName.value;
});


selectColor.addEventListener('change', function (e) {
    card.style.backgroundColor = this.value;
});

