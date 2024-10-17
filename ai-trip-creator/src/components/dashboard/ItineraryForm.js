// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert, Checkbox, FormControlLabel } from "@mui/material";
// // // // // // // // // import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign, FaClock } from "react-icons/fa";
// // // // // // // // // // import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign, FaClock } from 'react-icons/fa';
// // // // // // // // // import { IoAirplaneSharp } from 'react-icons/io5'; // For airline icon
// // // // // // // // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // // // // // // // import { db } from "../../firebase/firebase-config";
// // // // // // // // // import { collection, getFirestore, query as firestoreQuery, where, getDocs, setDoc, doc } from "firebase/firestore";

// // // // // // // // // // Amadeus API details and helper functions
// // // // // // // // // const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
// // // // // // // // // const client_secret = "RGeFEPqnTMNFKNjd";

// // // // // // // // // const convertPriceToZar = (price, fromCurrency) => (fromCurrency === "EUR" ? price * 19.21 : null);

// // // // // // // // // const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
// // // // // // // // //   const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";
// // // // // // // // //   try {
// // // // // // // // //     const tokenResponse = await fetch(tokenUrl, {
// // // // // // // // //       method: "POST",
// // // // // // // // //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
// // // // // // // // //       body: new URLSearchParams({
// // // // // // // // //         client_id,
// // // // // // // // //         client_secret,
// // // // // // // // //         grant_type: "client_credentials",
// // // // // // // // //       }),
// // // // // // // // //     });
// // // // // // // // //     const { access_token } = await tokenResponse.json();
// // // // // // // // //     const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
// // // // // // // // //     const params = { originLocationCode: origin, destinationLocationCode: destination, departureDate, adults: adults.toString(), max: maxOffers.toString() };
// // // // // // // // //     Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

// // // // // // // // //     const searchResponse = await fetch(searchUrl.toString(), { method: "GET", headers: { Authorization: `Bearer ${access_token}` } });
// // // // // // // // //     const flightData = await searchResponse.json();

// // // // // // // // //     flightData.data.forEach((flight) => {
// // // // // // // // //       flight.priceInZar = convertPriceToZar(parseFloat(flight.price.total), flight.price.currency)?.toFixed(2) || "N/A";
// // // // // // // // //     });
// // // // // // // // //     console.log("Flight Data: ", flightData.data);
// // // // // // // // //     return flightData.data;
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error fetching flight offers:", error);
// // // // // // // // //     return null;
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // function ItineraryForm() {
// // // // // // // // //   const [itineraryName, setItineraryName] = useState("");
// // // // // // // // //   const [startLocation, setStartLocation] = useState("");
// // // // // // // // //   const [endLocation, setEndLocation] = useState("");
// // // // // // // // //   const [departureDate, setDepartureDate] = useState("");
// // // // // // // // //   const [returnFlight, setReturnFlight] = useState(false);
// // // // // // // // //   const [returnDate, setReturnDate] = useState("");
// // // // // // // // //   const [flights, setFlights] = useState([]);
// // // // // // // // //   const [returnFlights, setReturnFlights] = useState([]);
// // // // // // // // //   const [selectedFlights, setSelectedFlights] = useState([]);
// // // // // // // // //   const [showFlightSearch, setShowFlightSearch] = useState(false);
// // // // // // // // //   const [errorMessage, setErrorMessage] = useState("");
// // // // // // // // //   const [userId, setUserId] = useState("");


// // // // // // // // //   // Fetch user ID (UID)
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     const auth = getAuth();
// // // // // // // // //     onAuthStateChanged(auth, (user) => {
// // // // // // // // //       if (user) {
// // // // // // // // //         setUserId(user.uid);
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   }, []);

// // // // // // // // //   // Predefined South African airport codes
// // // // // // // // //   const airportOptions = [
// // // // // // // // //     { label: "Durban (DUR)", code: "DUR" },
// // // // // // // // //     { label: "Cape Town (CPT)", code: "CPT" },
// // // // // // // // //     { label: "Johannesburg (JNB)", code: "JNB" },
// // // // // // // // //     { label: "Port Elizabeth (PLZ)", code: "PLZ" },
// // // // // // // // //     { label: "East London (ELS)", code: "ELS" },
// // // // // // // // //     { label: "Lanseria (HLA)", code: "HLA" },
// // // // // // // // //   ];

// // // // // // // // //   const handleSearchFlights = async () => {
// // // // // // // // //     if (startLocation && endLocation && departureDate) {
// // // // // // // // //       if (startLocation === endLocation) {
// // // // // // // // //         setErrorMessage("Origin and destination cannot be the same.");
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       setErrorMessage("");
// // // // // // // // //       setFlights([]);

// // // // // // // // //       const departureFlights = await getFlightOffers(startLocation, endLocation, departureDate, 1, 12);
// // // // // // // // //       setFlights(departureFlights);

// // // // // // // // //       if (returnFlight && returnDate) {
// // // // // // // // //         const returnFlightResults = await getFlightOffers(endLocation, startLocation, returnDate, 1, 12);
// // // // // // // // //         setReturnFlights(returnFlightResults);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleFlightToggle = (flight) => {
// // // // // // // // //     setSelectedFlights((prevSelected) =>
// // // // // // // // //       prevSelected.some((f) => f.id === flight.id) ? prevSelected.filter((f) => f.id !== flight.id) : [...prevSelected, flight]
// // // // // // // // //     );
// // // // // // // // //   };

