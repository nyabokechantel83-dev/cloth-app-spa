import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { ShopProvider } from "../context/ShopContext";

function renderApp(route = "/") {
  render(
    <MemoryRouter initialEntries={[route]}>
      <ShopProvider>
        <App />
      </ShopProvider>
    </MemoryRouter>,
  );
}

test("renders the navbar", () => {
  renderApp();

  expect(screen.getByRole("navigation")).toBeInTheDocument();
});

test("renders the home page", () => {
  renderApp("/");

  expect(
    screen.getByRole("heading", { name: /Style That/i }),
  ).toBeInTheDocument();
});

test("renders the shop page", () => {
  renderApp("/shop");

  expect(screen.getByText(/shop/i)).toBeInTheDocument();
});

test("renders the cart page", () => {
  renderApp("/cart");

  expect(
    screen.getByRole("heading", { name: "Shopping Cart" }),
  ).toBeInTheDocument();
});

test("renders the admin page", () => {
  renderApp("/admin");

  expect(
    screen.getByRole("heading", { name: "Admin Dashboard" }),
  ).toBeInTheDocument();
});
