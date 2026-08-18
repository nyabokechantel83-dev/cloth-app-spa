import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { ShopProvider } from "../context/ShopContext";
import { AuthProvider } from "../context/AuthContext";

function renderApp(route = "/") {
  render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test("renders the navbar", () => {
  renderApp();

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

test("renders the home page", () => {
  renderApp("/");

  expect(
    screen.getByRole("heading", { name: /Style That/i })
  ).toBeInTheDocument();
});

test("renders the shop page", () => {
  renderApp("/shop");

  expect(screen.getByText(/shop/i)).toBeInTheDocument();
});

test("renders the cart page", () => {
  renderApp("/cart");

  expect(
    screen.getByRole("heading", { name: "Shopping Cart" })
  ).toBeInTheDocument();
});

test("redirects normal users away from admin", () => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: 1,
      name: "User",
      email: "user@example.com",
      role: "user",
    })
  );

  renderApp("/admin");

  expect(
    screen.getByRole("heading", { name: "Login" })
  ).toBeInTheDocument();
});