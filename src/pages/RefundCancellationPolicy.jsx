// RefundCancellationPolicy.js
import React from 'react';

const RefundCancellationPolicy = () => {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Refund and Cancellation Policy</h1>
      <p>Welcome to our eLearning platform! We appreciate your commitment to learning with us.</p>
      <p>As a token of our commitment to transparency, we outline our Refund and Cancellation Policy below:</p>

      <h2 style={{ fontSize: '1.5em', marginTop: '20px', marginBottom: '10px' }}>Our Commitment</h2>
      <p>Our eLearning platform is dedicated to delivering high-quality courses and resources. We invest significant resources in curriculum development, instructor expertise, and platform infrastructure to ensure an exceptional learning experience for our users.</p>

      <h2 style={{ fontSize: '1.5em', marginTop: '20px', marginBottom: '10px' }}>Cancellations</h2>
      <p><strong>Course Cancellations:</strong> If you wish to cancel your enrollment for a course, please inform us at least 15 days prior to the course commencement date.</p>
      <p><strong>Workshops & Webinars:</strong> For time-bound events like workshops or webinars, please inform us at least 72 hours before the event for cancellations.</p>

      <h2 style={{ fontSize: '1.5em', marginTop: '20px', marginBottom: '10px' }}>Refund Policy</h2>
      <p><strong>No Refunds:</strong> All transactions made on our platform are final. Once a payment has been processed, we cannot offer a refund under any circumstance.</p>
      <p><strong>Why No Refunds:</strong> Our no-refund policy reflects our dedication to providing high-quality learning experiences. It ensures that we can maintain the quality and preparation invested in our courses and events.</p>
    </div>
  );
};

export default RefundCancellationPolicy;
