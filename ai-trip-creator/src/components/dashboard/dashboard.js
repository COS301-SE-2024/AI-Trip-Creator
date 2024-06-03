import React from 'react';
import './dashboard.css';
import Sidebar from './sidebar';
import ItineraryForm from './ItineraryForm';
import ItineraryDisplay from './ItineraryDisplay';

const Dashboard = ({ itinerary, generateItinerary }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <h2>Itinerary</h2>
        {!itinerary ? (
          <ItineraryForm onGenerateItinerary={generateItinerary} />
        ) : (
          <ItineraryDisplay itinerary={itinerary} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
