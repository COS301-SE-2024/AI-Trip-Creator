import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  RadioGroup,
  Radio,
  useMediaQuery,
  Drawer,
  IconButton,
  Button,
  MenuItem,
  Select,
  InputLabel,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./sidebar";
import "./dashboard.css";

import bluewater from "./images/bluewatershotel.jpg";
import coastlands from "./images/coastlands.jpg";
import citylodge from "./images/citylodge.jpeg";
import houghton from "./images/houghton.jpg";
import grandekloof from "./images/grandekloof.jpg";
import lagoonbeach from "./images/lagoonbeach.jpg";
import citylodgepret from "./images/citylodgepret.jpg";
import regency from "./images/regency.jpeg";

import { FaFilter, FaTimes, FaBars } from "react-icons/fa";
import { RiHotelBedLine } from "react-icons/ri";

const Accommodations = ({ selectedDestination }) => {
  const location = useLocation();
  const [destination, setDestination] = useState(selectedDestination);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [filters, setFilters] = useState({
    price: [0, 1000],
    hotelClass: "",
    rating: "",
    amenities: {
      wifi: false,
      pool: false,
      spa: false,
      gym: false,
    },
  });

  const [filterVisible, setFilterVisible] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const [guestVisible, setGuestVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestDetails, setGuestDetails] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationParam = params.get("destination");
    if (destinationParam) {
      setDestination(destinationParam);
    }
  }, [location]);

  const accommodationsData = {
    Johannesburg: [
      {
        name: "The Houghton Hotel",
        image: houghton,
        description:
          "Welcome to The Houghton Hotel, Spa, Wellness and Golf, the epitome of luxury, relaxation and indulgence. Nestled among breathtaking landscapes, our 5-star sanctuary combines world-class amenities, an exceptional golf course and a rejuvenating spa facility. We are well located and in close proximity to major business nodes and shopping hubs. At The Houghton Hotel our commitment to providing the highest level of personalised service and attention to detail is evident in every aspect of our hotel, from our beautifully appointed rooms and suites to our meticulously manicured grounds. As a luxury hotel, we understand that it’s not just about the opulent decor and upscale amenities, but also about that home away from home experience.",
        price: "500",
        hotelClass: 5,
        rating: 4.8,
        amenities: ["wifi", "pool", "spa", "gym"],
        bookingSites: [
          { name: "Booking.com", price: 550 },
          { name: "Expedia", price: 570 },
        ],
      },
      {
        name: "City Lodge Newton",
        image: citylodge,
        description:
          "Situated in the vibrant area of Newtown on the western side of Johannesburg’s bustling CBD, the 148-room City Lodge Hotel Newtown features the brand’s signature #Café restaurant serving Full English and Continental breakfast, lunch and dinner daily; two boardrooms accommodating 16 guests and 10 guests; uncapped WiFi; fitness room; and sparkling swimming pool and sundowner bar.",
        price: 200,
        hotelClass: 3,
        rating: 4.0,
        amenities: ["wifi", "pool"],
        bookingSites: [
          { name: "Booking.com", price: 220 },
          { name: "Hotels.com", price: 210 },
        ],
      },
    ],
    CapeTown: [
      {
        name: "Grande Kloof Boutique Hotel",
        image: grandekloof,
        description:
          "This is where you can relax and feel good to be in Cape Town.  The property is perfectly situated between Bantry Bay and Seapoint, making it an excellent holiday destination choice if you want to be close to world famous sunny beaches, great restaurants, cafés and more.  Cape Town’s well known Victoria and Alfred Waterfront is a 3 to 5 minute drive alongside the beach promenade area, offering world class shopping and entertainment.",
        price: 350,
        hotelClass: 4,
        rating: 4.2,
        amenities: ["wifi", "pool", "spa"],
        bookingSites: [
          { name: "Expedia", price: 370 },
          { name: "Travelocity", price: 360 },
        ],
      },
      {
        name: "Lagoon Beach Hotel & Spa",
        image: lagoonbeach,
        description:
          "Discover the epitome of seaside serenity at Lagoon Beach Hotel, where each moment is a harmonious blend of luxury, comfort, and natural beauty, nestled along the pristine shores of Milnerton beach. Immerse yourself in the breathtaking vistas of the Atlantic Ocean, where azure waters meet golden sands, the awe-inspiring Table Mountain and the dancing lights of the Cape Town City skyline creating a picturesque backdrop for your dream getaway. Whether you're travelling for business or leisure or a romantic getaway with a touch of coastal charm, Lagoon Beach Hotels is your idyllic oasis.",
        price: 450,
        hotelClass: 4,
        rating: 4.5,
        amenities: ["wifi", "pool", "spa", "gym"],
        bookingSites: [
          { name: "Hotels.com", price: 470 },
          { name: "Booking.com", price: 460 },
        ],
      },
    ],
    Durban: [
      {
        name: "Blue Waters Hotel",
        image: bluewater,
        description:
          "We welcome you to our luxurious landmark hotel where golden beaches and the warm Indian Ocean are just a shell’s throw away. You are assured of a relaxing and memorable stay in one of our 262 newly refurbished guestrooms, most of which have ocean views and outdoor balconies. Our function packages can be tailored to your budget.",
        price: 300,
        hotelClass: 4,
        rating: 4.3,
        amenities: ["wifi", "pool", "gym"],
        bookingSites: [
          { name: "Expedia", price: 320 },
          { name: "Travelocity", price: 310 },
        ],
      },
      {
        name: "The Royal Hotel and Convention Centre",
        image: coastlands,
        description:
          "With beautiful views of Durban harbour from our Upper Floor Deluxe Rooms and Executive Suites, this iconic hotel, known as the “Grand Lady” offers a total of 206 rooms, a restaurant, coffee shop and large conference and banqueting facilities. Lower Floor Deluxe rooms and Family Rooms are offered at competitive rates.",
        price: 400,
        hotelClass: 4,
        rating: 4.1,
        amenities: ["wifi", "pool", "spa", "gym"],
        bookingSites: [
          { name: "Booking.com", price: 420 },
          { name: "Hotels.com", price: 410 },
        ],
      },
    ],
    Pretoria: [
      {
        name: "City Lodge Pretoria",
        image: citylodgepret,
        description:
          "The 205-room City Lodge Hotel Lynnwood is located within the Lynnwood Bridge Complex in Pretoria East, with convenient access to a wide range of business, shopping, dining and entertainment destinations in this modern mixed-use precinct. The hotel features a #Café restaurant serving Full English and Continental breakfast, lunch and dinner daily; sundowner bar and sparkling pool to make the most of the Highveld sunshine; three meeting rooms, uncapped WiFi; and a fitness room. Whether travelling for business or leisure, this hotel offers a convenient and comfortable stay.",
        price: 250,
        hotelClass: 3,
        rating: 4.0,
        amenities: ["wifi", "pool", "gym"],
        bookingSites: [
          { name: "Hotels.com", price: 270 },
          { name: "Expedia", price: 260 },
        ],
      },
      {
        name: "The Regency Apartment Hotel",
        image: regency,
        description:
          "The Regency Apartment Hotel is a prestigious, luxurious hotel in Pretoria, situated in the most popular development in Pretoria’s new business district, The Regency offers easy access to highways, dining, entertainment, three secure basement parking levels and 24-hour security. Experience the latest in luxury, comfort and style at The Regency, Pretoria's newest four-star hotel. The hotel’s warm, elegant and comfortable environment, convenient location, contemporary design and modern technology combine to ensure an enjoyable stay for the business and leisure traveller.",
        price: 350,
        hotelClass: 4,
        rating: 4.3,
        amenities: ["wifi", "pool", "spa"],
        bookingSites: [
          { name: "Booking.com", price: 370 },
          { name: "Expedia", price: 360 },
        ],
      },
    ],
  };

  const handleAccommodationClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  const handleFilterChange = (event, newValue) => {
    const { name, value } = event.target;
    if (name === "price") {
      setFilters({ ...filters, price: newValue });
    } else if (name in filters.amenities) {
      setFilters({
        ...filters,
        amenities: { ...filters.amenities, [name]: event.target.checked },
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleGuestChange = (event) => {
    const { name, value } = event.target;
    setGuestDetails({ ...guestDetails, [name]: value });
  };

  const filterAccommodations = (accommodations) => {
    return accommodations.filter((acc) => {
      const { price, hotelClass, rating, amenities } = filters;
      const meetsPrice = acc.price >= price[0] && acc.price <= price[1];
      const meetsHotelClass = hotelClass
        ? acc.hotelClass === Number(hotelClass)
        : true;
      const meetsRating = rating ? acc.rating >= Number(rating) : true;
      const meetsAmenities = Object.keys(amenities).every(
        (key) => !amenities[key] || acc.amenities.includes(key),
      );
      return meetsPrice && meetsHotelClass && meetsRating && meetsAmenities;
    });
  };

  const sortedAccommodations = (accommodations) => {
    const sorted = [...accommodations];
    if (sortOption === "priceAsc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingDesc") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  };

  const filteredAccommodations = sortedAccommodations(
    filterAccommodations(accommodationsData[destination] || []),
  );

  const renderFilters = () => (
    <Box p={2} sx={{ width: 250 }}>
      <FormControl component="fieldset" sx={{ mb: 2, width: 200 }}>
        <FormLabel component="legend">Price Range</FormLabel>
        <Slider
          value={filters.price}
          onChange={(event, newValue) => handleFilterChange(event, newValue)}
          valueLabelDisplay="auto"
          name="price"
          min={0}
          max={4000}
        />
      </FormControl>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Hotel Class</FormLabel>
        <RadioGroup
          name="hotelClass"
          value={filters.hotelClass}
          onChange={handleFilterChange}
        >
          <FormControlLabel value="3" control={<Radio />} label="3 Stars" />
          <FormControlLabel value="4" control={<Radio />} label="4 Stars" />
          <FormControlLabel value="5" control={<Radio />} label="5 Stars" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Rating</FormLabel>
        <RadioGroup
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <FormControlLabel value="3" control={<Radio />} label="3+" />
          <FormControlLabel value="4" control={<Radio />} label="4+" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Amenities</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.amenities.wifi}
                onChange={handleFilterChange}
                name="wifi"
              />
            }
            label="Free WiFi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.amenities.pool}
                onChange={handleFilterChange}
                name="pool"
              />
            }
            label="Swimming Pool"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.amenities.spa}
                onChange={handleFilterChange}
                name="spa"
              />
            }
            label="Spa"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.amenities.gym}
                onChange={handleFilterChange}
                name="gym"
              />
            }
            label="Gym"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );

  const renderSortOptions = () => (
    <FormControl component="fieldset" sx={{ mb: 2, minWidth: 200 }}>
      <InputLabel htmlFor="sort-by-select">Sort By</InputLabel>
      <Select
        value={sortOption}
        onChange={handleSortChange}
        inputProps={{ id: "sort-by-select" }}
      >
        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        <MenuItem value="ratingDesc">Rating: High to Low</MenuItem>
      </Select>
    </FormControl>
  );

  const renderGuestOptions = () => (
    <Box>
      <TextField
        label="Rooms"
        type="number"
        name="rooms"
        value={guestDetails.rooms}
        onChange={handleGuestChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Adults"
        type="number"
        name="adults"
        value={guestDetails.adults}
        onChange={handleGuestChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Children"
        type="number"
        name="children"
        value={guestDetails.children}
        onChange={handleGuestChange}
        sx={{ mb: 2 }}
      />
    </Box>
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Accommodations</h1>
        <Grid container spacing={2}>
          {isSmallScreen ? (
            <>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Button
                    variant="outlined"
                    startIcon={<FaFilter />}
                    onClick={() => setFilterVisible(!filterVisible)}
                  >
                    Filters
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setSortVisible(!sortVisible)}
                  >
                    Sort by
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setGuestVisible(!guestVisible)}
                  >
                    Guests
                  </Button>
                </Box>
                {filterVisible && (
                  <Box mb={2}>
                    {renderFilters()}
                    <Button
                      onClick={() => setFilterVisible(false)}
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Apply Filters
                    </Button>
                  </Box>
                )}
                {sortVisible && <Box mb={2}>{renderSortOptions()}</Box>}
                {guestVisible && <Box mb={2}>{renderGuestOptions()}</Box>}
              </Grid>
            </>
          ) : (
            <Grid item md={3}>
              <Box>
                {renderFilters()}
                {renderSortOptions()}
                {renderGuestOptions()}
              </Box>
            </Grid>
          )}
          <Grid item xs={12} md={9}>
            {destination ? (
              <Box mt={4}>
                <h2>Accommodations in {destination}</h2>
                <Grid container spacing={2}>
                  {filteredAccommodations.map((accommodation) => (
                    <Grid key={accommodation.name} mt={4}>
                      <Card
                        onClick={() => handleAccommodationClick(accommodation)}
                      >
                        <CardMedia
                          component="img"
                          height="140"
                          image={accommodation.image}
                          alt={accommodation.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {accommodation.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {accommodation.description}
                          </Typography>
                          <Box display="flex" alignItems="center" mt={1}>
                            <RiHotelBedLine style={{ marginRight: 5 }} />
                            <Typography variant="subtitle2">
                              Class: {accommodation.hotelClass} star
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <Typography variant="subtitle2" component="span">
                              Reviews: {accommodation.rating}{" "}
                              <span role="img" aria-label="star">
                                ⭐
                              </span>
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <Typography variant="subtitle2" component="span">
                              Price: R{accommodation.price} Hotels.com
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mt={1}>
                            <Typography variant="subtitle2" component="span">
                              More prices:
                              {accommodation.bookingSites.map((site, index) => (
                                <span key={index}>
                                  {site.name}: R{site.price}
                                  {index !==
                                    accommodation.bookingSites.length - 1 &&
                                    ","}
                                </span>
                              ))}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Typography variant="h6">
                Please select a destination first.
              </Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Accommodations;
