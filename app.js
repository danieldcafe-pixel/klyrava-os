if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

const call = document.getElementById('call');
const player = document.getElementById('player');
const fill = document.getElementById('fill');

let animationId = null;
let startTime = null;
const duration = 30000; // 30 segundos

function animateProgress(timestamp){

    if(startTime===null){
        startTime = timestamp;
    }

    const elapsed = (timestamp - startTime) % duration;

    const percent = (elapsed / duration) * 100;

    fill.style.width = percent + "%";

    animationId = requestAnimationFrame(animateProgress);

}

document.getElementById("playerBtn").onclick = () => {

    call.classList.remove("active");
    player.classList.add("active");

    cancelAnimationFrame(animationId);

    startTime = null;

    animationId = requestAnimationFrame(animateProgress);

};

document.getElementById("back").onclick = () => {

    cancelAnimationFrame(animationId);

    player.classList.remove("active");
    call.classList.add("active");

};

document.getElementById("sos").onclick = () => {};
