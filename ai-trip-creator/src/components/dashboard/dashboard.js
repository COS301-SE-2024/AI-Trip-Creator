import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Card, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import Sidebar from "./sidebar";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db, auth } from "../../firebase/firebase-config";
import { collection, addDoc, doc, setDoc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import { type } from "express/lib/response";

//prompt:1.) The dates are 20-30 december . 2.) I have no budget constraints 3.) Im travelling solo . 4.) i prefer burgers and beer 5.) No children will be present 6.) I prefer 5 star luxury hotels 7.) I like water activities like swimming or going to the aquarium. i also like rugby. 8.) no not really, maybe add a flight the morning of im arriving. the deprature time is 9:00 and estimated arrival 10:30. also the last day im flying back. but my flights is from 13:00-14:30

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

//functions for chatbot


const currentUser = auth.currentUser;





const questionsPrompt = `
Which destination(s) are you visiting?
What are the dates of your visit?
What is your budget?
What is your group size?
What are your restaurant preferences?
Will children be present?
What hotels do you prefer?
What type of activities do you like to do?
Would you like to attend festivals?
Would you like to add transport details? And if so, please give me the details so I can add them to your itinerary.
How many days would you like your itinerary to be packed with activities? If so, how many days of the total?
`;

// Add this component definition before your Dashboard component
const TypingIndicator = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      margin: '16px 0',
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: '#376B7E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        flexShrink: 0,
      }}
    >
      AI
    </Box>
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: '18px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '150px',
      }}
    >
      <Typography
        variant="body2"
        component="span"
        sx={{
          color: '#666',
          fontSize: '0.9rem',
          marginRight: '2px', // Small space between text and dots
        }}
      >
        Thinking
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px', 
        }}
      >
        <Box
          sx={{
            width: 4, 
            height: 4,
            backgroundColor: '#376B7E',
            borderRadius: '50%',
            animation: 'bounce 1.4s infinite ease-in-out both',
            animationDelay: '0s',
            '@keyframes bounce': {
              '0%, 80%, 100%': {
                transform: 'scale(0)',
              },
              '40%': {
                transform: 'scale(1)',
              },
            },
          }}
        />
        <Box
          sx={{
            width: 4,
            height: 4,
            backgroundColor: '#376B7E',
            borderRadius: '50%',
            animation: 'bounce 1.4s infinite ease-in-out both',
            animationDelay: '0.16s',
          }}
        />
        <Box
          sx={{
            width: 4,
            height: 4,
            backgroundColor: '#376B7E',
            borderRadius: '50%',
            animation: 'bounce 1.4s infinite ease-in-out both',
            animationDelay: '0.32s',
          }}
        />
      </Box>
    </Box>
  </Box>
);

// Add this helper function near the top of your file
const formatTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const formatItineraryMarkdown = (data) => {
  return `
# **Itinerary: ${data.itineraryName}**

**Destination**: ${data.destination}  
**Budget**: $${data.budget}  
**Total Days**: ${data.numDays} days

## Detailed Itinerary:

${data.listDays.map(day => `
### **Day ${day.dayNumber}**

**Flights**:  
${day.flights.length > 0 ? day.flights.map(flight => `
- **Flight**: ${flight.carrierCode}  
  - Departure: ${flight.departureTime} from ${flight.sourceLocation}  
  - Arrival: ${flight.arrivalTime} at ${flight.destinationLocation}  
  - Class: ${flight.class}  
  - Cost: $${flight.cost}
`).join("\n") : "- No flights planned.\n"}

**Accommodation**:  
${day.accommodation.length > 0 ? day.accommodation.map(acc => `
- **Hotel**: ${acc.hotel}  
  - Check-in: ${acc.checkin}  
  - Check-out: ${acc.checkout}
`).join("\n") : "- No accommodation planned.\n"}

**Activities**:  
${day.activities.length > 0 ? day.activities.map(activity => `
- **Activity**: ${activity.name}  
  - Time: ${activity.time}  
  - Description: ${activity.description}
`).join("\n") : "- No activities planned.\n"}
`).join("\n")}
`;
};

