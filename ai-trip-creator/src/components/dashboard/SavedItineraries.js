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
// // //   IconButton,
// // // } from "@mui/material";
// // // import { Delete as DeleteIcon } from "@mui/icons-material";
// // // import Sidebar from "./sidebar";
// // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // import { collection, getDocs, query, where, doc, deleteDoc, collectionGroup } from "firebase/firestore";
// // // import { db } from "../../firebase/firebase-config";

// // // const SavedItineraries = () => {
// // //   const theme = useTheme();
// // //   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
// // //   const [userId, setUserId] = useState(null);
// // //   const [itineraries, setItineraries] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
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

// // //       const fetchedItineraries = await Promise.all(
// // //         querySnapshot.docs.map(async (doc) => {
// // //           const itineraryData = doc.data();

// // //           // Fetch the days sub-collection for each itinerary
// // //           const daysRef = collection(doc.ref, "days");
// // //           const daysSnapshot = await getDocs(daysRef);
// // //           const days = daysSnapshot.docs.map((dayDoc) => ({
// // //             id: dayDoc.id,
// // //             ...dayDoc.data(),
// // //           }));

// // //           return {
// // //             id: doc.id,
// // //             ...itineraryData,
// // //             days, // Attach the fetched days
// // //           };
// // //         })
// // //       );

// // //       setItineraries(fetchedItineraries); // Set fetched itineraries
// // //     } catch (error) {
// // //       console.error("Error fetching itineraries: ", error);
// // //       setError("Failed to load itineraries");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Delete itinerary from Firestore
// // //   const deleteItinerary = async (itineraryId) => {
// // //     try {
// // //       const itineraryRef = doc(db, "ItineraryCollection", itineraryId);

// // //       // Fetch the 'days' sub-collection and delete each day
// // //       const daysRef = collection(itineraryRef, "days");
// // //       const daysSnapshot = await getDocs(daysRef);
// // //       const deletePromises = daysSnapshot.docs.map((dayDoc) =>
// // //         deleteDoc(dayDoc.ref)
// // //       );

// // //       // Wait for all the day documents to be deleted
// // //       await Promise.all(deletePromises);

// // //       // Finally, delete the main itinerary document
// // //       await deleteDoc(itineraryRef);

// // //       // Update state after deletion
// // //       setItineraries((prevItineraries) =>
// // //         prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
// // //       );
// // //     } catch (error) {
// // //       console.error("Error deleting itinerary: ", error);
// // //       setError("Failed to delete itinerary");
// // //     }
// // //   };

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
// // //         className="content"
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
// // //                         <Box display="flex" justifyContent="space-between" alignItems="center">
// // //                           <Typography variant="h6" gutterBottom>
// // //                             {itinerary.itineraryName}
// // //                           </Typography>
// // //                           <IconButton
// // //                             onClick={() => deleteItinerary(itinerary.id)}
// // //                             color="error"
// // //                           >
// // //                             <DeleteIcon />
// // //                           </IconButton>
// // //                         </Box>

// // //                         <Typography variant="body2">
// // //                           <strong>Destination:</strong> {itinerary.destination}
// // //                         </Typography>

// // //                         {/* Budget Check: If it's an array, display as a range */}
// // //                         <Typography variant="body2">
// // //                           <strong>Budget:</strong>{" "}
// // //                           {Array.isArray(itinerary.budget)
// // //                             ? `${itinerary.budget[0]} - ${itinerary.budget[1]} ZAR`
// // //                             : `${itinerary.budget} ZAR`}
// // //                         </Typography>

// // //                         <Typography variant="body2">
// // //                           <strong>Number of Days:</strong> {itinerary.numDays}
// // //                         </Typography>

// // //                         <Typography variant="body2" sx={{ marginTop: 1 }}>
// // //                           <strong>Day-by-Day Details:</strong>
// // //                           {/* Display each day */}
// // //                           {itinerary.days && itinerary.days.length > 0 ? (
// // //                             itinerary.days.map((day, index) => (
// // //                               <div key={index}>
// // //                                 <Typography variant="h6" sx={{ mt: 2 }}>
// // //                                   Day {day.dayNumber}
// // //                                 </Typography>

// // //                                 {/* Flights */}
// // //                                 {day.flights && day.flights.length > 0 && (
// // //                                   <>
// // //                                     <Typography variant="body1" sx={{ mt: 1 }}>
// // //                                       <strong>Flights:</strong>
// // //                                     </Typography>
// // //                                     {day.flights.map((flight, flightIndex) => (
// // //                                       <li key={flightIndex}>
// // //                                         {flight.flightNumber} - Departs:{" "}
// // //                                         {flight.departure}, Arrives:{" "}
// // //                                         {flight.arrival}
// // //                                       </li>
// // //                                     ))}
// // //                                   </>
// // //                                 )}

// // //                                 {/* Accommodations */}
// // //                                 {day.accommodation &&
// // //                                   day.accommodation.length > 0 && (
// // //                                     <>
// // //                                       <Typography
// // //                                         variant="body1"
// // //                                         sx={{ mt: 1 }}
// // //                                       >
// // //                                         <strong>Accommodation:</strong>
// // //                                       </Typography>
// // //                                       {day.accommodation.map(
// // //                                         (acc, accIndex) => (
// // //                                           <li key={accIndex}>
// // //                                             {acc.name} - Check-in:{" "}
// // //                                             {acc.checkin || "N/A"}, Checkout:{" "}
// // //                                             {acc.checkout || "N/A"}
// // //                                           </li>
// // //                                         )
// // //                                       )}
// // //                                     </>
// // //                                   )}

// // //                                 {/* Activities */}
// // //                                 {day.activities &&
// // //                                   day.activities.length > 0 && (
// // //                                     <>
// // //                                       <Typography
// // //                                         variant="body1"
// // //                                         sx={{ mt: 1 }}
// // //                                       >
// // //                                         <strong>Activities:</strong>
// // //                                       </Typography>
// // //                                       {day.activities.map(
// // //                                         (activity, actIndex) => (
// // //                                           <li key={actIndex}>
// // //                                             {activity.name} at {activity.time}
// // //                                           </li>
// // //                                         )
// // //                                       )}
// // //                                     </>
// // //                                   )}
// // //                               </div>
// // //                             ))
// // //                           ) : (
// // //                             <Typography>No days available</Typography>
// // //                           )}
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

// // import React, { useState, useEffect } from "react"
// // import {
// //   Box,
// //   Typography,
// //   Card,
// //   CardContent,
// //   Container,
// //   Grid,
// //   Drawer,
// //   useTheme,
// //   useMediaQuery,
// //   CircularProgress,
// //   IconButton,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemIcon,
// //   Avatar,
// // } from "@mui/material"
// // import {
// //   Delete as DeleteIcon,
// //   Flight as FlightIcon,
// //   Hotel as HotelIcon,
// //   EventNote as EventNoteIcon,
// //   AttachMoney as AttachMoneyIcon,
// //   LocationOn as LocationOnIcon,
// //   Today as TodayIcon,
// //   Explore as ExploreIcon,
// // } from "@mui/icons-material"
// // import { motion, AnimatePresence } from "framer-motion"
// // import  Sidebar from "./sidebar"
// // import { getAuth, onAuthStateChanged } from "firebase/auth"
// // import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore"
// // import { db } from "../../firebase/firebase-config"
// // import { styled } from "@mui/system"
// // import { keyframes } from "@emotion/react"
// // import Lottie from "react-lottie"
// // // import travelAnimation from "./travelAnimation.mp4"

// // const gradientAnimation = keyframes`
// //   0% {
// //     background-position: 0% 50%;
// //   }
// //   50% {
// //     background-position: 100% 50%;
// //   }
// //   100% {
// //     background-position: 0% 50%;
// //   }
// // `

