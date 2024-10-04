// import React, { useState, useEffect } from "react";
// import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert } from "@mui/material";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../../firebase/firebase-config";
// import { collection, getFirestore, query as firestoreQuery, where, getDocs, setDoc, doc } from "firebase/firestore";
// import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

// // Amadeus API details and helper functions
// const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
// const client_secret = "RGeFEPqnTMNFKNjd";

// const convertPriceToZar = (price, fromCurrency) => {
//   const exchangeRate = 19.21; // EUR to ZAR exchange rate example
//   return fromCurrency === "EUR" ? price * exchangeRate : null;
// };

// const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
//   const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

//   try {
//     const tokenResponse = await fetch(tokenUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: client_id,
//         client_secret: client_secret,
//         grant_type: "client_credentials",
//       }),
//     });

//     const tokenData = await tokenResponse.json();
//     const accessToken = tokenData.access_token;

//     const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
//     const params = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate: departureDate,
//       adults: adults.toString(),
//       max: maxOffers.toString(),
//     };
//     Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

//     const searchResponse = await fetch(searchUrl.toString(), {
//       method: "GET",
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const flightData = await searchResponse.json();
//     for (const flight of flightData.data) {
//       const originalPrice = parseFloat(flight.price.total);
//       const priceInZar = convertPriceToZar(originalPrice, flight.price.currency);
//       flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
//     }

//     return flightData.data;
//   } catch (error) {
//     console.error("Error fetching flight offers:", error);
//     return null;
//   }
// };

// function ItineraryForm() {
//   const [step, setStep] = useState(1);
//   const [itineraryName, setItineraryName] = useState("");
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [flights, setFlights] = useState([]);
//   const [selectedFlights, setSelectedFlights] = useState([]);
//   const [accommodations, setAccommodations] = useState([]);
//   const [selectedAccommodations, setSelectedAccommodations] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [selectedActivities, setSelectedActivities] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch user ID (UID)
//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       }
//     });
//   }, []);

//   // Predefined South African airport codes
//   const airportOptions = [
//     { label: "Durban (DUR)", code: "DUR" },
//     { label: "Cape Town (CPT)", code: "CPT" },
//     { label: "Johannesburg (JNB)", code: "JNB" },
//     { label: "Port Elizabeth (PLZ)", code: "PLZ" },
//     { label: "East London (ELS)", code: "ELS" },
//     { label: "Lanseria (HLA)", code: "HLA" },
//   ];

//   // Handle flight search
//   const handleSearchFlights = async () => {
//     if (startLocation && endLocation && departureDate) {
//       if (startLocation === endLocation) {
//         setErrorMessage("Origin and destination cannot be the same.");
//         return;
//       }
//       setErrorMessage("");

//       const flightOffers = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
//       if (flightOffers) {
//         setFlights(flightOffers);
//       } else {
//         console.log("No flight offers available.");
//       }
//     }
//   };

//   // Fetch accommodations and activities from Firestore
//   const fetchActivitiesAndAccommodations = async (location) => {
//     setLoading(true);
//     try {
//       const db = getFirestore();

//       // Fetch accommodations
//       const accommodationsRef = collection(db, "Accommodation");
//       const accommodationsQuery = firestoreQuery(accommodationsRef, where("city", "==", location));
//       const accommodationsSnapshot = await getDocs(accommodationsQuery);
//       const accommodationsResults = [];
//       accommodationsSnapshot.forEach(doc => accommodationsResults.push(doc.data()));
//       setAccommodations(accommodationsResults);

//       // Fetch activities
//       const activitiesRef = collection(db, "Activities");
//       const activitiesQuery = firestoreQuery(activitiesRef, where("city", "==", location));
//       const activitiesSnapshot = await getDocs(activitiesQuery);
//       const activitiesResults = [];
//       activitiesSnapshot.forEach(doc => activitiesResults.push(doc.data()));
//       setActivities(activitiesResults);
//     } catch (error) {
//       console.error("Error fetching accommodations and activities:", error);
//       setError("Failed to fetch data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle accommodation selection
//   const handleAccommodationSelection = (accommodationId) => {
//     setSelectedAccommodations((prev) =>
//       prev.includes(accommodationId) ? prev.filter((id) => id !== accommodationId) : [...prev, accommodationId]
//     );
//   };

