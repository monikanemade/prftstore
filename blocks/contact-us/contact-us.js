export default function decorate(block) {
  block.innerHTML = `
    <form id="contact-form">
      <div>
        <label>Name:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Message:</label>
        <textarea name="message" required></textarea>
      </div>
      <button type="submit">Send Message</button>
      <p id="form-status"></p>
    </form>
  `;

  const form = block.querySelector('#contact-form');
  const status = block.querySelector('#form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.innerText = 'Submitting...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('YOUR_APP_BUILDER_SUBMIT_CONTACT_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        status.innerText = 'Thank you! Your message has been sent.';
        form.reset();
      } else {
        status.innerText = 'An error occurred. Please try again.';
      }
    } catch (err) {
      status.innerText = 'Submission failed.';
    }
  });
}