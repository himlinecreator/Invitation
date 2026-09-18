const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const toast = document.getElementById("toast");
const topBtn = document.getElementById("topBtn");

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"), 2200);
}

document.getElementById("openInvite")?.addEventListener("click", ()=>{
  document.getElementById("invitation").scrollIntoView({behavior:"smooth"});
  showToast("Your royal invitation awaits ✨");
});

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.14});

document.querySelectorAll(".reveal-card,.event-card,.royal .section-heading").forEach(el=>revealObserver.observe(el));

/* Invitation full-screen viewer */
const card = document.getElementById("invitationCard");
const zoomBtn = document.getElementById("zoomInvite");
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <button class="modal-close" aria-label="Close">×</button>
  <img src="assets/invitation.png" alt="Full wedding invitation">
`;
document.body.appendChild(modal);

zoomBtn?.addEventListener("click",(e)=>{
  e.stopPropagation();
  modal.classList.add("open");
});
modal.addEventListener("click",(e)=>{
  if(e.target === modal || e.target.classList.contains("modal-close")) modal.classList.remove("open");
});
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape") modal.classList.remove("open");
});

/* Gentle 3D tilt on invitation card */
if(card){
  card.addEventListener("pointermove",(e)=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
}

/* Couple interactive heart + tilt */
const coupleFrame = document.getElementById("coupleFrame");
const tapHeart = document.getElementById("tapHeart");
coupleFrame?.addEventListener("click",()=>{
  tapHeart.classList.remove("pop");
  void tapHeart.offsetWidth;
  tapHeart.classList.add("pop");
  showToast("Two hearts • One beautiful journey ♥");
  createPetals(7);
});
coupleFrame?.addEventListener("pointermove",(e)=>{
  const r=coupleFrame.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  coupleFrame.style.transform=`rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
});
coupleFrame?.addEventListener("pointerleave",()=>coupleFrame.style.transform="");

/* Falling royal petals */
const petalLayer=document.querySelector(".petal-layer");
function createPetal(){
  if(!petalLayer) return;
  const p=document.createElement("span");
  p.className="petal";
  p.style.left=(Math.random()*100)+"%";
  p.style.setProperty("--drift",(Math.random()*140-70)+"px");
  p.style.animationDuration=(5+Math.random()*5)+"s";
  p.style.animationDelay=(Math.random()*1.5)+"s";
  p.style.transform=`rotate(${Math.random()*180}deg)`;
  petalLayer.appendChild(p);
  setTimeout(()=>p.remove(),11000);
}
function createPetals(n=1){for(let i=0;i<n;i++)createPetal();}
setInterval(()=>createPetals(1),1100);

/* Back-to-top */
window.addEventListener("scroll",()=>{
  topBtn.classList.toggle("show",window.scrollY>500);
},{passive:true});
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

/* Music */
musicBtn.addEventListener("click", async () => {
  if (!music.querySelector("source")) {
    showToast("Add assets/music.mp3 to enable wedding music");
    return;
  }
  if (music.paused) {
    await music.play();
    musicBtn.textContent="❚❚";
    showToast("Music playing ♪");
  } else {
    music.pause();
    musicBtn.textContent="♫";
    showToast("Music paused");
  }
});
