import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import "./auth.css"; // Assuming there's custom CSS for additional styling

const Login = ({ setIsLoggedIn, closeLogin, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.code === "auth/wrong-password"
          ? "Incorrect password. Please try again."
          : error.code === "auth/user-not-found"
          ? "No account found with this email."
          : "Login failed. Please check your credentials.";

      setError(errorMessage);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetError("");
    setResetSuccess("");

    if (!email) {
      setResetError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setResetSuccess("Password reset email sent!");
    } catch (error) {
      setResetError("Password reset failed: Invalid email.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      className="login-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 400,
        width: '100%',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 600, mb: 2 }}>
        Welcome Back
      </Typography>

      {error && <Alert severity="error" sx={{ borderRadius: '8px' }}>{error}</Alert>}
      {resetError && <Alert severity="error" sx={{ borderRadius: '8px' }}>{resetError}</Alert>}
      {resetSuccess && <Alert severity="success" sx={{ borderRadius: '8px' }}>{resetSuccess}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        autoComplete="email"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        autoComplete="current-password"
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          py: 1.5,
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          backgroundColor: '#2563eb',
          '&:hover': {
            backgroundColor: '#1d4ed8',
          },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              closeLogin();
              openSignup();
            }}
            sx={{ 
              fontWeight: 600, 
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' } 
            }}
          >
            Sign up
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          <Link
            component="button"
            variant="body2"
            onClick={handlePasswordReset}
            sx={{ 
              fontWeight: 600, 
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' } 
            }}
          >
            Forgot password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
