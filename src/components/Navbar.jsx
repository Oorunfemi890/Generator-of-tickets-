import React from "react";
import { assets } from "../assets/assets";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
