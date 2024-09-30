import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "../themeContext/themeContext";
import { useUser } from "../UserContext/UserContext";
import "./dashboard.css";

import {
  FaHome,
  FaListAlt,
  FaPlane,
  FaBed,
  FaUser,
  FaQuestion,
  FaCog,
  FaSignOutAlt,
  FaRunning,
} from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";

const Sidebar = () => {
  const { toggleTheme } = useTheme();
  const user = useUser();
  const location = useLocation(); // Hook to get the current location

  const [isChecked, setIsChecked] = useState(false);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff",
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    toggleTheme();
  };

  const isActive = (path) => location.pathname === path; // Check if the current path matches the link

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: "#004BA8",
          color: "#FFFFFF",
          elevation: 16, // Nav drawer elevation
          height: "100vh", // Full height of the viewport
          overflow: "hidden", // Prevent scrolling
        },
      }}
    >
      <List sx={{ overflow: "hidden" }}>
        {" "}
        {/* Disable scroll inside the List */}
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={{
            backgroundColor: isActive("/dashboard") ? "#ffffff33" : "inherit",
            color: isActive("/dashboard") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaHome style={{ marginRight: "10px" }} />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/Itinerary"
          sx={{
            backgroundColor: isActive("/Itinerary") ? "#ffffff33" : "inherit",
            color: isActive("/Itinerary") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaListAlt style={{ marginRight: "10px" }} />
          <ListItemText primary="Itinerary" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/flights"
          sx={{
            backgroundColor: isActive("/flights") ? "#ffffff33" : "inherit",
            color: isActive("/flights") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaPlane style={{ marginRight: "10px" }} />
          <ListItemText primary="Flights" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/accommodation"
          sx={{
            backgroundColor: isActive("/accommodation")
              ? "#ffffff33"
              : "inherit",
            color: isActive("/accommodation") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaBed style={{ marginRight: "10px" }} />
          <ListItemText primary="Accommodation" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/activities"
          sx={{
            backgroundColor: isActive("/activities") ? "#ffffff33" : "inherit",
            color: isActive("/activities") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaRunning style={{ marginRight: "10px" }} />
          <ListItemText primary="Things to do" />
        </ListItem>
        <Divider sx={{ my: 2, borderColor: "#34495e" }} />
        <ListItem
          button
          component={Link}
          to="/profile"
          sx={{
            backgroundColor: isActive("/profile") ? "#ffffff33" : "inherit",
            color: isActive("/profile") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaUser style={{ marginRight: "10px" }} />
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/analytics"
          sx={{
            backgroundColor: isActive("/analytics") ? "#ffffff33" : "inherit",
            color: isActive("/analytics") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <MdOutlineAnalytics style={{ marginRight: "10px" }} />
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/help"
          sx={{
            backgroundColor: isActive("/help") ? "#ffffff33" : "inherit",
            color: isActive("/help") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaQuestion style={{ marginRight: "10px" }} />
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/settings"
          sx={{
            backgroundColor: isActive("/settings") ? "#ffffff33" : "inherit",
            color: isActive("/settings") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaCog style={{ marginRight: "10px" }} />
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            backgroundColor: isActive("/") ? "#ffffff33" : "inherit",
            color: isActive("/") ? "#ffffff" : "inherit",
            borderRadius: "50px",
            margin: "2px 10px",
            width: "200px",
          }}
        >
          <FaSignOutAlt style={{ marginRight: "10px" }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={isChecked}
            onChange={handleToggle}
          />
        }
        label="Toggle Theme"
        sx={{ margin: "20px", color: "white" }}
      />
    </Drawer>
  );
};

export default Sidebar;
