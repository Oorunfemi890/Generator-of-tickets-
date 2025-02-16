import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineMail } from "react-icons/md";
import { assets } from "../assets/assets"; // For your icon
import "../styles/AttendeeForm.css"; // Import the CSS file

const AttendeeDetails = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedTicketData = localStorage.getItem("ticketData");
    if (storedTicketData) {
      setTicketData(JSON.parse(storedTicketData));
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Instead of uploading, we create a local URL for preview
      const fileUrl = URL.createObjectURL(file);
      toast.success("File selected successfully!");
      setProfilePhoto(fileUrl);
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  // Removed sendVerificationEmail function

  const handleSubmit = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!profilePhoto) {
      newErrors.profilePhoto = "Profile photo is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const attendeeDetails = {
      name,
      email,
      about,
      profilePhoto,
    };

    const finalTicketData = { ...ticketData, ...attendeeDetails };
    localStorage.setItem("finalTicketData", JSON.stringify(finalTicketData));

    // Simulate form submission delay if desired
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted successfully!");
      navigate("/tickets");
    }, 1000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload({ target: { files: [file] } });
    } else {
      setErrors({
        ...errors,
        profilePhoto: "Please select a valid image file.",
      });
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="attendee-container">
      <div className="attendee-card">
        {/* Header */}
        <h2 className="attendee-title">Attendee Details</h2>
        <p className="attendee-step">Step 2/3</p>

        {/* Progress Bar */}
        <div className="attendee-progress-bar">
          <div className="attendee-progress" style={{ width: "66%" }}></div>
        </div>

        {/* Upload Section */}
        <div className="attendee-upload-section">
          <label className="attendee-upload-label">Upload Profile Photo</label>
          <div
            className="attendee-upload-box"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleUploadAreaClick}
          >
            <input
              type="file"
              className="attendee-file-input"
              onChange={handleFileUpload}
              accept="image/*"
              ref={fileInputRef}
            />
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile Preview"
                className="attendee-upload-preview"
              />
            ) : (
              <div className="attendee-upload-content">
                <img
                  src={assets.icon}
                  alt="Upload Icon"
                  className="attendee-upload-icon"
                />
                <p>Drag &amp; drop or click to upload</p>
              </div>
            )}
          </div>
          {errors.profilePhoto && (
            <p className="attendee-error">{errors.profilePhoto}</p>
          )}
        </div>

        {/* Name Field */}
        <label className="attendee-label">
          Enter your name <span className="required">*</span>
        </label>
        <input
          type="text"
          className="attendee-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="attendee-error">{errors.name}</p>}

        {/* Email Field */}
        <label className="attendee-label">
          Enter your email <span className="required">*</span>
        </label>
        <div className="attendee-email-field">
          <MdOutlineMail className="attendee-mail-icon" />
          <input
            type="email"
            className="attendee-input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@avioflagos.io"
          />
        </div>
        {errors.email && <p className="attendee-error">{errors.email}</p>}

        {/* About Field */}
        <label className="attendee-label">About the project</label>
        <textarea
          className="attendee-textarea"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        {/* Buttons */}
        <div className="attendee-buttons">
          <button className="attendee-btn-back" onClick={() => navigate(-1)}>
            Back
          </button>
          <button
            className="attendee-btn-submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Get My Free Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
