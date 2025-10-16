// gallery.js

async function loadGallery() {
  try {
    const response = await fetch('../final/data/gallery.json');
    const images = await response.json();
    renderGallery(images);
  } catch (error) {
    console.error('Error loading gallery images:', error);
  }
}

function renderGallery(images) {
  const gallerySection = document.getElementById('gallery-section');
  gallerySection.innerHTML = ''; // Clear any existing content

  images.forEach(image => {
    const div = document.createElement('div');
    div.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';

    div.appendChild(img);
    gallerySection.appendChild(div);
  });
}

window.addEventListener('DOMContentLoaded', loadGallery);
