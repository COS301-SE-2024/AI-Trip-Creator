import React, { useState } from "react";
import {  ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Grid,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@mui/material";
import { useTheme, createTheme } from "@mui/material/styles";
import Login from "../auth/login";
import Signup from "../auth/signup";
import {
  FaSearchLocation,
  FaRegCalendarAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { AiOutlineStar, AiOutlineMenu } from "react-icons/ai";
import getLPTheme  from "./getLPTheme";
import { Link } from "react-scroll";
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    body1: {
      fontFamily: "Roboto, sans-serif",
    },
  },
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#ffb74d",
    },
    text: {
      primary: "#333",
      secondary: "#777",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          fontSize: "16px",
          padding: "10px 20px",
        },
      },
    },
  },
});

const reviews = [
  {
    date: "10/06/2021",
    content:
      "The Trip Creator App Is Incredible. One of the most useful Travel sites I have come across recently!",
    author: "Green S",
  },
  {
    date: "12/07/2021",
    content:
      "Amazing Experience. Had a wonderful trip planned through Trip Creator!",
    author: "John D",
  },
  // Add more reviews as needed
];



const images = [
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
  "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
];

const ReviewCard = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const goToNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const currentReview = reviews[currentReviewIndex];


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "10px",
        width: "100%",
        position: "relative",
        padding: "1.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        sx={{ color: "black" }}
        variant="h5"
        component="div"
        gutterBottom
      >
        Excellent 4.6/5
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        {[...Array(4)].map((_, index) => (
          <Box key={index} sx={{ color: "#ffd700" }}>
            ★
          </Box>
        ))}
        <Box sx={{ color: "#ccc" }}>★</Box>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {currentReview.content}
      </Typography>
      <p>
        {currentReview.author} ~ {currentReview.date}
      </p>
      <Box sx={{ display: "flex", mt: 2 }}>
        <Button
          onClick={goToPreviousReview}
          sx={{
            color: "white",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
            minWidth: "40px",
            minHeight: "40px",
            mr: 2,
            "& svg": { fontSize: "20px" },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Button>
        <Button
          onClick={goToNextReview}
          sx={{
            color: "white",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
            minWidth: "40px",
            minHeight: "40px",
            "& svg": { fontSize: "20px" },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </Box>
    </Box>
  );
};

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: "1rem",
        position: "relative",
      }}
    >
      <Button
        onClick={goToPreviousImage}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
          color: "white",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
          "& svg": { fontSize: "20px" },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Button>

      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          width: "100%",
          maxWidth: "1000px",
          height: "500px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {images.map((image, index) => (
          <Slide
            key={index}
            direction={index === currentImageIndex ? "left" : "right"}
            in={index === currentImageIndex}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 800, exit: 500 }}
          >
            <Box
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </Slide>
        ))}
      </Box>

      <Button
        onClick={goToNextImage}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
          color: "white",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
          "& svg": { fontSize: "20px" },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Button>
    </Box>
  );
};

