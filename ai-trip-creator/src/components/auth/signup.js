import React, { useState } from "react";
import { Button, Input, Link, Select } from "@nextui-org/react";
import axios from "axios";

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
            maxHeight: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Input
            fullWidth
            clearable
            bordered
            labelPlaceholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
          <Input
            fullWidth
            clearable
            bordered
            labelPlaceholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
          <Input
            fullWidth
            clearable
            bordered
            labelPlaceholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
          <Input
            fullWidth
            bordered
            labelPlaceholder="Birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
          <Select
            fullWidth
            bordered
            placeholder="Select Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
          <Button type="submit">Signup</Button>
          <p>
            Already have an account?{" "}
            <Link
              onClick={() => {
                closeSignup();
                openLogin();
              }}
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
