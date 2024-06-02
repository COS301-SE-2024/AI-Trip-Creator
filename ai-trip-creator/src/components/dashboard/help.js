import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Help = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Help</h1>
        <div className="help-content">
          <h2>How to Use the AI Trip Creator</h2>
          <p>Welcome to the AI Trip Creator help section. Here you will find instructions and FAQs to help you plan your perfect trip.</p>
          <h3>Getting Started</h3>
          <p>To start planning your trip, use the sidebar to navigate to different sections such as Flights, Accommodation, and Activities.</p>
          <h3>FAQ</h3>
          <p><strong>How do I add a new flight?</strong></p>
          <p>Navigate to the Flights section and use the 'Add Flight' button to enter flight details.</p>
          <p><strong>Can I save my itinerary?</strong></p>
          <p>Yes, you can save your itinerary by clicking the 'Save Itinerary' button in the Itinerary section.</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
