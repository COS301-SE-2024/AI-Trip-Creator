import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, MenuItem, List, ListItem, Select, InputLabel, FormControl } from '@mui/material';
import Sidebar from './sidebar';
import { useTheme } from '@mui/material/styles'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./dashboard.css";

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const auth = getAuth();

  const [user, setUser] = useState({
    name: "",
    email: "",
    preferences: ["Beach", "Adventure", "Luxury"]
  });

  const [editing, setEditing] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState(user.preferences);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser((prevUser) => ({
          ...prevUser,
          email: firebaseUser.email || ""
        }));
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePreferencesChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPreferences(
      typeof value === 'string' ? value.split(',') : value,
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
          email: currentUser.email,
          preferences: selectedPreferences,
        };

        console.log("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  };

  const preferencesOptions = ["Beach", "Adventure", "Luxury", "Culture", "Food", "Nightlife"];

  return (
    <Box display="flex" className="dashboard">
      <Sidebar />
      <Box className="content" flexGrow={1} p={3}>
        <h1>My Profile</h1>
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
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography variant="h6" mt={2}>
                  Preferences:
                </Typography>
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
      </Box>
    </Box>
  );
};

export default Profile;
