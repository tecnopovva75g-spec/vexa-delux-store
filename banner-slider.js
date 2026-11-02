(() => {
  const slider = document.querySelector(".vexa-ad-slider");
  if (!slider) return;
  const slides = [...slider.querySelectorAll(".vexa-ad-slide")];
  const dots = [...slider.querySelectorAll(".vexa-ad-dots button")];
  let current = 0, timer;
  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s,n) => { s.classList.toggle("is-active",n===current); s.setAttribute("aria-hidden",n===current?"false":"true"); });
    dots.forEach((d,n) => d.classList.toggle("is-active",n===current));
  }
  function restart() { clearInterval(timer); timer=setInterval(()=>show(current+1),5000); }
  slider.querySelector(".vexa-ad-prev").addEventListener("click",()=>{show(current-1);restart();});
  slider.querySelector(".vexa-ad-next").addEventListener("click",()=>{show(current+1);restart();});
  dots.forEach((d,n)=>d.addEventListener("click",()=>{show(n);restart();}));
  slider.addEventListener("mouseenter",()=>clearInterval(timer));
  slider.addEventListener("mouseleave",restart);
  show(0); restart();
})();
