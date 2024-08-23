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
} from "@mui/material";
import {
  FaFilter,
  FaSearch,
  FaStar,
  FaMapMarkedAlt,
  FaHeart,
} from "react-icons/fa";
import Sidebar from "./sidebar";
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Activities = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    price: [0, 5000],
    rating: "",
    category: "",
  });
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [booked, setBooked] = useState({});
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
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
      const activitiesRef = collection(db, "Activities");
      const q = firestoreQuery(activitiesRef, where("city", "==", searchQuery));
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
        setError(`No activities found for "${searchQuery}"`);
        setSearchResults([]);
        setFilteredResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results from Firestore:", error);
      setError("Failed to fetch activities data. Please try again.");
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
      const meetsCategory = filters.category
        ? result.category === filters.category
        : true;
      return meetsPrice && meetsRating && meetsCategory;
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
    <Box sx={{ display: "flex" }}>
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
              label="Search activities"
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
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  inputProps={{ id: "category-select" }}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="Restaurant">Restaurant</MenuItem>
                  <MenuItem value="Things to Do">Things to Do</MenuItem>
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
            filteredResults.map((activity, index) => (
              <Card key={index} sx={{ maxWidth: 345, mb: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {activity.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.category} - {activity.sub_category}{" "}
                    <FaMapMarkedAlt /> {activity.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.description}
                  </Typography>

                  <Box
                    sx={{
                      textAlign: "left",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      R{activity.price} /person
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

export default Activities;