// // const GradientBackground = styled(Box)({
// //   // background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
// //   background: "linear-gradient(-45deg, #004ba8, #ffffff)",
// //   backgroundSize: "400% 400%",
// //   animation: `${gradientAnimation} 15s ease infinite`,
// //   minHeight: "100vh",
// // })

// // const GlassCard = styled(Card)({
// //   background: "rgba(255, 255, 255, 0.25)",
// //   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
// //   backdropFilter: "blur(4px)",
// //   WebkitBackdropFilter: "blur(4px)",
// //   borderRadius: "10px",
// //   border: "1px solid rgba(255, 255, 255, 0.18)",
// // })

// // const ColorfulChip = styled(Box)(({ color }) => ({
// //   display: "flex",
// //   alignItems: "center",
// //   padding: "8px 12px",
// //   borderRadius: "20px",
// //   backgroundColor: color,
// //   color: "#fff",
// //   fontWeight: "bold",
// //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
// //   margin: "4px",
// // }))

// // export default function Component() {
// //   const theme = useTheme()
// //   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"))
// //   const [userId, setUserId] = useState(null)
// //   const [itineraries, setItineraries] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState("")

// //   useEffect(() => {
// //     const auth = getAuth()
// //     onAuthStateChanged(auth, async (user) => {
// //       if (user) {
// //         setUserId(user.uid)
// //         await fetchSavedItineraries(user.uid)
// //       } else {
// //         setLoading(false)
// //         setError("No user authenticated")
// //       }
// //     })
// //   }, [])

// //   const fetchSavedItineraries = async (uid) => {
// //     try {
// //       const itinerariesRef = collection(db, "ItineraryCollection")
// //       const q = query(itinerariesRef, where("user_id", "==", uid))
// //       const querySnapshot = await getDocs(q)

// //       const fetchedItineraries = await Promise.all(
// //         querySnapshot.docs.map(async (doc) => {
// //           const itineraryData = doc.data()
// //           const daysRef = collection(doc.ref, "days")
// //           const daysSnapshot = await getDocs(daysRef)
// //           const days = daysSnapshot.docs.map((dayDoc) => ({
// //             id: dayDoc.id,
// //             ...dayDoc.data(),
// //           }))

// //           return {
// //             id: doc.id,
// //             ...itineraryData,
// //             days,
// //           }
// //         })
// //       )

// //       setItineraries(fetchedItineraries)
// //     } catch (error) {
// //       console.error("Error fetching itineraries: ", error)
// //       setError("Failed to load itineraries")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const deleteItinerary = async (itineraryId) => {
// //     try {
// //       const itineraryRef = doc(db, "ItineraryCollection", itineraryId)
// //       const daysRef = collection(itineraryRef, "days")
// //       const daysSnapshot = await getDocs(daysRef)
// //       const deletePromises = daysSnapshot.docs.map((dayDoc) =>
// //         deleteDoc(dayDoc.ref)
// //       )
// //       await Promise.all(deletePromises)
// //       await deleteDoc(itineraryRef)
// //       setItineraries((prevItineraries) =>
// //         prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
// //       )
// //     } catch (error) {
// //       console.error("Error deleting itinerary: ", error)
// //       setError("Failed to delete itinerary")
// //     }
// //   }

// //   const defaultOptions = {
// //     loop: true,
// //     autoplay: true,
// //     // animationData: travelAnimation,
// //     rendererSettings: {
// //       preserveAspectRatio: "xMidYMid slice"
// //     }
// //   }

// //   return (
// //     <Box>

// //       <Drawer
// //         variant={isSmUp ? "permanent" : "temporary"}
// //         open={true}
// //         className="w-64"
// //         classes={{
// //           paper: "w-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-20",
// //         }}
// //       >
// //         <Sidebar />
// //       </Drawer>

// //       <Box className="flex-grow p-6 sm:p-8 md:p-12" sx={{ ml: isSmUp ? "256px" : 0 }}>
// //       <h1 style={{marginLeft:"25px", marginTop:"30px"}}>Saved Itineraries</h1>
// //         <Container maxWidth="lg">
// //           <motion.div
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.5 }}
// //           >
// //             {/* <Typography variant="h3" component="h1" className="mb-8 font-bold text-white text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
// //               Your Magical Adventures
// //             </Typography> */}

// //           </motion.div>

// //           {loading ? (
// //             <Box className="flex justify-center mt-12">
// //               <Lottie options={defaultOptions} height={400} width={400} />
// //             </Box>
// //           ) : error ? (
// //             <Typography color="error" className="text-center text-white bg-red-500 bg-opacity-50 p-4 rounded-lg">{error}</Typography>
// //           ) : itineraries.length === 0 ? (
// //             <Typography className="text-white text-center text-xl">No adventures yet? Time to start planning your dream getaway!</Typography>
// //           ) : (
// //             <AnimatePresence>
// //               <Grid container spacing={4}>
// //                 {itineraries.map((itinerary) => (
// //                   <Grid item xs={12} key={itinerary.id}>
// //                     <motion.div
// //                       initial={{ opacity: 0, scale: 0.9 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       exit={{ opacity: 0, scale: 0.9 }}
// //                       transition={{ duration: 0.3 }}
// //                     >
// //                       <GlassCard>
// //                         <CardContent className="p-6">
// //                           <Box className="flex justify-between items-center mb-4">
// //                             <Typography variant="h4" component="h2" className="font-bold text-white" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
// //                               {itinerary.itineraryName}
// //                             </Typography>
// //                             <IconButton
// //                               onClick={() => deleteItinerary(itinerary.id)}
// //                               size="small"
// //                               className="bg-red-500 hover:bg-red-600 transition-all duration-300"
// //                               color="error"
// //                             >
// //                               <DeleteIcon className="text-white" />
// //                             </IconButton>
// //                           </Box>

// //                           <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
// //                             <ColorfulChip color="#3498db">
// //                               <LocationOnIcon style={{ marginRight: 8 }} />
// //                               {itinerary.destination}
// //                             </ColorfulChip>
// //                             <ColorfulChip color="#2ecc71">
// //                               <AttachMoneyIcon style={{ marginRight: 8 }} />
// //                               Budget: {Array.isArray(itinerary.budget) ? `${itinerary.budget[0]} - ${itinerary.budget[1]}` : itinerary.budget} ZAR
// //                             </ColorfulChip>
// //                             <ColorfulChip color="#e74c3c">
// //                               <TodayIcon style={{ marginRight: 8 }} />
// //                               {itinerary.numDays} Days
// //                             </ColorfulChip>
// //                           </Box>

// //                           {itinerary.days && itinerary.days.length > 0 ? (
// //                             itinerary.days.map((day, index) => (
// //                               <motion.div
// //                                 key={index}
// //                                 initial={{ opacity: 0, y: 20 }}
// //                                 animate={{ opacity: 1, y: 0 }}
// //                                 transition={{ delay: index * 0.1 }}
// //                               >
// //                                 <GlassCard className="mb-4">
// //                                   <CardContent>
// //                                     <Typography variant="h6" className="font-semibold text-white mb-3 flex items-center">
// //                                       <Avatar className="bg-purple-500 mr-2" sx={{backgroundColor:"#004ba8"}}>
// //                                         <ExploreIcon sx={{backgroundColor:"#004ba8"}}/>
// //                                       </Avatar>
// //                                       Day {day.dayNumber}
// //                                     </Typography>
// //                                     <List disablePadding>
// //                                       {day.flights && day.flights.length > 0 && (
// //                                         <ListItem className="px-0 py-2">
// //                                           <ListItemIcon>
// //                                             <FlightIcon className="text-blue-300" />
// //                                           </ListItemIcon>
// //                                           <ListItemText
// //                                             primary={<span className="text-blue-200 font-medium">Flights</span>}
// //                                             secondary={
// //                                               <span className="text-blue-100">
// //                                                 {day.flights.map((flight, flightIndex) => (
// //                                                   <Typography key={flightIndex} variant="body2" component="span" display="block">
// //                                                     {flight.flightNumber} - Departs: {flight.departure}, Arrives: {flight.arrival}
// //                                                   </Typography>
// //                                                 ))}
// //                                               </span>
// //                                             }
// //                                           />
// //                                         </ListItem>
// //                                       )}

