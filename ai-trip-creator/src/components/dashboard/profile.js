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

// import React, { useState, useContext } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   MenuItem,
//   List,
//   ListItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Grid
// } from '@mui/material';
// import Sidebar from './sidebar';
// import { useTheme } from '@mui/material/styles';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import { useUser } from '../UserContext/UserContext';  // Import useUser hook
// import './dashboard.css';

// const Profile = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === 'dark';
//   const user = useUser();  // Use the user from UserContext

//   const initialUser = {
//     name: user?.displayName || "John Doe",  // Use user data if available
//     email: user?.email || "john.doe@example.com",
//     preferences: ["Beach", "Adventure", "Luxury"]
//   };

//   const [profileData, setProfileData] = useState(initialUser);
//   const [editing, setEditing] = useState(false);
//   const [selectedPreferences, setSelectedPreferences] = useState(profileData.preferences);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handlePreferencesChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedPreferences(
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   const handleSave = () => {
//     setProfileData({ ...profileData, preferences: selectedPreferences });
//     setEditing(false);
//   };

//   const preferencesOptions = ["Beach", "Adventure", "Luxury", "Culture", "Food", "Nightlife"];

//   return (
//     <Box display="flex" className="dashboard">
//       <Sidebar />
//       <Box className="content" flexGrow={1} p={3}>
//         <h1>My Profile</h1>
//         <Card sx={{ backgroundColor: isDarkMode ? '#666666' : '#b4c5e4', marginBottom: '1rem', padding: '1rem' }}>
//           <CardContent sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
//             {editing ? (
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Name"
//                     name="name"
//                     value={profileData.name}
//                     onChange={handleInputChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Email"
//                     name="email"
//                     value={profileData.email}
//                     onChange={handleInputChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <FormControl fullWidth>
//                     <InputLabel>Preferences</InputLabel>
//                     <Select
//                       multiple
//                       value={selectedPreferences}
//                       onChange={handlePreferencesChange}
//                       renderValue={(selected) => selected.join(', ')}
//                     >
//                       {preferencesOptions.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} display="flex" justifyContent="flex-end">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSave}
//                     startIcon={<SaveIcon />}
//                     sx={{ mt: 2 }}
//                   >
//                     Save
//                   </Button>
//                 </Grid>
//               </Grid>
//             ) : (
//               <>
//                 <Typography variant="h5" component="h2" gutterBottom>
//                   {profileData.name}
//                 </Typography>
//                 <Typography gutterBottom>Email: {profileData.email}</Typography>
//                 <Typography variant="h6" mt={2} gutterBottom>
//                   Preferences:
//                 </Typography>
//                 <List>
//                   {profileData.preferences.map(pref => (
//                     <ListItem key={pref}>{pref}</ListItem>
//                   ))}
//                 </List>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => setEditing(true)}
//                   startIcon={<EditIcon />}
//                   sx={{ mt: 2 }}
//                 >
//                   Edit Profile
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Profile;


// import React, { useState } from 'react';
// import { Box, Typography, Card, CardContent, TextField, Button, MenuItem, List, ListItem, Select, InputLabel, FormControl } from '@mui/material';
// import Sidebar from './sidebar';
// import { useTheme } from '@mui/material/styles';
// import { addDoc, collection } from "firebase/firestore"; 
// import { db } from "./firebase"; 
// import "./dashboard.css";

// const Profile = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === 'dark';

//   const usersCollectionRef = collection(db, "Profile"); 


//   const initialUser = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     preferences: ["Beach", "Adventure", "Luxury"]
//   };  

//   const [user, setUser] = useState(initialUser);
//   const [editing, setEditing] = useState(false);
//   const [selectedPreferences, setSelectedPreferences] = useState(user.preferences);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handlePreferencesChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedPreferences(
//       typeof value === 'string' ? value.split(',') : value,
//     );
//   };

//   const handleSave = () => {
//     setUser({ ...user, preferences: selectedPreferences });
//     setEditing(false);
//   };

//   const preferencesOptions = ["Beach", "Adventure", "Luxury", "Culture", "Food", "Nightlife"];

//   return (
//     <Box display="flex" className="dashboard">
//       <Sidebar />
//       <Box className="content" flexGrow={1} p={3}>
//         <h1>My Profile</h1>
//         <Card sx={{ backgroundColor: isDarkMode ? '#666666' : '#b4c5e4', marginBottom: '1rem' }}>
//           <CardContent sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
//             {editing ? (
//               <>
//                 <TextField
//                   label="Name"
//                   name="name"
//                   value={user.name}
//                   onChange={handleInputChange}
//                   fullWidth
//                   margin="normal"
//                 />
//                 <TextField
//                   label="Email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleInputChange}
//                   fullWidth
//                   margin="normal"
//                 />
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel>Preferences</InputLabel>
//                   <Select
//                     multiple
//                     value={selectedPreferences}
//                     onChange={handlePreferencesChange}
//                     renderValue={(selected) => selected.join(', ')}
//                   >
//                     {preferencesOptions.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
//                   Save
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Typography variant="h5" component="h2">
//                   {user.name}
//                 </Typography>
//                 <Typography>Email: {user.email}</Typography>
//                 <Typography variant="h6" mt={2}>
//                   Preferences:
//                 </Typography>
//                 <List>
//                   {user.preferences.map(pref => (
//                     <ListItem key={pref}>{pref}</ListItem>
//                   ))}
//                 </List>
//                 <Button variant="contained" color="primary" onClick={() => setEditing(true)} sx={{ mt: 2 }}>
//                   Edit Profile
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, MenuItem, List, ListItem, Select, InputLabel, FormControl } from '@mui/material';
import Sidebar from './sidebar';
import { useTheme } from '@mui/material/styles';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { db, auth } from "../../firebase/firebase-config"; 
import { getAuth } from 'firebase/auth';
import "./dashboard.css";

const Profile = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const auth = getAuth();
  const currUser = auth.currentUser;
  let email = "";

  
  if (currUser != null) {
    //const displayName = currUser..name;
    
    const email = currUser.emailVerified;
    
  } 
  else {
    
  }

  const initialUser = {
    name: "John Doe",
    email: email,
    preferences: ["Beach", "Adventure", "Luxury"]
  };  



  const [user, setUser] = useState(initialUser);
  const [editing, setEditing] = useState(false);
  const [selectedPreferences, setSelectedPreferences] = useState(user.preferences);

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
      const user = auth.currentUser;
      if (user) {
        const userProfile = {
          name: user.name,
          email: user.email,
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
