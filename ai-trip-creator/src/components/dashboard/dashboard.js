import React from "react";
import Sidebar from "./sidebar";
import { Route, Routes } from "react-router-dom";
import Profile from "./profile";
import Settings from "./settings";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<h1>Dashboard Home</h1>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