// //                                       {day.accommodation && day.accommodation.length > 0 && (
// //                                         <ListItem className="px-0 py-2">
// //                                           <ListItemIcon>
// //                                             <HotelIcon className="text-green-300" />
// //                                           </ListItemIcon>
// //                                           <ListItemText
// //                                             primary={<span className="text-green-200 font-medium">Accommodation</span>}
// //                                             secondary={
// //                                               <span className="text-green-100">
// //                                                 {day.accommodation.map((acc, accIndex) => (
// //                                                   <Typography key={accIndex} variant="body2" component="span" display="block">
// //                                                     {acc.name} - Check-in: {acc.checkin || "N/A"}, Checkout: {acc.checkout || "N/A"}
// //                                                   </Typography>
// //                                                 ))}
// //                                               </span>
// //                                             }
// //                                           />
// //                                         </ListItem>
// //                                       )}

// //                                       {day.activities && day.activities.length > 0 && (
// //                                         <ListItem className="px-0 py-2">
// //                                           <ListItemIcon>
// //                                             <EventNoteIcon className="text-yellow-300" />
// //                                           </ListItemIcon>
// //                                           <ListItemText
// //                                             primary={<span className="text-yellow-200 font-medium">Activities</span>}
// //                                             secondary={
// //                                               <span className="text-yellow-100">
// //                                                 {day.activities.map((activity, actIndex) => (
// //                                                   <Typography key={actIndex} variant="body2" component="span" display="block">
// //                                                     {activity.name} at {activity.time}
// //                                                   </Typography>
// //                                                 ))}
// //                                               </span>
// //                                             }
// //                                           />
// //                                         </ListItem>
// //                                       )}
// //                                     </List>
// //                                   </CardContent>
// //                                 </GlassCard>
// //                               </motion.div>
// //                             ))
// //                           ) : (
// //                             <Typography className="text-white text-opacity-70">No days available</Typography>
// //                           )}
// //                         </CardContent>
// //                       </GlassCard>
// //                     </motion.div>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             </AnimatePresence>
// //           )}
// //         </Container>
// //       </Box>
// //     </Box>
// //   )
// // }

// import React, { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Drawer,
//   useTheme,
//   useMediaQuery,
//   CircularProgress,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Avatar,
//   Button,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   Download as DownloadIcon,
//   Flight as FlightIcon,
//   Hotel as HotelIcon,
//   EventNote as EventNoteIcon,
//   AttachMoney as AttachMoneyIcon,
//   LocationOn as LocationOnIcon,
//   Today as TodayIcon,
//   Explore as ExploreIcon,
// } from "@mui/icons-material"
// import { motion, AnimatePresence } from "framer-motion"
// import Sidebar from "./sidebar"
// import { getAuth, onAuthStateChanged } from "firebase/auth"
// import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore"
// import { db } from "../../firebase/firebase-config"
// import { styled } from "@mui/system"
// import { keyframes } from "@emotion/react"
// import Lottie from "react-lottie"
// // import travelAnimation from "./travelAnimation.mp4"
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const gradientAnimation = keyframes`
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// `

// const GradientBackground = styled(Box)({
//   // background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
//   background: "linear-gradient(-45deg, #004ba8, #ffffff)",
//   backgroundSize: "400% 400%",
//   animation: `${gradientAnimation} 15s ease infinite`,
//   minHeight: "100vh",
// })

// const GlassCard = styled(Card)({
//   background: "rgba(255, 255, 255, 0.25)",
//   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//   backdropFilter: "blur(4px)",
//   WebkitBackdropFilter: "blur(4px)",
//   borderRadius: "10px",
//   border: "1px solid rgba(255, 255, 255, 0.18)",
// })

// const ColorfulChip = styled(Box)(({ color }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "8px 12px",
//   borderRadius: "20px",
//   backgroundColor: color,
//   color: "#fff",
//   fontWeight: "bold",
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   margin: "4px",
// }))

// export default function Component() {
//   const theme = useTheme()
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"))
//   const [userId, setUserId] = useState(null)
//   const [itineraries, setItineraries] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     const auth = getAuth()
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserId(user.uid)
//         await fetchSavedItineraries(user.uid)
//       } else {
//         setLoading(false)
//         setError("No user authenticated")
//       }
//     })
//   }, [])

//   const fetchSavedItineraries = async (uid) => {
//     try {
//       const itinerariesRef = collection(db, "ItineraryCollection")
//       const q = query(itinerariesRef, where("user_id", "==", uid))
//       const querySnapshot = await getDocs(q)

//       const fetchedItineraries = await Promise.all(
//         querySnapshot.docs.map(async (doc) => {
//           const itineraryData = doc.data()
//           const daysRef = collection(doc.ref, "days")
//           const daysSnapshot = await getDocs(daysRef)
//           const days = daysSnapshot.docs.map((dayDoc) => ({
//             id: dayDoc.id,
//             ...dayDoc.data(),
//           }))

//           return {
//             id: doc.id,
//             ...itineraryData,
//             days,
//           }
//         })
//       )

//       setItineraries(fetchedItineraries)
//     } catch (error) {
//       console.error("Error fetching itineraries: ", error)
//       setError("Failed to load itineraries")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteItinerary = async (itineraryId) => {
//     try {
//       const itineraryRef = doc(db, "ItineraryCollection", itineraryId)
//       const daysRef = collection(itineraryRef, "days")
//       const daysSnapshot = await getDocs(daysRef)
//       const deletePromises = daysSnapshot.docs.map((dayDoc) =>
//         deleteDoc(dayDoc.ref)
//       )
//       await Promise.all(deletePromises)
//       await deleteDoc(itineraryRef)
//       setItineraries((prevItineraries) =>
//         prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
//       )
//     } catch (error) {
//       console.error("Error deleting itinerary: ", error)
//       setError("Failed to delete itinerary")
//     }
//   }

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     // animationData: travelAnimation,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   }

//   const primaryColor = "#3498db"
//   const secondaryColor = "#2c3e50"
//   const accentColor = "#e74c3c"

//   const addBackground = (doc) => {
//     doc.setFillColor(245, 245, 245)
//     doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F')

//     // Add a decorative shape
//     doc.setFillColor(primaryColor)
//     doc.circle(doc.internal.pageSize.width - 20, 20, 10, 'F')
//   }

//   const addHeader = (doc, title) => {
//     doc.setFont("helvetica", "bold")
//     doc.setFontSize(24)
//     doc.setTextColor(secondaryColor)
//     doc.text(title, 20, 30)

//     doc.setDrawColor(primaryColor)
//     doc.setLineWidth(0.5)
//     doc.line(20, 35, doc.internal.pageSize.width - 20, 35)
//   }

//   const addFooter = (doc) => {
//     const pageCount = doc.internal.getNumberOfPages()
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(10)
//     doc.setTextColor(100)
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i)
//       doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" })
//     }
//   }

//   const addSectionHeading = (doc, text, yPosition) => {
//     doc.setFont("helvetica", "bold")
//     doc.setFontSize(16)
//     doc.setTextColor(primaryColor)
//     doc.text(text, 20, yPosition)

