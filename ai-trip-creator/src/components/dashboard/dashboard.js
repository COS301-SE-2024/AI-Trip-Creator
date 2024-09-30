import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Sidebar from "./sidebar";
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { db, auth } from "../../firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";



// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true
});



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
Would you like to add transport details? and if so, please give me the details so i can add it to your itinerary.
`;


const exampleItinerary = ` Here is your itinerary:    ## Historical Comfort Trip from Durban to GqeberhaThis itinerary prioritizes comfort and historical exploration during your trip from Durban to Gqeberha. It includes a mix of historical sites, cultural experiences, and relaxing activities, ensuring a well-rounded and enjoyable journey.**Day 1: Durban to Pietermaritzburg*** Morning: Depart from Durban and enjoy a comfortable drive to Pietermaritzburg.* Afternoon: Check into a comfortable hotel in Pietermaritzburg.* Evening: Explore Pietermaritzburg’s rich history by visiting the **Pietermaritzburg City Hall** and the **Old Jail**, both significant historical landmarks. Indulge in a delicious dinner at a local restaurant.**Day 2: Pietermaritzburg to Howick*** Morning: Visit the **KwaZulu-Natal Museum**, learning about the region's fascinating history and culture.* Afternoon: Drive to Howick, enjoying scenic views along the way. Check into a charming guesthouse.* Evening: Enjoy a relaxing evening at the guesthouse or explore the local area.**Day 3: Howick and the Midlands Meander*** Morning:  Visit the **Howick Falls**, a breathtaking natural wonder, and explore the nearby **Midlands Meander**.* Afternoon: Indulge in a leisurely lunch at a quaint restaurant in the Midlands, sampling the region's culinary delights.* Evening: Return to Howick and relax at your guesthouse, enjoying the tranquil atmosphere.**Day 4: Howick to Gqeberha*** Morning: Depart from Howick and enjoy a scenic drive towards Gqeberha.* Afternoon:  Stop at the **Fort Nottingham**, a historical fort built in the early 1800s, to learn about its role in the region's past.* Evening: Arrive in Gqeberha and check into a comfortable hotel. Enjoy a relaxing evening and dinner.**Day 5: Gqeberha - Historical Exploration*** Morning: Visit the **Donkin Reserve**, a historic site with a lighthouse, monument, and panoramic views of the city.* Afternoon: Explore the **Albany Museum**, a treasure trove of historical artifacts and exhibits.* Evening: Experience the city's vibrant culture with a dinner at a restaurant offering local cuisine.**Day 6: Gqeberha - Coastal Delights*** Morning: Visit the **St. George's Park**, a beautiful park with historic buildings and a tranquil atmosphere.* Afternoon: Relax on the beautiful beaches of **Humewood**, soaking up the sun and enjoying the coastal scenery.* Evening: Savor a seafood dinner at a restaurant overlooking the ocean, enjoying the fresh flavors and the beautiful sunset.**Day 7: Departure*** Morning: Enjoy a leisurely breakfast before departing from Gqeberha.**Note:** This itinerary can be adjusted based on your specific interests and desired pace of travel. You can add or remove activities, change the duration of each stop, or explore additional historical sites in the region. **Comfort:** This itinerary emphasizes comfort by choosing comfortable accommodation options, incorporating relaxing activities, and focusing on delicious food experiences.**Historical Focus:** The itinerary includes a variety of historical sites and museums, offering insights into the rich history and cultural heritage of the region.This itinerary provides a framework for your historical and comfortable journey from Durban to Gqeberha, allowing you to customize the experience based on your personal preferences. Enjoy your trip!`;
const exampleItinerary2 = ` Here is your itinerary:   ## Gqeberha Shopping Getaway: A Comfort-Focused Itinerary This itinerary focuses on shopping and comfort, prioritizing a relaxing and enjoyable trip to Gqeberha from Johannesburg for a solo traveler. **Day 1:*** **Morning:** Fly from Johannesburg to Gqeberha (Port Elizabeth).* **Afternoon:** Check into a comfortable hotel in the city center or a nearby suburb. * **Evening:** Relax and explore your surroundings. **Day 2:*** **Morning:** Head to the **Baywest Mall**, one of the largest shopping malls in the Eastern Cape.  Browse a wide variety of shops, including international brands and local boutiques.* **Lunch:** Enjoy a delicious meal at one of the many restaurants in the mall.* **Afternoon:** Continue exploring the mall or head to the **Boardwalk Casino & Entertainment World** for some fun.* **Evening:**  Treat yourself to a relaxing dinner at a local restaurant with a beautiful view or try **Alvarez and Sons** for a taste of authentic street food. **Day 3:*** **Morning:**  Visit the **Walmer Park Shopping Centre** for a more local shopping experience. Explore the diverse range of shops, including arts and crafts vendors. * **Lunch:**  Opt for a healthy and delicious meal at **Snyder and Sons**, a health food restaurant.* **Afternoon:**  Relax and enjoy a cup of tea and some pastries at **Martin, Brown and Cooley**, a charming tea house.* **Evening:** Enjoy a casual dinner at a nearby restaurant or explore the vibrant nightlife of Gqeberha.**Day 4:*** **Morning:**  Spend some time at the **Gqeberha Museum** to learn about the city's history and culture.* **Lunch:**  Have lunch at a local café or grab something to eat at the museum's restaurant.* **Afternoon:**  Shop at **The Bridge Shopping Centre** for more unique items and local crafts.* **Evening:** Enjoy a delicious final meal in Gqeberha and reflect on your trip.**Day 5:*** **Morning:** Fly back to Johannesburg from Gqeberha, carrying your newfound treasures and memories.**Note:** This itinerary is flexible and can be customized based on your preferences and interests. You can also add in other activities like visiting the **Nelson Mandela Bay Stadium** or exploring the beautiful **Addo Elephant National Park**. **Comfort Focus:**This itinerary prioritizes comfort by offering ample time for shopping, relaxing, and indulging in delicious food. You can easily adjust the pace of the trip and the amount of time spent in each location to ensure a comfortable and enjoyable experience. **Tips:*** Book your flights and accommodation in advance, especially if you're traveling during peak season.* Pack light and bring comfortable shoes, as you'll be doing a lot of walking.* Bring a reusable water bottle to stay hydrated throughout your trip.* Consider purchasing a local SIM card for easy communication.* Don't be afraid to ask for directions or recommendations from locals.**Enjoy your comfortable shopping getaway in Gqeberha!**`;
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
    // Get the current user from Firebase Auth
    //const auth = getAuth();
    const currentUser = auth.currentUser;

    // Check if the user is authenticated
    if (!currentUser) {
      console.error("No authenticated user.");
      return;
    }

    const userId = currentUser.uid; // Get the user's UID
    

    // Create an array of messages from the current responses state
    const messages = [
      {
        role: "system",
        content: "You are a helpful trip advisor AI that only answers questions and gives itineraries about Johannesburg, Durban, Pretoria, Cape Town and Gqeberha. Remember the user's preferences, and avoid asking repetitive questions. When giving itineraries, make sure to personalize based on the given preferences ask these questions : " + questionsPrompt
                    + "When you have created and itinerary,  your response should like this:  Here is your itinerary:  {insert itinerary}.  That  phrase 'Here is your itinerary' should be there exactly as is:  To help here is an example itinerary which you must base the format off of " + exampleItinerary + ". Here is a second example itinerary: " + exampleItinerary2
        },
      ...responses.map((response) => ({
        role: response.type === "user" ? "user" : "assistant",
        content: response.text
      })),
      { role: "user", content: userInput }
    ];

    // Interact with OpenAI GPT-4 model
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      max_tokens: 1000
    });

    const botMessage = response.choices[0].message.content;

    // Check if the response contains the phrase "Here is your itinerary"
    if (botMessage.includes("Here is your itinerary")) {
      // Remove the trigger phrase and the colon (":") that follows it
      const itineraryText = botMessage.replace("Here is your itinerary:", "").trim();
     // const db = getFirestore();
      
     
      // if (window.location.hostname === "localhost") {
      //   connectFirestoreEmulator(db, 'localhost', 3000);
      // }
      // **Calculate Trip Duration** by counting occurrences of "Day"
      const dayCount = (itineraryText.match(/Day/g) || []).length;

      // **Extract Location** from the allowed cities
      const locations = ["Johannesburg", "Durban", "Pretoria", "Cape Town", "Gqeberha"];
      const foundLocation = locations.find(location => itineraryText.includes(location)) || "Unknown";

      // Store the itinerary, userId, duration, and location in Firestore
      await addDoc(collection(db, "Itinerary"), {
        userId: userId,                // Add the user's UID
        itinerary: itineraryText,      // Store the cleaned itinerary
        duration: dayCount,            // Store the duration (based on "Day" occurrences)
        location: foundLocation,       // Store the location (found in the text)
        createdAt: new Date(),          // Timestamp of creation
        flights: [],
        accomodation: [],
        altimage: "https://www.sa-venues.com/things-to-do/gauteng/gallery/9/1.jpg",
        image: "https://www.sa-venues.com/things-to-do/gauteng/gallery/9/1.jpg"          // Timestamp of creation
      });
      console.log("Itinerary saved to Firestore with location and duration.");
    }

    // Add the AI response to the responses state
    setResponses((prevResponses) => [
      ...prevResponses,
      { type: "bot", text: botMessage }
    ]);

  } catch (error) {
    console.error("Error communicating with the OpenAI API or Firestore:", error);
    setResponses((prevResponses) => [
      ...prevResponses,
      { type: "bot", text: "Sorry, there was an error processing your request." }
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
        <h1 style={{marginLeft: "28px", marginTop: "30px"}}>AI Trip Planning</h1>
        {showCards && (
          <Box
            sx={{
              padding: 2,
              borderBottom: "1px solid #ddd",
              backgroundColor: "#f7f7f7",
            }}
          >
            {/* <Typography variant="h3" gutterBottom>
              AI Trip Planning
            </Typography> */}

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

