import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Logouts = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content"></div>
      <div>
        <h1>logout Page</h1>
        {/* Add more profile content here */}
      </div>
    </div>
  );
};

export default Logouts;
