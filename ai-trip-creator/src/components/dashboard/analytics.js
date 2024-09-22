import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Drawer,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "./sidebar";
import "./dashboard.css";

const travelTrendsData = [
    {
      title: "Eco-Tourism",
      image:
        "https://www.ith.org.za/wp-content/uploads/2018/05/ITHSA-BLOG.png",
    },
    {
      title: "Adventure Travel",
      image:
      "https://images2.goabroad.com/image/upload/v1/images2/program_content/prime-how-to-choose-the-best-adventure-travel-tour-companies-1504752924.jpg",
    },
    {
      title: "Cultural Trips",
      image:
        "https://www.bikehike.com/sites/default/files/styles/banner/public/blog/Rectangle%2021.jpg?itok=71yMn12f",
    },
    {
      title: "Solo Travel",
      image:
        "https://capetownguy.co.za/wp-content/uploads/2024/07/Solo-Travel.jpeg",
    },
    {
      title: "Luxury Travel",
      image:
        "https://images.squarespace-cdn.com/content/v1/52e72f94e4b001f05e5e6d22/1697074562431-CV14C5LGBBTMJ6HHU2X2/Miavana-Piazza-32-Pool.jpg",
    },
  ];
  
  const popularDestinationsData = [
    {
      title: "Paris, France",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg",
    },
    {
      title: "Kyoto, Japan",
      image:
        "https://www.pelago.co/img/destinations/kyoto/1129-0642_kyoto.jpg",
    },
    {
      title: "New York, USA",
      image:
        "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
    },
    {
      title: "Rome, Italy",
      image:
        "https://media.timeout.com/images/105212586/750/562/image.jpg",
    },
    {
      title: "Sydney, Australia",
      image:
        "https://www.pelago.co/img/destinations/sydney/hero-image-xlarge.jpg",
    },
  ];

const Analytics = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  // States for Travel Trends and Popular Destinations Slideshows
  const [currentTrendIndex, setCurrentTrendIndex] = useState(0);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

  // Automatic slideshow effect with timers
  useEffect(() => {
    const trendInterval = setInterval(() => {
      setCurrentTrendIndex((prevIndex) => (prevIndex + 1) % travelTrendsData.length);
    }, 3000); // Slide changes every 3 seconds

    const destinationInterval = setInterval(() => {
      setCurrentDestinationIndex((prevIndex) => (prevIndex + 1) % popularDestinationsData.length);
    }, 3000);

    return () => {
      clearInterval(trendInterval);
      clearInterval(destinationInterval);
    };
  }, []);

  return (
    <Box display="flex">
      <Drawer
        variant={isSmUp ? "permanent" : "temporary"}
        open={true}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        <Sidebar />
      </Drawer>
      <Box
        flexGrow={1}
        p={3}
        sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
      >
        <Container maxWidth="lg">
          <h1>Analytics Dashboard</h1>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Analytics
          </Typography>

          <Grid container spacing={3}>
            {/* Travel Trends Slideshow */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
              >
                <Typography variant="h6" gutterBottom>
                  Travel Trends
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    src={travelTrendsData[currentTrendIndex].image}
                    alt={travelTrendsData[currentTrendIndex].title}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="body1" mt={2}>
                    {travelTrendsData[currentTrendIndex].title}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Popular Destinations Slideshow */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
              >
                <Typography variant="h6" gutterBottom>
                  Popular Destinations
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    src={popularDestinationsData[currentDestinationIndex].image}
                    alt={popularDestinationsData[currentDestinationIndex].title}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="body1" mt={2}>
                    {popularDestinationsData[currentDestinationIndex].title}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Analytics;