// // // // // // // // // const getAirlineName = (carrierCode) => {
// // // // // // // // //   const airlineMap = {
// // // // // // // // //    'SA': 'South African Airways',
// // // // // // // // //    'MN': 'Kulula.com',
// // // // // // // // //    '4Z': 'Airlink',
// // // // // // // // //    'FA': 'FlySafair',
// // // // // // // // //    'BA': 'British Airways (operated by Comair)',
// // // // // // // // //     // Add more airline mappings
// // // // // // // // //   };
// // // // // // // // //   return airlineMap[carrierCode] || carrierCode;
// // // // // // // // // };


// // // // // // // // // return (
// // // // // // // // //   <Box alignItems="center" alignContent="center" marginLeft="280px">
// // // // // // // // //     <Box margin="20px">
// // // // // // // // //       <h1 style={{ marginLeft: "-40px", marginTop: "-10px" }}>Itinerary Form</h1>
// // // // // // // // //       <h2>Step 1: Flights</h2>

// // // // // // // // //       {/* Itinerary, start, end locations, and search button */}
// // // // // // // // //       <TextField label="Itinerary Name" value={itineraryName} onChange={(e) => setItineraryName(e.target.value)} fullWidth margin="normal" />
// // // // // // // // //       <TextField select label="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} fullWidth margin="normal">
// // // // // // // // //         {airportOptions.map((option) => (
// // // // // // // // //           <MenuItem key={option.code} value={option.code}>
// // // // // // // // //             {option.label}
// // // // // // // // //           </MenuItem>
// // // // // // // // //         ))}
// // // // // // // // //       </TextField>
// // // // // // // // //       <TextField select label="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} fullWidth margin="normal">
// // // // // // // // //         {airportOptions.map((option) => (
// // // // // // // // //           <MenuItem key={option.code} value={option.code}>
// // // // // // // // //             {option.label}
// // // // // // // // //           </MenuItem>
// // // // // // // // //         ))}
// // // // // // // // //       </TextField>
// // // // // // // // //       <Button variant="outlined" onClick={() => setShowFlightSearch(true)} fullWidth>
// // // // // // // // //         + Add a Flight
// // // // // // // // //       </Button>

// // // // // // // // //       {/* Flight search section */}
// // // // // // // // //       {showFlightSearch && (
// // // // // // // // //         <>
// // // // // // // // //           {/* Date inputs and checkboxes */}
// // // // // // // // //           <TextField label="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
// // // // // // // // //           <FormControlLabel control={<Checkbox checked={returnFlight} onChange={(e) => setReturnFlight(e.target.checked)} />} label="Return Flight" />
// // // // // // // // //           {returnFlight && (
// // // // // // // // //             <TextField label="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
// // // // // // // // //           )}
// // // // // // // // //           <Button onClick={handleSearchFlights} variant="contained" color="primary">Search Flights</Button>

// // // // // // // // //           {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

// // // // // // // // //           {/* Flight cards */}
// // // // // // // // //           <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
// // // // // // // // //             <h2>Departure Flights</h2>
// // // // // // // // //             <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
// // // // // // // // //               {flights.length > 0 ? (
// // // // // // // // //                 flights.map((flight, index) => (
// // // // // // // // //                   <Grid item xs={12} sm={6} md={3} key={index}>
// // // // // // // // //                     <Card 
// // // // // // // // //                       onClick={() => handleFlightToggle(flight)}
// // // // // // // // //                       sx={{
// // // // // // // // //                         // boxShadow: selectedFlights.some((f) => f.id === flight.id) ? '0px 0px 8px 2px #7e57c2' : '0px 0px 5px 1px #bbb',
// // // // // // // // //                         // border: selectedFlights.some((f) => f.id === flight.id) ? '1px solid #7e57c2' : '1px solid #ccc',
// // // // // // // // //                         boxShadow: '0px 0px 5px 1px #bbb',
// // // // // // // // //                         transition: 'all 0.2s ease',
// // // // // // // // //                         padding: '8px', // Reducing padding
// // // // // // // // //                         fontSize: '0.9rem', // Smaller text size
// // // // // // // // //                       }}
// // // // // // // // //                       alignItems="center" 
// // // // // // // // //                       alignContent="center"

// // // // // // // // //                     >
// // // // // // // // //                       <CardContent alignItems="center" alignContent="center">
// // // // // // // // //                         <Typography align= "center" variant="h6" sx={{ fontWeight: 'bold', mb: 1}}>
// // // // // // // // //                           <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //                         </Typography>

// // // // // // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                           <FaClock style={{ color: "#ff9800", marginRight: 4 }} />
// // // // // // // // //                           Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
// // // // // // // // //                         </Typography>
// // // // // // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                           <FaPlaneArrival style={{ color: "#2196f3", marginRight: 4 }} />
// // // // // // // // //                           Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
// // // // // // // // //                         </Typography>                        
// // // // // // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2 , fontSize: '15.5px'}}>
// // // // // // // // //                           <IoAirplaneSharp style={{ color: "#4caf50", marginRight: 4 }} />
// // // // // // // // //                           Airline: {getAirlineName(flight.itineraries[0].segments[0].carrierCode)}
// // // // // // // // //                         </Typography>
// // // // // // // // //                         <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2, fontSize: '15.5px'}}>
// // // // // // // // //                           <FaDollarSign style={{ color: "#f44336", marginRight: 4 }} />
// // // // // // // // //                           Price: {flight.priceInZar} ZAR
// // // // // // // // //                         </Typography>

