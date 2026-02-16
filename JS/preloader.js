const MIN_DURATION = 5000; // mandatory time in ms

const preloader = document.getElementById("preloader");
const video = document.getElementById("preloaderVideo");

// ✅ Only play once per tab session
const alreadyPlayed = sessionStorage.getItem("preloaderPlayed");

if (alreadyPlayed) {
  // Skip instantly
  if (preloader) preloader.remove();
  document.body.classList.remove("is-locked", "no-scroll");
} else {
  const startTime = Date.now();

  document.body.classList.add("is-locked"); // (or no-scroll, pick one)

  let isHiding = false;

  function hidePreloader() {
    if (isHiding) return;
    isHiding = true;

    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_DURATION - elapsed);

    setTimeout(() => {
      // remember for next navigations
      sessionStorage.setItem("preloaderPlayed", "true");

      preloader.classList.add("is-hidden");
      document.body.classList.remove("is-locked", "no-scroll");

      setTimeout(() => {
        preloader.remove();
      }, 400); // matches your fade
    }, remaining);
  }

  window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, MIN_DURATION + 2000);

  if (video) {
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});
  }
}


