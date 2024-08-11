import React, { useState } from "react";
import { Button, TextField, Link, Box, Typography } from "@mui/material";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import "./auth.css";

const Login = ({ setIsLoggedIn, closeLogin, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed: Invalid Email/Password");
    }
  };

  const handlePasswordReset = async () => {
    setResetError("");
    setResetSuccess("");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess("Password reset email sent!");
    } catch (error) {
      console.error("Password reset failed:", error);
      setResetError("Password reset failed: Invalid Email");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Typography variant="body2">
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
      </Typography>
      <Typography variant="body2">
        Forgot your password?{" "}
        <Link component="button" variant="body2" onClick={handlePasswordReset}>
          Reset Password
        </Link>
      </Typography>
      {resetError && <Typography color="error">{resetError}</Typography>}
      {resetSuccess && <Typography color="success">{resetSuccess}</Typography>}
    </Box>
  );
};

export default Login;
