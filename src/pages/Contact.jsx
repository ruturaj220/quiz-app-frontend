import React from 'react';
import './Contact.css';
const ContactPage = () => {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <p>You can contact us via email at: <a href="mailto:example@example.com">unicorn@gmail.com</a></p>
      
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Submit</button>
      </form>

      <p>For more information, visit our <a href="https://www.example.com">unicorn</a>.</p>
    </div>
  );
};

export default ContactPage;
