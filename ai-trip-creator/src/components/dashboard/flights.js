// import React from "react";
// import "./dashboard.css";
// import Sidebar from "./sidebar";

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
import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Flights = () => {
  // Function to generate a random time within a given range
  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  // Function to calculate departure time based on arrival time
  const calculateDepartureTime = (arrivalTime) => {
    const [arrivalHours, arrivalMinutes] = arrivalTime.split(":").map(Number);
    let departureHours = arrivalHours - 2;
    let departureMinutes = arrivalMinutes - 8;
    if (departureMinutes < 0) {
      departureHours -= 1;
      departureMinutes += 60;
    }
    return `${departureHours < 10 ? "0" + departureHours : departureHours}:${departureMinutes < 10 ? "0" + departureMinutes : departureMinutes}`;
  };

  // Mock data for flights
  const flights = [
    { id: 1, origin: "Pretoria", destination: "Cape Town", arrival: getRandomTime() },
    { id: 2, origin: "Johannesburg", destination: "Cape Town", arrival: getRandomTime() },
    { id: 3, origin: "Pretoria", destination: "Cape Town", arrival: getRandomTime() },
    { id: 4, origin: "Johannesburg", destination: "Cape Town", arrival: getRandomTime() },
    { id: 5, origin: "Pretoria", destination: "Cape Town", arrival: getRandomTime() },
  ];

  // Calculate departure time for each flight
  flights.forEach((flight) => {
    flight.departure = calculateDepartureTime(flight.arrival);
  });

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Flight Page</h1>
        <div className="flight-list">
          {flights.map((flight) => (
            <div key={flight.id} className="flight">
              <div className="flight-details">
                <h3>{`${flight.origin} to ${flight.destination}`}</h3>
                <p>Departure: {flight.departure}</p>
                <p>Arrival: {flight.arrival}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flights;
