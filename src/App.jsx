// import "./App.css";
import { Routes, Route } from "react-router-dom";
// import NavBar from "./components/Navbar";
import TicketSelection from "./components/TicketSelection";
import AttendeeForm from "./components/Attendee";
// import About from "./pages/About";
// import Tickets from "./pages/Tickets";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div >
      {/* <ToastContainer /> */}
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<TicketSelection />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/tickets" element={<Tickets />} /> */}
        <Route path="/Attendee" element={<AttendeeForm />} />
      </Routes>
    </div>
  );
}

export default App;