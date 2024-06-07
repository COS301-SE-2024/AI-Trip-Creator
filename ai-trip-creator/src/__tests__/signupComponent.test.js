import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for matchers like toBeInTheDocument
import axios from "axios";
import Signup from "../components/auth/signup";

jest.mock("axios");

const mockCloseSignup = jest.fn();
const mockOpenLogin = jest.fn();

const renderSignupComponent = () => {
  return render(
    <Signup closeSignup={mockCloseSignup} openLogin={mockOpenLogin} />,
  );
};

describe("Signup Component", () => {
  it("calls closeSignup and openLogin when login link is clicked", () => {
    renderSignupComponent();

    const loginLink = screen.getByText(/login/i);
    fireEvent.click(loginLink);

    expect(mockCloseSignup).toHaveBeenCalled();
    expect(mockOpenLogin).toHaveBeenCalled();
  });
});
