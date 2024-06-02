import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar" style={{ backgroundColor: "#1E1E1E" }}>
      <nav>
        <ul>
          <li>
            <Link
              style={{
                color: "grey",

                paddingLeft: "15px",
              }}
              to="/dashboard"
            >
              Home
            </Link>
          </li>
          <li>
            <Link style={{ color: "grey", paddingLeft: "15px" }} to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link style={{ color: "grey", paddingLeft: "15px" }} to="/flights">
              Flights
            </Link>
          </li>

          <li>
            <Link
              style={{ color: "grey", paddingLeft: "15px" }}
              to="/accommodation"
            >
              Accommodation
            </Link>
          </li>
          <li>
            <Link
              style={{ color: "grey", paddingLeft: "15px" }}
              to="/Itinerary"
            >
              Itinerary
            </Link>
          </li>
          <li style={{ paddingTop: "350px" }}>
            <Link style={{ color: "grey", paddingLeft: "15px" }} to="/help">
              Help
            </Link>
          </li>
          <li>
            <Link style={{ color: "grey", paddingLeft: "15px" }} to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <Link style={{ color: "grey", paddingLeft: "15px" }} to="/">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
