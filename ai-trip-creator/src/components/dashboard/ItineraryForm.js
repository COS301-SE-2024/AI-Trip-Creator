// // // // // import React, { useState } from "react";
// // // // // import { setGlobalAIText } from "./globalData";
// // // // // import { db, app } from "../../firebase/firebase-config";
// // // // // import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";

// // // // // // import {
// // // // // //   Button, FormControl, InputLabel, MenuItem, Select, Typography,
// // // // // //   Box, Card, CardContent, CardMedia, Grid, Chip, Paper, TextField,
// // // // // //   Autocomplete, ToggleButton, ToggleButtonGroup,}
// // // // // //   from '@mui/material';;

// // // // // import "./dashboard.css";
// // // // // import {
// // // // //   FormHelperText,
// // // // //   Button,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   MenuItem,
// // // // //   Select,
// // // // //   Typography,
// // // // //   Box,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   CardMedia,
// // // // //   Grid,
// // // // //   Chip,
// // // // //   Paper,
// // // // //   TextField,
// // // // //   Autocomplete,
// // // // //   ToggleButton,
// // // // //   ToggleButtonGroup,
// // // // //   useTheme,
// // // // //   Slider,
// // // // //   Rating,
// // // // //   Container,
// // // // // } from "@mui/material";
// // // // // import Sidebar from "./sidebar";
// // // // // import { DatePicker } from "@mui/lab";
// // // // // import johannesburgImg from "./images/johannesburg.jpg";
// // // // // import pretoriaImg from "./images/pretoria.jpg";
// // // // // import capetownImg from "./images/capetown.jpg";
// // // // // import durbanImg from "./images/durban.jpeg";
// // // // // import gqerberhaImg from "./images/Gqerberha.jpg";
// // // // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // // // import {
// // // // //   doc,
// // // // //   getDoc,
// // // // //   setDoc,
// // // // //   collection,
// // // // //   query,
// // // // //   where,
// // // // //   getDocs,
// // // // // } from "firebase/firestore";
// // // // // import "./dashboard.css";

// // // // // let exportVariable = "def";

// // // // // const vertexAI = getVertexAI(app);

// // // // // const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

// // // // // const fetchDocumentById = async (docId) => {
// // // // //   try {
// // // // //     const prefsDocRef = doc(db, "Preferences", docId);
// // // // //     const prefsDocSnap = await getDoc(prefsDocRef);

// // // // //     if (!prefsDocSnap.exists) {
// // // // //       console.log("No such document!");
// // // // //       return;
// // // // //     }

// // // // //     // Log the document data
// // // // //     let data = prefsDocSnap.data();
// // // // //     let activities = data.activities;
// // // // //     //console.log('Document data:', data);
// // // // //     let a = activities[0] + "   " + activities[1];
// // // // //     //console.log('Activities:', a);

// // // // //     return activities;
// // // // //   } catch (error) {
// // // // //     console.error("Error getting document", error);
// // // // //     return [
// // // // //       "Outdoor",
// // // // //       "Indoor",
// // // // //       "Shopping",
// // // // //       "Amusement Park",
// // // // //       "Historical",
// // // // //       "Art",
// // // // //       "Beach",
// // // // //       "Adventure",
// // // // //       "Luxury",
// // // // //       "Culture",
// // // // //       "Food",
// // // // //       "Nightlife",
// // // // //     ];
// // // // //   }
// // // // // };

// // // // // // Function to update family size and adjust the group size slider accordingly

// // // // // const fetchFilteredActivities = async (activitiesArray) => {
// // // // //   try {
// // // // //     const activitiesCollection = collection(db, "Activities");
// // // // //     const q = query(
// // // // //       activitiesCollection,
// // // // //       where("city", "==", "Cape Town"),
// // // // //       where("sub_category", "in", activitiesArray),
// // // // //     );

// // // // //     const querySnapshot = await getDocs(q);

// // // // //     let activities = [];
// // // // //     querySnapshot.forEach((doc) => {
// // // // //       activities.push({ id: doc.id, ...doc.data() });
// // // // //     });

// // // // //     console.log("Activities:" + activities.join(", "));
// // // // //     return activities;
// // // // //   } catch (error) {
// // // // //     console.error("Error getting documents", error);
// // // // //     const activities = [
// // // // //       {
// // // // //         ActivityID: "1839618f-d6cb-4f1e-8709-c5f697a28f4b",
// // // // //         address: "0606 Hernandez Road Apt. 126 East Rodneyshire, AL 56108",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
// // // // //         name: "Gill-Stevens",
// // // // //         price: 4094,
// // // // //         sub_category: "Indoor",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "188c41fa-1a44-47fe-96c2-d1ec4aa4540b",
// // // // //         address: "91953 Schwartz Park Apt. 226 West Debrabury, AR 94889",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "Vendors offering traditional street foods from various cultures, often in an outdoor setting with a focus on authentic and flavorful dishes.",
// // // // //         name: "Alvarez and Sons",
// // // // //         price: 398,
// // // // //         sub_category: "Ethnic Street Food",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "1db7c6b7-01ae-424e-9dec-15e2d16a85cd",
// // // // //         address: "77569 Krause Shoal Suite 689 Thomasview, SD 53421",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "An establishment specializing in a variety of teas, often paired with light snacks or pastries, providing a tranquil environment for tea lovers.",
// // // // //         name: "Martin, Brown and Cooley",
// // // // //         price: 217,
// // // // //         sub_category: "Tea House",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "294d0015-f9ec-4755-8189-1d1d5a8084ce",
// // // // //         address: "36335 Baldwin Ferry Luisshire, ND 45289",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A traditional dance performance that showcases the rich cultural heritage of the region.",
// // // // //         name: "Harper, Morris and Wilcox",
// // // // //         price: 4049,
// // // // //         sub_category: "Culture",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "29c35c59-3d2c-4466-9b08-1c9d1be20292",
// // // // //         address: "PSC 8293, Box 9844 APO AP 96314",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "An establishment offering nutritious meals made from organic or locally sourced ingredients, focusing on health-conscious dining options.",
// // // // //         name: "Snyder and Sons",
// // // // //         price: 432,
// // // // //         sub_category: "Health Food Restaurant",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "4d076bb9-0f2a-4445-8245-5d34f8e13605",
// // // // //         address: "06299 Hardy Flat North Joseph, RI 31399",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A traditional dance performance that showcases the rich cultural heritage of the region.",
// // // // //         name: "Jenkins-Kelley",
// // // // //         price: 3871,
// // // // //         sub_category: "Culture",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "7924c846-1795-46a5-8646-50923a5d8ccb",
// // // // //         address: "944 Hamilton Union Robertton, NY 90162",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A restaurant combining elements from multiple ethnic cuisines to create unique and innovative dishes, blending diverse culinary traditions.",
// // // // //         name: "Hunter LLC",
// // // // //         price: 61,
// // // // //         sub_category: "Ethnic Fusion",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "99c6fd46-8a88-4374-b280-ff6288918fff",
// // // // //         address: "03456 Krystal Ridges Potterview, WY 77081",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A scenic hiking trail that offers breathtaking views and a serene escape into nature.",
// // // // //         name: "Nichols, Bond and Haynes",
// // // // //         price: 869,
// // // // //         sub_category: "Outdoor",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "9a181812-159c-4d07-988e-1b414c2b0f9d",
// // // // //         address: "18115 Schmidt Circles Suite 019 Mosleyshire, FM 44546",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
// // // // //         name: "James-Shah",
// // // // //         price: 2936,
// // // // //         sub_category: "Indoor",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "dd0036ca-b2a4-4f45-bb53-a34e415f0416",
// // // // //         address: "422 Thomas Canyon Suite 404 Lake Joshua, MA 47204",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A secluded beach with soft white sand and crystal-clear waters, ideal for a relaxing day.",
// // // // //         name: "Wright, Vega and Fleming",
// // // // //         price: 1461,
// // // // //         sub_category: "Beach",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "eb675274-dd3c-4202-b83f-56e0064d418c",
// // // // //         address: "288 Susan Meadows Apt. 096 Sharonmouth, NE 93225",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A traditional dance performance that showcases the rich cultural heritage of the region.",
// // // // //         name: "Harris-Lee",
// // // // //         price: 4849,
// // // // //         sub_category: "Culture",
// // // // //       },
// // // // //     ];

// // // // //     return activities;
// // // // //   }
// // // // // };
// // // // // //fetchDocumentByUserId('9CFwYt87JCRRLe8XKF8mY5TEcSu2');

// // // // // function ItineraryForm({ onGenerateItinerary }) {
// // // // //   let globalAI_Text = "";
// // // // //   const [preferences, setPreferences] = useState({
// // // // //     currentLocation: "",
// // // // //     destination: "",
// // // // //     duration: "",
// // // // //     travelDate: null,
// // // // //     budgetRange: [0, 10000],
// // // // //     interests: [],
// // // // //     groupSize: 1,
// // // // //     priority: "Budget",
// // // // //     travelerCategory: "",
// // // // //   });

// // // // //   const [familySize, setFamilySize] = useState({ adults: 2, kids: 0 });

// // // // //   const handleFamilyChange = (event) => {
// // // // //     const { name, value } = event.target;
// // // // //     setFamilySize((prev) => ({
// // // // //       ...prev,
// // // // //       [name]: value,
// // // // //     }));
// // // // //     // Set the group size slider based on the number of adults + kids
// // // // //     handleGroupSizeChange(
// // // // //       null,
// // // // //       parseInt(familySize.adults) + parseInt(familySize.kids),
// // // // //     );
// // // // //   };

// // // // //   // const [preferences, setPreferences] = useState({currentLocation: '', destination: '', duration: '', interests: [], travelDate: null, budget: '', priority: '',
// // // // //   //   groupSize: 1,
// // // // //   //   itineraryText: '',
// // // // //   // });

