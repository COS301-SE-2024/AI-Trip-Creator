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
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {resetError && <Alert severity="error">{resetError}</Alert>}
      {resetSuccess && <Alert severity="success">{resetSuccess}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        autoComplete="email"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        autoComplete="current-password"
      />

      <Box sx={{ position: "relative" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // Disable button when loading
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>

      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Don't have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            closeLogin();
            openSignup();
          }}
        >
          Signup
        </Link>
        <br />
        Forgot your password?{" "}
        <Link component="button" variant="body2" onClick={handlePasswordReset}>
          Reset Password
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