const SplashPage = ({ setIsLoggedIn }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const openLogin = () => setVisibleLogin(true);
  const closeLogin = () => setVisibleLogin(false);
  const openSignup = () => setVisibleSignup(true);
  const closeSignup = () => setVisibleSignup(false);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* Animated Heading */}
        <Box sx={{ textAlign: "center", py: 4, backgroundColor: "#f4f6f8" }}>
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontSize: "4rem",
                fontWeight: 700,
                lineHeight: 1.2,
                // color: theme.palette.primary.main,
                color: "#5A7BB8",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              AI Trip Creator
            </Typography>
          </Slide>
        </Box>

        {/* Floating and Sticky Navigation Bar */}
        <AppBar
          position="sticky"
          sx={{
            // backgroundColor: theme.palette.primary.main,
            backgroundColor: "white",
            top: 0,
            boxShadow: "none",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              // backgroundColor: theme.palette.primary.dark,
              backgroundColor: "#F0F0F0",
            },
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: "center" }}>
              <Link
                activeClass="active"
                to="hero"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Button sx={{ mx: 2, color: "#5A7BB8e" }}>Home</Button>
              </Link>
              <Link
                activeClass="active"
                to="howItWorks"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Button sx={{ mx: 2, color: "#5A7BB8e" }}>How It Works</Button>
              </Link>
              <Link
                activeClass="active"
                to="gallery"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Button sx={{ mx: 2, color: "#5A7BB8e" }}>Gallery</Button>
              </Link>
              <Link
                activeClass="active"
                to="reviews"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Button sx={{ mx: 2, color: "#5A7BB8e" }}>Reviews</Button>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        
        <Box
          id="hero"
          sx={{
            // backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')`,
            backgroundImage: `url(https://miro.medium.com/v2/resize:fit:1400/1*cGZF-4g_DbSgUsE3yjmphA.jpeg)`,
            backgroundSize: "cover",
            backgroundBlendMode: "saturation",
            backgroundPosition: "center",
            color: "white",
            textAlign: "center",
            py: 8,
            minHeight: "80vh",
          }}
        >
          <Container maxWidth="lg">
            {/* <Typography variant="h2" component="h1" gutterBottom>
              Plan Your Perfect Trip
            </Typography> */}
            <Typography sx = {{
              fontSize: "4rem",
              color: "white",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: "2rem",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}>
              Plan Your Perfect Trip
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 4, color: "white" }}>
              Discover new destinations, create your itinerary, and explore with
              ease.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={openSignup}
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={openLogin}
              sx = {{ 
                mr:2, 
                width:"120px", 
                "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 6px 10px #FFFFFF",
                    },
              }}
            >
              Login
            </Button>
          </Container>
        </Box>
        {visibleLogin && (
        <Dialog open={visibleLogin} onClose={closeLogin}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Login
              setIsLoggedIn={setIsLoggedIn}
              closeLogin={closeLogin}
              openSignup={openSignup}
            />
          </DialogContent>
        </Dialog>
      )}

      {visibleSignup && (
        <Dialog open={visibleSignup} onClose={closeSignup}>
          <DialogTitle>Signup</DialogTitle>
          <DialogContent>
            <Signup closeSignup={closeSignup} openLogin={openLogin} />
          </DialogContent>
        </Dialog>
      )}

      {(visibleLogin || visibleSignup) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 500,
          }}
          onClick={() => {
            closeLogin();
            closeSignup();
          }}
        />
      )}
        

        {/* How It Works Section */}
        <Box id="howItWorks" sx={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        <Container id="howItWorks" maxWidth="lg" sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <FaSearchLocation size={48} color={theme.palette.primary.main} />
                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                  Search
                </Typography>
                <Typography variant="body1">
                  Find your ideal trip by searching our extensive database of
                  destinations.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <FaRegCalendarAlt size={48} color={theme.palette.primary.main} />
                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                  Plan
                </Typography>
                <Typography variant="body1">
                  Organize your itinerary with our easy-to-use planning tools.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center", padding: 2 }}>
                <FaMapMarkedAlt size={48} color={theme.palette.primary.main} />
                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                  Explore
                </Typography>
                <Typography variant="body1">
                  Discover hidden gems and popular spots with expert
                  recommendations.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
        </Box>

        {/* Gallery Section */}
        <Box id="gallery" sx={{ minHeight: "100vh", backgroundColor: "#e3f2fd" }}>
        <Box id="gallery" sx={{ backgroundColor: "#f4f6f8", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Gallery
            </Typography>
            <ImageCarousel />
          </Container>
        </Box>
        </Box>

        {/* Reviews Section */}
        <Box id="reviews" sx={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
        <Box id="reviews" sx={{ backgroundColor: "#ffffff", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              What Our Users Say
            </Typography>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <ReviewCard />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundColor: "background.paper",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                    height: "100%",
                  }}
                >
                  <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                    Trusted by Thousands
                  </Typography>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    <AiOutlineStar size={28} style={{ marginRight: "15px" }} />
                    <Box>
                      <Typography variant="h6">
                        Top-rated Experience
                      </Typography>
                      <Typography variant="body1">
                        Our customers love the ease of planning and quality of
                        service we provide.
                      </Typography>
                    </Box>
                  </Box>
                  <ReviewCard />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ backgroundColor: theme.palette.primary.main, color: "white", py: 4, mt: "auto" }}>
          <Container maxWidth="lg">
            <Typography variant="body1" align="center">
              © {new Date().getFullYear()} Trip Creator. All rights reserved.
            </Typography>
          </Container>
        </Box>

        {/* <Dialog open={openLogin} onClose={closeLogin}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Login />
          </DialogContent>
        </Dialog>

        <Dialog open={openSignup} onClose={closeSignup}>
          <DialogTitle>Signup</DialogTitle>
          <DialogContent>
            <Signup />
          </DialogContent>
        </Dialog> */}
      </Box>
    </ThemeProvider>
  );
};

export default SplashPage;
