import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "./sidebar";
// import "./dashboard.css";

const Dashboard = ({ itinerary, generateItinerary }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    
    <Box display="flex" >
      <Drawer
        variant={isSmUp ? "permanent" : "temporary"}
        open={true}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        <Sidebar />
      </Drawer>
      <Box
        flexGrow={1}
        p={3}
        //  bgcolor="background.default"
        
        sx={{ 
          ml: isSmUp ? "240px" : "0",
          bgcolor: isDarkMode ? '#0000007a ' : '#ffffff'
         }}
      >
        <Container maxWidth="lg">
          {/* <<Typography variant="h4" color="primary" gutterBottom>
            Analytics Dashboard
          </Typography> */}
          <h1>Analytics Dashboard</h1>
          {/* <Typography variant="body1" paragraph>
            Welcome to your analytics dashboard. Here you can view insights
            about user activity and trip creation.
          </Typography> */}
          <p>Welcome to your analytics dashboard. Here you can view insights
          about user activity and trip creation.</p>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Analytics
          </Typography>

          <Grid container spacing={3}>
            {/* Placeholder for an Analytics Component 1 */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: isDarkMode ? '#7d7f7c ' : '#ffffff'}}>
                <Typography variant="h6" gutterBottom>
                  Travel Trends
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="150px"
                >
                  <CircularProgress />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Loading travel trends data...
                </Typography>
              </Paper>
            </Grid>

            {/* Placeholder for an Analytics Component 2 */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: isDarkMode ? '#7d7f7c ' : '#ffffff' }}>
                <Typography variant="h6" gutterBottom>
                  Popular Destinations
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="150px"
                >
                  <CircularProgress />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Loading popular destinations data...
                </Typography>
              </Paper>
            </Grid>

            {/* Placeholder for an Analytics Component 3 */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2, bgcolor: isDarkMode ? '#7d7f7c ' : '#ffffff' }}>
                <Typography variant="h6" gutterBottom>
                  User Activity
                </Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="150px"
                >
                  <CircularProgress />
                </Box>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  Loading user activity data...
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
    
  );
};

export default Dashboard;
