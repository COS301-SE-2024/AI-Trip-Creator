import React, { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, closeLogin, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging log
    console.log("Attempting login with email:", email); // Debugging log
    console.log("Attempting login with password:", password); // Debugging log

    try {
      // const response = await axios.post("/api/login", { email, password });
      // if (response.data.success) {
      setIsLoggedIn(true);
      console.log("Login successful, navigating to dashboard"); // Debugging log
      navigate("/dashboard"); // Navigate to the dashboard
      // } else {
      // handle login failure
      // }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Email
        </label>
        <Input
          fullWidth
          clearable
          bordered
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          Password
        </label>
        <Input
          fullWidth
          clearable
          bordered
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Login</Button>
      <p>
        Don't have an account?{" "}
        <Link
          onClick={() => {
            closeLogin();
            openSignup();
          }}
          style={{ color: "#0000EE" }}
        >
          Signup
        </Link>
      </p>
    </form>
  );
};

export default Login;
