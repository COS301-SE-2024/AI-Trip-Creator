import React, { useState } from "react";
import { setGlobalAIText } from "./globalData";
import { db, app } from "../../firebase/firebase-config";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";

// import {
//   Button, FormControl, InputLabel, MenuItem, Select, Typography,
//   Box, Card, CardContent, CardMedia, Grid, Chip, Paper, TextField,
//   Autocomplete, ToggleButton, ToggleButtonGroup,}
//   from '@mui/material';;

import "./dashboard.css";
import {
  FormHelperText,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Paper,
  TextField,
  Autocomplete,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Slider,
  Rating,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import johannesburgImg from "./images/johannesburg.jpg";
import pretoriaImg from "./images/pretoria.jpg";
import capetownImg from "./images/capetown.jpg";
import durbanImg from "./images/durban.jpeg";
import gqerberhaImg from "./images/Gqerberha.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import "./dashboard.css";

let exportVariable = "def";

const vertexAI = getVertexAI(app);

const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

const fetchDocumentById = async (docId) => {
  try {
    const prefsDocRef = doc(db, "Preferences", docId);
    const prefsDocSnap = await getDoc(prefsDocRef);

    if (!prefsDocSnap.exists) {
      console.log("No such document!");
      return;
    }

    // Log the document data
    let data = prefsDocSnap.data();
    let activities = data.activities;
    //console.log('Document data:', data);
    let a = activities[0] + "   " + activities[1];
    //console.log('Activities:', a);

    return activities;
  } catch (error) {
    console.error("Error getting document", error);
    return [
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
  }
};

// Function to update family size and adjust the group size slider accordingly

const fetchFilteredActivities = async (activitiesArray) => {
  try {
    const activitiesCollection = collection(db, "Activities");
    const q = query(
      activitiesCollection,
      where("city", "==", "Cape Town"),
      where("sub_category", "in", activitiesArray),
    );

    const querySnapshot = await getDocs(q);

    let activities = [];
    querySnapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() });
    });

    return activities;
  } catch (error) {
    console.error("Error getting documents", error);
    const activities = [
      {
        ActivityID: "1839618f-d6cb-4f1e-8709-c5f697a28f4b",
        address: "0606 Hernandez Road Apt. 126 East Rodneyshire, AL 56108",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
        name: "Gill-Stevens",
        price: 4094,
        sub_category: "Indoor",
      },
      {
        ActivityID: "188c41fa-1a44-47fe-96c2-d1ec4aa4540b",
        address: "91953 Schwartz Park Apt. 226 West Debrabury, AR 94889",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "Vendors offering traditional street foods from various cultures, often in an outdoor setting with a focus on authentic and flavorful dishes.",
        name: "Alvarez and Sons",
        price: 398,
        sub_category: "Ethnic Street Food",
      },
      {
        ActivityID: "1db7c6b7-01ae-424e-9dec-15e2d16a85cd",
        address: "77569 Krause Shoal Suite 689 Thomasview, SD 53421",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "An establishment specializing in a variety of teas, often paired with light snacks or pastries, providing a tranquil environment for tea lovers.",
        name: "Martin, Brown and Cooley",
        price: 217,
        sub_category: "Tea House",
      },
      {
        ActivityID: "294d0015-f9ec-4755-8189-1d1d5a8084ce",
        address: "36335 Baldwin Ferry Luisshire, ND 45289",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Harper, Morris and Wilcox",
        price: 4049,
        sub_category: "Culture",
      },
      {
        ActivityID: "29c35c59-3d2c-4466-9b08-1c9d1be20292",
        address: "PSC 8293, Box 9844 APO AP 96314",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "An establishment offering nutritious meals made from organic or locally sourced ingredients, focusing on health-conscious dining options.",
        name: "Snyder and Sons",
        price: 432,
        sub_category: "Health Food Restaurant",
      },
      {
        ActivityID: "4d076bb9-0f2a-4445-8245-5d34f8e13605",
        address: "06299 Hardy Flat North Joseph, RI 31399",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Jenkins-Kelley",
        price: 3871,
        sub_category: "Culture",
      },
      {
        ActivityID: "7924c846-1795-46a5-8646-50923a5d8ccb",
        address: "944 Hamilton Union Robertton, NY 90162",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "A restaurant combining elements from multiple ethnic cuisines to create unique and innovative dishes, blending diverse culinary traditions.",
        name: "Hunter LLC",
        price: 61,
        sub_category: "Ethnic Fusion",
      },
      {
        ActivityID: "99c6fd46-8a88-4374-b280-ff6288918fff",
        address: "03456 Krystal Ridges Potterview, WY 77081",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A scenic hiking trail that offers breathtaking views and a serene escape into nature.",
        name: "Nichols, Bond and Haynes",
        price: 869,
        sub_category: "Outdoor",
      },
      {
        ActivityID: "9a181812-159c-4d07-988e-1b414c2b0f9d",
        address: "18115 Schmidt Circles Suite 019 Mosleyshire, FM 44546",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
        name: "James-Shah",
        price: 2936,
        sub_category: "Indoor",
      },
      {
        ActivityID: "dd0036ca-b2a4-4f45-bb53-a34e415f0416",
        address: "422 Thomas Canyon Suite 404 Lake Joshua, MA 47204",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A secluded beach with soft white sand and crystal-clear waters, ideal for a relaxing day.",
        name: "Wright, Vega and Fleming",
        price: 1461,
        sub_category: "Beach",
      },
      {
        ActivityID: "eb675274-dd3c-4202-b83f-56e0064d418c",
        address: "288 Susan Meadows Apt. 096 Sharonmouth, NE 93225",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Harris-Lee",
        price: 4849,
        sub_category: "Culture",
      },
    ];

    return activities;
  }
};
//fetchDocumentByUserId('9CFwYt87JCRRLe8XKF8mY5TEcSu2');

