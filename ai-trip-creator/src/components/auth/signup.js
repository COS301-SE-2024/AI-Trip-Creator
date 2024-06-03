import React, { useState } from "react";
import {
  Button,
  Input,
  Link,
  Select,
  SelectItem,
  MenuItem,
} from "@nextui-org/react";
import axios from "axios";
import './auth.css';

const Signup = ({ closeSignup, openLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
        name,
        birthday,
        gender,
      });
      if (response.data.success) {
        setShowSuccess(true);
      } else {
        // handle signup failure
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      {!showSuccess ? (
        <form
          onSubmit={handleSignup}
          style={{
            maxWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0.5rem",
          }}
        >
          <div style={{ marginBottom: "0.25rem", width: "100%" }}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              Name
            </label>
            <Input
              style={{ width: "100%" }}
              fullWidth
              clearable
              bordered
              labelPlaceholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "0.25rem", width: "100%" }}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              Birthday
            </label>
            <Input
              style={{ height: "32px", width: "100%" }}
              fullWidth
              bordered
              labelPlaceholder="Birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "0.25rem", width: "100%" }}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              Email
            </label>
            <Input
              style={{ width: "100%" }}
              fullWidth
              clearable
              bordered
              labelPlaceholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "0.25rem", width: "100%" }}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              Password
            </label>
            <Input
              style={{ width: "100%" }}
              fullWidth
              clearable
              bordered
              labelPlaceholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            style={{
              alignSelf: "center",
              marginTop: "0.5rem",
              width: "100%",
              borderRadius: "20px",
              padding: "8px",
            }}
          >
            Signup
          </Button>

          <p>
            Already have an account?{" "}
            <Link
              onClick={() => {
                closeSignup();
                openLogin();
              }}
              style={{ color: "#0000EE" }}
            >
              Login
            </Link>
          </p>
        </form>
      ) : (
        <div>
          <p>
            Signup successful! A verification link has been sent to your email.
          </p>
          <Button onClick={() => setShowSuccess(false)}>Okay</Button>
        </div>
      )}
    </>
  );
};

export default Signup;
