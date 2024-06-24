import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './sidebar';
import { useTheme } from '@mui/material/styles';
import "./dashboard.css";

const preferencesOptions = ["Beach", "Adventure", "Luxury", "Culture", "Food", "Nature"];

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    preferences: ["Beach", "Adventure", "Luxury"]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handlePreferencesChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditData({
      ...editData,
      preferences: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  return (
    <Box display="flex" className="dashboard">
      <Sidebar />
      <Box className="content" flexGrow={1} p={3}>
        {/* <Typography variant="h4" gutterBottom>My Profile</Typography> */}
        <h1>My Profile</h1>
        <Card sx={{ backgroundColor: isDarkMode ? '#666666' : '#b4c5e4', marginBottom: '1rem' }}>
          <CardContent sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
            {isEditing ? (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Typography variant="h6" mt={2}>
                  Preferences:
                </Typography>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Preferences</InputLabel>
                  <Select
                    multiple
                    value={editData.preferences}
                    onChange={handlePreferencesChange}
                    input={<OutlinedInput label="Preferences" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {preferencesOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    startIcon={<CheckIcon />}
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CloseIcon />}
                    onClick={handleCancel}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" component="h2">
                  {user.name}
                  <IconButton onClick={() => setIsEditing(true)} sx={{ ml: 1 }}>
                    <EditIcon />
                  </IconButton>
                </Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography variant="h6" mt={2}>
                  Preferences:
                </Typography>
                <List>
                  {user.preferences.map((pref, index) => (
                    <ListItem key={index}>{pref}</ListItem>
                  ))}
                </List>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Profile;
