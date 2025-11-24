const promoCodeInput = document.querySelector('.promocode-form__input');
const promoCodeForm = document.querySelector('.promocode-form');

const promocodeObj = {
    promocode: "PROM50",
    gift: "Скидка 50%"
};

promoCodeInput.addEventListener('focus', () => {
    promoCodeInput.style.border = '1px solid #71aef3';
    promoCodeInput.style.outline = 'none'
});
promoCodeInput.addEventListener('blur', () => {
    promoCodeInput.style.border = '1px solid #cccccc';
});

function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=');
        acc[name] = value;
        return acc;
    }, {});
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

promoCodeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userPromoCodeInput = promoCodeInput.value.trim();
    const oldMessage = document.querySelector('.promocode-form__message');
    if (oldMessage) oldMessage.remove();

    if (userPromoCodeInput === promocodeObj.promocode) {
        promoCodeInput.style.color = '#00e600';

        const message = document.createElement('span');
        message.classList.add('promocode-form__message');
        message.textContent = `Промокод применён. ${promocodeObj.gift}`;
        promoCodeForm.append(message);

        setCookie('promocode', userPromoCodeInput, 30);
    } else {
        promoCodeInput.style.color = '#000000';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const cookie = getCookie();
    if (cookie.promocode === promocodeObj.promocode) {
        promoCodeInput.value = cookie.promocode;
        promoCodeInput.style.color = '#00e600';

        const message = document.createElement('span');
        message.classList.add('promocode-form__message');
        message.textContent = `Промокод применён. ${promocodeObj.gift}`;
        promoCodeForm.append(message);
    }
});