// // // // //   const [responseText, setResponseText] = useState("");
// // // // //   async function run() {
// // // // //     //let acts = fetchFilteredActivities(await fetchDocumentById('9CFwYt87JCRRLe8XKF8mY5TEcSu2') );
// // // // //     const acts = [
// // // // //       "Outdoor",
// // // // //       "Indoor",
// // // // //       "Shopping",
// // // // //       "Amusement Park",
// // // // //       "Historical",
// // // // //       "Art",
// // // // //       "Beach",
// // // // //       "Adventure",
// // // // //       "Luxury",
// // // // //       "Culture",
// // // // //       "Food",
// // // // //       "Nightlife",
// // // // //     ];

// // // // //     const Activities = [
// // // // //       {
// // // // //         ActivityID: "1839618f-d6cb-4f1e-8709-c5f697a28f4b",
// // // // //         address: "0606 Hernandez Road Apt. 126 East Rodneyshire, AL 56108",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
// // // // //         name: "Gill-Stevens",
// // // // //         price: 4094,
// // // // //         sub_category: "Indoor",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "188c41fa-1a44-47fe-96c2-d1ec4aa4540b",
// // // // //         address: "91953 Schwartz Park Apt. 226 West Debrabury, AR 94889",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "Vendors offering traditional street foods from various cultures, often in an outdoor setting with a focus on authentic and flavorful dishes.",
// // // // //         name: "Alvarez and Sons",
// // // // //         price: 398,
// // // // //         sub_category: "Ethnic Street Food",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "1db7c6b7-01ae-424e-9dec-15e2d16a85cd",
// // // // //         address: "77569 Krause Shoal Suite 689 Thomasview, SD 53421",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "An establishment specializing in a variety of teas, often paired with light snacks or pastries, providing a tranquil environment for tea lovers.",
// // // // //         name: "Martin, Brown and Cooley",
// // // // //         price: 217,
// // // // //         sub_category: "Tea House",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "294d0015-f9ec-4755-8189-1d1d5a8084ce",
// // // // //         address: "36335 Baldwin Ferry Luisshire, ND 45289",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A traditional dance performance that showcases the rich cultural heritage of the region.",
// // // // //         name: "Harper, Morris and Wilcox",
// // // // //         price: 4049,
// // // // //         sub_category: "Culture",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "29c35c59-3d2c-4466-9b08-1c9d1be20292",
// // // // //         address: "PSC 8293, Box 9844 APO AP 96314",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "An establishment offering nutritious meals made from organic or locally sourced ingredients, focusing on health-conscious dining options.",
// // // // //         name: "Snyder and Sons",
// // // // //         price: 432,
// // // // //         sub_category: "Health Food Restaurant",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "4d076bb9-0f2a-4445-8245-5d34f8e13605",
// // // // //         address: "06299 Hardy Flat North Joseph, RI 31399",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A traditional dance performance that showcases the rich cultural heritage of the region.",
// // // // //         name: "Jenkins-Kelley",
// // // // //         price: 3871,
// // // // //         sub_category: "Culture",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "7924c846-1795-46a5-8646-50923a5d8ccb",
// // // // //         address: "944 Hamilton Union Robertton, NY 90162",
// // // // //         category: "Restaurant",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A restaurant combining elements from multiple ethnic cuisines to create unique and innovative dishes, blending diverse culinary traditions.",
// // // // //         name: "Hunter LLC",
// // // // //         price: 61,
// // // // //         sub_category: "Ethnic Fusion",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "99c6fd46-8a88-4374-b280-ff6288918fff",
// // // // //         address: "03456 Krystal Ridges Potterview, WY 77081",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A scenic hiking trail that offers breathtaking views and a serene escape into nature.",
// // // // //         name: "Nichols, Bond and Haynes",
// // // // //         price: 869,
// // // // //         sub_category: "Outdoor",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "9a181812-159c-4d07-988e-1b414c2b0f9d",
// // // // //         address: "18115 Schmidt Circles Suite 019 Mosleyshire, FM 44546",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
// // // // //         name: "James-Shah",
// // // // //         price: 2936,
// // // // //         sub_category: "Indoor",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "dd0036ca-b2a4-4f45-bb53-a34e415f0416",
// // // // //         address: "422 Thomas Canyon Suite 404 Lake Joshua, MA 47204",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A secluded beach with soft white sand and crystal-clear waters, ideal for a relaxing day.",
// // // // //         name: "Wright, Vega and Fleming",
// // // // //         price: 1461,
// // // // //         sub_category: "Beach",
// // // // //       },
// // // // //       {
// // // // //         ActivityID: "eb675274-dd3c-4202-b83f-56e0064d418c",
// // // // //         address: "288 Susan Meadows Apt. 096 Sharonmouth, NE 93225",
// // // // //         category: "Things_to_do",
// // // // //         city: "Cape Town",
// // // // //         description:
// // // // //           "A traditional dance performance that showcases the rich cultural heritage of the region.",
// // // // //         name: "Harris-Lee",
// // // // //         price: 4849,
// // // // //         sub_category: "Culture",
// // // // //       },
// // // // //     ];

// // // // //     const currentLocation = preferences.currentLocation;
// // // // //     const destination = preferences.destination;
// // // // //     const travelerCategory = preferences.travelerCategory;
// // // // //     const duration = preferences.duration;
// // // // //     const budgetRange = preferences.budgetRange;
// // // // //     const interests = preferences.interests;
// // // // //     const groupSize = preferences.groupSize;
// // // // //     const priority = preferences.priority;

// // // // //     //Fetch activities to feed to AI based on destination/city
// // // // //     const FilteredActivities = async (activitiesArray) => {
// // // // //       try {
// // // // //         const activitiesCollection = collection(db, "Activities");
// // // // //         const q = query(
// // // // //           activitiesCollection,
// // // // //           where("city", "==", destination),
// // // // //           //where("sub_category", "in", activitiesArray),
// // // // //         );

// // // // //         const querySnapshot = await getDocs(q);

// // // // //         let activities = [];
// // // // //         querySnapshot.forEach((doc) => {
// // // // //           activities.push({ id: doc.id, ...doc.data() });
// // // // //         });

// // // // //         console.log("Activities:" + activities.join(", "));
// // // // //         return activities;
// // // // //       } catch (error) {
// // // // //         console.error("Error getting documents", error);
// // // // //       }
// // // // //     };

// // // // //     // const prompt = "Generate an itinerary for my holiday with the the following data. The Holiday is 2 days long and i would like to eat twice a day. You will"
// // // // //     //                 + " make sure the category is restaurant when choosing a place to eat. i am limit to 2-3 activities a day. Ake sure to include price and descripton at each activity.";

// // // // //     const prompt =
// // // // //       "Generate an itinerary for my holiday with the the following data. The holiday should accommodate for the start location at " +
// // // // //       currentLocation +
// // // // //       " and the destination is " +
// // // // //       destination +
// // // // //       ". The travelor category is " +
// // // // //       travelerCategory +
// // // // //       ". The duration of the trip is " +
// // // // //       duration +
// // // // //       ". The group size is " +
// // // // //       groupSize +
// // // // //       ". The interests are as follows " +
// // // // //       interests +
// // // // //       ". Plan when the following activities for the trip can be done across the days: " +
// // // // //       FilteredActivities +
// // // // //       ". And the priority of the trip is " +
// // // // //       priority +
// // // // //       ". ";

// // // // //     const acts_string = JSON.stringify(Activities, null, 2);
// // // // //     const AI_prompt = prompt + "\n\n" + "Activities:\n" + acts_string;
// // // // //     const result = await model.generateContent(AI_prompt);

// // // // //     const response = result.response;
// // // // //     const text = response.text();
// // // // //     globalAI_Text = text;
// // // // //     exportVariable = text;
// // // // //     setResponseText(text);
// // // // //     setGlobalAIText(text);

// // // // //     console.log("ResponseText: ", text);

// // // // //     setPreferences({
// // // // //       ...preferences,
// // // // //       itineraryText: text,
// // // // //     });
// // // // //   }

// // // // //   const handleChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setPreferences({
// // // // //       ...preferences,
// // // // //       [name]: value,
// // // // //     });
// // // // //   };

// // // // //   const handleInterestsChange = (event, values) => {
// // // // //     setPreferences({
// // // // //       ...preferences,
// // // // //       interests: values,
// // // // //     });
// // // // //   };

// // // // //   const handleDateChange = (date) => {
// // // // //     setPreferences({
// // // // //       ...preferences,
// // // // //       travelDate: date,
// // // // //     });
// // // // //   };

// // // // //   let exportVariable = "def";

// // // // //   // Function to update family size and adjust the group size slider accordingly
// // // // //   const updateFamilyGroupSize = (adults, kids) => {
// // // // //     const total = adults + kids;
// // // // //     setPreferences({ ...preferences, groupSize: total });
// // // // //   };

// // // // //   const handleTravelerCategoryChange = (event) => {
// // // // //     const { value } = event.target;
// // // // //     setPreferences({ ...preferences, travelerCategory: value });

// // // // //     if (value === "Family") {
// // // // //       setPreferences({ ...preferences, groupSize: 3 }); // default to 2 adults + 1 kid
// // // // //     } else {
// // // // //       setPreferences({ ...preferences, groupSize: 2 }); // default for Couples or others
// // // // //     }
// // // // //   };

// // // // //   const handleAdultsChange = (event) => {
// // // // //     const adults = parseInt(event.target.value) || 0;
// // // // //     updateFamilyGroupSize(adults, preferences.kids);
// // // // //   };

// // // // //   const handleKidsChange = (event) => {
// // // // //     const kids = parseInt(event.target.value) || 0;
// // // // //     updateFamilyGroupSize(preferences.adults, kids);
// // // // //   };

// // // // //   const handlePriorityChange = (event, newPriority) => {
// // // // //     setPreferences((prevPreferences) => {
// // // // //       const newPreferences = { ...prevPreferences, priority: newPriority };

