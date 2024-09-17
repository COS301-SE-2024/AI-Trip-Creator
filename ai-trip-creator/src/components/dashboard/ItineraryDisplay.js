//import React from 'react';
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { exportVariable } from "./ItineraryForm";
import { getGlobalAIText } from "./globalData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown (e.g., tables, strikethroughs)

import "./dashboard.css";

function ItineraryDisplay({ itinerary }) {
  const [globalAIText, setGlobalAIText] = useState("");

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

  const formattedAIText = globalAIText.split("\n").map((line, index) => (
    <Typography key={index} variant="body1" paragraph>
      {line}
    </Typography>
  ));

  const getDetails = () => {
    const details = {
      "1-3 days": "A short and sweet trip with the highlights of the city.",
      "4-7 days":
        "A more immersive experience, allowing for additional activities.",
      "8-14 days":
        "A deep dive into the city with plenty of time for relaxation and exploration.",
      "15+ days":
        "An extensive journey to fully explore all the attractions and hidden gems.",
    };

    const interestsDetails = {
      Culture: "Museums, historical landmarks, and cultural events.",
      Adventure: "Outdoor activities, hiking, and adventurous tours.",
      Relaxation: "Spas, leisure walks, and beach time.",
      Nature: "Parks, natural reserves, and scenic views.",
      Food: "Food tours, local restaurants, and culinary classes.",
      Shopping: "Shopping malls, local markets, and souvenir shops.",
      Nightlife: "Bars, nightclubs, and entertainment venues.",
    };

    return {
      durationDetails: details[itinerary.duration],
      interestsDetails: itinerary.interests
        .map((interest) => interestsDetails[interest])
        .join(", "),
    };
  };

  const { durationDetails, interestsDetails } = getDetails();
  const itineraryByDays = globalAIText
    .split(/(?=Day \d+:)/g) // Regex to split the text at each "Day X:" occurrence
    .filter((day) => day.trim() !== "");
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Your Itinerary
      </Typography>
      <Typography variant="h6">
        <strong>Destination:</strong> {itinerary.destination}
      </Typography>
      <Typography variant="h6">
        <strong>Duration:</strong> {itinerary.duration} ({durationDetails})
      </Typography>
      <Typography variant="h6">
        <strong>Interests:</strong> {interestsDetails}
      </Typography>
      {/* <Typography variant="h6"><strong>Itinerary:</strong> {globalAIText || 'Loading...'}</Typography> */}
      {/* <Typography variant="h6"><strong>Itinerary:</strong></Typography>
      <Box>{formattedAIText || 'Loading...'}</Box> */}

      <Grid container spacing={2} mt={2}>
        {/* Loop through the split itinerary days and display each in its own card */}
        {itineraryByDays.map((dayText, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              {index === 0 && ( // Only show the image for the first card
                <CardMedia
                  component="img"
                  height="200"
                  image="https://www.sa-venues.com/things-to-do/gauteng/gallery/1/1.jpg"
                  alt="info Image"
                />
              )}
              <CardContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {dayText}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br></br>
      <Card mt={2}>
        <CardContent>
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            color="secondary"
            href={`/accommodations?destination=${itinerary.destination}`}
          >
            Find Accommodations
          </Button>
        </CardContent>
      </Card>

      <br></br>
      <Card mt={2}>
        <CardContent>
          <Button
            sx={{ mt: 1 }}
            variant="outlined"
            color="secondary"
            href={`/flights?destination=${itinerary.destination}`}
          >
            Flight options
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ItineraryDisplay;
