import React, { useState } from "react";
import Sidebar from "./sidebar";
import ChatbotComponent from "./chatbot/chatbot";
import "./dashboard.css";

const Help = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbotVisibility = () => {
    setChatbotVisible((prev) => !prev);
  };

  // Inline styles for the container
  const containerStyles = {
    display: "flex",
    height: "100vh",
    overflow: "hidden", // Prevent scrolling
  };

  // Inline styles for the sidebar
  const sidebarStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100vh",

    zIndex: 1000,
  };

  // Inline styles for the content
  const contentStyles = {
    marginLeft: "250px", // Same as the sidebar width
    padding: "20px",
    overflowY: "auto", // Enable scrolling within the content area
    width: "calc(100% - 250px)", // Adjust width to fill the remaining space
  };

  // Inline style for the floating button
  const floatingButtonStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 20px",
    borderRadius: "50%",
    backgroundColor: "#376B7E",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    zIndex: 1001,
  };

  return (
    <div style={containerStyles}>
      <div style={sidebarStyles}>
        <Sidebar />
      </div>
      <div style={contentStyles } >
        <h1 style={{marginTop: "10px", marginLeft: "16px"}}>Help</h1>
        <div className="help-content" style={{ marginLeft: "10px"}}>
          <h2>How to Use the AI Trip Creator</h2>
          <p>
            Welcome to the help section. Here you can find answers to common
            questions and guides to help you navigate the app.
          </p>
          <h3>Getting Started</h3>
          <p>
            To start planning your trip, use the sidebar to navigate to
            different sections such as Flights, Accommodation, and Activities.
          </p>
          <h2>FAQs</h2>
          <ul>
            <li>How do I create a new trip?</li>
            <p>
              To create a new trip, navigate to the Itinerary section. Follow
              the prompts to enter your trip details.
            </p>

            <li>How do I add a new flight?</li>
            <p>
              Navigate to the Flights section and use the 'Add Flight' button to
              enter flight details.
            </p>
            <li>Can I save my itinerary?</li>
            <p>
              Yes, you can save your itinerary by clicking the 'Save Itinerary'
              button in the Itinerary section.
            </p>
            <li>How do I contact support?</li>
            <p>
              You can contact support by clicking on the 'Contact Us' link at
              the bottom of the page or by starting a chat with our chatbot.
            </p>
          </ul>
        </div>

        <ChatbotComponent isVisible={isChatbotVisible} />

        <button style={floatingButtonStyles} onClick={toggleChatbotVisibility}>
          {isChatbotVisible ? "x" : "Chat"}
        </button>
      </div>
    </div>
  );
};

export default Help;
