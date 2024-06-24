// import React from 'react';
// import { Box, Typography, Card, CardContent, List, ListItem } from '@mui/material';
// import Sidebar from './sidebar';
// import { useTheme } from '@mui/material/styles';
// import "./dashboard.css";

// const Profile = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === 'dark';

//   const user = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     preferences: ["Beach", "Adventure", "Luxury"]
//   };

//   return (
//     <Box display="flex" className="dashboard">
//       <Sidebar />
//       <Box className="content" flexGrow={1} p={3}>
//       <h1>My Profile</h1>
//         <Card sx={{ backgroundColor: isDarkMode ? '#666666 ' : '#b4c5e4', marginBottom: '1rem' }}>
//           <CardContent sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
//             <Typography variant="h5" component="h2">
//               {user.name}
//             </Typography>
//             <Typography>Email: {user.email}</Typography>
//             <Typography variant="h6" mt={2}>
//               Preferences:
//             </Typography>
//             <List>
//               {user.preferences.map(pref => (
//                 <ListItem key={pref}>{pref}</ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Profile;

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
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from './sidebar';
import { useTheme } from '@mui/material/styles';
import "./dashboard.css";

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
                <List>
                  {editData.preferences.map((pref, index) => (
                    <ListItem key={index}>
                      <TextField
                        name="preferences"
                        value={pref}
                        onChange={(e) => {
                          const newPreferences = [...editData.preferences];
                          newPreferences[index] = e.target.value;
                          setEditData({ ...editData, preferences: newPreferences });
                        }}
                        fullWidth
                        variant="outlined"
                      />
                    </ListItem>
                  ))}
                </List>
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
