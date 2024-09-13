

//import React from 'react';
import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import {exportVariable} from './ItineraryForm';
import { getGlobalAIText } from './globalData'; 
import "./dashboard.css";

function ItineraryDisplay({ itinerary }) {

  const [globalAIText, setGlobalAIText] = useState('');

  // This code works as well. The only issue is that the itinerary is not passed to the subscript operator at the end of the function
  // useEffect(() => {
  //   // Fetch the globalAIText when the component mounts
  //   const fetchData = async () => {
  //     const text = getGlobalAIText();
  //     setGlobalAIText(text);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    // Directly set the AI-generated itinerary from the passed itinerary prop
    if (itinerary.itineraryText) {
      setGlobalAIText(itinerary.itineraryText);
    }
  }, [itinerary]);

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
      'Food': 'Food tours, local restaurants, and culinary classes.',
      'Shopping': 'Shopping malls, local markets, and souvenir shops.',
      'Nightlife': 'Bars, nightclubs, and entertainment venues.'
    };

    return {
      durationDetails: details[itinerary.duration],
      interestsDetails: itinerary.interests.map(interest => interestsDetails[interest]).join(', ')
    };
  };

  const { durationDetails, interestsDetails } = getDetails();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Itinerary
      </Typography>
      <Typography variant="h6"><strong>Destination:</strong> {itinerary.destination}</Typography>
      <Typography variant="h6"><strong>Duration:</strong> {itinerary.duration} ({durationDetails})</Typography>
      <Typography variant="h6"><strong>Interests:</strong> {interestsDetails}</Typography>
      <Typography variant="h6"><strong>Itinerary:</strong> {globalAIText || 'Loading...'}</Typography>
      <Button variant="contained" color="secondary" href={`/accommodations?destination=${itinerary.destination}`}>
        View Accommodations
      </Button>
    </Box>
  );
}

export default ItineraryDisplay;
