import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Settings = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Settings</h1>
        {/* Add more profile content here */}
      </div>
    </div>
  );
};

export default Settings;
