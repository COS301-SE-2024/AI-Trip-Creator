import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  MenuItem,
  Grid,
  Alert,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Slider,
} from "@mui/material";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaDollarSign,
  FaHotel,
  FaTasks,
  FaClock,
} from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5"; // For airline icon
import { FcClock } from "react-icons/fc";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getFirestore,
  query as firestoreQuery,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

import OpenAI from "openai";
import { createItinerary, getItinerary, updateItinerary } from "./dashboard";
// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

// Amadeus API details and helper functions
const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";
const convertPriceToZar = (price, fromCurrency) =>
  fromCurrency === "EUR" ? price * 19.21 : null;

const getFlightOffers = async (
  origin,
  destination,
  departureDate,
  adults,
  maxOffers,
) => {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        grant_type: "client_credentials",
      }),
    });
    const { access_token } = await tokenResponse.json();
    const searchUrl = new URL(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
    );
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults: adults.toString(),
      max: maxOffers.toString(),
    };
    Object.keys(params).forEach((key) =>
      searchUrl.searchParams.append(key, params[key]),
    );

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const flightData = await searchResponse.json();

    flightData.data.forEach((flight) => {
      flight.priceInZar =
        convertPriceToZar(
          parseFloat(flight.price.total),
          flight.price.currency,
        )?.toFixed(2) || "N/A";
    });
    console.log("Flight Data: ", flightData.data);
    return flightData.data;
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return null;
  }
};

