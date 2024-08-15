
import React, { useState } from 'react';
import { setGlobalAIText } from './globalData'; 
import { db, app } from "../../firebase/firebase-config";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai-preview";

import {
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
  Slider,
  Rating,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import johannesburgImg from './images/johannesburg.jpg';
import pretoriaImg from './images/pretoria.jpg';
import capetownImg from './images/capetown.jpg';
import durbanImg from './images/durban.jpeg';
import gqerberhaImg from './images/Gqerberha.jpg';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc,collection, query, where, getDocs } from "firebase/firestore";


let exportVariable = "def";

// // Initialize the Vertex AI service
 const vertexAI = getVertexAI(app);

// // Initialize the generative model with a model that supports your use case
// // Gemini 1.5 models are versatile and can be used with all API capabilities
 const model = getGenerativeModel(vertexAI, { model: "gemini-1.5-flash" });

 const fetchDocumentById = async (docId) => {
  try {
    // Reference to the Firestore collection and document
    //const docRef = db.collection('examplName').doc(docId);


    const prefsDocRef = doc(db, "Preferences", docId);
    const prefsDocSnap = await getDoc(prefsDocRef);
    // Fetch the document
    

    if (!prefsDocSnap.exists) {
      console.log('No such document!');
      return;
    }
                                                                                              
    // Log the document data
    let data = prefsDocSnap.data();
    let activities = data.activities;
    //console.log('Document data:', data);
    let a = activities[0] + '   ' + activities[1]
    //console.log('Activities:', a);

    return activities;
  } catch (error) {
    console.error('Error getting document', error);
    return ["Outdoor",
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


const fetchFilteredActivities = async (activitiesArray) => {
  try {
    // Reference to the Firestore collection
    const activitiesCollection = collection(db, "Activities");

    // Create a query to filter documents
    const q = query(
      activitiesCollection,
      where("city", "==", "Cape Town"),
      where("sub_category", "in", activitiesArray)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Process the results
    let activities = [];
    querySnapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() });
    });

    return activities;
  } catch (error) {
    console.error('Error getting documents', error);
    const activities = [
      {
          ActivityID: "1839618f-d6cb-4f1e-8709-c5f697a28f4b",
          address: "0606 Hernandez Road Apt. 126 East Rodneyshire, AL 56108",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
          name: "Gill-Stevens",
          price: 4094,
          sub_category: "Indoor"
      },
      {
          ActivityID: "188c41fa-1a44-47fe-96c2-d1ec4aa4540b",
          address: "91953 Schwartz Park Apt. 226 West Debrabury, AR 94889",
          category: "Restaurant",
          city: "Cape Town",
          description: "Vendors offering traditional street foods from various cultures, often in an outdoor setting with a focus on authentic and flavorful dishes.",
          name: "Alvarez and Sons",
          price: 398,
          sub_category: "Ethnic Street Food"
      },
      {
          ActivityID: "1db7c6b7-01ae-424e-9dec-15e2d16a85cd",
          address: "77569 Krause Shoal Suite 689 Thomasview, SD 53421",
          category: "Restaurant",
          city: "Cape Town",
          description: "An establishment specializing in a variety of teas, often paired with light snacks or pastries, providing a tranquil environment for tea lovers.",
          name: "Martin, Brown and Cooley",
          price: 217,
          sub_category: "Tea House"
      },
      {
          ActivityID: "294d0015-f9ec-4755-8189-1d1d5a8084ce",
          address: "36335 Baldwin Ferry Luisshire, ND 45289",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A traditional dance performance that showcases the rich cultural heritage of the region.",
          name: "Harper, Morris and Wilcox",
          price: 4049,
          sub_category: "Culture"
      },
      {
          ActivityID: "29c35c59-3d2c-4466-9b08-1c9d1be20292",
          address: "PSC 8293, Box 9844 APO AP 96314",
          category: "Restaurant",
          city: "Cape Town",
          description: "An establishment offering nutritious meals made from organic or locally sourced ingredients, focusing on health-conscious dining options.",
          name: "Snyder and Sons",
          price: 432,
          sub_category: "Health Food Restaurant"
      },
      {
          ActivityID: "4d076bb9-0f2a-4445-8245-5d34f8e13605",
          address: "06299 Hardy Flat North Joseph, RI 31399",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A traditional dance performance that showcases the rich cultural heritage of the region.",
          name: "Jenkins-Kelley",
          price: 3871,
          sub_category: "Culture"
      },
      {
          ActivityID: "7924c846-1795-46a5-8646-50923a5d8ccb",
          address: "944 Hamilton Union Robertton, NY 90162",
          category: "Restaurant",
          city: "Cape Town",
          description: "A restaurant combining elements from multiple ethnic cuisines to create unique and innovative dishes, blending diverse culinary traditions.",
          name: "Hunter LLC",
          price: 61,
          sub_category: "Ethnic Fusion"
      },
      {
          ActivityID: "99c6fd46-8a88-4374-b280-ff6288918fff",
          address: "03456 Krystal Ridges Potterview, WY 77081",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A scenic hiking trail that offers breathtaking views and a serene escape into nature.",
          name: "Nichols, Bond and Haynes",
          price: 869,
          sub_category: "Outdoor"
      },
      {
        ActivityID: "9a181812-159c-4d07-988e-1b414c2b0f9d",
        address: "18115 Schmidt Circles Suite 019 Mosleyshire, FM 44546",
        category: "Things_to_do",
        city: "Cape Town",
        description: "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
        name: "James-Shah",
        price: 2936,
        sub_category: "Indoor"
    },
    {
        ActivityID: "dd0036ca-b2a4-4f45-bb53-a34e415f0416",
        address: "422 Thomas Canyon Suite 404 Lake Joshua, MA 47204",
        category: "Things_to_do",
        city: "Cape Town",
        description: "A secluded beach with soft white sand and crystal-clear waters, ideal for a relaxing day.",
        name: "Wright, Vega and Fleming",
        price: 1461,
        sub_category: "Beach"
    },
    {
        ActivityID: "eb675274-dd3c-4202-b83f-56e0064d418c",
        address: "288 Susan Meadows Apt. 096 Sharonmouth, NE 93225",
        category: "Things_to_do",
        city: "Cape Town",
        description: "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Harris-Lee",
        price: 4849,
        sub_category: "Culture"
    }
  ];
  
    return activities;
  }
};

