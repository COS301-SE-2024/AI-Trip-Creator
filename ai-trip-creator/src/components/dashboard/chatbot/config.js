import { createChatBotMessage } from "react-chatbot-kit";

const botName = "TripBot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. How can I help you today?`),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
    chatContainer: {
      width: "100%",
      backgroundColor: "#f4f4f4", // Background color for the chat container
      padding: "10px", // Padding around the chat container
      borderRadius: "10px", // Rounded corners for a modern look
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Light shadow for a professional appearance
    },
    chatInput: {
      backgroundColor: "#ffffff", // Input box background
      border: "1px solid #ddd", // Border style for the input box
      borderRadius: "5px", // Rounded corners for the input box
      padding: "10px", // Padding inside the input box
      marginTop: "10px", // Space above the input box
    },
  },
  state: {},
  widgets: [],
};

export default config;
