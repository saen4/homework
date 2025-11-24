const basket = ["Арбуз", "Книга", "Кофе", "Макароны", "Молоко", "Сахар", "Яблоки"]
const sectionEl = document.querySelector('.basket');

const ulEl = document.createElement('ul')
ulEl.classList.add('basket__list');
sectionEl.append(ulEl);


function sortBasket() {
    for (let i = 0; i < basket.length - 1; i++) {
        for (let j = 0; j < basket.length - i - 1; j++) {
            if (basket[j] > basket[j + 1]) {
                let temp = basket[j];
                basket[j] = basket[j + 1];
                basket[j + 1] = temp;
            }
        }
    }
}

function renderList(arr) {
    ulEl.innerHTML = '';
    sortBasket();
    for (let i = 0; i < arr.length; i++) {
        const liEl = document.createElement('li');
        liEl.textContent = `${i + 1}) ${arr[i]}`;
        ulEl.append(liEl);
    }
}

renderList(basket);

const addBtn = document.querySelector('.basket__btn');

function addProduct() {
    const productName = prompt('Введите название товара:');

    if (productName === '') {
        alert('Название товара не введено!');
        return;
    }

    basket.push(productName);
    renderList(basket);
}

addBtn.addEventListener('click', addProduct);