import React from "react";
import Sidebar from "./sidebar";

const Dashboard = ({ itinerary, generateItinerary }) => {
  const styles = {
    dashboard: {
      display: "flex",
      height: "100vh",
    },
    content: {
      flexGrow: 1,
      padding: "20px",
      backgroundColor: "white",
    },
    h1: {
      color: "teal",
      marginBottom: "10px",
    },
    h2: {
      color: "black",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <div className="content">
        <h1>Dashboard</h1>
        <p>
          Welcome to your travel planning dashboard. Here you can manage your
          flights, accommodations, activities, and more.
        </p>
        <h2>Analytics coming soon</h2>
      </div>
    </div>
  );
};

export default Dashboard;
