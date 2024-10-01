import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Settings from "../components/dashboard/settings"; // Adjust the path if necessary
import { MemoryRouter } from "react-router-dom"; // MemoryRouter for navigation
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

// Mock Firebase functions
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      email: "test@example.com",
    },
  })),
  updatePassword: jest.fn(),
  reauthenticateWithCredential: jest.fn(),
  EmailAuthProvider: {
    credential: jest.fn(),
  },
  deleteUser: jest.fn(),
}));

// Mock the Sidebar component
jest.mock("../components/dashboard/sidebar", () => () => <div>Mocked Sidebar</div>);

// Mock the themeContext to test toggleTheme
jest.mock("../components/themeContext/themeContext", () => ({
  useTheme: () => ({
    toggleTheme: jest.fn(),
  }),
}));

describe("Settings Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Settings component", () => {
    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    // Check for rendering of elements
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update Password/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Toggle Theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete Account/i })).toBeInTheDocument();
  });

  test("handles password change with valid credentials", async () => {
    const currentPassword = "oldPassword";
    const newPassword = "newPassword";

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: currentPassword } });
    fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: newPassword } });
    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    // Mock successful password update
    await waitFor(() => expect(reauthenticateWithCredential).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    ));
    expect(updatePassword).toHaveBeenCalledWith(expect.any(Object), newPassword);
    expect(screen.getByText(/Password updated successfully./i)).toBeInTheDocument();
  });

  test("displays an error when password change fails", async () => {
    reauthenticateWithCredential.mockRejectedValueOnce(new Error("Incorrect password"));

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: "wrongPassword" } });
    fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: "newPassword" } });
    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password change failed:/i)).toBeInTheDocument();
    });
  });

  test("handles theme toggle", async () => {
    const { toggleTheme } = require("../themeContext/themeContext").useTheme();

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Toggle Theme/i }));

    expect(toggleTheme).toHaveBeenCalled();
  });

  test("handles account deletion after confirmation", async () => {
    const currentPassword = "userPassword";

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Account/i }));

    // Confirm dialog is shown
    expect(screen.getByText(/Confirm Account Deletion/i)).toBeInTheDocument();

    // Fill in current password in the dialog
    fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: currentPassword } });
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    // Simulate account deletion
    await waitFor(() => expect(deleteUser).toHaveBeenCalled());
    expect(screen.getByText(/Account deleted successfully./i)).toBeInTheDocument();
  });

  test("displays an error when account deletion fails", async () => {
    deleteUser.mockRejectedValueOnce(new Error("Deletion failed"));

    render(
      <MemoryRouter>
        <Settings />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete Account/i }));
    fireEvent.change(screen.getByLabelText(/Current Password/i), { target: { value: "wrongPassword" } });
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));

    await waitFor(() => {
      expect(screen.getByText(/Account deletion failed:/i)).toBeInTheDocument();
    });
  });
});
