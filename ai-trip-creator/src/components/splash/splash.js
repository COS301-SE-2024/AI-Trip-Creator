import React, { useState, useEffect, useCallback, useRef, useMemo, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
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
  Fade,
  CircularProgress,
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
import { Link } from "react-scroll";
import CssBaseline from "@mui/material/CssBaseline";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { keyframes } from '@mui/system';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { throttle } from 'lodash';

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
  {
    src: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=200&q=60&format=webp",
    alt: "Travel destination 1"
  },
  {
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=200&q=60&format=webp",
    alt: "Travel destination 2"
  },
  {
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=60&format=webp",
    alt: "Travel destination 3"
  },
  {
    src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=200&q=60&format=webp",
    alt: "Travel destination 4"
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=60&format=webp",
    alt: "Travel destination 5"
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=60&format=webp",
    alt: "Travel destination 6"
  },
  {
    src: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=200&q=60&format=webp",
    alt: "Travel destination 7"
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80&format=webp",
    thumbnail: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&q=60&format=webp",
    alt: "Travel destination 8"
  },
];

const ReviewCard = React.memo(() => {
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

  // Add debounced navigation
  const debouncedGoToNext = useCallback(
    throttle(goToNextReview, 300),
    [goToNextReview]
  );

  const debouncedGoToPrevious = useCallback(
    throttle(goToPreviousReview, 300),
    [goToPreviousReview]
  );

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
          onClick={debouncedGoToPrevious}
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
          onClick={debouncedGoToNext}
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
});

const ImageCarousel = React.memo(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
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
                backgroundImage: `url(${image.src})`,
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
});

const optimizedImages = images.map(url => ({
  original: url,
  thumbnail: url + '?w=100', // Add query param for smaller thumbnail
  loading: 'lazy'
}));

const useIntersectionObserver = (ref, options) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Fade in={isVisible}>
      <Box
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          cursor: 'pointer',
          backgroundColor: theme.palette.primary.main,
          borderRadius: '50%',
          width: 50,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
          }
        }}
      >
        <KeyboardArrowUpIcon sx={{ color: 'white', fontSize: 30 }} />
      </Box>
    </Fade>
  );
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heroStyles = {
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #0A2647 0%, #144272 50%, #205295 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1,
  },
  willChange: 'transform', // Optimize animations
};

const featureCardStyles = {
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '2rem',
  height: '100%',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
  }
};

const appBarStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  transform: 'translateZ(0)', // Force GPU acceleration
  willChange: 'transform',
};

const navButtonStyles = {
  mx: 2,
  color: theme.palette.primary.main,
  fontWeight: 600,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  }
};

const improvedButtonStyles = {
  ...navButtonStyles,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform',
  '&:active': {
    transform: 'scale(0.98)',
  }
};