//     // Add an icon (you can replace this with actual icons)
//     doc.setFont("helvetica", "normal")
//     doc.setFontSize(14)
//     doc.text("•", 15, yPosition)
//   }

//   // const addContentBlock = (doc, label, content, yPosition) => {
//   //   doc.setFont("helvetica", "bold")
//   //   doc.setFontSize(12)
//   //   doc.setTextColor(secondaryColor)
//   //   doc.text(`${label}:`, 25, yPosition)

//   //   doc.setFont("helvetica", "normal")
//   //   doc.setTextColor(0)
//   //   doc.text(content, 25 + doc.getTextWidth(`${label}: `), yPosition)
//   // }

//   const addContentBlock = (doc, label, content, yPosition) => {
//     const labelWidth = doc.getTextWidth(`${label}:`)
//     const contentStartX = 20 + labelWidth + 5 // Add some space between label and content
//     doc.setFontSize(12)
//     doc.setTextColor(0, 0, 0)

//     // Draw the label and content separately to control spacing
//     doc.text(`${label}:`, 20, yPosition)
//     doc.text(content, contentStartX, yPosition) // Content starts after the label
//   }


//   // Generate a professional PDF for itinerary
//   const generatePDF = (itinerary) => {
//     const doc = new jsPDF()

//     // Add background and header to first page
//     addBackground(doc)
//     addHeader(doc, itinerary.itineraryName)

//     let y = 50

//     // Add General Information
//     addSectionHeading(doc, "General Information", y)
//     y += 10
//     addContentBlock(doc, "Destination", itinerary.destination, y)
//     y += 8
//     addContentBlock(doc, "Budget", `${itinerary.budget} ZAR`, y)
//     y += 8
//     addContentBlock(doc, "Number of Days", itinerary.numDays.toString(), y)
//     y += 20

//     // Loop through each day and add details
//     itinerary.days.forEach((day, dayIndex) => {
//       // Add day heading
//       addSectionHeading(doc, `Day ${day.dayNumber}`, y)
//       y += 10

//       // Create a table for the day's details
//       const tableBody = []

//       // Add flight details
//       if (day.flights && day.flights.length > 0) {
//         day.flights.forEach((flight, flightIndex) => {
//           tableBody.push([`Flight ${flightIndex + 1}`, `${flight.flightNumber} - Departs: ${flight.departure}, Arrives: ${flight.arrival}`])
//         })
//       }

//       // Add accommodation details
//       if (day.accommodation && day.accommodation.length > 0) {
//         day.accommodation.forEach((acc, accIndex) => {
//           tableBody.push([`Accommodation ${accIndex + 1}`, `${acc.name} - Check-in: ${acc.checkin || "N/A"}, Checkout: ${acc.checkout || "N/A"}`])
//         })
//       }

//       // Add activity details
//       if (day.activities && day.activities.length > 0) {
//         day.activities.forEach((activity, actIndex) => {
//           tableBody.push([`Activity ${actIndex + 1}`, `${activity.name} at ${activity.time}`])
//         })
//       }

//       // Add the table
//       doc.autoTable({
//         startY: y,
//         head: [['Type', 'Details']],
//         body: tableBody,
//         theme: 'striped',
//         headStyles: { fillColor: [primaryColor], textColor: [255] },
//         bodyStyles: { fillColor: [255], textColor: [0] },
//         alternateRowStyles: { fillColor: [240, 240, 240] },
//         margin: { left: 25 },
//         columnStyles: {
//           0: { cellWidth: 40 },
//           1: { cellWidth: 'auto' }
//         }
//       })

//       y = doc.lastAutoTable.finalY + 15

//       // Add a new page if close to the bottom
//       if (y > 270) {
//         doc.addPage()
//         addBackground(doc)
//         y = 20 // Reset y position for the new page
//       }
//     })

//     // Add footer
//     addFooter(doc)

//     // Save the PDF
//     doc.save(`${itinerary.itineraryName}.pdf`)
//   }


//   return (
//     <Box>

//       <Drawer
//         variant={isSmUp ? "permanent" : "temporary"}
//         open={true}
//         className="w-64"
//         classes={{
//           paper: "w-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-20",
//         }}
//       >
//         <Sidebar />
//       </Drawer>

//       <Box className="flex-grow p-6 sm:p-8 md:p-12" sx={{ ml: isSmUp ? "256px" : 0 }}>
//         <h1 style={{ marginLeft: "25px", marginTop: "30px" }}>Saved Itineraries</h1>
//         <Container maxWidth="lg">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* <Typography variant="h3" component="h1" className="mb-8 font-bold text-white text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
//             Your Magical Adventures
//           </Typography> */}

//           </motion.div>

//           {loading ? (
//             <Box className="flex justify-center mt-12">
//               <Lottie options={defaultOptions} height={400} width={400} />
//             </Box>
//           ) : error ? (
//             <Typography color="error" className="text-center text-white bg-red-500 bg-opacity-50 p-4 rounded-lg">{error}</Typography>
//           ) : itineraries.length === 0 ? (
//             <Typography className="text-white text-center text-xl">No adventures yet? Time to start planning your dream getaway!</Typography>
//           ) : (
//             <AnimatePresence>
//               <Grid container spacing={4}>
//                 {itineraries.map((itinerary) => (
//                   <Grid item xs={12} key={itinerary.id}>
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <GlassCard>
//                         <CardContent className="p-6">
//                           <Box className="flex justify-between items-center mb-4">
//                             <Typography variant="h4" component="h2" className="font-bold text-white" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
//                               {itinerary.itineraryName}
//                             </Typography>
//                             <IconButton
//                               onClick={() => deleteItinerary(itinerary.id)}
//                               size="small"
//                               className="bg-red-500 hover:bg-red-600 transition-all duration-300"
//                               color="error"
//                             >
//                               <DeleteIcon className="text-white" />
//                             </IconButton>
//                           </Box>

//                           <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
//                             <ColorfulChip color="#3498db">
//                               <LocationOnIcon style={{ marginRight: 8 }} />
//                               {itinerary.destination}
//                             </ColorfulChip>
//                             <ColorfulChip color="#2ecc71">
//                               <AttachMoneyIcon style={{ marginRight: 8 }} />
//                               Budget: {Array.isArray(itinerary.budget) ? `${itinerary.budget[0]} - ${itinerary.budget[1]}` : itinerary.budget} ZAR
//                             </ColorfulChip>
//                             <ColorfulChip color="#e74c3c">
//                               <TodayIcon style={{ marginRight: 8 }} />
//                               {itinerary.numDays} Days
//                             </ColorfulChip>
//                           </Box>

//                           {itinerary.days && itinerary.days.length > 0 ? (
//                             itinerary.days.map((day, index) => (
//                               <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                               >
//                                 <GlassCard className="mb-4">
//                                   <CardContent>
//                                     <Typography variant="h6" className="font-semibold text-white mb-3 flex items-center">
//                                       <Avatar className="bg-purple-500 mr-2" sx={{ backgroundColor: "#004ba8" }}>
//                                         <ExploreIcon sx={{ backgroundColor: "#004ba8" }} />
//                                       </Avatar>
//                                       Day {day.dayNumber}
//                                     </Typography>
//                                     <List disablePadding>
//                                       {day.flights && day.flights.length > 0 && (
//                                         <ListItem className="px-0 py-2">
//                                           <ListItemIcon>
//                                             <FlightIcon className="text-blue-300" />
//                                           </ListItemIcon>
//                                           <ListItemText
//                                             primary={<span className="text-blue-200 font-medium">Flights</span>}
//                                             secondary={
//                                               <span className="text-blue-100">
//                                                 {day.flights.map((flight, flightIndex) => (
//                                                   <Typography key={flightIndex} variant="body2" component="span" display="block">
//                                                     {flight.flightNumber} - Departs: {flight.departure}, Arrives: {flight.arrival}
//                                                   </Typography>
//                                                 ))}
//                                               </span>
//                                             }
//                                           />
//                                         </ListItem>
//                                       )}

