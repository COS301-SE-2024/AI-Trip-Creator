import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Help = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>help Page</h1>
        {/* Add more profile content here */}
      </div>
    </div>
  );
};

export default Help;
