import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Sidebar from "./sidebar";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

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

    // Add user's input to the responses state
    const newMessage = { type: "user", text: userInput };
    setResponses([...responses, newMessage]);

    try {
      // Create an array of messages from the current responses state
      const messages = [
        {
          role: "system",
          content:
            "You are a helpful trip advisor AI. Remember the user's preferences, and avoid asking repetitive questions. When giving itineraries, make sure to personalize based on the given preferences, such as group size, budget, and specific interests.",
        },
        ...responses.map((response) => ({
          role: response.type === "user" ? "user" : "assistant",
          content: response.text,
        })),
        { role: "user", content: userInput },
      ];

      // Interact with OpenAI GPT-4 model
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        max_tokens: 1000,
      });

      const botMessage = response.choices[0].message.content;

      // Add the AI response to the responses state
      setResponses((prevResponses) => [
        ...prevResponses,
        { type: "bot", text: botMessage },
      ]);
    } catch (error) {
      console.error("Error communicating with the OpenAI API:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          type: "bot",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
    }

    setUserInput("");
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
        <h1 style={{ marginLeft: "28px", marginTop: "30px" }}>
          AI Trip Planning
        </h1>

        <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
          {responses.map((response, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  response.type === "user" ? "flex-end" : "flex-start",
                margin: "10px 0",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  position: "relative",
                  backgroundColor:
                    response.type === "user" ? "#DCF8C6" : "#E0E0E0",
                  color: response.type === "user" ? "#000" : "#000",
                  wordWrap: "break-word",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "0",
                    height: "0",
                    borderStyle: "solid",
                    borderWidth:
                      response.type === "user"
                        ? "10px 0 10px 15px"
                        : "10px 15px 10px 0",
                    borderColor:
                      response.type === "user"
                        ? "transparent transparent transparent #DCF8C6"
                        : "transparent #E0E0E0 transparent transparent",
                    left: response.type === "user" ? "100%" : "auto",
                    right: response.type !== "user" ? "100%" : "auto",
                  },
                }}
              >
                {response.type === "user" ? (
                  response.text
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response.text}
                  </ReactMarkdown>
                )}
              </Box>
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
