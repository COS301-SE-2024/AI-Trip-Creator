import React, { useState } from 'react';
import Sidebar from './sidebar';
import { useTheme } from '../themeContext/themeContext';
import { Button, TextField, Typography, Checkbox, FormControlLabel, Container, Box, CssBaseline } from '@mui/material';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import './dashboard.css';

const Settings = () => {
  const { toggleTheme } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setSuccess('Password updated successfully.');
      } catch (error) {
        console.error("Password change failed:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Container>
          <h1>Settings</h1>
          <Box className="settings-content" mb={4}>
            <h2>Account Settings</h2>
            <Typography variant="body1">Update your account details and preferences below.</Typography>

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
              <Button submit className = "button" variant="contained" color="primary" >
                Update Password
              </Button>
              {error && <Typography color="error">{error}</Typography>}
              {success && <Typography color="success">{success}</Typography>}
            </form>
          </Box>
          <h2>Theme Preferences</h2>
          <Typography variant="body1">Press the 'Toggle Theme' button to switch between light mode/dark mode.</Typography>
          <Button className = "button" variant="contained" color="primary" onClick={toggleTheme} sx={{ margin: '20px 0' }}>
            Toggle Theme
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Settings;