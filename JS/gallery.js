document.addEventListener("DOMContentLoaded", () => {

  const galleryImages = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");

  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if(e.target !== lightboxImg){
      lightbox.style.display = "none";
    }
  });

});