const Dashboard = () => {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [user, setUser] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false); // Make sure this line is present
  const messagesEndRef = React.useRef(null); // Add this ref
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = React.useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state on auth state change
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    console.log('AI Thinking:', isAiThinking);
  }, [isAiThinking]);

  async function createItinerary(itineraryName, destination, budget, numDays, listDays) {
    console.log("Creating itinerary...");
    const user = auth.currentUser;
  
    if (!user) {
      console.error('User is not authenticated.');
      return;
    }
  
    const userId = user.uid;
  
    try {
      // Reference to the "ItineraryCollection"
      const itinerariesRef = collection(db, "ItineraryCollection");
  
      // Create a new itinerary document
      const newItineraryRef = await addDoc(itinerariesRef, {
        user_id: userId,
        itineraryName: itineraryName,
        destination: destination,
        budget: budget,
        numDays: numDays,
        createdAt: new Date().toISOString().split("T")[0],
      });
  
      console.log(`Itinerary '${itineraryName}' created successfully with ID: ${newItineraryRef.id}.`);
  
      // Insert each day of the itinerary into the sub-collection using day.dayNumber as the document ID
      await Promise.all(listDays.map(async (day) => {
        // Use day.dayNumber as the document ID
        const dayDocId = `day${day.dayNumber}`;
  
        // Structure day data, ensuring the structure exists with defaults
        const dayData = {
          dayNumber: day.dayNumber,
          flights: day.flights.map(flight => ({
            arrivalTime: flight.arrivalTime || "",
            departureTime: flight.departureTime || "",
            cost: flight.cost || 0,
            class: flight.class || "",
            carrierCode: flight.carrierCode || "",
            sourceLocation: flight.sourceLocation || "",
            destinationLocation: flight.destinationLocation || "",
          })) || [],
          accommodation: day.accommodation.map(acc => ({
            hotel: acc.hotel || "",
            checkin: acc.checkin || "",
            checkout: acc.checkout || "",
          })) || [],
          activities: day.activities.map(activity => ({
            name: activity.name || "",
            time: activity.time || "",
            description: activity.description || "",
          })) || [],
        };
  
        console.log(`Inserting day ${day.dayNumber}:`, dayData);
  
        // Get reference to the 'days' sub-collection
        const daysRef = collection(newItineraryRef, 'days');
  
        // Use setDoc to insert the document with day.dayNumber as the ID
        await setDoc(doc(daysRef, dayDocId), dayData);
      }));
  
      console.log(`All days added successfully to itinerary '${itineraryName}'.`);
    } catch (error) {
      console.error('Error creating itinerary:', error);
    }
  }
  
  
  
  async function getItinerary(itinerary_name) {
    try {
        const user_id = user.uid;
        
        // Reference to the ItineraryCollection
        const itinerariesRef = collection(db, 'ItineraryCollection');
        
        // Query to find the itinerary by user_id and itinerary_name
        const q = query(
            itinerariesRef,
            where('user_id', '==', user_id),
            where('itineraryName', '==', itinerary_name)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`No itinerary found for user: ${user_id} with name: ${itinerary_name}`);
            return null;
        }
  
        // Assuming there is only one document that matches the query
        const itineraryDoc = querySnapshot.docs[0];
        const itineraryData = itineraryDoc.data();

        // Fetch the 'days' subcollection using collection method
        const daysRef = collection(itineraryDoc.ref, 'days');
        const daysSnapshot = await getDocs(daysRef);
        const days = [];
  
        daysSnapshot.forEach(dayDoc => {
            days.push(dayDoc.data());
        });
  
        itineraryData.days = days;
  
        //console.log('Itinerary retrieved successfully:', itineraryData);
        return itineraryData;
    } catch (error) {
        console.error('Error retrieving itinerary:', error);
    }
}
  


