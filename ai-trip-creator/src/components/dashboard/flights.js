import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Flights = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Flights</h1>
        {/* Add more profile content here */}
      </div>
    </div>
  );
};

export default Flights;