// // // // // // // // //                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                         <Button

// // // // // // // // //                           sx={{
// // // // // // // // //                             mt: 2,
// // // // // // // // //                             align: "center",
// // // // // // // // //                             backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "#7e57c2" : "#2196f3",
// // // // // // // // //                             color: "white",
// // // // // // // // //                             '&:hover': {
// // // // // // // // //                               backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#5e35b1' : '#1976d2',
// // // // // // // // //                             },
// // // // // // // // //                             transition: 'background-color 0.2s ease',
// // // // // // // // //                             fontSize: "0.8rem" // Smaller button text
// // // // // // // // //                           }}
// // // // // // // // //                           variant="contained"

// // // // // // // // //                         >
// // // // // // // // //                           {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //                         </Button>
// // // // // // // // //                         </Box>
// // // // // // // // //                       </CardContent>
// // // // // // // // //                     </Card>
// // // // // // // // //                   </Grid>
// // // // // // // // //                 ))
// // // // // // // // //               ) : (
// // // // // // // // //                 <Typography>No flights found.</Typography>
// // // // // // // // //               )}
// // // // // // // // //             </Grid>

// // // // // // // // //             {/* Return flights section */}
// // // // // // // // //             {returnFlight && returnFlights.length > 0 && (
// // // // // // // // //               <>
// // // // // // // // //                 <h2>Return Flights</h2>
// // // // // // // // //                 <Grid container spacing={2}>
// // // // // // // // //                   {returnFlights.map((flight, index) => (
// // // // // // // // //                     <Grid item xs={12} sm={6} md={3} key={index}>
// // // // // // // // //                       {/* <Card
// // // // // // // // //                         onClick={() => handleFlightToggle(flight)}
// // // // // // // // //                         sx={{
// // // // // // // // //                           boxShadow: selectedFlights.some((f) => f.id === flight.id) ? '0px 0px 8px 2px #7e57c2' : '0px 0px 5px 1px #bbb',
// // // // // // // // //                           border: selectedFlights.some((f) => f.id === flight.id) ? '1px solid #7e57c2' : '1px solid #ccc',
// // // // // // // // //                           transition: 'all 0.2s ease',
// // // // // // // // //                           padding: '8px',
// // // // // // // // //                           fontSize: '0.9rem',
// // // // // // // // //                         }}
// // // // // // // // //                       > */}
// // // // // // // // //                       <Card 
// // // // // // // // //                       onClick={() => handleFlightToggle(flight)}
// // // // // // // // //                       sx={{
// // // // // // // // //                         // boxShadow: selectedFlights.some((f) => f.id === flight.id) ? '0px 0px 8px 2px #7e57c2' : '0px 0px 5px 1px #bbb',
// // // // // // // // //                         // border: selectedFlights.some((f) => f.id === flight.id) ? '1px solid #7e57c2' : '1px solid #ccc',
// // // // // // // // //                         boxShadow: '0px 0px 5px 1px #bbb',
// // // // // // // // //                         transition: 'all 0.2s ease',
// // // // // // // // //                         padding: '8px', // Reducing padding
// // // // // // // // //                         fontSize: '0.9rem', // Smaller text size
// // // // // // // // //                       }}
// // // // // // // // //                       alignItems="center" 
// // // // // // // // //                       alignContent="center"

// // // // // // // // //                     >
// // // // // // // // //                         <CardContent>
// // // // // // // // //                           <Typography align= "center" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // // // // // //                             <FaPlaneArrival /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //                           </Typography>

// // // // // // // // //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                             <FaClock style={{ color: "#ff9800", marginRight: 4 }} />
// // // // // // // // //                             Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
// // // // // // // // //                           </Typography>
// // // // // // // // //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                             <FaPlaneArrival style={{ color: "#2196f3", marginRight: 4 }} />
// // // // // // // // //                             Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
// // // // // // // // //                           </Typography>
// // // // // // // // //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center',mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                             <IoAirplaneSharp style={{ color: "#4caf50", marginRight: 4 }} />
// // // // // // // // //                             Airline: {getAirlineName(flight.itineraries[0].segments[0].carrierCode)}
// // // // // // // // //                           </Typography>
// // // // // // // // //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>
// // // // // // // // //                             <FaDollarSign style={{ color: "#f44336", marginRight: 4 }} />
// // // // // // // // //                             Price: {flight.priceInZar} ZAR
// // // // // // // // //                           </Typography>

// // // // // // // // //                           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: -2, fontSize: '15.5px' }}>

// // // // // // // // //                           <Button
// // // // // // // // //                             sx={{
// // // // // // // // //                               mt: 2,
// // // // // // // // //                               backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "#7e57c2" : "#2196f3",
// // // // // // // // //                               color: "white",
// // // // // // // // //                               '&:hover': {
// // // // // // // // //                                 backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#5e35b1' : '#1976d2',
// // // // // // // // //                               },
// // // // // // // // //                               transition: 'background-color 0.2s ease',
// // // // // // // // //                               fontSize: "0.8rem"
// // // // // // // // //                             }}
// // // // // // // // //                             variant="contained"
// // // // // // // // //                           >
// // // // // // // // //                             {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //                           </Button>
// // // // // // // // //                           </Box>
// // // // // // // // //                         </CardContent>
// // // // // // // // //                       </Card>
// // // // // // // // //                     </Grid>
// // // // // // // // //                   ))}
// // // // // // // // //                 </Grid>
// // // // // // // // //               </>
// // // // // // // // //             )}
// // // // // // // // //           </Grid>
// // // // // // // // //         </>
// // // // // // // // //       )}

