// loginComponent.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/auth/login";
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
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  test("renders Login component", () => {
    // Mock Firebase initialization
    initializeApp.mockReturnValue({}); // Mock an empty Firebase app object
    const auth = getAuth();

    render(
      <Router>
        <Login
          setIsLoggedIn={jest.fn()}
          closeLogin={jest.fn()}
          openSignup={jest.fn()}
        />
      </Router>,
    );

    // Check if all elements are rendered correctly
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot your password/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});
