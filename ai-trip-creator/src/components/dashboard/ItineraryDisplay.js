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
import {
  FaFilter,
  FaSearch,
  FaStar,
  FaHeart,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";
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
const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";

const convertPriceToZar = (price, fromCurrency) => {
  if (fromCurrency === "EUR") {
    const exchangeRate = 19.21; // Hardcoded exchange rate from EUR to ZAR
    return price * exchangeRate;
  } else {
    console.warn(`Conversion from ${fromCurrency} to ZAR is not supported.`);
    return null;
  }
};

const getFlightOffers = async (
  originLocation,
  destinationLocation,
  departureDate,
  adults,
  maxOffers,
) => {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "client_credentials",
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(
        `Token request failed: ${tokenResponse.statusText}`,
        errorText,
      );
      throw new Error(`Token request failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const searchUrl = new URL(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
    );
    const params = {
      originLocationCode: originLocation,
      destinationLocationCode: destinationLocation,
      departureDate: departureDate,
      adults: adults.toString(),
      max: maxOffers.toString(),
    };

    Object.keys(params).forEach((key) =>
      searchUrl.searchParams.append(key, params[key]),
    );
    console.log(`Request URL: ${searchUrl}`);

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error(
        `Search request failed: ${searchResponse.statusText}`,
        errorText,
      );
      throw new Error(`Search request failed: ${searchResponse.statusText}`);
    }

    const flightData = await searchResponse.json();
    console.log("Flight data:", flightData); // Debugging line

    for (const flight of flightData.data) {
      const originalPrice = parseFloat(flight.price.total);
      const fromCurrency = flight.price.currency;
      const priceInZar = await convertPriceToZar(originalPrice, fromCurrency);
      flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
      console.log(`Price in ZAR for flight: ${flight.priceInZar}`); // Debugging line
    }

    return flightData.data;
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return null;
  }
};
function ItineraryDisplay({ itinerary }) {
  const [globalAIText, setGlobalAIText] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    // Directly set the AI-generated itinerary from the passed itinerary prop
    if (itinerary.itineraryText) {
      setGlobalAIText(itinerary.itineraryText);
    }
    const destinationParam = itinerary.destination;
    handleSearch(destinationParam.toLowerCase().replace(/\s+/g, ""));
    const fetchData = async () => {
      try {
        const date = new Date().toISOString().split("T")[0];
        const loc = itinerary.currentLocation.toLowerCase();
        const des = itinerary.destination.toLowerCase();
        let originLocation;
        if (loc === "johannesburg") {
          originLocation = "JNB";
        } else if (loc === "pretoria" && des !== "johannesburg") {
          originLocation = "JNB";
        } else if (loc === "durban") {
          originLocation = "DUR";
        } else if (loc === "cape town") {
          originLocation = "CPT";
        } else if (loc === "gqeberha") {
          originLocation = "PLZ";
        } else {
          console.error("Unknown location: " + loc);
        }

        let destinationLocation;
        if (des === "johannesburg") {
          destinationLocation = "JNB";
        } else if (des === "pretoria" && loc !== "johannesburg") {
          destinationLocation = "JNB";
        } else if (des === "durban") {
          destinationLocation = "DUR";
        } else if (des === "cape town") {
          destinationLocation = "CPT";
        } else if (des === "gqeberha") {
          destinationLocation = "PLZ";
        } else {
          console.error("Unknown location: " + loc);
        }

        const flightOffers = await getFlightOffers(
          //JNB,DUR,CPT,PLZ,
          originLocation,
          destinationLocation,
          date,
          1,
          10,
        );
        if (flightOffers) {
          setFlights(flightOffers);
        } else {
          console.log("No flight offers available.");
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    fetchData();
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
                        {`from R${accommodation.price}/night`} <br />
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
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Flight Options
          </Typography>

          {flights.length === 0 ? (
            <Typography color="textSecondary">
              No flight offers available.
            </Typography>
          ) : (
            <Grid container spacing={2} mt={2}>
              {flights.map((flight, index) => {
                const { segments } = flight.itineraries[0];
                const firstSegment = segments[0];
                const lastSegment = segments[segments.length - 1];

                const departureTime = firstSegment.departure.at.split("T")[1];
                const arrivalTime = lastSegment.arrival.at.split("T")[1];
                const carrierCode = firstSegment.carrierCode;
                const totalPrice = flight.price.total;
                const totalPriceInZar = flight.priceInZar;

                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {firstSegment.departure.iataCode} <FaPlaneDeparture />
                          {"  ---------------------------   "}
                          <FaPlaneArrival />
                          {lastSegment.arrival.iataCode}
                          <br />
                          <strong>Departure:</strong> {departureTime} |{" "}
                          <strong>Arrival:</strong> {arrivalTime}
                          <br />
                          Live Price:ZAR {totalPriceInZar}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ItineraryDisplay;
