import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Flights = () => {
  const flights = [
    {
      id: "1",
      airline: "Air France",
      price: "$500",
      duration: "8h 30m",
      destination: "Paris, France"
    },
    {
      id: "2",
      airline: "Lufthansa",
      price: "$450",
      duration: "7h 50m",
      destination: "Berlin, Germany"
    },
    {
      id: "3",
      airline: "Qatar Airways",
      price: "$1200",
      duration: "14h 20m",
      destination: "Maldives"
    }
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Flights</h1>
        <div className="flight-list">
          {flights.map(flight => (
            <div key={flight.id} className="flight-item">
              <h2>{flight.airline}</h2>
              <p>Price: {flight.price}</p>
              <p>Duration: {flight.duration}</p>
              <p>Destination: {flight.destination}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flights;