//   // Handle activity selection
//   const handleActivitySelection = (activityId) => {
//     setSelectedActivities((prev) =>
//       prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
//     );
//   };

//   // Save the itinerary to Firebase
//   const handleSubmit = async () => {
//     const itineraryData = {
//       itineraryName,
//       startLocation,
//       endLocation,
//       flights: selectedFlights,
//       accommodations: selectedAccommodations,
//       activities: selectedActivities,
//       userId,
//     };

//     await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

//     console.log("Itinerary saved to Firebase", itineraryData);
//   };

//   // Handle moving between steps
//   const handleNextStep = () => setStep((prev) => prev + 1);
//   const handlePreviousStep = () => setStep((prev) => prev - 1);

//   return (
//     <Box marginLeft="300px" alignContent="center" alignItems="center">
//       <Box>
//         {step === 1 && (
//           <>
//             <h2>Step 1: Itinerary Details and Flights</h2>
//             <TextField
//               label="Itinerary Name"
//               value={itineraryName}
//               onChange={(e) => setItineraryName(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               select
//               label="Start Location"
//               value={startLocation}
//               onChange={(e) => setStartLocation(e.target.value)}
//               fullWidth
//               margin="normal"
//             >
//               {airportOptions.map((option) => (
//                 <MenuItem key={option.code} value={option.code}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               select
//               label="End Location"
//               value={endLocation}
//               onChange={(e) => setEndLocation(e.target.value)}
//               fullWidth
//               margin="normal"
//             >
//               {airportOptions.filter((loc) => loc.code !== startLocation).map((option) => (
//                 <MenuItem key={option.code} value={option.code}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <TextField
//               label="Departure Date"
//               type="date"
//               value={departureDate}
//               onChange={(e) => setDepartureDate(e.target.value)}
//               fullWidth
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//             />

//             <Button variant="contained" color="primary" onClick={handleSearchFlights} disabled={!startLocation || !
// endLocation || !departureDate}>
// Search Flights
// </Button>

// {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

// <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
// {flights.map((flight, index) => {
//   const firstSegment = flight.itineraries[0].segments[0];
//   const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

//   return (
//     <Grid item xs={12} sm={6} md={4} key={index}>
//       <Card
//         onClick={() => setSelectedFlights((prev) =>
//           prev.includes(flight.id) ? prev.filter((id) => id !== flight.id) : [...prev, flight.id]
//         )}
//         sx={{
//           cursor: "pointer",
//           backgroundColor: selectedFlights.includes(flight.id) ? "#d1e7dd" : "white",
//         }}
//       >
//         <CardContent>
//           <Typography>
//             <FaPlaneDeparture /> {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
//           </Typography>
//           <Typography>
//             <FaPlaneArrival /> Departure: {firstSegment.departure.at.split("T")[1]} | Arrival: {lastSegment.arrival.at.split("T")[1]}
//           </Typography>
//           <Typography>
//             <FaDollarSign /> {flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// })}
// </Grid>

// <Button onClick={handleNextStep} variant="contained" sx={{ marginTop: "2rem" }}>
// Next
// </Button>
// </>
// )}

// {step === 2 && (
// <>
// <h2>Step 2: Select Accommodations</h2>
// {loading ? (
// <Typography>Loading accommodations...</Typography>
// ) : (
// <Grid container spacing={2}>
//   {accommodations.map((accommodation) => (
//     <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
//       <Card
//         onClick={() => handleAccommodationSelection(accommodation.id)}
//         sx={{
//           cursor: "pointer",
//           backgroundColor: selectedAccommodations.includes(accommodation.id) ? "#d1e7dd" : "white",
//         }}
//       >
//         <CardContent>
//           <Typography>{accommodation.name}</Typography>
//           <Typography>{`Price: R${accommodation.price}/night`}</Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   ))}
// </Grid>
// )}
// <Button onClick={handlePreviousStep}>Back</Button>
// <Button onClick={handleNextStep} variant="contained">
// Next
// </Button>
// </>
// )}

