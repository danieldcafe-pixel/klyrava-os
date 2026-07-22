/*====================================================
    KLYRAVA OS
    MASTER V12
====================================================*/

const callScreen = document.getElementById("call");
const playerScreen = document.getElementById("player");

const sosButton = document.getElementById("sos");
const playerButton = document.getElementById("playerBtn");
const backButton = document.getElementById("back");

const progressBar = document.getElementById("fill");

let animationFrame = null;
let startTime = null;

const SONG_TIME = 30000;

/*======================================
PLAYER
======================================*/

function openPlayer(){

    callScreen.classList.remove("active");
    playerScreen.classList.add("active");

    startProgress();

}

function closePlayer(){

    playerScreen.classList.remove("active");
    callScreen.classList.add("active");

    stopProgress();

}

/*======================================
PROGRESS BAR
======================================*/

function startProgress(){

    cancelAnimationFrame(animationFrame);

    startTime = null;

    animationFrame = requestAnimationFrame(progressLoop);

}

function stopProgress(){

    cancelAnimationFrame(animationFrame);

    progressBar.style.width = "0%";

}

function progressLoop(time){

    if(startTime===null){

        startTime = time;

    }

    const elapsed = (time-startTime)%SONG_TIME;

    const percent = (elapsed/SONG_TIME)*100;

    progressBar.style.width = percent+"%";

    animationFrame=requestAnimationFrame(progressLoop);

}

/*======================================
BUTTONS
======================================*/

playerButton.addEventListener("click",openPlayer);

backButton.addEventListener("click",closePlayer);

sosButton.addEventListener("click",()=>{

    if(navigator.vibrate){

        navigator.vibrate(25);

    }

});

/*======================================
SERVICE WORKER
======================================*/

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker.register("service-worker.js");

    });

}
