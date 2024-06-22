import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem } from '@mui/material';
import Sidebar from './sidebar';
import { useTheme } from '@mui/material/styles';
import "./dashboard.css";

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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
        <Card sx={{ backgroundColor: isDarkMode ? '#0077b6' : '#b4c5e4', marginBottom: '1rem' }}>
          <CardContent sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
