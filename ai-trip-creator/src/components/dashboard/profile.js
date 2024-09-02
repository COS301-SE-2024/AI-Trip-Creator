// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Avatar,
//   CircularProgress,
//   FormControl,
//   ToggleButton,
//   ToggleButtonGroup,
//   List,
//   ListItem,
  
// } from "@mui/material";
// import Sidebar from "./sidebar";
// import { useTheme } from "@mui/material/styles";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase-config";
// import "./dashboard.css";

// const Profile = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const auth = getAuth();

  
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     photoURL: "",
//     preferences: {
//       interests: [],
//       budget: "",
//       accommodationRating: "",
//       activities: [],
//     },
//   });
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [selectedPreferences, setSelectedPreferences] = useState([]);
//   const [budgetLevel, setBudgetLevel] = useState("");
//   const [accommodationRating, setAccommodationRating] = useState("");
//   const [selectedActivities, setSelectedActivities] = useState([]);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [profilePicturePreview, setProfilePicturePreview] = useState("");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         try {
//           const userDocRef = doc(db, "users", currentUser.uid);
//           const userDocSnap = await getDoc(userDocRef);

//           let userData = {
//             name: "John Doe",
//             email: currentUser.email,
//             photoURL: "",
//             preferences: {
//               interests: [],
//               budget: "Cheap",
//               accommodationRating: "1",
//               activities: [],
//             },
//           };

//           if (userDocSnap.exists()) {
//             const docData = userDocSnap.data();
//             userData.name = docData.name || userData.name;
//             userData.photoURL = docData.photoURL || "";
//             userData.preferences.budget =
//               docData.budget || userData.preferences.budget;
//             userData.preferences.accommodationRating =
//               docData.accommodationRating ||
//               userData.preferences.accommodationRating;
//             userData.preferences.activities =
//               docData.activities || userData.preferences.activities;
//           }

//           const prefsDocRef = doc(db, "Preferences", currentUser.uid);
//           const prefsDocSnap = await getDoc(prefsDocRef);

//           if (prefsDocSnap.exists()) {
//             userData.preferences.interests =
//               prefsDocSnap.data().preferences || userData.preferences.interests;
//             userData.preferences.budget =
//               prefsDocSnap.data().budget || userData.preferences.budget;
//             userData.preferences.accommodationRating =
//               prefsDocSnap.data().accommodationRating ||
//               userData.preferences.accommodationRating;
//             userData.preferences.activities =
//               prefsDocSnap.data().activities || userData.preferences.activities;
//           }

//           setUser(userData);
//           setSelectedPreferences(userData.preferences.interests);
//           setBudgetLevel(userData.preferences.budget);
//           setAccommodationRating(userData.preferences.accommodationRating);
//           setSelectedActivities(userData.preferences.activities);
//           setProfilePicturePreview(userData.photoURL);
//         } catch (error) {
//           console.error("Error loading user data:", error);
//         }
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePicture(file);
//       setProfilePicturePreview(URL.createObjectURL(file));
//     }
//   };

//   const handlePreferencesChange = (event, newPreferences) => {
//     setSelectedPreferences(newPreferences);
//   };

//   const handleBudgetChange = (event, newBudget) => {
//     if (newBudget !== null) {
//       setBudgetLevel(newBudget);
//     }
//   };

//   const handleRatingChange = (event, newRating) => {
//     if (newRating !== null) {
//       setAccommodationRating(newRating);
//     }
//   };

//   const handleActivitiesChange = (event, newActivities) => {
//     setSelectedActivities(newActivities);
//   };

//   const handleSave = async () => {
//     let photoURL = user.photoURL;

//     if (profilePicture) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         photoURL = reader.result;

//         const updatedUser = {
//           ...user,
//           photoURL,
//           preferences: {
//             interests: selectedPreferences,
//             budget: budgetLevel,
//             accommodationRating: accommodationRating,
//             activities: selectedActivities,
//           },
//         };

//         setUser(updatedUser);
//         setEditing(false);

