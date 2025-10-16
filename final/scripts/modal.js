// modal.js

export function openModal(text) {
  const modal = document.getElementById('quoteModal');
  const modalText = document.getElementById('modalText');

  if (modal && modalText) {
    modalText.textContent = `"${text}"`;
    modal.classList.add('show');
  }
}

export function closeModal() {
  const modal = document.getElementById('quoteModal');
  if (modal) {
    modal.classList.remove('show');
  }
}
