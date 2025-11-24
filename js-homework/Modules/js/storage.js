export function getFromLocalStorage() {
    const products = localStorage.getItem('warehouseProducts')
    return products ? JSON.parse(products) : []
}

export function saveToLocalStorage(products) {
    localStorage.setItem('warehouseProducts', JSON.stringify(products))
}

export function addProductToStorage(productData) {
    const existingProducts = getFromLocalStorage()
    const newProduct = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString()
    }
    existingProducts.push(newProduct)
    saveToLocalStorage(existingProducts)
}

export function deleteProductFromStorage(productId) {
    const products = getFromLocalStorage()
    const filteredProducts = products.filter(product => product.id !== productId)
    saveToLocalStorage(filteredProducts)
}