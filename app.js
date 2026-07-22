if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

const call = document.getElementById('call');
const player = document.getElementById('player');
const fill = document.getElementById('fill');

let animationId = null;
let startTime = null;
const duration = 30000;

function animate(timestamp) {

    if (startTime === null)
        startTime = timestamp;

    const progress = (timestamp - startTime) % duration;

    fill.style.width = ((progress / duration) * 100) + "%";

    animationId = requestAnimationFrame(animate);

}

document.getElementById("playerBtn").onclick = () => {

    call.classList.remove("active");
    player.classList.add("active");

    cancelAnimationFrame(animationId);

    startTime = null;

    animationId = requestAnimationFrame(animate);

};

document.getElementById("back").onclick = () => {

    cancelAnimationFrame(animationId);

    player.classList.remove("active");
    call.classList.add("active");

};

document.getElementById("sos").onclick = () => {};