// // // // //       if (newPriority === "Budget") {
// // // // //         newPreferences.budgetRange = [0, 30000];
// // // // //       } else if (newPriority === "Comfort") {
// // // // //         newPreferences.budgetRange = [30001, 50000];
// // // // //       } else {
// // // // //         newPreferences.budgetRange = [50001, 100000];
// // // // //       }

// // // // //       return newPreferences;
// // // // //     });
// // // // //   };

// // // // //   const handleGroupSizeChange = (event, newValue) => {
// // // // //     setPreferences({
// // // // //       ...preferences,
// // // // //       groupSize: newValue,
// // // // //     });
// // // // //   };

// // // // //   const handleBudgetRangeChange = (event, newValue) => {
// // // // //     setPreferences((prevPreferences) => {
// // // // //       const newPreferences = { ...prevPreferences, budgetRange: newValue };

// // // // //       // Auto-update priority based on budget range
// // // // //       if (newValue[1] <= 30000) {
// // // // //         newPreferences.priority = "Budget";
// // // // //       } else if (newValue[1] <= 50000) {
// // // // //         newPreferences.priority = "Comfort";
// // // // //       } else {
// // // // //         newPreferences.priority = "Experience";
// // // // //       }

// // // // //       return newPreferences;
// // // // //     });
// // // // //   };

// // // // //   const calculateTripDuration = (departure, returnDate) => {
// // // // //     const departureDateObj = new Date(departure);
// // // // //     const returnDateObj = new Date(returnDate);

// // // // //     if (isNaN(departureDateObj.getTime()) || isNaN(returnDateObj.getTime())) {
// // // // //       console.error("Invalid departure or return date");
// // // // //       return 0; // Return 0 if dates are invalid
// // // // //     }

// // // // //     // Check if departure is before return
// // // // //     if (departureDateObj > returnDateObj) {
// // // // //       console.error("Departure date must be earlier than return date");
// // // // //       return 0;
// // // // //     }

// // // // //     // Calculate the time difference in milliseconds
// // // // //     const timeDifference = returnDateObj - departureDateObj;

// // // // //     // Convert the time difference to days
// // // // //     const durationInDays =
// // // // //       Math.round(timeDifference / (1000 * 60 * 60 * 24)) - 1;

// // // // //     return durationInDays;
// // // // //   };

// // // // //   const [departureDate, setDepartureDate] = useState("");
// // // // //   const [returnDate, setReturnDate] = useState("");

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();

// // // // //     const tripDuration = calculateTripDuration(departureDate, returnDate);
// // // // //     //const { currentLocation, destination, duration, interests, travelDate, budget, priority, groupSize } = preferences;
// // // // //     await run();
// // // // //     // console.log("Response submit : ", exportVariable);
// // // // //     onGenerateItinerary({
// // // // //       ...preferences,
// // // // //       departureDate,
// // // // //       returnDate,
// // // // //       duration: tripDuration,
// // // // //       itineraryText: exportVariable, // Pass the generated AI text
// // // // //     });
// // // // //   };

// // // // //   const locations = [
// // // // //     { name: "Johannesburg", image: johannesburgImg },
// // // // //     { name: "Cape Town", image: capetownImg },
// // // // //     { name: "Pretoria", image: pretoriaImg },
// // // // //     { name: "Durban", image: durbanImg },
// // // // //     { name: "Gqeberha", image: gqerberhaImg },
// // // // //   ];

// // // // //   const interests = [
// // // // //     "Outdoor",
// // // // //     "Indoor",
// // // // //     "Shopping",
// // // // //     "Amusement Park",
// // // // //     "Historical",
// // // // //     "Art",
// // // // //     "Beach",
// // // // //     "Adventure",
// // // // //     "Luxury",
// // // // //     "Culture",
// // // // //     "Food",
// // // // //     "Nightlife",
// // // // //   ];

// // // // //   const budgets = ["Low", "Medium", "High"];

// // // // //   const theme = useTheme();
// // // // //   const isDarkMode = theme.palette.mode === "dark";

// // // // //   return (
// // // // //     <Box display="flex">
// // // // //       <Sidebar
// // // // //         style={{
// // // // //           position: "fixed",
// // // // //           width: "250px",
// // // // //           height: "100%",
// // // // //           top: 0,
// // // // //           left: 0,
// // // // //         }}
// // // // //       />
// // // // //       <div
// // // // //         style={{
// // // // //           marginLeft: "250px",
// // // // //           padding: "20px",
// // // // //           overflowY: "auto",
// // // // //           width: "100%",
// // // // //         }}
// // // // //       >
// // // // //         <Container>
// // // // //           <h1 style={{}}>Itinerary Form</h1>
// // // // //           <Box
// // // // //             component="form"
// // // // //             onSubmit={handleSubmit}
// // // // //             sx={{
// // // // //               overflowX: "hidden",
// // // // //               width: "950px",
// // // // //             }}
// // // // //           >
// // // // //             <Grid container spacing={4} justifyContent="center">
// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <FormControl required fullWidth>
// // // // //                   <InputLabel id="current-location">
// // // // //                     Starting Location
// // // // //                   </InputLabel>
// // // // //                   <Select
// // // // //                     sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     labelId="current-location"
// // // // //                     name="currentLocation"
// // // // //                     value={preferences.currentLocation}
// // // // //                     onChange={handleChange}
// // // // //                     label="Starting Location"
// // // // //                   >
// // // // //                     <MenuItem
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                       value=""
// // // // //                       disabled
// // // // //                     >
// // // // //                       Select a location
// // // // //                     </MenuItem>
// // // // //                     {locations.map((location) => (
// // // // //                       <MenuItem
// // // // //                         sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                         key={location.name}
// // // // //                         value={location.name}
// // // // //                       >
// // // // //                         {location.name}
// // // // //                       </MenuItem>
// // // // //                     ))}
// // // // //                   </Select>
// // // // //                 </FormControl>
// // // // //               </Grid>

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <FormControl required fullWidth>
// // // // //                   <InputLabel id="destination-label">Destination</InputLabel>
// // // // //                   <Select
// // // // //                     sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     labelId="destination-label"
// // // // //                     name="destination"
// // // // //                     value={preferences.destination}
// // // // //                     onChange={handleChange}
// // // // //                     label="Destination"
// // // // //                   >
// // // // //                     <MenuItem
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                       value=""
// // // // //                       disabled
// // // // //                     >
// // // // //                       Select a destination
// // // // //                     </MenuItem>
// // // // //                     {locations
// // // // //                       .filter(
// // // // //                         (location) =>
// // // // //                           location.name !== preferences.currentLocation,
// // // // //                       )
// // // // //                       .map((location) => (
// // // // //                         <MenuItem
// // // // //                           sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                           key={location.name}
// // // // //                           value={location.name}
// // // // //                         >
// // // // //                           {location.name}
// // // // //                         </MenuItem>
// // // // //                       ))}
// // // // //                   </Select>
// // // // //                 </FormControl>
// // // // //               </Grid>

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <TextField
// // // // //                   label="Departure Date"
// // // // //                   type="date"
// // // // //                   value={departureDate}
// // // // //                   onChange={(e) => setDepartureDate(e.target.value)}
// // // // //                   fullWidth
// // // // //                   InputLabelProps={{
// // // // //                     shrink: true,
// // // // //                   }}
// // // // //                 />
// // // // //               </Grid>

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <TextField
// // // // //                   label="Return Date"
// // // // //                   type="date"
// // // // //                   value={returnDate}
// // // // //                   onChange={(e) => setReturnDate(e.target.value)}
// // // // //                   fullWidth
// // // // //                   InputLabelProps={{
// // // // //                     shrink: true,
// // // // //                   }}
// // // // //                 />
// // // // //               </Grid>

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <FormControl required fullWidth>
// // // // //                   <InputLabel id="traveler-category-label">
// // // // //                     Traveler Category
// // // // //                   </InputLabel>
// // // // //                   <Select
// // // // //                     sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     labelId="traveler-category-label"
// // // // //                     name="travelerCategory"
// // // // //                     value={preferences.travelerCategory}
// // // // //                     onChange={handleChange}
// // // // //                     label="Traveler Category"
// // // // //                   >
// // // // //                     <MenuItem
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                       value=""
// // // // //                       disabled
// // // // //                     >
// // // // //                       Select a category
// // // // //                     </MenuItem>
// // // // //                     <MenuItem
// // // // //                       value="Family"
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     >
// // // // //                       Family
// // // // //                     </MenuItem>
// // // // //                     <MenuItem
// // // // //                       value="Singles"
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     >
// // // // //                       Singles
// // // // //                     </MenuItem>
// // // // //                     <MenuItem
// // // // //                       value="Couples"
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     >
// // // // //                       Couples
// // // // //                     </MenuItem>
// // // // //                     <MenuItem
// // // // //                       value="Group"
// // // // //                       sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
// // // // //                     >
// // // // //                       Other
// // // // //                     </MenuItem>
// // // // //                   </Select>
// // // // //                 </FormControl>
// // // // //               </Grid>

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <FormControl required fullWidth>
// // // // //                   <Autocomplete
// // // // //                     multiple
// // // // //                     options={interests}
// // // // //                     getOptionLabel={(option) => option}
// // // // //                     value={preferences.interests}
// // // // //                     onChange={handleInterestsChange}
// // // // //                     renderInput={(params) => (
// // // // //                       <TextField
// // // // //                         {...params}
// // // // //                         variant="outlined"
// // // // //                         label="Interests"
// // // // //                         placeholder="Select interests"
// // // // //                       />
// // // // //                     )}
// // // // //                     renderTags={(value, getTagProps) =>
// // // // //                       value.map((option, index) => (
// // // // //                         <Chip
// // // // //                           key={option}
// // // // //                           label={option}
// // // // //                           {...getTagProps({ index })}
// // // // //                         />
// // // // //                       ))
// // // // //                     }
// // // // //                   />
// // // // //                 </FormControl>
// // // // //               </Grid>

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <Typography gutterBottom>Budget Range</Typography>
// // // // //                 <Box ml={2} mr={2} sx={{ marginRight: "50px" }}>
// // // // //                   <Slider
// // // // //                     p={2}
// // // // //                     value={preferences.budgetRange}
// // // // //                     onChange={handleBudgetRangeChange}
// // // // //                     valueLabelDisplay="auto"
// // // // //                     min={1000}
// // // // //                     max={100000}
// // // // //                     aria-labelledby="budget-range-slider"
// // // // //                   />
///////////    </Box>

