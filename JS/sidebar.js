document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".hamburger_menu_btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const closeBtn = document.getElementById("sidebarClose");

  if (!openBtn || !sidebar || !overlay || !closeBtn) return;

  const open = () => document.body.classList.add("sidebar-open");
  const close = () => document.body.classList.remove("sidebar-open");

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  // Close when clicking any link
  sidebar.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", close);
  });

  // Close on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});
