import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaPaperPlane } from "react-icons/fa";
import Sidebar from "./sidebar";
import { db } from "../../firebase/firebase-config";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [showCards, setShowCards] = useState(true);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowCards(false);
    }
  };

  const handleSubmit = async () => {
    if (userInput.trim() === "") return;

    setResponses([...responses, { type: "user", text: userInput }]);

    const aiResponse = await fetch("https://api.gemini.ai/v1/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: userInput }),
    });
    const aiData = await aiResponse.json();

    const city = aiData.city;
    const itinerary = await generateItinerary(city);

    setResponses([...responses, { type: "bot", text: itinerary }]);
    setUserInput("");
  };

  const generateItinerary = async (city) => {
    if (
      !["Johannesburg", "Cape Town", "Pretoria", "Durban", "Qherbeha"].includes(
        city,
      )
    ) {
      return "Sorry, we only support specific cities.";
    }

    const accommodationRef = collection(db, "accommodation");
    const activitiesRef = collection(db, "activities");

    const accommodationQuery = query(
      accommodationRef,
      where("city", "==", city),
    );
    const activitiesQuery = query(activitiesRef, where("city", "==", city));

    const [accommodationSnapshot, activitiesSnapshot] = await Promise.all([
      getDocs(accommodationQuery),
      getDocs(activitiesQuery),
    ]);

    const accommodations = accommodationSnapshot.docs.map((doc) => doc.data());
    const activities = activitiesSnapshot.docs.map((doc) => doc.data());

    return (
      `Here are some options for ${city}:\n\n` +
      `**Accommodation:**\n${accommodations
        .map(
          (ac) =>
            `${ac.name} - ${ac.description}, Price: ${ac.price}, Rating: ${ac.rating}`,
        )
        .join("\n")}\n\n` +
      `**Activities:**\n${activities
        .map(
          (ac) =>
            `${ac.name} - ${ac.description}, Price: ${ac.price}, Rating: ${ac.rating}`,
        )
        .join("\n")}`
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Sidebar
        style={{
          flex: "0 0 250px",
          position: "fixed",
          height: "100%",
          borderRight: "1px solid #ddd",
        }}
      />

      <div
        style={{
          marginLeft: "250px",
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showCards && (
          <Box
            sx={{
              padding: 2,
              borderBottom: "1px solid #ddd",
              backgroundColor: "#f7f7f7",
            }}
          >
            <Typography variant="h3" gutterBottom>
              AI Trip Planning
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Card sx={{ minWidth: 150, backgroundColor: "#e1f5fe" }}>
                <CardContent sx={{ padding: 1 }}>
                  <Typography variant="body2" sx={{ margin: 0 }}>
                    Use the chatbot to get travel recommendations and itinerary
                    suggestions.
                  </Typography>
                  <Typography variant="body2" sx={{ margin: 0 }}>
                    Example Input: "What are some activities to do in Cape
                    Town?"
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 150, backgroundColor: "#fff3e0" }}>
                <CardContent sx={{ padding: 2 }}>
                  <Typography variant="body2" sx={{ margin: 0 }}>
                    Ask for accommodation options in your desired city.
                  </Typography>
                  <Typography variant="body2" sx={{ margin: 0 }}>
                    Example Input: "Find me a hotel in Durban."
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
          {responses.map((response, index) => (
            <Box
              key={index}
              sx={{
                textAlign: response.type === "user" ? "right" : "left",
                backgroundColor:
                  response.type === "user" ? "#e0f7fa" : "#f1f8e9",
                margin: 1,
                padding: 1,
                borderRadius: 1,
                maxWidth: "70%",
                display: "inline-block",
                wordWrap: "break-word",
                alignSelf: response.type === "user" ? "flex-end" : "flex-start",
              }}
            >
              {response.text}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #ddd",
            padding: 1,
            position: "relative",
          }}
        >
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask me about your trip..."
            style={{
              flex: "1",
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              maxWidth: "calc(100% - 60px)",
            }}
          />
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "40px",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            <FaPaperPlane />
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
