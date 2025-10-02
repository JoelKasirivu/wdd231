document.addEventListener("DOMContentLoaded", () => {
  // Set timestamp on page load
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modal open logic
  document.querySelectorAll(".card a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("href").substring(1);
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
        modal.querySelector(".close")?.focus();
      }
    });
  });

  // ESC key closes modals
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
      });
    }
  });

  // Footer year and last modified
  const yearSpan = document.getElementById("year");
  const modifiedSpan = document.getElementById("lastModified");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
});

// Modal close function
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}