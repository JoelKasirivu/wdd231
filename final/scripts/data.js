import { showModal } from './modal.js';

export let artworks = [];

export async function loadArtworks() {
  try {
    const response = await fetch('../final/data/artworks.json');
    const data = await response.json();
    artworks = data;

    const gallery = document.getElementById('gallery-grid');
    data.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.innerHTML = `
        <h3>${item.title}</h3>
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <p>${item.description}</p>
      `;
      div.addEventListener('click', () => showModal(index));
      gallery.appendChild(div);
    });

    localStorage.setItem('artworks', JSON.stringify(data));
  } catch (error) {
    console.error('Error loading artworks:', error);
  }
}