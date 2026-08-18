import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

import Login from "../../pages/Login";

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the login form", () => {
    render(<Login />);

    expect(
      screen.getByRole("heading", { name: "Login" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });

  test("allows the user to enter email and password", () => {
    render(<Login />);

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, {
      target: { value: "admin@example.com" },
    });

    fireEvent.change(password, {
      target: { value: "admin123" },
    });

    expect(email).toHaveValue("admin@example.com");
    expect(password).toHaveValue("admin123");
  });

  test("navigates admin to the admin page after successful login", async () => {
    mockLogin.mockResolvedValue({
      role: "admin",
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "admin@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "admin123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "admin@example.com",
        "admin123"
      );

      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });

  test("navigates normal user to the home page after successful login", async () => {
    mockLogin.mockResolvedValue({
      role: "user",
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("shows an alert when login fails", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid login"));

    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(<Login />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Invalid email or password"
      );
    });

    alertMock.mockRestore();
  });
});