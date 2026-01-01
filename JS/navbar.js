let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add("hide"); // scrolling down
  } else {
    navbar.classList.remove("hide"); // scrolling up
  }

  lastScroll = currentScroll;
});
