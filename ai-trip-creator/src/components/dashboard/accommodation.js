import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";
const Accommodation = () => {
  return (
    <div className="dashboard" style={{ borderRadius: "50px" }}>
      <Sidebar />
      <div className="content">
        <h1>accommodation Page</h1>
        {/* Add more profile content here */}
      </div>
    </div>
  );
};

export default Accommodation;
