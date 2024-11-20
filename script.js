document.addEventListener('DOMContentLoaded', function() {
    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let lapCounter = 1;

    const display = document.getElementById('display');
    const lapList = document.getElementById('lapList');

    document.getElementById('start').onclick = startTimer;
    document.getElementById('pause').onclick = pauseTimer;
    document.getElementById('reset').onclick = resetTimer;
    document.getElementById('lap').onclick = recordLap;

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            tInterval = setInterval(getShowTime, 1);
            running = true;
        }
    }

    function pauseTimer() {
        if (running) {
            clearInterval(tInterval);
            running = false;
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        lapCounter = 1;
        display.innerHTML = "00:00:00";
        lapList.innerHTML = '';
    }

    function recordLap() {
        if (running) {
            const lapTime = formatTime(difference);
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
            lapList.appendChild(lapItem);
        }
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        display.innerHTML = formatTime(difference);
    }

    function formatTime(ms) {
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
});