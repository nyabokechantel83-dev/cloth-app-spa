import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { AuthProvider } from "../../context/AuthContext";

function renderNavbar() {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </MemoryRouter>
  );
}

test("renders the navigation bar", () => {
  renderNavbar();

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

test("renders the public navigation links when logged out", () => {
  renderNavbar();

  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Checkout" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
});

test("does not show Admin when logged out", () => {
  renderNavbar();

  expect(
    screen.queryByRole("link", { name: "Admin" })
  ).not.toBeInTheDocument();
});

test("does not show Logout when logged out", () => {
  renderNavbar();

  expect(
    screen.queryByRole("button", { name: "Logout" })
  ).not.toBeInTheDocument();
});