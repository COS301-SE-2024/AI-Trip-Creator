const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to AI Trip Creator Backend");
});

//placeholders
app.get("/api/flights", (req, res) => {
  //fetching flight data
  res.json({ message: "Flight data will be fetched here" });
});

app.get("/api/accommodations", (req, res) => {
  //accommodation data
  res.json({ message: "Accommodation data will be fetched here" });
});

app.post("/api/itinerary", (req, res) => {
  //  generating itinerary
  const userPreferences = req.body;
  res.json({
    message: "Itinerary will be generated here",
    preferences: userPreferences,
  });
});

app.post("/api/save-itinerary", (req, res) => {
  //saving itinerary
  const itinerary = req.body;
  res.json({ message: "Itinerary will be saved here", itinerary });
});

//Starts server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