// // // // // // // // //        <h2 style={{marginTop: "50px"}}>Selected Flights</h2>
// // // // // // // // //          <Grid container spacing={2}>
// // // // // // // // //           {selectedFlights.map((flight, index) => (
// // // // // // // // //             <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //               <Card>
// // // // // // // // //                 <CardContent>
// // // // // // // // //                   <Typography align="center" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // // // // // //                     <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //                   </Typography>
// // // // // // // // //                   {/* <Typography variant="body1">
// // // // // // // // //                     Price: {flight.priceInZar} ZAR
// // // // // // // // //                   </Typography> */}
// // // // // // // // //                   <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
// // // // // // // // //                     <FaClock style={{ color: "#ff9800", marginRight: 4 }} />
// // // // // // // // //                       Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
// // // // // // // // //                  </Typography>
// // // // // // // // //                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
// // // // // // // // //                             <FaPlaneArrival style={{ color: "#2196f3", marginRight: 4 }} />
// // // // // // // // //                             Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
// // // // // // // // //                           </Typography>
// // // // // // // // //                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center',mb: -3, fontSize: '15.5px' }}>
// // // // // // // // //                             <IoAirplaneSharp style={{ color: "#4caf50", marginRight: 4 }} />
// // // // // // // // //                             Airline: {getAirlineName(flight.itineraries[0].segments[0].carrierCode)}
// // // // // // // // //                           </Typography>
// // // // // // // // //                           <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
// // // // // // // // //                             <FaDollarSign style={{ color: "#f44336", marginRight: 4 }} />
// // // // // // // // //                             Price: {flight.priceInZar} ZAR
// // // // // // // // //                           </Typography>

// // // // // // // // //                 </CardContent>
// // // // // // // // //               </Card>
// // // // // // // // //             </Grid>
// // // // // // // // //           ))}
// // // // // // // // //         </Grid>

// // // // // // // // //        <Button variant="contained" sx={{ marginTop: "20px" }}>
// // // // // // // // //          Next: Accommodations
// // // // // // // // //        </Button>
// // // // // // // // //     </Box>
// // // // // // // // //   </Box>
// // // // // // // // // );


// // // // // // // // // }

// // // // // // // // // export default ItineraryForm;












// // // // // // // // // /* IGNORE */

// // // // // // // // // // return (
// // // // // // // // //   //   <Box alignItems="center" alignContent="center" marginLeft="280px">
// // // // // // // // //   //   <Box margin="20px">
// // // // // // // // //   //     <h1 style={{marginLeft:"-40px", marginTop:"-10px"}}>Itinerary Form</h1>
// // // // // // // // //   //     <h2>Step 1: Flights</h2>

// // // // // // // // //   //     <TextField label="Itinerary Name" value={itineraryName} onChange={(e) => setItineraryName(e.target.value)} fullWidth margin="normal" />

// // // // // // // // //   //     <TextField select label="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} fullWidth margin="normal">
// // // // // // // // //   //       {airportOptions.map((option) => (
// // // // // // // // //   //         <MenuItem key={option.code} value={option.code}>
// // // // // // // // //   //           {option.label}
// // // // // // // // //   //         </MenuItem>
// // // // // // // // //   //       ))}
// // // // // // // // //   //     </TextField>

// // // // // // // // //   //     <TextField select label="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} fullWidth margin="normal">
// // // // // // // // //   //       {airportOptions.map((option) => (
// // // // // // // // //   //         <MenuItem key={option.code} value={option.code}>
// // // // // // // // //   //           {option.label}
// // // // // // // // //   //         </MenuItem>
// // // // // // // // //   //       ))}
// // // // // // // // //   //     </TextField>

// // // // // // // // //   //     <Button variant="outlined" onClick={() => setShowFlightSearch(true)} fullWidth>
// // // // // // // // //   //       + Add a Flight
// // // // // // // // //   //     </Button>

// // // // // // // // //   //     {showFlightSearch && (
// // // // // // // // //   //       <>
// // // // // // // // //   //         <TextField label="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

// // // // // // // // //   //         <FormControlLabel
// // // // // // // // //   //           control={<Checkbox checked={returnFlight} onChange={(e) => setReturnFlight(e.target.checked)} />}
// // // // // // // // //   //           label="Return Flight"
// // // // // // // // //   //         />

// // // // // // // // //   //         {returnFlight && (
// // // // // // // // //   //           <TextField label="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
// // // // // // // // //   //         )}

// // // // // // // // //   //         <Button onClick={handleSearchFlights} variant="contained" color="primary">
// // // // // // // // //   //           Search Flights
// // // // // // // // //   //         </Button>

// // // // // // // // //   //         {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

// // // // // // // // //   //         <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
// // // // // // // // //   //           {/* <Typography variant="h6">Departure Flights</Typography> */}
// // // // // // // // //   //           <h2>Departure Flights</h2>
// // // // // // // // //   //           <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>

