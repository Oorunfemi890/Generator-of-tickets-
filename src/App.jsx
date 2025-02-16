// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicketSelection from "./components/TicketSelection";
import Attendee from "./components/Attendee"; // if this page exists

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TicketSelection />} />
        <Route path="/attendee" element={<Attendee />} />
      </Routes>
    </>
  );
};

export default App;
