// import React, { useState } from "react";
// import "./dashboard.css";
// import Sidebar from "./sidebar";
// import { Box, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
// import bluewater from "./images/bluewatershotel.jpg";
// import coastlands from "./images/coastlands.jpg";
// import citylodge from "./images/citylodge.jpeg";
// import houghton from "./images/houghton.jpg";
// import grandekloof from "./images/grandekloof.jpg";
// import lagoonbeach from "./images/lagoonbeach.jpg";
// import citylodgepret from "./images/citylodgepret.jpg";
// import regency from "./images/regency.jpeg";

// const Accommodations = ({ accommodations, selectedDestination }) => {
//   const [selectedAccommodation, setSelectedAccommodation] = useState(null);

//   const accommodationsData = {
//     Johannesburg: [
//         { name: "The Houghton Hotel", image: houghton, description: "Welcome to The Houghton Hotel, Spa, Wellness and Golf, the epitome of luxury, relaxation and indulgence. Nestled among breathtaking landscapes, our 5-star sanctuary combines world-class amenities, an exceptional golf course and a rejuvenating spa facility. We are well located and in close proximity to major business nodes and shopping hubs. At The Houghton Hotel our commitment to providing the highest level of personalised service and attention to detail is evident in every aspect of our hotel, from our beautifully appointed rooms and suites to our meticulously manicured grounds. As a luxury hotel, we understand that it’s not just about the opulent decor and upscale amenities, but also about that home away from home experience." },
//         { name: "City Lodge Newton", image: citylodge, description: "Situated in the vibrant area of Newtown on the western side of Johannesburg’s bustling CBD, the 148-room City Lodge Hotel Newtown features the brand’s signature #Café restaurant serving Full English and Continental breakfast, lunch and dinner daily; two boardrooms accommodating 16 guests and 10 guests; uncapped WiFi; fitness room; and sparkling swimming pool and sundowner bar." },
//     ],
//     CapeTown: [
//       { name: "Grande Kloof Boutique Hotel", image: grandekloof, description: "This is where you can relax and feel good to be in Cape Town.  The property is perfectly situated between Bantry Bay and Seapoint, making it an excellent holiday destination choice if you want to be close to world famous sunny beaches, great restaurants, cafés and more.  Cape Town’s well known Victoria and Alfred Waterfront is a 3 to 5 minute drive alongside the beach promenade area, offering world class shopping and entertainment." },
//       { name: "Lagoon Beach Hotel & Spa", image: lagoonbeach, description: "Discover the epitome of seaside serenity at Lagoon Beach Hotel, where each moment is a harmonious blend of luxury, comfort, and natural beauty, nestled along the pristine shores of Milnerton beach. Immerse yourself in the breathtaking vistas of the Atlantic Ocean, where azure waters meet golden sands, the awe-inspiring Table Mountain and the dancing lights of the Cape Town City skyline creating a picturesque backdrop for your dream getaway. Whether you're travelling for business or leisure or a romantic getaway with a touch of coastal charm, Lagoon Beach Hotels is your idyllic oasis." },
//     ],

//     Durban: [
//       { name: "Blue Waters Hotel", image: bluewater, description: "We welcome you to our luxurious landmark hotel where golden beaches and the warm Indian Ocean are just a shell’s throw away. You are assured of a relaxing and memorable stay in one of our 262 newly refurbished guestrooms, most of which have ocean views and outdoor balconies. Our function packages can be tailored to your budget." },
//       { name: "The Royal Hotel and Convention Centre", image: coastlands, description: "With beautiful views of Durban harbour from our Upper Floor Deluxe Rooms and Executive Suites, this iconic hotel, known as the “Grand Lady” offers a total of 206 rooms, a restaurant, coffee shop and large conference and banqueting facilities. Lower Floor Deluxe rooms and Family Rooms are offered at competitive rates." },
//     ],

//     Pretoria: [
//       { name: "City Lodge Pretoria", image: citylodgepret, description: "The 205-room City Lodge Hotel Lynnwood is located within the Lynnwood Bridge Complex in Pretoria East, with convenient access to a wide range of business, shopping, dining and entertainment destinations in this modern mixed-use precinct. The hotel features a #Café restaurant serving Full English and Continental breakfast, lunch and dinner daily; sundowner bar and sparkling pool to make the most of the Highveld sunshine; three meeting rooms, uncapped WiFi; and a fitness room. Whether travelling for business or leisure, this hotel offers a convenient and comfortable stay." },
//       { name: "The Regency Apartment Hotel", image: regency, description: "At The Regency Apartment Hotel | Menlyn, is a full-service luxury apartment hotel located in Menlyn, Pretoria. Providing short- or long-term lifestyle accommodation for business or leisure travellers, individual guests and families can choose from one-bedroom or two-bedroom apartments or standard rooms." },
//     ]

//   };

//   const handleAccommodationClick = (accommodation) => {
//     setSelectedAccommodation(accommodation);
//   };

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="content">
//         <h1>Accommodations</h1>
//         {selectedDestination ? (
//           <Box mt={4}>
//             <Typography variant="h5" gutterBottom>
//               Accommodations in {selectedDestination}
//             </Typography>
//             <Grid container spacing={2}>
//               {accommodationsData[selectedDestination].map((accommodation) => (
//                 <Grid item xs={12} sm={6} md={4} key={accommodation.name}>
//                   <Card onClick={() => handleAccommodationClick(accommodation)}>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={accommodation.image}
//                       alt={accommodation.name}
//                     />
//                     <CardContent>
//                       <Typography gutterBottom variant="h6" component="div">
//                         {accommodation.name}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {accommodation.description}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         ) : (
//           <Typography variant="h6">Please select a destination first.</Typography>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Accommodations;

