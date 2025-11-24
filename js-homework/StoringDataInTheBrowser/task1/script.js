const validate = new JustValidate('#film-form');

validate.addField('#title', [
    {
        rule: 'required',
        errorMessage: 'Введите название фильма'
    }
]);

validate.addField('#genre', [
    {
        rule: 'required',
        errorMessage: 'Введите жанр фильма'
    }
]);

validate.addField('#releaseYear', [
    {
        rule: 'required',
        errorMessage: 'Введите год фильма'
    },
    {
        rule: 'number',
        errorMessage: 'Год должен быть числом'
    },
    {
        rule: 'minNumber',
        value: 1900,
        errorMessage: 'Дата выхода должна быть не ранее 1900 года'
    },
    {
        rule: 'maxNumber',
        value: 2025,
        errorMessage: 'Дата выхода должна быть не позднее 2025 года'
    }
]);

function handleFormSubmit() {
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;

    const film = {
        title,
        genre,
        releaseYear,
        isWatched
    }

    const editingIndex = document.querySelector('#film-form').getAttribute('data-editing-index');

    if (editingIndex !== null) {
        updateFilmInLocalStorage(film, editingIndex);
        cancelEditing();
    } else {
        addFilmToLocalStorage(film);
    }
    document.querySelector('#film-form').reset();
}

validate.onSuccess(handleFormSubmit);

function addFilmToLocalStorage(film) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    films.push(film)
    localStorage.setItem('films', JSON.stringify(films));
    renderTable()
}

function updateFilmInLocalStorage(film, index) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    films[index] = film;
    localStorage.setItem('films', JSON.stringify(films));
    renderTable()
}

function renderTable(filmsToRender = null) {
    const films = filmsToRender || JSON.parse(localStorage.getItem('films')) || [];
    const filmTableBody = document.querySelector('#film-tbody');

    filmTableBody.innerHTML = ""

    films.forEach((film, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${film.title}</td>
        <td>${film.genre}</td>
        <td>${film.releaseYear}</td>
        <td>${film.isWatched ? "Да" : "Нет"}</td>
        <td>
            <button class="edit-btn" data-index="${index}">Редактировать</button>
            <button class="delete-btn" data-index="${index}">Удалить</button>
        </td>
        `;

        filmTableBody.appendChild(row);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteFilm(index);
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editFilm(index);
        });
    });
}

function deleteFilm(index) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    films.splice(index, 1);
    localStorage.setItem('films', JSON.stringify(films));
    renderTable();
}

function editFilm(index) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films[index];
    document.querySelector('#title').value = film.title;
    document.querySelector('#genre').value = film.genre;
    document.querySelector('#releaseYear').value = film.releaseYear;
    document.querySelector('#isWatched').checked = film.isWatched;
    document.querySelector('#film-form').setAttribute('data-editing-index', index);
    
    const submitButton = document.querySelector('#film-form button[type="submit"]');
    submitButton.textContent = 'Обновить';
    document.querySelector('.cancel-edit-btn').style.display = 'inline-block';
    
    validate.refresh();
}

function cancelEditing() {
    document.querySelector('#film-form').removeAttribute('data-editing-index');
    document.querySelector('#film-form').reset();
    
    const submitButton = document.querySelector('#film-form button[type="submit"]');
    submitButton.textContent = 'Добавить';
    document.querySelector('.cancel-edit-btn').style.display = 'none';
    
    validate.refresh();
}

function sortFilms(films, sortBy) {
    const sortedFilms = [...films];

    switch (sortBy) {
        case 'titleSort':
            return sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
        case 'genreSort':
            return sortedFilms.sort((a, b) => a.genre.localeCompare(b.genre));
        case 'releaseYearSort':
            return sortedFilms.sort((a, b) => b.releaseYear - a.releaseYear);
        case 'isWatchedSort':
            return sortedFilms.sort((a, b) => {
                if (a.isWatched && !b.isWatched) return -1;
                if (!a.isWatched && b.isWatched) return 1;
                return 0;
            });
        default:
            return sortedFilms;
    }
}

const sortButton = document.querySelector('.film-table__sorting-button');
const sortSelect = document.querySelector('#sorting');

sortButton.addEventListener('click', function (e) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const selectedSort = sortSelect.value;
    const sortedFilms = sortFilms(films, selectedSort);
    renderTable(sortedFilms);
});

document.querySelector('.cancel-edit-btn').addEventListener('click', cancelEditing);

document.querySelector('.cancel-edit-btn').style.display = 'none';

renderTable();