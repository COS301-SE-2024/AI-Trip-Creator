// // // src/components/App.js
// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import { NextUIProvider } from "@nextui-org/react";
// // import Splash from "./components/splash/splash";
// // import Dashboard from "./components/dashboard/dashboard";
// // import Profile from "./components/dashboard/profile";
// // import Settings from "./components/dashboard/settings";
// // import Flights from "./components/dashboard/flights";
// // import Accommodation from "./components/dashboard/accommodation";
// // import Help from "./components/dashboard/help";
// // import Itinerary from "./components/dashboard/Itinerary";
// // import { UserProvider } from "./components/UserContext/UserContext";
// // import { ThemeProviderWrapper } from "./components/themeContext/themeContext";

// // const App = () => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [itinerary, setItinerary] = useState(null);

// //   const generateItinerary = (preferences) => {
// //     setItinerary(preferences);
// //   };

// //   return (
// //     <NextUIProvider>
// //       <UserProvider>
// //         <ThemeProviderWrapper>
// //           <Router>
// //             <Routes>
// //               <Route
// //                 path="/"
// //                 element={
// //                   <div className="app-container">
// //                     <Splash setIsLoggedIn={setIsLoggedIn} />
// //                   </div>
// //                 }
// //               />
// //               <Route
// //                 path="/dashboard/*"
// //                 element={
// //                   <div className="app-container">
// //                     <Dashboard itinerary={itinerary} generateItinerary={generateItinerary} />
// //                   </div>
// //                 }
// //               />
// //               <Route path="/profile" element={<Profile />} />
// //               <Route path="/settings" element={<Settings />} />
// //               <Route path="/flights" element={<Flights />} />
// //               <Route path="/accommodation" element={<Accommodation />} />
// //               <Route path="/help" element={<Help />} />
// //               <Route
// //                 path="/Itinerary"
// //                 element={
// //                   <Itinerary
// //                     itinerary={itinerary}
// //                     generateItinerary={generateItinerary}
// //                   />
// //                 }
// //               />
// //             </Routes>
// //           </Router>
// //         </ThemeProviderWrapper>
// //       </UserProvider>
// //     </NextUIProvider>
// //   );
// // };

// // export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { NextUIProvider } from "@nextui-org/react";
// import Splash from "./components/splash/splash";
// import Dashboard from "./components/dashboard/dashboard";
// import Profile from "./components/dashboard/profile";
// import Settings from "./components/dashboard/settings";
// import Flights from "./components/dashboard/flights";
// import Accommodation from "./components/dashboard/accommodation";
// import Help from "./components/dashboard/help";
// import Analytics from "./components/dashboard/analytics";
// import Itinerary from "./components/dashboard/Itinerary";
// import Accommodations from "./components/dashboard/accommodation";
// import { UserProvider } from "./components/UserContext/UserContext";
// import { ThemeProviderWrapper } from "./components/themeContext/themeContext";
// import Activities from "./components/dashboard/activities";
// import { TimeSpentProvider } from './context/TimeSpentContext';
// import Analytics from './components/dashboard/analytics';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [itinerary, setItinerary] = useState(null);

//   const generateItinerary = (preferences) => {
//     setItinerary(preferences);
//   };

//   return (
//     <NextUIProvider>
//       <UserProvider>
//         <ThemeProviderWrapper>
//           <Router>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <div className="app-container">
//                     <Splash setIsLoggedIn={setIsLoggedIn} />
//                   </div>
//                 }
//               />
//               <Route
//                 path="/dashboard/*"
//                 element={
//                   <div className="app-container">
//                     <Dashboard
//                       itinerary={itinerary}
//                       generateItinerary={generateItinerary}
//                     />
//                   </div>
//                 }
//               />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/settings" element={<Settings />} />
//               <Route path="/flights" element={<Flights />} />
//               <Route path="/accommodation" element={<Accommodation />} />
//               <Route path="/activities" element={<Activities />} />
//               <Route path="/help" element={<Help />} />
//               <Route path="/analytics" element={<Analytics />} />
//               <Route
//                 path="/Itinerary"
//                 element={
//                   <Itinerary
//                     itinerary={itinerary}
//                     generateItinerary={generateItinerary}
//                   />
//                 }
//               />
//               <Route
//                 path="/accommodations"
//                 element={<Accommodations />} // Add this route
//               />
//             </Routes>
//           </Router>
//         </ThemeProviderWrapper>
//       </UserProvider>
//     </NextUIProvider>
//   );
// };

// export default App;

import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import Splash from './components/splash/splash';
import Dashboard from './components/dashboard/dashboard';
import Profile from './components/dashboard/profile';
import Settings from './components/dashboard/settings';
import Flights from './components/dashboard/flights';
import Accommodation from './components/dashboard/accommodation';
import Help from './components/dashboard/help';
import SavedItineraries from './components/dashboard/SavedItineraries';
import Analytics from './components/dashboard/analytics';
import Itinerary from './components/dashboard/Itinerary';
import Accommodations from './components/dashboard/accommodation';
import { UserProvider } from './components/UserContext/UserContext';
import { ThemeProviderWrapper } from './components/themeContext/themeContext';
import Activities from './components/dashboard/activities';
import { TimeSpentProvider } from './components/TimeContext/TimeSpentContext'; // Import the TimeSpentProvider

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const generateItinerary = (preferences) => {
    setItinerary(preferences);
  };

  return (
    <NextUIProvider>
      <UserProvider>
        <ThemeProviderWrapper>
          <TimeSpentProvider> {/* Wrap your application with TimeSpentProvider */}
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
                      <Dashboard
                        itinerary={itinerary}
                        generateItinerary={generateItinerary}
                      />
                    </div>
                  }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/help" element={<Help />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/SavedItineraries" element={<SavedItineraries/>}/>
                <Route
                  path="/Itinerary"
                  element={
                    <Itinerary
                      itinerary={itinerary}
                      generateItinerary={generateItinerary}
                    />
                  }
                />
                <Route
                  path="/accommodations"
                  element={<Accommodations />} // Add this route
                />
              </Routes>
            </Router>
          </TimeSpentProvider>
        </ThemeProviderWrapper>
      </UserProvider>
    </NextUIProvider>
  );
};

export default App;