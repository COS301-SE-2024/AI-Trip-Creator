import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/"); // Redirect to the login page or home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <div>
              <h1> {userName}</h1>
            </div>
          </li>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/flights">Flights</Link>
          </li>
          <li>
            <Link to="/accommodation">Accommodation</Link>
          </li>
          <li>
            <Link to="/Itinerary">Itinerary</Link>
          </li>
          <li style={{ paddingTop: "100px" }}>
            <Link to="/help">Help</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                padding: 0,
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
