const modal = document.getElementById("facilityModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalDesc = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".facility-modal-close");

document.querySelectorAll(".facility-card").forEach(card => {
  card.addEventListener("click", e => {
    e.preventDefault();

    modalImg.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modalSubtitle.textContent = card.dataset.subtitle;
    modalDesc.textContent = card.dataset.desc;

    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