//                                       {day.accommodation && day.accommodation.length > 0 && (
//                                         <ListItem className="px-0 py-2">
//                                           <ListItemIcon>
//                                             <HotelIcon className="text-green-300" />
//                                           </ListItemIcon>
//                                           <ListItemText
//                                             primary={<span className="text-green-200 font-medium">Accommodation</span>}
//                                             secondary={
//                                               <span className="text-green-100">
//                                                 {day.accommodation.map((acc, accIndex) => (
//                                                   <Typography key={accIndex} variant="body2" component="span" display="block">
//                                                     {acc.name} - Check-in: {acc.checkin || "N/A"}, Checkout: {acc.checkout || "N/A"}
//                                                   </Typography>
//                                                 ))}
//                                               </span>
//                                             }
//                                           />
//                                         </ListItem>
//                                       )}

//                                       {day.activities && day.activities.length > 0 && (
//                                         <ListItem className="px-0 py-2">
//                                           <ListItemIcon>
//                                             <EventNoteIcon className="text-yellow-300" />
//                                           </ListItemIcon>
//                                           <ListItemText
//                                             primary={<span className="text-yellow-200 font-medium">Activities</span>}
//                                             secondary={
//                                               <span className="text-yellow-100">
//                                                 {day.activities.map((activity, actIndex) => (
//                                                   <Typography key={actIndex} variant="body2" component="span" display="block">
//                                                     {activity.name} at {activity.time}
//                                                   </Typography>
//                                                 ))}
//                                               </span>
//                                             }
//                                           />
//                                         </ListItem>
//                                       )}
//                                     </List>
//                                   </CardContent>
//                                 </GlassCard>
//                               </motion.div>
//                             ))
//                           ) : (
//                             <Typography className="text-white text-opacity-70">No days available</Typography>
//                           )}
//                           <Button
//                             sx={{marginTop:"20px"}}
//                             variant="contained"
//                             color="primary"
//                             startIcon={<DownloadIcon />}
//                             onClick={() => generatePDF(itinerary)}
//                           >
//                             Download PDF
//                           </Button>
//                         </CardContent>
//                       </GlassCard>
//                     </motion.div>
//                   </Grid>
//                 ))}
//               </Grid>
//             </AnimatePresence>
//           )}
//         </Container>
//       </Box>
//     </Box>
//   )
// }


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
// //   IconButton,
// // } from "@mui/material";
// // import { Delete as DeleteIcon } from "@mui/icons-material";
// // import Sidebar from "./sidebar";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // import { collection, getDocs, query, where, doc, deleteDoc, collectionGroup } from "firebase/firestore";
// // import { db } from "../../firebase/firebase-config";

// // const SavedItineraries = () => {
// //   const theme = useTheme();
// //   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
// //   const [userId, setUserId] = useState(null);
// //   const [itineraries, setItineraries] = useState([]);
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

// //       const fetchedItineraries = await Promise.all(
// //         querySnapshot.docs.map(async (doc) => {
// //           const itineraryData = doc.data();

// //           // Fetch the days sub-collection for each itinerary
// //           const daysRef = collection(doc.ref, "days");
// //           const daysSnapshot = await getDocs(daysRef);
// //           const days = daysSnapshot.docs.map((dayDoc) => ({
// //             id: dayDoc.id,
// //             ...dayDoc.data(),
// //           }));

// //           return {
// //             id: doc.id,
// //             ...itineraryData,
// //             days, // Attach the fetched days
// //           };
// //         })
// //       );

// //       setItineraries(fetchedItineraries); // Set fetched itineraries
// //     } catch (error) {
// //       console.error("Error fetching itineraries: ", error);
// //       setError("Failed to load itineraries");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Delete itinerary from Firestore
// //   const deleteItinerary = async (itineraryId) => {
// //     try {
// //       const itineraryRef = doc(db, "ItineraryCollection", itineraryId);

// //       // Fetch the 'days' sub-collection and delete each day
// //       const daysRef = collection(itineraryRef, "days");
// //       const daysSnapshot = await getDocs(daysRef);
// //       const deletePromises = daysSnapshot.docs.map((dayDoc) =>
// //         deleteDoc(dayDoc.ref)
// //       );

// //       // Wait for all the day documents to be deleted
// //       await Promise.all(deletePromises);

// //       // Finally, delete the main itinerary document
// //       await deleteDoc(itineraryRef);

// //       // Update state after deletion
// //       setItineraries((prevItineraries) =>
// //         prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
// //       );
// //     } catch (error) {
// //       console.error("Error deleting itinerary: ", error);
// //       setError("Failed to delete itinerary");
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
// //                         <Box display="flex" justifyContent="space-between" alignItems="center">
// //                           <Typography variant="h6" gutterBottom>
// //                             {itinerary.itineraryName}
// //                           </Typography>
// //                           <IconButton
// //                             onClick={() => deleteItinerary(itinerary.id)}
// //                             color="error"
// //                           >
// //                             <DeleteIcon />
// //                           </IconButton>
// //                         </Box>

// //                         <Typography variant="body2">
// //                           <strong>Destination:</strong> {itinerary.destination}
// //                         </Typography>

// //                         {/* Budget Check: If it's an array, display as a range */}
// //                         <Typography variant="body2">
// //                           <strong>Budget:</strong>{" "}
// //                           {Array.isArray(itinerary.budget)
// //                             ? `${itinerary.budget[0]} - ${itinerary.budget[1]} ZAR`
// //                             : `${itinerary.budget} ZAR`}
// //                         </Typography>

// //                         <Typography variant="body2">
// //                           <strong>Number of Days:</strong> {itinerary.numDays}
// //                         </Typography>

// //                         <Typography variant="body2" sx={{ marginTop: 1 }}>
// //                           <strong>Day-by-Day Details:</strong>
// //                           {/* Display each day */}
// //                           {itinerary.days && itinerary.days.length > 0 ? (
// //                             itinerary.days.map((day, index) => (
// //                               <div key={index}>
// //                                 <Typography variant="h6" sx={{ mt: 2 }}>
// //                                   Day {day.dayNumber}
// //                                 </Typography>

// //                                 {/* Flights */}
// //                                 {day.flights && day.flights.length > 0 && (
// //                                   <>
// //                                     <Typography variant="body1" sx={{ mt: 1 }}>
// //                                       <strong>Flights:</strong>
// //                                     </Typography>
// //                                     {day.flights.map((flight, flightIndex) => (
// //                                       <li key={flightIndex}>
// //                                         {flight.flightNumber} - Departs:{" "}
// //                                         {flight.departure}, Arrives:{" "}
// //                                         {flight.arrival}
// //                                       </li>
// //                                     ))}
// //                                   </>
// //                                 )}

// //                                 {/* Accommodations */}
// //                                 {day.accommodation &&
// //                                   day.accommodation.length > 0 && (
// //                                     <>
// //                                       <Typography
// //                                         variant="body1"
// //                                         sx={{ mt: 1 }}
// //                                       >
// //                                         <strong>Accommodation:</strong>
// //                                       </Typography>
// //                                       {day.accommodation.map(
// //                                         (acc, accIndex) => (
// //                                           <li key={accIndex}>
// //                                             {acc.name} - Check-in:{" "}
// //                                             {acc.checkin || "N/A"}, Checkout:{" "}
// //                                             {acc.checkout || "N/A"}
// //                                           </li>
// //                                         )
// //                                       )}
// //                                     </>
// //                                   )}