function ItineraryForm() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Flights", "Accommodations", "Activities"];

  // Flights state
  const [itineraryName, setItineraryName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnFlight, setReturnFlight] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [showFlightSearch, setShowFlightSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [arrivalPlaces, setArrivalplaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showActivities, setShowActivities] = useState({});
  const [showAccommodations, setShowAccommodations] = useState({});
  const [filterCriteria, setFilterCriteria] = useState({});
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [addMoreFlights, setAddMoreFlights] = useState(false); //  To handle adding more flights
  const [tripDays, setTripDays] = useState(1);
  const [budgetRange, setBudgetRange] = useState([1000, 10000]);
  const [Locations, setLocations] = useState([]);
  const [Lengths, setLengths] = useState([]);

  //fetch userid
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  // Predefined South African airport codes
  const airportOptions = [
    { label: "Durban (DUR)", code: "DUR" },
    { label: "Cape Town (CPT)", code: "CPT" },
    { label: "Johannesburg (JNB)", code: "JNB" },
    { label: "Port Elizabeth (PLZ)", code: "PLZ" },
    { label: "East London (ELS)", code: "ELS" },
    { label: "Lanseria (HLA)", code: "HLA" },
  ];

  const handleSearchFlights = async () => {
    if (startLocation && endLocation && departureDate) {
      if (startLocation === endLocation) {
        setErrorMessage("Origin and destination cannot be the same.");
        return;
      }

      setErrorMessage("");
      setFlights([]);

      const departureFlights = await getFlightOffers(
        startLocation,
        endLocation,
        departureDate,
        1,
        12,
      );
      setFlights(departureFlights);

      if (returnFlight && returnDate) {
        const returnFlightResults = await getFlightOffers(
          endLocation,
          startLocation,
          returnDate,
          1,
          12,
        );
        setReturnFlights(returnFlightResults);
      }
    }
  };

  const handleFlightToggle = (flight) => {
    // setSelectedFlights((prevSelected) =>
    //   prevSelected.some((f) => f.id === flight.id) ? prevSelected.filter((f) => f.id !== flight.id) : [...prevSelected, flight]
    // );
    setSelectedFlights((prevSelected) => {
      const isSelected = prevSelected.some((f) => f.id === flight.id);
      return isSelected
        ? prevSelected.filter((f) => f.id !== flight.id) // Remove if already selected
        : [...prevSelected, flight]; // Add if not selected
    });
  };

  const addEndLocation = () => {
    if (startLocation !== "" && !Locations.includes(startLocation)) {
      setLocations((prevStartLocations) => [
        ...prevStartLocations,
        startLocation,
      ]);
    }
    if (endLocation !== "" && !Locations.includes(endLocation)) {
      setLocations((prevEndLocations) => [...prevEndLocations, endLocation]);
    }

    if (tripDays !== "" && !Lengths.includes(tripDays)) {
      setLengths((prevEndLocations) => [...prevEndLocations, tripDays]);
    }
    //console.log("End Location:", endLocation);
  };

  // Use useEffect to log the updated locations whenever it changes
  useEffect(() => {
    console.log("Updated Locations:", Locations);
  }, [Locations]);

  const handleDone = () => {
    addEndLocation();
    console.log(endLocation);
    console.log(Locations);
    setShowFlightSearch(false);
    setAddMoreFlights(true); // Enable adding more flights
    setStartLocation("");
    setEndLocation("");
    setDepartureDate("");
    setReturnFlight(false);
    setReturnDate("");
    setFlights([]);
    setReturnFlights([]);
  };

  const getAirlineName = (carrierCode) => {
    const airlineMap = {
      SA: "South African Airways",
      MN: "Kulula.com",
      "4Z": "Airlink",
      FA: "FlySafair",
      BA: "British Airways (operated by Comair)",
      // Add more airline mappings
    };
    return airlineMap[carrierCode] || carrierCode;
  };

  const getAccommodations = async (endLocations) => {
    try {
      if (!userId) throw new Error("User is not authenticated");

      const db = getFirestore();
      const accommodationsByLocation = {};

      // Fetch accommodations for each end location
      await Promise.all(
        Locations.map(async (location) => {
          const accommodationsRef = collection(db, "Accommodation");
          const q = firestoreQuery(
            accommodationsRef,
            where(
              "city",
              "==",
              getAirportName(location).toLowerCase().replace(/\s+/g, ""),
            ),
          );

          const querySnapshot = await getDocs(q);
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data());
          });

          // Remove duplicate accommodations
          const uniqueResults = results.filter(
            (accommodation, index, self) =>
              index === self.findIndex((a) => a.name === accommodation.name),
          );

          // Store results by location
          accommodationsByLocation[location] = uniqueResults;
        }),
      );

      setAccommodations(accommodationsByLocation);
      return accommodationsByLocation;
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      // setErrorMessage("Failed to fetch accommodations. Please try again.");
    }
  };

  const getActivities = async (endLocations) => {
    try {
      if (!userId) throw new Error("User is not authenticated");

      const db = getFirestore();
      const accommodationsByLocation = {};

      // Fetch activities for each end location
      await Promise.all(
        Locations.map(async (location) => {
          const accommodationsRef = collection(db, "LikedActivities");
          const q = firestoreQuery(
            accommodationsRef,
            where(
              "city",
              "==",
              getAirportName(location).toLowerCase().replace(/\s+/g, ""),
            ),
          );

          const querySnapshot = await getDocs(q);
          let results = [];
          querySnapshot.forEach((doc) => {
            results.push(doc.data());
          });

          // Remove duplicate accommodations
          const uniqueResults = results.filter(
            (accommodation, index, self) =>
              index === self.findIndex((a) => a.name === accommodation.name),
          );

          // Store results by location
          accommodationsByLocation[location] = uniqueResults;
        }),
      );

      setActivities(accommodationsByLocation);
      return accommodationsByLocation;
    } catch (error) {
      console.error("Error fetching activities:", error);
      //  setErrorMessage("Failed to fetch activities. Please try again.");
    } finally {
      //setLoading(false);
    }
  };

  const handleAccommodationToggle = (accommodation) => {
    //console.log("Toggling accommodation:", accommodation);
    setSelectedAccommodations((prevSelected) => {
      const isSelected = prevSelected.some(
        (acc) => acc.name === accommodation.name,
      );
      return isSelected
        ? prevSelected.filter((acc) => acc.name !== accommodation.name) // Remove if already selected
        : [...prevSelected, accommodation]; // Add if not selected
    });
  };

  const handleActivityToggle = (activity) => {
    setSelectedActivities((prevSelected) => {
      const isSelected = prevSelected.some((a) => a.name === activity.name);
      return isSelected
        ? prevSelected.filter((a) => a.name !== activity.name) // Remove if already selected
        : [...prevSelected, activity]; // Add if not selected
    });
  };

  const getAirportName = (code) => {
    const airport = airportOptions.find((airport) => airport.code === code);
    if (code === "HLA") {
      return "Pretoria";
    }
    if (code === "DUR") {
      return "Durban";
    }
    if (code === "CPT") {
      return "Capetown";
    }
    if (code === "PLZ") {
      return "Gqeberha";
    }
    if (code === "JNB") {
      return "Johannesburg";
    }

    if (code === "ELS") {
      return "Durban";
    }
    return airport ? airport.label : "Airport not found";
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Validate Flights step
      /*if (selectedFlights.lengt === 0) {
        setErrorMessage("Please select at least one flight.");
        return;
      }*/
      setErrorMessage("");
      const arrivalPlaces = selectedFlights.map(
        (flight) => flight.itineraries[0].segments[0].arrival.iataCode,
      );
      console.log("wool", Locations);
      console.log("verine", arrivalPlaces);
      setArrivalplaces(Locations);
      const fetchedAccommodations = await getAccommodations(arrivalPlaces);
      setAccommodations(fetchedAccommodations);
      const fetchedActivities = await getActivities(arrivalPlaces);
      setActivities(fetchedActivities);
    } else if (activeStep === 1) {
      // Fetch Accommodations
      setLoading(true);
      const fetchedAccommodations = await getAccommodations(endLocation);
      //setAccommodations(fetchedAccommodations);
      setLoading(false);
    } else if (activeStep === 2) {
      // Fetch Activities
      setLoading(true);
      const fetchedActivities = await getActivities(endLocation);
      //setActivities(fetchedActivities);
      setLoading(false);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    try {
      setLoading(true);

      // Generate day-by-day data for the itinerary
      const days = Locations.map((location, index) => {
        const dayLength = Lengths[index] || 1;
        const activities = selectedActivities.filter(
          (activity) =>
            activity.day >= index + 1 && activity.day < index + 1 + dayLength,
        );

        return {
          dayNumber: index + 1,
          location,
          length: dayLength,
          accommodation: selectedAccommodations[index]
            ? [selectedAccommodations[index]]
            : [],
          activities,
        };
      });

      // Create a prompt for AI generation based on provided data
      const itineraryPrompt = `
        The user has selected the following details:
        - Itinerary Name: ${itineraryName}
        - Locations: ${Locations.join(", ")}
        - Lengths: ${Lengths.join(", ")}
        - Accommodations: ${selectedAccommodations
          .map((a) => a.name)
          .join(", ")}
        - Activities: ${selectedActivities.map((act) => act.name).join(", ")}
        Based on these details, create a detailed itinerary.
      `;

      // Generate itinerary with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful travel assistant." },
          { role: "user", content: itineraryPrompt },
        ],
        max_tokens: 1000,
      });

      const aiGeneratedItinerary = response.choices[0].message.content;

      // Save the itinerary data using createItinerary from Dashboard
      // await createItinerary(itineraryName, Locations[0], 0, days.length, days);

      setAiResponse(aiGeneratedItinerary);
      setLoading(false);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setErrorMessage("Failed to generate itinerary. Please try again.");
      setLoading(false);
    }
  };

  //filtering for accommodations
  // Toggle the visibility of accommodations for a specific location
  const handleToggle = (location) => {
    setShowAccommodations((prevState) => ({
      ...prevState,
      [location]: !prevState[location],
    }));
  };

  // Update the filter criteria
  const handleFilterChange = (location, criteria) => {
    setFilterCriteria((prevState) => ({
      ...prevState,
      [location]: criteria,
    }));
  };

  // Function to filter accommodations based on the selected criteria
  const applyFilters = (accommodations, criteria) => {
    if (!criteria) return accommodations;
    let filteredAccommodations = [...accommodations];

    // Apply sorting based on the criteria
    if (criteria === "price") {
      filteredAccommodations.sort((a, b) => a.price - b.price);
    } else if (criteria === "rating") {
      filteredAccommodations.sort((a, b) => b.rating - a.rating);
    } else if (criteria === "name") {
      filteredAccommodations.sort((a, b) => a.name - b.name);
    }

    return filteredAccommodations;
  };

  //filtering for activities
  // Toggle the visibility of accommodations for a specific location
  const handleToggleactivity = (location) => {
    setShowActivities((prevState) => ({
      ...prevState,
      [location]: !prevState[location],
    }));
  };

  // Update the filter criteria
  const handleFilterChangeactivities = (location, criteria) => {
    setFilterCriteria((prevState) => ({
      ...prevState,
      [location]: criteria,
    }));
  };

  // Function to filter accommodations based on the selected criteria
  const applyFiltersactivities = (accommodations, criteria) => {
    if (!criteria) return accommodations;
    let filteredAccommodations = [...accommodations];

    // Apply sorting based on the criteria
    if (criteria === "sub_categories") {
      filteredAccommodations.sort(
        (a, b) => a.sub_categories[0] - b.sub_categories[0],
      );
    } else if (criteria === "category") {
      filteredAccommodations.sort((a, b) => b.category - a.category);
    } else if (criteria === "name") {
      filteredAccommodations.sort((a, b) => a.name - b.name);
    }

    return filteredAccommodations;
  };

  return (
    <Box alignItems="center" alignContent="center" marginLeft="280px">
      <Box margin="20px">
        <h1 style={{ marginTop: "30px" }}>Itinerary Form</h1>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step Content */}
        {activeStep === 0 && (
          <Box alignItems="center" alignContent="center">
            <Box margin="20px">
              <h2>Step 1: Flights</h2>
              <Box
                p={5}
                border={1}
                borderColor="grey.300"
                borderRadius="8px"
                margin="20px"
              >
                <TextField
                  label="Itinerary Name"
                  value={itineraryName}
                  onChange={(e) => setItineraryName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  select
                  label="Start Location"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {airportOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="End Location"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {airportOptions.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Number of days for trip */}
                <TextField
                  label="Number of Days"
                  type="number"
                  value={tripDays}
                  onChange={(e) => setTripDays(e.target.value)}
                  fullWidth
                  margin="normal"
                  InputProps={{ inputProps: { min: 1 } }}
                />

                {/* Budget Range */}
                <Typography gutterBottom>Budget Range (ZAR)</Typography>
                <Slider
                  value={budgetRange}
                  onChange={(e, newValue) => setBudgetRange(newValue)}
                  valueLabelDisplay="auto"
                  min={1000}
                  max={10000}
                  step={500}
                  marks={[
                    { value: 1000, label: "R1000" },
                    { value: 5000, label: "R5000" },
                    { value: 10000, label: "R10000" },
                  ]}
                />
                <Button
                  variant="outlined"
                  onClick={() => setShowFlightSearch(true)}
                  fullWidth
                >
                  + Add a Flight
                </Button>

                {showFlightSearch && (
                  <>
                    <TextField
                      label="Departure Date"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={returnFlight}
                          onChange={(e) => setReturnFlight(e.target.checked)}
                        />
                      }
                      label="Return Flight"
                    />
                    {returnFlight && (
                      <TextField
                        label="Return Date"
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                    <Button
                      onClick={handleSearchFlights}
                      variant="contained"
                      color="primary"
                    >
                      Search Flights
                    </Button>

                    {errorMessage && (
                      <Alert severity="error">{errorMessage}</Alert>
                    )}

                    <Grid
                      container
                      spacing={2}
                      sx={{ marginTop: "1rem", marginBottom: "15px" }}
                    >
                      <h2>Departure Flights</h2>
                      <Grid
                        container
                        spacing={2}
                        sx={{ marginTop: "1rem", marginBottom: "15px" }}
                      >
                        {flights.length > 0 ? (
                          flights.map((flight, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                              <Card
                                variant={
                                  selectedFlights.some(
                                    (f) => f.name === flight.name,
                                  )
                                    ? "outlined"
                                    : "elevation"
                                }
                                sx={{
                                  padding: "8px",
                                  borderColor: selectedFlights.some(
                                    (f) => f.id === flight.id,
                                  )
                                    ? "primary.main"
                                    : "grey.300",
                                }}
                                onClick={() => handleFlightToggle(flight)}
                              >
                                <CardContent>
                                  <Typography
                                    align="center"
                                    variant="h6"
                                    sx={{ fontWeight: "bold", mb: 1 }}
                                  >
                                    <FaPlaneDeparture />{" "}
                                    {
                                      flight.itineraries[0].segments[0]
                                        .departure.iataCode
                                    }{" "}
                                    →{" "}
                                    {
                                      flight.itineraries[0].segments[0].arrival
                                        .iataCode
                                    }
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mb: -3,
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    <FaClock
                                      style={{
                                        color: "#ff9800",
                                        marginRight: 4,
                                      }}
                                    />
                                    Departure:{" "}
                                    {
                                      flight.itineraries[0].segments[0].departure.at.split(
                                        "T",
                                      )[1]
                                    }
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mb: -3,
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    <FaPlaneArrival
                                      style={{
                                        color: "#2196f3",
                                        marginRight: 4,
                                      }}
                                    />
                                    Arrival:{" "}
                                    {
                                      flight.itineraries[0].segments[0].arrival.at.split(
                                        "T",
                                      )[1]
                                    }
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mb: -3,
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    <FcClock
                                      style={{
                                        color: "#1976d2",
                                        marginRight: 4,
                                      }}
                                    />
                                    Duration: {flight.itineraries[0].duration}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mb: -3,
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    <IoAirplaneSharp
                                      style={{
                                        color: "#4caf50",
                                        marginRight: 4,
                                      }}
                                    />
                                    Airline:{" "}
                                    {getAirlineName(
                                      flight.itineraries[0].segments[0]
                                        .carrierCode,
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mb: -1,
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    <FaDollarSign
                                      style={{
                                        color: "#f44336",
                                        marginRight: 4,
                                      }}
                                    />
                                    Price: {flight.priceInZar} ZAR
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      marginTop: "10px",
                                      backgroundColor: selectedFlights.some(
                                        (f) => f.id === flight.id,
                                      )
                                        ? "#7e57c2"
                                        : "#2196f3",
                                    }}
                                  >
                                    {selectedFlights.some(
                                      (f) => f.id === flight.id,
                                    )
                                      ? "Remove"
                                      : "Select"}
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))
                        ) : (
                          <Typography>No flights found.</Typography>
                        )}
                      </Grid>

                      {/* Return flights section */}
                      {returnFlight && returnFlights.length > 0 && (
                        <>
                          <h2>Return Flights</h2>
                          <Grid container spacing={2}>
                            {returnFlights.map((flight, index) => (
                              <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card
                                  variant={
                                    selectedFlights.some(
                                      (f) => f.name === flight.name,
                                    )
                                      ? "outlined"
                                      : "elevation"
                                  }
                                  sx={{
                                    padding: "8px",
                                    borderColor: selectedFlights.some(
                                      (f) => f.id === flight.id,
                                    )
                                      ? "primary.main"
                                      : "grey.300",
                                  }}
                                  onClick={() => handleFlightToggle(flight)}
                                >
                                  <CardContent>
                                    <Typography
                                      align="center"
                                      variant="h6"
                                      sx={{ fontWeight: "bold", mb: 1 }}
                                    >
                                      <FaPlaneDeparture />{" "}
                                      {
                                        flight.itineraries[0].segments[0]
                                          .departure.iataCode
                                      }{" "}
                                      →{" "}
                                      {
                                        flight.itineraries[0].segments[0]
                                          .arrival.iataCode
                                      }
                                    </Typography>

                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: -3,
                                        fontSize: "15.5px",
                                      }}
                                    >
                                      <FaClock
                                        style={{
                                          color: "#ff9800",
                                          marginRight: 4,
                                        }}
                                      />
                                      Departure:{" "}
                                      {
                                        flight.itineraries[0].segments[0].departure.at.split(
                                          "T",
                                        )[1]
                                      }
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: -3,
                                        fontSize: "15.5px",
                                      }}
                                    >
                                      <FaPlaneArrival
                                        style={{
                                          color: "#2196f3",
                                          marginRight: 4,
                                        }}
                                      />
                                      Arrival:{" "}
                                      {
                                        flight.itineraries[0].segments[0].arrival.at.split(
                                          "T",
                                        )[1]
                                      }
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: -3,
                                        fontSize: "15.5px",
                                      }}
                                    >
                                      <FcClock
                                        style={{
                                          color: "#1976d2",
                                          marginRight: 4,
                                        }}
                                      />
                                      Duration: {flight.itineraries[0].duration}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: -3,
                                        fontSize: "15.5px",
                                      }}
                                    >
                                      <IoAirplaneSharp
                                        style={{
                                          color: "#4caf50",
                                          marginRight: 4,
                                        }}
                                      />
                                      Airline:{" "}
                                      {getAirlineName(
                                        flight.itineraries[0].segments[0]
                                          .carrierCode,
                                      )}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: -1,
                                        fontSize: "15.5px",
                                      }}
                                    >
                                      <FaDollarSign
                                        style={{
                                          color: "#f44336",
                                          marginRight: 4,
                                        }}
                                      />
                                      Price: {flight.priceInZar} ZAR
                                    </Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      sx={{
                                        marginTop: "10px",
                                        backgroundColor: selectedFlights.some(
                                          (f) => f.id === flight.id,
                                        )
                                          ? "#7e57c2"
                                          : "#2196f3",
                                      }}
                                    >
                                      {selectedFlights.some(
                                        (f) => f.id === flight.id,
                                      )
                                        ? "Remove"
                                        : "Select"}
                                    </Button>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </>
                      )}
                    </Grid>
                    {/*<Button
                    onClick={handleDone}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "20px" }}
                  >
                    Done
                  </Button>*/}
                  </>
                )}

                {/* Display selected flights */}
                <Box>
                  <h2>Selected Flights</h2>
                  {selectedFlights.length > 0 ? (
                    <Grid container spacing={2}>
                      {selectedFlights.map((flight, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Card sx={{ padding: "8px" }}>
                            <CardContent>
                              <Typography
                                align="center"
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1 }}
                              >
                                <FaPlaneDeparture />{" "}
                                {
                                  flight.itineraries[0].segments[0].departure
                                    .iataCode
                                }{" "}
                                →{" "}
                                {
                                  flight.itineraries[0].segments[0].arrival
                                    .iataCode
                                }
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: -2,
                                }}
                              >
                                <FaClock
                                  style={{ color: "#ff9800", marginRight: 4 }}
                                />
                                Departure:{" "}
                                {
                                  flight.itineraries[0].segments[0].departure.at.split(
                                    "T",
                                  )[1]
                                }
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: -2,
                                }}
                              >
                                <IoAirplaneSharp
                                  style={{ color: "#1976d2", marginRight: 4 }}
                                />
                                Duration: {flight.itineraries[0].duration}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: -2,
                                }}
                              >
                                <FaDollarSign
                                  style={{ color: "#4caf50", marginRight: 4 }}
                                />
                                Price: {flight.price.total}{" "}
                                {flight.price.currency} (
                                {flight.priceInZar
                                  ? `ZAR ${flight.priceInZar}`
                                  : "Conversion unavailable"}
                                )
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                Airline:{" "}
                                {getAirlineName(
                                  flight.itineraries[0].segments[0].carrierCode,
                                )}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography>No flights selected yet.</Typography>
                  )}
                </Box>

                {addMoreFlights && (
                  <Button
                    onClick={() => setShowFlightSearch(true)}
                    variant="outlined"
                    color="primary"
                    sx={{ marginTop: "20px" }}
                  >
                    + Add More Flights
                  </Button>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",

                gap: "100px",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleDone}
                variant="contained"
                color="primary"
                size="small"
                sx={{ padding: "6px 12px", width: "150px", height: "50px" }} // Adjust width as needed
              >
                Add to Itinerary
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                size="small"
                sx={{ padding: "6px 12px", width: "150px", height: "50px" }} // Adjust width as needed
              >
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <h2>Step 2: Accommodations</h2>

            {loading ? (
              <CircularProgress sx={{ marginTop: "20px" }} />
            ) : (
              <Box
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius="8px"
                sx={{ marginTop: "20px" }}
              >
                {Object.entries(accommodations).map(
                  ([location, locationAccommodations]) => (
                    <Box
                      p={2}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="8px"
                      key={location}
                      sx={{ marginBottom: "30px" }}
                    >
                      <h2>
                        Accommodations in {getAirportName(location)}
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleToggle(location)}
                          sx={{ marginLeft: "10px" }}
                        >
                          {showAccommodations[location] ? "Hide" : "Show"}
                        </Button>
                      </h2>

                      {showAccommodations[location] && (
                        <>
                          {/* Filter buttons */}
                          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleFilterChange(location, "price")
                              }
                              sx={{ marginRight: "10px" }}
                            >
                              Sort by Price
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleFilterChange(location, "rating")
                              }
                              sx={{ marginRight: "10px" }}
                            >
                              Sort by Rating
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleFilterChange(location, "name")
                              }
                            >
                              Sort by Name
                            </Button>
                          </Box>
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginTop: "10px" }}
                          >
                            {applyFilters(
                              locationAccommodations,
                              filterCriteria[location],
                            ).length > 0 ? (
                              applyFilters(
                                locationAccommodations,
                                filterCriteria[location],
                              ).map((acc) => (
                                <Grid item xs={12} sm={6} md={4} key={acc.name}>
                                  <Card
                                    variant={
                                      selectedAccommodations.some(
                                        (a) => a.name === acc.name,
                                      )
                                        ? "outlined"
                                        : "elevation"
                                    }
                                    sx={{
                                      cursor: "pointer",
                                      borderColor: selectedAccommodations.some(
                                        (a) => a.name === acc.name,
                                      )
                                        ? "primary.main"
                                        : "grey.300",
                                    }}
                                    onClick={() =>
                                      handleAccommodationToggle(acc)
                                    }
                                  >
                                    <CardMedia
                                      component="img"
                                      height="100"
                                      image={acc.image}
                                      alt={acc.name}
                                    />
                                    <CardContent>
                                      <Typography variant="h8">
                                        <b>{acc.name}</b>
                                        <br />R{acc.price} per night
                                        <br />
                                        Rating: {acc.rating} ⭐ -
                                        <a href="{acc.link}">More info</a>
                                        <br />
                                      </Typography>

                                      <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                          marginTop: "10px",
                                          backgroundColor:
                                            selectedAccommodations.some(
                                              (a) => a.name === acc.name,
                                            )
                                              ? "#7e57c2"
                                              : "#2196f3",
                                        }}
                                      >
                                        {selectedAccommodations.some(
                                          (a) => a.name === acc.name,
                                        )
                                          ? "Remove"
                                          : "Select"}
                                      </Button>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))
                            ) : (
                              <Typography>No accommodations found.</Typography>
                            )}
                          </Grid>
                          <hr style={{ margin: "20px 0" }} /> {/* Separator */}
                        </>
                      )}
                    </Box>
                  ),
                )}
              </Box>
            )}

            {errorMessage && (
              <Alert severity="error" sx={{ marginTop: "10px" }}>
                {errorMessage}
              </Alert>
            )}

            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <h2>Step 3: Activities</h2>

            {loading ? (
              <CircularProgress sx={{ marginTop: "20px" }} />
            ) : (
              <Box
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius="8px"
                sx={{ marginTop: "20px" }}
              >
                {Object.entries(activities).map(
                  ([location, locationActivities]) => (
                    <Box
                      p={2}
                      border={1}
                      borderColor="grey.300"
                      borderRadius="8px"
                      key={location}
                      sx={{ marginBottom: "30px" }}
                    >
                      <h2>
                        Activities in {getAirportName(location)}
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => handleToggleactivity(location)}
                          sx={{ marginLeft: "10px" }}
                        >
                          {showActivities[location] ? "Hide" : "Show"}
                        </Button>
                      </h2>

                      {showActivities[location] && (
                        <>
                          {/* Filter buttons */}
                          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleFilterChangeactivities(
                                  location,
                                  "sub_categories",
                                )
                              }
                              sx={{ marginRight: "10px" }}
                            >
                              Sort activity name
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleFilterChangeactivities(
                                  location,
                                  "category",
                                )
                              }
                              sx={{ marginRight: "10px" }}
                            >
                              Sort by Category
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                handleFilterChangeactivities(location, "name")
                              }
                            >
                              Sort by Name
                            </Button>
                          </Box>
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginTop: "10px" }}
                          >
                            {applyFiltersactivities(
                              locationActivities,
                              filterCriteria[location],
                            ).length > 0 ? (
                              applyFiltersactivities(
                                locationActivities,
                                filterCriteria[location],
                              ).map((acc) => (
                                <Grid item xs={12} sm={6} md={4} key={acc.name}>
                                  <Card
                                    variant={
                                      selectedActivities.some(
                                        (a) => a.name === acc.name,
                                      )
                                        ? "outlined"
                                        : "elevation"
                                    }
                                    sx={{
                                      cursor: "pointer",
                                      borderColor: selectedActivities.some(
                                        (a) => a.name === acc.name,
                                      )
                                        ? "primary.main"
                                        : "grey.300",
                                    }}
                                    onClick={() => handleActivityToggle(acc)}
                                  >
                                    <CardMedia
                                      component="img"
                                      height="100"
                                      image={acc.image}
                                      alt={acc.name}
                                    />
                                    <CardContent>
                                      <Typography variant="h8">
                                        <b>{acc.name}</b>
                                        <br />
                                        Category: {acc.category}
                                        <br />
                                        {acc.sub_categories[0]} -
                                        <a href="{acc.info_url}">More info</a>
                                        <br />
                                      </Typography>

                                      <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                          marginTop: "10px",
                                          backgroundColor:
                                            selectedActivities.some(
                                              (a) => a.name === acc.name,
                                            )
                                              ? "#7e57c2"
                                              : "#2196f3",
                                        }}
                                      >
                                        {selectedActivities.some(
                                          (a) => a.name === acc.name,
                                        )
                                          ? "Remove"
                                          : "Select"}
                                      </Button>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))
                            ) : (
                              <Typography>No activities found.</Typography>
                            )}
                          </Grid>
                          <hr style={{ margin: "20px 0" }} /> {/* Separator */}
                        </>
                      )}
                    </Box>
                  ),
                )}
              </Box>
            )}

            {errorMessage && (
              <Alert severity="error" sx={{ marginTop: "10px" }}>
                {errorMessage}
              </Alert>
            )}

            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 3 && (
          <Box>
            <h2>Review and Submit</h2>

            <Box
              p={2}
              border={1}
              borderColor="grey.300"
              borderRadius="8px"
              sx={{ marginTop: "10px" }}
            >
              <Typography variant="h6">Itinerary Name:</Typography>
              <Typography>{itineraryName}</Typography>
            </Box>

            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="h6">Flights:</Typography>
              {selectedFlights.map((flight, index) => (
                <Typography key={index}>
                  {flight.itineraries[0].segments[0].departure.iataCode} to{" "}
                  {flight.itineraries[0].segments[0].arrival.iataCode}
                </Typography>
              ))}
            </Box>

            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="h6">Accommodations:</Typography>
              {selectedAccommodations.map((acc, index) => (
                <Typography key={index}>{acc.name}</Typography>
              ))}
            </Box>

            <Box sx={{ marginTop: "10px" }}>
              <Typography variant="h6">Activities:</Typography>
              {selectedActivities.map((act, index) => (
                <Typography key={index}>{act.name}</Typography>
              ))}
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ marginTop: "10px" }}>
                {errorMessage}
              </Alert>
            )}

            {loading && <CircularProgress sx={{ marginTop: "20px" }} />}

            {aiResponse && (
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6">Generated Itinerary:</Typography>
                <Typography>{aiResponse}</Typography>
              </Box>
            )}

            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(activeStep - 1)}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleFinish}
                disabled={loading}
              >
                Finish
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ItineraryForm;