const GallerySection = React.memo(() => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Optimize intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once when becoming visible
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Optionally disconnect observer after first visibility
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' // Pre-load slightly before section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Memoize navigation functions
  const goToNextImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, []);

  const goToPreviousImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, []);

  // Optimize auto-play with useCallback and proper cleanup
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(goToNextImage, 5000);
    return () => clearInterval(timer);
  }, [isHovered, goToNextImage]);

  return (
    <Box
      ref={sectionRef}
      id="gallery"
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        willChange: 'opacity, transform',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none'
        }
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1565c0, #5c6bc0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Explore Destinations
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '600px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image - Optimize image rendering */}
          <Box
            component="img"
            src={images[currentImageIndex].src}
            alt={`Gallery image ${currentImageIndex + 1}`}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: 'translateZ(0)', // Force GPU acceleration
              willChange: 'transform',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />

          {/* Navigation Arrows - Only render when hovered */}
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                pointerEvents: 'none', // Prevent interference with hover state
              }}
            >
              {[
                { onClick: goToPreviousImage, icon: '←' },
                { onClick: goToNextImage, icon: '→' },
              ].map((button, index) => (
                <IconButton
                  key={index}
                  onClick={button.onClick}
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(4px)',
                    pointerEvents: 'auto', // Re-enable pointer events
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,1)',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Typography sx={{ fontSize: '24px', color: theme.palette.primary.main }}>
                    {button.icon}
                  </Typography>
                </IconButton>
              ))}
            </Box>
          )}

          {/* Image Counter - Simplified and optimized */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              zIndex: 2,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Thumbnail Preview - Only render visible thumbnails */}
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {images.slice(0, 5).map((image, index) => (
            <Box
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: 100,
                height: 60,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                border: index === currentImageIndex ? `3px solid ${theme.palette.primary.main}` : 'none',
                opacity: index === currentImageIndex ? 1 : 0.6,
                transition: 'all 0.3s ease',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
            >
              <img
                src={image.thumbnail}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
});

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition(window.pageYOffset);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

const SplashPage = React.memo(({ setIsLoggedIn }) => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleSignup, setVisibleSignup] = useState(false);
  const scrollPosition = useScrollPosition();

  const openLogin = () => setVisibleLogin(true);
  const closeLogin = () => setVisibleLogin(false);
  const openSignup = () => setVisibleSignup(true);
  const closeSignup = () => setVisibleSignup(false);

  // Memoize heavy calculations and callbacks
  const memoizedHeroContent = useMemo(() => (
    <Box id="hero" sx={heroStyles}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6} sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ animation: `${fadeIn} 1s ease-out` }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.2,
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  '& span': {
                    color: theme.palette.secondary.main,
                    display: 'block',
                  }
                }}
              >
                Your Journey <span>Begins Here</span>
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 4,
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                Let AI craft your perfect adventure while you focus on making memories.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={openSignup}
                  startIcon={<FlightTakeoffIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    backgroundColor: theme.palette.secondary.main,
                    color: 'black',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Start Planning
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={openLogin}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                    borderColor: 'white',
                    color: 'white',
                    borderWidth: '2px',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Login
                </Button>
              </Box>

              {/* Feature Pills */}
              <Box sx={{ mt: 6, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {['AI-Powered', 'Personalized', 'Time-Saving'].map((feature) => (
                  <Box
                    key={feature}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      px: 2,
                      py: 1,
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <TravelExploreIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                    <Typography sx={{ color: 'white', fontSize: '0.9rem' }}>
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Content - Floating Elements */}
          <Grid item xs={12} md={6} sx={{ position: 'relative', minHeight: '400px', display: { xs: 'none', md: 'block' } }}>
            {[
              { img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800', delay: 0 },
              { img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1', delay: 0.2 },
              { img: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d', delay: 0.4 },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  width: '250px',
                  height: '350px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  animation: `${float} 6s ease-in-out infinite`,
                  animationDelay: `${item.delay}s`,
                  '&:nth-of-type(1)': { top: '0%', right: '20%', transform: 'rotate(10deg)' },
                  '&:nth-of-type(2)': { top: '20%', right: '50%', transform: 'rotate(-5deg)' },
                  '&:nth-of-type(3)': { top: '40%', right: '10%', transform: 'rotate(7deg)' },
                }}
              >
                <img
                  src={item.img}
                  alt="Travel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  ), []);

  // Use lazy loading for sections
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Critical content loads immediately */}
        <AppBar position="sticky" sx={appBarStyles}>
          <Container 
            maxWidth="lg" 
            sx={{ 
              padding: '0 !important',  // Remove ALL padding
              margin: '0 !important',   // Remove margin
              maxWidth: '100% !important' // Allow full width
            }}
          >
            <Toolbar 
              disableGutters  // Remove default gutters
              sx={{ 
                position: 'relative',
                padding: '0 16px',  // Minimal padding
                minHeight: '64px'
              }}
            > 
              {/* Title - Far Left */}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  marginLeft: '16px'  // Small margin from the very edge
                }}
              >
                <FlightTakeoffIcon sx={{ fontSize: 28 }} />
                AI Trip Creator
              </Typography>

              {/* Navigation Links - Centered */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Link
                  activeClass="active"
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button sx={improvedButtonStyles}>Home</Button>
                </Link>
                <Link
                  activeClass="active"
                  to="howItWorks"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button sx={improvedButtonStyles}>How It Works</Button>
                </Link>
                <Link
                  activeClass="active"
                  to="gallery"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <Button sx={improvedButtonStyles}>Gallery</Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {memoizedHeroContent}

        {/* Lazy load non-critical sections */}
        <Suspense fallback={<CircularProgress />}>
          <Box id="howItWorks" sx={{ py: 12, backgroundColor: '#f8f9fa' }}>
            <Container maxWidth="lg">
              <Typography 
                variant="h3" 
                component="h2" 
                align="center" 
                sx={{ 
                  mb: 6,
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1565c0, #5c6bc0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                How It Works
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    icon: <FaSearchLocation size={48} />,
                    title: "Discover",
                    description: "Find your ideal destinations with our AI-powered search"
                  },
                  {
                    icon: <FaRegCalendarAlt size={48} />,
                    title: "Plan",
                    description: "Create personalized itineraries with smart suggestions"
                  },
                  {
                    icon: <FaMapMarkedAlt size={48} />,
                    title: "Explore",
                    description: "Experience your journey with our interactive guides"
                  }
                ].map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box sx={featureCardStyles}>
                      <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Suspense>

        <Suspense fallback={<CircularProgress />}>
          <GallerySection />
        </Suspense>

        {/* Optimize dialogs with dynamic imports */}
        {visibleLogin && (
          <Suspense fallback={<CircularProgress />}>
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
          </Suspense>
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

        {/* Reviews Section */}

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            py: 4,
            mt: "auto",
          }}
        >
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
});

// 6. Add performance monitoring
const withPerformanceTracking = (WrappedComponent) => {
  return function WithPerformanceTracking(props) {
    useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`Component rendered in ${endTime - startTime}ms`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withPerformanceTracking(SplashPage);
