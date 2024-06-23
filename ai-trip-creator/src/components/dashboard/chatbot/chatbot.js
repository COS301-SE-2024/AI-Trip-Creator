import React from "react";
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import Config from "./config";
import MessageParser from "./messageParser";
import ActionProvider from "./actionProvider";

const ChatbotComponent = () => {
  return (
    <Chatbot
      config={Config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
};

export default ChatbotComponent;
