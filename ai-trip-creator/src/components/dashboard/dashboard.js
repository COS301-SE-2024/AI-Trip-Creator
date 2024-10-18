import React, { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Sidebar from "./sidebar";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db, auth } from "../../firebase/firebase-config";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress } from "@mui/material";

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

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user state on auth state change
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  async function createItinerary(
    itineraryName,
    destination,
    budget,
    numDays,
    listDays,
  ) {
    console.log("Creating itinerary...");
    const user = auth.currentUser;

    if (!user) {
      console.error("User is not authenticated.");
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

      console.log(
        `Itinerary '${itineraryName}' created successfully with ID: ${newItineraryRef.id}.`,
      );

      // Insert each day of the itinerary into the sub-collection using day.dayNumber as the document ID
      await Promise.all(
        listDays.map(async (day) => {
          // Use day.dayNumber as the document ID
          const dayDocId = `day${day.dayNumber}`;

          // Structure day data, ensuring the structure exists with defaults
          const dayData = {
            dayNumber: day.dayNumber,
            flights:
              day.flights.map((flight) => ({
                arrivalTime: flight.arrivalTime || "",
                departureTime: flight.departureTime || "",
                cost: flight.cost || 0,
                class: flight.class || "",
                carrierCode: flight.carrierCode || "",
                sourceLocation: flight.sourceLocation || "",
                destinationLocation: flight.destinationLocation || "",
              })) || [],
            accommodation:
              day.accommodation.map((acc) => ({
                hotel: acc.hotel || "",
                checkin: acc.checkin || "",
                checkout: acc.checkout || "",
              })) || [],
            activities:
              day.activities.map((activity) => ({
                name: activity.name || "",
                time: activity.time || "",
                description: activity.description || "",
              })) || [],
          };

          console.log(`Inserting day ${day.dayNumber}:`, dayData);

          // Get reference to the 'days' sub-collection
          const daysRef = collection(newItineraryRef, "days");

          // Use setDoc to insert the document with day.dayNumber as the ID
          await setDoc(doc(daysRef, dayDocId), dayData);
        }),
      );

      console.log(
        `All days added successfully to itinerary '${itineraryName}'.`,
      );
    } catch (error) {
      console.error("Error creating itinerary:", error);
    }
  }

  async function getItinerary(itinerary_name) {
    try {
      const user_id = user.uid;

      // Reference to the ItineraryCollection
      const itinerariesRef = collection(db, "ItineraryCollection");

      // Query to find the itinerary by user_id and itinerary_name
      const q = query(
        itinerariesRef,
        where("user_id", "==", user_id),
        where("itineraryName", "==", itinerary_name),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(
          `No itinerary found for user: ${user_id} with name: ${itinerary_name}`,
        );
        return null;
      }

      // Assuming there is only one document that matches the query
      const itineraryDoc = querySnapshot.docs[0];
      const itineraryData = itineraryDoc.data();

      // Fetch the 'days' subcollection using collection method
      const daysRef = collection(itineraryDoc.ref, "days");
      const daysSnapshot = await getDocs(daysRef);
      const days = [];

      daysSnapshot.forEach((dayDoc) => {
        days.push(dayDoc.data());
      });

      itineraryData.days = days;

      //console.log('Itinerary retrieved successfully:', itineraryData);
      return itineraryData;
    } catch (error) {
      console.error("Error retrieving itinerary:", error);
    }
  }

  //import { collection, query, where, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';

  async function updateItinerary(originalItineraryName, updatedItinerary) {
    try {
      const user_id = user?.uid; // Ensure `user.uid` is defined

      if (!user_id) {
        console.error("User ID is not defined.");
        return; // Exit if no user is logged in
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
      const itinerariesRef = collection(db, "ItineraryCollection");

      // Query to find the itinerary by user_id and original itinerary name
      const q = query(
        itinerariesRef,
        where("user_id", "==", user_id),
        where("itineraryName", "==", originalItineraryName),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log(
          `No itinerary found for user: ${user_id} with name: ${originalItineraryName}`,
        );
        return null; // No itinerary to update
      }

      const itineraryDoc = querySnapshot.docs[0]; // Assuming the first document matches the user_id and itineraryName
      const itineraryDocId = itineraryDoc.id; // Get the document ID

      // Validate that the correct itinerary document is being updated by checking the user_id and itineraryName
      if (
        itineraryDoc.data().user_id !== user_id ||
        itineraryDoc.data().itineraryName !== originalItineraryName
      ) {
        console.error(
          "The document's user_id or itineraryName does not match the expected values.",
        );
        return;
      }

      // Reference to the specific itinerary document
      const itineraryRef = doc(db, "ItineraryCollection", itineraryDocId);

      // Update the main itinerary data (fields in the main document)
      const itineraryData = {
        user_id: updatedItinerary.user_id || user_id, // Fallback to current user's ID
        itineraryName: updatedItinerary.itineraryName,
        destination: updatedItinerary.destination,
        budget: updatedItinerary.budget,
        numDays: updatedItinerary.numDays,
      };

      // Update the main itinerary document
      await updateDoc(itineraryRef, itineraryData);

      // Now, handle the days subcollection for this specific itinerary
      await Promise.all(
        updatedItinerary.listDays.map(async (day) => {
          // Ensure structure exists, even if empty arrays or objects
          const dayData = {
            dayNumber: day.dayNumber,
            flights:
              day.flights.map((flight) => ({
                arrivalTime: flight.arrivalTime || "", // Default values if missing
                departureTime: flight.departureTime || "",
                cost: flight.cost || 0,
                class: flight.class || "",
                carrierCode: flight.carrierCode || "",
                sourceLocation: flight.sourceLocation || "",
                destinationLocation: flight.destinationLocation || "",
              })) || [], // Default to empty array if no flights exist

            accommodation:
              day.accommodation.map((acc) => ({
                hotel: acc.hotel || "", // Default values if missing
                checkin: acc.checkin || "",
                checkout: acc.checkout || "",
              })) || [], // Default to empty array if no accommodation

            activities:
              day.activities.map((activity) => ({
                name: activity.name || "Unknown Activity", // Default values if missing
                time: activity.time || "Unknown Time",
                description:
                  activity.description ||
                  `Activity: ${activity.name} scheduled at ${activity.time}.`,
              })) || [], // Default to empty array if no activities
          };

          // Update or create the day subcollection document under this specific itinerary
          const dayRef = doc(itineraryRef, "days", `day${day.dayNumber}`);
          await setDoc(dayRef, dayData); // This will create or update the day document
        }),
      );

      console.log(
        `Itinerary '${originalItineraryName}' updated successfully for user ${user_id}.`,
      );
    } catch (error) {
      console.error("Error updating itinerary:", error);
    }
  }

  //used an example for the chatbot so he knows the strcuture we want the itineraries to be in
  const updated_itinerary = {
    itineraryName: "Summer Vacation 2",
    destination: "Durban",
    budget: 2000,
    numDays: 3,
    days: [
      {
        dayNumber: 1,
        flights: [
          {
            flightNumber: "XYZ123",
            departure: "10:00 AM",
            arrival: "12:00 PM",
          },
        ],
        accommodation: [
          {
            name: "Hotel XYZ",
            checkin: "2:00 PM",
          },
        ],
        activities: [
          {
            name: "City Tour",
            time: "4:00 PM",
            description: "Join the guided city tour at 3:00 PM.",
          },
        ],
      },
      {
        dayNumber: 2,
        flights: [],
        accommodation: [
          {
            name: "Hotel ABC",
            checkout: "11:00 AM",
          },
        ],
        activities: [
          {
            name: "Beach Visit",
            time: "10:00 AM",
            description: "Relax at the beach starting at 10:00 AM.",
          },
        ],
      },
      {
        dayNumber: 3,
        flights: [],
        accommodation: [
          {
            name: "Hotel HIJ",
            checkin: "1:00 PM",
          },
        ],
        activities: [
          {
            name: "Mountain Hike",
            time: "10:00 AM",
            description: "Embark on a mountain hike at 10:00 AM.",
          },
        ],
      },
    ],
  };

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
    setUserInput("");
    setLoading(true);

    try {
      // Create an array of messages from the current responses state
      const messages = [
        {
          role: "system",
          content:
            "You are a helpful trip advisor AI that only answers questions and gives itineraries about Johannesburg, Durban, Pretoria, Cape Town and Gqeberha... " +
            "When asked to create or update an itinerary, ask the following questions: " +
            questionsPrompt,
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
                itineraryName: {
                  type: "string",
                  description: "The name of the itinerary to retrieve",
                },
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
                itineraryName: {
                  type: "string",
                  description: "The name of the itinerary",
                },
                destination: {
                  type: "string",
                  description: "The destination of the trip",
                },
                budget: {
                  type: "number",
                  description: "The budget for the trip",
                },
                numDays: {
                  type: "number",
                  description: "The number of days for the trip",
                },
                listDays: {
                  type: "array",
                  description: "The list of days in the itinerary",
                  items: {
                    type: "object",
                    properties: {
                      dayNumber: {
                        type: "number",
                        description: "The day number",
                      },
                      flights: {
                        type: "array",
                        description: "List of flights for this day",
                        items: {
                          type: "object",
                          properties: {
                            arrivalTime: {
                              type: "string",
                              description: "Arrival time",
                            },
                            departureTime: {
                              type: "string",
                              description: "Departure time",
                            },
                            cost: {
                              type: "number",
                              description: "Cost of the flight",
                            },
                            class: {
                              type: "string",
                              description:
                                "Class of the flight (e.g., economy, business)",
                            },
                            carrierCode: {
                              type: "string",
                              description: "Carrier code (airline code)",
                            },
                            sourceLocation: {
                              type: "string",
                              description:
                                "Source location (departure airport)",
                            },
                            destinationLocation: {
                              type: "string",
                              description:
                                "Destination location (arrival airport)",
                            },
                          },
                          required: [
                            "arrivalTime",
                            "departureTime",
                            "cost",
                            "class",
                            "carrierCode",
                            "sourceLocation",
                            "destinationLocation",
                          ],
                        },
                      },
                      accommodation: {
                        type: "array",
                        description: "List of accommodations for this day",
                        items: {
                          type: "object",
                          properties: {
                            hotel: {
                              type: "string",
                              description: "Hotel name",
                            },
                            checkin: {
                              type: "string",
                              description: "Check-in time",
                            },
                            checkout: {
                              type: "string",
                              description: "Check-out time",
                            },
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
                            name: {
                              type: "string",
                              description: "Activity name",
                            },
                            time: {
                              type: "string",
                              description: "Estimated activity time",
                            },
                            description: {
                              type: "string",
                              description: "Activity description",
                            },
                          },
                          required: ["name", "time", "description"],
                        },
                      },
                    },
                    required: [
                      "dayNumber",
                      "flights",
                      "accommodation",
                      "activities",
                    ], // Ensure these are required
                  },
                  minItems: 1, // Ensure at least one day is provided
                },
              },
              required: [
                "itineraryName",
                "destination",
                "budget",
                "numDays",
                "listDays",
              ],
            },
          },
          {
            name: "updateItinerary",
            description: "Update an existing itinerary in the database...",
            parameters: {
              type: "object",
              properties: {
                originalItineraryName: {
                  type: "string",
                  description:
                    "The original name of the itinerary to be updated",
                },
                updatedItinerary: {
                  type: "object",
                  description:
                    "The updated itinerary details including name, destination, budget, numDays, and listDays",
                  properties: {
                    itineraryName: {
                      type: "string",
                      description: "The new name of the itinerary",
                    },
                    destination: {
                      type: "string",
                      description: "The updated destination of the trip",
                    },
                    budget: {
                      type: "number",
                      description: "The updated budget for the trip",
                    },
                    numDays: {
                      type: "number",
                      description: "The updated number of days for the trip",
                    },
                    listDays: {
                      type: "array",
                      description: "The updated list of days in the itinerary",
                      items: {
                        type: "object",
                        properties: {
                          dayNumber: {
                            type: "number",
                            description: "The day number",
                          },
                          flights: {
                            type: "array",
                            description: "Updated list of flights for this day",
                            items: {
                              type: "object",
                              properties: {
                                arrivalTime: {
                                  type: "string",
                                  description: "Arrival time",
                                },
                                departureTime: {
                                  type: "string",
                                  description: "Departure time",
                                },
                                cost: {
                                  type: "number",
                                  description: "Cost of the flight",
                                },
                                class: {
                                  type: "string",
                                  description:
                                    "Class of the flight (e.g., economy, business)",
                                },
                                carrierCode: {
                                  type: "string",
                                  description: "Carrier code (airline code)",
                                },
                                sourceLocation: {
                                  type: "string",
                                  description:
                                    "Source location (departure airport)",
                                },
                                destinationLocation: {
                                  type: "string",
                                  description:
                                    "Destination location (arrival airport)",
                                },
                              },
                              required: [
                                "arrivalTime",
                                "departureTime",
                                "cost",
                                "class",
                                "carrierCode",
                                "sourceLocation",
                                "destinationLocation",
                              ],
                            },
                          },
                          accommodation: {
                            type: "array",
                            description:
                              "Updated list of accommodations for this day",
                            items: {
                              type: "object",
                              properties: {
                                hotel: {
                                  type: "string",
                                  description: "Hotel name",
                                },
                                checkin: {
                                  type: "string",
                                  description: "Check-in time",
                                },
                                checkout: {
                                  type: "string",
                                  description: "Check-out time",
                                },
                              },
                              required: ["hotel", "checkin", "checkout"],
                            },
                          },
                          activities: {
                            type: "array",
                            description:
                              "Updated list of activities for this day",
                            items: {
                              type: "object",
                              properties: {
                                name: {
                                  type: "string",
                                  description: "Activity name",
                                },
                                time: {
                                  type: "string",
                                  description: "Estimated activity time",
                                },
                                description: {
                                  type: "string",
                                  description: "Activity description",
                                },
                              },
                              required: ["name", "time", "description"],
                            },
                          },
                        },
                        required: [
                          "dayNumber",
                          "flights",
                          "accommodation",
                          "activities",
                        ], // Ensure these are required
                      },
                      minItems: 1, // Ensure at least one day is provided
                    },
                  },
                  required: [
                    "itineraryName",
                    "destination",
                    "budget",
                    "numDays",
                    "listDays",
                  ],
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
          const functionArguments = JSON.parse(
            response.choices[0].message.function_call.arguments,
          );
          createItinerary(
            functionArguments.itineraryName,
            functionArguments.destination,
            functionArguments.budget,
            functionArguments.numDays,
            functionArguments.listDays,
          );

          // Markdown output for createItinerary
          const itineraryText = `
    # **Itinerary: ${functionArguments.itineraryName}**
    
    **Destination**: ${functionArguments.destination}  
    **Budget**: $${functionArguments.budget}  
    **Total Days**: ${functionArguments.numDays} days
    
    ## Detailed Itinerary:
    
    ${functionArguments.listDays
      .map(
        (day) => `
    ### **Day ${day.dayNumber}**
    
    **Flights**:  
    ${
      day.flights.length > 0
        ? day.flights
            .map(
              (flight) => `
    - **Flight**: ${flight.carrierCode}  
      - Departure: ${flight.departureTime} from ${flight.sourceLocation}  
      - Arrival: ${flight.arrivalTime} at ${flight.destinationLocation}  
      - Class: ${flight.class}  
      - Cost: $${flight.cost}
    `,
            )
            .join("\n")
        : "- No flights planned.\n"
    }
    
    **Accommodation**:  
    ${
      day.accommodation.length > 0
        ? day.accommodation
            .map(
              (acc) => `
    - **Hotel**: ${acc.hotel}  
      - Check-in: ${acc.checkin}  
      - Check-out: ${acc.checkout}
    `,
            )
            .join("\n")
        : "- No accommodation planned.\n"
    }
    
    **Activities**:  
    ${
      day.activities.length > 0
        ? day.activities
            .map(
              (activity) => `
    - **Activity**: ${activity.name}  
      - Time: ${activity.time}  
      - Description: ${activity.description}
    `,
            )
            .join("\n")
        : "- No activities planned.\n"
    }
    `,
      )
      .join("\n")}
    `;

          setResponses((prevResponses) => [
            ...prevResponses,
            { type: "bot", text: itineraryText }, // Display itinerary as markdown
          ]);
        }

        // Check if the updateItinerary function was called
        if (functionName === "updateItinerary") {
          const functionArguments = JSON.parse(
            response.choices[0].message.function_call.arguments,
          );

          // Extract the original itinerary name and updated itinerary object
          const originalItineraryName = functionArguments.originalItineraryName;
          const updatedItinerary = functionArguments.updatedItinerary;

          console.log("Original Itinerary Name:", originalItineraryName);
          console.log("Updated Itinerary:", JSON.stringify(updatedItinerary));
          // Call your updateItinerary function here with the extracted arguments
          updateItinerary(originalItineraryName, updatedItinerary);

          // Markdown output for updateItinerary
          const updateItineraryText = `
          # **Updated Itinerary: ${updatedItinerary.itineraryName}**
          
          **Destination**: ${updatedItinerary.destination}  
          **Budget**: $${updatedItinerary.budget}  
          **Total Days**: ${updatedItinerary.numDays} days
          
          ## Updated Itinerary Details:
          
          ${updatedItinerary.listDays
            .map(
              (day) => `
          ### **Day ${day.dayNumber}**
          
          **Flights**:  
          ${
            day.flights.length > 0
              ? day.flights
                  .map(
                    (flight) => `
          - **Flight**: ${flight.carrierCode}  
            - Departure: ${flight.departureTime} from ${flight.sourceLocation}  
            - Arrival: ${flight.arrivalTime} at ${flight.destinationLocation}  
            - Class: ${flight.class}  
            - Cost: $${flight.cost}
          `,
                  )
                  .join("\n")
              : "- No flights planned.\n"
          }
          
          **Accommodation**:  
          ${
            day.accommodation.length > 0
              ? day.accommodation
                  .map(
                    (acc) => `
          - **Hotel**: ${acc.hotel}  
            - Check-in: ${acc.checkin}  
            - Check-out: ${acc.checkout}
          `,
                  )
                  .join("\n")
              : "- No accommodation planned.\n"
          }
          
          **Activities**:  
          ${
            day.activities.length > 0
              ? day.activities
                  .map(
                    (activity) => `
          - **Activity**: ${activity.name}  
            - Time: ${activity.time}  
            - Description: ${activity.description}
          `,
                  )
                  .join("\n")
              : "- No activities planned.\n"
          }
          `,
            )
            .join("\n")}
          `;

          setResponses((prevResponses) => [
            ...prevResponses,
            { type: "bot", text: updateItineraryText }, // Display updated itinerary as markdown
          ]);
        }

        if (functionName === "getItinerary") {
          const functionArguments = JSON.parse(
            response.choices[0].message.function_call.arguments,
          );
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
            
            ${itineraryData.days
              .map(
                (day) => `
            ### **Day ${day.dayNumber}**
            
            **Flights**:  
            ${
              day.flights.length > 0
                ? day.flights
                    .map(
                      (flight) => `
            - **Flight**: ${flight.carrierCode}  
              - Departure: ${flight.departureTime} from ${flight.sourceLocation}  
              - Arrival: ${flight.arrivalTime} at ${flight.destinationLocation}  
              - Class: ${flight.class}  
              - Cost: $${flight.cost}
            `,
                    )
                    .join("\n")
                : "- No flights planned.\n"
            }
            
            **Accommodation**:  
            ${
              day.accommodation.length > 0
                ? day.accommodation
                    .map(
                      (acc) => `
            - **Hotel**: ${acc.hotel}  
              - Check-in: ${acc.checkin}  
              - Check-out: ${acc.checkout}
            `,
                    )
                    .join("\n")
                : "- No accommodation planned.\n"
            }
            
            **Activities**:  
            ${
              day.activities.length > 0
                ? day.activities
                    .map(
                      (activity) => `
            - **Activity**: ${activity.name}  
              - Time: ${activity.time}  
              - Description: ${activity.description}
            `,
                    )
                    .join("\n")
                : "- No activities planned.\n"
            }
            `,
              )
              .join("\n")}
            `;

            setResponses((prevResponses) => [
              ...prevResponses,
              { type: "bot", text: itineraryText }, // Display itinerary as markdown
            ]);
          } else {
            setResponses((prevResponses) => [
              ...prevResponses,
              {
                type: "bot",
                text: `Sorry, I couldn't find an itinerary with the name '${itineraryName}'.`,
              },
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
        {
          type: "bot",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
    }
    setLoading(false);
    setUserInput(""); // Clear the input
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
        {showCards && (
          <Box sx={{ display: "flex", gap: 2, padding: 2 }}>
            <Card sx={{ width: "48%" }}>
              <CardContent>
                <Typography variant="h6">
                  Step 1: Start by Telling Us About Your Trip
                </Typography>
                <Typography>
                  Provide details like your destination, travel dates, and
                  preferences to create a personalized itinerary.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: "48%" }}>
              <CardContent>
                <Typography variant="h6">
                  Step 2: Customize Your Itinerary
                </Typography>
                <Typography>
                  Once your itinerary is generated, it will automatically be
                  saved to the database.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        <Box
          sx={{ flex: 1, overflowY: "auto", padding: 2, position: "relative" }}
        >
          {loading && (
            <CircularProgress
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
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
              {/* Avatar Circle */}
              {response.type === "bot" ? (
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#376B7E",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  B
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "gray",
                    borderRadius: "50%",
                    marginRight: "10px",
                    backgroundImage: "url('https://via.placeholder.com/150')",
                    backgroundSize: "cover",
                  }}
                />
              )}

              {/* Speech Bubble Styling */}
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "20px",
                  position: "relative",
                  backgroundColor:
                    response.type === "user" ? "#DCF8C6" : "#E0E0E0",
                  color: "#000",
                  wordWrap: "break-word",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  overflowWrap: "break-word", // Ensures long words are wrapped
                  whiteSpace: "pre-wrap", // Preserves formatting and wraps text correctly
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
              backgroundColor: "#5ccc9d",
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "40px",
              "&:hover": { backgroundColor: "#5ddd9e" },
            }}
          >
            <FaPaperPlane />
          </Button>
        </Box>
      </div>
    </div>
  );
};
//prompt : 1.) The dates are 20-30 december . 2.) I have no budget constraints 3.) Im travelling solo . 4.) i prefer burgers and beer 5.) No children will be present 6.) I prefer 5 star luxury hotels, most of them have checkout time of 10:00 and check in timme of 14:00 7.) I like water activities like swimming or going to the aquarium. i also like rugby. 8.) no not really, maybe add a flight the morning of im arriving. the deprature time is 9:00 and estimated arrival 10:30. also the last day im flying back. but my flights is from 13:00-14:30. The first one is from pretoria to cape town and the second flight is from cape town to pretoria, both are with Flysafair, the cost is 2500. the cost of both is economy . 10.) I want my days packed yes, i want about 6 days filled with activities
export default Dashboard;
