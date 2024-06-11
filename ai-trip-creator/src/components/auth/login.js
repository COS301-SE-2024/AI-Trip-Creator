import React, { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import "./auth.css";

const Login = ({ setIsLoggedIn, closeLogin, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
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
