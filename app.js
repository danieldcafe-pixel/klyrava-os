
const call=document.getElementById('call'),player=document.getElementById('player');
const fill=document.getElementById('fill');
let raf,start=null;const DUR=30000;
function loop(t){if(start===null)start=t;fill.style.width=(((t-start)%DUR)/DUR*100)+'%';raf=requestAnimationFrame(loop);}
playerBtn.onclick=()=>{call.classList.remove('active');player.classList.add('active');cancelAnimationFrame(raf);start=null;raf=requestAnimationFrame(loop);}
back.onclick=()=>{cancelAnimationFrame(raf);fill.style.width='0%';player.classList.remove('active');call.classList.add('active');}
if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js');}
