// import React, { useState } from 'react';
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
// } from '@mui/material';

// import johannesburgImg from './images/johannesburg.jpg';
// import pretoriaImg from './images/pretoria.jpg';
// import capetownImg from './images/capetown.jpg';
// import durbanImg from './images/durban.jpeg';
// import gqerberhaImg from './images/Gqerberha.jpg'

// function ItineraryForm({ onGenerateItinerary }) {
//   const [preferences, setPreferences] = useState({
//     currentLocation: '',
//     destination: '',
//     duration: '',
//     interests: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPreferences({
//       ...preferences,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onGenerateItinerary(preferences);
//   };

//   const locations = [
//     { name: 'Johannesburg', image: johannesburgImg},
//     { name: 'CapeTown', image: capetownImg },
//     { name: 'Pretoria', image: pretoriaImg },
//     { name: 'Durban', image: durbanImg },
//     { name: 'Gqeberha', image: gqerberhaImg },
//   ];

//   const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days'];
//   const interests = ['Culture', 'Adventure', 'Relaxation', 'Nature', 'Food'];

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//       <h2>Create Your Itinerary</h2>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel id="current-location">Current Location</InputLabel>
//             <Select
//               labelId="current-location"
//               name="currentLocation"
//               value={preferences.currentLocation}
//               onChange={handleChange}
//               label="Current Location"
//             >
//               <MenuItem value="" disabled>
//                 Select a location
//               </MenuItem>
//               {locations.map((location) => (
//                 <MenuItem key={location.name} value={location.name}>
//                   {location.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel id="destination-label">Destination</InputLabel>
//             <Select
//               labelId="destination-label"
//               name="destination"
//               value={preferences.destination}
//               onChange={handleChange}
//               label="Destination"
//             >
//               <MenuItem value="" disabled>
//                 Select a location
//               </MenuItem>
//               {locations
//                 .filter((location) => location.name !== preferences.currentLocation)
//                 .map((location) => (
//                   <MenuItem key={location.name} value={location.name}>
//                     {location.name}
//                   </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel id="duration-label">Duration</InputLabel>
//             <Select
//               labelId="duration-label"
//               name="duration"
//               value={preferences.duration}
//               onChange={handleChange}
//               label="Duration"
//             >
//               <MenuItem value="" disabled>
//                 Select a duration
//               </MenuItem>
//               {durations.map((duration) => (
//                 <MenuItem key={duration} value={duration}>
//                   {duration}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel id="interests-label">Interests</InputLabel>
//             <Select
//               labelId="interests-label"
//               name="interests"
//               value={preferences.interests}
//               onChange={handleChange}
//               label="Interests"
//             >
//               <MenuItem value="" disabled>
//                 Select an interest
//               </MenuItem>
//               {interests.map((interest) => (
//                 <MenuItem key={interest} value={interest}>
//                   {interest}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Generate Itinerary
//           </Button>
//         </Grid>
//       </Grid>
//       <Box mt={4}>
//         <h2>Destinations</h2>
//         <Grid container spacing={2}>
//           {locations.map((location) => (
//             <Grid item xs={12} sm={6} md={4} key={location.name}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={location.image}
//                   alt={location.name}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {location.name}
//                   </Typography>
//                   {/* Adding a link to Accommodations page */}
//                   <Button variant="contained" color="secondary" href={`/accommodations?destination=${location.name}`}>
//                     View Accommodations
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
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

function ItineraryForm({ onGenerateItinerary }) {
  const [preferences, setPreferences] = useState({
    currentLocation: '',
    destination: '',
    duration: '',
    interests: [],
    travelDate: null,
    budget: '',
    priority: '',
    groupSize: 1,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateItinerary(preferences);
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
    </Box>
  );
}

export default ItineraryForm;
