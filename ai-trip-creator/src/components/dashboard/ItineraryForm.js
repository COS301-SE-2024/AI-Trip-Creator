import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert, Chip } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase-config";
import { collection, getFirestore, query as firestoreQuery, where, getDocs, setDoc, doc } from "firebase/firestore";
import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

// Amadeus API details and helper functions
const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";

const convertPriceToZar = (price, fromCurrency) => {
  const exchangeRate = 19.21; // EUR to ZAR exchange rate example
  return fromCurrency === "EUR" ? price * exchangeRate : null;
};

const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "client_credentials",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: adults.toString(),
      max: maxOffers.toString(),
    };
    Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const flightData = await searchResponse.json();
    for (const flight of flightData.data) {
      const originalPrice = parseFloat(flight.price.total);
      const priceInZar = convertPriceToZar(originalPrice, flight.price.currency);
      flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
    }

    return flightData.data;
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return null;
  }
};

function ItineraryForm() {
  const [step, setStep] = useState(1);
  const [itineraryName, setItineraryName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]); // Array of flight objects
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [visibleActivities, setVisibleActivities] = useState(12);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [endLocationFull, setEndLocationFull] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("a-z"); // Sorting filter initialized to "A-Z"

  // Fetch user ID (UID)
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
    { label: "Durban (DUR)", code: "DUR", city: "Durban" },
    { label: "Cape Town (CPT)", code: "CPT", city: "Cape Town" },
    { label: "Johannesburg (JNB)", code: "JNB", city: "Johannesburg" },
    { label: "Gqeberha (PLZ)", code: "PLZ", city: "Gqeberha" },
    { label: "East London (ELS)", code: "ELS", city: "East London" },
    { label: "Lanseria (HLA)", code: "HLA", city: "Johannesburg" }, // Note: Lanseria is in Johannesburg
  ];

  // const handleStartLocationChange = (e) => {
  //   setStartLocation(e.target.value);
  //   setFlights([]);  // Clear flights to trigger new search results
  // };

  // const handleEndLocationChange = (e) => {
  //   setEndLocation(e.target.value);
  //   setFlights([]);  // Clear flights to trigger new search results
  // };



  const handleSearchFlights = async () => {
    if (startLocation && endLocation && departureDate) {
      if (startLocation === endLocation) {
        setErrorMessage("Origin and destination cannot be the same.");
        return;
      }

      setErrorMessage("");

      // Clear the current flights to reset visual selections for the new search
      setFlights([]);

      const flightOffers = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
      if (flightOffers) {
        setFlights(flightOffers);  // Load new flight options
      } else {
        console.log("No flight offers available.");
      }
    }
  };

  const sortOptions = [
    { label: "A - Z", value: "a-z" },
    { label: "Z - A", value: "z-a" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" }
  ];


  // Separate fetching for activities and accommodations
  const fetchAccommodations = async (endLocations) => {
    if (endLocations.length === 0) {
      setAccommodations([]);
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore();
      const accommodationResults = [];

      for (const location of endLocations) {
        const accommodationsRef = collection(db, "Accommodation");
        const accommodationsQuery = firestoreQuery(accommodationsRef, where("city", "==", location.toLowerCase()));
        const accommodationsSnapshot = await getDocs(accommodationsQuery);
        accommodationsSnapshot.forEach((doc) => accommodationResults.push(doc.data()));
      }

      setAccommodations(accommodationResults);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      setError("Failed to fetch accommodations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step === 3 && endLocationFull) {
      fetchActivities(endLocationFull); // Fetch activities based on the full city name
    }
  }, [step, endLocationFull]);

  // const fetchActivities = async (endLocations) => {
  //   if (endLocations.length === 0) {
  //     setActivities([]);
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const db = getFirestore();
  //     const activityResults = [];

  //     for (const location of endLocations) {
  //       const activitiesRef = collection(db, "Activities");
  //       const activitiesQuery = firestoreQuery(activitiesRef, where("city", "==", location));
  //       const activitiesSnapshot = await getDocs(activitiesQuery);
  //       activitiesSnapshot.forEach((doc) => activityResults.push(doc.data()));
  //     }

  //     setActivities(activityResults);
  //   } catch (error) {
  //     console.error("Error fetching activities:", error);
  //     setError("Failed to fetch activities. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchActivities = async (cityName) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const activitiesRef = collection(db, "Activities");
      //const activitiesSnapshot = await getDocs(activitiesRef);
      const activitiesQuery = firestoreQuery(activitiesRef, where("city", "==", cityName));
      const activitiesSnapshot = await getDocs(activitiesQuery);
      const activityResults = [];
      activitiesSnapshot.forEach((doc) => activityResults.push(doc.data()));
      setActivities(activityResults);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Failed to fetch activities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFlightToggle = (flight) => {
    const firstSegment = flight.itineraries[0].segments[0];
    const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

    const flightObject = {
      id: flight.id,
      startLocation: firstSegment.departure.iataCode,
      endLocation: lastSegment.arrival.iataCode,
      departureTime: firstSegment.departure.at.split("T")[1],
      arrivalTime: lastSegment.arrival.at.split("T")[1],
      price: flight.price.total,
      currency: flight.price.currency,
      priceInZar: flight.priceInZar,
    };

    setSelectedFlights((prevSelected) => {
      const flightExists = prevSelected.some((f) => f.id === flightObject.id);

      // If the flight is already selected, remove it; otherwise, add it
      return flightExists
        ? prevSelected.filter((f) => f.id !== flightObject.id)
        : [...prevSelected, flightObject];
    });
  };


  // Handle accommodation selection
  const handleAccommodationSelection = (accommodationId) => {
    setSelectedAccommodations((prev) =>
      prev.includes(accommodationId) ? prev.filter((id) => id !== accommodationId) : [...prev, accommodationId]
    );
  };

  // Handle activity selection
  // const handleActivitySelection = (activityId) => {
  //   setSelectedActivities((prev) =>
  //     prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
  //   );
  // };

  ////////////////////////////////////////////////////////////
  // Added new function for choosing activities
  const handleActivitySelection = (activity) => {
    setSelectedActivities((prevSelected) => {
      if (prevSelected.some(a => a.name === activity.name)) {
        return prevSelected.filter(a => a.name !== activity.name);
      } else {
        return [...prevSelected, activity];
      }
    });
  };

  const isActivitySelected = (activityName) => {
    return selectedActivities.some(a => a.name === activityName);
  };
  /////////////////////////////////////////////////////////////////

  // Save the itinerary to Firebase
  const handleSubmit = async () => {
    const itineraryData = {
      itineraryName,
      startLocation,
      endLocation,
      flights: selectedFlights,
      accommodations: selectedAccommodations,
      activities: selectedActivities,
      userId,
    };

    try {
      await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);
      console.log("Itinerary saved to Firebase", itineraryData);
      alert("Itinerary saved successfully!");
    }
    catch (error) {
      console.error("Error saving itinerary:", error);
      alert("Error saving itinerary. Please try again.");
    }

    // await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);
    // console.log("Itinerary saved to Firebase", itineraryData);
  };

  const handleEndLocationChange = (e) => {
    const selectedAirport = airportOptions.find(option => option.code === e.target.value);
    setEndLocation(e.target.value);
    setEndLocationFull(selectedAirport.city);
  };

  // Handle moving between steps
  //const handleNextStep = () => setStep((prev) => prev + 1);
  // const handleNextStep = () => {
  //   if (step === 1) {
  //     // Fetch activities when moving to step 3
  //     fetchActivities(endLocationFull);
  //   }
  //   setStep((prev) => prev + 1);
  // };

  const handleNextStep = () => {
    setStep((prev) => prev + 1); // Move to the next step without fetching activities here
  };

  const filteredActivities = activities.filter((activity) =>
    selectedCategory ? activity.category === selectedCategory : true
  );

  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const endLocations = selectedFlights.map(flight => flight.endLocation);
  console.log(endLocations);

  const handleLoadMore = () => {
    setVisibleActivities((prevVisible) => prevVisible + 12); // Increase visible activities by 12
  };

  const categoryOptions = ["Adventure", "Culture", "Sports", "Nature", "Restaurant", "Things to do"];

  const sortedActivities = filteredActivities.sort((a, b) => {
    switch (selectedSort) {
      case "a-z":
        return a.name.localeCompare(b.name); // Sort alphabetically (A-Z)
      case "z-a":
        return b.name.localeCompare(a.name); // Sort alphabetically (Z-A)
      case "price-low-high":
        return a.price - b.price; // Sort by price (Low to High)
      case "price-high-low":
        return b.price - a.price; // Sort by price (High to Low)
      default:
        return 0;
    }
  });

  return (
    <Box marginLeft="300px" alignContent="center" alignItems="center">
      <Box>
        {step === 1 && (
          <>
            <h2>Step 1: Itinerary Details and Flights</h2>
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
              //onChange={(e) => setEndLocation(e.target.value)}
              onChange={handleEndLocationChange}
              fullWidth
              margin="normal"
            >
              {airportOptions.filter((loc) => loc.code !== startLocation).map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Departure Date"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <Button variant="contained" color="primary" onClick={handleSearchFlights} disabled={!startLocation || !endLocation || !departureDate}>
              Search Flights
            </Button>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}



            <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
              {flights.map((flight, index) => {
                const firstSegment = flight.itineraries[0].segments[0];
                const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

                // Check if this specific flight from the current search has been selected before
                const isFlightSelected = selectedFlights.some(f => f.id === flight.id);

                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ cursor: "pointer", backgroundColor: isFlightSelected ? "#d1e7dd" : "white" }}>
                      <CardContent>
                        <Typography>
                          <FaPlaneDeparture /> {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
                        </Typography>
                        <Typography>
                          <FaPlaneArrival /> Departure: {firstSegment.departure.at.split("T")[1]} | Arrival: {lastSegment.arrival.at.split("T")[1]}
                        </Typography>
                        <Typography>
                          <FaDollarSign /> {flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)
                        </Typography>

                        {/* Add/Remove button */}
                        <Button
                          variant="contained"
                          color={isFlightSelected ? "secondary" : "primary"}
                          onClick={() => handleFlightToggle(flight)}
                          sx={{ marginTop: "1rem" }}
                        >
                          {isFlightSelected ? "Remove from Itinerary" : "Add to Itinerary"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>



            <Button onClick={handleNextStep} variant="contained" sx={{ marginTop: "2rem" }}>
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Step 2: Select Accommodations</h2>
            {loading ? (
              <Typography>Loading accommodations...</Typography>
            ) : (
              <Grid container spacing={2}>
                {accommodations.map((accommodation) => (
                  <Grid item xs={12} sm={6} md={4} key={accommodation.name}>
                    <Card
                      onClick={() => handleAccommodationSelection(accommodation.name)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: selectedAccommodations.includes(accommodation.name) ? "#d1e7dd" : "white",
                      }}
                    >
                      <CardContent>
                        <Typography>{accommodation.name}</Typography>
                        <Typography>{`Price: R${accommodation.price}/night`}</Typography>
                        <img src={accommodation.image} alt={accommodation.name} style={{ maxWidth: "100%", height: "150px" }} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <Button onClick={handlePreviousStep}>Back</Button>
            <Button onClick={handleNextStep} variant="contained">
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Step 3: Select Activities in {endLocationFull}</h2>

            {/* Category Filter Dropdown */}
            <TextField
              select
              label="Select Category"
              value={selectedCategory}  // Add selectedCategory to the state
              onChange={(e) => setSelectedCategory(e.target.value)}  // Update selectedCategory
              fullWidth
              margin="normal"
            >
              {categoryOptions.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Sort Activities"
              value={selectedSort}  // Current sorting method
              onChange={(e) => setSelectedSort(e.target.value)}  // Update selectedSort on change
              fullWidth
              margin="normal"
            >
              {sortOptions.map((sortOption) => (
                <MenuItem key={sortOption.value} value={sortOption.value}>
                  {sortOption.label}
                </MenuItem>
              ))}
            </TextField>
            {loading ? (
              <Typography>Loading activities...</Typography>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Selected Activities: {selectedActivities.length}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {selectedActivities.map((activity) => (
                    <Chip
                      key={activity.name}
                      label={activity.name}
                      onDelete={() => handleActivitySelection(activity)}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Grid container spacing={2}>
                  {filteredActivities.slice(0, visibleActivities).map((activity) => (
                    <Grid item xs={12} sm={6} md={4} key={activity.name}>
                      <Card
                        onClick={() => handleActivitySelection(activity)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: isActivitySelected(activity.name) ? "#d1e7dd" : "white",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                          minHeight: "300px",
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6">{activity.name}</Typography>
                          <Typography>{activity.description}</Typography>
                          <Typography>City: {activity.city}</Typography>
                          {activity.price && (
                            <Typography>Price: R{activity.price}</Typography>
                          )}
                          {activity.image && (
                            <img src={activity.image} alt={activity.name} style={{ maxWidth: "100%", height: "150px", marginTop: "10px" }} />
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

{visibleActivities < activities.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button onClick={handleLoadMore} variant="contained" color="primary" sx={{ mx: 1 }}>
                    Load More
                  </Button>
                </Box>
              )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              {/* Left-aligned container for Back and Submit Itinerary buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={handlePreviousStep} sx={{ marginRight: "1rem" }}>Back</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mx: 1 }}>
                  Submit Itinerary
                </Button>
              </Box>

              {/* Centered Load More button */}
              
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ItineraryForm;
