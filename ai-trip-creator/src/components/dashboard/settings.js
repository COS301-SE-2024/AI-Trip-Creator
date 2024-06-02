import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Settings = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Settings</h1>
        <div className="settings-content">
          <h2>Account Settings</h2>
          <p>Update your account details and preferences below.</p>
          <h3>Change Password</h3>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <button>Update Password</button>
          <h3>Notification Preferences</h3>
          <label>
            <input type="checkbox" />
            Email Notifications
          </label>
          <label>
            <input type="checkbox" />
            SMS Notifications
          </label>
          <button>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
