import React from "react";
import Sidebar from "./sidebar";
import {
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  styled,
} from "@mui/material";

const DashboardContainer = styled("div")({
  display: "flex",
  minHeight: "100vh",
});

const SidebarContainer = styled(Grid)({
  backgroundColor: "#f0f0f0",
  padding: "20px",
  zIndex: 1, // Ensure sidebar is above other content
});

const Content = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "white",
  zIndex: 0, // Ensure content is below sidebar
}));

const AnalyticsItem = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: "#f0f0f0",
}));

const AnalyticsTitle = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "8px",
});

const AnalyticsValue = styled(Typography)({
  fontSize: "1.5rem",
  color: "teal",
});

const TopDestinationsList = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DestinationItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
  backgroundColor: "#e0e0e0",
  borderRadius: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));

const DestinationName = styled(ListItemText)({
  fontWeight: "bold",
});

const Dashboard = ({ itinerary, generateItinerary }) => {
  // Mock analytics data (replace with actual data fetching logic if needed)
  const analyticsData = {
    totalUsers: 1500,
    totalTripsCreated: 2300,
    averageTripRating: 4.5,
    topDestinations: [
      { name: "Durban", count: 350 },
      { name: "Cape Town", count: 300 },
      { name: "Pretoria", count: 280 },
      { name: "Johannesburg", count: 250 },
      { name: "Kruger National Park", count: 200 },
    ],
  };

  return (
    <DashboardContainer>
      <SidebarContainer item xs={3}>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <Typography variant="h1" sx={{ color: "teal", marginBottom: "10px" }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your analytics dashboard. Here you can view insights about
          user activity and trip creation.
        </Typography>

        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <AnalyticsItem>
              <AnalyticsTitle>Total Users</AnalyticsTitle>
              <AnalyticsValue>{analyticsData.totalUsers}</AnalyticsValue>
            </AnalyticsItem>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AnalyticsItem>
              <AnalyticsTitle>Total Trips Created</AnalyticsTitle>
              <AnalyticsValue>{analyticsData.totalTripsCreated}</AnalyticsValue>
            </AnalyticsItem>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AnalyticsItem>
              <AnalyticsTitle>Average Trip Rating</AnalyticsTitle>
              <AnalyticsValue>
                {analyticsData.averageTripRating.toFixed(1)}
              </AnalyticsValue>
            </AnalyticsItem>
          </Grid>

          <Grid item xs={12}>
            <AnalyticsItem>
              <AnalyticsTitle>Top Destinations</AnalyticsTitle>
              <TopDestinationsList>
                {analyticsData.topDestinations.map((destination, index) => (
                  <DestinationItem key={index} disableGutters>
                    <DestinationName
                      primary={destination.name}
                      sx={{ fontWeight: "bold" }}
                    />
                    <ListItemSecondaryAction>
                      <Typography>{destination.count}</Typography>
                    </ListItemSecondaryAction>
                  </DestinationItem>
                ))}
              </TopDestinationsList>
            </AnalyticsItem>
          </Grid>
        </Grid>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
