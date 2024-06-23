import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Profile = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>My Profile</h1>
        {/* Add more profile content here */}
      </div>
    </div>
  );
};

export default Profile;
