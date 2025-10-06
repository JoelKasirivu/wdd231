// Footer date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Responsive navigation toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("show");
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
      <div>
        <h3>Today</h3>
        <p>${formatDate(today.dt_txt)}</p>
        <img src="https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png" alt="${today.weather[0].description}" />
        <p>${today.main.temp}°C - ${today.weather[0].description}</p>
      </div>
      ${forecast.map(day => `
        <div>
          <h3>${formatDate(day.dt_txt)}</h3>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" />
          <p>${day.main.temp}°C - ${day.weather[0].description}</p>
        </div>
      `).join('')}
    `;
  } catch (error) {
    weatherContainer.innerHTML = `<p>Unable to load weather data.</p>`;
    console.error(error);
  }
}

loadWeather();
// Lazy load images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");
  const options = { threshold: 0.1, rootMargin: "0px 0px 50px 0px" };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        obs.unobserve(img);
      } 
    });
  }, options);

  images.forEach(img => observer.observe(img));
});

// Form validation
const form = document.getElementById("contact-form"); 
if (form) {
  form.addEventListener("submit", event => {
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();
    let valid = true;

    if (name.length < 2) {
      valid = false;
      alert("Please enter a valid name.");
    }
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      valid = false;
      alert("Please enter a valid email address.");
    }
    if (message.length < 10) {
      valid = false;
      alert("Message must be at least 10 characters.");
    }

    if (!valid) event.preventDefault();
  }
);
} 