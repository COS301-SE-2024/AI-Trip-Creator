import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    preferences: ["Beach", "Adventure", "Luxury"]
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>My Profile</h1>
        <div className="profile-content">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <h3>Preferences:</h3>
          <ul>
            {user.preferences.map(pref => (
              <li key={pref}>{pref}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
