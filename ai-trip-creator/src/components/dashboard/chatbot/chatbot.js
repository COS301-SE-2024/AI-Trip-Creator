import React from "react";
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import Config from "./config";
import MessageParser from "./messageParser";
import ActionProvider from "./actionProvider";

const ChatbotComponent = ({ isVisible }) => {
  // Inline styles for the chatbot container
  const chatbotContainerStyles = {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "300px",
    height: "500px",
    zIndex: 1000,
    display: isVisible ? "block" : "none",
    overflow: "auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={chatbotContainerStyles}>
      <Chatbot
        config={Config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatbotComponent;
