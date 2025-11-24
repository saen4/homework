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

validate.onSuccess(handleFormSubmit);

async function handleFormSubmit(e) {
    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseYear = document.getElementById("releaseYear").value;
    const isWatched = document.getElementById("isWatched").checked;

    const film = {
        title: title,
        genre: genre,
        releaseYear: releaseYear,
        isWatched: isWatched,
    };

    await addFilm(film);

    document.querySelector('#film-form').reset();
}

async function addFilm(film) {
    await fetch("https://sb-film.skillbox.cc/films", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            email: "ovikdevil@gmail.com",
        },
        body: JSON.stringify(film),
    });
    renderTable();
}

async function renderTable() {
    const params = new URLSearchParams();

    const nameFilter = document.getElementById('filter-name').value;
    const genreFilter = document.getElementById('filter-genre').value;
    const yearFilter = document.getElementById('filter-year').value;
    const watchedFilter = document.getElementById('filter-watched').value;

    if (nameFilter) params.append('title', nameFilter);
    if (genreFilter) params.append('genre', genreFilter);
    if (yearFilter) params.append('releaseYear', yearFilter);
    if (watchedFilter === "viewed") params.append('isWatched', 'true');
    if (watchedFilter === "not-viewed") params.append('isWatched', 'false');

    const url = `https://sb-film.skillbox.cc/films${params.toString() ? `?${params.toString()}` : ''}`;

    const filmsResponse = await fetch(url, {
        headers: {
            email: "ovikdevil@gmail.com",
        },
    });

    const films = await filmsResponse.json();

    films.sort((a, b) => b.releaseYear - a.releaseYear);

    const filmTableBody = document.getElementById("film-tbody");

    filmTableBody.innerHTML = "";

    films.forEach((film, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button class="film-tbody__button" data-id="${film.id}">Удалить</button>
            </td>
        `;
        filmTableBody.appendChild(row);
    });

    document.querySelectorAll('.film-tbody__button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filmId = e.target.getAttribute('data-id');
            deleteFilm(filmId);
        });
    });
}

async function deleteFilm(filmId) {
    await fetch(`https://sb-film.skillbox.cc/films/${filmId}`, {
        method: "DELETE",
        headers: {
            email: "ovikdevil@gmail.com",
        },
    });
    renderTable();
}

async function deleteAllFilms() {
    await fetch("https://sb-film.skillbox.cc/films", {
        method: "DELETE",
        headers: {
            email: "ovikdevil@gmail.com",
        },
    });
    renderTable();
}

document.getElementById('filter-name').addEventListener('input', renderTable);
document.getElementById('filter-genre').addEventListener('input', renderTable);
document.getElementById('filter-year').addEventListener('input', renderTable);
document.getElementById('filter-watched').addEventListener('change', renderTable);

document.getElementById('delete-all').addEventListener('click', deleteAllFilms);

renderTable();