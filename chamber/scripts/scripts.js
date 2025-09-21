script.js

// Footer date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Responsive navigation toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("active");
});

// Weather API
const weatherContainer = document.getElementById("weather-container");
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual key
const city = "Makindye";

// Helper function for date formatting
const formatDate = dateStr =>
  new Intl.DateTimeFormat("en-UG", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(dateStr));

async function loadWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Weather data unavailable");
    const data = await response.json();

    const today = data.list[0];
    const forecast = data.list.filter((_, i) => i % 8 === 0).slice(1, 4);

    weatherContainer.innerHTML = `
      <p>
        <img src="https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png" 
             alt="${today.weather[0].description}" />
        Current: ${today.main.temp}°C, ${today.weather[0].description}
      </p>
      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast
          .map(
            day =>
              `<li>${formatDate(day.dt_txt)}: ${day.main.temp}°C</li>`
          )
          .join("")}
      </ul>
    `;
  } catch (error) {
    weatherContainer.innerHTML = `<p>Unable to load weather data.</p>`;
    console.error(error);
  }
}
loadWeather();

// Spotlights
const spotlightContainer = document.getElementById("spotlight-container");
const membershipLabels = { 1: "Member", 2: "Silver", 3: "Gold" };

async function loadSpotlights() {
  try {
    const response = await fetch("data/member.json");
    if (!response.ok) throw new Error("Member data unavailable");
    const data = await response.json();

    const goldSilver = data.filter(m => m.membership === 2 || m.membership === 3);
    const selected = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlightContainer.innerHTML = selected
      .map(member => `
        <div>
          <h3>${member.name}</h3>
          <img src="images/${member.image}" alt="Logo of ${member.name}" loading="lazy" />
          <p>${member.phone}</p>
          <p>${member.address}</p>
          <a href="${member.website}" target="_blank" rel="noopener" aria-label="Visit ${member.name}'s website">Visit Website</a>
          <p>Membership: ${membershipLabels[member.membership]}</p>
        </div>
      `)
      .join("");
  } catch (error) {
    spotlightContainer.innerHTML = `<p>Unable to load spotlight members.</p>`;
    console.error(error);
  }
}
loadSpotlights();