// // // // // // // // //   //           {flights.length > 0 ? (
// // // // // // // // //   //             flights.map((flight, index) => (
// // // // // // // // //   //               <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //   //                 <Card onClick={() => handleFlightToggle(flight)}>
// // // // // // // // //   //                   <CardContent>
// // // // // // // // //   //                     <Typography>
// // // // // // // // //   //                       <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //   //                     </Typography>
// // // // // // // // //   //                     <Typography>{flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)</Typography>
// // // // // // // // //   //                     <Typography>Class: {flight.travelerPricings[0].fareDetailsBySegment[0].class}, Cabin: {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}</Typography>
// // // // // // // // //   //                     {/* <Button 
// // // // // // // // //   //                       sx={{
// // // // // // // // //   //                           backgroundColor: "purple",

// // // // // // // // //   //                           '&:hover': {
// // // // // // // // //   //                           backgroundColor: '#570987',

// // // // // // // // //   //                           },
// // // // // // // // //   //                          }} 

// // // // // // // // //   //                          variant="contained"
// // // // // // // // //   //                     >
// // // // // // // // //   //                       {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //   //                       </Button> */}
// // // // // // // // //   //                       <Button 
// // // // // // // // //   //                         sx={{
// // // // // // // // //   //                           backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "purple" : "#1769aa",
// // // // // // // // //   //                           '&:hover': {
// // // // // // // // //   //                               backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#570987' : '#1769aa',
// // // // // // // // //   //                             },
// // // // // // // // //   //                         }} 
// // // // // // // // //   //                         variant="contained"
// // // // // // // // //   //                       >   
// // // // // // // // //   //                         {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //   //                       </Button>

// // // // // // // // //   //                   </CardContent>
// // // // // // // // //   //                 </Card>
// // // // // // // // //   //               </Grid>

// // // // // // // // //   //             ))
// // // // // // // // //   //           ) : (
// // // // // // // // //   //             <Typography>No flights found.</Typography>
// // // // // // // // //   //           )}
// // // // // // // // //   //           </Grid>


// // // // // // // // //   //           {returnFlight && returnFlights.length > 0 && (
// // // // // // // // //   //             <>
// // // // // // // // //   //               {/* <Typography variant="h6">Return Flights</Typography> */}
// // // // // // // // //   //               <h2>Return Flights</h2>
// // // // // // // // //   //               <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
// // // // // // // // //   //               {returnFlights.map((flight, index) => (
// // // // // // // // //   //                 <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //   //                   <Card onClick={() => handleFlightToggle(flight)}>
// // // // // // // // //   //                     <CardContent>
// // // // // // // // //   //                       <Typography>
// // // // // // // // //   //                         <FaPlaneArrival /> {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Typography>{flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)</Typography>
// // // // // // // // //   //                       <Typography>Class: {flight.travelerPricings[0].fareDetailsBySegment[0].class}, Cabin: {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}</Typography>
// // // // // // // // //   //                       {/* <Button variant="contained">
// // // // // // // // //   //                         {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //   //                       </Button> */}

// // // // // // // // //   //                       <Button 
// // // // // // // // //   //                         sx={{
// // // // // // // // //   //                           backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "purple" : "#1769aa",
// // // // // // // // //   //                           '&:hover': {
// // // // // // // // //   //                               backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#570987' : '#1769aa',
// // // // // // // // //   //                             },
// // // // // // // // //   //                         }} 
// // // // // // // // //   //                         variant="contained"
// // // // // // // // //   //                       >   
// // // // // // // // //   //                         {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //   //                       </Button>
// // // // // // // // //   //                     </CardContent>
// // // // // // // // //   //                   </Card>
// // // // // // // // //   //                 </Grid>
// // // // // // // // //   //               ))}
// // // // // // // // //   //               </Grid>
// // // // // // // // //   //             </>

// // // // // // // // //   //           )}

// // // // // // // // //   //         </Grid>

// // // // // // // // //   //         <Button marginTop="50px" padding="20px" variant="outlined" onClick={() => setShowFlightSearch(false)}>
// // // // // // // // //   //           Done
// // // // // // // // //   //         </Button>
// // // // // // // // //   //       </>
// // // // // // // // //   //     )}

// // // // // // // // //   //     {/* <Typography variant="h6" sx={{ marginTop: "20px" }}>Selected Flights</Typography> */}
// // // // // // // // //   //     <h2 style={{marginTop: "50px"}}>Selected Flights</h2>
// // // // // // // // //   //     <Grid container spacing={2}>
// // // // // // // // //   //       {selectedFlights.map((flight, index) => (
// // // // // // // // //   //         <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //   //           <Card>
// // // // // // // // //   //             <CardContent>
// // // // // // // // //   //               <Typography><FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} to {flight.itineraries[0].segments[0].arrival.iataCode}</Typography>
// // // // // // // // //   //               <Typography>{flight.price.total} {flight.price.currency}</Typography>
// // // // // // // // //   //             </CardContent>
// // // // // // // // //   //           </Card>
// // // // // // // // //   //         </Grid>
// // // // // // // // //   //       ))}
// // // // // // // // //   //     </Grid>

