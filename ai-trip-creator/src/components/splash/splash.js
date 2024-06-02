import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Login from "../auth/login";
import Signup from "../auth/signup";

const Splash = ({ setIsLoggedIn }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const openLogin = () => setVisibleLogin(true);
  const closeLogin = () => setVisibleLogin(false);
  const openSignup = () => setVisibleSignup(true);
  const closeSignup = () => setVisibleSignup(false);

  return (
    <div
      className="splash-container"
      style={{ position: "relative", height: "100vh" }}
    >
      <h1>Trip Creator</h1>
      <Button onClick={openLogin}>Get Started</Button>

      {visibleLogin && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "2rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "20rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <p id="modal-title" size={18}>
              Login
            </p>
          </div>
          <Login
            setIsLoggedIn={setIsLoggedIn}
            closeLogin={closeLogin}
            openSignup={openSignup}
          />
        </div>
      )}

      {visibleSignup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "2rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "20rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <p id="modal-title" size={18}>
              Signup
            </p>
          </div>
          <Signup closeSignup={closeSignup} openLogin={openLogin} />
        </div>
      )}

      {(visibleLogin || visibleSignup) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 500,
          }}
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
