const growthValues = [164, 157, 160, 143, 170];
const sectionEl = document.querySelector('.growth');

const ulEl = document.createElement('ul');
ulEl.classList.add('growth__list');
sectionEl.append(ulEl);

function renderList(arr) {
    ulEl.innerHTML = '';
    
    for (let i = 0; i < arr.length; i++) {
        const liEl = document.createElement('li');
        liEl.textContent = `${i + 1}) ${arr[i]}`;
        ulEl.append(liEl);
    }
}

renderList(growthValues);

const addButton = document.querySelector('.growth__btn--add');

function addGrowth() {
    const newGrowth = prompt('Введите рост');

    if (newGrowth === null) return;

    if (newGrowth === '') {
        alert('Рост не введен!');
        return;
    }

    growthValues.push(Number(newGrowth));
    renderList(growthValues);
}

addButton.addEventListener('click', addGrowth);

const filterButton = document.querySelector('.growth__btn--filter');

function filterGrowth() {
    const minFilter = prompt("Введите минимальный рост");
    
    if (minFilter === null) return;
    
    if (minFilter === '') {
        alert('Минимальный рост не введен!');
        return;
    }

    const result = [];
    for (const item of growthValues) {
        if (item >= Number(minFilter)) {
            result.push(item);
        }
    }
    
    renderList(result);
}

filterButton.addEventListener('click', filterGrowth);