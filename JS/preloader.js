const MIN_DURATION = 5000; // mandatory time in ms (3s)

const startTime = Date.now();
const preloader = document.getElementById("preloader");
const video = document.getElementById("preloaderVideo");

document.body.classList.add("is-locked");

let isHiding = false;

function hidePreloader() {
  if (isHiding) return;
  isHiding = true;

  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_DURATION - elapsed);

  setTimeout(() => {
    // ✅ matches your CSS: #preloader.is-hidden { ... }
    preloader.classList.add("is-hidden");
    document.body.classList.remove("is-locked");

    // Optional: remove from DOM AFTER your 350ms fade
    setTimeout(() => {
      preloader.remove();
    }, 400);
  }, remaining);
}

// When page finishes loading
window.addEventListener("load", hidePreloader);

// Safety fallback (never block forever)
setTimeout(hidePreloader, MIN_DURATION + 2000);

// Ensure autoplay (muted)
if (video) {
  video.muted = true;
  video.playsInline = true;
  video.play().catch(() => {});
}