// // // // // // // // //   //     <Button variant="contained" sx={{ marginTop: "20px" }}>
// // // // // // // // //   //       Next: Accommodations
// // // // // // // // //   //     </Button>
// // // // // // // // //   //   </Box>
// // // // // // // // //   //   </Box>
// // // // // // // // //   // );
// // // // // // // // // //--------------------------------------------------------------------------------------------------
// // // // // // // // //   // return (
// // // // // // // // //   //   <Box alignItems="center" alignContent="center" marginLeft="280px">
// // // // // // // // //   //     <Box margin="20px">
// // // // // // // // //   //       <h1 style={{marginLeft:"-40px", marginTop:"-10px"}}>Itinerary Form</h1>
// // // // // // // // //   //       <h2>Step 1: Flights</h2>

// // // // // // // // //   //       <TextField label="Itinerary Name" value={itineraryName} onChange={(e) => setItineraryName(e.target.value)} fullWidth margin="normal" />

// // // // // // // // //   //       <TextField select label="Start Location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} fullWidth margin="normal">
// // // // // // // // //   //         {airportOptions.map((option) => (
// // // // // // // // //   //           <MenuItem key={option.code} value={option.code}>
// // // // // // // // //   //             {option.label}
// // // // // // // // //   //           </MenuItem>
// // // // // // // // //   //         ))}
// // // // // // // // //   //       </TextField>

// // // // // // // // //   //       <TextField select label="End Location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} fullWidth margin="normal">
// // // // // // // // //   //         {airportOptions.map((option) => (
// // // // // // // // //   //           <MenuItem key={option.code} value={option.code}>
// // // // // // // // //   //             {option.label}
// // // // // // // // //   //           </MenuItem>
// // // // // // // // //   //         ))}
// // // // // // // // //   //       </TextField>

// // // // // // // // //   //       <Button variant="outlined" onClick={() => setShowFlightSearch(true)} fullWidth>
// // // // // // // // //   //         + Add a Flight
// // // // // // // // //   //       </Button>

// // // // // // // // //   //       {showFlightSearch && (
// // // // // // // // //   //         <>
// // // // // // // // //   //           <TextField label="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />

// // // // // // // // //   //           <FormControlLabel
// // // // // // // // //   //             control={<Checkbox checked={returnFlight} onChange={(e) => setReturnFlight(e.target.checked)} />}
// // // // // // // // //   //             label="Return Flight"
// // // // // // // // //   //           />

// // // // // // // // //   //           {returnFlight && (
// // // // // // // // //   //             <TextField label="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
// // // // // // // // //   //           )}

// // // // // // // // //   //           <Button onClick={handleSearchFlights} variant="contained" color="primary">
// // // // // // // // //   //             Search Flights
// // // // // // // // //   //           </Button>

// // // // // // // // //   //           {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

// // // // // // // // //   //           <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
// // // // // // // // //   //             <h2>Departure Flights</h2>
// // // // // // // // //   //             <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>

// // // // // // // // //   //             {flights.length > 0 ? (
// // // // // // // // //   //               flights.map((flight, index) => (
// // // // // // // // //   //                 <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //   //                   <Card onClick={() => handleFlightToggle(flight)} sx={{
// // // // // // // // //   //                     boxShadow: selectedFlights.some((f) => f.id === flight.id) ? '0px 0px 15px 2px #570987' : '0px 0px 10px 1px #ccc',
// // // // // // // // //   //                     border: selectedFlights.some((f) => f.id === flight.id) ? '2px solid #570987' : '1px solid #ddd',
// // // // // // // // //   //                     transition: 'all 0.3s ease',
// // // // // // // // //   //                   }}>
// // // // // // // // //   //                     <CardContent>
// // // // // // // // //   //                       <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // // // // // //   //                         <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Typography variant="body1" sx={{ mb: 1 }}>
// // // // // // // // //   //                         <FaPlaneDeparture style={{ marginRight: 4 }} />
// // // // // // // // //   //                         Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Typography variant="body1" sx={{ mb: 1 }}>
// // // // // // // // //   //                         <FaPlaneArrival style={{ marginRight: 4 }} />
// // // // // // // // //   //                         Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Typography variant="body1" sx={{ mb: 1 }}>
// // // // // // // // //   //                         <FaDollarSign style={{ marginRight: 4 }} />
// // // // // // // // //   //                         Price: {flight.priceInZar} ZAR
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Typography variant="body2" sx={{ mb: 1 }}>
// // // // // // // // //   //                         Cabin: {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Typography variant="body2" sx={{ mb: 2 }}>
// // // // // // // // //   //                         Carrier: {flight.itineraries[0].segments[0].carrierCode}
// // // // // // // // //   //                       </Typography>
// // // // // // // // //   //                       <Button 
// // // // // // // // //   //                         sx={{
// // // // // // // // //   //                           backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "purple" : "#1769aa",
// // // // // // // // //   //                           color: "white",
// // // // // // // // //   //                           '&:hover': {
// // // // // // // // //   //                             backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#570987' : '#005f9e',
// // // // // // // // //   //                           },
// // // // // // // // //   //                           transition: 'background-color 0.3s ease',
// // // // // // // // //   //                         }} 
// // // // // // // // //   //                         variant="contained"
// // // // // // // // //   //                       >   
// // // // // // // // //   //                         {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //   //                       </Button>
// // // // // // // // //   //                     </CardContent>
// // // // // // // // //   //                   </Card>
// // // // // // // // //   //                 </Grid>
// // // // // // // // //   //               ))
// // // // // // // // //   //             ) : (
// // // // // // // // //   //               <Typography>No flights found.</Typography>
// // // // // // // // //   //             )}
// // // // // // // // //   //             </Grid>

