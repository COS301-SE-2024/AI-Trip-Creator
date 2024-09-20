import React, { useState } from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";
import ItineraryForm from "./ItineraryForm";
import ItineraryDisplay from "./ItineraryDisplay";

const Itinerary = () => {
  const [itinerary, setItinerary] = useState(null);

  const generateItinerary = (preferences) => {
    setItinerary(preferences);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {!itinerary ? (
          <ItineraryForm onGenerateItinerary={generateItinerary} />
        ) : (
          <ItineraryDisplay itinerary={itinerary} />
        )}
      </div>
    </div>
  );
};

export default Itinerary;
