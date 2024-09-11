import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { FaFilter, FaSearch, FaStar, FaHeart } from "react-icons/fa";
import Sidebar from "./sidebar";
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Accommodation = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    price: [0, 5000],
    rating: "",
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // Track user authentication state
  const [booked, setBooked] = useState({}); // Track booked state for each accommodation
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state on auth state change
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationParam = params.get("destination");

    if (destinationParam) {
      setQuery(destinationParam);
      handleSearch(destinationParam.toLowerCase().replace(/\s+/g, ""));
    }
  }, [location, user]);

  const handleSearch = async (searchQuery = query) => {
    setLoading(true);
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      console.log("Authenticated user:", user.uid);

      const db = getFirestore();
      const accommodationsRef = collection(db, "Accommodation");
      const q = firestoreQuery(
        accommodationsRef,
        where("city", "==", searchQuery),
      );
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });

      if (results.length > 0) {
        setSearchResults(results);
        setFilteredResults(results);
        setError("");
      } else {
        setError(`No accommodations found for "${searchQuery}"`);
        setSearchResults([]);
        setFilteredResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results from Firestore:", error);
      setError("Failed to fetch accommodation data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event, newValue) => {
    if (Array.isArray(newValue)) {
      setFilters({ ...filters, price: newValue });
    } else {
      const { name, value } = event.target;
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const applyFiltersAndSorting = () => {
    let updatedResults = [...searchResults];

    // apply filters
    updatedResults = updatedResults.filter((result) => {
      const meetsPrice =
        result.price >= filters.price[0] && result.price <= filters.price[1];
      const meetsRating = filters.rating
        ? result.rating >= Number(filters.rating)
        : true;
      return meetsPrice && meetsRating;
    });

    // apply sorting
    if (sortOption === "priceAsc") {
      updatedResults.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceDesc") {
      updatedResults.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingDesc") {
      updatedResults.sort((a, b) => b.rating - a.rating);
    }

    return updatedResults;
  };

  const handleFilterApply = () => {
    setFilteredResults(applyFiltersAndSorting());
  };

  const handleBookNowClick = (index) => {
    setBooked((prevBooked) => ({
      ...prevBooked,
      [index]: !prevBooked[index],
    }));
  };

  const getReviewComment = (rating) => {
    if (rating >= 8) return "Good";
    if (rating >= 6) return "Average";
    return "Poor";
  };

  return (
    <Box sx={{ display: "flex", 
      bgcolor: isDarkMode ? '#0000007a ' : '#ffffff'
    }}>
      <Sidebar
        sx={{
          width: "250px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          borderRight: "1px solid #ddd",
          p: 2,
          backgroundColor: "#fff",
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          ml: "250px",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Search accommodations"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleSearch(query)}>
                      <FaSearch />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, minWidth: "200px" }}
            />
            <Button
              variant="outlined"
              startIcon={<FaFilter />}
              onClick={() => setFilterVisible(!filterVisible)}
            >
              Toggle Filters
            </Button>
          </Box>

          {filterVisible && (
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                p: 2,
                mt: 2,
                backgroundColor: "#fff",
              }}
            >
              <FormControl fullWidth sx={{ mb: 2 }}>
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
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography>Price Range</Typography>
                <Slider
                  value={filters.price}
                  onChange={handleFilterChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={100}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="rating-select">Minimum Rating</InputLabel>
                <Select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  inputProps={{ id: "rating-select" }}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFilterApply}
              >
                Apply Filters
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 1 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            filteredResults.map((accommodation, index) => (
              <Card key={index} sx={{ maxWidth: 345, mb: 1 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={accommodation.image}
                  alt={accommodation.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {accommodation.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {accommodation.description} <a href="#">See more</a>
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "green",
                          color: "white",
                          p: 1,
                          borderRadius: "4px",
                        }}
                      >
                        {accommodation.rating}
                      </Box>

                      <Typography variant="body1" color="text.primary">
                        {getReviewComment(accommodation.rating)} Rating
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "right",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        R{accommodation.price}
                        /night
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          mt: "2px",
                          backgroundColor: booked[index] ? "green" : "black",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                        onClick={() => handleBookNowClick(index)}
                      >
                        {booked[index] ? "Saved for later" : "Save for later"}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Accommodation;