// Accommodations.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
import Sidebar from "./sidebar";
import { Box, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import bluewater from "./images/bluewatershotel.jpg";
import coastlands from "./images/coastlands.jpg";
import citylodge from "./images/citylodge.jpeg";
import houghton from "./images/houghton.jpg";
import grandekloof from "./images/grandekloof.jpg";
import lagoonbeach from "./images/lagoonbeach.jpg";
import citylodgepret from "./images/citylodgepret.jpg";
import regency from "./images/regency.jpeg";

const Accommodations = ({ selectedDestination }) => {
  const location = useLocation();
  const [destination, setDestination] = useState(selectedDestination);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationParam = params.get('destination');
    if (destinationParam) {
      setDestination(destinationParam);
    }
  }, [location]);

  const accommodationsData = {
    Johannesburg: [
      { name: "The Houghton Hotel", image: houghton, description: "Welcome to The Houghton Hotel, Spa, Wellness and Golf, the epitome of luxury, relaxation and indulgence. Nestled among breathtaking landscapes, our 5-star sanctuary combines world-class amenities, an exceptional golf course and a rejuvenating spa facility. We are well located and in close proximity to major business nodes and shopping hubs. At The Houghton Hotel our commitment to providing the highest level of personalised service and attention to detail is evident in every aspect of our hotel, from our beautifully appointed rooms and suites to our meticulously manicured grounds. As a luxury hotel, we understand that it’s not just about the opulent decor and upscale amenities, but also about that home away from home experience." },
      { name: "City Lodge Newton", image: citylodge, description: "Situated in the vibrant area of Newtown on the western side of Johannesburg’s bustling CBD, the 148-room City Lodge Hotel Newtown features the brand’s signature #Café restaurant serving Full English and Continental breakfast, lunch and dinner daily; two boardrooms accommodating 16 guests and 10 guests; uncapped WiFi; fitness room; and sparkling swimming pool and sundowner bar." },
    ],
    CapeTown: [
      { name: "Grande Kloof Boutique Hotel", image: grandekloof, description: "This is where you can relax and feel good to be in Cape Town.  The property is perfectly situated between Bantry Bay and Seapoint, making it an excellent holiday destination choice if you want to be close to world famous sunny beaches, great restaurants, cafés and more.  Cape Town’s well known Victoria and Alfred Waterfront is a 3 to 5 minute drive alongside the beach promenade area, offering world class shopping and entertainment." },
      { name: "Lagoon Beach Hotel & Spa", image: lagoonbeach, description: "Discover the epitome of seaside serenity at Lagoon Beach Hotel, where each moment is a harmonious blend of luxury, comfort, and natural beauty, nestled along the pristine shores of Milnerton beach. Immerse yourself in the breathtaking vistas of the Atlantic Ocean, where azure waters meet golden sands, the awe-inspiring Table Mountain and the dancing lights of the Cape Town City skyline creating a picturesque backdrop for your dream getaway. Whether you're travelling for business or leisure or a romantic getaway with a touch of coastal charm, Lagoon Beach Hotels is your idyllic oasis." },
    ],
    Durban: [
      { name: "Blue Waters Hotel", image: bluewater, description: "We welcome you to our luxurious landmark hotel where golden beaches and the warm Indian Ocean are just a shell’s throw away. You are assured of a relaxing and memorable stay in one of our 262 newly refurbished guestrooms, most of which have ocean views and outdoor balconies. Our function packages can be tailored to your budget." },
      { name: "The Royal Hotel and Convention Centre", image: coastlands, description: "With beautiful views of Durban harbour from our Upper Floor Deluxe Rooms and Executive Suites, this iconic hotel, known as the “Grand Lady” offers a total of 206 rooms, a restaurant, coffee shop and large conference and banqueting facilities. Lower Floor Deluxe rooms and Family Rooms are offered at competitive rates." },
    ],
    Pretoria: [
      { name: "City Lodge Pretoria", image: citylodgepret, description: "The 205-room City Lodge Hotel Lynnwood is located within the Lynnwood Bridge Complex in Pretoria East, with convenient access to a wide range of business, shopping, dining and entertainment destinations in this modern mixed-use precinct. The hotel features a #Café restaurant serving Full English and Continental breakfast, lunch and dinner daily; sundowner bar and sparkling pool to make the most of the Highveld sunshine; three meeting rooms, uncapped WiFi; and a fitness room. Whether travelling for business or leisure, this hotel offers a convenient and comfortable stay." },
      { name: "The Regency Apartment Hotel", image: regency, description: "At The Regency Apartment Hotel | Menlyn, is a full-service luxury apartment hotel located in Menlyn, Pretoria. Providing short- or long-term lifestyle accommodation for business or leisure travellers, individual guests and families can choose from one-bedroom or two-bedroom apartments or standard rooms." },
    ],
  };

  const handleAccommodationClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Accommodations</h1>
        {destination ? (
          <Box mt={4}>
            <h2>Accommodations in {destination}</h2>
            <Grid container spacing={2}>
              {accommodationsData[destination]?.map((accommodation) => (
                <Grid item xs={12} sm={6} md={4} key={accommodation.name}>
                  <Card onClick={() => handleAccommodationClick(accommodation)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={accommodation.image}
                      alt={accommodation.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {accommodation.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {accommodation.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography variant="h6">Please select a destination first.</Typography>
        )}
      </div>
    </div>
  );
};

export default Accommodations;