// // // // //                 <Box mt={2}>
// // // // //                   <Typography>
// // // // //                     Selected Range: R{preferences.budgetRange[0]} - R
// // // // //                     {preferences.budgetRange[1]}
// // // // //                   </Typography>
// // // // //                 </Box>
// // // // //               </Grid>

// // // // //               {/* Conditional rendering based on traveler category */}
// // // // //               {preferences.travelerCategory === "Family" ? (
// // // // //                 <>
// // // // //                   <Grid item xs={12} sm={6}>
// // // // //                     <TextField
// // // // //                       label="Number of Adults"
// // // // //                       name="adults"
// // // // //                       value={familySize.adults}
// // // // //                       onChange={handleFamilyChange}
// // // // //                       type="number"
// // // // //                       fullWidth
// // // // //                     />
// // // // //                   </Grid>
// // // // //                   <Grid item xs={12} sm={6}>
// // // // //                     <TextField
// // // // //                       label="Number of Kids"
// // // // //                       name="kids"
// // // // //                       value={familySize.kids}
// // // // //                       onChange={handleFamilyChange}
// // // // //                       type="number"
// // // // //                       fullWidth
// // // // //                     />
// // // // //                   </Grid>
// // // // //                 </>
// // // // //               ) : (
// // // // //                 <Grid item xs={12} sm={6}>
// // // // //                   <Typography gutterBottom>Group Size</Typography>
// // // // //                   <Slider
// // // // //                     value={preferences.groupSize}
// // // // //                     onChange={handleGroupSizeChange}
// // // // //                     step={1}
// // // // //                     marks
// // // // //                     min={1}
// // // // //                     max={20}
// // // // //                     valueLabelDisplay="auto"
// // // // //                     aria-labelledby="group-size-slider"
// // // // //                   />
// // // // //                 </Grid>
// // // // //               )}

// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <Typography gutterBottom>Priority</Typography>
// // // // //                 <ToggleButtonGroup
// // // // //                   sx={{
// // // // //                     "& .MuiToggleButton-root": {
// // // // //                       "&.Mui-selected": {
// // // // //                         backgroundColor: "#1976d2",
// // // // //                         color: "#fff",
// // // // //                       },
// // // // //                     },
// // // // //                   }}
// // // // //                   value={preferences.priority}
// // // // //                   exclusive
// // // // //                   onChange={handlePriorityChange}
// // // // //                   aria-label="priority"
// // // // //                   fullWidth
// // // // //                 >
// // // // //                   <ToggleButton value="Budget" aria-label="budget">
// // // // //                     Budget
// // // // //                   </ToggleButton>
// // // // //                   <ToggleButton value="Comfort" aria-label="comfort">
// // // // //                     Comfort
// // // // //                   </ToggleButton>
// // // // //                   <ToggleButton value="Experience" aria-label="experience">
// // // // //                     Experience
// // // // //                   </ToggleButton>
// // // // //                 </ToggleButtonGroup>
// // // // //               </Grid>

// // // // //               <Grid item xs={12}>
// // // // //                 <Button
// // // // //                   type="submit"
// // // // //                   variant="contained"
// // // // //                   color="primary"
// // // // //                   fullWidth
// // // // //                 >
// // // // //                   Generate Itinerary
// // // // //                 </Button>
// // // // //               </Grid>
// // // // //             </Grid>
// // // // //           </Box>
// // // // //         </Container>
// // // // //       </div>
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // export { exportVariable };
// // // // // export default ItineraryForm;

// // // // import React, { useState, useEffect } from "react";
// // // // import { Button, Box, Typography, Card, CardContent, Slider, FormControl, InputLabel, Select, MenuItem, Container } from "@mui/material";
// // // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // // import { db } from "../../firebase/firebase-config";
// // // // import { collection, doc, getDocs, query, where, setDoc } from "firebase/firestore";

// // // // // Main ItineraryForm Component
// // // // function ItineraryForm() {
// // // //   const [step, setStep] = useState(1);
// // // //   const [itineraryName, setItineraryName] = useState("");
// // // //   const [startLocation, setStartLocation] = useState("");
// // // //   const [endLocation, setEndLocation] = useState("");
// // // //   const [selectedFlights, setSelectedFlights] = useState([]);
// // // //   const [selectedAccommodations, setSelectedAccommodations] = useState([]);
// // // //   const [selectedActivities, setSelectedActivities] = useState([]);
// // // //   const [userId, setUserId] = useState("");

// // // //   // Fetch user ID (UID) on component load
// // // //   useEffect(() => {
// // // //     const auth = getAuth();
// // // //     onAuthStateChanged(auth, (user) => {
// // // //       if (user) {
// // // //         setUserId(user.uid);
// // // //       }
// // // //     });
// // // //   }, []);

// // // //   // Proceed to next step
// // // //   const handleNextStep = () => {
// // // //     setStep(step + 1);
// // // //   };

// // // //   // Go back to previous step
// // // //   const handlePreviousStep = () => {
// // // //     setStep(step - 1);
// // // //   };

// // // //   // Save the itinerary to Firebase
// // // //   const handleSubmit = async () => {
// // // //     const itineraryData = {
// // // //       itineraryName,
// // // //       startLocation,
// // // //       endLocation,
// // // //       flights: selectedFlights,
// // // //       accommodations: selectedAccommodations,
// // // //       activities: selectedActivities,
// // // //       userId,
// // // //     };

// // // //     // Save to Firebase collection
// // // //     await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

// // // //     console.log("Itinerary saved to Firebase", itineraryData);
// // // //   };

// // // //   // Render the form based on current step
// // // //   return (
// // // //     <Container>
// // // //       <Box>
// // // //         {step === 1 && (
// // // //           <Step1
// // // //             itineraryName={itineraryName}
// // // //             setItineraryName={setItineraryName}
// // // //             startLocation={startLocation}
// // // //             setStartLocation={setStartLocation}
// // // //             endLocation={endLocation}
// // // //             setEndLocation={setEndLocation}
// // // //             handleNextStep={handleNextStep}
// // // //           />
// // // //         )}
// // // //         {step === 2 && (
// // // //           <Step2
// // // //             startLocation={startLocation}
// // // //             endLocation={endLocation}
// // // //             selectedFlights={selectedFlights}
// // // //             setSelectedFlights={setSelectedFlights}
// // // //             handleNextStep={handleNextStep}
// // // //             handlePreviousStep={handlePreviousStep}
// // // //           />
// // // //         )}
// // // //         {step === 3 && (
// // // //           <Step3
// // // //             endLocation={endLocation}
// // // //             selectedAccommodations={selectedAccommodations}
// // // //             setSelectedAccommodations={setSelectedAccommodations}
// // // //             handleNextStep={handleNextStep}
// // // //             handlePreviousStep={handlePreviousStep}
// // // //           />
// // // //         )}
// // // //         {step === 4 && (
// // // //           <Step4
// // // //             endLocation={endLocation}
// // // //             selectedActivities={selectedActivities}
// // // //             setSelectedActivities={setSelectedActivities}
// // // //             handleSubmit={handleSubmit}
// // // //             handlePreviousStep={handlePreviousStep}
// // // //           />
// // // //         )}
// // // //       </Box>
// // // //     </Container>
// // // //   );
// // // // }

// // // // // Step 1: Itinerary Name and Location Selection
// // // // function Step1({ itineraryName, setItineraryName, startLocation, setStartLocation, endLocation, setEndLocation, handleNextStep }) {
// // // //   const locations = ["Johannesburg", "Cape Town", "Pretoria", "Durban", "Gqeberha"];

// // // //   return (
// // // //     <Box>
// // // //       <h2>Itinerary Details</h2>
// // // //       <FormControl fullWidth>
// // // //         <InputLabel>Itinerary Name</InputLabel>
// // // //         <input type="text" value={itineraryName} onChange={(e) => setItineraryName(e.target.value)} />
// // // //       </FormControl>

// // // //       <FormControl fullWidth>
// // // //         <InputLabel>Start Location</InputLabel>
// // // //         <Select value={startLocation} onChange={(e) => setStartLocation(e.target.value)}>
// // // //           {locations.map((location) => (
// // // //             <MenuItem key={location} value={location}>
// // // //               {location}
// // // //             </MenuItem>
// // // //           ))}
// // // //         </Select>
// // // //       </FormControl>

// // // //       <FormControl fullWidth>
// // // //         <InputLabel>End Location</InputLabel>
// // // //         <Select value={endLocation} onChange={(e) => setEndLocation(e.target.value)}>
// // // //           {locations.filter((loc) => loc !== startLocation).map((location) => (
// // // //             <MenuItem key={location} value={location}>
// // // //               {location}
// // // //             </MenuItem>
// // // //           ))}
// // // //         </Select>
// // // //       </FormControl>

// // // //       <Button onClick={handleNextStep}>Next</Button>
// // // //     </Box>
// // // //   );
// // // // }

// // // // // Step 2: Flights Selection
// // // // function Step2({ startLocation, endLocation, selectedFlights, setSelectedFlights, handleNextStep, handlePreviousStep }) {
// // // //   const [flights, setFlights] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchFlights = async () => {
// // // //       const flightsRef = collection(db, "Flights");
// // // //       const q = query(flightsRef, where("startLocation", "==", startLocation), where("endLocation", "==", endLocation));
// // // //       const querySnapshot = await getDocs(q);
// // // //       let flightOptions = [];
// // // //       querySnapshot.forEach((doc) => flightOptions.push({ id: doc.id, ...doc.data() }));
// // // //       setFlights(flightOptions);
// // // //     };
// // // //     fetchFlights();
// // // //   }, [startLocation, endLocation]);

