// import React from "react";
// import { render, screen } from "@testing-library/react";
// import Splash from "../components/splash/splash";
// import { BrowserRouter as Router } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// // Mock Firebase initialization and methods
// jest.mock("firebase/app", () => ({
//   initializeApp: jest.fn(),
// }));

// jest.mock("firebase/auth", () => ({
//   getAuth: jest.fn(),
//   signInWithEmailAndPassword: jest.fn(),
//   sendPasswordResetEmail: jest.fn(),
// }));

// jest.mock("firebase/firestore", () => ({
//   getFirestore: jest.fn(),
// }));

// describe("Splash Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders Splash component", () => {
//     render(
//       <Router>
//         <Splash />
//       </Router>,
//     );

//     // Check if all elements are rendered correctly
//     //expect(screen.getByText(/Trip Creator/i)).toBeInTheDocument(); // Update the text check as needed
//   });

//   // Add more tests as needed
// });

import React from "react";
import { render, screen } from "@testing-library/react";
import Splash from "../components/splash/splash";
import { BrowserRouter as Router } from "react-router-dom";

// Mock Firebase modules and services
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(), // Mock analytics since it's throwing an error
}));

// Mock your Firebase config file
jest.mock("../firebase/firebase-config", () => ({
  app: {}, // Mock empty app object
  auth: {},
  firestore: {},
  db: {},
  analytics: {},
}));

describe("Splash Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Splash component", () => {
    render(
      <Router>
        <Splash />
      </Router>
    );

    // Check if specific elements are rendered
    expect(screen.getByText(/AI Trip Creator/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Your Perfect Trip/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});
