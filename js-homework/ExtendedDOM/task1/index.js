const mainImageContainer = document.querySelector('.gallery__image-zoom');
const galleryImageWrapper = document.querySelector('.gallery__wrapper');
const newImage = document.createElement('img');


galleryImageWrapper.addEventListener('click', (e) => {

    if (e.target.src) {
        newImage.src = e.target.src
        newImage.alt = e.target.alt
        mainImageContainer.append(newImage)
    }
})
