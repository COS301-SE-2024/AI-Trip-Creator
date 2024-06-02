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
      </div>
    </div>
  );
};

export default Dashboard;
