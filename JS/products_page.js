document.querySelectorAll(".product-row-carousel").forEach(carousel => {

  const track = carousel.querySelector(".product-track");
  const leftBtn = carousel.querySelector(".left");
  const rightBtn = carousel.querySelector(".right");
  const cards = carousel.querySelectorAll(".product-card");

  const gap = 30;
  const cardWidth = 260 + gap;

  let index = 0;
  const total = cards.length;

  function getVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function update() {
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function next() {
    index++;
    if (index > total - getVisible()) {
      index = 0;
    }
    update();
  }

  function prev() {
    index--;
    if (index < 0) {
      index = total - getVisible();
    }
    update();
  }

  rightBtn.addEventListener("click", next);
  leftBtn.addEventListener("click", prev);

  /* AUTO SLIDE */
  let auto = setInterval(next, 3000);

  carousel.addEventListener("mouseenter", () => clearInterval(auto));
  carousel.addEventListener("mouseleave", () => {
    auto = setInterval(next, 3000);
  });

  /* RESET ON RESIZE */
  window.addEventListener("resize", () => {
    index = 0;
    update();
  });

});