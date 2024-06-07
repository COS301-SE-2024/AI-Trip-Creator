import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/auth/login";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  let mockSetIsLoggedIn;
  let mockCloseLogin;
  let mockOpenSignup;
  let mockNavigate;

  beforeEach(() => {
    mockSetIsLoggedIn = jest.fn();
    mockCloseLogin = jest.fn();
    mockOpenSignup = jest.fn();
    mockNavigate = require("react-router-dom").useNavigate;
    mockNavigate.mockReset(); // Ensure the mock is reset before each test
  });

  const renderLoginComponent = () => {
    return render(
      <Router>
        <Login
          setIsLoggedIn={mockSetIsLoggedIn}
          closeLogin={mockCloseLogin}
          openSignup={mockOpenSignup}
        />
      </Router>,
    );
  };

  test("renders email and password input fields", () => {
    renderLoginComponent();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("calls openSignup and closeLogin when Signup link is clicked", () => {
    renderLoginComponent();
    const signupLink = screen.getByText(/signup/i);

    fireEvent.click(signupLink);

    expect(mockCloseLogin).toHaveBeenCalled();
    expect(mockOpenSignup).toHaveBeenCalled();
  });
});
