import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert, Checkbox, FormControlLabel } from "@mui/material";
import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase-config";
import { collection, getFirestore, query as firestoreQuery, where, getDocs, setDoc, doc } from "firebase/firestore";

// Amadeus API details and helper functions
const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";

const convertPriceToZar = (price, fromCurrency) => (fromCurrency === "EUR" ? price * 19.21 : null);

const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
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
    const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
    const params = { originLocationCode: origin, destinationLocationCode: destination, departureDate, adults: adults.toString(), max: maxOffers.toString() };
    Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

    const searchResponse = await fetch(searchUrl.toString(), { method: "GET", headers: { Authorization: `Bearer ${access_token}` } });
    const flightData = await searchResponse.json();
    
    flightData.data.forEach((flight) => {
      flight.priceInZar = convertPriceToZar(parseFloat(flight.price.total), flight.price.currency)?.toFixed(2) || "N/A";
    });

    return flightData.data;
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return null;
  }
};

function ItineraryForm() {
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

      const departureFlights = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
      setFlights(departureFlights);

      if (returnFlight && returnDate) {
        const returnFlightResults = await getFlightOffers(endLocation, startLocation, returnDate, 1, 9);
        setReturnFlights(returnFlightResults);
      }
    }
  };

  const handleFlightToggle = (flight) => {
    setSelectedFlights((prevSelected) =>
      prevSelected.some((f) => f.id === flight.id) ? prevSelected.filter((f) => f.id !== flight.id) : [...prevSelected, flight]
    );
  };

  return (
    <Box alignItems="center" alignContent="center" marginLeft="280px">
    <Box margin="20px">
      <h1 style={{marginLeft:"-40px", marginTop:"-10px"}}>Itinerary Form</h1>
      <h2>Step 1: Flights</h2>

      <TextField label="Itinerary Name" value={itineraryName} onChange={(e) => setItineraryName(e.target.value)} fullWidth margin="normal" />

      <TextField select label="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} fullWidth margin="normal">
        {airportOptions.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField select label="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} fullWidth margin="normal">
        {airportOptions.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="outlined" onClick={() => setShowFlightSearch(true)} fullWidth>
        + Add a Flight
      </Button>

      {showFlightSearch && (
        <>
          <TextField label="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

          <FormControlLabel
            control={<Checkbox checked={returnFlight} onChange={(e) => setReturnFlight(e.target.checked)} />}
            label="Return Flight"
          />

          {returnFlight && (
            <TextField label="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          )}

          <Button onClick={handleSearchFlights} variant="contained" color="primary">
            Search Flights
          </Button>

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          
          <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
            {/* <Typography variant="h6">Departure Flights</Typography> */}
            <h2>Departure Flights</h2>
            <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
            
            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card onClick={() => handleFlightToggle(flight)}>
                    <CardContent>
                      <Typography>
                        <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}
                      </Typography>
                      <Typography>{flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)</Typography>
                      <Typography>Class: {flight.travelerPricings[0].fareDetailsBySegment[0].class}, Cabin: {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}</Typography>
                      {/* <Button 
                        sx={{
                            backgroundColor: "purple",
                            
                            '&:hover': {
                            backgroundColor: '#570987',
      
                            },
                           }} 
                           
                           variant="contained"
                      >
                        {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
                        </Button> */}
                        <Button 
                          sx={{
                            backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "purple" : "#1769aa",
                            '&:hover': {
                                backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#570987' : '#1769aa',
                              },
                          }} 
                          variant="contained"
                        >   
                          {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
                        </Button>

                    </CardContent>
                  </Card>
                </Grid>
                
              ))
            ) : (
              <Typography>No flights found.</Typography>
            )}
            </Grid>
            

            {returnFlight && returnFlights.length > 0 && (
              <>
                {/* <Typography variant="h6">Return Flights</Typography> */}
                <h2>Return Flights</h2>
                <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
                {returnFlights.map((flight, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card onClick={() => handleFlightToggle(flight)}>
                      <CardContent>
                        <Typography>
                          <FaPlaneArrival /> {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}
                        </Typography>
                        <Typography>{flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)</Typography>
                        <Typography>Class: {flight.travelerPricings[0].fareDetailsBySegment[0].class}, Cabin: {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}</Typography>
                        {/* <Button variant="contained">
                          {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
                        </Button> */}

                        <Button 
                          sx={{
                            backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "purple" : "#1769aa",
                            '&:hover': {
                                backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#570987' : '#1769aa',
                              },
                          }} 
                          variant="contained"
                        >   
                          {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                </Grid>
              </>
              
            )}
            
          </Grid>

          <Button marginTop="50px" padding="20px" variant="outlined" onClick={() => setShowFlightSearch(false)}>
            Done
          </Button>
        </>
      )}

      {/* <Typography variant="h6" sx={{ marginTop: "20px" }}>Selected Flights</Typography> */}
      <h2 style={{marginTop: "50px"}}>Selected Flights</h2>
      <Grid container spacing={2}>
        {selectedFlights.map((flight, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography><FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</Typography>
                <Typography>{flight.price.total} {flight.price.currency}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" sx={{ marginTop: "20px" }}>
        Next: Accommodations
      </Button>
    </Box>
    </Box>
  );
}

export default ItineraryForm;
