// // src/components/dashboard/sidebar.js


// import React from 'react';
// import { getAuth, signOut } from 'firebase/auth';
// import { Link, useNavigate } from 'react-router-dom';
// import { Drawer, List, ListItem, ListItemText, Typography, Button, Divider } from '@mui/material';
// import { useUser } from '../UserContext/UserContext';
// import { useTheme } from '../themeContext/themeContext';
// import './dashboard.css';

// const Sidebar = () => {
//   const user = useUser();
//   const navigate = useNavigate();
//   const { toggleTheme } = useTheme();

//   const handleLogout = async () => {
//     const auth = getAuth();
//     try {
//       await signOut(auth);
//       navigate("/"); // Redirect to the login page or home page
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       PaperProps={{
//         sx: {
//           width: 240,
//           backgroundColor: '#2c3e50',
//           color: '#fff',
//         }
//       }}
//     >
//       <List>
//         <ListItem button component={Link} to="/dashboard">
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/profile">
//           <ListItemText primary="Profile" />
//         </ListItem>
//         <ListItem button component={Link} to="/flights">
//           <ListItemText primary="Flights" />
//         </ListItem>
//         <ListItem button component={Link} to="/accommodation">
//           <ListItemText primary="Accommodation" />
//         </ListItem>
//         <Divider sx={{ my: 2, borderColor: '#34495e' }} />
//         <ListItem button component={Link} to="/help">
//           <ListItemText primary="Help" />
//         </ListItem>
//         <ListItem button component={Link} to="/settings">
//           <ListItemText primary="Settings" />
//         </ListItem>
//         <ListItem button component={handleLogout} to="/">
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={toggleTheme}
//         sx={{ margin: '20px' }}
//       >
//         Toggle Theme
//       </Button>
//     </Drawer>
//   );
// };

// export default Sidebar;

import React, { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext/UserContext';
import { useTheme } from '../themeContext/themeContext';
import { Drawer, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import './dashboard.css';
import Splash from '../splash/splash';

const Sidebar = () => {
  const { toggleTheme } = useTheme();
  const user = useUser();
  // const navigate = useNavigate();
  
    // const handleLogout = async () => {
    //   const auth = getAuth();
    //   try {
    //     await signOut(auth);
    //     navigate("/"); // Redirect to the login page or home page
    //   } catch (error) {
    //     console.error("Error logging out:", error);
    //   }
    // };
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: '#008080',
          color: '#fff',
        }
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/flights">
          <ListItemText primary="Flights" />
        </ListItem>
        <ListItem button component={Link} to="/accommodation">
          <ListItemText primary="Accommodation" />
        </ListItem>
        <Divider sx={{ my: 2, borderColor: '#34495e' }} />
        <ListItem button component={Link} to="/help">
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem button component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleTheme}
        sx={{ margin: '20px' }}
      >
        Toggle Theme
      </Button>
    </Drawer>
  );
};

export default Sidebar;