// //                                 {/* Activities */}
// //                                 {day.activities &&
// //                                   day.activities.length > 0 && (
// //                                     <>
// //                                       <Typography
// //                                         variant="body1"
// //                                         sx={{ mt: 1 }}
// //                                       >
// //                                         <strong>Activities:</strong>
// //                                       </Typography>
// //                                       {day.activities.map(
// //                                         (activity, actIndex) => (
// //                                           <li key={actIndex}>
// //                                             {activity.name} at {activity.time}
// //                                           </li>
// //                                         )
// //                                       )}
// //                                     </>
// //                                   )}
// //                               </div>
// //                             ))
// //                           ) : (
// //                             <Typography>No days available</Typography>
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

// import React, { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Container,
//   Grid,
//   Drawer,
//   useTheme,
//   useMediaQuery,
//   CircularProgress,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Avatar,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   Flight as FlightIcon,
//   Hotel as HotelIcon,
//   EventNote as EventNoteIcon,
//   AttachMoney as AttachMoneyIcon,
//   LocationOn as LocationOnIcon,
//   Today as TodayIcon,
//   Explore as ExploreIcon,
// } from "@mui/icons-material"
// import { motion, AnimatePresence } from "framer-motion"
// import  Sidebar from "./sidebar"
// import { getAuth, onAuthStateChanged } from "firebase/auth"
// import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore"
// import { db } from "../../firebase/firebase-config"
// import { styled } from "@mui/system"
// import { keyframes } from "@emotion/react"
// import Lottie from "react-lottie"
// // import travelAnimation from "./travelAnimation.mp4"

// const gradientAnimation = keyframes`
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// `

// const GradientBackground = styled(Box)({
//   // background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
//   background: "linear-gradient(-45deg, #004ba8, #ffffff)",
//   backgroundSize: "400% 400%",
//   animation: `${gradientAnimation} 15s ease infinite`,
//   minHeight: "100vh",
// })

// const GlassCard = styled(Card)({
//   background: "rgba(255, 255, 255, 0.25)",
//   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//   backdropFilter: "blur(4px)",
//   WebkitBackdropFilter: "blur(4px)",
//   borderRadius: "10px",
//   border: "1px solid rgba(255, 255, 255, 0.18)",
// })

// const ColorfulChip = styled(Box)(({ color }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "8px 12px",
//   borderRadius: "20px",
//   backgroundColor: color,
//   color: "#fff",
//   fontWeight: "bold",
//   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   margin: "4px",
// }))

// export default function Component() {
//   const theme = useTheme()
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"))
//   const [userId, setUserId] = useState(null)
//   const [itineraries, setItineraries] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     const auth = getAuth()
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUserId(user.uid)
//         await fetchSavedItineraries(user.uid)
//       } else {
//         setLoading(false)
//         setError("No user authenticated")
//       }
//     })
//   }, [])

//   const fetchSavedItineraries = async (uid) => {
//     try {
//       const itinerariesRef = collection(db, "ItineraryCollection")
//       const q = query(itinerariesRef, where("user_id", "==", uid))
//       const querySnapshot = await getDocs(q)

//       const fetchedItineraries = await Promise.all(
//         querySnapshot.docs.map(async (doc) => {
//           const itineraryData = doc.data()
//           const daysRef = collection(doc.ref, "days")
//           const daysSnapshot = await getDocs(daysRef)
//           const days = daysSnapshot.docs.map((dayDoc) => ({
//             id: dayDoc.id,
//             ...dayDoc.data(),
//           }))

//           return {
//             id: doc.id,
//             ...itineraryData,
//             days,
//           }
//         })
//       )

//       setItineraries(fetchedItineraries)
//     } catch (error) {
//       console.error("Error fetching itineraries: ", error)
//       setError("Failed to load itineraries")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteItinerary = async (itineraryId) => {
//     try {
//       const itineraryRef = doc(db, "ItineraryCollection", itineraryId)
//       const daysRef = collection(itineraryRef, "days")
//       const daysSnapshot = await getDocs(daysRef)
//       const deletePromises = daysSnapshot.docs.map((dayDoc) =>
//         deleteDoc(dayDoc.ref)
//       )
//       await Promise.all(deletePromises)
//       await deleteDoc(itineraryRef)
//       setItineraries((prevItineraries) =>
//         prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
//       )
//     } catch (error) {
//       console.error("Error deleting itinerary: ", error)
//       setError("Failed to delete itinerary")
//     }
//   }

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     // animationData: travelAnimation,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   }

//   return (
//     <Box>

//       <Drawer
//         variant={isSmUp ? "permanent" : "temporary"}
//         open={true}
//         className="w-64"
//         classes={{
//           paper: "w-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-20",
//         }}
//       >
//         <Sidebar />
//       </Drawer>

//       <Box className="flex-grow p-6 sm:p-8 md:p-12" sx={{ ml: isSmUp ? "256px" : 0 }}>
//       <h1 style={{marginLeft:"25px", marginTop:"30px"}}>Saved Itineraries</h1>
//         <Container maxWidth="lg">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* <Typography variant="h3" component="h1" className="mb-8 font-bold text-white text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
//               Your Magical Adventures
//             </Typography> */}

//           </motion.div>

//           {loading ? (
//             <Box className="flex justify-center mt-12">
//               <Lottie options={defaultOptions} height={400} width={400} />
//             </Box>
//           ) : error ? (
//             <Typography color="error" className="text-center text-white bg-red-500 bg-opacity-50 p-4 rounded-lg">{error}</Typography>
//           ) : itineraries.length === 0 ? (
//             <Typography className="text-white text-center text-xl">No adventures yet? Time to start planning your dream getaway!</Typography>
//           ) : (
//             <AnimatePresence>
//               <Grid container spacing={4}>
//                 {itineraries.map((itinerary) => (
//                   <Grid item xs={12} key={itinerary.id}>
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <GlassCard>
//                         <CardContent className="p-6">
//                           <Box className="flex justify-between items-center mb-4">
//                             <Typography variant="h4" component="h2" className="font-bold text-white" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
//                               {itinerary.itineraryName}
//                             </Typography>
//                             <IconButton
//                               onClick={() => deleteItinerary(itinerary.id)}
//                               size="small"
//                               className="bg-red-500 hover:bg-red-600 transition-all duration-300"
//                               color="error"
//                             >
//                               <DeleteIcon className="text-white" />
//                             </IconButton>
//                           </Box>

//                           <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
//                             <ColorfulChip color="#3498db">
//                               <LocationOnIcon style={{ marginRight: 8 }} />
//                               {itinerary.destination}
//                             </ColorfulChip>
//                             <ColorfulChip color="#2ecc71">
//                               <AttachMoneyIcon style={{ marginRight: 8 }} />
//                               Budget: {Array.isArray(itinerary.budget) ? `${itinerary.budget[0]} - ${itinerary.budget[1]}` : itinerary.budget} ZAR
//                             </ColorfulChip>
//                             <ColorfulChip color="#e74c3c">
//                               <TodayIcon style={{ marginRight: 8 }} />
//                               {itinerary.numDays} Days
//                             </ColorfulChip>
//                           </Box>

