window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("siteContent").classList.add("loaded");
  }, 5000);

  setTimeout(() => {
    document.querySelector(".navbar").classList.add("loaded");
  }, 5800);
});