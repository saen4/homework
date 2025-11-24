//контейнер
export function getContainerEl() {
    const containerEl = document.createElement("div")
    containerEl.classList.add("container")
    return containerEl
}

//карточка
export function getCardEl() {
    const cardEl = document.createElement("div")
    cardEl.classList.add("warehouse")
    return cardEl
}

//обертка
export function getCardWrapperEl() {
    const cardWrapperEl = document.createElement("div")
    cardWrapperEl.classList.add("warehouse__wrapper")
    return cardWrapperEl
}

//обертка для топ
export function getCardTopWrapperEl() {
    const cardTopWrapperEl = document.createElement("div")
    cardTopWrapperEl.classList.add("warehouse__top-wrapper")
    return cardTopWrapperEl
}

//заголовок
export function getCardTitleEl(text) {
    const cardTitleEl = document.createElement("h1")
    cardTitleEl.classList.add("warehouse__ttitle")
    cardTitleEl.textContent = text
    return cardTitleEl
}

//кнопка добавить
export function getCardButtonAddEl(text) {
    const cardButtonAddEl = document.createElement("button")
    cardButtonAddEl.type = "button"
    cardButtonAddEl.classList.add("warehouse__btn-add")
    cardButtonAddEl.textContent = text
    return cardButtonAddEl
}

//форма
export function getFormEl() {
    const formEl = document.createElement("form")
    formEl.classList.add("add-product-form")
    return formEl
}

//инпут для формы
export function getInputEl(type, id, placeholder = "") {
    const inputEl = document.createElement("input")
    inputEl.type = type
    inputEl.id = id
    inputEl.classList.add("add-product-form__input")
    inputEl.placeholder = placeholder
    return inputEl
}

//кнопка отправки формы
export function getSubmitButtonEl(text) {
    const buttonEl = document.createElement("button")
    buttonEl.type = "submit"
    buttonEl.classList.add("add-product-form__submit")
    buttonEl.textContent = text
    return buttonEl
}

//заголовок формы
export function getFormTitleEl(text) {
    const titleEl = document.createElement("h1")
    titleEl.classList.add("add-product-form__title")
    titleEl.textContent = text
    return titleEl
}

//лоадер
export function getLoaderEl() {
    const loaderEl = document.createElement("div");
    loaderEl.classList.add("loader")

    for(let i = 1; i <= 3; i++) {
        const loaderDivEl = document.createElement("div");
        loaderEl.append(loaderDivEl)
    }

    return loaderEl
}