// // // // // // // // //   //             {returnFlight && returnFlights.length > 0 && (
// // // // // // // // //   //               <>
// // // // // // // // //   //                 <h2>Return Flights</h2>
// // // // // // // // //   //                 <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
// // // // // // // // //   //                 {returnFlights.map((flight, index) => (
// // // // // // // // //   //                   <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //   //                     <Card onClick={() => handleFlightToggle(flight)} sx={{
// // // // // // // // //   //                       boxShadow: selectedFlights.some((f) => f.id === flight.id) ? '0px 0px 15px 2px #570987' : '0px 0px 10px 1px #ccc',
// // // // // // // // //   //                       border: selectedFlights.some((f) => f.id === flight.id) ? '2px solid #570987' : '1px solid #ddd',
// // // // // // // // //   //                       transition: 'all 0.3s ease',
// // // // // // // // //   //                     }}>
// // // // // // // // //   //                       <CardContent>
// // // // // // // // //   //                         <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // // // // // //   //                           <FaPlaneArrival /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //   //                         </Typography>
// // // // // // // // //   //                         <Typography variant="body1" sx={{ mb: 1 }}>
// // // // // // // // //   //                           <FaPlaneDeparture style={{ marginRight: 4 }} />
// // // // // // // // //   //                           Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
// // // // // // // // //   //                         </Typography>
// // // // // // // // //   //                         <Typography variant="body1" sx={{ mb: 1 }}>
// // // // // // // // //   //                           <FaPlaneArrival style={{ marginRight: 4 }} />
// // // // // // // // //   //                           Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
// // // // // // // // //   //                         </Typography>
// // // // // // // // //   //                         <Typography variant="body1" sx={{ mb: 1 }}>
// // // // // // // // //   //                           <FaDollarSign style={{ marginRight: 4 }} />
// // // // // // // // //   //                           Price: {flight.priceInZar} ZAR
// // // // // // // // //   //                         </Typography>
// // // // // // // // //   //                         <Typography variant="body2" sx={{ mb: 1 }}>
// // // // // // // // //   //                           Cabin: {flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
// // // // // // // // //   //                         </Typography>
// // // // // // // // //   //                         <Typography variant="body2" sx={{ mb: 2 }}>
// // // // // // // // //   //                           Carrier: {flight.itineraries[0].segments[0].carrierCode}
// // // // // // // // //   //                         </Typography>
// // // // // // // // //   //                         <Button 
// // // // // // // // //   //                           sx={{
// // // // // // // // //   //                             backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? "purple" : "#1769aa",
// // // // // // // // //   //                             color: "white",
// // // // // // // // //   //                             '&:hover': {
// // // // // // // // //   //                               backgroundColor: selectedFlights.some((f) => f.id === flight.id) ? '#570987' : '#005f9e',
// // // // // // // // //   //                             },
// // // // // // // // //   //                             transition: 'background-color 0.3s ease',
// // // // // // // // //   //                           }} 
// // // // // // // // //   //                           variant="contained"
// // // // // // // // //   //                         >   
// // // // // // // // //   //                           {selectedFlights.some((f) => f.id === flight.id) ? "Remove from Itinerary" : "Add to Itinerary"}
// // // // // // // // //   //                         </Button>
// // // // // // // // //   //                       </CardContent>
// // // // // // // // //   //                     </Card>
// // // // // // // // //   //                   </Grid>
// // // // // // // // //   //                 ))}
// // // // // // // // //   //                 </Grid>
// // // // // // // // //   //               </>
// // // // // // // // //   //             )}
// // // // // // // // //   //           </Grid>

// // // // // // // // //   //           <Button marginTop="50px" padding="20px" variant="outlined" onClick={() => setShowFlightSearch(false)}>
// // // // // // // // //   //             Done
// // // // // // // // //   //           </Button>
// // // // // // // // //   //         </>
// // // // // // // // //   //       )}

// // // // // // // // //   //       <h2 style={{marginTop: "50px"}}>Selected Flights</h2>
// // // // // // // // //   //       <Grid container spacing={2}>
// // // // // // // // //   //         {selectedFlights.map((flight, index) => (
// // // // // // // // //   //           <Grid item xs={12} sm={6} md={4} key={index}>
// // // // // // // // //   //             <Card>
// // // // // // // // //   //               <CardContent>
// // // // // // // // //   //                 <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
// // // // // // // // //   //                   <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
// // // // // // // // //   //                 </Typography>
// // // // // // // // //   //                 <Typography variant="body1">
// // // // // // // // //   //                   Price: {flight.priceInZar} ZAR
// // // // // // // // //   //                 </Typography>
// // // // // // // // //   //               </CardContent>
// // // // // // // // //   //             </Card>
// // // // // // // // //   //           </Grid>
// // // // // // // // //   //         ))}
// // // // // // // // //   //       </Grid>
// // // // // // // // //   //     </Box>
// // // // // // // // //   //   </Box>
// // // // // // // // //   // );


