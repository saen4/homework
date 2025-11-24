import { getCardEl, getCardWrapperEl, getCardTopWrapperEl, getCardTitleEl, getCardButtonAddEl } from "./components.js"
import { navigate } from "./navigate.js"
import { getFromLocalStorage, deleteProductFromStorage, saveToLocalStorage } from "./storage.js"

export function createWarehouse(containerEl) {
    const cardEl = getCardEl()
    const cardWrapperEl = getCardWrapperEl()
    const cardTopWrapperEl = getCardTopWrapperEl()
    const cardTitleEl = getCardTitleEl("Склад")
    const cardButtonAddEl = getCardButtonAddEl("Добавить запись")

    const tableEl = getTableEl()

    cardTopWrapperEl.append(cardTitleEl, cardButtonAddEl)
    cardWrapperEl.append(tableEl)
    cardEl.append(cardTopWrapperEl, cardWrapperEl)
    containerEl.append(cardEl)

    cardButtonAddEl.addEventListener("click", () => {
        navigate("add-product")
    })

    loadProductsData()

    function getTableEl() {
        const tableEl = document.createElement("table");
        tableEl.classList.add("table-product")

        const theadEl = document.createElement("thead")
        const headerRowEl = document.createElement("tr")

        const headers = ["Название", "Полка", "Вес", "Время хранения", ""]

        headers.forEach(headerText => {
            const thEl = document.createElement("th")
            thEl.textContent = headerText
            thEl.classList.add("table-product__header")

            if (headerText !== "") {
                thEl.style.cursor = 'pointer'
                thEl.addEventListener('click', () => sortTable(headerText))
            }

            headerRowEl.appendChild(thEl)
        })

        theadEl.appendChild(headerRowEl)
        tableEl.appendChild(theadEl)

        const tbodyEl = document.createElement("tbody")
        tbodyEl.classList.add("table-product__body")
        tbodyEl.id = "productsTableBody"
        tableEl.appendChild(tbodyEl)

        return tableEl
    }

    function sortTable(columnName) {
        const products = getFromLocalStorage()

        const sortedProducts = [...products].sort((a, b) => {
            switch (columnName) {
                case "Название":
                    return a.name.localeCompare(b.name)
                case "Полка":
                    return a.shelf.localeCompare(b.shelf)
                case "Вес":
                    return parseFloat(a.weight) - parseFloat(b.weight)
                case "Время хранения":
                    return new Date(a.date.split('.').reverse().join('-')) - new Date(b.date.split('.').reverse().join('-'))
                default:
                    return 0
            }
        })

        saveToLocalStorage(sortedProducts)

        loadProductsData()
    }

    function loadProductsData() {
        const products = getFromLocalStorage()
        const tbodyEl = document.getElementById("productsTableBody")

        tbodyEl.innerHTML = ''

        products.forEach(product => {
            const rowEl = document.createElement("tr")
            rowEl.classList.add("table-product__row")

            rowEl.innerHTML = `
                <td class="table-product__cell">${product.name}</td>
                <td class="table-product__cell">${product.shelf}</td>
                <td class="table-product__cell">${product.weight} кг</td>
                <td class="table-product__cell">${product.date}</td>
                <td class="table-product__cell">
                    <button class="table-product__btn-delete" data-id="${product.id}">Удалить</button>
                </td>
            `

            tbodyEl.appendChild(rowEl)
        })

        addDeleteHandlers()
    }

    function addDeleteHandlers() {
        const deleteButtons = document.querySelectorAll('.table-product__btn-delete')

        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productId = parseInt(this.getAttribute('data-id'))
                deleteProduct(productId)
            })
        })
    }

    function deleteProduct(productId) {
        deleteProductFromStorage(productId)
        loadProductsData()
    }
}