// Call the function with the document ID you want to fetch


// Call the function to fetch the document with userId = 2
//fetchDocumentByUserId('9CFwYt87JCRRLe8XKF8mY5TEcSu2');




function ItineraryForm({ onGenerateItinerary }) {
 

 let globalAI_Text = "";
  const [preferences, setPreferences] = useState({
    currentLocation: '',
    destination: '',
    duration: '',
    interests: [],
    travelDate: null,
    budget: '',
    priority: '',
    groupSize: 1,
    itineraryText: '',
  });

  const [responseText, setResponseText] = useState("");
  async function run() {
   
    //console.log('Activities:', a);
  
  
   //try await in data retrieve statement
    // Provide a prompt that contains text
    //let acts = fetchFilteredActivities(await fetchDocumentById('9CFwYt87JCRRLe8XKF8mY5TEcSu2') );
    const acts = ["Outdoor",
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
          description: "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
          name: "Gill-Stevens",
          price: 4094,
          sub_category: "Indoor"
      },
      {
          ActivityID: "188c41fa-1a44-47fe-96c2-d1ec4aa4540b",
          address: "91953 Schwartz Park Apt. 226 West Debrabury, AR 94889",
          category: "Restaurant",
          city: "Cape Town",
          description: "Vendors offering traditional street foods from various cultures, often in an outdoor setting with a focus on authentic and flavorful dishes.",
          name: "Alvarez and Sons",
          price: 398,
          sub_category: "Ethnic Street Food"
      },
      {
          ActivityID: "1db7c6b7-01ae-424e-9dec-15e2d16a85cd",
          address: "77569 Krause Shoal Suite 689 Thomasview, SD 53421",
          category: "Restaurant",
          city: "Cape Town",
          description: "An establishment specializing in a variety of teas, often paired with light snacks or pastries, providing a tranquil environment for tea lovers.",
          name: "Martin, Brown and Cooley",
          price: 217,
          sub_category: "Tea House"
      },
      {
          ActivityID: "294d0015-f9ec-4755-8189-1d1d5a8084ce",
          address: "36335 Baldwin Ferry Luisshire, ND 45289",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A traditional dance performance that showcases the rich cultural heritage of the region.",
          name: "Harper, Morris and Wilcox",
          price: 4049,
          sub_category: "Culture"
      },
      {
          ActivityID: "29c35c59-3d2c-4466-9b08-1c9d1be20292",
          address: "PSC 8293, Box 9844 APO AP 96314",
          category: "Restaurant",
          city: "Cape Town",
          description: "An establishment offering nutritious meals made from organic or locally sourced ingredients, focusing on health-conscious dining options.",
          name: "Snyder and Sons",
          price: 432,
          sub_category: "Health Food Restaurant"
      },
      {
          ActivityID: "4d076bb9-0f2a-4445-8245-5d34f8e13605",
          address: "06299 Hardy Flat North Joseph, RI 31399",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A traditional dance performance that showcases the rich cultural heritage of the region.",
          name: "Jenkins-Kelley",
          price: 3871,
          sub_category: "Culture"
      },
      {
          ActivityID: "7924c846-1795-46a5-8646-50923a5d8ccb",
          address: "944 Hamilton Union Robertton, NY 90162",
          category: "Restaurant",
          city: "Cape Town",
          description: "A restaurant combining elements from multiple ethnic cuisines to create unique and innovative dishes, blending diverse culinary traditions.",
          name: "Hunter LLC",
          price: 61,
          sub_category: "Ethnic Fusion"
      },
      {
          ActivityID: "99c6fd46-8a88-4374-b280-ff6288918fff",
          address: "03456 Krystal Ridges Potterview, WY 77081",
          category: "Things_to_do",
          city: "Cape Town",
          description: "A scenic hiking trail that offers breathtaking views and a serene escape into nature.",
          name: "Nichols, Bond and Haynes",
          price: 869,
          sub_category: "Outdoor"
      },
      {
        ActivityID: "9a181812-159c-4d07-988e-1b414c2b0f9d",
        address: "18115 Schmidt Circles Suite 019 Mosleyshire, FM 44546",
        category: "Things_to_do",
        city: "Cape Town",
        description: "A cozy reading nook inside a well-lit library, perfect for losing yourself in a good book.",
        name: "James-Shah",
        price: 2936,
        sub_category: "Indoor"
    },
    {
        ActivityID: "dd0036ca-b2a4-4f45-bb53-a34e415f0416",
        address: "422 Thomas Canyon Suite 404 Lake Joshua, MA 47204",
        category: "Things_to_do",
        city: "Cape Town",
        description: "A secluded beach with soft white sand and crystal-clear waters, ideal for a relaxing day.",
        name: "Wright, Vega and Fleming",
        price: 1461,
        sub_category: "Beach"
    },
    {
        ActivityID: "eb675274-dd3c-4202-b83f-56e0064d418c",
        address: "288 Susan Meadows Apt. 096 Sharonmouth, NE 93225",
        category: "Things_to_do",
        city: "Cape Town",
        description: "A traditional dance performance that showcases the rich cultural heritage of the region.",
        name: "Harris-Lee",
        price: 4849,
        sub_category: "Culture"
    }
  ];
    const prompt = "Generate an itinerary for my holiday with the the following data. The Holiday is 2 days long and i would like to eat twice a day. You will"
                    + " make sure the category is restaurant when choosing a place to eat. i am limit to 2-3 activities a day. Ake sure to include price and descripton at each activity.";
    const acts_string = JSON.stringify(Activities, null, 2);
    // const AI_prompt = {prompt: prompt,
    //                        activities: acts_string
    //             };
    const AI_prompt = prompt + "\n\n" + "Activities:\n" + acts_string;
    // To generate text output, call generateContent with the text input
    const result = await model.generateContent(AI_prompt);
    
   
    const response = result.response;
    const text = response.text();
    globalAI_Text = text;
    exportVariable  = text;
    setResponseText(text);
    setGlobalAIText(text);
    
    console.log("ResponseText: ", text);
   
    //console.log(text);
    setPreferences({
      ...preferences,
     itineraryText: text,
    });
    
    //console.log("Response After : ", responseText);
    //return responseText;
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

  const handlePriorityChange = (event, newPriority) => {
    setPreferences({
      ...preferences,
      priority: newPriority,
    });
  };

  const handleGroupSizeChange = (event, newValue) => {
    setPreferences({
      ...preferences,
      groupSize: newValue,
    });

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onGenerateItinerary(preferences);
   //const { currentLocation, destination, duration, interests, travelDate, budget, priority, groupSize } = preferences;

     await run();

   // console.log("Response submit : ", exportVariable);


  };

  const locations = [
    { name: 'Johannesburg', image: johannesburgImg },
    { name: 'CapeTown', image: capetownImg },
    { name: 'Pretoria', image: pretoriaImg },
    { name: 'Durban', image: durbanImg },
    { name: 'Gqeberha', image: gqerberhaImg },
  ];

  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
  const interests = ['Culture', 'Adventure', 'Relaxation', 'Nature', 'Food', 'Shopping', 'Nightlife'];
  const budgets = ['Low', 'Medium', 'High'];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
    <h2>Create Your Itinerary</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="current-location">Current Location</InputLabel>
            <Select
              labelId="current-location"
              name="currentLocation"
              value={preferences.currentLocation}
              onChange={handleChange}
              label="Current Location"
            >
              <MenuItem value="" disabled>
                Select a location
              </MenuItem>
              {locations.map((location) => (
                <MenuItem key={location.name} value={location.name}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="destination-label">Destination</InputLabel>
            <Select
              labelId="destination-label"
              name="destination"
              value={preferences.destination}
              onChange={handleChange}
              label="Destination"
            >
              <MenuItem value="" disabled>
                Select a location
              </MenuItem>
              {locations
                .filter((location) => location.name !== preferences.currentLocation)
                .map((location) => (
                  <MenuItem key={location.name} value={location.name}>
                    {location.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="duration-label">Duration</InputLabel>
            <Select
              labelId="duration-label"
              name="duration"
              value={preferences.duration}
              onChange={handleChange}
              label="Duration"
            >
              <MenuItem value="" disabled>
                Select a duration
              </MenuItem>
              {durations.map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePicker
            label="Travel Date"
            value={preferences.travelDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="budget-label">Budget</InputLabel>
            <Select
              labelId="budget-label"
              name="budget"
              value={preferences.budget}
              onChange={handleChange}
              label="Budget"
            >
              <MenuItem value="" disabled>
                Select a budget
              </MenuItem>
              {budgets.map((budget) => (
                <MenuItem key={budget} value={budget}>
                  {budget}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <Autocomplete
              multiple
              options={interests}
              getOptionLabel={(option) => option}
              value={preferences.interests}
              onChange={handleInterestsChange}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Interests" placeholder="Select interests" />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
        <Grid item xs={12} sm={6} md={4}>
          <Typography gutterBottom>Priority</Typography>
          <ToggleButtonGroup
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
      <Box mt={4}>
        <h2>Destinations</h2>
        <Grid container spacing={2}>
          {locations.map((location) => (
            <Grid item xs={12} sm={6} md={4} key={location.name}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={location.image}
                  alt={location.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {location.name}
                  </Typography>
                  <Button variant="contained" color="secondary" href={`/accommodations?destination=${location.name}`}>
                    View Accommodations
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    <Grid item xs={12}>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Generate Itinerary
      </Button>
    </Grid>
    <Box mt={4}>
      <h2>Your Generated Itinerary</h2>
      <Typography variant="body1" paragraph>
        {responseText}
      </Typography>
    </Box>
    <Box mt={4}>
      <h2>Destinations</h2>
      <Grid container spacing={2}>
        {locations.map((location) => (
          <Grid item xs={12} sm={6} md={4} key={location.name}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={location.image}
                alt={location.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {location.name}
                </Typography>
                <Button variant="contained" color="secondary" href={`/accommodations?destination=${location.name}`}>
                  View Accommodations
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
  );
}
export {exportVariable};
export default ItineraryForm;
