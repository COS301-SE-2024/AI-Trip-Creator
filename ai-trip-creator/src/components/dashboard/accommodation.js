// import React from "react";
// import "./dashboard.css";
// import Sidebar from "./sidebar";
// import { Card, CardContent, Typography } from '@mui/material';

// const Accommodation = () => {
//   const accommodations = [
//     {
//       id: "1",
//       name: "The Oyster Box",
//       price: "R4000 per night",
//       location: "Durban, South Africa",
//       description: "A luxurious stay in Umhlanga with stunning views of the Indian Ocean."
//     },
//     {
//       id: "2",
//       name: "Protea Hotel",
//       price: "R1500 per night",
//       location: "Cape Town, South Africa",
//       description: "Affordable and comfortable accommodation in central Cape Town with Table Mountain views."
//     },
//     {
//       id: "3",
//       name: "Kruger National Park Lodge",
//       price: "R3000 per night",
//       location: "Kruger National Park, South Africa",
//       description: "Experience the wild with comfortable rooms and excellent amenities in the heart of the Kruger National Park."
//     }
//   ];

//   // return (
//   //   <div className="dashboard">
//   //     <Sidebar />
//   //     <div className="content">
//   //       <h1>Accommodation</h1>
//   //       <div className="accommodation-list">
//   //         {accommodations.map(acc => (
//   //           <div key={acc.id} className="accommodation-item">
//   //             <h2>{acc.name}</h2>
//   //             <p>{acc.price}</p>
//   //             <p>{acc.location}</p>
//   //             <p>{acc.description}</p>
//   //           </div>
//   //         ))}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );



//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="content">
//         <h1>Accommodation</h1>
//         <div className="accommodation-list">
//           {accommodations.map(acc => (
//             <Card key={acc.id} className="accommodation-item">
//               <CardContent>
//                 <h2>{acc.name}</h2>
//                 <Typography variant="body1">{acc.price}</Typography>
//                 <Typography variant="body1">{acc.location}</Typography>
//                 <Typography variant="body2">{acc.description}</Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Accommodation;

import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';

function ItineraryForm({ onGenerateItinerary }) {
  const [preferences, setPreferences] = useState({
    destination: '',
    duration: '',
    interests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateItinerary(preferences);
  };

  const locations = [
    { name: 'Johannesburg', image: 'image_url_johannesburg' },
    { name: 'Cape Town', image: 'image_url_cape_town' },
    { name: 'Pretoria', image: 'image_url_pretoria' },
    { name: 'Durban', image: 'image_url_durban' },
    { name: 'Gqeberha', image: 'image_url_gqeberha' },
  ];

  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
  const interests = ['Culture', 'Adventure', 'Relaxation', 'Nature', 'Food'];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Itinerary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
              {locations.map((location) => (
                <MenuItem key={location.name} value={location.name}>
                  {location.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="interests-label">Interests</InputLabel>
            <Select
              labelId="interests-label"
              name="interests"
              value={preferences.interests}
              onChange={handleChange}
              label="Interests"
            >
              <MenuItem value="" disabled>
                Select an interest
              </MenuItem>
              {interests.map((interest) => (
                <MenuItem key={interest} value={interest}>
                  {interest}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Generate Itinerary
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Destinations
        </Typography>
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ItineraryForm;