//         try {
//           const currentUser = auth.currentUser;
//           if (currentUser) {
//             await setDoc(doc(db, "users", currentUser.uid), updatedUser, {
//               merge: true,
//             });
//             await setDoc(
//               doc(db, "Preferences", currentUser.uid),
//               updatedUser.preferences,
//               { merge: true }
//             );
//             console.log("Profile saved successfully!");
//           }
//         } catch (error) {
//           console.error("Error saving profile:", error);
//         }
//       };
//       reader.readAsDataURL(profilePicture);
//     } else {
//       const updatedUser = {
//         ...user,
//         preferences: {
//           interests: selectedPreferences,
//           budget: budgetLevel,
//           accommodationRating: accommodationRating,
//           activities: selectedActivities,
//         },
//       };

//       setUser(updatedUser);
//       setEditing(false);

//       try {
//         const currentUser = auth.currentUser;
//         if (currentUser) {
//           await setDoc(doc(db, "users", currentUser.uid), updatedUser, {
//             merge: true,
//           });
//           await setDoc(
//             doc(db, "Preferences", currentUser.uid),
//             updatedUser.preferences,
//             { merge: true }
//           );
//           console.log("Profile saved successfully!");
//         }
//       } catch (error) {
//         console.error("Error saving profile:", error);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setSelectedPreferences(user.preferences.interests);
//     setBudgetLevel(user.preferences.budget);
//     setAccommodationRating(user.preferences.accommodationRating);
//     setSelectedActivities(user.preferences.activities);
//     setProfilePicturePreview(user.photoURL);
//     setEditing(false);
//   };

//   const activitiesOptions = [
//     "Outdoor",
//     "Indoor",
//     "Shopping",
//     "Amusement Park",
//     "Historical",
//     "Art",
//     "Beach",
//     "Adventure",
//     "Luxury",
//     "Culture",
//     "Food",
//     "Nightlife",
//   ];

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       p={3}
//       sx={{ minHeight: "100vh", backgroundColor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}
//     >
//       <Sidebar />
//       <Box flexGrow={1} maxWidth="800px">
//         <h1>My Profile</h1>
//         {loading ? (
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="50vh"
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Card
//             sx={{
//               backgroundColor: isDarkMode ? "#424242" : "#ffffff",
//               borderRadius: "16px",
//               width: "1000px",
//               boxShadow: isDarkMode
//                 ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
//                 : "0px 4px 20px rgba(0, 0, 0, 0.1)",
//               padding: "24px",
//             }}
//           >
//             <CardContent>
//               {editing ? (
//                 <>
//                   <Box display="flex" flexDirection="column" alignItems="center">
//                     <Avatar
//                       alt={user.name}
//                       src={profilePicturePreview}
//                       sx={{ width: 120, height: 120, mb: 2 }}
//                     />
//                     <Button
//                       variant="contained"
//                       component="label"
//                       sx={{
//                         mb: 2,
//                         backgroundColor: "#800080",
//                         color: "#FFFFFF",
//                           "&:hover": {
//                             backgroundColor: "#6A19B5",
//                             color: "#fff",
                    
//                         },
//                       }}
//                     >
//                       Upload New Picture
//                       <input
//                         type="file"
//                         hidden
//                         onChange={handleProfilePictureChange}
//                       />
//                     </Button>
//                   </Box>
//                   <TextField
//                     label="Name"
//                     name="name"
//                     value={user.name}
//                     onChange={handleInputChange}
//                     fullWidth
//                     margin="normal"
//                   />
//                   <TextField
//                     label="Email"
//                     name="email"
//                     value={user.email}
//                     fullWidth
//                     margin="normal"
//                     disabled
//                   />
//                   <FormControl component="fieldset" fullWidth margin="normal">
//                     <h3>Budget Level</h3>
//                     <ToggleButtonGroup
//                       value={budgetLevel}
//                       exclusive
//                       onChange={handleBudgetChange}
//                       fullWidth
//                       sx={{
//                         "& .MuiToggleButton-root": {
//                           "&.Mui-selected": {
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <ToggleButton value="Cheap">Cheap</ToggleButton>
//                       <ToggleButton value="Affordable">Affordable</ToggleButton>
//                       <ToggleButton value="Luxury">Luxury</ToggleButton>
//                     </ToggleButtonGroup>
//                   </FormControl>
//                   <FormControl component="fieldset" fullWidth margin="normal">
//                     <h3>Accommodation Rating</h3>
//                     <ToggleButtonGroup
//                       value={accommodationRating}
//                       exclusive
//                       onChange={handleRatingChange}
//                       fullWidth
//                       sx={{
//                         "& .MuiToggleButton-root": {
//                           "&.Mui-selected": {
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
//                           },
//                         },
//                       }}
//                     >
//                       <ToggleButton value="1">1-Star</ToggleButton>
//                       <ToggleButton value="2">2-Star</ToggleButton>
//                       <ToggleButton value="3">3-Star</ToggleButton>
//                       <ToggleButton value="4">4-Star</ToggleButton>
//                       <ToggleButton value="5">5-Star</ToggleButton>
//                     </ToggleButtonGroup>
//                   </FormControl>
//                   <FormControl component="fieldset" fullWidth margin="normal">
//                     <h3>Activities</h3>
//                     <ToggleButtonGroup
//                       value={selectedActivities}
//                       onChange={handleActivitiesChange}
//                       fullWidth
//                       multiple
//                       sx={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         "& .MuiToggleButton-root": {
//                           // borderRadius: "100%",
                          
