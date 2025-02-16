import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import "../styles/Ticket.css";

const Tickets = () => {
  const [attendeeDetails, setAttendeeDetails] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("finalTicketData");
    if (storedData) {
      setAttendeeDetails(JSON.parse(storedData));
    }
  }, []);

  const handleDownloadTicket = () => {
    const ticketElement = document.querySelector(".ticket-container");

    if (ticketElement) {
      html2canvas(ticketElement).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "ticket.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  if (!attendeeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ticket-wrapper">
      <p className="ticket-header-title">Your Ticket Is Booked!</p>
      <p className="ticket-header-subtitle">
        Check your email for a copy or you can download
      </p>
      <img className="ticket-background" src={assets.ticket} alt="Ticket BG" />
      <div className="ticket-container">
        <div className="ticket-profile">
          <img
            src={attendeeDetails.profilePhoto}
            alt="Profile"
          />
        </div>
        <div className="ticket-details">
          <div className="ticket-row">
            <div className="ticket-info">
              <p className="ticket-label">Enter your name</p>
              <p className="ticket-text">{attendeeDetails.name}</p>
            </div>
            <div className="ticket-info">
              <p className="ticket-label">Enter your email*</p>
              <p className="ticket-text">{attendeeDetails.email}</p>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-info">
              <p className="ticket-label">Ticket Type:</p>
              <p className="ticket-text">{attendeeDetails.selectedTicket}</p>
            </div>
            <div className="ticket-info">
              <p className="ticket-label">Ticket for:</p>
              <p className="ticket-text">{attendeeDetails.ticketCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="barcode-container">
        <img src={assets.barcode} alt="Barcode" />
      </div>
      <div className="ticket-buttons">
        <Link to={"/"}>
          <button className="ticket-btn book-another">
            Book Another Ticket
          </button>
        </Link>
        <button
          onClick={handleDownloadTicket}
          className="ticket-btn download"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Tickets;
