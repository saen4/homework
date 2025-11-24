const formEl = document.querySelector('.form');
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const userGender = document.querySelectorAll('input[name="gender"]');
const userEvaluation = document.querySelector('#evaluation');
const userInterests = document.querySelectorAll('input[name="interests"]');
const userComments = document.querySelector('#comments');
const submitBtn = document.querySelector('.form__button');
const resultsContainer = document.querySelector('.survey-form__results');

userEmail.addEventListener('invalid', function () {
    userEmail.setCustomValidity('Введите корректное значение');
});



formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    resultsContainer.innerHTML = '';

    const resultTitle = document.createElement('h2');
    resultTitle.classList.add('survey-form__results-title')
    resultTitle.textContent = 'Результаты опроса';
    resultsContainer.append(resultTitle);

    const resultList = document.createElement('ul');
    resultList.classList.add('survey-form__result-list');

    const renderListItem = (text) => {
        const li = document.createElement('li');
        li.classList.add('survey-form__result-item');
        li.textContent = text;
        return li;
    };

    resultList.append(renderListItem(`Имя пользователя: ${userName.value}`));

    resultList.append(renderListItem(`Email: ${userEmail.value}`));

    resultList.append(renderListItem(`Пол: ${userGender.value === 'man' ? 'Мужской' : 'Женский'}`))

    resultList.append(renderListItem(`Оценка сервиса: ${userEvaluation.value}`));

    const selectedInterests = Array.from(userInterests)
        .filter(interest => interest.checked)
        .map(interest => {
            let interestText;
            switch (interest.value) {
                case 'sport':
                    interestText = 'Спорт';
                    break;
                case 'music':
                    interestText = 'Музыка';
                    break;
                case 'trips':
                    interestText = 'Путешествия';
                    break;
                case 'movie':
                    interestText = 'Кино';
                    break;
                default:
                    interestText = interest.value;
            }
            return interestText;
        });

    resultList.append(renderListItem(`Интересы: ${selectedInterests.join(', ')}`));

    resultList.append(renderListItem(`Дополнительные комментарии: ${userComments.value}`));


    resultsContainer.append(resultList);

    formEl.reset();

});

userEmail.addEventListener('input', function () {
    userEmail.setCustomValidity('');
});