//import { collection, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

async function updateItinerary(originalItineraryName, updatedItinerary) {
  try {
    const user_id = user?.uid;  // Ensure `user.uid` is defined

    if (!user_id) {
      console.error("User ID is not defined.");
      return;  // Exit if no user is logged in
    }

    // Validate that the updatedItinerary contains valid data
    // if (!updatedItinerary || 
    //     !updatedItinerary.itineraryName || 
    //     !updatedItinerary.destination || 
    //     !updatedItinerary.budget || 
    //     !updatedItinerary.numDays || 
    //     !updatedItinerary.listDays) {  // Changed 'days' to 'listDays'
    //   console.error("Invalid itinerary data provided.");
    //   return;  // Exit if the itinerary data is incomplete
    // }

    // Reference to the ItineraryCollection
    const itinerariesRef = collection(db, 'ItineraryCollection');

    // Query to find the itinerary by user_id and original itinerary name
    const q = query(
      itinerariesRef,
      where('user_id', '==', user_id),
      where('itineraryName', '==', originalItineraryName)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No itinerary found for user: ${user_id} with name: ${originalItineraryName}`);
      return null;  // No itinerary to update
    }

    const itineraryDoc = querySnapshot.docs[0];  // Assuming the first document matches the user_id and itineraryName
    const itineraryDocId = itineraryDoc.id;  // Get the document ID

    // Validate that the correct itinerary document is being updated by checking the user_id and itineraryName
    if (itineraryDoc.data().user_id !== user_id || itineraryDoc.data().itineraryName !== originalItineraryName) {
      console.error("The document's user_id or itineraryName does not match the expected values.");
      return;
    }

    // Reference to the specific itinerary document
    const itineraryRef = doc(db, 'ItineraryCollection', itineraryDocId);

    // Update the main itinerary data (fields in the main document)
    const itineraryData = {
      user_id: updatedItinerary.user_id || user_id,  // Fallback to current user's ID
      itineraryName: updatedItinerary.itineraryName,
      destination: updatedItinerary.destination,
      budget: updatedItinerary.budget,
      numDays: updatedItinerary.numDays
    };

    // Update the main itinerary document
    await updateDoc(itineraryRef, itineraryData);

    // Now, handle the days subcollection for this specific itinerary
    await Promise.all(updatedItinerary.listDays.map(async (day) => {
      // Ensure structure exists, even if empty arrays or objects
      const dayData = {
        dayNumber: day.dayNumber,
        flights: day.flights.map(flight => ({
          arrivalTime: flight.arrivalTime || "", // Default values if missing
          departureTime: flight.departureTime || "",
          cost: flight.cost || 0,
          class: flight.class || "",
          carrierCode: flight.carrierCode || "",
          sourceLocation: flight.sourceLocation || "",
          destinationLocation: flight.destinationLocation || "",
        })) || [], // Default to empty array if no flights exist

        accommodation: day.accommodation.map(acc => ({
          hotel: acc.hotel || "", // Default values if missing
          checkin: acc.checkin || "",
          checkout: acc.checkout || "",
        })) || [], // Default to empty array if no accommodation

        activities: day.activities.map(activity => ({
          name: activity.name || "Unknown Activity", // Default values if missing
          time: activity.time || "Unknown Time",
          description: activity.description || `Activity: ${activity.name} scheduled at ${activity.time}.`,
        })) || [], // Default to empty array if no activities
      };

      // Update or create the day subcollection document under this specific itinerary
      const dayRef = doc(itineraryRef, 'days', `day${day.dayNumber}`);
      await setDoc(dayRef, dayData);  // This will create or update the day document
    }));

    console.log(`Itinerary '${originalItineraryName}' updated successfully for user ${user_id}.`);
  } catch (error) {
    console.error('Error updating itinerary:', error);
  }
}



  //used an example for the chatbot so he knows the strcuture we want the itineraries to be in
  const updated_itinerary = {
    itineraryName: 'Summer Vacation 2',
    destination: 'Durban',
    budget: 2000,
    numDays: 3,
    days: [
      {
        dayNumber: 1,
        flights: [
          {
            flightNumber: 'XYZ123',
            departure: '10:00 AM',
            arrival: '12:00 PM'
          }
        ],
        accommodation: [
          {
            name: 'Hotel XYZ',
            checkin: '2:00 PM'
          }
        ],
        activities: [
          {
            name: 'City Tour',
            time: '4:00 PM',
            description: 'Join the guided city tour at 3:00 PM.'
          }
        ]
      },
      {
        dayNumber: 2,
        flights: [],
        accommodation: [
          {
            name: 'Hotel ABC',
            checkout: '11:00 AM'
          }
        ],
        activities: [
          {
            name: 'Beach Visit',
            time: '10:00 AM',
            description: 'Relax at the beach starting at 10:00 AM.'
          }
        ]
      },
      {
        dayNumber: 3,
        flights: [],
        accommodation: [
          {
            name: 'Hotel HIJ',
            checkin: '1:00 PM'
          }
        ],
        activities: [
          {
            name: 'Mountain Hike',
            time: '10:00 AM',
            description: 'Embark on a mountain hike at 10:00 AM.'
          }
        ]
      }
    ]
  };
  





  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowCards(false);
    }
  };

  const handleSubmit = async () => {
    if (userInput.trim() === "") return;
  
    // Add timestamp to the message
    const newMessage = { 
      type: "user", 
      text: userInput,
      timestamp: formatTimestamp()
    };
    setResponses([...responses, newMessage]);
  
    setUserInput(""); // Clear the input
    setIsAiThinking(true); 
  
    try {
      // Create an array of messages from the current responses state
      const messages = [
        {
          role: "system",
          content:
            "You are a helpful trip advisor AI that only answers questions and gives itineraries about Johannesburg, Durban, Pretoria, Cape Town and Gqeberha... " +
            "When asked to create or update an itinerary, ask the following questions: " + questionsPrompt,
        },
        ...responses
          .filter((response) => response.text)
          .map((response) => ({
            role: response.type === "user" ? "user" : "assistant",
            content: response.text,
          })),
        { role: "user", content: userInput },
      ];
  
      // Interact with OpenAI GPT-4 model
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages,
        max_tokens: 5000,
        functions: [
          {
            name: "getItinerary",
            description: "Retrieve an existing itinerary from the database.",
            parameters: {
              type: "object",
              properties: {
                itineraryName: { type: "string", description: "The name of the itinerary to retrieve" }
              },
              required: ["itineraryName"],
            },
          },
          {
            name: "createItinerary",
            description: "Create a new itinerary in the database...",
            parameters: {
              type: "object",
              properties: {
                itineraryName: { type: "string", description: "The name of the itinerary" },
                destination: { type: "string", description: "The destination of the trip" },
                budget: { type: "number", description: "The budget for the trip" },
                numDays: { type: "number", description: "The number of days for the trip" },
                listDays: {
                  type: "array",
                  description: "The list of days in the itinerary",
                  items: {
                    type: "object",
                    properties: {
                      dayNumber: { type: "number", description: "The day number" },
                      flights: {
                        type: "array",
                        description: "List of flights for this day",
                        items: {
                          type: "object",
                          properties: {
                            arrivalTime: { type: "string", description: "Arrival time" },
                            departureTime: { type: "string", description: "Departure time" },
                            cost: { type: "number", description: "Cost of the flight" },
                            class: { type: "string", description: "Class of the flight (e.g., economy, business)" },
                            carrierCode: { type: "string", description: "Carrier code (airline code)" },
                            sourceLocation: { type: "string", description: "Source location (departure airport)" },
                            destinationLocation: { type: "string", description: "Destination location (arrival airport)" },
                          },
                          required: ["arrivalTime", "departureTime", "cost", "class", "carrierCode", "sourceLocation", "destinationLocation"],
                        },
                      },
                      accommodation: {
                        type: "array",
                        description: "List of accommodations for this day",
                        items: {
                          type: "object",
                          properties: {
                            hotel: { type: "string", description: "Hotel name" },
                            checkin: { type: "string", description: "Check-in time" },
                            checkout: { type: "string", description: "Check-out time" },
                          },
                          required: ["hotel", "checkin", "checkout"],
                        },
                      },
                      activities: {
                        type: "array",
                        description: "List of activities for this day",
                        items: {
                          type: "object",
                          properties: {
                            name: { type: "string", description: "Activity name" },
                            time: { type: "string", description: "Estimated activity time" },
                            description: { type: "string", description: "Activity description" },
                          },
                          required: ["name", "time", "description"],
                        },
                      },
                    },
                    required: ["dayNumber", "flights", "accommodation", "activities"], // Ensure these are required
                  },
                  minItems: 1, // Ensure at least one day is provided
                },
              },
              required: ["itineraryName", "destination", "budget", "numDays", "listDays"],
            },
          },
          {
            name: "updateItinerary",
            description: "Update an existing itinerary in the database...",
            parameters: {
              type: "object",
              properties: {
                originalItineraryName: { type: "string", description: "The original name of the itinerary to be updated" },
                updatedItinerary: {
                  type: "object",
                  description: "The updated itinerary details including name, destination, budget, numDays, and listDays",
                  properties: {
                    itineraryName: { type: "string", description: "The new name of the itinerary" },
                    destination: { type: "string", description: "The updated destination of the trip" },
                    budget: { type: "number", description: "The updated budget for the trip" },
                    numDays: { type: "number", description: "The updated number of days for the trip" },
                    listDays: {
                      type: "array",
                      description: "The updated list of days in the itinerary",
                      items: {
                        type: "object",
                        properties: {
                          dayNumber: { type: "number", description: "The day number" },
                          flights: {
                            type: "array",
                            description: "Updated list of flights for this day",
                            items: {
                              type: "object",
                              properties: {
                                arrivalTime: { type: "string", description: "Arrival time" },
                                departureTime: { type: "string", description: "Departure time" },
                                cost: { type: "number", description: "Cost of the flight" },
                                class: { type: "string", description: "Class of the flight (e.g., economy, business)" },
                                carrierCode: { type: "string", description: "Carrier code (airline code)" },
                                sourceLocation: { type: "string", description: "Source location (departure airport)" },
                                destinationLocation: { type: "string", description: "Destination location (arrival airport)" },
                              },
                              required: ["arrivalTime", "departureTime", "cost", "class", "carrierCode", "sourceLocation", "destinationLocation"],
                            },
                          },
                          accommodation: {
                            type: "array",
                            description: "Updated list of accommodations for this day",
                            items: {
                              type: "object",
                              properties: {
                                hotel: { type: "string", description: "Hotel name" },
                                checkin: { type: "string", description: "Check-in time" },
                                checkout: { type: "string", description: "Check-out time" },
                              },
                              required: ["hotel", "checkin", "checkout"],
                            },
                          },
                          activities: {
                            type: "array",
                            description: "Updated list of activities for this day",
                            items: {
                              type: "object",
                              properties: {
                                name: { type: "string", description: "Activity name" },
                                time: { type: "string", description: "Estimated activity time" },
                                description: { type: "string", description: "Activity description" },
                              },
                              required: ["name", "time", "description"],
                            },
                          },
                        },
                        required: ["dayNumber", "flights", "accommodation", "activities"], // Ensure these are required
                      },
                      minItems: 1, // Ensure at least one day is provided
                    },
                  },
                  required: ["itineraryName", "destination", "budget", "numDays", "listDays"],
                },
              },
              required: ["originalItineraryName", "updatedItinerary"],
            },
          },
        ],
        function_call: "auto",
      });
  
      // Check if the createItinerary function was called
      if (response.choices[0]?.finish_reason === "function_call") {
        const functionName = response.choices[0].message.function_call.name;
  
        // Execute the function locally
        if (functionName === "createItinerary") {
          const functionArguments = JSON.parse(response.choices[0].message.function_call.arguments);
          await createItinerary(
            functionArguments.itineraryName,
            functionArguments.destination,
            functionArguments.budget,
            functionArguments.numDays,
            functionArguments.listDays
          );

          const itineraryText = formatItineraryMarkdown(functionArguments);
          setResponses((prevResponses) => [
            ...prevResponses,
            { type: "bot", text: itineraryText },
          ]);
        }
  
        // Check if the updateItinerary function was called
        if (functionName === "updateItinerary") {
          const functionArguments = JSON.parse(response.choices[0].message.function_call.arguments);
          
          // Extract the original itinerary name and updated itinerary object
          const originalItineraryName = functionArguments.originalItineraryName;
          const updatedItinerary = functionArguments.updatedItinerary;
          
          console.log("Original Itinerary Name:", originalItineraryName);
          console.log("Updated Itinerary:", JSON.stringify(updatedItinerary));
          // Call your updateItinerary function here with the extracted arguments
          updateItinerary(
            originalItineraryName,
            updatedItinerary
          );
          
          // Fix the updateItinerary markdown template
          const updateItineraryText = `# **Updated Itinerary: ${updatedItinerary.itineraryName}**

**Destination**: ${updatedItinerary.destination}  
**Budget**: $${updatedItinerary.budget}  
**Total Days**: ${updatedItinerary.numDays} days

## Updated Itinerary Details:

${updatedItinerary.listDays.map(day => `### **Day ${day.dayNumber}**

**Flights**:  
${day.flights.length > 0 ? day.flights.map(flight => `- **Flight**: ${flight.carrierCode}  
  - Departure: ${flight.departureTime} from ${flight.sourceLocation}  
  - Arrival: ${flight.arrivalTime} at ${flight.destinationLocation}  
  - Class: ${flight.class}  
  - Cost: $${flight.cost}
`).join('\n') : '- No flights planned.\n'}

**Accommodation**:  
${day.accommodation.length > 0 ? day.accommodation.map(acc => `- **Hotel**: ${acc.hotel}  
  - Check-in: ${acc.checkin}  
  - Check-out: ${acc.checkout}
`).join('\n') : '- No accommodation planned.\n'}

**Activities**:  
${day.activities.length > 0 ? day.activities.map(activity => `- **Activity**: ${activity.name}  
  - Time: ${activity.time}  
  - Description: ${activity.description}
`).join('\n') : '- No activities planned.\n'}`).join('\n')}`;
  
          setResponses((prevResponses) => [
            ...prevResponses,
            { type: "bot", text: updateItineraryText }, // Display updated itinerary as markdown
          ]);
        }

        if(functionName === "getItinerary") {
          const functionArguments = JSON.parse(response.choices[0].message.function_call.arguments);
          const itineraryName = functionArguments.itineraryName;
          const itineraryData = await getItinerary(itineraryName);

          if (itineraryData) {
            // Markdown output for getItinerary
            const itineraryText = `
            # **Itinerary: ${itineraryData.itineraryName}**
            
            **Destination**: ${itineraryData.destination}  
            **Budget**: $${itineraryData.budget}  
            **Total Days**: ${itineraryData.numDays} days
            
            ## Detailed Itinerary:
            
            ${itineraryData.days.map(day => `
            ### **Day ${day.dayNumber}**
            
            **Flights**:  
            ${day.flights.length > 0 ? day.flights.map(flight => `
            - **Flight**: ${flight.carrierCode}  
              - Departure: ${flight.departureTime} from ${flight.sourceLocation}  
              - Arrival: ${flight.arrivalTime} at ${flight.destinationLocation}  
              - Class: ${flight.class}  
              - Cost: $${flight.cost}
            `).join("\n") : "- No flights planned.\n"}
            
            **Accommodation**:  
            ${day.accommodation.length > 0 ? day.accommodation.map(acc => `
            - **Hotel**: ${acc.hotel}  
              - Check-in: ${acc.checkin}  
              - Check-out: ${acc.checkout}
            `).join("\n") : "- No accommodation planned.\n"}
            
            **Activities**:  
            ${day.activities.length > 0 ? day.activities.map(activity => `
            - **Activity**: ${activity.name}  
              - Time: ${activity.time}  
              - Description: ${activity.description}
            `).join("\n") : "- No activities planned.\n"}
            `).join("\n")}
            `;
    
            setResponses((prevResponses) => [
              ...prevResponses,
              { type: "bot", text: itineraryText }, // Display itinerary as markdown
            ]);
          } else {
            setResponses((prevResponses) => [
              ...prevResponses,
              { type: "bot", text: `Sorry, I couldn't find an itinerary with the name '${itineraryName}'.` },
            ]);
          }
        }
        
      } else {
        const botMessage = response.choices[0].message.content;
        setResponses((prevResponses) => [
          ...prevResponses,
          { type: "bot", text: botMessage },
        ]);
      }
  
    } catch (error) {
      console.error("Error communicating with the OpenAI API:", error);
      setResponses((prevResponses) => [
        ...prevResponses,
        { type: "bot", text: "Sorry, there was an error processing your request." },
      ]);
    } finally {
      setIsAiThinking(false); 
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isAiThinking) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setShowScrollButton(distanceFromBottom > 50);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [responses, isAiThinking]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, []);

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
          height: "100vh", // Ensure full height
          position: "relative", // Add relative positioning
        }}
      >
        <h1 style={{ marginLeft: "28px", marginTop: "30px" }}>
          AI Trip Planning
        </h1>
        {showCards && (
          <Box sx={{ 
            display: "flex", 
            gap: 4,
            padding: "40px",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto"
          }}>
            <Card 
              className="intro-card" 
              sx={{ 
                flex: 1,
                boxShadow: 'none',
                minWidth: '300px'
              }}
            >
              <CardContent sx={{ padding: 0 }}>
                <Typography className="intro-card-title">
                  <span className="step-number">1</span>
                  Start Your Journey
                </Typography>
                <Typography className="intro-card-content">
                  Tell us about your dream destination, travel dates, and preferences. We'll create your perfect itinerary.
                </Typography>
              </CardContent>
            </Card>
            <Card 
              className="intro-card"
              sx={{ 
                flex: 1,
                boxShadow: 'none',
                minWidth: '300px'
              }}
            >
              <CardContent sx={{ padding: 0 }}>
                <Typography className="intro-card-title">
                  <span className="step-number">2</span>
                  Instant Planning
                </Typography>
                <Typography className="intro-card-content">
                  Your personalized itinerary will be automatically generated and saved, ready for your adventure.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        <Box 
          ref={chatContainerRef}
          sx={{ 
            flex: 1, 
            overflowY: "auto", 
            padding: 2,
            paddingBottom: "100px",
            marginBottom: "80px",
            backgroundColor: 'var(--background-color)',
            scrollBehavior: "smooth",
            position: "relative",
            height: "calc(100vh - 250px)", // Add explicit height
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
          }}
        >
          {responses.map((response, index) => (
            <div
              key={index}
              className="chat-container"
              style={{
                justifyContent: response.type === "user" ? "flex-end" : "flex-start",
              }}
            >
              {response.type === "bot" && (
                <div
                  className="chat-avatar"
                  style={{ backgroundColor: "#376B7E" }}
                >
                  AI
                </div>
              )}
              
              <div className={`chat-bubble ${response.type === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}>
                {response.type === "user" ? (
                  <Typography sx={{ fontSize: '14px' }}>
                    {response.text}
                  </Typography>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => <Typography variant="h6" sx={{fontWeight: 'bold', mb: 1}} {...props} />,
                      h2: ({node, ...props}) => <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 1}} {...props} />,
                      h3: ({node, ...props}) => <Typography variant="subtitle2" sx={{fontWeight: 'bold', mb: 0.5}} {...props} />,
                      p: ({node, ...props}) => <Typography sx={{ fontSize: '14px', mb: 1 }} {...props} />,
                      li: ({node, ...props}) => <Typography component="li" sx={{ fontSize: '14px', mb: 0.5 }} {...props} />,
                      ul: ({node, ...props}) => <Box component="ul" sx={{ mb: 1 }} {...props} />,
                    }}
                  >
                    {response.text}
                  </ReactMarkdown>
                )}
                <div className="chat-timestamp">
                  {response.timestamp || formatTimestamp()}
                </div>
              </div>

              {response.type === "user" && (
                <div
                  className="chat-avatar"
                  style={{ backgroundColor: "#1976d2" }}
                >
                  {user?.email?.[0].toUpperCase() || "U"}
                </div>
              )}
            </div>
          ))}
          {isAiThinking && <TypingIndicator />} {/* Make sure this line is present */}
          <div ref={messagesEndRef} /> {/* Add this invisible element at the bottom */}
        </Box>

        <div className="content-separator" />
        
        {showScrollButton && (
          <button
            className={`scroll-to-bottom-button ${showScrollButton ? 'visible' : ''}`}
            onClick={scrollToBottom}
            aria-label="Scroll to bottom"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </button>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            position: "fixed",
            bottom: 0,
            right: 0,
            left: "250px",
            zIndex: 1000,
            backgroundColor: 'var(--background-color)',
            borderTop: '1px solid var(--text-color)',
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              backgroundColor: (theme) => 
                theme.palette.mode === 'dark' 
                  ? '#ffffff' 
                  : 'var(--card-background)', // Use card background for light mode, white for dark mode
              borderRadius: "24px",
              padding: "8px 16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              },
            }}
          >
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your trip..."
              disabled={isAiThinking}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "16px",
                backgroundColor: "transparent",
                opacity: isAiThinking ? 0.7 : 1,
                color: (theme) => 
                  theme.palette.mode === 'dark' 
                    ? '#333333' 
                    : 'var(--text-color)', // Dark text in dark mode, theme text color in light mode
              }}
            />
            <div className="tooltip-container">
              <Button
                onClick={handleSubmit}
                disabled={isAiThinking}
                sx={{
                  minWidth: "40px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: isAiThinking ? "#cccccc" : "#5ccc9d",
                  color: "white",
                  padding: 0,
                  "&:hover": {
                    backgroundColor: isAiThinking ? "#cccccc" : "#4bb589",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                  opacity: isAiThinking ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaPaperPlane size={16} />
              </Button>
              <div className="custom-tooltip">
                Send message
              </div>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};
//prompt : 1.) The dates are 20-30 december . 2.) I have no budget constraints 3.) Im travelling solo . 4.) i prefer burgers and beer 5.) No children will be present 6.) I prefer 5 star luxury hotels, most of them have checkout time of 10:00 and check in timme of 14:00 7.) I like water activities like swimming or going to the aquarium. i also like rugby. 8.) no not really, maybe add a flight the morning of im arriving. the deprature time is 9:00 and estimated arrival 10:30. also the last day im flying back. but my flights is from 13:00-14:30. The first one is from pretoria to cape town and the second flight is from cape town to pretoria, both are with Flysafair, the cost is 2500. the cost of both is economy . 10.) I want my days packed yes, i want about 6 days filled with activities
export default Dashboard;

