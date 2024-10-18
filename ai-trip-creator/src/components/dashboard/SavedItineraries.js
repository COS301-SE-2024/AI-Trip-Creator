// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Card,
// // // //   CardContent,
// // // //   TextField,
// // // //   Button,
// // // //   Avatar,
// // // //   CircularProgress,
// // // //   FormControl,
// // // //   ToggleButton,
// // // //   ToggleButtonGroup,
// // // //   List,
// // // //   ListItem,
// // // //   Container,
// // // //   Paper,
// // // //   Grid,
// // // //   Drawer,
// // // //   useTheme,
// // // //   useMediaQuery,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   IconButton,
// // // //   CardMedia,
// // // //   Slider,
// // // // } from "@mui/material";
// // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // import Carousel from 'react-material-ui-carousel';
// // // // import Sidebar from "./sidebar";
// // // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // // import {
// // // //   doc,
// // // //   getDoc,
// // // //   setDoc,
// // // //   collection,
// // // //   getDocs,
// // // //   query,
// // // //   where,
// // // //   deleteDoc,
// // // // } from "firebase/firestore";
// // // // import { db } from "../../firebase/firebase-config";
// // // // import "./dashboard.css";
// // // // import ReactMarkdown from "react-markdown";
// // // // import remarkGfm from "remark-gfm";

// // // // const SavedItineraries = () => {
// // // //     const theme = useTheme();
// // // //     const isDarkMode = theme.palette.mode === "dark";
// // // //     const auth = getAuth();
// // // //     const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

// // // //     return (
// // // //             <Box display="flex">
// // // //               {/* Sidebar */}
// // // //               <Drawer
// // // //                 variant={isSmUp ? "permanent" : "temporary"}
// // // //                 open={true}
// // // //                 sx={{
// // // //                   "& .MuiDrawer-paper": {
// // // //                     boxSizing: "border-box",
// // // //                     width: 240,
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 <Sidebar />
// // // //               </Drawer>
        
// // // //               {/* Main Content */}
// // // //               <Box
// // // //                 flexGrow={1}
// // // //                 p={3}
// // // //                 sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
// // // //                 className="content" // Applying the content class from the CSS
// // // //               >
// // // //                 <Container maxWidth="lg">
// // // //                   {/* Apply the same style as other headings */}
// // // //                   <h1 className="heading1">Saved Itineraries</h1>
        
// // // //                   <Grid container spacing={3}>
// // // //                     <Grid item xs={12} md={6}>
// // // //                       <Paper elevation={3} sx={{ p: 2 }} className="card">
// // // //                         <Typography variant="body1" sx={{ fontSize: "18px", fontFamily: "Poppins" }}>
// // // //                           You don't have any saved itineraries yet.
// // // //                         </Typography>
// // // //                       </Paper>
// // // //                     </Grid>
// // // //                   </Grid>
// // // //                 </Container>
// // // //               </Box>
// // // //             </Box>
// // // //     );
// // // //   };

// // // // export default SavedItineraries;

// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Box,
// // //   Typography,
// // //   Card,
// // //   CardContent,
// // //   Container,
// // //   Paper,
// // //   Grid,
// // //   Drawer,
// // //   useTheme,
// // //   useMediaQuery,
// // //   CircularProgress,
// // // } from "@mui/material";
// // // import Sidebar from "./sidebar";
// // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // import { collection, getDocs, query, where } from "firebase/firestore";
// // // import { db } from "../../firebase/firebase-config";

// // // const SavedItineraries = () => {
// // //   const theme = useTheme();
// // //   const isDarkMode = theme.palette.mode === "dark";
// // //   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
// // //   const [userId, setUserId] = useState(null);
// // //   const [itineraries, setItineraries] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     // Get the currently authenticated user
// // //     const auth = getAuth();
// // //     onAuthStateChanged(auth, async (user) => {
// // //       if (user) {
// // //         setUserId(user.uid);
// // //         await fetchSavedItineraries(user.uid);
// // //       } else {
// // //         setLoading(false);
// // //         setError("No user authenticated");
// // //       }
// // //     });
// // //   }, []);

// // //   // Fetch itineraries from Firestore for the authenticated user
// // //   const fetchSavedItineraries = async (uid) => {
// // //     try {
// // //       const itinerariesRef = collection(db, "ItineraryCollection");
// // //       const q = query(itinerariesRef, where("user_id", "==", uid));
// // //       const querySnapshot = await getDocs(q);
// // //       const fetchedItineraries = querySnapshot.docs.map((doc) => ({
// // //         id: doc.id,
// // //         ...doc.data(),
// // //       }));

