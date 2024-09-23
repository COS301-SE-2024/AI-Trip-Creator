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
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import "./dashboard.css";

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
          const itinerariesList = itinerariesSnapshot.docs.map((doc) =>
            doc.data(),
          );
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
      <Box p={3} sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}>
        <Box p={3} sx={{ minHeight: "50vh" }}>
          <h1 style={{ marginTop: "-20px" }}>My Profile</h1>
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
                      <h3>My Itineraries</h3>
                      {itineraries.length > 0 ? (
                        <Box display="flex" flexWrap="wrap" gap={2}>
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
                                  alt={itinerary.name}
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
                                    {itineraryTitle}
                                    <br />
                                    Created {itinerary.createdAt}
                                  </Typography>
                                </Box>
                              </Card>
                            );
                          })}
                        </Box>
                      ) : (
                        <Typography>No itineraries found.</Typography>
                      )}
                      <Dialog
                        open={Boolean(selectedItinerary)}
                        onClose={handleCloseDialog}
                        fullWidth
                      >
                        <DialogTitle>Itinerary Details</DialogTitle>
                        <DialogContent>
                          {selectedItinerary && (
                            <Box>
                              <Typography variant="body3">
                                Trip to {selectedItinerary.destination}
                                <br />
                                {`Duration: ${selectedItinerary.duration}`}
                                <br />
                                {`Created: ${selectedItinerary.createdAt}`}
                                <br />
                                {` ${selectedItinerary.itineraryText}`}
                              </Typography>
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
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <h1>Analytic Dashboard</h1>
          <Typography variant="body1" paragraph>
            Welcome to your analytics dashboard. Here you can view insights
            about user activity and trip creation.
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Analytics
          </Typography>
          <Grid container spacing={3}>
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
                  justifyContent="center"
                  alignItems="center"
                  height="150px"
                >
                  <CircularProgress />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Loading travel trends data...
                </Typography>
              </Paper>
            </Grid>
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
                  justifyContent="center"
                  alignItems="center"
                  height="150px"
                >
                  <CircularProgress />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Loading popular destinations data...
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
              >
                <Typography variant="h6" gutterBottom>
                  User Activity
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="150px"
                >
                  <CircularProgress />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Loading user activity data...
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
