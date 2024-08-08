import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, MenuItem, List, ListItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import Sidebar from './sidebar';
import { useTheme } from '@mui/material/styles'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config"; 
import "./dashboard.css";

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const auth = getAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    preferences: []
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Fetch the user's name from the 'users' collection
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let userData = {
            name: "John Doe",
            email: currentUser.email,
            preferences: []
          };

          if (userDocSnap.exists()) {
            userData.name = userDocSnap.data().name || userData.name;
          }

          // Fetch the user's preferences from the 'Preferences' collection
          const prefsDocRef = doc(db, "Preferences", currentUser.uid);
          const prefsDocSnap = await getDoc(prefsDocRef);

          if (prefsDocSnap.exists()) {
            userData.preferences = prefsDocSnap.data().preferences || [];
          }

          setUser(userData);
          setSelectedPreferences(userData.preferences);
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

  const handlePreferencesChange = (event) => {
    const { value } = event.target;
    setSelectedPreferences(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleSave = async () => {
    setUser({ ...user, preferences: selectedPreferences });
    setEditing(false);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userProfile = {
          name: user.name,
          preferences: selectedPreferences
        };

        // Save the user's name to the 'users' collection
        await setDoc(doc(db, "users", currentUser.uid), { name: user.name }, { merge: true });

        // Save the user's preferences to the 'Preferences' collection
        await setDoc(doc(db, "Preferences", currentUser.uid), { preferences: selectedPreferences }, { merge: true });

        console.log("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const preferencesOptions = ["Beach", "Adventure", "Luxury", "Culture", "Food", "Nightlife"];

  return (
    <Box display="flex" className="dashboard">
      <Sidebar />
      <Box className="content" flexGrow={1} p={3}>
        <h1>My Profile</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <Card sx={{ backgroundColor: isDarkMode ? '#666666' : '#b4c5e4', marginBottom: '1rem' }}>
            <CardContent sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
              {editing ? (
                <>
                  <TextField
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
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Preferences</InputLabel>
                    <Select
                      multiple
                      value={selectedPreferences}
                      onChange={handlePreferencesChange}
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {preferencesOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <h2>
                    {user.name}
                  </h2>
                  <Typography>Email: {user.email}</Typography>
                  <h3>Preferences</h3>
                  <List>
                    {user.preferences.map(pref => (
                      <ListItem key={pref}>{pref}</ListItem>
                    ))}
                  </List>
                  <Button variant="contained" color="primary" onClick={() => setEditing(true)} sx={{ mt: 2 }}>
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
