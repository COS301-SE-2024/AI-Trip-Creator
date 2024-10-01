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