// // //       setItineraries(fetchedItineraries);
// // //     } catch (error) {
// // //       console.error("Error fetching itineraries: ", error);
// // //       setError("Failed to load itineraries");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Render saved itineraries
// // //   return (
// // //     <Box display="flex">
// // //       {/* Sidebar */}
// // //       <Drawer
// // //         variant={isSmUp ? "permanent" : "temporary"}
// // //         open={true}
// // //         sx={{
// // //           "& .MuiDrawer-paper": {
// // //             boxSizing: "border-box",
// // //             width: 240,
// // //           },
// // //         }}
// // //       >
// // //         <Sidebar />
// // //       </Drawer>

// // //       {/* Main Content */}
// // //       <Box
// // //         flexGrow={1}
// // //         p={3}
// // //         sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
// // //         className="content" // Applying the content class from the CSS
// // //       >
// // //         <Container maxWidth="lg">
// // //           <h1 className="heading1">Saved Itineraries</h1>

// // //           {loading ? (
// // //             <Box display="flex" justifyContent="center" mt={5}>
// // //               <CircularProgress />
// // //             </Box>
// // //           ) : error ? (
// // //             <Typography color="error">{error}</Typography>
// // //           ) : itineraries.length === 0 ? (
// // //             <Typography>You don't have any saved itineraries yet.</Typography>
// // //           ) : (
// // //             <Grid container spacing={3}>
// // //               {itineraries.map((itinerary) => (
// // //                 <Grid item xs={12} md={6} key={itinerary.id}>
// // //                   <Paper elevation={3} sx={{ p: 2 }}>
// // //                     <Card>
// // //                       <CardContent>
// // //                         <Typography variant="h6" gutterBottom>
// // //                           {itinerary.itineraryName}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Destination:</strong> {itinerary.destination}
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Budget:</strong> {itinerary.budget} ZAR
// // //                         </Typography>
// // //                         <Typography variant="body2">
// // //                           <strong>Number of Days:</strong> {itinerary.numDays}
// // //                         </Typography>
// // //                         <Typography variant="body2" sx={{ marginTop: 1 }}>
// // //                           <strong>Activities:</strong>
// // //                           {itinerary.days.map((day, index) => (
// // //                             <div key={index}>
// // //                               <strong>Day {day.dayNumber}:</strong>{" "}
// // //                               {day.activities.length > 0
// // //                                 ? day.activities.map(
// // //                                     (activity, actIndex) => (
// // //                                       <li key={actIndex}>
// // //                                         {activity.name} at {activity.time}
// // //                                       </li>
// // //                                     )
// // //                                   )
// // //                                 : "No activities"}
// // //                             </div>
// // //                           ))}
// // //                         </Typography>
// // //                       </CardContent>
// // //                     </Card>
// // //                   </Paper>
// // //                 </Grid>
// // //               ))}
// // //             </Grid>
// // //           )}
// // //         </Container>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default SavedItineraries;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Card,
// //   CardContent,
// //   Container,
// //   Paper,
// //   Grid,
// //   Drawer,
// //   useTheme,
// //   useMediaQuery,
// //   CircularProgress,
// // } from "@mui/material";
// // import Sidebar from "./sidebar";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // import { collection, getDocs, query, where } from "firebase/firestore";
// // import { db } from "../../firebase/firebase-config";

// // const SavedItineraries = () => {
// //   const theme = useTheme();
// //   const isDarkMode = theme.palette.mode === "dark";
// //   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
// //   const [userId, setUserId] = useState(null);
// //   const [itineraries, setItineraries] = useState([]); // Initialize as an empty array
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const auth = getAuth();
// //     onAuthStateChanged(auth, async (user) => {
// //       if (user) {
// //         setUserId(user.uid);
// //         await fetchSavedItineraries(user.uid);
// //       } else {
// //         setLoading(false);
// //         setError("No user authenticated");
// //       }
// //     });
// //   }, []);