//                           {itinerary.days && itinerary.days.length > 0 ? (
//                             itinerary.days.map((day, index) => (
//                               <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                               >
//                                 <GlassCard className="mb-4">
//                                   <CardContent>
//                                     <Typography variant="h6" className="font-semibold text-white mb-3 flex items-center">
//                                       <Avatar className="bg-purple-500 mr-2" sx={{backgroundColor:"#004ba8"}}>
//                                         <ExploreIcon sx={{backgroundColor:"#004ba8"}}/>
//                                       </Avatar>
//                                       Day {day.dayNumber}
//                                     </Typography>
//                                     <List disablePadding>
//                                       {day.flights && day.flights.length > 0 && (
//                                         <ListItem className="px-0 py-2">
//                                           <ListItemIcon>
//                                             <FlightIcon className="text-blue-300" />
//                                           </ListItemIcon>
//                                           <ListItemText
//                                             primary={<span className="text-blue-200 font-medium">Flights</span>}
//                                             secondary={
//                                               <span className="text-blue-100">
//                                                 {day.flights.map((flight, flightIndex) => (
//                                                   <Typography key={flightIndex} variant="body2" component="span" display="block">
//                                                     {flight.flightNumber} - Departs: {flight.departure}, Arrives: {flight.arrival}
//                                                   </Typography>
//                                                 ))}
//                                               </span>
//                                             }
//                                           />
//                                         </ListItem>
//                                       )}

//                                       {day.accommodation && day.accommodation.length > 0 && (
//                                         <ListItem className="px-0 py-2">
//                                           <ListItemIcon>
//                                             <HotelIcon className="text-green-300" />
//                                           </ListItemIcon>
//                                           <ListItemText
//                                             primary={<span className="text-green-200 font-medium">Accommodation</span>}
//                                             secondary={
//                                               <span className="text-green-100">
//                                                 {day.accommodation.map((acc, accIndex) => (
//                                                   <Typography key={accIndex} variant="body2" component="span" display="block">
//                                                     {acc.name} - Check-in: {acc.checkin || "N/A"}, Checkout: {acc.checkout || "N/A"}
//                                                   </Typography>
//                                                 ))}
//                                               </span>
//                                             }
//                                           />
//                                         </ListItem>
//                                       )}

//                                       {day.activities && day.activities.length > 0 && (
//                                         <ListItem className="px-0 py-2">
//                                           <ListItemIcon>
//                                             <EventNoteIcon className="text-yellow-300" />
//                                           </ListItemIcon>
//                                           <ListItemText
//                                             primary={<span className="text-yellow-200 font-medium">Activities</span>}
//                                             secondary={
//                                               <span className="text-yellow-100">
//                                                 {day.activities.map((activity, actIndex) => (
//                                                   <Typography key={actIndex} variant="body2" component="span" display="block">
//                                                     {activity.name} at {activity.time}
//                                                   </Typography>
//                                                 ))}
//                                               </span>
//                                             }
//                                           />
//                                         </ListItem>
//                                       )}
//                                     </List>
//                                   </CardContent>
//                                 </GlassCard>
//                               </motion.div>
//                             ))
//                           ) : (
//                             <Typography className="text-white text-opacity-70">No days available</Typography>
//                           )}
//                         </CardContent>
//                       </GlassCard>
//                     </motion.div>
//                   </Grid>
//                 ))}
//               </Grid>
//             </AnimatePresence>
//           )}
//         </Container>
//       </Box>
//     </Box>
//   )
// }

import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Button,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  EventNote as EventNoteIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationOnIcon,
  Today as TodayIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "./sidebar"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase-config"
