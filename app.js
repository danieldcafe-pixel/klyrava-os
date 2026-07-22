if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

const call = document.getElementById('call');
const player = document.getElementById('player');
const fill = document.getElementById('fill');

let animationId = null;
let startTime = 0;
const duration = 30000; // 30 segundos

function animateProgress(timestamp) {

    if (!startTime)
        startTime = timestamp;

    const elapsed = timestamp - startTime;

    let percent = (elapsed / duration) * 100;

    if (percent > 100) {
        startTime = timestamp;
        percent = 0;
    }

    fill.style.width = percent + "%";

    animationId = requestAnimationFrame(animateProgress);
}

document.getElementById("playerBtn").onclick = () => {

    call.classList.remove("active");
    player.classList.add("active");

    cancelAnimationFrame(animationId);

    startTime = 0;

    animationId = requestAnimationFrame(animateProgress);

};

document.getElementById("back").onclick = () => {

    player.classList.remove("active");
    call.classList.add("active");

    cancelAnimationFrame(animationId);

};

document.getElementById("sos").onclick = () => {};