//                           width: "223px",
//                           padding: "10px 15px",
//                           margin: "8px",
//                           "&.Mui-selected": {
//                             backgroundColor: "#1976d2",
//                             color: "#fff",
                            
//                           },
//                         },
//                       }}
//                     >
//                       {activitiesOptions.map((option) => (
//                         <ToggleButton key={option} value={option}>
//                           {option}
//                         </ToggleButton>
//                       ))}
//                     </ToggleButtonGroup>
//                   </FormControl>
//                   <Box mt={3} display="flex" justifyContent="center">
//                     <Button
//                       variant="contained"
//                       onClick={handleSave}
//                       sx={{
//                         mx:1,
//                         color: "#FFFFFF",
//                         backgroundColor: "#800080",
//                           "&:hover": {
//                             backgroundColor: "#6A19B5",
//                             color: "#fff",
                    
//                         },
//                       }}
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       onClick={handleCancel}
//                       sx={{ mx: 1 }}
//                     >
//                       Cancel
//                     </Button>
//                   </Box>
//                 </>
//               ) : (
//                 <>
//                   <Box display="flex" flexDirection="column" alignItems="center">
//                     <Avatar
//                       alt={user.name}
//                       src={profilePicturePreview}
//                       sx={{ width: 150, height: 150, mb: 1 }}
//                     />
//                     {/* <Typography variant="h5" gutterBottom>
//                       {user.name}
//                     </Typography> */}
//                     <h2 gutterBottom>{user.name}</h2>
//                     <Typography variant="body1" color="textSecondary" sx={{mt:-4}} gutterBottom >
//                       {user.email}
//                     </Typography>
//                   </Box>
//                   <Box mt={-3} mb={5} >
//                     <h3 >Budget Level</h3>
//                     <p>{budgetLevel}</p>
//                   </Box>
//                   <Box mt={-3} mb={5}>
//                     <h3>Accommodation Rating</h3>
//                     <p>{accommodationRating}-Star</p>
//                   </Box>
//                   <Box mt={-3} mb={5}>
//                     <h3>Activities</h3>
//                     <List>
//                       {selectedActivities.map((activity) => (
//                         <ListItem key={activity}>{activity}</ListItem>
//                       ))}
//                     </List>
//                   </Box>
//                   <Box mt={3} display="flex" justifyContent="center">
//                     <Button
//                       variant="contained"
//                       onClick={() => setEditing(true)}
//                       sx={{ mx: 1 }}
//                     >
//                       Edit Profile
//                     </Button>
//                   </Box>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Profile;

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
} from "@mui/material";
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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
              { merge: true }
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
            { merge: true }
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
      <Box flexGrow={1} p={3} sx={{ ml: isSmUp ? "240px" : "0" }}>
        <Container maxWidth="lg">
          {/* Profile Section */}
          <Box
            mt={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={3}
            sx={{ minHeight: "100vh", backgroundColor: isDarkMode ? "#2c2c2c" : "#f5f5f5" }}
          >
            <Box flexGrow={1} maxWidth="800px">
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
                    boxShadow: isDarkMode
                      ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
                      : "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    padding: "24px",
                  }}
                >
                  <CardContent>
                    {editing ? (
                      <>
                        <Box display="flex" flexDirection="column" alignItems="center">
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
                            <input type="file" hidden onChange={handleProfilePictureChange} />
                          </Button>
                          <TextField
                            label="Name"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            label="Email"
                            name="email"
                            value={user.email}
                            disabled
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Select Preferences:
                          </Typography>
                          <ToggleButtonGroup
                            value={selectedPreferences}
                            onChange={handlePreferencesChange}
                            aria-label="preferences"
                            sx={{
                              mb: 2,
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                              gap: "8px",
                            }}
                          >
                            {[
                              "Adventure",
                              "Beach",
                              "Culture",
                              "Food",
                              "Luxury",
                              "Nature",
                              "Shopping",
                            ].map((preference) => (
                              <ToggleButton
                                key={preference}
                                value={preference}
                                aria-label={preference}
                                selected={selectedPreferences.includes(preference)}
                              >
                                {preference}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Select Budget Level:
                          </Typography>
                          <ToggleButtonGroup
                            value={budgetLevel}
                            onChange={handleBudgetChange}
                            exclusive
                            aria-label="budget"
                            sx={{ mb: 2 }}
                          >
                            <ToggleButton value="Cheap">Cheap</ToggleButton>
                            <ToggleButton value="Moderate">Moderate</ToggleButton>
                            <ToggleButton value="Expensive">Expensive</ToggleButton>
                          </ToggleButtonGroup>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Accommodation Rating:
                          </Typography>
                          <ToggleButtonGroup
                            value={accommodationRating}
                            onChange={handleRatingChange}
                            exclusive
                            aria-label="accommodation rating"
                            sx={{ mb: 2 }}
                          >
                            <ToggleButton value="1">1 Star</ToggleButton>
                            <ToggleButton value="2">2 Star</ToggleButton>
                            <ToggleButton value="3">3 Star</ToggleButton>
                            <ToggleButton value="4">4 Star</ToggleButton>
                            <ToggleButton value="5">5 Star</ToggleButton>
                          </ToggleButtonGroup>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Select Activities:
                          </Typography>
                          <ToggleButtonGroup
                            value={selectedActivities}
                            onChange={handleActivitiesChange}
                            aria-label="activities"
                            sx={{
                              mb: 2,
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                              gap: "8px",
                            }}
                          >
                            {activitiesOptions.map((activity) => (
                              <ToggleButton
                                key={activity}
                                value={activity}
                                aria-label={activity}
                                selected={selectedActivities.includes(activity)}
                              >
                                {activity}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                              mt: 3,
                              backgroundColor: "#800080",
                              color: "#FFFFFF",
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
                            sx={{
                              mt: 3,
                              borderColor: "#800080",
                              color: "#800080",
                              "&:hover": {
                                backgroundColor: "#F3E5F5",
                                borderColor: "#6A19B5",
                                color: "#6A19B5",
                              },
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <Avatar
                            alt={user.name}
                            src={user.photoURL}
                            sx={{ width: 120, height: 120, mb: 2 }}
                          />
                          <Typography variant="h4" sx={{ mb: 1 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            {user.email}
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Preferences:
                          </Typography>
                          <List>
                            {selectedPreferences.map((preference) => (
                              <ListItem key={preference}>{preference}</ListItem>
                            ))}
                          </List>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Budget Level:
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {budgetLevel}
                          </Typography>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Accommodation Rating:
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {accommodationRating} Star
                          </Typography>
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            Selected Activities:
                          </Typography>
                          <List>
                            {selectedActivities.map((activity) => (
                              <ListItem key={activity}>{activity}</ListItem>
                            ))}
                          </List>
                        </Box>
                        <Button
                          variant="contained"
                          onClick={() => setEditing(true)}
                          sx={{
                            mt: 3,
                            backgroundColor: "#800080",
                            color: "#FFFFFF",
                            "&:hover": {
                              backgroundColor: "#6A19B5",
                              color: "#fff",
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

          {/* Analytics Dashboard Section */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mt: 4,
              borderRadius: "16px",
              backgroundColor: isDarkMode ? "#424242" : "#ffffff",
              boxShadow: isDarkMode
                ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
                : "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3 }}>
              Analytics Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Users</Typography>
                    <Typography variant="h3">1,234</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">New Sign-ups</Typography>
                    <Typography variant="h3">456</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Active Users</Typography>
                    <Typography variant="h3">789</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
