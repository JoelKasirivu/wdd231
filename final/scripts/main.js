// main.js

import { loadQuotes } from './fetchquotes.js';
import { openModal, closeModal } from './modal.js';
import { savePreference } from './storage.js';

// Expose modal functions globally for inline handlers
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();

  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      toggle.textContent = navLinks.classList.contains('show') ? '✖' : '☰';
    });

    navItems.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('show');
          toggle.textContent = '☰';
        }
      });
    });
  }

  const yearSpan = document.getElementById('year');
  const modifiedSpan = document.getElementById('lastModified');

  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modifiedSpan) modifiedSpan.textContent = document.lastModified;
});
