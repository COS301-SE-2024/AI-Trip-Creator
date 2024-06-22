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
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Itinerary</h1>
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
