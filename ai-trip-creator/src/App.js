import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Splash from "./components/splash/splash";
import Dashboard from "./components/dashboard/dashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Splash setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
};

export default App;
