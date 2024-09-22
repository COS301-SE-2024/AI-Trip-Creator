// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Container,
//   Drawer,
//   Paper,
//   Grid,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import Sidebar from "./sidebar";
// import "./dashboard.css";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase-config";


// const travelTrendsData = [
//     {
//       title: "Eco-Tourism",
//       image:
//         "https://www.ith.org.za/wp-content/uploads/2018/05/ITHSA-BLOG.png",
//     },
//     {
//       title: "Adventure Travel",
//       image:
//       "https://images2.goabroad.com/image/upload/v1/images2/program_content/prime-how-to-choose-the-best-adventure-travel-tour-companies-1504752924.jpg",
//     },
//     {
//       title: "Cultural Trips",
//       image:
//         "https://www.bikehike.com/sites/default/files/styles/banner/public/blog/Rectangle%2021.jpg?itok=71yMn12f",
//     },
//     {
//       title: "Solo Travel",
//       image:
//         "https://capetownguy.co.za/wp-content/uploads/2024/07/Solo-Travel.jpeg",
//     },
//     {
//       title: "Luxury Travel",
//       image:
//         "https://images.squarespace-cdn.com/content/v1/52e72f94e4b001f05e5e6d22/1697074562431-CV14C5LGBBTMJ6HHU2X2/Miavana-Piazza-32-Pool.jpg",
//     },
//   ];
  
//   const popularDestinationsData = [
//     {
//       title: "Paris, France",
//       image:
//         "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg",
//     },
//     {
//       title: "Kyoto, Japan",
//       image:
//         "https://www.pelago.co/img/destinations/kyoto/1129-0642_kyoto.jpg",
//     },
//     {
//       title: "New York, USA",
//       image:
//         "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
//     },
//     {
//       title: "Rome, Italy",
//       image:
//         "https://media.timeout.com/images/105212586/750/562/image.jpg",
//     },
//     {
//       title: "Sydney, Australia",
//       image:
//         "https://www.pelago.co/img/destinations/sydney/hero-image-xlarge.jpg",
//     },
//   ];

// const Analytics = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

//   // States for Travel Trends and Popular Destinations Slideshows
//   const [currentTrendIndex, setCurrentTrendIndex] = useState(0);
//   const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);

//   // Automatic slideshow effect with timers
//   useEffect(() => {
//     const trendInterval = setInterval(() => {
//       setCurrentTrendIndex((prevIndex) => (prevIndex + 1) % travelTrendsData.length);
//     }, 3000); // Slide changes every 3 seconds

//     const destinationInterval = setInterval(() => {
//       setCurrentDestinationIndex((prevIndex) => (prevIndex + 1) % popularDestinationsData.length);
//     }, 3000);

//     return () => {
//       clearInterval(trendInterval);
//       clearInterval(destinationInterval);
//     };
//   }, []);

//   const uploadData = async () => {
//     try {
//       // Upload Travel Trends Data
//       const travelTrendsCollection = collection(db, "travelTrends");
//       await Promise.all(
//         travelTrendsData.map((trend) => addDoc(travelTrendsCollection, trend))
//       );

//       // Upload Popular Destinations Data
//       const popularDestinationsCollection = collection(db, "popularDestinations");
//       await Promise.all(
//         popularDestinationsData.map((destination) => addDoc(popularDestinationsCollection, destination))
//       );

//       console.log("Data uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading data: ", error);
//     }
//   };

