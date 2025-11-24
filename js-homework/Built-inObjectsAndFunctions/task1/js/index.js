const giftArr = [
    {
        title: "Скидка 20% на первую покупку в нашем магазине!",
        icon: "delivery.svg"
    },
    {
        title: "Скидка 10% на всё!",
        icon: "discount-2.svg"
    },
    {
        title: "Подарок при первой покупке в нашем магазине!",
        icon: "gift.svg"
    },
    {
        title: "Бесплатная доставка для вас!",
        icon: "delivery.svg"
    },
    {
        title: "Сегодня день больших скидок!",
        icon: "discount-3.svg"
    }
];

function getRandomGift() {
    const randomIndex = Math.floor(Math.random() * giftArr.length);
    return giftArr[randomIndex];
}

function showPopUp() {
    const popupEl = document.querySelector('.pop-up-card');
    const popupIcon = document.querySelector('.pop-up-card__icon');
    const popupTitle = document.querySelector('.pop-up-card__title');
    const popupButton = document.querySelector('.pop-up-card__button');
    const randomGift = getRandomGift();

    popupIcon.src = `img/${randomGift.icon}`;
    popupTitle.textContent = randomGift.title;
    popupEl.style.display = 'none';

    setTimeout(() => {
        popupEl.style.display = 'block';
    }, 3000);

    popupButton.addEventListener('click', function () {
        popupEl.style.display = 'none';
    });
    popupEl.addEventListener('click', function (e) {
        if (e.target === popupEl) {
            popupEl.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', showPopUp);