import React from "react";
import Sidebar from "./sidebar";
import ItineraryForm from "./ItineraryForm";
import ItineraryDisplay from "./ItineraryDisplay";

const Dashboard = ({ itinerary, generateItinerary }) => {
  const styles = {
    dashboard: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: '20px',
      backgroundColor: 'white',
    },
    h1: {
      color: 'teal',
      marginBottom: '10px',
    },
    h2: {
      color: 'black',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <div style={styles.content}>
        <h1 style={styles.h1}>Dashboard</h1>
        <h2 style={styles.h2}>Itinerary</h2>
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

