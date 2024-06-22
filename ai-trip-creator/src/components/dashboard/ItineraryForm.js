// import React, { useState } from 'react';

// function ItineraryForm({ onGenerateItinerary }) {
//   const [preferences, setPreferences] = useState({
//     destination: '',
//     duration: '',
//     interests: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPreferences({
//       ...preferences,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onGenerateItinerary(preferences);
//   };

//   const locations = ['Johannesburg', 'Cape Town', 'Pretoria', 'Durban', 'Gqeberha'];
//   const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
//   const interests = ['Culture', 'Adventure', 'Relaxation', 'Nature', 'Food'];

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Destination:
//         <select name="destination" value={preferences.destination} onChange={handleChange}>
//           <option value="" disabled>Select a location</option>
//           {locations.map((location) => (
//             <option key={location} value={location}>
//               {location}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Duration:
//         <select name="duration" value={preferences.duration} onChange={handleChange}>
//           <option value="" disabled>Select a duration</option>
//           {durations.map((duration) => (
//             <option key={duration} value={duration}>
//               {duration}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Interests:
//         <select name="interests" value={preferences.interests} onChange={handleChange}>
//           <option value="" disabled>Select an interest</option>
//           {interests.map((interest) => (
//             <option key={interest} value={interest}>
//               {interest}
//             </option>
//           ))}
//         </select>
//       </label>
//       <button type="submit">Generate Itinerary</button>
//     </form>
//   );
// }

// export default ItineraryForm;

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

