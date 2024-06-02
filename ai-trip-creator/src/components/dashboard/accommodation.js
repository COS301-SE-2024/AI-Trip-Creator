import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";

const Accommodation = () => {
  const accommodations = [
    {
      id: "1",
      name: "Grand Hotel",
      price: "$150 per night",
      location: "Paris, France",
      description: "A luxurious stay in the heart of Paris with stunning views of the Eiffel Tower."
    },
    {
      id: "2",
      name: "Budget Inn",
      price: "$50 per night",
      location: "Berlin, Germany",
      description: "Affordable and comfortable accommodation in central Berlin."
    },
    {
      id: "3",
      name: "Beachside Resort",
      price: "$200 per night",
      location: "Maldives",
      description: "Experience paradise with beachfront rooms and excellent amenities."
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
