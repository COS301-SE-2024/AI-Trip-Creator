import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Splash from "./components/splash/splash";
import Dashboard from "./components/dashboard/dashboard";
import Profile from "./components/dashboard/profile";
import Settings from "./components/dashboard/settings";
import Flights from "./components/dashboard/flights";
import Accommodation from "./components/dashboard/accommodation";
import Help from "./components/dashboard/help";
import Itinerary from "./components/dashboard/Itinerary";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const generateItinerary = (preferences) => {
    setItinerary(preferences);
  };

  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="app-container">
                <Splash setIsLoggedIn={setIsLoggedIn} />
              </div>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <div className="app-container">
                <Dashboard />
              </div>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/help" element={<Help />} />
          <Route path="/Itinerary" element={<Itinerary itinerary={itinerary} generateItinerary={generateItinerary}/>}/>
        </Routes>
      </Router>
    </NextUIProvider>
  );
};

export default App;
