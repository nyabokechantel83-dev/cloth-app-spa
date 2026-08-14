import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/Home";

function renderHome() {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

test("renders the home page", () => {
  renderHome();

  const heading = screen.getByRole("heading", {
    name: "Welcome to Cloth App",
  });

  expect(heading).toBeInTheDocument();
});

test("renders the description", () => {
  renderHome();

  const description = screen.getByText(
    "Discover stylish clothing for every occasion.",
  );

  expect(description).toBeInTheDocument();
});

test("renders the Shop Now link", () => {
  renderHome();

  const shopLink = screen.getByRole("link", {
    name: "Shop Now",
  });

  expect(shopLink).toBeInTheDocument();
});
