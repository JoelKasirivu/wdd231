document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#quoteModal form');

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault(); // Stop default page redirect

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subscribe = form.subscribe.checked;

      const reflection = {
        name,
        email,
        message,
        subscribe,
        quote: document.getElementById('modalText').textContent
      };

      // Save to localStorage (or send to server)
      const reflections = JSON.parse(localStorage.getItem('reflections')) || [];
      reflections.push(reflection);
      localStorage.setItem('reflections', JSON.stringify(reflections));

      alert('Thank you for your reflection!');
      form.reset();
      closeModal();
    });
  }
});
