document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".carousel_viewport");
  const track = document.querySelector(".carousel_track");
  if (!viewport || !track) return;

  let slides = Array.from(track.querySelectorAll(".slide"));
  if (slides.length < 2) return;

  // Clone for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.dataset.clone = "true";
  lastClone.dataset.clone = "true";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.querySelectorAll(".slide"));

  let index = 1; // real first
  let isAnimating = false;

  function centerTo(i, animate = true) {
    slides = Array.from(track.querySelectorAll(".slide"));

    const slide = slides[i];
    const viewportW = viewport.getBoundingClientRect().width;
    const slideW = slide.getBoundingClientRect().width;

    // Offset of slide from track start, then center it in viewport
    const x = slide.offsetLeft - (viewportW - slideW) / 2;

    track.style.transition = animate ? "transform 800ms cubic-bezier(.4,0,.2,1)" : "none";
    track.style.transform = `translateX(-${x}px)`;
  }

  // init
  centerTo(index, false);

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    index++;
    centerTo(index, true);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    index--;
    centerTo(index, true);
  }

  track.addEventListener("transitionend", () => {
    slides = Array.from(track.querySelectorAll(".slide"));

    if (slides[index].dataset.clone === "true") {
      // if we're at clone after last real -> jump to first real
      if (index === slides.length - 1) index = 1;
      // if we're at clone before first real -> jump to last real
      else if (index === 0) index = slides.length - 2;

      centerTo(index, false);
    }

    isAnimating = false;
  });

  // Auto
  let timer = setInterval(next, 3000);
  viewport.addEventListener("mouseenter", () => clearInterval(timer));
  viewport.addEventListener("mouseleave", () => (timer = setInterval(next, 3000)));

  // Resize correction
  window.addEventListener("resize", () => centerTo(index, false));

  // Keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
});

