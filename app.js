const home=document.getElementById('home'),call=document.getElementById('call'),player=document.getElementById('player');
const timer=document.getElementById('timer'),callState=document.getElementById('callState');
const fill=document.getElementById('fill'),elapsed=document.getElementById('elapsed'),playBtn=document.getElementById('playBtn');
let callInt=null,callSeconds=0,playing=false,start=0,paused=0,raf=null;

function screen(name){
  [home,call,player].forEach(x=>x.className='screen right');
  if(name==='home')home.className='screen active';
  if(name==='call'){home.className='screen left';call.className='screen active'}
  if(name==='player'){home.className='screen left';call.className='screen left';player.className='screen active'}
}
function vibrate(){if(navigator.vibrate)navigator.vibrate(12)}
function fmt(s){return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')}
function openPlayer(){
  vibrate();clearInterval(callInt);screen('player');playing=true;paused=0;start=performance.now();playBtn.textContent='❚❚';cancelAnimationFrame(raf);raf=requestAnimationFrame(progress);
}
function progress(now){
  if(!playing)return;
  const s=(((now-start)/1000)+paused)%30;
  elapsed.textContent=fmt(s);fill.style.width=(s/30*100)+'%';raf=requestAnimationFrame(progress);
}
document.getElementById('sosBtn').onclick=()=>{
  vibrate();screen('call');callSeconds=0;timer.textContent='00:00';callState.textContent='Calling…';
  clearInterval(callInt);callInt=setInterval(()=>{callSeconds++;timer.textContent=String(Math.floor(callSeconds/60)).padStart(2,'0')+':'+String(callSeconds%60).padStart(2,'0');if(callSeconds===3)callState.textContent='Connecting…'},1000)
};
document.getElementById('homeMusicBtn').onclick=openPlayer;
document.getElementById('callMusicBtn').onclick=openPlayer;
playBtn.onclick=()=>{
  vibrate();
  if(playing){paused=(((performance.now()-start)/1000)+paused)%30;playing=false;playBtn.textContent='▶';cancelAnimationFrame(raf)}
  else{playing=true;start=performance.now();playBtn.textContent='❚❚';raf=requestAnimationFrame(progress)}
};
document.getElementById('resetBtn').onclick=()=>{
  clearInterval(callInt);cancelAnimationFrame(raf);playing=false;paused=0;fill.style.width='0%';elapsed.textContent='0:00';screen('home')
};
function clock(){const t=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});document.querySelectorAll('.clock').forEach(e=>e.textContent=t)}
clock();setInterval(clock,15000);
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js'));
