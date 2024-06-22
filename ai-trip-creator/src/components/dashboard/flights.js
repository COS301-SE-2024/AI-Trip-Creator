// // import React from "react";
// // import "./dashboard.css";
// // import Sidebar from "./sidebar";

// // const Flights = () => {
// //   const flights = [
// //     {
// //       id: "1",
// //       airline: "Air France",
// //       price: "$500",
// //       duration: "8h 30m",
// //       destination: "Paris, France"
// //     },
// //     {
// //       id: "2",
// //       airline: "Lufthansa",
// //       price: "$450",
// //       duration: "7h 50m",
// //       destination: "Berlin, Germany"
// //     },
// //     {
// //       id: "3",
// //       airline: "Qatar Airways",
// //       price: "$1200",
// //       duration: "14h 20m",
// //       destination: "Maldives"
// //     }
// //   ];

// //   return (
// //     <div className="dashboard">
// //       <Sidebar />
// //       <div className="content">
// //         <h1>Flights</h1>
// //         <div className="flight-list">
// //           {flights.map(flight => (
// //             <div key={flight.id} className="flight-item">
// //               <h2>{flight.airline}</h2>
// //               <p>Price: {flight.price}</p>
// //               <p>Duration: {flight.duration}</p>
// //               <p>Destination: {flight.destination}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Flights;
// import React from "react";
// import Sidebar from "./sidebar";

// const Flights = () => {
//   // Function to generate a random time within a given range
//   const getRandomTime = () => {
//     const hours = Math.floor(Math.random() * 24);
//     const minutes = Math.floor(Math.random() * 60);
//     return `${hours < 10 ? "0" + hours : hours}:${
//       minutes < 10 ? "0" + minutes : minutes
//     }`;
//   };

//   // Function to calculate departure time based on arrival time
//   const calculateDepartureTime = (arrivalTime) => {
//     const [arrivalHours, arrivalMinutes] = arrivalTime.split(":").map(Number);
//     let departureHours = arrivalHours - 2;
//     let departureMinutes = arrivalMinutes - 8;
//     if (departureMinutes < 0) {
//       departureHours -= 1;
//       departureMinutes += 60;
//     }
//     return `${departureHours < 10 ? "0" + departureHours : departureHours}:${
//       departureMinutes < 10 ? "0" + departureMinutes : departureMinutes
//     }`;
//   };

//   // Mock data for flights
//   const flights = [
//     {
//       id: 1,
//       origin: "Pretoria",
//       destination: "Cape Town",
//       arrival: getRandomTime(),
//     },
//     {
//       id: 2,
//       origin: "Johannesburg",
//       destination: "Cape Town",
//       arrival: getRandomTime(),
//     },
//     {
//       id: 3,
//       origin: "Pretoria",
//       destination: "Cape Town",
//       arrival: getRandomTime(),
//     },
//     {
//       id: 4,
//       origin: "Johannesburg",
//       destination: "Cape Town",
//       arrival: getRandomTime(),
//     },
//     {
//       id: 5,
//       origin: "Pretoria",
//       destination: "Cape Town",
//       arrival: getRandomTime(),
//     },
//   ];

//   // Calculate departure time for each flight
//   flights.forEach((flight) => {
//     flight.departure = calculateDepartureTime(flight.arrival);
//   });

//   const styles = {
//     dashboard: {
//       display: "flex",
//       height: "100vh",
//     },
//     content: {
//       flexGrow: 1,
//       padding: "20px",
//       backgroundColor: "white",
//     },
//     h1: {
//       color: "teal",
//       marginBottom: "10px",
//     },
//     flightList: {
//       marginTop: "20px",
//     },
//     flight: {
//       backgroundColor: "#f9f9f9",
//       padding: "10px",
//       marginBottom: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "5px",
//     },
//     flightDetails: {
//       marginBottom: "10px",
//     },
//   };

//   return (
//     <div style={styles.dashboard}>
//       <Sidebar />
//       <div style={styles.content}>
//         <h1 style={styles.h1}>Flight Page</h1>
//         <div style={styles.flightList}>
//           {flights.map((flight) => (
//             <div key={flight.id} style={styles.flight}>
//               <div style={styles.flightDetails}>
//                 <h3>{`${flight.origin} to ${flight.destination}`}</h3>
//                 <p>Departure: {flight.departure}</p>
//                 <p>Arrival: {flight.arrival}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Flights;
// src/components/dashboard/flights.js

import React from 'react';
import Sidebar from './sidebar';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Flights = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const calculateDepartureTime = (arrivalTime) => {
    const [arrivalHours, arrivalMinutes] = arrivalTime.split(':').map(Number);
    let departureHours = arrivalHours - 2;
    let departureMinutes = arrivalMinutes - 8;
    if (departureMinutes < 0) {
      departureHours -= 1;
      departureMinutes += 60;
    }
    return `${departureHours < 10 ? '0' + departureHours : departureHours}:${departureMinutes < 10 ? '0' + departureMinutes : departureMinutes}`;
  };

  const flights = [
    { id: 1, origin: 'Pretoria', destination: 'Cape Town', arrival: getRandomTime(), departure: calculateDepartureTime(getRandomTime()) },
    { id: 2, origin: 'Johannesburg', destination: 'Durban', arrival: getRandomTime(), departure: calculateDepartureTime(getRandomTime()) },
    { id: 3, origin: 'Bloemfontein', destination: 'Port Elizabeth', arrival: getRandomTime(), departure: calculateDepartureTime(getRandomTime()) }
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <Box className="content" sx={{ padding: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Flights
        </Typography>
        {flights.map(flight => (
          <Card 
            key={flight.id} 
            className="card" 
            sx={{ 
              backgroundColor: isDarkMode ? '#666666' : '#b4c5e4', 
              color: isDarkMode ? '#FFFFFF' : '#000000',
              marginBottom: '1rem',
              transition: 'background-color 0.3s, color 0.3s'
            }}
          >
            <CardContent>
              <Typography variant="h6" component="h2">
                {flight.origin} to {flight.destination}
              </Typography>
              <Typography variant="body1">
                Departure: {flight.departure} | Arrival: {flight.arrival}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Flights;
