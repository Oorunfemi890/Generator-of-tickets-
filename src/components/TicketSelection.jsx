import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import "../styles/TicketsSelection.css";

const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedTicket) {
      const ticketData = { selectedTicket, quantity };
      localStorage.setItem("ticketData", JSON.stringify(ticketData));
      navigate("/Attendee");
    } else {
      alert("Please select a ticket type.");
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
          <div className="logo">
            <img src={assets.thumb} alt="thumb" />
            <img className="logo-text" src={assets.ticz} alt="ticz" />
          </div>
        <div className="nav-links">
          <a href="#" className="active">Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>
        <button className="my-tickets">MY TICKETS →</button>
      </nav>

      {/* Ticket Selection Card */}
      <div className="card">
        <div className="header">
          <h2>Ticket Selection</h2>
          <span>Step 1/3</span>
        </div>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <div className="inner-container">
          {/* Event Details */}
          <div className="event-div">
            <div className="event-details">
              <h3>Techember Fest '25</h3>
              <p>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
              <p className="event-info">📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
            </div>
          </div>

          {/* Ticket Options */}
          <div className="ticket-options">
            <h3>Select Ticket Type:</h3>
            <div className="tickets">
              {[
                { type: "Free", price: "REGULAR ACCESS" },
                { type: "$150", price: "VIP ACCESS" },
                { type: "$150", price: "VVIP ACCESS" },
              ].map((ticket, index) => (
                <div
                  key={index}
                  className={`ticket ${selectedTicket === ticket.type ? "selected" : ""}`}
                  onClick={() => setSelectedTicket(ticket.type)}
                >
                  <p className="ticket-type">{ticket.type}</p>
                  <p className="ticket-price">{ticket.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Number of Tickets */}
          <div className="ticket-quantity">
            <label>Number of Tickets</label>
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(5).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {/* {error && <p className="error-message">{error}</p>} */}

          {/* Buttons */}
          <div className="buttons">
            <button className="cancel">Cancel</button>
            <button className="next" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
