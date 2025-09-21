// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error loading members:", error);
    document.getElementById("members").innerHTML = "<p>Unable to load member data.</p>";
  }
}

function displayMembers(members) {
  const container = document.getElementById("members");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="../chamber/images/${member.image}" alt="Logo of ${member.name}" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      <p>Membership Level: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
      <p>${member.description}</p>
    `;

    container.appendChild(card);
  });
}

// View toggle
document.getElementById("gridView").addEventListener("click", () => {
  const container = document.getElementById("members");
  container.classList.add("grid");
  container.classList.remove("list");
});

document.getElementById("listView").addEventListener("click", () => {
  const container = document.getElementById("members");
  container.classList.add("list");
  container.classList.remove("grid");
});

loadMembers();