// // // //   const handleFlightSelection = (flightId) => {
// // // //     setSelectedFlights((prev) => (prev.includes(flightId) ? prev.filter((id) => id !== flightId) : [...prev, flightId]));
// // // //   };

// // // //   return (
// // // //     <Box>
// // // //       <h2>Select Flights</h2>
// // // //       {flights.map((flight) => (
// // // //         <Card key={flight.id} onClick={() => handleFlightSelection(flight.id)}>
// // // //           <CardContent>
// // // //             <Typography>{flight.name}</Typography>
// // // //           </CardContent>
// // // //         </Card>
// // // //       ))}
// // // //       <Button onClick={handlePreviousStep}>Back</Button>
// // // //       <Button onClick={handleNextStep}>Next</Button>
// // // //     </Box>
// // // //   );
// // // // }

// // // // // Step 3: Accommodations Selection
// // // // function Step3({ endLocation, selectedAccommodations, setSelectedAccommodations, handleNextStep, handlePreviousStep }) {
// // // //   const [accommodations, setAccommodations] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchAccommodations = async () => {
// // // //       const accommodationsRef = collection(db, "Accommodations");
// // // //       const q = query(accommodationsRef, where("city", "==", endLocation));
// // // //       const querySnapshot = await getDocs(q);
// // // //       let accommodationOptions = [];
// // // //       querySnapshot.forEach((doc) => accommodationOptions.push({ id: doc.id, ...doc.data() }));
// // // //       setAccommodations(accommodationOptions);
// // // //     };
// // // //     fetchAccommodations();
// // // //   }, [endLocation]);

// // // //   const handleAccommodationSelection = (accommodationId) => {
// // // //     setSelectedAccommodations((prev) =>
// // // //       prev.includes(accommodationId) ? prev.filter((id) => id !== accommodationId) : [...prev, accommodationId]
// // // //     );
// // // //   };

// // // //   return (
// // // //     <Box>
// // // //       <h2>Select Accommodations</h2>
// // // //       {accommodations.map((accommodation) => (
// // // //         <Card key={accommodation.id} onClick={() => handleAccommodationSelection(accommodation.id)}>
// // // //           <CardContent>
// // // //             <Typography>{accommodation.name}</Typography>
// // // //           </CardContent>
// // // //         </Card>
// // // //       ))}
// // // //       <Button onClick={handlePreviousStep}>Back</Button>
// // // //       <Button onClick={handleNextStep}>Next</Button>
// // // //     </Box>
// // // //   );
// // // // }

// // // // // Step 4: Activities Selection
// // // // function Step4({ endLocation, selectedActivities, setSelectedActivities, handleSubmit, handlePreviousStep }) {
// // // //   const [activities, setActivities] = useState([]);

// // // //   useEffect(() => {
// // // //     const fetchActivities = async () => {
// // // //       const activitiesRef = collection(db, "Activities");
// // // //       const q = query(activitiesRef, where("city", "==", endLocation));
// // // //       const querySnapshot = await getDocs(q);
// // // //       let activityOptions = [];
// // // //       querySnapshot.forEach((doc) => activityOptions.push({ id: doc.id, ...doc.data() }));
// // // //       setActivities(activityOptions);
// // // //     };
// // // //     fetchActivities();
// // // //   }, [endLocation]);

// // // //   const handleActivitySelection = (activityId) => {
// // // //     setSelectedActivities((prev) =>
// // // //       prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
// // // //     );
// // // //   };

// // // //   return (
// // // //     <Box>
// // // //       <h2>Select Activities</h2>
// // // //       {activities.map((activity) => (
// // // //         <Card key={activity.id} onClick={() => handleActivitySelection(activity.id)}>
// // // //           <CardContent>
// // // //             <Typography>{activity.name}</Typography>
// // // //           </CardContent>
// // // //         </Card>
// // // //       ))}
// // // //       <Button onClick={handlePreviousStep}>Back</Button>
// // // //       <Button onClick={handleSubmit}>Submit Itinerary</Button>
// // // //     </Box>
// // // //   );
// // // // }

// // // // export default ItineraryForm;

// // // import React, { useState, useEffect } from "react";
// // // import { Button, Box, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Container } from "@mui/material";
// // // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // // import { db } from "../../firebase/firebase-config";
// // // import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

// // // // Main ItineraryForm Component
// // // function ItineraryForm() {
// // //   const [step, setStep] = useState(1);
// // //   const [itineraryName, setItineraryName] = useState("");
// // //   const [startLocation, setStartLocation] = useState("");
// // //   const [endLocation, setEndLocation] = useState("");
// // //   const [selectedFlights, setSelectedFlights] = useState([]);
// // //   const [selectedAccommodations, setSelectedAccommodations] = useState([]);
// // //   const [selectedActivities, setSelectedActivities] = useState([]);
// // //   const [flights, setFlights] = useState([]);
// // //   const [userId, setUserId] = useState("");

// // //   // Fetch user ID (UID) on component load
// // //   useEffect(() => {
// // //     const auth = getAuth();
// // //     onAuthStateChanged(auth, (user) => {
// // //       if (user) {
// // //         setUserId(user.uid);
// // //       }
// // //     });
// // //   }, []);

// // //   // Fetch flights after user selects the start and end locations
// // //   useEffect(() => {
// // //     const fetchFlights = async () => {
// // //       if (startLocation && endLocation) {
// // //         try {
// // //           const flightsRef = collection(db, "Flights");  // Checking flights collection
// // //           const q = query(flightsRef, where("startLocation", "==", startLocation), where("endLocation", "==", endLocation));
// // //           const querySnapshot = await getDocs(q);
// // //           let flightOptions = [];
// // //           querySnapshot.forEach((doc) => flightOptions.push({ id: doc.id, ...doc.data() }));
// // //           setFlights(flightOptions);
// // //         } catch (error) {
// // //           console.log("No flights collection exists, or no flights match the criteria");
// // //           setFlights([]);  // Allow user to continue if no flights are found
// // //         }
// // //       }
// // //     };
// // //     fetchFlights();
// // //   }, [startLocation, endLocation]);



// // //   // Proceed to the next step
// // //   const handleNextStep = () => {
// // //     setStep(step + 1);
// // //   };

// // //   // Go back to the previous step
// // //   const handlePreviousStep = () => {
// // //     setStep(step - 1);
// // //   };

// // //   // Save the itinerary to Firebase
// // //   const handleSubmit = async () => {
// // //     const itineraryData = {
// // //       itineraryName,
// // //       startLocation,
// // //       endLocation,
// // //       flights: selectedFlights,
// // //       accommodations: selectedAccommodations,
// // //       activities: selectedActivities,
// // //       userId,
// // //     };

// // //     // Save to Firebase collection
// // //     await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

// // //     console.log("Itinerary saved to Firebase", itineraryData);
// // //   };

// // //   const handleFlightSelection = (flightId) => {
// // //     setSelectedFlights((prev) => (prev.includes(flightId) ? prev.filter((id) => id !== flightId) : [...prev, flightId]));
// // //   };

// // //   return (
// // //     <Container>
// // //       <Box>
// // //         {step === 1 && (
// // //           <Step1
// // //             itineraryName={itineraryName}
// // //             setItineraryName={setItineraryName}
// // //             startLocation={startLocation}
// // //             setStartLocation={setStartLocation}
// // //             endLocation={endLocation}
// // //             setEndLocation={setEndLocation}
// // //             flights={flights}
// // //             selectedFlights={selectedFlights}
// // //             handleFlightSelection={handleFlightSelection}
// // //             handleNextStep={handleNextStep}
// // //           />
// // //         )}
// // //         {step === 2 && (
// // //           <Step2
// // //             selectedAccommodations={selectedAccommodations}
// // //             setSelectedAccommodations={setSelectedAccommodations}
// // //             handleNextStep={handleNextStep}
// // //             handlePreviousStep={handlePreviousStep}
// // //           />
// // //         )}
// // //         {step === 3 && (
// // //           <Step3
// // //             selectedActivities={selectedActivities}
// // //             setSelectedActivities={setSelectedActivities}
// // //             handleSubmit={handleSubmit}
// // //             handlePreviousStep={handlePreviousStep}
// // //           />
// // //         )}
// // //       </Box>
// // //     </Container>
// // //   );
// // // }

// // // // Step 1: Itinerary Name and Location + Flights Selection
// // // function Step1({
// // //   itineraryName,
// // //   setItineraryName,
// // //   startLocation,
// // //   setStartLocation,
// // //   endLocation,
// // //   setEndLocation,
// // //   flights,
// // //   selectedFlights,
// // //   handleFlightSelection,
// // //   handleNextStep,
// // // }) {
// // //   const locations = ["Johannesburg", "Cape Town", "Pretoria", "Durban", "Gqeberha"];

// // //   return (
// // //     <Box>
// // //       <h2>Itinerary Details</h2>
// // //       <FormControl fullWidth>
// // //         <InputLabel>Itinerary Name</InputLabel>
// // //         <input type="text" value={itineraryName} onChange={(e) => setItineraryName(e.target.value)} />
// // //       </FormControl>

// // //       <FormControl fullWidth>
// // //         <InputLabel>Start Location</InputLabel>
// // //         <Select value={startLocation} onChange={(e) => setStartLocation(e.target.value)}>
// // //           {locations.map((location) => (
// // //             <MenuItem key={location} value={location}>
// // //               {location}
// // //             </MenuItem>
// // //           ))}
// // //         </Select>
// // //       </FormControl>

