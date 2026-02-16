window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("siteContent").classList.add("loaded");
  }, 5000);

  setTimeout(() => {
    document.querySelector(".navbar").classList.add("loaded");
  }, 5800);

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2   // trigger when 20% visible
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});
});


