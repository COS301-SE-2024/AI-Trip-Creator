import React, { useState } from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";
import ChatbotComponent from "./chatbot/chatbot";

const Help = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbotVisibility = () => {
    setChatbotVisible((prev) => !prev);
  };

  return (
    <div>
      <Sidebar />
      <div className="content">
        <h1>Help</h1>
        <div className="help-content">
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

        <div
          className={`chatbot-container ${isChatbotVisible ? "visible" : ""}`}
        >
          {isChatbotVisible && <ChatbotComponent />}
        </div>

        <button className="floating-button" onClick={toggleChatbotVisibility}>
          {isChatbotVisible ? "x" : "Chat"}
        </button>
      </div>
    </div>
  );
};

export default Help;