// // //       <FormControl fullWidth>
// // //         <InputLabel>End Location</InputLabel>
// // //         <Select value={endLocation} onChange={(e) => setEndLocation(e.target.value)}>
// // //           {locations.filter((loc) => loc !== startLocation).map((location) => (
// // //             <MenuItem key={location} value={location}>
// // //               {location}
// // //             </MenuItem>
// // //           ))}
// // //         </Select>
// // //       </FormControl>

// // //       <Box>
// // //         <h3>Available Flights</h3>
// // //         {flights.length > 0 ? (
// // //           flights.map((flight) => (
// // //             <Card key={flight.id} onClick={() => handleFlightSelection(flight.id)}>
// // //               <CardContent>
// // //                 <Typography>{flight.name}</Typography>
// // //               </CardContent>
// // //             </Card>
// // //           ))
// // //         ) : (
// // //           <Typography>No flights found for this route.</Typography>
// // //         )}
// // //       </Box>

// // //       <Button onClick={handleNextStep}>Next</Button>
// // //     </Box>
// // //   );
// // // }

// // // // Step 2: Accommodations Selection
// // // function Step2({ selectedAccommodations, setSelectedAccommodations, handleNextStep, handlePreviousStep }) {
// // //   const [accommodations, setAccommodations] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch accommodations based on the destination
// // //     const fetchAccommodations = async () => {
// // //       const accommodationsRef = collection(db, "Accommodations");
// // //       const querySnapshot = await getDocs(accommodationsRef);
// // //       let accommodationOptions = [];
// // //       querySnapshot.forEach((doc) => accommodationOptions.push({ id: doc.id, ...doc.data() }));
// // //       setAccommodations(accommodationOptions);
// // //     };
// // //     fetchAccommodations();
// // //   }, []);

// // //   const handleAccommodationSelection = (accommodationId) => {
// // //     setSelectedAccommodations((prev) =>
// // //       prev.includes(accommodationId) ? prev.filter((id) => id !== accommodationId) : [...prev, accommodationId]
// // //     );
// // //   };

// // //   return (
// // //     <Box>
// // //       <h2>Select Accommodations</h2>
// // //       {accommodations.map((accommodation) => (
// // //         <Card key={accommodation.id} onClick={() => handleAccommodationSelection(accommodation.id)}>
// // //           <CardContent>
// // //             <Typography>{accommodation.name}</Typography>
// // //           </CardContent>
// // //         </Card>
// // //       ))}
// // //       <Button onClick={handlePreviousStep}>Back</Button>
// // //       <Button onClick={handleNextStep}>Next</Button>
// // //     </Box>
// // //   );
// // // }

// // // // Step 3: Activities Selection
// // // function Step3({ selectedActivities, setSelectedActivities, handleSubmit, handlePreviousStep }) {
// // //   const [activities, setActivities] = useState([]);

// // //   useEffect(() => {
// // //     // Fetch activities based on destination
// // //     const fetchActivities = async () => {
// // //       const activitiesRef = collection(db, "Activities");
// // //       const querySnapshot = await getDocs(activitiesRef);
// // //       let activityOptions = [];
// // //       querySnapshot.forEach((doc) => activityOptions.push({ id: doc.id, ...doc.data() }));
// // //       setActivities(activityOptions);
// // //     };
// // //     fetchActivities();
// // //   }, []);

// // //   const handleActivitySelection = (activityId) => {
// // //     setSelectedActivities((prev) =>
// // //       prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
// // //     );
// // //   };

// // //   return (
// // //     <Box>
// // //       <h2>Select Activities</h2>
// // //       {activities.map((activity) => (
// // //         <Card key={activity.id} onClick={() => handleActivitySelection(activity.id)}>
// // //           <CardContent>
// // //             <Typography>{activity.name}</Typography>
// // //           </CardContent>
// // //         </Card>
// // //       ))}
// // //       <Button onClick={handlePreviousStep}>Back</Button>
// // //       <Button onClick={handleSubmit}>Submit Itinerary</Button>
// // //     </Box>
// // //   );
// // // }

// // // export default ItineraryForm;


// // import React, { useState, useEffect } from "react";
// // import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert } from "@mui/material";
// // import { getAuth, onAuthStateChanged } from "firebase/auth";
// // import Sidebar from "./sidebar";
// // import { db } from "../../firebase/firebase-config";
// // import { collection, doc, setDoc } from "firebase/firestore";
// // import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

// // // The Amadeus API details and helper functions
// // const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
// // const client_secret = "RGeFEPqnTMNFKNjd";

// // const convertPriceToZar = (price, fromCurrency) => {
// //   const exchangeRate = 19.21; // EUR to ZAR exchange rate example
// //   return fromCurrency === "EUR" ? price * exchangeRate : null;
// // };

// // const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
// //   const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

// //   try {
// //     const tokenResponse = await fetch(tokenUrl, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //       body: new URLSearchParams({
// //         client_id: client_id,
// //         client_secret: client_secret,
// //         grant_type: "client_credentials",
// //       }),
// //     });

// //     const tokenData = await tokenResponse.json();
// //     const accessToken = tokenData.access_token;

// //     const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
// //     const params = {
// //       originLocationCode: origin,
// //       destinationLocationCode: destination,
// //       departureDate: departureDate,
// //       adults: adults.toString(),
// //       max: maxOffers.toString(),
// //     };
// //     Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

// //     const searchResponse = await fetch(searchUrl.toString(), {
// //       method: "GET",
// //       headers: { Authorization: `Bearer ${accessToken}` },
// //     });

// //     const flightData = await searchResponse.json();
// //     for (const flight of flightData.data) {
// //       const originalPrice = parseFloat(flight.price.total);
// //       const priceInZar = convertPriceToZar(originalPrice, flight.price.currency);
// //       flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
// //     }

// //     return flightData.data;
// //   } catch (error) {
// //     console.error("Error fetching flight offers:", error);
// //     return null;
// //   }
// // };

// // function ItineraryForm() {
// //   const [step, setStep] = useState(1);
// //   const [itineraryName, setItineraryName] = useState("");
// //   const [startLocation, setStartLocation] = useState("");
// //   const [endLocation, setEndLocation] = useState("");
// //   const [departureDate, setDepartureDate] = useState("");
// //   const [flights, setFlights] = useState([]);
// //   const [selectedFlights, setSelectedFlights] = useState([]);
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [userId, setUserId] = useState("");

// //   // Fetch user ID (UID)
// //   useEffect(() => {
// //     const auth = getAuth();
// //     onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         setUserId(user.uid);
// //       }
// //     });
// //   }, []);

// //   // Predefined South African airport codes
// //   const airportOptions = [
// //     { label: "Durban (DUR)", code: "DUR" },
// //     { label: "Cape Town (CPT)", code: "CPT" },
// //     { label: "Johannesburg (JNB)", code: "JNB" },
// //     { label: "Port Elizabeth (PLZ)", code: "PLZ" },
// //     { label: "East London (ELS)", code: "ELS" },
// //     { label: "Lanseria (HLA)", code: "HLA" },
// //   ];

// //   // Handle flight search
// //   const handleSearchFlights = async () => {
// //     if (startLocation && endLocation && departureDate) {
// //       if (startLocation === endLocation) {
// //         setErrorMessage("Origin and destination cannot be the same.");
// //         return;
// //       }
// //       setErrorMessage(""); // Clear previous errors

// //       const flightOffers = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
// //       if (flightOffers) {
// //         setFlights(flightOffers);
// //       } else {
// //         console.log("No flight offers available.");
// //       }
// //     }
// //   };

// //   // Handle flight selection
// //   const handleFlightSelection = (flightId) => {
// //     setSelectedFlights((prev) => (prev.includes(flightId) ? prev.filter((id) => id !== flightId) : [...prev, flightId]));
// //   };

// //   // Save the itinerary to Firebase
// //   const handleSubmit = async () => {
// //     const itineraryData = {
// //       itineraryName,
// //       startLocation,
// //       endLocation,
// //       flights: selectedFlights,
// //       userId,
// //     };

// //     await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

// //     console.log("Itinerary saved to Firebase", itineraryData);
// //   };

// //   return (
// //     <Box>
// //     <Box marginLeft="300px" alignContent="center" alignItems="center">


// //       <h2>Itinerary Details</h2>
// //       <TextField
// //         label="Itinerary Name"
// //         value={itineraryName}
// //         onChange={(e) => setItineraryName(e.target.value)}
// //         fullWidth
// //         margin="normal"
// //       />
// //       <TextField
// //         select
// //         label="Start Location"
// //         value={startLocation}
// //         onChange={(e) => setStartLocation(e.target.value)}
// //         fullWidth
// //         margin="normal"
// //       >
// //         {airportOptions.map((option) => (
// //           <MenuItem key={option.code} value={option.code}>
// //             {option.label}
// //           </MenuItem>
// //         ))}
// //       </TextField>

// //       <TextField
// //         select
// //         label="End Location"
// //         value={endLocation}
// //         onChange={(e) => setEndLocation(e.target.value)}
// //         fullWidth
// //         margin="normal"
// //       >
// //         {airportOptions.filter((loc) => loc.code !== startLocation).map((option) => (
// //           <MenuItem key={option.code} value={option.code}>
// //             {option.label}
// //           </MenuItem>
// //         ))}
// //       </TextField>

// //       <TextField
// //         label="Departure Date"
// //         type="date"
// //         value={departureDate}
// //         onChange={(e) => setDepartureDate(e.target.value)}
// //         fullWidth
// //         margin="normal"
// //         InputLabelProps={{ shrink: true }}
// //       />

// //       <Button variant="contained" color="primary" onClick={handleSearchFlights} disabled={!startLocation || !endLocation || !departureDate}>
// //         Search Flights
// //       </Button>

// //       {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

// //       <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
// //         {flights.map((flight, index) => {
// //           const firstSegment = flight.itineraries[0].segments[0];
// //           const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

