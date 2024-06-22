// import React from "react";
// import "./dashboard.css";
// import Sidebar from "./sidebar";
// import { Card, CardContent, Typography } from '@mui/material';

// const Accommodation = () => {
//   const accommodations = [
//     {
//       id: "1",
//       name: "The Oyster Box",
//       price: "R4000 per night",
//       location: "Durban, South Africa",
//       description: "A luxurious stay in Umhlanga with stunning views of the Indian Ocean."
//     },
//     {
//       id: "2",
//       name: "Protea Hotel",
//       price: "R1500 per night",
//       location: "Cape Town, South Africa",
//       description: "Affordable and comfortable accommodation in central Cape Town with Table Mountain views."
//     },
//     {
//       id: "3",
//       name: "Kruger National Park Lodge",
//       price: "R3000 per night",
//       location: "Kruger National Park, South Africa",
//       description: "Experience the wild with comfortable rooms and excellent amenities in the heart of the Kruger National Park."
//     }
//   ];

//   // return (
//   //   <div className="dashboard">
//   //     <Sidebar />
//   //     <div className="content">
//   //       <h1>Accommodation</h1>
//   //       <div className="accommodation-list">
//   //         {accommodations.map(acc => (
//   //           <div key={acc.id} className="accommodation-item">
//   //             <h2>{acc.name}</h2>
//   //             <p>{acc.price}</p>
//   //             <p>{acc.location}</p>
//   //             <p>{acc.description}</p>
//   //           </div>
//   //         ))}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );



//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="content">
//         <h1>Accommodation</h1>
//         <div className="accommodation-list">
//           {accommodations.map(acc => (
//             <Card key={acc.id} className="accommodation-item">
//               <CardContent>
//                 <h2>{acc.name}</h2>
//                 <Typography variant="body1">{acc.price}</Typography>
//                 <Typography variant="body1">{acc.location}</Typography>
//                 <Typography variant="body2">{acc.description}</Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Accommodation;

import React from "react";
import "./dashboard.css";
import Sidebar from "./sidebar";
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Accommodation = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const accommodations = [
    {
      id: "1",
      name: "The Oyster Box",
      price: "R4000 per night",
      location: "Durban, South Africa",
      description: "A luxurious stay in Umhlanga with stunning views of the Indian Ocean."
    },
    {
      id: "2",
      name: "Protea Hotel",
      price: "R1500 per night",
      location: "Cape Town, South Africa",
      description: "Affordable and comfortable accommodation in central Cape Town with Table Mountain views."
    },
    {
      id: "3",
      name: "Kruger National Park Lodge",
      price: "R3000 per night",
      location: "Kruger National Park, South Africa",
      description: "Experience the wild with comfortable rooms and excellent amenities in the heart of the Kruger National Park."
    }
  ];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <h1>Accommodation</h1>
        <div className="accommodation-list">
          {accommodations.map(acc => (
            <Card 
              key={acc.id} 
              sx={{ 
                backgroundColor: isDarkMode ? '#0077b6' : '#b4c5e4', 
                marginBottom: '1rem' 
              }} 
              className="accommodation-item"
            >
              <CardContent 
                sx={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                <Typography variant="h6">{acc.name}</Typography>
                <Typography variant="body1">{acc.price}</Typography>
                <Typography variant="body1">{acc.location}</Typography>
                <Typography variant="body2">{acc.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