function ItineraryForm({ onGenerateItinerary }) {
  let globalAI_Text = "";
  const [preferences, setPreferences] = useState({
    currentLocation: "",
    destination: "",
    duration: "",
    travelDate: null,
    budgetRange: [0, 10000],
    interests: [],
    groupSize: 1,
    priority: "Budget",
    travelerCategory: "",
  });

  const [familySize, setFamilySize] = useState({ adults: 2, kids: 0 });

  const handleFamilyChange = (event) => {
    const { name, value } = event.target;
    setFamilySize((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Set the group size slider based on the number of adults + kids
    handleGroupSizeChange(
      null,
      parseInt(familySize.adults) + parseInt(familySize.kids),
    );
  };

  // const [preferences, setPreferences] = useState({currentLocation: '', destination: '', duration: '', interests: [], travelDate: null, budget: '', priority: '',
  //   groupSize: 1,
  //   itineraryText: '',
  // });

  const [responseText, setResponseText] = useState("");
  async function run() {
    //let acts = fetchFilteredActivities(await fetchDocumentById('9CFwYt87JCRRLe8XKF8mY5TEcSu2') );
    const acts = [
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

    const Activities = [
      {
        ActivityID: "1839618f-d6cb-4f1e-8709-c5f697a28f4b",
        address: "0606 Hernandez Road Apt. 126 East Rodneyshire, AL 56108",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
        name: "Gill-Stevens",
        price: 4094,
        sub_category: "Indoor",
      },
      {
        ActivityID: "188c41fa-1a44-47fe-96c2-d1ec4aa4540b",
        address: "91953 Schwartz Park Apt. 226 West Debrabury, AR 94889",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "Vendors offering traditional street foods from various cultures, often in an outdoor setting with a focus on authentic and flavorful dishes.",
        name: "Alvarez and Sons",
        price: 398,
        sub_category: "Ethnic Street Food",
      },
      {
        ActivityID: "1db7c6b7-01ae-424e-9dec-15e2d16a85cd",
        address: "77569 Krause Shoal Suite 689 Thomasview, SD 53421",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "An establishment specializing in a variety of teas, often paired with light snacks or pastries, providing a tranquil environment for tea lovers.",
        name: "Martin, Brown and Cooley",
        price: 217,
        sub_category: "Tea House",
      },
      {
        ActivityID: "294d0015-f9ec-4755-8189-1d1d5a8084ce",
        address: "36335 Baldwin Ferry Luisshire, ND 45289",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Harper, Morris and Wilcox",
        price: 4049,
        sub_category: "Culture",
      },
      {
        ActivityID: "29c35c59-3d2c-4466-9b08-1c9d1be20292",
        address: "PSC 8293, Box 9844 APO AP 96314",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "An establishment offering nutritious meals made from organic or locally sourced ingredients, focusing on health-conscious dining options.",
        name: "Snyder and Sons",
        price: 432,
        sub_category: "Health Food Restaurant",
      },
      {
        ActivityID: "4d076bb9-0f2a-4445-8245-5d34f8e13605",
        address: "06299 Hardy Flat North Joseph, RI 31399",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Jenkins-Kelley",
        price: 3871,
        sub_category: "Culture",
      },
      {
        ActivityID: "7924c846-1795-46a5-8646-50923a5d8ccb",
        address: "944 Hamilton Union Robertton, NY 90162",
        category: "Restaurant",
        city: "Cape Town",
        description:
          "A restaurant combining elements from multiple ethnic cuisines to create unique and innovative dishes, blending diverse culinary traditions.",
        name: "Hunter LLC",
        price: 61,
        sub_category: "Ethnic Fusion",
      },
      {
        ActivityID: "99c6fd46-8a88-4374-b280-ff6288918fff",
        address: "03456 Krystal Ridges Potterview, WY 77081",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A scenic hiking trail that offers breathtaking views and a serene escape into nature.",
        name: "Nichols, Bond and Haynes",
        price: 869,
        sub_category: "Outdoor",
      },
      {
        ActivityID: "9a181812-159c-4d07-988e-1b414c2b0f9d",
        address: "18115 Schmidt Circles Suite 019 Mosleyshire, FM 44546",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
        name: "James-Shah",
        price: 2936,
        sub_category: "Indoor",
      },
      {
        ActivityID: "dd0036ca-b2a4-4f45-bb53-a34e415f0416",
        address: "422 Thomas Canyon Suite 404 Lake Joshua, MA 47204",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A secluded beach with soft white sand and crystal-clear waters, ideal for a relaxing day.",
        name: "Wright, Vega and Fleming",
        price: 1461,
        sub_category: "Beach",
      },
      {
        ActivityID: "eb675274-dd3c-4202-b83f-56e0064d418c",
        address: "288 Susan Meadows Apt. 096 Sharonmouth, NE 93225",
        category: "Things_to_do",
        city: "Cape Town",
        description:
          "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Harris-Lee",
        price: 4849,
        sub_category: "Culture",
      },
    ];

    const currentLocation = preferences.currentLocation;
    const destination = preferences.destination;
    const travelerCategory = preferences.travelerCategory;
    const duration = preferences.duration;
    const budgetRange = preferences.budgetRange;
    const interests = preferences.interests;
    const groupSize = preferences.groupSize;
    const priority = preferences.priority;

    // const prompt = "Generate an itinerary for my holiday with the the following data. The Holiday is 2 days long and i would like to eat twice a day. You will"
    //                 + " make sure the category is restaurant when choosing a place to eat. i am limit to 2-3 activities a day. Ake sure to include price and descripton at each activity.";

    const prompt =
      "Generate an itinerary for my holiday with the the following data. The holiday should accommodate for the start location at " +
      currentLocation +
      " and the destination is " +
      destination +
      ". The travelor category is " +
      travelerCategory +
      ". The duration of the trip is " +
      duration +
      ". The group size is " +
      groupSize +
      ". The interests are as follows " +
      interests +
      ". And the priority of the trip is " +
      priority +
      ". ";

    const acts_string = JSON.stringify(Activities, null, 2);
    const AI_prompt = prompt + "\n\n" + "Activities:\n" + acts_string;
    const result = await model.generateContent(AI_prompt);

    const response = result.response;
    const text = response.text();
    globalAI_Text = text;
    exportVariable = text;
    setResponseText(text);
    setGlobalAIText(text);

    console.log("ResponseText: ", text);

    setPreferences({
      ...preferences,
      itineraryText: text,
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleInterestsChange = (event, values) => {
    setPreferences({
      ...preferences,
      interests: values,
    });
  };

  const handleDateChange = (date) => {
    setPreferences({
      ...preferences,
      travelDate: date,
    });
  };

  let exportVariable = "def";

  // Function to update family size and adjust the group size slider accordingly
  const updateFamilyGroupSize = (adults, kids) => {
    const total = adults + kids;
    setPreferences({ ...preferences, groupSize: total });
  };

  const handleTravelerCategoryChange = (event) => {
    const { value } = event.target;
    setPreferences({ ...preferences, travelerCategory: value });

    if (value === "Family") {
      setPreferences({ ...preferences, groupSize: 3 }); // default to 2 adults + 1 kid
    } else {
      setPreferences({ ...preferences, groupSize: 2 }); // default for Couples or others
    }
  };

  const handleAdultsChange = (event) => {
    const adults = parseInt(event.target.value) || 0;
    updateFamilyGroupSize(adults, preferences.kids);
  };

  const handleKidsChange = (event) => {
    const kids = parseInt(event.target.value) || 0;
    updateFamilyGroupSize(preferences.adults, kids);
  };

  const handlePriorityChange = (event, newPriority) => {
    setPreferences((prevPreferences) => {
      const newPreferences = { ...prevPreferences, priority: newPriority };

      if (newPriority === "Budget") {
        newPreferences.budgetRange = [0, 30000];
      } else if (newPriority === "Comfort") {
        newPreferences.budgetRange = [30001, 50000];
      } else {
        newPreferences.budgetRange = [50001, 100000];
      }

      return newPreferences;
    });
  };

  const handleGroupSizeChange = (event, newValue) => {
    setPreferences({
      ...preferences,
      groupSize: newValue,
    });
  };

  const handleBudgetRangeChange = (event, newValue) => {
    setPreferences((prevPreferences) => {
      const newPreferences = { ...prevPreferences, budgetRange: newValue };

      // Auto-update priority based on budget range
      if (newValue[1] <= 30000) {
        newPreferences.priority = "Budget";
      } else if (newValue[1] <= 50000) {
        newPreferences.priority = "Comfort";
      } else {
        newPreferences.priority = "Experience";
      }

      return newPreferences;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const { currentLocation, destination, duration, interests, travelDate, budget, priority, groupSize } = preferences;
    await run();
    // console.log("Response submit : ", exportVariable);
    onGenerateItinerary({
      ...preferences,
      itineraryText: exportVariable, // Pass the generated AI text
    });
  };

  const locations = [
    { name: "Johannesburg", image: johannesburgImg },
    { name: "CapeTown", image: capetownImg },
    { name: "Pretoria", image: pretoriaImg },
    { name: "Durban", image: durbanImg },
    { name: "Gqeberha", image: gqerberhaImg },
  ];

  const durations = ["1-3 days", "4-7 days", "8-14 days", "15+ days"];
  // const interests = [
  //   "Culture",
  //   "Adventure",
  //   "Relaxation",
  //   "Nature",
  //   "Food",
  //   "Shopping",
  //   "Nightlife",
  // ];

  const interests = [
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

  const budgets = ["Low", "Medium", "High"];

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        p: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 1,
        maxWidth: "calc(100vw - 640px)",
        marginLeft: "640px",
        margin: "auto",
        backgroundColor: isDarkMode ? "#424242" : "#ffffff",
      }}
    >
      {/* <Typography variant="h4" gutterBottom align="center" 
      sx ={{
        fontFamily: "Poppins",
        fontWeight: "10px",
      }}>
        Create Your Itinerary
      </Typography> */}
      <h1>Itinerary</h1>
      <h2 style={{ size: "45px", textAlign: "center" }}>
        Create Your Itinerary
      </h2>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="current-location">Starting Location</InputLabel>
            <Select
              sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              labelId="current-location"
              name="currentLocation"
              value={preferences.currentLocation}
              onChange={handleChange}
              label="Starting Location"
            >
              <MenuItem
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                value=""
                disabled
              >
                Select a location
              </MenuItem>
              {locations.map((location) => (
                <MenuItem
                  sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                  key={location.name}
                  value={location.name}
                >
                  {location.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="destination-label">Destination</InputLabel>
            <Select
              sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              labelId="destination-label"
              name="destination"
              value={preferences.destination}
              onChange={handleChange}
              label="Destination"
            >
              <MenuItem
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                value=""
                disabled
              >
                Select a destination
              </MenuItem>
              {locations
                .filter(
                  (location) => location.name !== preferences.currentLocation,
                )
                .map((location) => (
                  <MenuItem
                    sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                    key={location.name}
                    value={location.name}
                  >
                    {location.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="duration-label">Duration</InputLabel>
            <Select
              sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              labelId="duration-label"
              name="duration"
              value={preferences.duration}
              onChange={handleChange}
              label="Duration"
            >
              <MenuItem
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                value=""
                disabled
              >
                Select a duration
              </MenuItem>
              {durations.map((duration) => (
                <MenuItem
                  sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                  key={duration}
                  value={duration}
                >
                  {duration}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <InputLabel id="traveler-category-label">
              Traveler Category
            </InputLabel>
            <Select
              sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              labelId="traveler-category-label"
              name="travelerCategory"
              value={preferences.travelerCategory}
              onChange={handleChange}
              label="Traveler Category"
            >
              <MenuItem
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                value=""
                disabled
              >
                Select a category
              </MenuItem>
              <MenuItem
                value="Family"
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              >
                Family
              </MenuItem>
              <MenuItem
                value="Singles"
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              >
                Singles
              </MenuItem>
              <MenuItem
                value="Couples"
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              >
                Couples
              </MenuItem>
              <MenuItem
                value="Group"
                sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
              >
                Other
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl required fullWidth>
            <Autocomplete
              multiple
              options={interests}
              getOptionLabel={(option) => option}
              value={preferences.interests}
              onChange={handleInterestsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Interests"
                  placeholder="Select interests"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option}
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Budget Range</Typography>
          <Slider
            value={preferences.budgetRange}
            onChange={handleBudgetRangeChange}
            valueLabelDisplay="auto"
            min={1000}
            max={100000}
            aria-labelledby="budget-range-slider"
          />
          <Box mt={2}>
            <Typography>
              Selected Range: R{preferences.budgetRange[0]} - R
              {preferences.budgetRange[1]}
            </Typography>
          </Box>
        </Grid>

        {/* Conditional rendering based on traveler category */}
        {preferences.travelerCategory === "Family" ? (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Adults"
                name="adults"
                value={familySize.adults}
                onChange={handleFamilyChange}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Number of Kids"
                name="kids"
                value={familySize.kids}
                onChange={handleFamilyChange}
                type="number"
                fullWidth
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Group Size</Typography>
            <Slider
              value={preferences.groupSize}
              onChange={handleGroupSizeChange}
              step={1}
              marks
              min={1}
              max={20}
              valueLabelDisplay="auto"
              aria-labelledby="group-size-slider"
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Priority</Typography>
          <ToggleButtonGroup
            sx={{
              "& .MuiToggleButton-root": {
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                },
              },
            }}
            value={preferences.priority}
            exclusive
            onChange={handlePriorityChange}
            aria-label="priority"
            fullWidth
          >
            <ToggleButton value="Budget" aria-label="budget">
              Budget
            </ToggleButton>
            <ToggleButton value="Comfort" aria-label="comfort">
              Comfort
            </ToggleButton>
            <ToggleButton value="Experience" aria-label="experience">
              Experience
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Generate Itinerary
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export { exportVariable };
export default ItineraryForm;
