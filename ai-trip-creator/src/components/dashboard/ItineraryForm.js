import React, { useState } from 'react';

function ItineraryForm({ onGenerateItinerary }) {
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateItinerary(preferences);
  };

  const locations = ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban', 'Gqeberha'];
  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
  const interests = ['Culture', 'Adventure', 'Relaxation', 'Nature', 'Food'];

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Destination:
        <select name="destination" value={preferences.destination} onChange={handleChange}>
          <option value="" disabled>Select a location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>
      <label>
        Duration:
        <select name="duration" value={preferences.duration} onChange={handleChange}>
          <option value="" disabled>Select a duration</option>
          {durations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </label>
      <label>
        Interests:
        <select name="interests" value={preferences.interests} onChange={handleChange}>
          <option value="" disabled>Select an interest</option>
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Generate Itinerary</button>
    </form>
  );
}

export default ItineraryForm;