// {step === 3 && (
// <>
// <h2>Step 3: Select Activities</h2>
// {loading ? (
// <Typography>Loading activities...</Typography>
// ) : (
// <Grid container spacing={2}>
//   {activities.map((activity) => (
//     <Grid item xs={12} sm={6} md={4} key={activity.id}>
//       <Card
//         onClick={() => handleActivitySelection(activity.id)}
//         sx={{
//           cursor: "pointer",
//           backgroundColor: selectedActivities.includes(activity.id) ? "#d1e7dd" : "white",
//         }}
//       >
//         <CardContent>
//           <Typography>{activity.name}</Typography>
//           <Typography>{activity.description}</Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   ))}
// </Grid>
// )}
// <Button onClick={handlePreviousStep}>Back</Button>
// <Button onClick={handleSubmit} variant="contained" color="primary">
// Submit Itinerary
// </Button>
// </>
// )}
// </Box>
// </Box>
// );
// }

// export default ItineraryForm;

import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert } from "@mui/material";
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
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodations, setSelectedAccommodations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Handle flight search
  const handleSearchFlights = async () => {
    if (startLocation && endLocation && departureDate) {
      if (startLocation === endLocation) {
        setErrorMessage("Origin and destination cannot be the same.");
        return;
      }
      setErrorMessage("");

      const flightOffers = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
      if (flightOffers) {
        setFlights(flightOffers);
      } else {
        console.log("No flight offers available.");
      }
    }
  };

  // Fetch accommodations and activities based on all flight end locations
  const fetchActivitiesAndAccommodations = async (endLocations) => {
    setLoading(true);
    try {
      const db = getFirestore();

      // Fetch accommodations for all end locations
      const accommodationResults = [];
      for (const location of endLocations) {
        const accommodationsRef = collection(db, "Accommodation");
        const accommodationsQuery = firestoreQuery(accommodationsRef, where("city", "==", location));
        const accommodationsSnapshot = await getDocs(accommodationsQuery);
        accommodationsSnapshot.forEach(doc => accommodationResults.push(doc.data()));
      }
      setAccommodations(accommodationResults);

      // Fetch activities for all end locations
      const activityResults = [];
      for (const location of endLocations) {
        const activitiesRef = collection(db, "Activities");
        const activitiesQuery = firestoreQuery(activitiesRef, where("city", "==", location));
        const activitiesSnapshot = await getDocs(activitiesQuery);
        activitiesSnapshot.forEach(doc => activityResults.push(doc.data()));
      }
      setActivities(activityResults);
    } catch (error) {
      console.error("Error fetching accommodations and activities:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add flights to the list and fetch accommodations and activities based on the selected flights
  const handleAddFlight = (flight) => {
    setSelectedFlights((prev) => [...prev, flight]);
    const endLocations = [...new Set([...selectedFlights.map(f => f.endLocation), flight.endLocation])];
    fetchActivitiesAndAccommodations(endLocations);
  };

  // Handle accommodation selection
  const handleAccommodationSelection = (accommodationId) => {
    setSelectedAccommodations((prev) =>
      prev.includes(accommodationId) ? prev.filter((id) => id !== accommodationId) : [...prev, accommodationId]
    );
  };

  // Handle activity selection
  const handleActivitySelection = (activityId) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

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

    await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

    console.log("Itinerary saved to Firebase", itineraryData);
  };

  // Handle moving between steps
  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

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
              onChange={(e) => setEndLocation(e.target.value)}
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

                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      onClick={() => handleAddFlight(flight)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: selectedFlights.includes(flight) ? "#d1e7dd" : "white",
                      }}
                    >
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
                        <img src={accommodation.image} alt={accommodation.name} style={{ maxWidth: '100%', height: '150px' }} />
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
            <h2>Step 3: Select Activities</h2>
            {loading ? (
              <Typography>Loading activities...</Typography>
            ) : (
              <Grid container spacing={2}>
                {activities.map((activity) => (
                  <Grid item xs={12} sm={6} md={4} key={activity.name}>
                    <Card
                      onClick={() => handleActivitySelection(activity.name)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: selectedActivities.includes(activity.name) ? "#d1e7dd" : "white",
                      }}
                    >
                      <CardContent>
                        <Typography>{activity.name}</Typography>
                        <Typography>{activity.description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <Button onClick={handlePreviousStep}>Back</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit Itinerary
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ItineraryForm;
