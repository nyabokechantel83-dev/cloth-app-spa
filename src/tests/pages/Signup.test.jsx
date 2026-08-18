import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import {
  describe,
  test,
  expect,
  beforeEach,
  vi,
} from "vitest";

const mockSignup = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    signup: mockSignup,
  }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

import Signup from "../../pages/Signup";

describe("Signup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the signup form", () => {
    render(<Signup />);

    expect(
      screen.getByRole("heading", { name: "Create Account" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();

    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Sign Up" })
    ).toBeInTheDocument();
  });

  test("allows the user to enter signup information", () => {
    render(<Signup />);

    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");

    fireEvent.change(name, {
      target: { value: "Taby" },
    });

    fireEvent.change(email, {
      target: { value: "taby@example.com" },
    });

    fireEvent.change(password, {
      target: { value: "password123" },
    });

    expect(name).toHaveValue("Taby");
    expect(email).toHaveValue("taby@example.com");
    expect(password).toHaveValue("password123");
  });

  test("signs up a user and navigates to home page", async () => {
    mockSignup.mockResolvedValue({
      name: "Taby",
      email: "taby@example.com",
    });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Taby" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "taby@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Sign Up" })
    );

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith(
        "Taby",
        "taby@example.com",
        "password123"
      );

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("shows an alert when signup fails", async () => {
    mockSignup.mockRejectedValue(
      new Error("Email already exists")
    );

    const alertMock = vi
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(<Signup />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Taby" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "existing@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Sign Up" })
    );

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Email already exists"
      );
    });

    alertMock.mockRestore();
  });

  test("navigates to login when Login button is clicked", () => {
    render(<Signup />);

    fireEvent.click(
      screen.getByRole("button", { name: "Login" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});