import React, { useState } from "react";
import Sidebar from "./sidebar";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  MenuItem,
  TextField,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";

const convertPriceToZar = (price, fromCurrency) => {
  if (fromCurrency === "EUR") {
    const exchangeRate = 19.21;
    return price * exchangeRate;
  } else {
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

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const flightData = await searchResponse.json();
    for (const flight of flightData.data) {
      const originalPrice = parseFloat(flight.price.total);
      const fromCurrency = flight.price.currency;
      const priceInZar = await convertPriceToZar(originalPrice, fromCurrency);
      flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
    }

    return flightData.data;
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return null;
  }
};

const Flights = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchFlights = async () => {
    if (origin && destination && departureDate) {
      if (origin === destination) {
        setErrorMessage("Origin and destination cannot be the same.");
        return;
      }
      setErrorMessage(""); // Clear any previous errors

      const flightOffers = await getFlightOffers(
        origin,
        destination,
        departureDate,
        1,
        9,
      );
      if (flightOffers) {
        setFlights(flightOffers);
      } else {
        console.log("No flight offers available.");
      }
    }
  };

  // Predefined South African airport codes
  const airportOptions = [
    { label: "Durban (DUR)", code: "DUR" },
    { label: "Cape Town (CPT)", code: "CPT" },
    { label: "Johannesburg (JNB)", code: "JNB" },
    { label: "Port Elizabeth (PLZ)", code: "PLZ" },
    { label: "East London (ELS)", code: "ELS" },
    { label: "Lanseria (HLA)", code: "HLA" },
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <Box className="content" sx={{ padding: "2rem" }}>
        <h1>Flight Offers</h1>

        {/* Search Form */}
        <Box
          mb={5}
          p={2}
          border={1}
          borderColor="grey.300"
          borderRadius="8px"
          sx={{ marginBottom: "2rem" }}
        >
          <TextField
            select
            label="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            sx={{ marginRight: "1rem", minWidth: "200px" }}
          >
            {airportOptions.map((option) => (
              <MenuItem key={option.code} value={option.code}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            sx={{ marginRight: "1rem", minWidth: "200px" }}
          >
            {airportOptions.map((option) => (
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
            sx={{ marginRight: "1rem" }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchFlights}
            disabled={!origin || !destination || !departureDate}
          >
            Search Flights
          </Button>

          {/* Error Message */}
          {errorMessage && (
            <Box sx={{ marginTop: "1rem" }}>
              <Alert severity="error">{errorMessage}</Alert>
            </Box>
          )}
        </Box>

        {/* Flight Results */}
        <Grid container spacing={2}>
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
                  className="card-flight"
                  sx={{
                    backgroundColor: isDarkMode ? "#424242" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    minHeight: "200px",
                  }}
                >
                  <CardContent>
                    <h2>
                      <FaPlaneDeparture
                        style={{
                          marginRight: "8px",
                          color: isDarkMode ? "#90caf9" : "#1976d2",
                        }}
                      />
                      {firstSegment.departure.iataCode} to{" "}
                      {lastSegment.arrival.iataCode}
                    </h2>
                    <Typography>
                      <FaPlaneArrival
                        style={{
                          marginRight: "8px",
                          color: isDarkMode ? "#90caf9" : "#1976d2",
                        }}
                      />
                      Departure: {departureTime} | Arrival: {arrivalTime}
                    </Typography>
                    {/* <Typography>Carrier Code: {carrierCode}</Typography> */}
                    <Typography>
                      <FaDollarSign
                        style={{
                          marginRight: "8px",
                          color: isDarkMode ? "#ffd700" : "#ffb300",
                        }}
                      />
                      Total Price: {totalPrice} {flight.price.currency} |{" "}
                      {totalPriceInZar} ZAR
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default Flights;

// import React, { useState, useEffect } from "react";
// import Sidebar from "./sidebar";
// import { Card, CardContent, Typography, Box, Grid, Button, MenuItem, TextField, Select, InputLabel, FormControl } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

// const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
// const client_secret = "RGeFEPqnTMNFKNjd";

// const convertPriceToZar = (price, fromCurrency) => {
//   if (fromCurrency === "EUR") {
//     const exchangeRate = 19.21; // Example rate
//     return price * exchangeRate;
//   } else {
//     return null;
//   }
// };

// const getFlightOffers = async (originLocation, destinationLocation, departureDate, adults, maxOffers) => {
//   const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

//   try {
//     const tokenResponse = await fetch(tokenUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
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
//       originLocationCode: originLocation,
//       destinationLocationCode: destinationLocation,
//       departureDate: departureDate,
//       adults: adults.toString(),
//       max: maxOffers.toString(),
//     };

//     Object.keys(params).forEach((key) =>
//       searchUrl.searchParams.append(key, params[key])
//     );

//     const searchResponse = await fetch(searchUrl.toString(), {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const flightData = await searchResponse.json();

//     for (const flight of flightData.data) {
//       const originalPrice = parseFloat(flight.price.total);
//       const fromCurrency = flight.price.currency;
//       const priceInZar = await convertPriceToZar(originalPrice, fromCurrency);
//       flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
//     }

//     return flightData.data;
//   } catch (error) {
//     console.error("Error fetching flight offers:", error);
//     return null;
//   }
// };

// const Flights = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const [flights, setFlights] = useState([]);
//   const [sortOption, setSortOption] = useState("");
//   const [airlineFilter, setAirlineFilter] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const flightOffers = await getFlightOffers("JNB", "CPT", "2024-08-13", 1, 10);
//         if (flightOffers) {
//           setFlights(flightOffers);
//         }
//       } catch (error) {
//         console.error("Error fetching flight data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Sorting flights based on selected option
//   const sortedFlights = () => {
//     let sortedArray = [...flights];
//     if (sortOption === "priceAsc") {
//       sortedArray.sort((a, b) => a.price.total - b.price.total);
//     } else if (sortOption === "priceDesc") {
//       sortedArray.sort((a, b) => b.price.total - a.price.total);
//     } else if (sortOption === "departureAsc") {
//       sortedArray.sort((a, b) => new Date(a.itineraries[0].segments[0].departure.at) - new Date(b.itineraries[0].segments[0].departure.at));
//     } else if (sortOption === "departureDesc") {
//       sortedArray.sort((a, b) => new Date(b.itineraries[0].segments[0].departure.at) - new Date(a.itineraries[0].segments[0].departure.at));
//     } else if (sortOption === "arrivalAsc") {
//       sortedArray.sort((a, b) => new Date(a.itineraries[0].segments[0].arrival.at) - new Date(b.itineraries[0].segments[0].arrival.at));
//     } else if (sortOption === "arrivalDesc") {
//       sortedArray.sort((a, b) => new Date(b.itineraries[0].segments[0].arrival.at) - new Date(a.itineraries[0].segments[0].arrival.at));
//     }
//     return sortedArray;
//   };

//   // Filtering flights based on selected filters
//   const filteredFlights = () => {
//     let filteredArray = sortedFlights();
//     if (airlineFilter) {
//       filteredArray = filteredArray.filter(flight => flight.itineraries[0].segments[0].carrierCode === airlineFilter);
//     }
//     if (minPrice) {
//       filteredArray = filteredArray.filter(flight => parseFloat(flight.price.total) >= parseFloat(minPrice));
//     }
//     if (maxPrice) {
//       filteredArray = filteredArray.filter(flight => parseFloat(flight.price.total) <= parseFloat(maxPrice));
//     }
//     return filteredArray;
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <Box className="content" sx={{ padding: "2rem" }}>
//         <h1>Flight Offers</h1>

//         {/* Sorting */}
//         <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
//           <InputLabel>Sort by</InputLabel>
//           <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
//             <MenuItem value="priceAsc">Price: Low to High</MenuItem>
//             <MenuItem value="priceDesc">Price: High to Low</MenuItem>
//             <MenuItem value="departureAsc">Departure Time: Earliest</MenuItem>
//             <MenuItem value="departureDesc">Departure Time: Latest</MenuItem>
//             <MenuItem value="arrivalAsc">Arrival Time: Earliest</MenuItem>
//             <MenuItem value="arrivalDesc">Arrival Time: Latest</MenuItem>
//           </Select>
//         </FormControl>

//         {/* Filtering */}
//         <TextField
//           label="Airline Code (e.g. BA)"
//           variant="outlined"
//           value={airlineFilter}
//           onChange={(e) => setAirlineFilter(e.target.value)}
//           sx={{ marginRight: 2 }}
//         />
//         <TextField
//           label="Min Price"
//           type="number"
//           variant="outlined"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           sx={{ marginRight: 2 }}
//         />
//         <TextField
//           label="Max Price"
//           type="number"
//           variant="outlined"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           sx={{ marginRight: 2 }}
//         />

//         {/* Flight List */}
//         <Grid container spacing={2}>
//           {filteredFlights().map((flight, index) => {
//             const { segments } = flight.itineraries[0];
//             const firstSegment = segments[0];
//             const lastSegment = segments[segments.length - 1];
//             const departureTime = firstSegment.departure.at.split("T")[1];
//             const arrivalTime = lastSegment.arrival.at.split("T")[1];
//             const carrierCode = firstSegment.carrierCode;
//             const totalPrice = flight.price.total;
//             const totalPriceInZar = flight.priceInZar;

//             return (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card
//                   className="card-flight"
//                   sx={{
//                     backgroundColor: isDarkMode ? "#424242" : "#f5f5f5",
//                     color: isDarkMode ? "#ffffff" : "#000000",
//                     boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//                     borderRadius: "8px",
//                     transition: "transform 0.3s, box-shadow 0.3s",
//                     "&:hover": {
//                       transform: "scale(1.02)",
//                       boxShadow: "0 6px 15px rgba(25, 118, 210, 0.5)",
//                     },
//                     minHeight: "180px",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h6">
//                       {carrierCode} Flight - {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
//                     </Typography>
//                     <Typography variant="body1">
//                       Departure: {departureTime} | Arrival: {arrivalTime}
//                     </Typography>
//                     <Typography variant="body1">
//                       Price: {totalPrice} EUR (~R{totalPriceInZar})
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Box>
//     </div>
//   );
// };

// export default Flights;
