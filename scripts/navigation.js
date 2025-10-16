navigation.js

document.getElementById("hamburger").addEventListener("click", () => {
  const nav = document.getElementById("navMenu");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

