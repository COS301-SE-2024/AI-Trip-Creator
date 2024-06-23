import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import Login from "../auth/login";
import Signup from "../auth/signup";

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
        justifyContent: "center",
        mt: "20px",
        height: 200, // Fixed height of 200px
        overflow: "auto", // Enable scrolling if content exceeds height
        position: "relative", // To position buttons absolutely within this box
      }}
    >
      <Card sx={{ width: 435, overflow: "hidden" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Excellent 4.6/5
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex" }}>
              {[...Array(4)].map((_, index) => (
                <Box key={index} sx={{ color: "#ffd700" }}>
                  ★
                </Box>
              ))}

              <Box sx={{ color: "#ccc" }}>★</Box>
            </Box>
          </Box>
        </CardContent>
        <CardContent>
          <Typography variant="body">{currentReview.content}</Typography>
          <br></br>
          <Typography
            variant="body"
            color="text.secondary"
            sx={{ paddingTop: "5px" }}
          >
            {currentReview.author} ~ {currentReview.date}
          </Typography>
        </CardContent>
      </Card>

      <Button
        onClick={goToPreviousReview}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
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
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
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
        height: "auto",
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
          "& svg": {
            color: "#ccc",
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
          component="img"
          src={image}
          alt={`Image ${index}`}
          sx={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            margin: "0 0.5rem",
            overflow: "hidden",
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
          "& svg": {
            color: "#ccc",
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
        height: "100vh",
        backgroundImage: `url("./splashBackground.jpg")`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.5)",
          padding: "2rem",
          borderRadius: "10px",
          mt: "25px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "4rem",
            marginBottom: "2rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
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
      <ImageCarousel />

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: 200,
          zIndex: 1000,
        }}
      >
        <ReviewCard />
      </Box>
    </Box>
  );
};

export default Splash;
