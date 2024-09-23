import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

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

const Flights = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flightOffers = await getFlightOffers(
          "DUR",
          "CPT",
          "2024-08-13",
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
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <Box className="content" sx={{ padding: "2rem" }}>
        <h1>Flight Offers</h1>
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
                    backgroundColor: isDarkMode ? "#424242" : "#f5f5f5",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 6px 15px rgba(25, 118, 210, 0.5)",
                    },
                    minHeight: "200px", // Ensures consistent card height
                  }}
                >
                  <CardContent>
                    <h2 sx={{ display: "flex", alignItems: "center" }}>
                      <FaPlaneDeparture style={{ marginRight: "8px", color: isDarkMode ? "#90caf9" : "#1976d2" }} />
                      {firstSegment.departure.iataCode} to{" "}
                      {lastSegment.arrival.iataCode}
                    </h2>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                      <FaPlaneArrival style={{ marginRight: "8px", color: isDarkMode ? "#90caf9" : "#1976d2" }} />
                      Departure: {departureTime} | Arrival: {arrivalTime}
                    </Typography>
                    <Typography variant="body1">
                      Carrier Code: {carrierCode}
                    </Typography>
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                      <FaDollarSign style={{ marginRight: "8px", color: isDarkMode ? "#ffd700" : "#ffb300" }} />
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
