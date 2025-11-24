function getRandomDelay() {
    return Math.floor(Math.random() * 3000) + 2000;
}

function getCatImages() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const catUrls = [
                'img/cat1.jpg',
                'img/cat2.jpg', 
                'img/cat3.jpg'
            ];
            resolve(catUrls);
        }, getRandomDelay());
    });
}

function getDogImages() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dogUrls = [
                'img/dog1.jpg',
                'img/dog2.jpg',
                'img/dog3.jpg'
            ];
            resolve(dogUrls);
        }, getRandomDelay());
    });
}

function displayImages(urls, container) {
    const row = document.createElement('div');
    row.className = 'image-row';
    
    urls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Image';
        row.appendChild(img);
    });
    
    container.appendChild(row);
}

document.addEventListener('DOMContentLoaded', function() {
    const imagesContainer = document.getElementById('images-container');
    
    const container = document.createElement('div');
    container.className = 'container';
    imagesContainer.appendChild(container);
    
    const catsPromise = getCatImages();
    const dogsPromise = getDogImages();

    catsPromise.then(catUrls => {
        displayImages(catUrls, container);
    });

    dogsPromise.then(dogUrls => {
        displayImages(dogUrls, container);
    });
});