// //   // Fetch itineraries from Firestore for the authenticated user
// //   const fetchSavedItineraries = async (uid) => {
// //     try {
// //       const itinerariesRef = collection(db, "ItineraryCollection");
// //       const q = query(itinerariesRef, where("user_id", "==", uid));
// //       const querySnapshot = await getDocs(q);
// //       const fetchedItineraries = querySnapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data(),
// //       }));

// //       setItineraries(fetchedItineraries); // Set fetched itineraries
// //     } catch (error) {
// //       console.error("Error fetching itineraries: ", error);
// //       setError("Failed to load itineraries");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Box display="flex">
// //       {/* Sidebar */}
// //       <Drawer
// //         variant={isSmUp ? "permanent" : "temporary"}
// //         open={true}
// //         sx={{
// //           "& .MuiDrawer-paper": {
// //             boxSizing: "border-box",
// //             width: 240,
// //           },
// //         }}
// //       >
// //         <Sidebar />
// //       </Drawer>

// //       {/* Main Content */}
// //       <Box
// //         flexGrow={1}
// //         p={3}
// //         sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
// //         className="content"
// //       >
// //         <Container maxWidth="lg">
// //           <h1 className="heading1">Saved Itineraries</h1>

// //           {loading ? (
// //             <Box display="flex" justifyContent="center" mt={5}>
// //               <CircularProgress />
// //             </Box>
// //           ) : error ? (
// //             <Typography color="error">{error}</Typography>
// //           ) : itineraries.length === 0 ? (
// //             <Typography>You don't have any saved itineraries yet.</Typography>
// //           ) : (
// //             <Grid container spacing={3}>
// //               {itineraries.map((itinerary) => (
// //                 <Grid item xs={12} md={6} key={itinerary.id}>
// //                   <Paper elevation={3} sx={{ p: 2 }}>
// //                     <Card>
// //                       <CardContent>
// //                         <Typography variant="h6" gutterBottom>
// //                           {itinerary.itineraryName}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           <strong>Destination:</strong> {itinerary.destination}
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           <strong>Budget:</strong> {itinerary.budget} ZAR
// //                         </Typography>
// //                         <Typography variant="body2">
// //                           <strong>Number of Days:</strong> {itinerary.numDays}
// //                         </Typography>
// //                         <Typography variant="body2" sx={{ marginTop: 1 }}>
// //                           <strong>Activities:</strong>
// //                           {/* Handle undefined or empty days array */}
// //                           {itinerary.days && itinerary.days.length > 0 ? (
// //                             itinerary.days.map((day, index) => (
// //                               <div key={index}>
// //                                 <strong>Day {day.dayNumber}:</strong>{" "}
// //                                 {day.activities && day.activities.length > 0 ? (
// //                                   day.activities.map(
// //                                     (activity, actIndex) => (
// //                                       <li key={actIndex}>
// //                                         {activity.name} at {activity.time}
// //                                       </li>
// //                                     )
// //                                   )
// //                                 ) : (
// //                                   <li>No activities</li>
// //                                 )}
// //                               </div>
// //                             ))
// //                           ) : (
// //                             <div>No days available</div>
// //                           )}
// //                         </Typography>
// //                       </CardContent>
// //                     </Card>
// //                   </Paper>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           )}
// //         </Container>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default SavedItineraries;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Container,
//   Paper,
//   Grid,
//   Drawer,
//   useTheme,
//   useMediaQuery,
//   CircularProgress,
// } from "@mui/material";
// import Sidebar from "./sidebar";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { collection, getDocs, query, where, doc, collectionGroup } from "firebase/firestore";
// import { db } from "../../firebase/firebase-config";

// const SavedItineraries = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
//   const [userId, setUserId] = useState(null);
//   const [itineraries, setItineraries] = useState([]); // Initialize as an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserId(user.uid);
//         await fetchSavedItineraries(user.uid);
//       } else {
//         setLoading(false);
//         setError("No user authenticated");
//       }
//     });
//   }, []);

//   // Fetch itineraries from Firestore for the authenticated user
//   const fetchSavedItineraries = async (uid) => {
//     try {
//       const itinerariesRef = collection(db, "ItineraryCollection");
//       const q = query(itinerariesRef, where("user_id", "==", uid));
//       const querySnapshot = await getDocs(q);
      
//       const fetchedItineraries = await Promise.all(
//         querySnapshot.docs.map(async (doc) => {
//           const itineraryData = doc.data();
          
