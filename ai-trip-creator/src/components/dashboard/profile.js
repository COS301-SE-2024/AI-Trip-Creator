// src/components/dashboard/profile.js
import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import Sidebar from './sidebar';
import "./dashboard.css"

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    preferences: ["Beach", "Adventure", "Luxury"]
  };

  return (
    <Box display="flex" className="dashboard">
      <Sidebar />
      <Box className="content" flexGrow={1} p={3}>
        <h1>My Profile</h1>
        <Box className="profile-content" mt={2}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography variant="h6" mt={2}>Preferences:</Typography>
          <List>
            {user.preferences.map(pref => (
              <ListItem key={pref}>{pref}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
