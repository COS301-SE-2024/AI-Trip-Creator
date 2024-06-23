import React from 'react';

function ItineraryDisplay({ itinerary }) {
  const getDetails = () => {
    const details = {
      '1-3 days': 'A short and sweet trip with the highlights of the city.',
      '4-7 days': 'A more immersive experience, allowing for additional activities.',
      '8-14 days': 'A deep dive into the city with plenty of time for relaxation and exploration.',
      '15+ days': 'An extensive journey to fully explore all the attractions and hidden gems.'
    };

    const interestsDetails = {
      'Culture': 'Museums, historical landmarks, and cultural events.',
      'Adventure': 'Outdoor activities, hiking, and adventurous tours.',
      'Relaxation': 'Spas, leisure walks, and beach time.',
      'Nature': 'Parks, natural reserves, and scenic views.',
      'Food': 'Food tours, local restaurants, and culinary classes.'
    };

    return {
      durationDetails: details[itinerary.duration],
      interestsDetails: interestsDetails[itinerary.interests]
    };
  };

  const { durationDetails, interestsDetails } = getDetails();

  return (
    <div>
      <h2>Your Itinerary</h2>
      <p><strong>Destination:</strong> {itinerary.destination}</p>
      <p><strong>Duration:</strong> {itinerary.duration} ({durationDetails})</p>
      <p><strong>Interests:</strong> {itinerary.interests} ({interestsDetails})</p>
    </div>
  );
}

export default ItineraryDisplay;
