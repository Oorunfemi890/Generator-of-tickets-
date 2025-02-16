import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import "../styles/Navbar.css";

const Navbar = () => {
  const [ticketGenerated, setTicketGenerated] = useState(false);

  useEffect(() => {
    const finalTicketData = localStorage.getItem("finalTicketData");
    if (finalTicketData) {
      setTicketGenerated(true);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={assets.thumb} alt="thumb" />
        <img className="logo-text" src={assets.ticz} alt="ticz" />
      </div>
      <div className="nav-links">
        <Link to="/" className="active">
          Events
        </Link>
        {ticketGenerated && (
          <Link to="/tickets">
            My Tickets
          </Link>
        )}
        <Link to="/about">
          About Project
        </Link>
      </div>
      {ticketGenerated && (
        <Link to="/tickets">
          <button className="my-tickets">MY TICKETS →</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