// //           return (
// //             <Grid item xs={12} sm={6} md={4} key={index}>
// //               <Card onClick={() => handleFlightSelection(flight.id)} sx={{ cursor: "pointer", backgroundColor: selectedFlights.includes(flight.id) ? "#d1e7dd" : "white" }}>
// //                 <CardContent>
// //                   <Typography>
// //                     <FaPlaneDeparture /> {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
// //                   </Typography>
// //                   <Typography>
// //                     <FaPlaneArrival /> Departure: {firstSegment.departure.at.split("T")[1]} | Arrival: {lastSegment.arrival.at.split("T")[1]}
// //                   </Typography>
// //                   <Typography>
// //                     <FaDollarSign /> {flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)
// //                   </Typography>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           );
// //         })}
// //       </Grid>

// //       <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: "2rem" }}>
// //         Save Itinerary
// //       </Button>
// //     </Box>
// //     </Box>
// //   );
// // }

// // export default ItineraryForm;

// import React, { useState, useEffect } from "react";
// import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert } from "@mui/material";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../../firebase/firebase-config";
// import {
//   getFirestore,
//   collection,
//   query as firestoreQuery,
//   where,
//   setDoc, 
//   doc,
//   getDocs,
//   addDoc,
// } from "firebase/firestore";
// import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

// // Amadeus API details and helper functions
// const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
// const client_secret = "RGeFEPqnTMNFKNjd";

// const convertPriceToZar = (price, fromCurrency) => {
//   const exchangeRate = 19.21; // EUR to ZAR exchange rate example
//   return fromCurrency === "EUR" ? price * exchangeRate : null;
// };

// const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
//   const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

//   try {
//     const tokenResponse = await fetch(tokenUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: client_id,
//         client_secret: client_secret,
//         grant_type: "client_credentials",
//       }),
//     });

//     const tokenData = await tokenResponse.json();
//     const accessToken = tokenData.access_token;

//     const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
//     const params = {
//       originLocationCode: origin,
//       destinationLocationCode: destination,
//       departureDate: departureDate,
//       adults: adults.toString(),
//       max: maxOffers.toString(),
//     };
//     Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

//     const searchResponse = await fetch(searchUrl.toString(), {
//       method: "GET",
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const flightData = await searchResponse.json();
//     for (const flight of flightData.data) {
//       const originalPrice = parseFloat(flight.price.total);
//       const priceInZar = convertPriceToZar(originalPrice, flight.price.currency);
//       flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
//     }

//     return flightData.data;
//   } catch (error) {
//     console.error("Error fetching flight offers:", error);
//     return null;
//   }
// };

// function ItineraryForm() {
//   const [step, setStep] = useState(1);
//   const [itineraryName, setItineraryName] = useState("");
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [flights, setFlights] = useState([]);
//   const [selectedFlights, setSelectedFlights] = useState([]);
//   const [accommodations, setAccommodations] = useState([]);
//   const [selectedAccommodations, setSelectedAccommodations] = useState([]);
//   const [activities, setActivities] = useState([]);
//   const [selectedActivities, setSelectedActivities] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [userId, setUserId] = useState("");



//   // Fetch user ID (UID)
//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid);
//       }
//     });
//   }, []);

//   //Accommodations:
//   const [liked, setLiked] = useState(Array(accommodations.length).fill(false));
//   const [likedflight, setLikedflight] = useState(
//     Array(flights.length).fill(false),
//   );

//   const handleLikeClick = (index) => {
//     setLiked((prevLiked) => {
//       const newLiked = [...prevLiked];
//       newLiked[index] = !newLiked[index];
//       return newLiked;
//     });
//   };
//   const handleLikeFlightClick = (index) => {
//     setLikedflight((prevLiked) => {
//       const newLiked = [...prevLiked];
//       newLiked[index] = !newLiked[index];
//       return newLiked;
//     });
//   };
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (searchQuery) => {
//     setLoading(true);
//     try {
//       const db = getFirestore();
//       const accommodationsRef = collection(db, "Accommodation");
//       const q = firestoreQuery(
//         accommodationsRef,
//         where("city", "==", searchQuery),
//       );
//       const querySnapshot = await getDocs(q);

//       const results = [];
//       querySnapshot.forEach((doc) => {
//         if (results.length < 12) results.push(doc.data());
//       });

//       if (results.length > 0) {
//         setAccommodations(results);
//         setError("");
//       } else {
//         setError(`No accommodations found for "${searchQuery}"`);
//         setAccommodations([]);
//       }
//     } catch (error) {
//       console.error("Error fetching search results from Firestore:", error);
//       setError("Failed to fetch accommodation data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   function getRandomNumber(min = 2, max = 3006) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   function getImageUrl() {
//     const randomNum = getRandomNumber();
//     return `https://www.sa-venues.com/things-to-do/gauteng/gallery/${randomNum}/1.jpg`;
//   }

//   // Predefined South African airport codes
//   const airportOptions = [
//     { label: "Durban (DUR)", code: "DUR" },
//     { label: "Cape Town (CPT)", code: "CPT" },
//     { label: "Johannesburg (JNB)", code: "JNB" },
//     { label: "Port Elizabeth (PLZ)", code: "PLZ" },
//     { label: "East London (ELS)", code: "ELS" },
//     { label: "Lanseria (HLA)", code: "HLA" },
//   ];

//   // Handle flight search
//   const handleSearchFlights = async () => {
//     if (startLocation && endLocation && departureDate) {
//       if (startLocation === endLocation) {
//         setErrorMessage("Origin and destination cannot be the same.");
//         return;
//       }
//       setErrorMessage(""); // Clear previous errors

//       const flightOffers = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
//       if (flightOffers) {
//         setFlights(flightOffers);
//       } else {
//         console.log("No flight offers available.");
//       }
//     }
//   };

//   // Handle flight selection
//   const handleFlightSelection = (flightId) => {
//     setSelectedFlights((prev) => (prev.includes(flightId) ? prev.filter((id) => id !== flightId) : [...prev, flightId]));
//   };

//   // Handle accommodation selection
//   const handleAccommodationSelection = (accommodationId) => {
//     setSelectedAccommodations((prev) =>
//       prev.includes(accommodationId) ? prev.filter((id) => id !== accommodationId) : [...prev, accommodationId]
//     );
//   };

//   // Handle activity selection
//   const handleActivitySelection = (activityId) => {
//     setSelectedActivities((prev) =>
//       prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
//     );
//   };

//   // Fetch accommodations and activities (dummy data for now)
//   useEffect(() => {
//     const fetchAccommodations = async () => {
//       const accommodationData = [
//         { id: "acc1", name: "Hotel A" },
//         { id: "acc2", name: "Hotel B" },
//         { id: "acc3", name: "Hotel C" },
//       ];
//       setAccommodations(accommodationData);
//     };

//     const fetchActivities = async () => {
//       const activityData = [
//         { id: "act1", name: "Museum Visit" },
//         { id: "act2", name: "City Tour" },
//         { id: "act3", name: "Beach Day" },
//       ];
//       setActivities(activityData);
//     };

//     fetchAccommodations();
//     fetchActivities();
//   }, []);

//   // Save the itinerary to Firebase
//   const handleSubmit = async () => {
//     const itineraryData = {
//       itineraryName,
//       startLocation,
//       endLocation,
//       flights: selectedFlights,
//       accommodations: selectedAccommodations,
//       activities: selectedActivities,
//       userId,
//     };

//     await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

//     console.log("Itinerary saved to Firebase", itineraryData);
//   };

//   // Handle moving between steps
//   const handleNextStep = () => setStep((prev) => prev + 1);
//   const handlePreviousStep = () => setStep((prev) => prev - 1);

//   return (
//     <Box marginLeft="300px" alignContent="center" alignItems="center">
//     <Box>
//       {step === 1 && (
//         <>
//           <h2>Step 1: Itinerary Details and Flights</h2>
//           <TextField
//             label="Itinerary Name"
//             value={itineraryName}
//             onChange={(e) => setItineraryName(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             select
//             label="Start Location"
//             value={startLocation}
//             onChange={(e) => setStartLocation(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             {airportOptions.map((option) => (
//               <MenuItem key={option.code} value={option.code}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             select
//             label="End Location"
//             value={endLocation}
//             onChange={(e) => setEndLocation(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             {airportOptions.filter((loc) => loc.code !== startLocation).map((option) => (
//               <MenuItem key={option.code} value={option.code}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Departure Date"
//             type="date"
//             value={departureDate}
//             onChange={(e) => setDepartureDate(e.target.value)}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />

//           <Button variant="contained" color="primary" onClick={handleSearchFlights} disabled={!startLocation || !endLocation || !departureDate}>
//             Search Flights
//           </Button>

//           {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

//           <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
//             {flights.map((flight, index) => {
//               const firstSegment = flight.itineraries[0].segments[0];
//               const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

//               return (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Card
//                     onClick={() => handleFlightSelection(flight.id)}
//                     sx={{ cursor: "pointer", backgroundColor: selectedFlights.includes(flight.id) ? "#d1e7dd" : "white" }}
//                   >
//                     <CardContent>
//                       <Typography>
//                         <FaPlaneDeparture /> {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
//                       </Typography>
//                       <Typography>
//                         <FaPlaneArrival /> Departure: {firstSegment.departure.at.split("T")[1]} | Arrival: {lastSegment.arrival.at.split("T")[1]}
//                       </Typography>
//                       <Typography>
//                         <FaDollarSign /> {flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>

//           <Button onClick={handleNextStep} variant="contained" sx={{ marginTop: "2rem" }}>
//             Next
//           </Button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <h2>Step 2: Select Accommodations</h2>
//           <Grid container spacing={2}>
//             {accommodations.map((accommodation) => (
//               <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
//                 <Card
//                   onClick={() => handleAccommodationSelection(accommodation.id)}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor: selectedAccommodations.includes(accommodation.id) ? "#d1e7dd" : "white",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography>{accommodation.name}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Button onClick={handlePreviousStep}>Back</Button>
//           <Button onClick={handleNextStep} variant="contained">
//             Next
//           </Button>
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <h2>Step 3: Select Activities</h2>
//           <Grid container spacing={2}>
//             {activities.map((activity) => (
//               <Grid item xs={12} sm={6} md={4} key={activity.id}>
//                 <Card
//                   onClick={() => handleActivitySelection(activity.id)}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor: selectedActivities.includes(activity.id) ? "#d1e7dd" : "white",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography>{activity.name}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Button onClick={handlePreviousStep}>Back</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Submit Itinerary
//           </Button>
//         </>
//       )}
//     </Box>
//     </Box>
//   );
// }

// export default ItineraryForm;

import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Card, CardContent, TextField, MenuItem, Grid, Alert } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase/firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";
import { FaPlaneDeparture, FaPlaneArrival, FaDollarSign } from "react-icons/fa";

