import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import TicketSelection from "./components/TicketSelection";
import AttendeeDetails from "./components/Attendee";
import About from "./pages/About";
import Tickets from "./pages/Ticket";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div >
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<TicketSelection />} />
        <Route path="/about" element={<About />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/attendee-details" element={<AttendeeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
