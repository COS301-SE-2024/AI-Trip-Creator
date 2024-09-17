import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import Sidebar from "./sidebar";
import { GROQ_API_KEY } from "../../firebase/firebase-config";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const llm = new ChatGroq({
  apiKey: GROQ_API_KEY,
  model: "llama3-8b-8192",
  maxTokens: undefined,
  maxRetries: 2,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "you are a trip advisor that helps a user based on the questions they are asking. You remember all the information given to you. If they ask to generate an itinerary, you should ask various questions to understand their preferences and generate a custom itinerary for them and dont repeat the questions. If you are not sure, ask for more information. Remember about things like festivals, restaurants, group size, if children are present, budget, and more.",
  ],
  ["human", "{input}"],
]);

const chain = prompt.pipe(llm);

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

    try {
      let response = await chain.invoke({
        input: userInput,
      });

      setResponses((prevResponses) => [
        ...prevResponses,
        { type: "bot", text: response.content },
      ]);
    } catch (error) {
      console.error("Error communicating with the AI API:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        { type: "bot", text: "Sorry, there was an error processing your request." },
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
                    Chat with the AI to plan your trip.
                  </Typography>
                  <Typography variant="body2" sx={{ margin: 0 }}>
                    Example Input: "What are some activities to do in Cape Town?"
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 150, backgroundColor: "#fff3e0" }}>
                <CardContent sx={{ padding: 2 }}>
                  <Typography variant="body2" sx={{ margin: 0 }}>
                    Ask any questions related to your trip.
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
              {response.type === "user" ? (
                response.text
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {response.text}
                </ReactMarkdown>
              )}
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
