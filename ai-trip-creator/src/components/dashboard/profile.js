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
  Slider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-material-ui-carousel';
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
            id: doc.id,  // Ensure the ID is captured for deletion
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

        setItineraries(itineraries.filter(i => i.id !== itineraryToDelete.id));

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
      <Box p={3} sx={{ ml: isSmUp ? "380px" : "0", overflowX: "hidden", width: "950px" }}>
        <Box p={3} sx={{ minHeight: "50vh" }}>
        <h1 style={{ marginTop: "-20px", marginLeft: "-50px"}}>My Profile</h1>
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
                    <FormControl component="fieldset" fullWidth margin="normal">
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
                    <FormControl component="fieldset" fullWidth margin="normal">
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
                    <FormControl component="fieldset" fullWidth margin="normal">
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
                    <Box mt={-3} mb={5}>
                      <h3>Budget Level</h3>
                      <p>{budgetLevel}</p>
                    </Box>
                    <Box mt={-3} mb={5}>
                      <h3>Accommodation Rating</h3>
                      <p>{accommodationRating}-Star</p>
                    </Box>
                    <Box mt={-3} mb={5}>
                      <h3>Activities</h3>
                      <List sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
                        {selectedActivities.map((activity) => (
                          <ListItem key={activity}>{activity}</ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box mt={4}>
                      <Typography variant="h6">My Itineraries</Typography>
                      {itineraries.length > 0 ? (
                         <Carousel 
                         indicators={true}  // Dots to indicate slides
                         navButtonsAlwaysVisible={true}  // Navigation arrows always visible
                       >
                          {itineraries.map((itinerary, index) => {
                            // Extract the title (text between "##" and "Day 1")
                            const itineraryTitle = itinerary.itineraryText
                              .split("**Day 1")[0] // Get the part before "Day 1"
                              .replace("##", "") // Remove "##"
                              .trim(); // Remove any extra spaces

                            return (
                              <Card
                                key={index}
                                sx={{
                                  width: 200, // Adjust card width as needed
                                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  padding: 2,
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                                onClick={() => handleItineraryClick(itinerary)}
                              >
                                <CardMedia
                                  component="img"
                                  image={itinerary.image}
                                  alt={itinerary.destination}
                                  onError={(e) => {
                                    e.target.src = itinerary.altimage; // Set fallback image if the primary image fails to load
                                  }}
                                  style={{ width: "100%", height: "200px" }}
                                />
                                <Box
                                  sx={{
                                    position: "absolute",
                                    bottom: 0, // Position text at the bottom of the image
                                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional dark overlay for contrast

                                    left: 0,
                                    width: "100%",
                                    color: "white",
                                    padding: 2,
                                    "& *": {
                                      color: "white !important", // Ensure all nested elements have white text
                                    },
                                  }}
                                >
                                  <Typography variant="body6">
                                    Created {itinerary.createdAt}
                                  </Typography>
                                </Box>
                                <IconButton
                                  aria-label="delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(itinerary);
                                  }}
                                  sx={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    '&:hover': {
                                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                                    },
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Card>
                            );
                          })}
                          </Carousel>
                      ) : (
                        <Typography>No itineraries found.</Typography>
                      )}
                      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Delete Itinerary?"}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this itinerary? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
        </Dialog>
        <Dialog
  open={Boolean(selectedItinerary)}
  onClose={handleCloseDialog}
  fullWidth
  maxWidth="md" // Set dialog size
>
  <DialogTitle>Itinerary Details</DialogTitle>
  <DialogContent>
    {selectedItinerary && (
      <Box>
        {/* Destination image at the top with full width */}
        <CardMedia
          component="img"
          height="300"
          image={selectedItinerary.image}
          alt={selectedItinerary.destination}
          onError={(e) => {
            e.target.src = selectedItinerary.altimage; // Set fallback image
          }}
        />

        {/* Itinerary information */}
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontWeight: "bold",
            marginTop: "20px",
            color: "#333", // Darker color for the title
          }}
        >
          {selectedItinerary.title}
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          style={{
            color: "#666", // Slightly lighter for subtitle
            marginBottom: "10px",
          }}
        >

        </Typography>

        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
          style={{ fontStyle: "italic" }}
        >
          Created on {selectedItinerary.createdAt}
        </Typography>

        {/* Day-by-day itinerary */}
        {selectedItinerary.itineraryText && (
          <Box mt={2}>
            <Grid container spacing={2}>
              {selectedItinerary.itineraryText
                .split(/(?=\*\*Day \d+:)/g) // Split by "Day"
                .filter((day) => day.trim() !== "") // Filter out empty days
                .map((dayText, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for card
                        backgroundColor: "#fafafa", // Light background for readability
                      }}
                    >
                      <CardContent>
                        {/* Use ReactMarkdown to render markdown content */}
                        <ReactMarkdown
                          children={dayText}
                          remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown
                          components={{
                            h1: ({node, ...props}) => <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px", color: "#333" }} {...props} />,
                            p: ({node, ...props}) => <Typography variant="body1" style={{ color: "#555", lineHeight: "1.5" }} {...props} />,
                            ul: ({node, ...props}) => <ul style={{ marginLeft: "20px" }} {...props} />,
                            li: ({node, ...props}) => <li style={{ color: "#555" }} {...props} />,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>
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
    </Box>
  );
};

export default Profile;