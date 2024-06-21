// import React from "react";
// import Sidebar from "./sidebar";
// import "./dashboard.css"

// const Flights = () => {
//   const flights = [
//     {
//       id: "1",
//       airline: "Air France",
//       price: "$500",
//       duration: "8h 30m",
//       destination: "Paris, France"
//     },
//     {
//       id: "2",
//       airline: "Lufthansa",
//       price: "$450",
//       duration: "7h 50m",
//       destination: "Berlin, Germany"
//     },
//     {
//       id: "3",
//       airline: "Qatar Airways",
//       price: "$1200",
//       duration: "14h 20m",
//       destination: "Maldives"
//     }
//   ];

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="content">
//         <h1>Flights</h1>
//         <div className="flight-list">
//           {flights.map(flight => (
//             <div key={flight.id} className="flight-item">
//               <h2>{flight.airline}</h2>
//               <p>Price: {flight.price}</p>
//               <p>Duration: {flight.duration}</p>
//               <p>Destination: {flight.destination}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Flights;
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
            className="card-flight" 
            sx={{ 
              backgroundColor: isDarkMode ? '#0077b6' : '#b4c5e4', 
              color: isDarkMode ? '#FFFFFF' : '#000000',
              marginBottom: '1rem',
              transition: 'background-color 0.3s, color 0.3s'
            }}
          >
            <CardContent >
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

