const calculatorForm = document.querySelector('.calculator__form');
const productName = document.querySelector('#product-name');
const productWeight = document.querySelector('#product-weight');
const deliveryDistance = document.querySelector('#delivery-distance');
const addProductButton = document.querySelector('.calculator__from-btn');
const productTable = document.querySelector('.product-table');

calculatorForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const oldError = calculatorForm.querySelector('.calculator__form-error');
    if (oldError) {
        oldError.remove();
    }

    if (productWeight.value <= 0 || deliveryDistance.value <= 0) {
        const error = document.createElement('span');
        error.textContent = 'Пожалуйста, введите корректные значения для веса и расстояния';
        error.classList.add('calculator__form-error');
        calculatorForm.append(error);
        return;
    }

    const trEl = document.createElement('tr');
    const tdElName = document.createElement('td');
    const tdElWeight = document.createElement('td');
    const tdElDistance = document.createElement('td');
    const tdElCoast = document.createElement('td');

    tdElName.append(productName.value);
    tdElWeight.append(productWeight.value);
    tdElDistance.append(deliveryDistance.value);

    const coastShip = function (a, b, c) {
        a = productWeight.value
        b = deliveryDistance.value
        c = 10
        return (a * b) / 10;
    }

    tdElCoast.append(coastShip())

    trEl.append(tdElName)
    trEl.append(tdElWeight)
    trEl.append(tdElDistance)
    trEl.append(tdElCoast)

    productTable.append(trEl)



    calculatorForm.reset()
});

