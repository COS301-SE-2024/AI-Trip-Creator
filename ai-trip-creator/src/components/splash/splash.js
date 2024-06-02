import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Login from "../auth/login";
import Signup from "../auth/signup";
import './splash.css';

const Splash = ({ setIsLoggedIn }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const openLogin = () => setVisibleLogin(true);
  const closeLogin = () => setVisibleLogin(false);
  const openSignup = () => setVisibleSignup(true);
  const closeSignup = () => setVisibleSignup(false);

  return (
    <div className="splash-container">
      <div className="header">
        <h1>Trip Creator</h1>
        <Button onClick={openLogin} className="get-started-button">Get Started</Button>
      </div>

      {visibleLogin && (
        <div className="modal">
          <div className="modal-content">
            <p className="modal-title">Login</p>
            <Login
              setIsLoggedIn={setIsLoggedIn}
              closeLogin={closeLogin}
              openSignup={openSignup}
            />
          </div>
        </div>
      )}

      {visibleSignup && (
        <div className="modal">
          <div className="modal-content">
            <p className="modal-title">Signup</p>
            <Signup closeSignup={closeSignup} openLogin={openLogin} />
          </div>
        </div>
      )}

      {(visibleLogin || visibleSignup) && (
        <div
          className="modal-overlay"
          onClick={() => {
            closeLogin();
            closeSignup();
          }}
        />
      )}
    </div>
  );
};

export default Splash;