import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import Login from "../auth/login";
import Signup from "../auth/signup";
import {
  FaSearchLocation,
  FaRegCalendarAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

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
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1,
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
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
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
      </Box>

      <Button
        onClick={goToPreviousReview}
        sx={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
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
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
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

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 8 ? 0 : prevIndex + 1,
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 8 : prevIndex - 1,
    );
  };

  const currentImages = images.slice(currentImageIndex, currentImageIndex + 8);

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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
          "& svg": {
            color: "white",
          },
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

      {currentImages.map((image, index) => (
        <Box
          key={index}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100px",
            width: "200px",
            marginRight: "5px",
          }}
        />
      ))}

      <Button
        onClick={goToNextImage}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
          minWidth: "40px",
          minHeight: "40px",
          "& svg": {
            color: "white",
          },
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

const HowItWorks = () => (
  <Box
    sx={{
      p: "1.5rem",
      backgroundColor: "rgba(200, 200, 200, 0.9)",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <Typography variant="h4" component="div" gutterBottom>
      How It Works
    </Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        mt: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FaSearchLocation size={40} />
        <Typography variant="body1">Search Locations</Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FaRegCalendarAlt size={40} />
        <Typography variant="body1">Plan Dates</Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FaMapMarkedAlt size={40} />
        <Typography variant="body1">Create Itinerary</Typography>
      </Box>
    </Box>
  </Box>
);

const WhyPlanWithUs = () => (
  <Box
    sx={{
      mt: "2rem",
      p: "1.5rem",
      backgroundColor: "rgba(225, 225, 225, 0.9)",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <Typography variant="h4" component="div" gutterBottom>
      Why Plan Your Vacation With Us?
    </Typography>
    <Box sx={{ mt: "1rem" }}>
      <Typography variant="body1">
        <AiOutlineStar /> Personalized Itineraries
      </Typography>
      <Typography variant="body1">
        <AiOutlineStar /> Best Price Guaranteed
      </Typography>
      <Typography variant="body1">
        <AiOutlineStar /> Easy to Use
      </Typography>
    </Box>
  </Box>
);

const Splash = ({ setIsLoggedIn }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);

  const openLogin = () => setVisibleLogin(true);
  const closeLogin = () => setVisibleLogin(false);
  const openSignup = () => setVisibleSignup(true);
  const closeSignup = () => setVisibleSignup(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        justifyContent: "center",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#000024",
          marginBottom: "1rem",
          width: "100%",
          padding: "1.5rem",
          boxSizing: "border-box",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "100px",
            marginBottom: "1.5rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Trip Creator
        </Typography>
        <Button
          onClick={openLogin}
          sx={{
            backgroundColor: "#1573d8",
            color: "white",
            fontSize: "1.5rem",
            padding: "0.5rem 2rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontFamily: "Poppins, sans-serif",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#0f3d82",
            },
          }}
        >
          Get Started
        </Button>
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
      <HowItWorks />

      <ImageCarousel />

      <></>
    </Box>
  );
};

export default Splash;
