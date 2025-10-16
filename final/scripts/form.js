// form.js
export function handleFormSubmit(event) {
  event.preventDefault();

  // Optional: validate fields here

  alert('Thank you for your reflection! It has been submitted.');
  event.target.submit(); // Proceed with actual submission
}
