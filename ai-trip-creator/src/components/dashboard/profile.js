import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  FormControl,
} from "@mui/material";
import Sidebar from "./sidebar";
import { useTheme } from "@mui/material/styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import "./dashboard.css";

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const auth = getAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let userData = {
            name: "John Doe",
            email: currentUser.email,
            preferences: {
              interests: [],
              budget: "Cheap",
              accommodationRating: "1",
              activities: [],
            },
          };

          if (userDocSnap.exists()) {
            userData.name = userDocSnap.data().name || userData.name;
            userData.preferences.budget =
              userDocSnap.data().budget || userData.preferences.budget;
            userData.preferences.accommodationRating =
              userDocSnap.data().accommodationRating ||
              userData.preferences.accommodationRating;
            userData.preferences.activities =
              userDocSnap.data().activities || userData.preferences.activities;
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
    const updatedPreferences = {
      interests: selectedPreferences,
      budget: budgetLevel,
      accommodationRating: accommodationRating,
      activities: selectedActivities,
    };

    setUser({ ...user, preferences: updatedPreferences });
    setEditing(false);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await setDoc(
          doc(db, "Preferences", currentUser.uid),
          updatedPreferences,
          { merge: true },
        );
        await setDoc(doc(db, "users", currentUser.uid), {
          name: user.name,
          preferences: updatedPreferences,
        });
        console.log("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    setSelectedPreferences(user.preferences.interests);
    setBudgetLevel(user.preferences.budget);
    setAccommodationRating(user.preferences.accommodationRating);
    setSelectedActivities(user.preferences.activities);
    setEditing(false);
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
    <Box display="flex" justifyContent="center" alignItems="center" p={3} sx={{ minHeight: "100vh", backgroundColor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}>
      <Sidebar />
      <Box flexGrow={1} maxWidth="800px">
        {/* <Typography variant="h4" component="h1" align="center" color="primary" gutterBottom>
          My Profile
        </Typography> */}
        <h1>My Profile</h1>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <Card
            sx={{
              backgroundColor: isDarkMode ? "#424242" : "#ffffff",
              borderRadius: "16px",
              width: "1000px",
              boxShadow: isDarkMode ? "0px 4px 20px rgba(0, 0, 0, 0.5)" : "0px 4px 20px rgba(0, 0, 0, 0.1)",
              padding: "24px",
            }}
          >
            <CardContent>
              {editing ? (
                <>
                  <TextField
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  />

                  <FormControl component="fieldset" fullWidth margin="normal">
                    {/* <Typography variant="h6">Budget Level</Typography> */}
                    <h3>Budget Level</h3>
                    <ToggleButtonGroup
                      value={budgetLevel}
                      exclusive
                      onChange={handleBudgetChange}
                      aria-label="Budget Level"
                      fullWidth
                      sx={{
                        "& .MuiToggleButton-root": {
                          borderRadius: "8px",
                          padding: "10px 20px",
                          margin: "8px",
                          "&.Mui-selected": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                          },
                        },
                      }}
                    >
                      <ToggleButton value="Cheap" aria-label="Cheap">
                        Cheap
                      </ToggleButton>
                      <ToggleButton value="Mild" aria-label="Mild">
                        Mild
                      </ToggleButton>
                      <ToggleButton value="High" aria-label="High">
                      High
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth margin="normal">
                {/* <Typography variant="h6">Accommodation Rating</Typography> */}
                <h3>Accommodation Rating</h3>
                <ToggleButtonGroup
                  value={accommodationRating}
                  exclusive
                  onChange={handleRatingChange}
                  aria-label="Accommodation Rating"
                  fullWidth
                  sx={{
                    "& .MuiToggleButton-root": {
                      borderRadius: "8px",
                      padding: "10px 20px",
                      margin: "8px",
                      "&.Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                      },
                    },
                  }}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <ToggleButton
                      key={star}
                      value={star}
                      aria-label={`Rating ${star}`}
                    >
                      {star} Stars
                    </ToggleButton>
                  ))}
                  </ToggleButtonGroup>
                  </FormControl>
                  <FormControl component="fieldset" fullWidth margin="normal">
                    {/* <Typography variant="h6">Interests</Typography> */}
                    <h3>Interests</h3>
                    <ToggleButtonGroup
                      value={selectedPreferences}
                      onChange={handlePreferencesChange}
                      aria-label="Interests"
                      fullWidth
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& .MuiToggleButton-root": {
                          // borderRadius: "100%",
                          
                          width: "223px",
                          // padding: "10px 15px",
                          margin: "8px",
                          "&.Mui-selected": {
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            
                          },
                        },
                      }}
                    >
                      {activitiesOptions.map((activity) => (
                        <ToggleButton
                          key={activity}
                          value={activity}
                          aria-label={activity}
                        >
                          {activity}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </FormControl>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCancel}
                      sx={{
                        backgroundColor: "#f50057",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#c51162",
                        },
                        "&:focus": {
                          boxShadow: "0px 0px 8px rgba(245, 0, 87, 0.5)",
                        },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#1565c0",
                        },
                        "&:focus": {
                          boxShadow: "0px 0px 8px rgba(25, 118, 210, 0.5)",
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  {/* <Typography variant="h5" component="h2" mb={2}>
                    {user.name}
                  </Typography> */}
                  <h3>{user.name}</h3>
                  
                  <Typography variant="body1" color="textSecondary">
                    Email: {user.email}
                  </Typography>
                  
                  {/* <Typography variant="h6" mt={2}>
                    Preferences
                  </Typography> */}
                  <h2>Preferences</h2>
                  <List>
                    {user.preferences.interests.map((pref) => (
                      <ListItem key={pref}>{pref}</ListItem>
                    ))}
                  </List>
                  <Typography variant="body1">
                    Budget Level: {user.preferences.budget}
                  </Typography>
                  <Typography variant="body1">
                    Accommodation Rating: {user.preferences.accommodationRating}{" "}
                    Stars
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditing(true)}
                    sx={{
                      mt: 3,
                      padding: "10px 20px",
                      borderRadius: "8px",
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                      "&:focus": {
                        boxShadow: "0px 0px 8px rgba(25, 118, 210, 0.5)",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default Profile;

