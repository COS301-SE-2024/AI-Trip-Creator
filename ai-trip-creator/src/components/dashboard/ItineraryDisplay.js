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
import Slider from "react-slick"; // Import Slider from react-slick
import { FaFilter, FaSearch, FaStar, FaHeart } from "react-icons/fa";
import "./dashboard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function ItineraryDisplay({ itinerary }) {
  const [globalAIText, setGlobalAIText] = useState("");
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    // Directly set the AI-generated itinerary from the passed itinerary prop
    if (itinerary.itineraryText) {
      setGlobalAIText(itinerary.itineraryText);
    }
    const destinationParam = itinerary.destination;
    handleSearch(destinationParam.toLowerCase().replace(/\s+/g, ""));
  }, [itinerary]);

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
    .split(/(?=Day \d+:)/g)
    .filter((day) => day.trim() !== "");

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Accommodations
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const accommodationsRef = collection(db, "Accommodation");
      const q = firestoreQuery(
        accommodationsRef,
        where("city", "==", searchQuery),
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        if (results.length < 12) results.push(doc.data());
      });

      if (results.length > 0) {
        setAccommodations(results);
        setError("");
      } else {
        setError(`No accommodations found for "${searchQuery}"`);
        setAccommodations([]);
      }
    } catch (error) {
      console.error("Error fetching search results from Firestore:", error);
      setError("Failed to fetch accommodation data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      <Grid container spacing={2} mt={2}>
        {itineraryByDays.map((dayText, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              {index === 0 && (
                <CardMedia
                  component="img"
                  height="200"
                  image="https://www.sa-venues.com/things-to-do/gauteng/gallery/12/1.jpg"
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
      <br />
      <Card mt={2}>
        <CardContent>
          {/* Accommodation Carousel */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Recommended Accommodations
          </Typography>
          {loading ? (
            <Typography>Loading accommodations...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Slider {...settings}>
              {accommodations.map((accommodation, index) => (
                <Box key={index} p={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={accommodation.image}
                      alt={accommodation.name}
                    />
                    <CardContent>
                      <Typography variant="h8">{accommodation.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <FaStar color="#FFD700" size={15} /> {"   "}
                        {accommodation.rating}
                        <br />
                        {`R${accommodation.price}/night`} <br />
                        click to book accomodation
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        href={accommodation.link}
                        target="_blank"
                        fullWidth
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          )}
        </CardContent>
      </Card>

      <br />
      <Card mt={2}>
        <CardContent>
          <Typography sx={{ mt: 1 }} variant="outlined" color="secondary">
            Flight options
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ItineraryDisplay;
