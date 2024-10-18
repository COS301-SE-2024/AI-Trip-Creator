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
//   Container,
//   Paper,
//   Grid,
//   Drawer,
//   useTheme,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   CardMedia,
//   Slider,
// } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import Carousel from 'react-material-ui-carousel';
// import Sidebar from "./sidebar";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   getDocs,
//   query,
//   where,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase/firebase-config";
// import "./dashboard.css";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// const SavedItineraries = () => {
//     const theme = useTheme();
//     const isDarkMode = theme.palette.mode === "dark";
//     const auth = getAuth();
//     const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

//     return (
//             <Box display="flex">
//               {/* Sidebar */}
//               <Drawer
//                 variant={isSmUp ? "permanent" : "temporary"}
//                 open={true}
//                 sx={{
//                   "& .MuiDrawer-paper": {
//                     boxSizing: "border-box",
//                     width: 240,
//                   },
//                 }}
//               >
//                 <Sidebar />
//               </Drawer>
        
//               {/* Main Content */}
//               <Box
//                 flexGrow={1}
//                 p={3}
//                 sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
//                 className="content" // Applying the content class from the CSS
//               >
//                 <Container maxWidth="lg">
//                   {/* Apply the same style as other headings */}
//                   <h1 className="heading1">Saved Itineraries</h1>
        
//                   <Grid container spacing={3}>
//                     <Grid item xs={12} md={6}>
//                       <Paper elevation={3} sx={{ p: 2 }} className="card">
//                         <Typography variant="body1" sx={{ fontSize: "18px", fontFamily: "Poppins" }}>
//                           You don't have any saved itineraries yet.
//                         </Typography>
//                       </Paper>
//                     </Grid>
//                   </Grid>
//                 </Container>
//               </Box>
//             </Box>
//     );
//   };

// export default SavedItineraries;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Paper,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const SavedItineraries = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [userId, setUserId] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get the currently authenticated user
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchSavedItineraries(user.uid);
      } else {
        setLoading(false);
        setError("No user authenticated");
      }
    });
  }, []);

  // Fetch itineraries from Firestore for the authenticated user
  const fetchSavedItineraries = async (uid) => {
    try {
      const itinerariesRef = collection(db, "ItineraryCollection");
      const q = query(itinerariesRef, where("user_id", "==", uid));
      const querySnapshot = await getDocs(q);
      const fetchedItineraries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItineraries(fetchedItineraries);
    } catch (error) {
      console.error("Error fetching itineraries: ", error);
      setError("Failed to load itineraries");
    } finally {
      setLoading(false);
    }
  };

  // Render saved itineraries
  return (
    <Box display="flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <Box
        flexGrow={1}
        p={3}
        sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
        className="content" // Applying the content class from the CSS
      >
        <Container maxWidth="lg">
          <h1 className="heading1">Saved Itineraries</h1>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : itineraries.length === 0 ? (
            <Typography>You don't have any saved itineraries yet.</Typography>
          ) : (
            <Grid container spacing={3}>
              {itineraries.map((itinerary) => (
                <Grid item xs={12} md={6} key={itinerary.id}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {itinerary.itineraryName}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Destination:</strong> {itinerary.destination}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Budget:</strong> {itinerary.budget} ZAR
                        </Typography>
                        <Typography variant="body2">
                          <strong>Number of Days:</strong> {itinerary.numDays}
                        </Typography>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                          <strong>Activities:</strong>
                          {itinerary.days.map((day, index) => (
                            <div key={index}>
                              <strong>Day {day.dayNumber}:</strong>{" "}
                              {day.activities.length > 0
                                ? day.activities.map(
                                    (activity, actIndex) => (
                                      <li key={actIndex}>
                                        {activity.name} at {activity.time}
                                      </li>
                                    )
                                  )
                                : "No activities"}
                            </div>
                          ))}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default SavedItineraries;
