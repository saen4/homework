import {
    getFormEl,
    getInputEl,
    getSubmitButtonEl,
    getFormTitleEl
} from "./components.js"
import { navigate } from "./navigate.js"
import { addProductToStorage } from "./storage.js"

export function createAddProduct(containerEl) {
    const formEl = getFormEl()
    const formTitleEl = getFormTitleEl("Добавить запись")
    const nameInput = getInputEl("text", "name", "Название")
    const shelfInput = getInputEl("text", "shelf", "Полка")
    const weightInput = getInputEl("number", "weight", "Вес")
    const dateInput = getInputEl("date", "date", "Время хранения")
    const submitButtonEl = getSubmitButtonEl("Добавить запись")

    formEl.append(
        formTitleEl,
        nameInput,
        shelfInput,
        weightInput,
        dateInput,
        submitButtonEl
    )

    containerEl.append(formEl)

    const validate = new JustValidate(formEl)

    validate
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Введите название товара'
            }
        ])
        .addField('#shelf', [
            {
                rule: 'required',
                errorMessage: 'Введите номер полки'
            }
        ])
        .addField('#weight', [
            {
                rule: 'required',
                errorMessage: 'Введите вес'
            },
            {
                rule: 'number',
                errorMessage: 'Вес должен быть числом'
            }
        ])
        .addField('#date', [
            {
                rule: 'required',
                errorMessage: 'Введите дату'
            }
        ])
        .onSuccess((event) => {
            event.preventDefault()

            const formData = {
                name: document.getElementById("name").value,
                shelf: document.getElementById("shelf").value,
                weight: document.getElementById("weight").value,
                date: document.getElementById("date").value
            }

            addProductToStorage(formData)
            document.removeEventListener('click', handleClickOutside)
            navigate()
        })

    const handleClickOutside = (event) => {
        if (!formEl.contains(event.target)) {
            document.removeEventListener('click', handleClickOutside)
            navigate()
        }
    }

    setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
    }, 100)

    formEl.addEventListener('click', (event) => {
        event.stopPropagation()
    })
}