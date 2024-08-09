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
          // Fetch the user's profile from the 'users' collection
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

          // Fetch the user's preferences from the 'Preferences' collection
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
        // Save the user's preferences to the 'Preferences' collection
        await setDoc(
          doc(db, "Preferences", currentUser.uid),
          updatedPreferences,
          { merge: true },
        );

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
    <Box display="flex" className="dashboard">
      <Sidebar />
      <Box className="content" flexGrow={1} p={0.5}>
        <h1>My Profile</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <Card
            sx={{
              backgroundColor: isDarkMode ? "#666666" : "#b4c5e4",
              marginBottom: "1rem",
            }}
          >
            <CardContent sx={{ color: isDarkMode ? "#FFFFFF" : "#000000" }}>
              {editing ? (
                <>
                  <TextField
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled
                  />

                  <FormControl component="fieldset" fullWidth margin="normal">
                    <Typography variant="h6">Budget Level</Typography>
                    <ToggleButtonGroup
                      value={budgetLevel}
                      exclusive
                      onChange={handleBudgetChange}
                      aria-label="Budget Level"
                      fullWidth
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
                    <Typography variant="h6">Accommodation Rating</Typography>
                    <ToggleButtonGroup
                      value={accommodationRating}
                      exclusive
                      onChange={handleRatingChange}
                      aria-label="Accommodation Rating"
                      fullWidth
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
                    <Typography variant="h6">Interests</Typography>
                    <ToggleButtonGroup
                      aria-label="Interests"
                      fullWidth
                      value={selectedPreferences}
                      onChange={handlePreferencesChange}
                      sx={{ flexWrap: "wrap" }}
                    >
                      {activitiesOptions.map((activity) => (
                        <ToggleButton
                          key={activity}
                          value={activity}
                          aria-label={activity}
                          sx={{
                            borderRadius: "50%",
                            margin: "4px",
                            "&.Mui-selected": {
                              backgroundColor: "#007bff",
                              color: "#fff",
                            },
                          }}
                        >
                          {activity}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </FormControl>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCancel}
                      sx={{ mt: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                      sx={{ mt: 2 }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <h2>{user.name}</h2>
                  <Typography>Email: {user.email}</Typography>
                  <Typography variant="h6">Preferences:</Typography>
                  <List>
                    {user.preferences.interests.map((pref) => (
                      <ListItem key={pref}>{pref}</ListItem>
                    ))}
                  </List>
                  <Typography variant="h6">
                    Budget Level: {user.preferences.budget}
                  </Typography>
                  <Typography variant="h6">
                    Accommodation Rating: {user.preferences.accommodationRating}{" "}
                    Stars
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditing(true)}
                    sx={{ mt: 2 }}
                  >
                    Edit
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
