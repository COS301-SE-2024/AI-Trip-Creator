import React from "react";
import { render, screen } from "@testing-library/react";
import Signup from "../components/auth/signup";
import { BrowserRouter as Router } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Mock Firebase initialization
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

// Mock Firebase auth and firestore functions
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    initializeApp.mockReturnValue({}); // Mock an empty Firebase app object
    getAuth.mockReturnValue({});
    getFirestore.mockReturnValue({});
  });

  test("renders Signup component", () => {
    render(
      <Router>
        <Signup closeSignup={jest.fn()} openLogin={jest.fn()} />
      </Router>,
    );

    // Check if all elements are rendered correctly

    // Check other elements
    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});
