import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  Container,
  Paper,
  Grid,
  Drawer,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CardMedia,
  Slider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-material-ui-carousel';
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import "./dashboard.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SavedItineraries = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const auth = getAuth();
    const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

    return (
            <Box display="flex">
              {/* Sidebar */}
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
        
              {/* Main Content */}
              <Box
                flexGrow={1}
                p={3}
                sx={{ ml: isSmUp ? "240px" : "0", overflowX: "hidden" }}
                className="content" // Applying the content class from the CSS
              >
                <Container maxWidth="lg">
                  {/* Apply the same style as other headings */}
                  <h1 className="heading1">Saved Itineraries</h1>
        
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper elevation={3} sx={{ p: 2 }} className="card">
                        <Typography variant="body1" sx={{ fontSize: "18px", fontFamily: "Poppins" }}>
                          You don't have any saved itineraries yet.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
    );
  };

export default SavedItineraries;