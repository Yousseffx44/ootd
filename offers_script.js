function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.querySelector('.theme-toggle').textContent = isDark ? ' Dark' : ' Light';
}

const countdownElement = document.getElementById("countdown");

// وقت انتهاء ثابت 
const endTime = new Date().getTime() + (2 * 60 * 60 * 1000);

function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
        countdownElement.innerHTML = "Offer Ended ❌";
        clearInterval(timerInterval);
        return;
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}

// تشغيل التايمر
const timerInterval = setInterval(updateTimer, 1000);
updateTimer(); // تشغيل فوري