import { styled } from "@mui/system"
import { keyframes } from "@emotion/react"
import Lottie from "react-lottie"
// import travelAnimation from "./travelAnimation.mp4"
import jsPDF from "jspdf";
import "jspdf-autotable";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const GradientBackground = styled(Box)({
  // background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
  background: "linear-gradient(-45deg, #004ba8, #ffffff)",
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 15s ease infinite`,
  minHeight: "100vh",
})

const GlassCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
})

const ColorfulChip = styled(Box)(({ color }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "20px",
  backgroundColor: color,
  color: "#fff",
  fontWeight: "bold",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  margin: "4px",
}))

export default function Component() {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"))
  const [userId, setUserId] = useState(null)
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        await fetchSavedItineraries(user.uid)
      } else {
        setLoading(false)
        setError("No user authenticated")
      }
    })
  }, [])

  const fetchSavedItineraries = async (uid) => {
    try {
      const itinerariesRef = collection(db, "ItineraryCollection")
      const q = query(itinerariesRef, where("user_id", "==", uid))
      const querySnapshot = await getDocs(q)

      const fetchedItineraries = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const itineraryData = doc.data()
          const daysRef = collection(doc.ref, "days")
          const daysSnapshot = await getDocs(daysRef)
          const days = daysSnapshot.docs.map((dayDoc) => ({
            id: dayDoc.id,
            ...dayDoc.data(),
          }))

          return {
            id: doc.id,
            ...itineraryData,
            days,
          }
        })
      )

      setItineraries(fetchedItineraries)
    } catch (error) {
      console.error("Error fetching itineraries: ", error)
      setError("Failed to load itineraries")
    } finally {
      setLoading(false)
    }
  }

  const deleteItinerary = async (itineraryId) => {
    try {
      const itineraryRef = doc(db, "ItineraryCollection", itineraryId)
      const daysRef = collection(itineraryRef, "days")
      const daysSnapshot = await getDocs(daysRef)
      const deletePromises = daysSnapshot.docs.map((dayDoc) =>
        deleteDoc(dayDoc.ref)
      )
      await Promise.all(deletePromises)
      await deleteDoc(itineraryRef)
      setItineraries((prevItineraries) =>
        prevItineraries.filter((itinerary) => itinerary.id !== itineraryId)
      )
    } catch (error) {
      console.error("Error deleting itinerary: ", error)
      setError("Failed to delete itinerary")
    }
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: travelAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const primaryColor = "#3498db"
  const secondaryColor = "#2c3e50"
  const accentColor = "#e74c3c"

  const addBackground = (doc) => {
    doc.setFillColor(245, 245, 245)
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F')

    // Add a decorative shape
    doc.setFillColor(primaryColor)
    doc.circle(doc.internal.pageSize.width - 20, 20, 10, 'F')
  }

  const addHeader = (doc, title) => {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(24)
    doc.setTextColor(secondaryColor)
    doc.text(title, 20, 30)

    doc.setDrawColor(primaryColor)
    doc.setLineWidth(0.5)
    doc.line(20, 35, doc.internal.pageSize.width - 20, 35)
  }

  const addFooter = (doc) => {
    const pageCount = doc.internal.getNumberOfPages()
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(100)
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" })
    }
  }

  const addSectionHeading = (doc, text, yPosition) => {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.setTextColor(primaryColor)
    doc.text(text, 20, yPosition)

    // Add an icon (you can replace this with actual icons)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(14)
    doc.text("•", 15, yPosition)
  }

  // const addContentBlock = (doc, label, content, yPosition) => {
  //   doc.setFont("helvetica", "bold")
  //   doc.setFontSize(12)
  //   doc.setTextColor(secondaryColor)
  //   doc.text(`${label}:`, 25, yPosition)

  //   doc.setFont("helvetica", "normal")
  //   doc.setTextColor(0)
  //   doc.text(content, 25 + doc.getTextWidth(`${label}: `), yPosition)
  // }

  const addContentBlock = (doc, label, content, yPosition) => {
    const labelWidth = doc.getTextWidth(`${label}:`)
    const contentStartX = 20 + labelWidth + 5 // Add some space between label and content
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)

    // Draw the label and content separately to control spacing
    doc.text(`${label}:`, 20, yPosition)
    doc.text(content, contentStartX, yPosition) // Content starts after the label
  }


  // Generate a professional PDF for itinerary
  const generatePDF = (itinerary) => {
    const doc = new jsPDF()

    // Add background and header to first page
    addBackground(doc)
    addHeader(doc, itinerary.itineraryName)

    let y = 50

    // Add General Information
    addSectionHeading(doc, "General Information", y)
    y += 10
    addContentBlock(doc, "Destination", itinerary.destination, y)
    y += 8
    addContentBlock(doc, "Budget", `${itinerary.budget} ZAR`, y)
    y += 8
    addContentBlock(doc, "Number of Days", itinerary.numDays.toString(), y)
    y += 20

    // Loop through each day and add details
    itinerary.days.forEach((day, dayIndex) => {
      // Add day heading
      addSectionHeading(doc, `Day ${day.dayNumber}`, y)
      y += 10

      // Create a table for the day's details
      const tableBody = []

      // Add flight details
      if (day.flights && day.flights.length > 0) {
        day.flights.forEach((flight, flightIndex) => {
          tableBody.push([`Flight ${flightIndex + 1}`, `${flight.flightNumber} - Departs: ${flight.departure}, Arrives: ${flight.arrival}`])
        })
      }

      // Add accommodation details
      if (day.accommodation && day.accommodation.length > 0) {
        day.accommodation.forEach((acc, accIndex) => {
          tableBody.push([`Accommodation ${accIndex + 1}`, `${acc.name} - Check-in: ${acc.checkin || "N/A"}, Checkout: ${acc.checkout || "N/A"}`])
        })
      }

      // Add activity details
      if (day.activities && day.activities.length > 0) {
        day.activities.forEach((activity, actIndex) => {
          tableBody.push([`Activity ${actIndex + 1}`, `${activity.name} at ${activity.time}`])
        })
      }

      // Add the table
      doc.autoTable({
        startY: y,
        head: [['Type', 'Details']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [primaryColor], textColor: [255] },
        bodyStyles: { fillColor: [255], textColor: [0] },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        margin: { left: 25 },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 'auto' }
        }
      })

      y = doc.lastAutoTable.finalY + 15

      // Add a new page if close to the bottom
      if (y > 270) {
        doc.addPage()
        addBackground(doc)
        y = 20 // Reset y position for the new page
      }
    })

    // Add footer
    addFooter(doc)

    // Save the PDF
    doc.save(`${itinerary.itineraryName}.pdf`)
  }


  return (
    <Box>

      <Drawer
        variant={isSmUp ? "permanent" : "temporary"}
        open={true}
        className="w-64"
        classes={{
          paper: "w-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-r border-white border-opacity-20",
        }}
      >
        <Sidebar />
      </Drawer>

      <Box className="flex-grow p-6 sm:p-8 md:p-12" sx={{ ml: isSmUp ? "256px" : 0 }}>
        <h1 style={{ marginLeft: "25px", marginTop: "30px" }}>Saved Itineraries For Trips</h1>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* <Typography variant="h3" component="h1" className="mb-8 font-bold text-white text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            Your Magical Adventures
          </Typography> */}

          </motion.div>

          {loading ? (
            <Box className="flex justify-center mt-12">
              <Lottie options={defaultOptions} height={400} width={400} />
            </Box>
          ) : error ? (
            <Typography color="error" className="text-center text-white bg-red-500 bg-opacity-50 p-4 rounded-lg">{error}</Typography>
          ) : itineraries.length === 0 ? (
            <Typography className="text-white text-center text-xl">No adventures yet? Time to start planning your dream getaway!</Typography>
          ) : (
            <AnimatePresence>
              <Grid container spacing={4}>
                {itineraries.map((itinerary) => (
                  <Grid item xs={12} key={itinerary.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassCard>
                        <CardContent className="p-6">
                          <Box className="flex justify-between items-center mb-4">
                            <Typography variant="h4" component="h2" className="font-bold text-white" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}>
                              {itinerary.itineraryName}
                            </Typography>
                            <IconButton
                              onClick={() => deleteItinerary(itinerary.id)}
                              size="small"
                              className="bg-red-500 hover:bg-red-600 transition-all duration-300"
                              color="error"
                            >
                              <DeleteIcon className="text-white" />
                            </IconButton>
                          </Box>

                          <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
                            <ColorfulChip color="#3498db">
                              <LocationOnIcon style={{ marginRight: 8 }} />
                              {itinerary.destination}
                            </ColorfulChip>
                            <ColorfulChip color="#2ecc71">
                              <AttachMoneyIcon style={{ marginRight: 8 }} />
                              Budget: {Array.isArray(itinerary.budget) ? `${itinerary.budget[0]} - ${itinerary.budget[1]}` : itinerary.budget} ZAR
                            </ColorfulChip>
                            <ColorfulChip color="#e74c3c">
                              <TodayIcon style={{ marginRight: 8 }} />
                              {itinerary.numDays} Days
                            </ColorfulChip>
                          </Box>

                          {itinerary.days && itinerary.days.length > 0 ? (
                            itinerary.days.map((day, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <GlassCard className="mb-4">
                                  <CardContent>
                                    <Typography variant="h6" className="font-semibold text-white mb-3 flex items-center">
                                      <Avatar className="bg-purple-500 mr-2" sx={{ backgroundColor: "#004ba8" }}>
                                        <ExploreIcon sx={{ backgroundColor: "#004ba8" }} />
                                      </Avatar>
                                      Day {day.dayNumber}
                                    </Typography>
                                    <List disablePadding>
                                      {day.flights && day.flights.length > 0 && (
                                        <ListItem className="px-0 py-2">
                                          <ListItemIcon>
                                            <FlightIcon className="text-blue-300" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={<span className="text-blue-200 font-medium">Flights</span>}
                                            secondary={
                                              <span className="text-blue-100">
                                                {day.flights.map((flight, flightIndex) => (
                                                  <Typography key={flightIndex} variant="body2" component="span" display="block">
                                                    {flight.flightNumber} - Departs: {flight.departure}, Arrives: {flight.arrival}
                                                  </Typography>
                                                ))}
                                              </span>
                                            }
                                          />
                                        </ListItem>
                                      )}

                                      {day.accommodation && day.accommodation.length > 0 && (
                                        <ListItem className="px-0 py-2">
                                          <ListItemIcon>
                                            <HotelIcon className="text-green-300" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={<span className="text-green-200 font-medium">Accommodation</span>}
                                            secondary={
                                              <span className="text-green-100">
                                                {day.accommodation.map((acc, accIndex) => (
                                                  <Typography key={accIndex} variant="body2" component="span" display="block">
                                                    {acc.name} - Check-in: {acc.checkin || "N/A"}, Checkout: {acc.checkout || "N/A"}
                                                  </Typography>
                                                ))}
                                              </span>
                                            }
                                          />
                                        </ListItem>
                                      )}

                                      {day.activities && day.activities.length > 0 && (
                                        <ListItem className="px-0 py-2">
                                          <ListItemIcon>
                                            <EventNoteIcon className="text-yellow-300" />
                                          </ListItemIcon>
                                          <ListItemText
                                            primary={<span className="text-yellow-200 font-medium">Activities</span>}
                                            secondary={
                                              <span className="text-yellow-100">
                                                {day.activities.map((activity, actIndex) => (
                                                  <Typography key={actIndex} variant="body2" component="span" display="block">
                                                    {activity.name} at {activity.time}
                                                  </Typography>
                                                ))}
                                              </span>
                                            }
                                          />
                                        </ListItem>
                                      )}
                                    </List>
                                  </CardContent>
                                </GlassCard>
                              </motion.div>
                            ))
                          ) : (
                            <Typography className="text-white text-opacity-70">No days available</Typography>
                          )}
                          <Button
                            sx={{marginTop:"20px"}}
                            variant="contained"
                            color="primary"
                            startIcon={<DownloadIcon />}
                            onClick={() => generatePDF(itinerary)}
                          >
                            Download PDF
                          </Button>
                        </CardContent>
                      </GlassCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </AnimatePresence>
          )}
        </Container>
      </Box>
    </Box>
  )
}
