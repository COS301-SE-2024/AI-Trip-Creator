import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  Box,
  InputLabel,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const Signup = ({ closeSignup, openLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number.",
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        name: name.trim(),
        birthday: birthday.trim(),
        email: email.trim(),
      });

      await sendEmailVerification(auth.currentUser);

      setShowSuccess(true);
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.message === "Firebase: Error (auth/email-already-in-use).")
        setError("Signup failed: Email already in use");
      else setError("Signup failed: " + error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      sx={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "1rem",
      }}
    >
      {!showSuccess ? (
        <>
          <InputLabel htmlFor="name">Name </InputLabel>
          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <InputLabel htmlFor="birthday">Birthday</InputLabel>
          <TextField
            fullWidth
            id="birthday"
            type="date"
            variant="outlined"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />

          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField
            fullWidth
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField
            fullWidth
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem", borderRadius: "20px", padding: "10px" }}
          >
            Signup
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ marginTop: "1rem" }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                closeSignup();
                openLogin();
              }}
            >
              Login
            </Link>
          </Typography>
        </>
      ) : (
        <Box textAlign="center">
          <Typography variant="h6">Signup successful!</Typography>
          <Typography variant="body2">
            A verification link has been sent to your email.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowSuccess(false)}
            sx={{ marginTop: "1rem" }}
          >
            Okay
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Signup;
