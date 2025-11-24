function progress(time) {
    if (time < 2) {
        time = 2;
    }
    
    const progressBar = document.getElementById('progress-bar');
    const timerContainer = document.createElement('div');
    timerContainer.className = 'progress-bar__timer';
    timerContainer.innerHTML = '<span class="progress-bar__timer-value">0</span> с';
    
    progressBar.after(timerContainer);
    
    const timerValue = document.querySelector('.progress-bar__timer-value');
    
    progressBar.style.transition = 'none';
    progressBar.style.transform = 'scaleX(0)';
    
    setTimeout(() => {
        let secondsPassed = 0;
        
        const timerInterval = setInterval(() => {
            secondsPassed++;
            timerValue.textContent = secondsPassed;
        }, 1000);
        
        progressBar.style.transition = `transform ${time}s linear`;
        progressBar.style.transform = 'scaleX(1)';
        
        setTimeout(() => {
            clearInterval(timerInterval);
        }, time * 1000);
        
    }, 10);
}

document.addEventListener('DOMContentLoaded', function() {
    progress(7);
});