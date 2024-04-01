import React from 'react';
import './Contact.css';

const ContactPage = () => {
    return (
        <div className="container">
            <h1>Contact Us</h1>

            <div className="section">
                <h2>General Inquiries & Support</h2>
                <p>Email: <a href="mailto:e.learning@myyahoo.com">e.learning@myyahoo.com</a></p>
                <p>Phone: +91-9739894834</p>
            </div>

            <div className="section">
                <h2>Our Address</h2>
                <p>Vidya Nagar, Behind the Police Station, Sadalga, Karnataka 591239</p>
            </div>

            <p>For more information, visit our <a href="https://e-learning-zeta-seven.vercel.app/">website</a>.</p>
        </div>
    );
};

export default ContactPage;
