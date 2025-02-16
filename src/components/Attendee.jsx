import React from 'react';
import '../styles/AttendeeForm.css';

const AttendeeForm = () => {
  return (
    <div className="attendee-container">
      <h2 className="form-title">Attendee Details</h2>
      <div className="upload-section">
        <div className="upload-box">Drag & drop or click to upload</div>
      </div>
      <form className="form-content">
        <label>Enter your name</label>
        <input type="text" placeholder="Your Name" />

        <label>Enter your email *</label>
        <div className="email-input">
          <span className="email-icon">📧</span>
          <input type="email" placeholder="hello@aviolagos.io" />
        </div>

        <label>Special request?</label>
        <textarea placeholder="Textarea"></textarea>
      
        <div className="button-group">
          <button className="back-btn">Back</button>
          <button className="submit-btn">Get My Free Ticket</button>
        </div>
      </form>
    </div>
  );
};

export default AttendeeForm;
