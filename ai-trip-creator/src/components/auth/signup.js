import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import "./auth.css";

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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user);

      await updateProfile(user, { displayName: name });
      console.log("Profile updated");

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        name: name,
        birthday: birthday,
        email: email,
      });
      console.log("Document written");

      setShowSuccess(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.message);
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ marginBottom: "0.25rem", width: "100%" }}>
            <label style={{ marginBottom: "0.25rem", display: "block" }}>
              Fullname
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
              onPress={() => {
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
          <Button onPress={() => setShowSuccess(false)}>Okay</Button>
        </div>
      )}
    </>
  );
};

export default Signup;
