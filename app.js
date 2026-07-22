const callScreen=document.getElementById("call");
const playerScreen=document.getElementById("player");
const playerButton=document.getElementById("playerBtn");
const backButton=document.getElementById("back");
const sosButton=document.getElementById("sos");
const progressBar=document.getElementById("fill");

let animationFrame=null;
let startTime=null;
const SONG_TIME=30000;

function progressLoop(time){
    if(startTime===null) startTime=time;
    const elapsed=(time-startTime)%SONG_TIME;
    progressBar.style.width=((elapsed/SONG_TIME)*100)+"%";
    animationFrame=requestAnimationFrame(progressLoop);
}

function openPlayer(){
    callScreen.classList.remove("active");
    playerScreen.classList.add("active");
    cancelAnimationFrame(animationFrame);
    startTime=null;
    animationFrame=requestAnimationFrame(progressLoop);
}

function closePlayer(){
    cancelAnimationFrame(animationFrame);
    progressBar.style.width="0%";
    startTime=null;
    playerScreen.classList.remove("active");
    callScreen.classList.add("active");
}

playerButton.addEventListener("click",openPlayer);
backButton.addEventListener("click",closePlayer);
sosButton.addEventListener("click",()=>navigator.vibrate?.(25));

if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker.register("service-worker.js");
    });
}