//   return (
//     <Box display="flex">
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
//       <Box
//         flexGrow={1}
//         p={3}
//         sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
//       >
//         <Container maxWidth="lg">
//           <h1>Analytics Dashboard</h1>
//           <h2>Analytics</h2>
//           <Button variant="contained" color="primary" onClick={uploadData}>
//             Upload Data
//           </Button>
//           <Grid container spacing={3}>
//             {/* Travel Trends Slideshow */}
//             <Grid item xs={12} md={6}>
//               <Paper
//                 elevation={3}
//                 sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   Travel Trends
//                 </Typography>
//                 <Box
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <img
//                     src={travelTrendsData[currentTrendIndex].image}
//                     alt={travelTrendsData[currentTrendIndex].title}
//                     style={{
//                       width: "100%",
//                       height: "300px",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <Typography variant="body1" mt={1} sx={{ fontSize: "18px", fontFamily: "Poppins",}}>
//                     {travelTrendsData[currentTrendIndex].title}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Popular Destinations Slideshow */}
//             <Grid item xs={12} md={6}>
//               <Paper
//                 elevation={3}
//                 sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   Popular Destinations
//                 </Typography>
//                 <Box
//                   display="flex"
//                   flexDirection="column"
//                   alignItems="center"
//                   justifyContent="center"
//                 >
//                   <img
//                     src={popularDestinationsData[currentDestinationIndex].image}
//                     alt={popularDestinationsData[currentDestinationIndex].title}
//                     style={{
//                       width: "100%",
//                       height: "300px",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <Typography variant="body1" mt={1} sx={{ fontSize: "18px", fontFamily: "Poppins",}}>
//                     {popularDestinationsData[currentDestinationIndex].title}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Analytics;

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Drawer,
//   Container,
//   Paper,
//   Grid,
//   Button,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import Sidebar from "./sidebar";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../firebase/firebase-config"; // Ensure your Firebase config is correctly imported
// import "./dashboard.css";

// // Data to be uploaded
// const travelTrendsData = [
//   {
//     title: "Eco-Tourism",
//     image: "https://www.ith.org.za/wp-content/uploads/2018/05/ITHSA-BLOG.png",
//   },
//   {
//     title: "Adventure Travel",
//     image:
//       "https://images2.goabroad.com/image/upload/v1/images2/program_content/prime-how-to-choose-the-best-adventure-travel-tour-companies-1504752924.jpg",
//   },
//   {
//     title: "Cultural Trips",
//     image:
//       "https://www.bikehike.com/sites/default/files/styles/banner/public/blog/Rectangle%2021.jpg?itok=71yMn12f",
//   },
//   {
//     title: "Solo Travel",
//     image:
//       "https://capetownguy.co.za/wp-content/uploads/2024/07/Solo-Travel.jpeg",
//   },
//   {
//     title: "Luxury Travel",
//     image:
//       "https://images.squarespace-cdn.com/content/v1/52e72f94e4b001f05e5e6d22/1697074562431-CV14C5LGBBTMJ6HHU2X2/Miavana-Piazza-32-Pool.jpg",
//   },
// ];

// const popularDestinationsData = [
//   {
//     title: "Paris, France",
//     image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg",
//   },
//   {
//     title: "Kyoto, Japan",
//     image: "https://www.pelago.co/img/destinations/kyoto/1129-0642_kyoto.jpg",
//   },
//   {
//     title: "New York, USA",
//     image: "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg",
//   },
//   {
//     title: "Rome, Italy",
//     image: "https://media.timeout.com/images/105212586/750/562/image.jpg",
//   },
//   {
//     title: "Sydney, Australia",
//     image: "https://www.pelago.co/img/destinations/sydney/hero-image-xlarge.jpg",
//   },
// ];

// const Analytics = () => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
//   const [uploading, setUploading] = useState(false); // State to handle upload status
//   const [uploadStatus, setUploadStatus] = useState(""); // Message to show the user

//   // Function to upload data to Firebase
//   const uploadData = async () => {
//     setUploading(true);
//     setUploadStatus("Uploading data...");

//     try {
//       // Upload Travel Trends Data
//       const travelTrendsCollection = collection(db, "travelTrends");
//       for (const trend of travelTrendsData) {
//         await addDoc(travelTrendsCollection, trend);
//       }

//       // Upload Popular Destinations Data
//       const popularDestinationsCollection = collection(db, "popularDestinations");
//       for (const destination of popularDestinationsData) {
//         await addDoc(popularDestinationsCollection, destination);
//       }