//           // Fetch the days sub-collection for each itinerary
//           const daysRef = collection(doc.ref, "days");
//           const daysSnapshot = await getDocs(daysRef);
//           const days = daysSnapshot.docs.map((dayDoc) => ({
//             id: dayDoc.id,
//             ...dayDoc.data(),
//           }));
          
//           return {
//             id: doc.id,
//             ...itineraryData,
//             days, // Attach the fetched days
//           };
//         })
//       );

//       setItineraries(fetchedItineraries); // Set fetched itineraries
//     } catch (error) {
//       console.error("Error fetching itineraries: ", error);
//       setError("Failed to load itineraries");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box display="flex">
//       {/* Sidebar */}
//       <Drawer
//         variant={isSmUp ? "permanent" : "temporary"}
//         open={true}
//         sx={{
//           "& .MuiDrawer-paper": {
//             boxSizing: "border-box",
//             width: 240,
//           },
//         }}
//       >
//         <Sidebar />
//       </Drawer>

//       {/* Main Content */}
//       <Box
//         flexGrow={1}
//         p={3}
//         sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
//         className="content"
//       >
//         <Container maxWidth="lg">
//           <h1 className="heading1">Saved Itineraries</h1>

//           {loading ? (
//             <Box display="flex" justifyContent="center" mt={5}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Typography color="error">{error}</Typography>
//           ) : itineraries.length === 0 ? (
//             <Typography>You don't have any saved itineraries yet.</Typography>
//           ) : (
//             <Grid container spacing={3}>
//               {itineraries.map((itinerary) => (
//                 <Grid item xs={12} md={6} key={itinerary.id}>
//                   <Paper elevation={3} sx={{ p: 2 }}>
//                     <Card>
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom>
//                           {itinerary.itineraryName}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Destination:</strong> {itinerary.destination}
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Budget:</strong> {itinerary.budget} ZAR
//                         </Typography>
//                         <Typography variant="body2">
//                           <strong>Number of Days:</strong> {itinerary.numDays}
//                         </Typography>
//                         <Typography variant="body2" sx={{ marginTop: 1 }}>
//                           <strong>Day-by-Day Details:</strong>
//                           {/* Display each day */}
//                           {itinerary.days && itinerary.days.length > 0 ? (
//                             itinerary.days.map((day, index) => (
//                               <div key={index}>
//                                 <Typography variant="h6" sx={{ mt: 2 }}>
//                                   Day {day.dayNumber}
//                                 </Typography>

//                                 {/* Flights */}
//                                 {day.flights && day.flights.length > 0 && (
//                                   <>
//                                     <Typography variant="body1" sx={{ mt: 1 }}>
//                                       <strong>Flights:</strong>
//                                     </Typography>
//                                     {day.flights.map((flight, flightIndex) => (
//                                       <li key={flightIndex}>
//                                         {flight.flightNumber} - Departs:{" "}
//                                         {flight.departure}, Arrives:{" "}
//                                         {flight.arrival}
//                                       </li>
//                                     ))}
//                                   </>
//                                 )}

//                                 {/* Accommodations */}
//                                 {day.accommodation &&
//                                   day.accommodation.length > 0 && (
//                                     <>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mt: 1 }}
//                                       >
//                                         <strong>Accommodation:</strong>
//                                       </Typography>
//                                       {day.accommodation.map(
//                                         (acc, accIndex) => (
//                                           <li key={accIndex}>
//                                             {acc.name} - Check-in:{" "}
//                                             {acc.checkin || "N/A"}, Checkout:{" "}
//                                             {acc.checkout || "N/A"}
//                                           </li>
//                                         )
//                                       )}
//                                     </>
//                                   )}

