import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";

// Function to get flight offers
// const fetchExchangeRate = async (fromCurrency, toCurrency) => {
//   const exchangeRateApiKey = 'YOUR_EXCHANGERATE_API_KEY'; // Replace with your ExchangeRate-API key
//   const exchangeRateUrl = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/${fromCurrency}`;

//   try {
//       const response = await fetch(exchangeRateUrl);
//       if (!response.ok) {
//           throw new Error(`Failed to fetch exchange rate: ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Exchange rate data:', data); // Debugging line

//       const rate = data.conversion_rates[toCurrency];
//       if (!rate) {
//           throw new Error(`Exchange rate for ${toCurrency} not found`);
//       }

//       return rate;
//   } catch (error) {
//       console.error('Error fetching exchange rate:', error);
//       return null;
//   }
// };

// const convertPriceToZar = async (price, fromCurrency) => {
//   const exchangeRate = await fetchExchangeRate(fromCurrency, 'ZAR');
//   console.log(`Exchange rate for ${fromCurrency} to ZAR:`, exchangeRate); // Debugging line

//   if (exchangeRate) {
//       const priceInZar = price * exchangeRate;
//       console.log(`Converted price: ${price} ${fromCurrency} = ${priceInZar} ZAR`); // Debugging line
//       return priceInZar;
//   } else {
//       console.error('Failed to fetch exchange rate for ZAR');
//       return null;
//   }
// };
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

// React component to display flight offers

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
          "2024-08-16",
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
    //integrate/FlightData
    <div className="dashboard">
      <Sidebar />
      <Box className="content" sx={{ padding: "2rem" }}>
        <h1>Flights</h1>
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
            <Card
              key={index}
              className="card-flight"
              sx={{
                backgroundColor: isDarkMode ? "#666666 " : "#b4c5e4",
                color: isDarkMode ? "#FFFFFF" : "#000000",
                marginBottom: "1rem",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h2">
                  {firstSegment.departure.iataCode} to{" "}
                  {lastSegment.arrival.iataCode}
                </Typography>
                <Typography variant="body1">
                  Departure: {departureTime} | Arrival: {arrivalTime}
                </Typography>
                <Typography variant="body1">
                  Carrier Code: {carrierCode}
                </Typography>
                <Typography variant="body1">
                  Total Price: {totalPrice} {flight.price.currency} |{" "}
                  {totalPriceInZar} ZAR
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default Flights;
