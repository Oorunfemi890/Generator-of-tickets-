import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { motion } from "framer-motion";
import "./index.css";

Modal.setAppElement("#root");

const App = () => {
  const [formData, setFormData] = useState({
    date: "",
    therapy: false,
    beMyBabe: false,
    cookForMe: false,
    stableMentalHealth: false,
    happyEnding: false,
    fees: "",
    yourName: "",
    email: "",
    phone: Array(11).fill(""), // 11 separate phone inputs
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dotCount, setDotCount] = useState(0); // For the dot animation
  const [buttonText, setButtonText] = useState("Confirm Agreement");

  const handleChange = (e) => {
    const { name, type, checked, value, dataset } = e.target;
    if (name === "phone") {
      const updatedPhone = [...formData.phone];
      updatedPhone[dataset.index] = value;
      setFormData({
        ...formData,
        phone: updatedPhone,
      });

      // Auto-focus on next input when user types
      if (value !== "" && dataset.index < 10) {
        document.querySelector(`input[data-index="${parseInt(dataset.index) + 1}"]`).focus();
      }

      // Focus backward when user deletes
      if (value === "" && dataset.index > 0) {
        document.querySelector(`input[data-index="${parseInt(dataset.index) - 1}"]`).focus();
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Phone Number Validation
    const phoneRegex = /^[0-9]{11}$/;
    const phone = formData.phone.join("");
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 11-digit Nigerian phone number.");
      return;
    }

    setModalIsOpen(true); // Show the modal with the Confirm Agreement button
  };

  const handleProcessing = async () => {
    setButtonText("Processing..."); // Change button text to "Processing..."
    setProcessing(true);
    let count = 0;

    // Start the dot animation (showing 1 dot per second)
    const interval = setInterval(() => {
      setDotCount(count);
      count = (count + 1) % 6; // Reset to 0 after 5 dots
    }, 1000);

    try {
      // Simulate API call with a delay (this would be your real API call)
      const response = await axios.post("http://localhost:5000/api/agreement", formData);
      
      // Handle success response from the API
      if (response.data.success) {
        setConfirmationModal(true); // Show confirmation modal
        setModalIsOpen(false); // Close the initial modal
      }
    } catch (error) {
      console.error("Error during agreement submission:", error);
    } finally {
      // Stop the dot animation and reset to original button text
      clearInterval(interval);
      setDotCount(0); // Reset dot count
      setProcessing(false);
      setButtonText("Confirm Agreement"); // Reset the button text back to original
    }
  };

  return (
    <div className="container">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="form-heading"
      >
        Therapy Agreement Form
      </motion.h1>

      <form onSubmit={handleSubmit} className="agreement-form">
        <label>Date:
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
        </label>

        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="therapy" 
              checked={formData.therapy} 
              onChange={handleChange} 
            />
            Therapy
          </label>
          <label>
            <input 
              type="checkbox" 
              name="beMyBabe" 
              checked={formData.beMyBabe} 
              onChange={handleChange} 
            />
            Be my babe
          </label>
          <label>
            <input 
              type="checkbox" 
              name="cookForMe" 
              checked={formData.cookForMe} 
              onChange={handleChange} 
            />
            Cook for me
          </label>
          <label>
            <input 
              type="checkbox" 
              name="stableMentalHealth" 
              checked={formData.stableMentalHealth} 
              onChange={handleChange} 
            />
            Stay until my mental health is stable
          </label>
          <label>
            <input 
              type="checkbox" 
              name="happyEnding" 
              checked={formData.happyEnding} 
              onChange={handleChange} 
            />
            Happy Ending
          </label>
        </div>

        <label>Fees:
          <input 
            type="number" 
            name="fees" 
            value={formData.fees} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Your Name:
          <input 
            type="text" 
            name="yourName" 
            value={formData.yourName} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </label>

        <label>Phone Number:
          <div className="phone-inputs">
            {formData.phone.map((digit, index) => (
              <input 
                key={index} 
                type="text" 
                name="phone" 
                value={digit} 
                onChange={handleChange} 
                data-index={index} 
                maxLength="1" 
                required 
                className="phone-input"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </label>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={() => setModalIsOpen(false)} 
        className="modal"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          className="modal-content"
        >
          <h2>Confirm Agreement</h2>
          <button 
            onClick={handleProcessing} 
            className="modal-btn"
            disabled={processing} // Disable button when processing is happening
          >
            {processing ? `Processing ${".".repeat(dotCount)}` : buttonText}
          </button>
          <button onClick={() => setModalIsOpen(false)} className="modal-btn cancel-btn">Cancel</button>
        </motion.div>
      </Modal>

      <Modal 
        isOpen={confirmationModal} 
        onRequestClose={() => setConfirmationModal(false)} 
        className="modal"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          className="modal-content"
        >
          <h2>Agreement Sent</h2>
          <p>All credentials have been sent to OlorunfemiAyomide045@gmail.com.</p>
          <p>You will also receive a copy at {formData.email}.</p>
          <p>Please check your email for the agreement form.</p>
          <button onClick={() => setConfirmationModal(false)} className="modal-btn">Close</button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default App;
