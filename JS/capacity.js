const capacityCards = document.querySelectorAll(".capacity-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.dataset.fill;
      entry.target.querySelector("span").style.width = fill + "%";
    }
  });
}, { threshold: 0.4 });

capacityCards.forEach(card => observer.observe(card));
