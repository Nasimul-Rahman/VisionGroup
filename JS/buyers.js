const wrapper = document.getElementById("buyersWrapper");
const track = document.getElementById("buyersTrack");

let pos = 0;
let isDragging = false;
let startX = 0;
let velocity = 0;

function autoSlide() {
  if (!isDragging) {
    pos -= 0.5; // speed
    if (Math.abs(pos) >= track.scrollWidth / 2) {
      pos = 0;
    }
    track.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(autoSlide);
}

wrapper.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.pageX - pos;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

document.addEventListener("mousemove", e => {
  if (!isDragging) return;
  pos = e.pageX - startX;
  track.style.transform = `translateX(${pos}px)`;
});

autoSlide();
