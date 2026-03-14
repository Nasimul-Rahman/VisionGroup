const counters = document.querySelectorAll(".counter");

function startCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const speed = target / 200;

  function updateCounter() {
    count += speed;

    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  }

  updateCounter();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => startCounter(counter));
      observer.disconnect();
    }
  });
});

observer.observe(document.querySelector(".aboutus_stats_section"));