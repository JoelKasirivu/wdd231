// fetchQuotes.js

export async function loadQuotes() {
  const section = document.getElementById('quote-section');

  const filterContainer = document.createElement('div');
  filterContainer.className = 'filter-buttons';
  section.before(filterContainer);

  try {
    const response = await fetch('data/quotes.json');
    const quotes = await response.json();

    const themes = [...new Set(quotes.map(q => q.theme))];

    themes.forEach(theme => {
      const btn = document.createElement('button');
      btn.textContent = theme;
      btn.onclick = () => renderQuotes(quotes.filter(q => q.theme === theme));
      filterContainer.appendChild(btn);
    });

    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.onclick = () => renderQuotes(quotes);
    filterContainer.appendChild(allBtn);

    renderQuotes(quotes);
  } catch (error) {
    section.innerHTML = '<p>Failed to load quotes.</p>';
    console.error(error);
  }

  function renderQuotes(quotes) {
    section.innerHTML = quotes.slice(0, 15).map(q => `
      <div class="quote-card">
        <h3>${q.author}</h3>
        <p>"${q.text}"</p>
        <small>Source: ${q.source}</small>
        <small>Theme: ${q.theme}</small>
        <div class="quote-actions">
          <button onclick="openModal('${q.text}')">Reflect</button>
          <button onclick="saveFavorite('${q.text}', '${q.author}')">❤️ Save</button>
        </div>
      </div>
    `).join('');
  }
}

window.saveFavorite = function(text, author) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push({ text, author });
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert('Quote saved to favorites!');
};