//       setUploadStatus("Data uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading data: ", error);
//       setUploadStatus("Error uploading data.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Box display="flex">
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
//       <Box
//         flexGrow={1}
//         p={3}
//         sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
//       >
//         <Container maxWidth="lg">
//           <h1>Analytics Dashboard</h1>
//           <Typography variant="h5" color="textSecondary" gutterBottom>
//             Analytics
//           </Typography>

//           {/* Upload button */}
//           <Box mt={3} display="flex" justifyContent="center">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={uploadData}
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Upload Data"}
//             </Button>
//           </Box>

//           {/* Status Message */}
//           <Box mt={2} display="flex" justifyContent="center">
//             <Typography variant="body1" color="textSecondary">
//               {uploadStatus}
//             </Typography>
//           </Box>

//           <Grid container spacing={3} mt={5}>
//             {/* Placeholder for future analytics */}
//             <Grid item xs={12} md={6}>
//               <Paper
//                 elevation={3}
//                 sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   Travel Trends
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" align="center">
//                   Upload data to view travel trends.
//                 </Typography>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Paper
//                 elevation={3}
//                 sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
//               >
//                 <Typography variant="h6" gutterBottom>
//                   Popular Destinations
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary" align="center">
//                   Upload data to view popular destinations.
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Analytics;

import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Typography,
  Container,
  Paper,
  Grid,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "./sidebar";
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore imports
import { db } from "../../firebase/firebase-config"; // Your Firebase config file
import "./dashboard.css";

const Analytics = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [travelTrends, setTravelTrends] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [currentTrendIndex, setCurrentTrendIndex] = useState(0);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch travel trends 
        const travelTrendsSnapshot = await getDocs(collection(db, "travelTrends"));
        const travelTrendsList = travelTrendsSnapshot.docs.map(doc => doc.data());
        setTravelTrends(travelTrendsList);

        // Fetch popular destinations 
        const popularDestinationsSnapshot = await getDocs(collection(db, "popularDestinations"));
        const popularDestinationsList = popularDestinationsSnapshot.docs.map(doc => doc.data());
        setPopularDestinations(popularDestinationsList);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();

    // Automatic slideshow effect with timers
    const trendInterval = setInterval(() => {
      setCurrentTrendIndex((prevIndex) => (prevIndex + 1) % travelTrends.length);
    }, 3000); // Slide changes every 3 seconds

    const destinationInterval = setInterval(() => {
      setCurrentDestinationIndex((prevIndex) => (prevIndex + 1) % popularDestinations.length);
    }, 3000);

    return () => {
      clearInterval(trendInterval);
      clearInterval(destinationInterval);
    };
  }, [travelTrends.length, popularDestinations.length]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

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
      <Box
        flexGrow={1}
        p={3}
        sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
      >
        <Container maxWidth="lg">
          <h1>Analytics Dashboard</h1>
          <h2>Analytics</h2>

          <Grid container spacing={3}>
            {/* Travel Trends Slideshow */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
              >
                <Typography variant="h6" gutterBottom>
                  Travel Trends
                </Typography>
                {travelTrends.length > 0 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={travelTrends[currentTrendIndex].image}
                      alt={travelTrends[currentTrendIndex].title}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="body1" mt={1} sx={{fontSize: "18px", fontFamily: "Poppins"}}>
                      {travelTrends[currentTrendIndex].title}
                    </Typography>
                  </Box>
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Paper>
            </Grid>

            {/* Popular Destinations Slideshow */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 2, bgcolor: isDarkMode ? "#424242" : "#ffffff" }}
              >
                <Typography variant="h6" gutterBottom>
                  Popular Destinations
                </Typography>
                {popularDestinations.length > 0 ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={popularDestinations[currentDestinationIndex].image}
                      alt={popularDestinations[currentDestinationIndex].title}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="body1" mt={1} sx={{fontSize: "18px", fontFamily: "Poppins"}}>
                      {popularDestinations[currentDestinationIndex].title}
                    </Typography>
                  </Box>
                ) : (
                  <Typography>No data available</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Analytics;
