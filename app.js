if('serviceWorker'in navigator){navigator.serviceWorker.register('service-worker.js')}
const call=document.getElementById('call'),player=document.getElementById('player'),fill=document.getElementById('fill');
document.getElementById('playerBtn').onclick=()=>{call.classList.remove('active');player.classList.add('active');let p=0;setInterval(()=>{p=(p+1)%101;fill.style.width=p+'%'},80)}
document.getElementById('back').onclick=()=>{player.classList.remove('active');call.classList.add('active')}
document.getElementById('sos').onclick=()=>{}