import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  Container,
  Paper,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CardMedia,
} from "@mui/material";
import Slider from "react-slick";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-material-ui-carousel";
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import "./dashboard.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    style={{
      ...props.style,
      display: "block",
      background: "black",
      color: "white",
      borderRadius: "50%",
      zIndex: 2,
    }}
  />
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    style={{
      ...props.style,
      display: "block",
      background: "black",
      color: "white",
      borderRadius: "50%",
      zIndex: 2,
    }}
  />
);

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const auth = getAuth();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [user, setUser] = useState({
    name: "",
    email: "",
    photoURL: "",
    preferences: {
      interests: [],
      budget: "",
      accommodationRating: "",
      activities: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [budgetLevel, setBudgetLevel] = useState("");
  const [accommodationRating, setAccommodationRating] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itineraryToDelete, setItineraryToDelete] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let userData = {
            name: "John Doe",
            email: currentUser.email,
            photoURL: "",
            preferences: {
              interests: [],
              budget: "Cheap",
              accommodationRating: "1",
              activities: [],
            },
          };

          if (userDocSnap.exists()) {
            const docData = userDocSnap.data();
            userData.name = docData.name || userData.name;
            userData.photoURL = docData.photoURL || "";
            userData.preferences.budget =
              docData.budget || userData.preferences.budget;
            userData.preferences.accommodationRating =
              docData.accommodationRating ||
              userData.preferences.accommodationRating;
            userData.preferences.activities =
              docData.activities || userData.preferences.activities;
          }

          const prefsDocRef = doc(db, "Preferences", currentUser.uid);
          const prefsDocSnap = await getDoc(prefsDocRef);

          if (prefsDocSnap.exists()) {
            userData.preferences.interests =
              prefsDocSnap.data().preferences || userData.preferences.interests;
            userData.preferences.budget =
              prefsDocSnap.data().budget || userData.preferences.budget;
            userData.preferences.accommodationRating =
              prefsDocSnap.data().accommodationRating ||
              userData.preferences.accommodationRating;
            userData.preferences.activities =
              prefsDocSnap.data().activities || userData.preferences.activities;
          }

          setUser(userData);
          setSelectedPreferences(userData.preferences.interests);
          setBudgetLevel(userData.preferences.budget);
          setAccommodationRating(userData.preferences.accommodationRating);
          setSelectedActivities(userData.preferences.activities);
          setProfilePicturePreview(userData.photoURL);

          const itinerariesQuery = query(
            collection(db, "Itinerary"),
            where("uid", "==", currentUser.uid),
          );
          const itinerariesSnapshot = await getDocs(itinerariesQuery);
          const itinerariesList = itinerariesSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, // Ensure the ID is captured for deletion
          }));
          setItineraries(itinerariesList);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteConfirm = async () => {
    if (itineraryToDelete) {
      try {
        await deleteDoc(doc(db, "Itinerary", itineraryToDelete.id));

        setItineraries(
          itineraries.filter((i) => i.id !== itineraryToDelete.id),
        );

        console.log("Itinerary deleted successfully");
      } catch (error) {
        console.error("Error deleting itinerary:", error);
      }
    }
    setDeleteConfirmOpen(false);
    setItineraryToDelete(null);
  };

  const handleDeleteClick = (itinerary) => {
    setItineraryToDelete(itinerary);
    setDeleteConfirmOpen(true);
  };

  const handlePreferencesChange = (event, newPreferences) => {
    setSelectedPreferences(newPreferences);
  };

  const handleBudgetChange = (event, newBudget) => {
    if (newBudget !== null) {
      setBudgetLevel(newBudget);
    }
  };

  const handleRatingChange = (event, newRating) => {
    if (newRating !== null) {
      setAccommodationRating(newRating);
    }
  };

  const handleActivitiesChange = (event, newActivities) => {
    setSelectedActivities(newActivities);
  };

  const handleSave = async () => {
    let photoURL = user.photoURL;

    if (profilePicture) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        photoURL = reader.result;

        const updatedUser = {
          ...user,
          photoURL,
          preferences: {
            interests: selectedPreferences,
            budget: budgetLevel,
            accommodationRating: accommodationRating,
            activities: selectedActivities,
          },
        };

        setUser(updatedUser);
        setEditing(false);

        try {
          const currentUser = auth.currentUser;
          if (currentUser) {
            await setDoc(doc(db, "users", currentUser.uid), updatedUser, {
              merge: true,
            });
            await setDoc(
              doc(db, "Preferences", currentUser.uid),
              updatedUser.preferences,
              { merge: true },
            );
            console.log("Profile saved successfully!");
          }
        } catch (error) {
          console.error("Error saving profile:", error);
        }
      };
      reader.readAsDataURL(profilePicture);
    } else {
      const updatedUser = {
        ...user,
        preferences: {
          interests: selectedPreferences,
          budget: budgetLevel,
          accommodationRating: accommodationRating,
          activities: selectedActivities,
        },
      };

      setUser(updatedUser);
      setEditing(false);

      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          await setDoc(doc(db, "users", currentUser.uid), updatedUser, {
            merge: true,
          });
          await setDoc(
            doc(db, "Preferences", currentUser.uid),
            updatedUser.preferences,
            { merge: true },
          );
          console.log("Profile saved successfully!");
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    }
  };

  const handleCancel = () => {
    setSelectedPreferences(user.preferences.interests);
    setBudgetLevel(user.preferences.budget);
    setAccommodationRating(user.preferences.accommodationRating);
    setSelectedActivities(user.preferences.activities);
    setProfilePicturePreview(user.photoURL);
    setEditing(false);
  };
  const handleItineraryClick = (itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setItineraryToDelete(null);
  };

  const handleCloseDialog = () => {
    setSelectedItinerary(null);
  };
  const activitiesOptions = [
    "Outdoor",
    "Indoor",
    "Shopping",
    "Amusement Park",
    "Historical",
    "Art",
    "Beach",
    "Adventure",
    "Luxury",
    "Culture",
    "Food",
    "Nightlife",
  ];
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

  const carouselSettings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 1, // How many to scroll on click
    responsive: [
      // Make the carousel responsive
      {
        breakpoint: 1024, // Max width for this setting
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Number of cards to show at once on large screens
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: 1024, // Medium screens (tablets, etc.)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // Small screens (mobile)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Extra small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box display="flex">
      <Sidebar
        style={{
          position: "fixed",
          width: "250px",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          marginLeft: "250px",
          padding: "20px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <Container>
          <h1 style={{}}>Profile</h1>
          <Box
            p={3}
            sx={{
              overflowX: "hidden",
              width: "950px",
            }}
          >
            <Box p={3} sx={{ minHeight: "50vh" }}>
              {loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="50vh"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Card
                  sx={{
                    backgroundColor: isDarkMode ? "#424242" : "#ffffff",

                    boxShadow: isDarkMode
                      ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
                      : "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    padding: "19px",
                  }}
                >
                  <CardContent>
                    {editing ? (
                      <>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Avatar
                            alt={user.name}
                            src={profilePicturePreview}
                            sx={{ width: 120, height: 120, mb: 2 }}
                          />
                          <Button
                            variant="contained"
                            component="label"
                            sx={{
                              mb: 2,
                              backgroundColor: "#800080",
                              color: "#FFFFFF",
                              "&:hover": {
                                backgroundColor: "#6A19B5",
                                color: "#fff",
                              },
                            }}
                          >
                            Upload New Picture
                            <input
                              type="file"
                              hidden
                              onChange={handleProfilePictureChange}
                            />
                          </Button>
                        </Box>
                        <TextField
                          sx={{
                            input: {
                              color: isDarkMode ? "#ffffff" : "#000000",
                            },
                          }}
                          label="Name"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Email"
                          name="email"
                          value={user.email}
                          fullWidth
                          margin="normal"
                          disabled
                        />
                        <FormControl
                          component="fieldset"
                          fullWidth
                          margin="normal"
                        >
                          <h3>Budget Level</h3>
                          <ToggleButtonGroup
                            value={budgetLevel}
                            exclusive
                            onChange={handleBudgetChange}
                            fullWidth
                            sx={{
                              "& .MuiToggleButton-root": {
                                "&.Mui-selected": {
                                  backgroundColor: "#1976d2",
                                  color: "#fff",
                                },
                              },
                            }}
                          >
                            <ToggleButton value="Cheap">Cheap</ToggleButton>
                            <ToggleButton value="Affordable">
                              Affordable
                            </ToggleButton>
                            <ToggleButton value="Luxury">Luxury</ToggleButton>
                          </ToggleButtonGroup>
                        </FormControl>
                        <FormControl
                          component="fieldset"
                          fullWidth
                          margin="normal"
                        >
                          <h3>Accommodation Rating</h3>
                          <ToggleButtonGroup
                            value={accommodationRating}
                            exclusive
                            onChange={handleRatingChange}
                            fullWidth
                            sx={{
                              "& .MuiToggleButton-root": {
                                "&.Mui-selected": {
                                  backgroundColor: "#1976d2",
                                  color: "#fff",
                                },
                              },
                            }}
                          >
                            <ToggleButton value="1">1-Star</ToggleButton>
                            <ToggleButton value="2">2-Star</ToggleButton>
                            <ToggleButton value="3">3-Star</ToggleButton>
                            <ToggleButton value="4">4-Star</ToggleButton>
                            <ToggleButton value="5">5-Star</ToggleButton>
                          </ToggleButtonGroup>
                        </FormControl>
                        <FormControl
                          component="fieldset"
                          fullWidth
                          margin="normal"
                        >
                          <h3>Activities</h3>
                          <ToggleButtonGroup
                            value={selectedActivities}
                            onChange={handleActivitiesChange}
                            fullWidth
                            multiple
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              "& .MuiToggleButton-root": {
                                width: "223px",
                                padding: "10px 15px",
                                margin: "8px",
                                "&.Mui-selected": {
                                  backgroundColor: "#1976d2",
                                  color: "#fff",
                                },
                              },
                            }}
                          >
                            {activitiesOptions.map((option) => (
                              <ToggleButton key={option} value={option}>
                                {option}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        </FormControl>
                        <Box mt={3} display="flex" justifyContent="center">
                          <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                              mx: 1,
                              color: "#FFFFFF",
                              backgroundColor: "#800080",
                              "&:hover": {
                                backgroundColor: "#6A19B5",
                                color: "#fff",
                              },
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{ mx: 1 }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Avatar
                            alt={user.name}
                            src={profilePicturePreview}
                            sx={{ width: 150, height: 150, mb: 1 }}
                          />
                          <h2 gutterBottom>{user.name}</h2>
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{ mt: -4 }}
                            gutterBottom
                          >
                            {user.email}
                          </Typography>
                        </Box>

                        <Box
                          mb={5}
                          p={2}
                          border={1}
                          borderColor="grey.300"
                          borderRadius="8px"
                        >
                          <h2>Budget Level</h2>
                          <Box
                            sx={{
                              backgroundColor: isDarkMode
                                ? "#444444"
                                : "#e0e0e0",
                              borderRadius: "20px",
                              height: "45px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              maxWidth: "200px",
                              textAlign: "center",
                              margin: "0 auto",
                            }}
                          >
                            <p style={{ margin: 0 }}>
                              <p>{budgetLevel}</p>
                            </p>
                          </Box>
                        </Box>
                        <Box
                          mb={5}
                          p={2}
                          border={1}
                          borderColor="grey.300"
                          borderRadius="8px"
                        >
                          <h2>Accommodation Rating</h2>
                          <Box
                            sx={{
                              backgroundColor: isDarkMode
                                ? "#444444"
                                : "#e0e0e0",
                              borderRadius: "20px",
                              height: "45px",
                              display: "flex", // Use flexbox for centering
                              alignItems: "center", // Center vertically
                              justifyContent: "center", // Center horizontally
                              maxWidth: "200px",
                              textAlign: "center",
                              margin: "0 auto", // Center the bubble in the box
                            }}
                          >
                            <p style={{ margin: 0 }}>
                              {accommodationRating}-Star
                            </p>
                          </Box>
                        </Box>

                        <Box
                          mb={5}
                          p={2}
                          border={1}
                          borderColor="grey.300"
                          borderRadius="8px"
                        >
                          <h2>Activities</h2>
                          <List
                            sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                          >
                            {selectedActivities.map((activity) => (
                              <ListItem
                                key={activity}
                                sx={{
                                  backgroundColor: isDarkMode
                                    ? "#444444"
                                    : "#e0e0e0",
                                  borderRadius: "20px",
                                  padding: "10px 15px",
                                  margin: "10px",
                                  display: "inline-block",
                                  maxWidth: "200px",
                                  textAlign: "center",
                                }}
                              >
                                {activity}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                        <Box
                          mb={5}
                          p={2}
                          border={1}
                          borderColor="grey.300"
                          borderRadius="8px"
                        >
                          <h2>My Itineraries</h2>
                          {itineraries.length > 0 ? (
                            <Slider {...sliderSettings}>
                              {itineraries.map((itinerary, index) => (
                                <Box key={index} px={2}>
                                  <Card
                                    key={index}
                                    sx={{
                                      height: "180px",
                                      width: "180px",
                                      position: "relative",
                                      margin: "0 10px", // Add margin between the cards
                                    }}
                                  >
                                    <CardMedia
                                      onClick={() =>
                                        handleItineraryClick(itinerary)
                                      }
                                      component="img"
                                      image={
                                        itinerary.image || "/placeholder.jpg"
                                      }
                                      alt={itinerary.destination}
                                      height="100px"
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                    />
                                    <CardContent>
                                      <IconButton
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteClick(itinerary);
                                        }}
                                        sx={{
                                          cursor: "pointer",
                                          position: "absolute",
                                          top: "8px",
                                          right: "8px",
                                          backgroundColor:
                                            "rgba(128, 128, 128, 0.7)",
                                          color: "red",
                                          borderRadius: "50%",
                                          padding: "5px",
                                          zIndex: 100,
                                          "&:hover": {
                                            backgroundColor:
                                              "rgba(128, 128, 128, 1)",
                                          },
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                      <Typography
                                        onClick={() =>
                                          handleItineraryClick(itinerary)
                                        }
                                        variant="body2"
                                      >
                                        Created: {itinerary.createdAt}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Box>
                              ))}
                            </Slider>
                          ) : (
                            <Typography>No itineraries found.</Typography>
                          )}
                        </Box>
                        <Box mt={3} display="flex" justifyContent="center">
                          <Button
                            variant="contained"
                            onClick={() => setEditing(true)}
                            sx={{ mx: 1 }}
                          >
                            Edit Profile
                          </Button>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
        </Container>
      </div>
    </Box>
  );
};

export default Profile;
