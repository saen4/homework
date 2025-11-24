function getRandomDelay() {
  return Math.floor(Math.random() * 3000) + 2000;
}

function startCatImages() {
  const delay = getRandomDelay();
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(['img/cat1.jpg', 'img/cat2.jpg', 'img/cat3.jpg']);
    }, delay);
  });
  return { promise, delay };
}

function startDogImages() {
  const delay = getRandomDelay();
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(['img/dog1.jpg', 'img/dog2.jpg', 'img/dog3.jpg']);
    }, delay);
  });
  return { promise, delay };
}

const progress = (time, container, afterEl) => {
  if (time < 2) time = 2;

  return new Promise((resolve) => {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);

    const timer = document.createElement('div');
    timer.className = 'progress-bar__timer';
    timer.textContent = '0 с';
    progressContainer.appendChild(timer);

    if (afterEl) {
      afterEl.after(progressContainer);
    } else {
      container.appendChild(progressContainer);
    }

    progressBar.style.transition = 'none';
    progressBar.style.transform = 'scaleX(0)';
    void progressBar.offsetWidth;

    let secondsPassed = 0;
    const timerInterval = setInterval(() => {
      secondsPassed++;
      timer.textContent = `${secondsPassed} с`;
    }, 1000);

    requestAnimationFrame(() => {
      progressBar.style.transition = `transform ${time}s linear`;
      progressBar.style.transform = 'scaleX(1)';
    });

    setTimeout(() => {
      clearInterval(timerInterval);
      resolve(progressContainer);
    }, time * 1000);
  });
};

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
  return row;
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('images-container');
  const catRow = displayImages([], container);
  const { promise: catPromise, delay: catDelay } = startCatImages();
  const catProgress = progress(catDelay / 1000, container, catRow);
  const catUrls = await catPromise;
  await catProgress;
  catRow.innerHTML = '';
  catUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Image';
    catRow.appendChild(img);
  });

  const dogRow = displayImages([], container);
  const { promise: dogPromise, delay: dogDelay } = startDogImages();
  const dogProgress = progress(dogDelay / 1000, container, dogRow);
  const dogUrls = await dogPromise;
  await dogProgress;
  dogRow.innerHTML = '';
  dogUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Image';
    dogRow.appendChild(img);
  });
});
