import { getContainerEl, getLoaderEl } from "./components.js"

export async function navigate(cardName) {
    const appEl = document.getElementById("app")
    
    appEl.innerHTML = ''
    const loaderEl = getLoaderEl()
    appEl.append(loaderEl)

    const mainContainerEl = getContainerEl()

    await new Promise(resolve => setTimeout(resolve, 400))

    switch (cardName) {
        case "add-product":
            const { createAddProduct } = await import("./createAddProduct.js")
            appEl.innerHTML = ''
            appEl.append(mainContainerEl)
            createAddProduct(mainContainerEl)
            break
        default:
            const { createWarehouse } = await import("./createWarehouse.js")
            appEl.innerHTML = ''
            appEl.append(mainContainerEl)
            createWarehouse(mainContainerEl)
    }
}
