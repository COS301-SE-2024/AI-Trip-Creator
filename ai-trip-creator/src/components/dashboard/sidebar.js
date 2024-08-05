import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemText, Divider, Switch, FormControlLabel } from '@mui/material';
import { useTheme } from '../themeContext/themeContext';
import { useUser } from '../UserContext/UserContext';
import './dashboard.css';

const Sidebar = () => {
  const { toggleTheme } = useTheme();
  const user = useUser();

  const [isChecked, setIsChecked] = useState(false);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    toggleTheme();
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: '#004BA8',
          color: '#FFFFFF',
          elevation: 16, // Nav drawer elevation
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/Itinerary">
          <ListItemText primary="Itinerary" />
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
      <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} checked={isChecked} onChange={handleToggle} />}
        label="Toggle Theme"
        sx={{ margin: '20px', color: 'white' }}
      />
    </Drawer>
  );
};

export default Sidebar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Switch, FormControlLabel } from '@mui/material';
// import { useTheme } from '../themeContext/themeContext';
// import { useUser } from '../UserContext/UserContext';
// import HomeIcon from '@mui/icons-material/Home';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import FlightIcon from '@mui/icons-material/Flight';
// import HotelIcon from '@mui/icons-material/Hotel';
// import PersonIcon from '@mui/icons-material/Person';
// import HelpIcon from '@mui/icons-material/Help';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import './dashboard.css';

// const Sidebar = () => {
//   const { toggleTheme } = useTheme();
//   const user = useUser();

//   const [isChecked, setIsChecked] = useState(false);

//   const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//     width: 62,
//     height: 34,
//     padding: 7,
//     '& .MuiSwitch-switchBase': {
//       margin: 1,
//       padding: 0,
//       transform: 'translateX(6px)',
//       '&.Mui-checked': {
//         color: '#fff',
//         transform: 'translateX(22px)',
//         '& .MuiSwitch-thumb:before': {
//           backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//             '#fff',
//           )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//         },
//         '& + .MuiSwitch-track': {
//           opacity: 1,
//           backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//         },
//       },
//     },
//     '& .MuiSwitch-thumb': {
//       backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
//       width: 32,
//       height: 32,
//       '&::before': {
//         content: "''",
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//         left: 0,
//         top: 0,
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           '#fff',
//         )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//       },
//     },
//     '& .MuiSwitch-track': {
//       opacity: 1,
//       backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
//       borderRadius: 20 / 2,
//     },
//   }));

//   const handleToggle = () => {
//     setIsChecked((prev) => !prev);
//     toggleTheme();
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       PaperProps={{
//         sx: {
//           width: 240,
//           backgroundColor: '#004BA8',
//           color: '#FFFFFF',
//           elevation: 16, // Nav drawer elevation
//         },
//       }}
//     >
//       <List>
//         <ListItem button component={Link} to="/dashboard">
//           <ListItemIcon><HomeIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem button component={Link} to="/Itinerary">
//           <ListItemIcon><EventNoteIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Itinerary" />
//         </ListItem>
//         <ListItem button component={Link} to="/flights">
//           <ListItemIcon><FlightIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Flights" />
//         </ListItem>
//         <ListItem button component={Link} to="/accommodation">
//           <ListItemIcon><HotelIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Accommodation" />
//         </ListItem>
//         <Divider sx={{ my: 2, borderColor: '#34495e' }} />
//         <ListItem button component={Link} to="/profile">
//           <ListItemIcon><PersonIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Profile" />
//         </ListItem>
//         <ListItem button component={Link} to="/help">
//           <ListItemIcon><HelpIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Help" />
//         </ListItem>
//         <ListItem button component={Link} to="/settings">
//           <ListItemIcon><SettingsIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Settings" />
//         </ListItem>
//         <ListItem button component={Link} to="/">
//           <ListItemIcon><LogoutIcon sx={{ color: '#FFFFFF' }} /></ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//       <FormControlLabel
//         control={<MaterialUISwitch sx={{ m: 1 }} checked={isChecked} onChange={handleToggle} />}
//         label="Toggle Theme"
//         sx={{ margin: '20px', color: 'white' }}
//       />
//     </Drawer>
//   );
// };

// export default Sidebar;