// Amadeus API details and helper functions
const client_id = "rwfsFIbmTtMXDAAjzXKCBcR6lZZirbin";
const client_secret = "RGeFEPqnTMNFKNjd";

const convertPriceToZar = (price, fromCurrency) => {
  const exchangeRate = 19.21; // EUR to ZAR exchange rate example
  return fromCurrency === "EUR" ? price * exchangeRate : null;
};

const getFlightOffers = async (origin, destination, departureDate, adults, maxOffers) => {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "client_credentials",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const searchUrl = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departureDate,
      adults: adults.toString(),
      max: maxOffers.toString(),
    };
    Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

    const searchResponse = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const flightData = await searchResponse.json();
    for (const flight of flightData.data) {
      const originalPrice = parseFloat(flight.price.total);
      const priceInZar = convertPriceToZar(originalPrice, flight.price.currency);
      flight.priceInZar = priceInZar ? priceInZar.toFixed(2) : "N/A";
    }

    return flightData.data;
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return null;
  }
};

function ItineraryForm() {
  const [step, setStep] = useState(1);
  const [itineraryName, setItineraryName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);  // Store multiple flight objects
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState("");

  // Fetch user ID (UID)
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  // Predefined South African airport codes
  const airportOptions = [
    { label: "Durban (DUR)", code: "DUR" },
    { label: "Cape Town (CPT)", code: "CPT" },
    { label: "Johannesburg (JNB)", code: "JNB" },
    { label: "Port Elizabeth (PLZ)", code: "PLZ" },
    { label: "East London (ELS)", code: "ELS" },
    { label: "Lanseria (HLA)", code: "HLA" },
  ];

  // Handle flight search
  const handleSearchFlights = async () => {
    if (startLocation && endLocation && departureDate) {
      if (startLocation === endLocation) {
        setErrorMessage("Origin and destination cannot be the same.");
        return;
      }
      setErrorMessage(""); // Clear previous errors

      const flightOffers = await getFlightOffers(startLocation, endLocation, departureDate, 1, 9);
      if (flightOffers) {
        setFlights(flightOffers);
      } else {
        console.log("No flight offers available.");
      }
    }
  };

  // Add flight to itinerary
  const addFlightToItinerary = (flight) => {
    const firstSegment = flight.itineraries[0].segments[0];
    const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

    const flightObject = {
      startLocation: firstSegment.departure.iataCode,
      endLocation: lastSegment.arrival.iataCode,
      departureTime: firstSegment.departure.at.split("T")[1],
      arrivalTime: lastSegment.arrival.at.split("T")[1],
      price: flight.price.total,
      currency: flight.price.currency,
      priceInZar: flight.priceInZar,
    };

    setSelectedFlights((prev) => [...prev, flightObject]);
  };

  // Save the itinerary to Firebase
  const handleSubmit = async () => {
    const itineraryData = {
      itineraryName,
      startLocation,
      endLocation,
      flights: selectedFlights,
      userId,
    };

    await setDoc(doc(collection(db, "ItineraryCollection")), itineraryData);

    console.log("Itinerary saved to Firebase", itineraryData);
  };

  // Handle moving between steps
  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

//   return (
//     <Box>
//       {step === 1 && (
//         <>
//           <h2>Step 1: Itinerary Details and Flights</h2>
//           <TextField
//             label="Itinerary Name"
//             value={itineraryName}
//             onChange={(e) => setItineraryName(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             select
//             label="Start Location"
//             value={startLocation}
//             onChange={(e) => setStartLocation(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             {airportOptions.map((option) => (
//               <MenuItem key={option.code} value={option.code}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             select
//             label="End Location"
//             value={endLocation}
//             onChange={(e) => setEndLocation(e.target.value)}
//             fullWidth
//             margin="normal"
//           >
//             {airportOptions.filter((loc) => loc.code !== startLocation).map((option) => (
//               <MenuItem key={option.code} value={option.code}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             label="Departure Date"
//             type="date"
//             value={departureDate}
//             onChange={(e) => setDepartureDate(e.target.value)}
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />

//           <Button variant="contained" color="primary" onClick={handleSearchFlights} disabled={!startLocation || !endLocation || !departureDate}>
//             Search Flights
//           </Button>

//           {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

//           <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
//             {flights.map((flight, index) => {
//               const firstSegment = flight.itineraries[0].segments[0];
//               const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

//               return (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Card
//                     sx={{ cursor: "pointer", backgroundColor: "white" }}
//                   >
//                     <CardContent>
//                       <Typography>
//                         <FaPlaneDeparture /> {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
//                       </Typography>
//                       <Typography>
//                         <FaPlaneArrival /> Departure: {firstSegment.departure.at.split("T")[1]} | Arrival: {lastSegment.arrival.at.split("T")[1]}
//                       </Typography>
//                       <Typography>
//                         <FaDollarSign /> {flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)
//                       </Typography>
//                     </CardContent>
//                     <Button
//                       onClick={() => addFlightToItinerary(flight)}
//                       variant="contained"
//                       color="secondary"
//                       sx={{ margin: "8px" }}
//                     >
//                       Add to Itinerary
//                     </Button>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
      
//         {step === 2 && (
//         <>
//           <h2>Step 2: Select Accommodations</h2>
//           <Grid container spacing={2}>
//             {accommodations.map((accommodation) => (
//               <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
//                 <Card
//                   onClick={() => handleAccommodationSelection(accommodation.id)}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor: selectedAccommodations.includes(accommodation.id) ? "#d1e7dd" : "white",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography>{accommodation.name}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Button onClick={handlePreviousStep}>Back</Button>
//           <Button onClick={handleNextStep} variant="contained">
//             Next
//           </Button>
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <h2>Step 3: Select Activities</h2>
//           <Grid container spacing={2}>
//             {activities.map((activity) => (
//               <Grid item xs={12} sm={6} md={4} key={activity.id}>
//                 <Card
//                   onClick={() => handleActivitySelection(activity.id)}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor: selectedActivities.includes(activity.id) ? "#d1e7dd" : "white",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography>{activity.name}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//           <Button onClick={handlePreviousStep}>Back</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Submit Itinerary
//           </Button>
//         </>
//       )}
    
//     </Box>
    
//   );
// }

// export default ItineraryForm;

return (
  <Box marginLeft="300px" alignContent="center" alignItems="center">
  <Box>
    {step === 1 && (
      <>
        <h2>Step 1: Itinerary Details and Flights</h2>
        <TextField
          label="Itinerary Name"
          value={itineraryName}
          onChange={(e) => setItineraryName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          fullWidth
          margin="normal"
        >
          {airportOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          fullWidth
          margin="normal"
        >
          {airportOptions.filter((loc) => loc.code !== startLocation).map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Departure Date"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" color="primary" onClick={handleSearchFlights} disabled={!startLocation || !endLocation || !departureDate}>
          Search Flights
        </Button>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          {flights.map((flight, index) => {
            const firstSegment = flight.itineraries[0].segments[0];
            const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{ cursor: "pointer", backgroundColor: "white" }}
                >
                  <CardContent>
                    <Typography>
                      <FaPlaneDeparture /> {firstSegment.departure.iataCode} to {lastSegment.arrival.iataCode}
                    </Typography>
                    <Typography>
                      <FaPlaneArrival /> Departure: {firstSegment.departure.at.split("T")[1]} | Arrival: {lastSegment.arrival.at.split("T")[1]}
                    </Typography>
                    <Typography>
                      <FaDollarSign /> {flight.price.total} {flight.price.currency} ({flight.priceInZar} ZAR)
                    </Typography>
                  </CardContent>
                  <Button
                    onClick={() => addFlightToItinerary(flight)}
                    variant="contained"
                    color="secondary"
                    sx={{ margin: "8px" }}
                  >
                    Add to Itinerary
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Button onClick={handleNextStep} variant="contained" sx={{ marginTop: "2rem" }}>
          Next
        </Button>
      </>
    )}

    {/* {step === 2 && (
      <>
        <h2>Step 2: Select Accommodations</h2>
        <Grid container spacing={2}>
          {accommodations.map((accommodation) => (
            <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
              <Card
                onClick={() => handleAccommodationSelection(accommodation.id)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedAccommodations.includes(accommodation.id) ? "#d1e7dd" : "white",
                }}
              >
                <CardContent>
                  <Typography>{accommodation.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button onClick={handlePreviousStep}>Back</Button>
        <Button onClick={handleNextStep} variant="contained">
          Next
        </Button>
      </>
    )}

    {step === 3 && (
      <>
        <h2>Step 3: Select Activities</h2>
        <Grid container spacing={2}>
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <Card
                onClick={() => handleActivitySelection(activity.id)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: selectedActivities.includes(activity.id) ? "#d1e7dd" : "white",
                }}
              >
                <CardContent>
                  <Typography>{activity.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button onClick={handlePreviousStep}>Back</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Itinerary
        </Button>
      </>
    )} */}
  </Box>
  </Box>
);
}

export default ItineraryForm;