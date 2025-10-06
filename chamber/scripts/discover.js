// Display current date in footer
const dateSpan = document.getElementById("current-date");
const today = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
dateSpan.textContent = today.toLocaleDateString("en-GB", options);

document.addEventListener("DOMContentLoaded", () => {
  // Navigation toggle
  document.getElementById("menu-toggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Visit message
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);

  // Load JSON cards
  fetch("data/items.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("card-container");
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure><img src="${item.image}" alt="${item.name}"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        container.appendChild(card);
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
});
