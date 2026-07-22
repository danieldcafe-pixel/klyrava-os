/*=========================================
    KLYRAVA OS
    MASTER V11
=========================================*/

const callScreen = document.getElementById("call");
const playerScreen = document.getElementById("player");

const sosButton = document.getElementById("sos");
const playerButton = document.getElementById("playerBtn");
const backButton = document.getElementById("back");

const progress = document.getElementById("fill");

let animationId = null;
let startTime = null;

const SONG_DURATION = 30000;

/*=========================================
    PLAYER BAR
=========================================*/

function animateBar(time){

    if(startTime === null){

        startTime = time;

    }

    const elapsed = (time - startTime) % SONG_DURATION;

    const percent = (elapsed / SONG_DURATION) * 100;

    progress.style.width = percent + "%";

    animationId = requestAnimationFrame(animateBar);

}

/*=========================================
    OPEN PLAYER
=========================================*/

function openPlayer(){

    cancelAnimationFrame(animationId);

    startTime = null;

    callScreen.classList.remove("active");

    playerScreen.classList.add("active");

    animationId = requestAnimationFrame(animateBar);

}

/*=========================================
    BACK
=========================================*/

function backToSOS(){

    cancelAnimationFrame(animationId);

    progress.style.width = "0%";

    startTime = null;

    playerScreen.classList.remove("active");

    callScreen.classList.add("active");

}

/*=========================================
    EVENTS
=========================================*/

playerButton.addEventListener("click",openPlayer);

backButton.addEventListener("click",backToSOS);

sosButton.addEventListener("click",()=>{

    navigator.vibrate?.(20);

});

/*=========================================
    SERVICE WORKER
=========================================*/

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker.register("service-worker.js");

    });

}
