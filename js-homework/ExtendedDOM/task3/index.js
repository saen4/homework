const numbers = [100, 500, 250, 750, 300];
const ascending = document.querySelector('.task__btn--ascending');
const descending = document.querySelector('.task__btn--descending');
const list = document.querySelector('.task__list');

function renderList() {
    list.innerHTML = '';
    for (let i = 0; i < numbers.length; i++) {
        const item = document.createElement('li');
        item.classList.add('task__list-item');
        item.textContent = `${numbers[i]}`;
        list.append(item);
    }
}

function bubbleSortAsc(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = 0; j < numbers.length - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                let temp = numbers[j]
                numbers[j] = numbers[j + 1]
                numbers[j + 1] = temp;
            }
        }
    }
}

function bubbleSortDes(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = 0; j < numbers.length - 1; j++) {
            if (numbers[j] < numbers[j + 1]) {
                let temp = numbers[j]
                numbers[j] = numbers[j + 1]
                numbers[j + 1] = temp;
            }
        }
    }
}

renderList();

ascending.addEventListener('click', function () {
    bubbleSortAsc(numbers);
    renderList();
});

descending.addEventListener('click', function () {
    bubbleSortDes(numbers);
    renderList();
});
