import React from "react";
import { render, screen } from "@testing-library/react";
import Settings from "../components/dashboard/settings";
import { BrowserRouter as Router } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useTheme } from "../themeContext/themeContext";

const { toggleTheme } = useTheme();

// Mock Firebase initialization
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

// Mock Firebase auth and firestore functions
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { email: "test@example.com" },
  })),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

// Mock the firebase-config.js to prevent real Firebase initialization
jest.mock("../firebase/firebase-config", () => ({
  app: {}, // Mock the Firebase app object
  auth: {}, // Mock Firebase Auth
  firestore: {}, // Mock Firestore
  db: {}, // Mock Firestore instance
  analytics: {}, // Mock Analytics
}));

// Mock the useTheme hook
jest.mock("../themeContext/themeContext", () => ({
  useTheme: () => ({
    toggleTheme: jest.fn(), // Mock toggleTheme function
  }),
}));

describe("Settings Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    initializeApp.mockReturnValue({}); // Mock an empty Firebase app object
  });

  test("renders Settings component", () => {
    render(
      <Router>
        <Settings />
      </Router>
    );

    // Check if the settings component is rendered correctly
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Theme Preferences/i)).toBeInTheDocument();
    expect(screen.getByText(/App Version/i)).toBeInTheDocument();
  });

  // Add more tests if needed
});
