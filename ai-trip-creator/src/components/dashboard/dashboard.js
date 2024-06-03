import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Outlet />
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
