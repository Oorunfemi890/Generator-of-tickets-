import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import JsBarcode from "jsbarcode";
import "../styles/Ticket.css";

const Tickets = () => {
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const barcodeRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem("finalTicketData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setAttendeeDetails(parsedData);

      setTimeout(() => {
        if (barcodeRef.current) {
          JsBarcode(barcodeRef.current, parsedData.email || "123456789", {
            format: "CODE128",
            displayValue: false, // Hides the text below the barcode
            lineColor: "#000", // Black barcode lines
            width: 2,
            height: 50,
            background: "#fff", // White background
            margin: 5,
          });
        }
      }, 500);
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
        Check your email for a copy or download it now
      </p>
      <div className="ticket-container">
        <div className="ticket-profile">
          <img src={attendeeDetails.profilePhoto} alt="Profile" />
        </div>
        <div className="ticket-details">
          <div className="ticket-row">
            <div className="ticket-info">
              <p className="ticket-label">Name</p>
              <p className="ticket-text">{attendeeDetails.name}</p>
            </div>
            <div className="ticket-info">
              <p className="ticket-label">Email</p>
              <p className="ticket-text">{attendeeDetails.email}</p>
            </div>
          </div>
          <div className="ticket-row">
            <div className="ticket-info">
              <p className="ticket-label">Ticket Type</p>
              <p className="ticket-text">{attendeeDetails.selectedTicket}</p>
            </div>
            <div className="ticket-info">
              <p className="ticket-label">Number of Tickets</p>
              <p className="ticket-text">{attendeeDetails.ticketCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barcode Display */}
      <div className="barcode-container">
        <svg ref={barcodeRef}></svg>
      </div>

      <div className="ticket-buttons">
        <Link to={"/"}>
          <button className="ticket-btn book-another">
            Book Another Ticket
          </button>
        </Link>
        <button onClick={handleDownloadTicket} className="ticket-btn download">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default Tickets;
