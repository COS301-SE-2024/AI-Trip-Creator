import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { exportVariable } from "./ItineraryForm";
import { getGlobalAIText } from "./globalData";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown (e.g., tables, strikethroughs)
import Slider from "react-slick";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import {
  FaFilter,
  FaSearch,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


import johannesburgImg from "./destinations/johannesburg.jpeg";
import pretoriaImg from "./destinations/Pretoria.jpeg";
import capetownImg from "./destinations/capetown.jpeg";
import durbanImg from "./destinations/durban.jpeg";
// import gqerberhaImg from "./destinations/gqerberha.jpg"; 
import gqerberhaImg from "./images/Gqerberha.jpg";

const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";
const convertPriceToZar = (price, fromCurrency) => {
  if (fromCurrency === "EUR") {
    const exchangeRate = 19.21;
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


function ItineraryDisplay({ itinerary }) {
  const [globalAIText, setGlobalAIText] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [flights, setFlights] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [randomNum, setRandomNum] = useState("");

  // const destinationImage = destinationImages[destinationKey] || fallbackImageUrl;
  const des = itinerary.destination.toLowerCase();
  let destinationImage
  if (des === "johannesburg") {
    destinationImage = johannesburgImg;
  } else if (des === "pretoria") {
    destinationImage = pretoriaImg;
  } else if (des === "durban") {
    destinationImage = durbanImg;
  } else if (des === "cape town" || des === "capetown") {
    destinationImage = capetownImg;
  } else if (des === "gqeberha") {
    destinationImage = gqerberhaImg;
  } else {
    destinationImage = fallbackImageUrl;
  }


  useEffect(() => {
    // Directly set the AI-generated itinerary from the passed itinerary prop
    if (itinerary.itineraryText) {
      setGlobalAIText(itinerary.itineraryText);
    }



    const destinationKey = itinerary.destination.toLowerCase();

    const destinationParam = itinerary.destination;
    handleSearch(destinationParam.toLowerCase().replace(/\s+/g, ""));
    const fetchData = async () => {
      try {
        const date = new Date().toISOString().split("T")[0];
        setCurrentDate(date);
        const loc = itinerary.currentLocation.toLowerCase();
        const des = itinerary.destination.toLowerCase();
        let originLocation;
        if (loc === "johannesburg") {
          originLocation = "JNB";
        } else if (loc === "pretoria" && des !== "johannesburg") {
          originLocation = "JNB";
        } else if (loc === "durban") {
          originLocation = "DUR";
        } else if (loc === "cape town") {
          originLocation = "CPT";
        } else if (loc === "gqeberha") {
          originLocation = "PLZ";
        } else {
          console.error("Unknown location: " + loc);
        }

        let destinationLocation;
        if (des === "johannesburg") {
          destinationLocation = "JNB";
        } else if (des === "pretoria" && loc !== "johannesburg") {
          destinationLocation = "JNB";
        } else if (des === "durban") {
          destinationLocation = "DUR";
        } else if (des === "cape town") {
          destinationLocation = "CPT";
        } else if (des === "gqeberha") {
          destinationLocation = "PLZ";
        } else {
          console.error("Unknown destination: " + des);
        }

        const flightOffers = await getFlightOffers(
          //JNB,DUR,CPT,PLZ,
          originLocation,
          destinationLocation,
          date,
          1,
          9, //9 flights instead of 10 so the layout looks better
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
  }, [itinerary]);

  const getDetails = () => {
    const dynamicDuration = itinerary.duration;

    let durationDetails;
    if (dynamicDuration <= 3) {
      durationDetails = "A short and sweet trip with the highlights of the city.";
    } else if (dynamicDuration <= 7) {
      durationDetails = "A more immersive experience, allowing for additional activities.";
    } else if (dynamicDuration <= 14) {
      durationDetails = "A deep dive into the city with plenty of time for relaxation and exploration.";
    } else {
      durationDetails = "An extensive journey to fully explore all the attractions and hidden gems.";
    }

    const interestsDetails = {
      Culture: "Museums, historical landmarks, and cultural events.",
      Adventure: "Outdoor activities, hiking, and adventurous tours.",
      Relaxation: "Spas, leisure walks, and beach time.",
      Nature: "Parks, natural reserves, and scenic views.",
      Food: "Food tours, local restaurants, and culinary classes.",
      Shopping: "Shopping malls, local markets, and souvenir shops.",
      Nightlife: "Bars, nightclubs, and entertainment venues.",
    };

    return {
      durationDetails,
      interestsDetails: itinerary.interests
        .map((interest) => interestsDetails[interest])
        .join(", "),
    };
  };

  const { durationDetails, interestsDetails } = getDetails();
  const itineraryByDays = globalAIText
    .split(/(?=\*\*Day \d+:)/g)
    .filter((day) => day.trim() !== "");

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Accommodations
  const [liked, setLiked] = useState(Array(accommodations.length).fill(false));
  const [likedflight, setLikedflight] = useState(
    Array(flights.length).fill(false),
  );

  const handleLikeClick = (index) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };
  const handleLikeFlightClick = (index) => {
    setLikedflight((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const accommodationsRef = collection(db, "Accommodation");
      const q = firestoreQuery(
        accommodationsRef,
        where("city", "==", searchQuery),
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        if (results.length < 12) results.push(doc.data());
      });

      if (results.length > 0) {
        setAccommodations(results);
        setError("");
      } else {
        setError(`No accommodations found for "${searchQuery}"`);
        setAccommodations([]);
      }
    } catch (error) {
      console.error("Error fetching search results from Firestore:", error);
      setError("Failed to fetch accommodation data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function getRandomNumber(min = 2, max = 3006) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getImageUrl() {
    const randomNum = getRandomNumber();
    return `https://www.sa-venues.com/things-to-do/gauteng/gallery/${randomNum}/1.jpg`;
  }



  const fallbackImageUrl =
    "https://www.sa-venues.com/things-to-do/gauteng/gallery/9/1.jpg";
  //saving itinerary
  const saveItineraryToFirestore = async (itinerary) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const db = getFirestore();
    const likedAccommodations = accommodations.filter(
      (_, index) => liked[index],
    );
    const likedFlights = flights.filter((_, index) => likedflight[index]);

    if (likedAccommodations.length === 0) {
      console.log("No accommodations to save.");
    }
    if (likedFlights.length === 0) {
      console.log("No Flights to save.");
    }

    try {
      const itineraryDoc = {
        uid: user.uid,
        destination: itinerary.destination,
        duration: itinerary.duration,
        createdAt: currentDate,
        itineraryText: itinerary.itineraryText,
        flights: likedFlights,
        accommodations: likedAccommodations,
        image: getImageUrl(),
        altimage: fallbackImageUrl,
      };

      await addDoc(collection(db, "Itinerary"), itineraryDoc);
      console.log("Itinerary saved successfully!");
    } catch (error) {
      console.error("Error saving itinerary to Firestore:", error);
    }
  };

  const carouselSettings = {
    dots: true,  // Show navigation dots
    infinite: true,  // Infinite scroll
    speed: 500,  // Transition speed
    slidesToShow: 3,  // Number of cards to show at once
    slidesToScroll: 1,  // How many to scroll on click
    responsive: [  // Make the carousel responsive
      {
        breakpoint: 1024,  // Max width for this setting
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  // const db = getFirestore();
  // const [activities, setActivities] = useState([]);
  // const getUnsplashImage = async (query) => {
  //   try {
  //     const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=ru4dv45kZRdAOvO8HyrOy56ycwuE4NyMXb51m_Uc1HU`);
  //     const data = await response.json();
  //     return data.results[0]?.urls?.small || "fallback_image_url_here";
  //   } catch (error) {
  //     console.error("Error fetching image from Unsplash:", error);
  //     return "https://tourscanner.com/blog/wp-content/uploads/2018/02/25_website_featured__0BsXQ-1.jpg";
  //   }
  // };

  // const fetchActivities = async (destination) => {
  //   try {
  //     const activitiesCollection = collection(db, "Activities");
  //     const q = firestoreQuery(
  //       activitiesCollection,
  //       where("city", "==", destination)
  //     );

  //     const querySnapshot = await getDocs(q);
  //     const activitiesList = [];
  //     querySnapshot.forEach((doc) => {
  //       activitiesList.push({ id: doc.id, ...doc.data() });
  //     });

  //     setActivities(activitiesList);
  //   } catch (error) {
  //     console.error("Error fetching activities:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (itinerary.destination) {
  //     fetchActivities(itinerary.destination);
  //   }
  // }, [itinerary.destination]);

  // const destination = itinerary.destination; // Define destination here

  // // Limit the activities to 15
  // const limitedActivities = activities.slice(0, 15);
  // const settingsActs = {
  //   dots: true, // Enable dots
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 960,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: true, // Ensure dots are enabled for responsive views as well
  //       },
  //     },
  //   ],
  // };

  const db = getFirestore();
const [activities, setActivities] = useState([]);

// Function to fetch images from Unsplash
const getUnsplashImage = async (query) => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=ru4dv45kZRdAOvO8HyrOy56ycwuE4NyMXb51m_Uc1HU`);
    const data = await response.json();
    return data.results[0]?.urls?.small || "fallback_image_url_here";
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return "https://tourscanner.com/blog/wp-content/uploads/2018/02/25_website_featured__0BsXQ-1.jpg"; // Fallback image
  }
};

// Function to fetch activities from Firestore and get images from Unsplash
const fetchActivities = async (destination) => {
  try {
    const activitiesCollection = collection(db, "Activities");
    const q = firestoreQuery(
      activitiesCollection,
      where("city", "==", destination)
    );

    const querySnapshot = await getDocs(q);
    const activitiesList = [];

    // Loop through each activity, fetch its corresponding image from Unsplash
    for (const doc of querySnapshot.docs.slice(0, 15)) {
      const activityData = doc.data();
      const imageUrl = await getUnsplashImage(activityData.name); // Use the activity name to search for an image
      activitiesList.push({ id: doc.id, ...activityData, imageUrl }); // Add the image URL to the activity data
    }

    setActivities(activitiesList); // Update state with activities and their images
  } catch (error) {
    console.error("Error fetching activities:", error);
  }
};

useEffect(() => {
  if (itinerary.destination) {
    fetchActivities(itinerary.destination);
  }
}, [itinerary.destination]);

const destination = itinerary.destination; // Define destination here

// Limit the activities to 15
const limitedActivities = activities.slice(0, 10);

const settingsActs = {
  dots: true, // Enable dots
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true, // Ensure dots are enabled for responsive views as well
      },
    },
  ],
};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        padding: "16px",
        maxWidth: "calc(100vw - 240px)",
        marginLeft: "240px",
      }}
    >
      <h1>Itinerary</h1>
      {/*<Typography variant="h4" gutterBottom>
        Your Itinerary
      </Typography>
      <Typography variant="h6">
        <strong>Destination:</strong> {itinerary.destination}
      </Typography>
      <Typography variant="h6">
        <strong>Duration:</strong> {itinerary.duration} ({durationDetails})
      </Typography>
      <Typography variant="h6">
        <strong>Interests:</strong> {interestsDetails}
      </Typography>*/}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: 800 }}>
          {" "}
          {/* Set a maxWidth to control the container width */}
          {itineraryByDays.map((dayText, index) => (
            <Grid item xs={12} key={index}>
              {" "}
              {/* Each card takes full width inside the grid */}
              <Card sx={{ position: "relative" }}>
                {index === 0 && (
                  <>
                    <CardMedia
                      component="img"
                      height="400"
                      image={destinationImage}
                      // image={getImageUrl()}
                      alt={getImageUrl()}
                      onError={(e) => {
                        e.target.src = fallbackImageUrl; // Set fallback image if the primary image fails to load
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0, // Position text at the bottom of the image
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional dark overlay for contrast
                        color: "white",
                        padding: 2,
                        "& *": {
                          color: "white !important", // Ensure all nested elements have white text
                        },
                      }}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {dayText}
                      </ReactMarkdown>
                      <Typography>Created {currentDate}</Typography>
                    </Box>
                  </>
                )}
                {index !== 0 && (
                  <CardContent>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {dayText}
                    </ReactMarkdown>
                  </CardContent>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <br />
      <Card mt={2}>
        <CardContent>
          {/* Accommodation Carousel */}
          {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Recommended Accommodations
          </Typography> */}
          <h2>Recommended Accommodations</h2>
          {loading ? (
            <Typography>Loading accommodations...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Slider {...settings}>
              {accommodations.map((accommodation, index) => (
                <Box key={index} p={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={accommodation.image}
                      alt={accommodation.name}
                    />
                    <CardContent sx={{ position: "relative" }}>
                      <Typography variant="h8">
                        {accommodation.name}{" "}
                        <Box
                          component="span"
                          onClick={() => handleLikeClick(index)}
                          sx={{
                            position: "absolute",

                            right: 30,
                            cursor: "pointer",
                            zIndex: 1,
                          }}
                        >
                          {liked[index] ? (
                            <FaHeart color="red" size={20} />
                          ) : (
                            <FaRegHeart color="gray" size={20} />
                          )}
                        </Box>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Box component="span" sx={{ flex: 1 }}>
                          <FaStar color="#FFD700" size={15} /> {"   "}
                          {accommodation.rating}
                          <br />
                          {`from R${accommodation.price}/night`} <br />
                          click to book accommodation
                        </Box>
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        href={accommodation.link}
                        target="_blank"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          )}
        </CardContent>
      </Card>

      <br />
      <Card mt={2}>
        <CardContent>
          {/* <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Flight Options
          </Typography> */}
          <h2>Flight Options</h2>

          {flights.length === 0 ? (
            <Typography color="textSecondary">
              No flight offers available.
            </Typography>
          ) : (
            <Grid container spacing={2} mt={2}>
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{ position: "relative" }}
                  >
                    <Card
                      sx={{
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {firstSegment.departure.iataCode} <FaPlaneDeparture />
                          {"  ------------------------------ "}
                          <FaPlaneArrival />
                          {lastSegment.arrival.iataCode}
                          <br />
                          <strong>Departure:</strong> {departureTime} |{" "}
                          <strong>Arrival:</strong> {arrivalTime}
                          <br />
                          <strong>Live Price: </strong>ZAR {totalPriceInZar}
                        </Typography>
                      </CardContent>
                      <Box
                        component="span"
                        onClick={() => handleLikeFlightClick(index)}
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          cursor: "pointer",
                          zIndex: 1,
                        }}
                      >
                        {likedflight[index] ? (
                          <FaHeart color="red" size={20} />
                        ) : (
                          <FaRegHeart color="gray" size={20} />
                        )}
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </CardContent>
      </Card>

      <br />
      <Card>
        <h2 style={{ marginLeft: "10px" }}>Activities in {destination}</h2>

        {limitedActivities.length > 0 ? (
          <Slider {...settingsActs}>
            {limitedActivities.map((activity, index) => (
              <Box key={index} p={2}>
                <Card sx={{
                  width: '400px', // Fixed width
                  height: '600px', // Fixed height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '10px',
                }}>
                  <CardMedia
                    component="img"
                    height="200"
                    sx={{
                      height: '200px', // Fixed height for image
                      objectFit: 'cover',
                    }}
                    image={activity.imageUrl || "fallback_image_url_here"} // Default image in case none is provided
                    alt={activity.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {activity.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Category: {activity.category} / {activity.sub_category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Address: {activity.address}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {activity.description}
                    </Typography>
                    {/* <Button
              variant="contained"
              color="primary"
              href="#"
              fullWidth
            >
              Book Now
            </Button> */}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        ) : (
          <Typography>No activities found for {destination}</Typography>
        )}
      </Card>
      <Box sx={{ mt: 2, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          sx={{
            color: "purple",
            borderColor: "purple",
            "&:hover": {
              borderColor: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.1)", // Light purple hover effect
            },
          }}
          variant="outlined"
          href={`/Itinerary?`}
        >
          Return to Form
        </Button>

        <Button
          sx={{
            color: "green",
            borderColor: "green",
            "&:hover": {
              borderColor: "green",
              backgroundColor: "rgba(0, 128, 0, 0.1)", // Light green hover effect
            },
          }}
          variant="outlined"
          onClick={() => saveItineraryToFirestore(itinerary)}
        >
          Save Itinerary
        </Button>
      </Box>
    </Box>
  );
}

export default ItineraryDisplay;