//                                 {/* Activities */}
//                                 {day.activities &&
//                                   day.activities.length > 0 && (
//                                     <>
//                                       <Typography
//                                         variant="body1"
//                                         sx={{ mt: 1 }}
//                                       >
//                                         <strong>Activities:</strong>
//                                       </Typography>
//                                       {day.activities.map(
//                                         (activity, actIndex) => (
//                                           <li key={actIndex}>
//                                             {activity.name} at {activity.time}
//                                           </li>
//                                         )
//                                       )}
//                                     </>
//                                   )}
//                               </div>
//                             ))
//                           ) : (
//                             <Typography>No days available</Typography>
//                           )}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Container>
//       </Box>
//     </Box>
//   );
// };

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
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, doc, deleteDoc, collectionGroup } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const SavedItineraries = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [userId, setUserId] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

      const fetchedItineraries = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const itineraryData = doc.data();

          // Fetch the days sub-collection for each itinerary
          const daysRef = collection(doc.ref, "days");
          const daysSnapshot = await getDocs(daysRef);
          const days = daysSnapshot.docs.map((dayDoc) => ({
            id: dayDoc.id,
            ...dayDoc.data(),
          }));

          return {
            id: doc.id,
            ...itineraryData,
            days, // Attach the fetched days
          };
        })
      );

      setItineraries(fetchedItineraries); // Set fetched itineraries
    } catch (error) {
      console.error("Error fetching itineraries: ", error);
      setError("Failed to load itineraries");
    } finally {
      setLoading(false);
    }
  };

  // Delete itinerary from Firestore
  const deleteItinerary = async (itineraryId) => {
    try {
      const itineraryRef = doc(db, "ItineraryCollection", itineraryId);
      
      // Fetch the 'days' sub-collection and delete each day
      const daysRef = collection(itineraryRef, "days");
      const daysSnapshot = await getDocs(daysRef);
      const deletePromises = daysSnapshot.docs.map((dayDoc) =>
        deleteDoc(dayDoc.ref)
      );

      // Wait for all the day documents to be deleted
      await Promise.all(deletePromises);

      // Finally, delete the main itinerary document
      await deleteDoc(itineraryRef);

      // Update state after deletion
      setItineraries((prevItineraries) =>
        prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
      );
    } catch (error) {
      console.error("Error deleting itinerary: ", error);
      setError("Failed to delete itinerary");
    }
  };

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
        className="content"
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
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="h6" gutterBottom>
                            {itinerary.itineraryName}
                          </Typography>
                          <IconButton
                            onClick={() => deleteItinerary(itinerary.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>

                        <Typography variant="body2">
                          <strong>Destination:</strong> {itinerary.destination}
                        </Typography>

                        {/* Budget Check: If it's an array, display as a range */}
                        <Typography variant="body2">
                          <strong>Budget:</strong>{" "}
                          {Array.isArray(itinerary.budget)
                            ? `${itinerary.budget[0]} - ${itinerary.budget[1]} ZAR`
                            : `${itinerary.budget} ZAR`}
                        </Typography>

                        <Typography variant="body2">
                          <strong>Number of Days:</strong> {itinerary.numDays}
                        </Typography>

                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                          <strong>Day-by-Day Details:</strong>
                          {/* Display each day */}
                          {itinerary.days && itinerary.days.length > 0 ? (
                            itinerary.days.map((day, index) => (
                              <div key={index}>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                  Day {day.dayNumber}
                                </Typography>

                                {/* Flights */}
                                {day.flights && day.flights.length > 0 && (
                                  <>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                      <strong>Flights:</strong>
                                    </Typography>
                                    {day.flights.map((flight, flightIndex) => (
                                      <li key={flightIndex}>
                                        {flight.flightNumber} - Departs:{" "}
                                        {flight.departure}, Arrives:{" "}
                                        {flight.arrival}
                                      </li>
                                    ))}
                                  </>
                                )}

                                {/* Accommodations */}
                                {day.accommodation &&
                                  day.accommodation.length > 0 && (
                                    <>
                                      <Typography
                                        variant="body1"
                                        sx={{ mt: 1 }}
                                      >
                                        <strong>Accommodation:</strong>
                                      </Typography>
                                      {day.accommodation.map(
                                        (acc, accIndex) => (
                                          <li key={accIndex}>
                                            {acc.name} - Check-in:{" "}
                                            {acc.checkin || "N/A"}, Checkout:{" "}
                                            {acc.checkout || "N/A"}
                                          </li>
                                        )
                                      )}
                                    </>
                                  )}

                                {/* Activities */}
                                {day.activities &&
                                  day.activities.length > 0 && (
                                    <>
                                      <Typography
                                        variant="body1"
                                        sx={{ mt: 1 }}
                                      >
                                        <strong>Activities:</strong>
                                      </Typography>
                                      {day.activities.map(
                                        (activity, actIndex) => (
                                          <li key={actIndex}>
                                            {activity.name} at {activity.time}
                                          </li>
                                        )
                                      )}
                                    </>
                                  )}
                              </div>
                            ))
                          ) : (
                            <Typography>No days available</Typography>
                          )}
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
