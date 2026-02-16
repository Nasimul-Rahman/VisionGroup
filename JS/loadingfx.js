window.addEventListener("load", () => {

  const alreadyPlayed = sessionStorage.getItem("preloaderPlayed");

  const siteContent = document.getElementById("siteContent");
  const navbar = document.querySelector(".navbar");

  // ⭐ If preloader already played → show instantly
  if (alreadyPlayed) {
    siteContent.classList.add("loaded");
    navbar.classList.add("loaded");
  } 
  // ⭐ First visit → keep your cinematic delays
  else {
    setTimeout(() => {
      siteContent.classList.add("loaded");
    }, 4000);

    setTimeout(() => {
      navbar.classList.add("loaded");
    }, 4800);
  }

  // 👇 Scroll fade-in observer (always runs)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
  });

});



