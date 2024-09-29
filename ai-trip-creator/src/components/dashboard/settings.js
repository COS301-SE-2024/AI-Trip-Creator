import React, { useState } from "react";
import Sidebar from "./sidebar";
import { useTheme } from "../themeContext/themeContext";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Settings = () => {
  const { toggleTheme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      } catch (error) {
        console.error("Password change failed:", error);
        setError(error.message);
      }
    }
  };

  const handleToggle = () => {
    toggleTheme();
  };

  const handleDeleteAccount = async () => {
    setOpenConfirmDialog(false);
    setError("");
    setSuccess("");

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword,
        );
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        setSuccess("Account deleted successfully.");
        setOpenSnackbar(true); // Show snackbar

        // Wait 5 seconds before redirecting
        setTimeout(() => {
          navigate("/"); // Redirect to splash page after deletion
        }, 5000);
      } catch (error) {
        console.error("Account deletion failed:", error);
        setError(error.message);
      }
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        style={{
          position: "fixed",
          width: "250px",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
      <div
        style={{
          marginLeft: "250px",
          padding: "20px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        <Container>
          <h1 style={{}}>Settings</h1>


          <Box
            mb={4}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius="8px"
          >
            <h2 style={{ marginTop: "7px" }}>Account Settings</h2>
            <Typography variant="body1" sx={{ mt: "-8px", mb: "8px" }}>
              Update your account details and preferences below.
            </Typography>
            <form onSubmit={handlePasswordChange}>
              <h2>Change Password</h2>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Update Password
              </Button>
              {error && <Typography color="error">{error}</Typography>}
              {success && <Typography color="primary">{success}</Typography>}
            </form>
          </Box>

          <Box
            mb={4}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius="8px"
          >
            <h2 style={{ marginTop: "7px" }}>Theme Preferences</h2>
            <Typography variant="body1">
              Press the 'Toggle Theme' button to switch between light mode/dark
              mode.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleTheme}
              sx={{ margin: "20px 0" }}
            >
              Toggle Theme
            </Button>
          </Box>

          <Box
            mb={4}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius="8px"
          >
            <h2 style={{ marginTop: "7px" }}>App Version</h2>
            <Typography variant="body1">
              You are currently using version 1.0.0 of the AI Trip Creator app.
            </Typography>
          </Box>

          <Box
            mb={4}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius="8px"
          >
            <h2 style={{ marginTop: "7px" }}>Account Deletion</h2>
            <Typography variant="body1">
              Once deleted, your account and all associated data will be
              permanently removed. Please proceed with caution.
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenConfirmDialog(true)}
              sx={{ marginTop: "16px" }}
            >
              Delete Account
            </Button>
          </Box>

          <Dialog
            open={openConfirmDialog}
            onClose={() => setOpenConfirmDialog(false)}
          >
            <DialogTitle>Confirm Account Deletion</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Typography>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                margin="normal"
              />
              {error && <Typography color="error">{error}</Typography>}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenConfirmDialog(false)}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleDeleteAccount} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for success message */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
              Account deleted successfully. Redirecting...
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </Box>
  );
};

export default Settings;
