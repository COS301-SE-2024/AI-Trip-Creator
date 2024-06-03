import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/flights">
              Flights
            </Link>
          </li>
          <li>
            <Link to="/accommodation">
              Accommodation
            </Link>
          </li>
          <li style={{ paddingTop: "380px" }}>
            <Link style={{ color: "grey", paddingLeft: "15px" }} to="/help">
              Help
            </Link>
          </li>
          <li>
            <Link to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
