import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Accommodation = () => {
  const accommodations = [
    {
      id: "1",
      name: "The Oyster Box",
      price: "R4000 per night",
      location: "Durban, South Africa",
      description: "A luxurious stay in Umhlanga with stunning views of the Indian Ocean."
    },
    {
      id: "2",
      name: "Protea Hotel",
      price: "R1500 per night",
      location: "Cape Town, South Africa",
      description: "Affordable and comfortable accommodation in central Cape Town with Table Mountain views."
    },
    {
      id: "3",
      name: "Kruger National Park Lodge",
      price: "R3000 per night",
      location: "Kruger National Park, South Africa",
      description: "Experience the wild with comfortable rooms and excellent amenities in the heart of the Kruger National Park."
    }
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Accommodation</h1>
        <div className="accommodation-list">
          {accommodations.map(acc => (
            <div key={acc.id} className="accommodation-item">
              <h2>{acc.name}</h2>
              <p>{acc.price}</p>
              <p>{acc.location}</p>
              <p>{acc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accommodation;