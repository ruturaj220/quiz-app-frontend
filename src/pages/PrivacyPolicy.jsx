import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Privacy Policy</h1>
      <p style={{ marginBottom: '10px' }}>Privacy Policy for eLearning</p>
      <p style={{ marginBottom: '20px' }}>
        At eLearning, accessible from www.elearning.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by eLearning and how we use it.
      </p>

      <h2 style={{ marginBottom: '10px' }}>Consent</h2>
      <p style={{ marginBottom: '20px' }}>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
      
      <h2 style={{ marginBottom: '10px' }}>Information we collect</h2>
      <p style={{ marginBottom: '20px' }}>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
      <p style={{ marginBottom: '20px' }}>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>
      
      <h2 style={{ marginBottom: '10px' }}>How we use your information</h2>
      <p style={{ marginBottom: '20px' }}>We use the information we collect in various ways, including:</p>
      <ul style={{ marginBottom: '20px' }}>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
        <li>Send you emails</li>
        <li>Find and prevent fraud</li>
      </ul>
      
      {/* Add more content here from the original privacy policy */}
      
      <h2 style={{ marginBottom: '10px' }}>GDPR Data Protection Rights</h2>
      <p style={{ marginBottom: '20px' }}>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
      <ul style={{ marginBottom: '20px' }}>
        <li>The right to access</li>
        <li>The right to rectification</li>
        <li>The right to erasure</li>
        <li>The right to restrict processing</li>
        <li>The right to object to processing</li>
        <li>The right to data portability</li>
      </ul>
      <p style={{ marginBottom: '20px' }}>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
    </div>
  );
};

export default PrivacyPolicy;
