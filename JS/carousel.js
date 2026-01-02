document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".carousel_viewport");
  const track = document.querySelector(".carousel_track");
  const indicators = Array.from(document.querySelectorAll(".carousel_indicator"));
  if (!viewport || !track) return;

  let slides = Array.from(track.querySelectorAll(".slide"));
  if (slides.length < 2) return;

  const realCount = slides.length; // before cloning

  // --- helpers for indicators ---
  function setActiveIndicator(realIndex) {
    if (!indicators.length) return;
    indicators.forEach((dot) => dot.classList.remove("active"));
    const safe = ((realIndex % realCount) + realCount) % realCount; // 0..realCount-1
    if (indicators[safe]) indicators[safe].classList.add("active");
  }

  // Clone for infinite loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.dataset.clone = "true";
  lastClone.dataset.clone = "true";

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.querySelectorAll(".slide"));

  let index = 1; // real first (because 0 is lastClone)
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

  function updateIndicatorFromTrackIndex(trackIndex) {
    // trackIndex: 1..realCount maps to 0..realCount-1
    const realIndex = trackIndex - 1;
    setActiveIndicator(realIndex);
  }

  // init
  centerTo(index, false);
  updateIndicatorFromTrackIndex(index);

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    index++;
    centerTo(index, true);

    // Update immediately for responsiveness
    if (index === slides.length - 1) setActiveIndicator(0); // moving onto firstClone
    else updateIndicatorFromTrackIndex(index);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    index--;
    centerTo(index, true);

    // Update immediately for responsiveness
    if (index === 0) setActiveIndicator(realCount - 1); // moving onto lastClone
    else updateIndicatorFromTrackIndex(index);
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

    // Ensure indicator is correct after any jump
    updateIndicatorFromTrackIndex(index);

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

  // Optional: click indicators to jump
  if (indicators.length) {
    indicators.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        if (isAnimating) return;

        // i is realIndex (0..realCount-1). track index is +1 because of lastClone at 0.
        index = i + 1;
        centerTo(index, true);
        setActiveIndicator(i);

        // restart auto timer so it feels consistent
        clearInterval(timer);
        timer = setInterval(next, 3000);
      });
    });
  }
});
