document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');

  const savedFormData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  form.email.value = savedFormData.email || '';
  form.message.value = savedFormData.message || '';

  form.addEventListener('input', (event) => {
    const { name, value } = event.target;

    localStorage.setItem('feedback-form-state', JSON.stringify({
      ...savedFormData,
      [name]: value.trim(),
    }));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { email, message } = form.elements;

    if (email.value.trim() && message.value.trim()) {

      console.log({
        email: email.value.trim(),
        message: message.value.trim(),
      });


      localStorage.removeItem('feedback-form-state');
      form.reset();
    } else {
      console.log('Please fill in both email and message fields.');
    }
  });
});