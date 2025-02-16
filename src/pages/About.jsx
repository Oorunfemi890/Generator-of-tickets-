import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          {/* Header */}
          <h2 className="about-title">
            Event Ticket Booking UI – Open Source Practice Project 🎟️
          </h2>

          {/* Overview */}
          <p className="about-overview">
            This is a beginner-friendly yet practical Event Ticket Booking UI
            designed for developers to clone, explore, and build upon. The design
            focuses on a seamless, login-free ticket reservation flow, allowing
            users to book event tickets quickly and efficiently.
          </p>

          {/* Flow & Features */}
          <div className="about-features">
            {/* Ticket Selection */}
            <div className="feature-item">
              <h3 className="feature-title">🎫 Ticket Selection</h3>
              <ul className="feature-list">
                <li>Users can browse available tickets (Free & Paid).</li>
                <li>Ticket options are displayed in a list or card view.</li>
                <li>
                  Free Tickets → Clicking "Get Free Ticket" proceeds to attendee
                  details.
                </li>
                <li>
                  Paid Tickets → Clicking "Purchase Ticket" opens a payment modal.
                </li>
              </ul>
            </div>

            {/* Attendee Details */}
            <div className="feature-item">
              <h3 className="feature-title">📝 Attendee Details Form</h3>
              <ul className="feature-list">
                <li>
                  Users input their Name, Email, and optional Phone Number.
                </li>
                <li>Profile picture upload with preview functionality.</li>
                <li>Ticket summary is visible before submission.</li>
              </ul>
            </div>

            {/* Payment / Success */}
            <div className="feature-item">
              <h3 className="feature-title">💳 Payment / Success</h3>
              <ul className="feature-list">
                <li>
                  For free tickets, the user is taken directly to the Ticket
                  Confirmation Page.
                </li>
                <li>
                  For paid tickets, a payment modal is presented before booking.
                </li>
                <li>
                  Upon successful booking, a visual ticket preview is shown and
                  the ticket can be downloaded.
                </li>
                <li>An email confirmation is sent containing ticket details.</li>
                <li>How to Build This 🚀</li>
              </ul>
            </div>

            {/* Frontend */}
            <div className="feature-item">
              <h3 className="feature-title">📌 Frontend (React)</h3>
              <ul className="feature-list">
                <li>Component Breakdown:</li>
                <li>TicketSelection → Displays available tickets</li>
                <li>AttendeeDetails → Captures user information</li>
                <li>Tickets → Shows the final ticket preview</li>
                <li>
                  State management is handled using React’s built-in features.
                </li>
                <li>
                  File handling uses local preview with URL.createObjectURL().
                </li>
              </ul>
            </div>

            {/* Payment Integration */}
            <div className="feature-item">
              <h3 className="feature-title">📌 Payment Integration</h3>
              <ul className="feature-list">
                <li>
                  For paid events, developers can integrate Stripe, Paystack, or
                  similar services.
                </li>
                <li>
                  This allows for practice in integrating payment gateways.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enjoy Section */}
        <div className="about-enjoy">
          <p>💛 Enjoy</p>
        </div>

        {/* Buttons */}
        <div className="about-buttons">
          <a
            className="about-button design-button"
            href="https://www.figma.com/design/9724jilUEr4EMJBf9YxHAL/Event-Ticket-Booking-UI-%E2%80%93-Open-Source-Practice-Project-(Community)?node-id=5-3362"
            target="_blank"
            rel="noopener noreferrer"
          >
            Design File
          </a>
          <a
            className="about-button github-button"
            href="https://github.com/lordgreg003/hng-ticket-generator-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Code
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
