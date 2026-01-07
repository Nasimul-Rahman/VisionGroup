document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScroll = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Always show navbar at top
    if (currentScroll <= 5) {
      navbar.classList.remove("hide");
      lastScroll = currentScroll;
      return;
    }

    const threshold = 100;

    if (currentScroll > lastScroll && currentScroll > threshold) {
      navbar.classList.add("hide");   // scrolling down
    } else {
      navbar.classList.remove("hide"); // scrolling up
    }

    lastScroll = currentScroll;
  }, { passive: true });
});