import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert, Checkbox, FormControlLabel, Slider } from "@mui/material";
import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign, FaClock } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import { IoAirplaneSharp } from 'react-icons/io5';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase-config";
import { collection, getFirestore, query as firestoreQuery, where, getDocs, setDoc, doc } from "firebase/firestore";

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
  const [addMoreFlights, setAddMoreFlights] = useState(false); //  To handle adding more flights
  const [tripDays, setTripDays] = useState(1);
  const [budgetRange, setBudgetRange] = useState([1000, 10000]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

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

      const departureFlights = await getFlightOffers(startLocation, endLocation, departureDate, 1, 12);
      setFlights(departureFlights);

      if (returnFlight && returnDate) {
        const returnFlightResults = await getFlightOffers(endLocation, startLocation, returnDate, 1, 12);
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

  const handleDone = () => {
    setShowFlightSearch(false);
    setAddMoreFlights(true);  // Enable adding more flights
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
      'SA': 'South African Airways',
      'MN': 'Kulula.com',
      '4Z': 'Airlink',
      'FA': 'FlySafair',
      'BA': 'British Airways (operated by Comair)',
    };
    return airlineMap[carrierCode] || carrierCode;
  };

  return (
    <Box alignItems="center" alignContent="center" marginLeft="280px">
      <Box margin="20px">
        <h1 style={{ marginLeft: "-40px", marginTop: "-10px" }}>Itinerary Form</h1>
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
        <Button variant="outlined" onClick={() => setShowFlightSearch(true)} fullWidth>
          + Add a Flight
        </Button>

        {showFlightSearch && (
          <>
            <TextField label="Departure Date" type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <FormControlLabel control={<Checkbox checked={returnFlight} onChange={(e) => setReturnFlight(e.target.checked)} />} label="Return Flight" />
            {returnFlight && (
              <TextField label="Return Date" type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            )}
            <Button onClick={handleSearchFlights} variant="contained" color="primary">Search Flights</Button>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
              <h2>Departure Flights</h2>
              <Grid container spacing={2} sx={{ marginTop: "1rem", marginBottom: "15px" }}>
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
                          padding: "8px", borderColor: selectedFlights.some(
                            (f) => f.id === flight.id,
                          )
                            ? "primary.main"
                            : "grey.300",
                        }}
                        onClick={() => handleFlightToggle(flight)} >
                        <CardContent>
                          <Typography align="center" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
                          </Typography>

                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                            <FaClock style={{ color: "#ff9800", marginRight: 4 }} />
                            Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                            <FaPlaneArrival style={{ color: "#2196f3", marginRight: 4 }} />
                            Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                            <FcClock style={{ color: "#1976d2", marginRight: 4 }} />
                            Duration: {flight.itineraries[0].duration}
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                            <IoAirplaneSharp style={{ color: "#4caf50", marginRight: 4 }} />
                            Airline: {getAirlineName(flight.itineraries[0].segments[0].carrierCode)}
                          </Typography>
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -1, fontSize: '15.5px' }}>
                            <FaDollarSign style={{ color: "#f44336", marginRight: 4 }} />
                            Price: {flight.priceInZar} ZAR
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{

                              marginTop: "10px",
                              backgroundColor:
                                selectedFlights.some(
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
                            padding: "8px", borderColor: selectedFlights.some(
                              (f) => f.id === flight.id,
                            )
                              ? "primary.main"
                              : "grey.300",
                          }}
                          onClick={() => handleFlightToggle(flight)} ><CardContent>
                            <Typography align="center" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                              <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
                            </Typography>

                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                              <FaClock style={{ color: "#ff9800", marginRight: 4 }} />
                              Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                              <FaPlaneArrival style={{ color: "#2196f3", marginRight: 4 }} />
                              Arrival: {flight.itineraries[0].segments[0].arrival.at.split("T")[1]}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                              <FcClock style={{ color: "#1976d2", marginRight: 4 }} />
                              Duration: {flight.itineraries[0].duration}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -3, fontSize: '15.5px' }}>
                              <IoAirplaneSharp style={{ color: "#4caf50", marginRight: 4 }} />
                              Airline: {getAirlineName(flight.itineraries[0].segments[0].carrierCode)}
                            </Typography>
                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -1, fontSize: '15.5px' }}>
                              <FaDollarSign style={{ color: "#f44336", marginRight: 4 }} />
                              Price: {flight.priceInZar} ZAR
                            </Typography>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{

                                marginTop: "10px",
                                backgroundColor:
                                  selectedFlights.some(
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
            <Button onClick={handleDone} variant="contained" color="primary" sx={{ marginTop: "20px" }}>
              Done
            </Button>
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
                      <Typography align="center" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        <FaPlaneDeparture /> {flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2 }}>
                        <FaClock style={{ color: "#ff9800", marginRight: 4 }} />
                        Departure: {flight.itineraries[0].segments[0].departure.at.split("T")[1]}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2 }}>
                        <IoAirplaneSharp style={{ color: "#1976d2", marginRight: 4 }} />
                        Duration: {flight.itineraries[0].duration}
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: -2 }}>
                        <FaDollarSign style={{ color: "#4caf50", marginRight: 4 }} />
                        Price: {flight.price.total} {flight.price.currency} ({flight.priceInZar ? `ZAR ${flight.priceInZar}` : "Conversion unavailable"})
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        Airline: {getAirlineName(flight.itineraries[0].segments[0].carrierCode)}
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
          <Button onClick={() => setShowFlightSearch(true)} variant="outlined" color="primary" sx={{ marginTop: "20px" }}>
            + Add More Flights
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ItineraryForm;
