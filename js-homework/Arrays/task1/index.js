const books = ['Мастер и Маргарита', 'Гарри Поттер', 'За пропастью во ржи', 'Властелин колец', 'Дюна', 'Отцы и дети']
const sectionEl = document.querySelector('.library');

const ulEl = document.createElement('ul')
ulEl.classList.add('library__list')

sectionEl.append(ulEl)

function renderBooks() {

    ulEl.innerHTML = '';
    for (let i = 0; i < books.length; i++) {
        const liEl = document.createElement('li')
        liEl.classList.add('library__item')
        liEl.textContent = `${i + 1}) ${books[i]}`
        ulEl.append(liEl)
    }
}

function addBook() {
    const bookTitle = prompt('Введите название книги')

    if (bookTitle === null) return;

    if (bookTitle.trim() === '') {
        alert('Название книги не введено!');
    } else {
        books.push(bookTitle);
        renderBooks();
    }
}

const addButton = document.querySelector('.library-btn--add');
addButton.addEventListener('click', addBook);

renderBooks();

function find(books, search) {
    for (let i = 0; i < books.length; i++) {
        if ((books[i].toLowerCase() === search.toLowerCase())) {
            return i;
        }
    }
    return -1;
}

const searchButton = document.querySelector('.library-btn--search');

searchButton.onclick = function () {

    const allItems = document.querySelectorAll('.library__item');
    allItems.forEach(item => {
        item.removeAttribute('style');
    });

    const search = prompt("Введите название книги")


    if (search) {
        const result = find(books, search);

        if (result > -1) {
            document.querySelector(`li:nth-child(${result + 1})`).style.color = "green"
            document.querySelector(`li:nth-child(${result + 1})`).style.textDecoration = "underline";
        } else {
            alert("Книга не найдена!");
        }
    }
}


