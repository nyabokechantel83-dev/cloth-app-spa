import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import Shop from "../../pages/Shop";
import useFetch from "../../hooks/useFetch";
import { ShopProvider } from "../../context/ShopContext";

vi.mock("../../hooks/useFetch");

const products = [
  {
    id: 1,
    title: "Black Dress",
    price: 50,
    image: "dress.jpg",
  },
  {
    id: 2,
    title: "Blue Jeans",
    price: 40,
    image: "jeans.jpg",
  },
];

function renderShop() {
  return render(
    <MemoryRouter>
      <ShopProvider>
        <Shop />
      </ShopProvider>
    </MemoryRouter>
  );
}

describe("Shop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    renderShop();

    expect(
      screen.getByText("Loading products...")
    ).toBeInTheDocument();
  });

  it("displays products after a successful fetch", () => {
    useFetch.mockReturnValue({
      data: products,
      loading: false,
      error: null,
    });

    renderShop();

    expect(
      screen.getByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Blue Jeans")
    ).toBeInTheDocument();
  });

  it("shows an error when the fetch fails", () => {
    useFetch.mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch data",
    });

    renderShop();

    expect(
      screen.getByText("Failed to fetch data")
    ).toBeInTheDocument();
  });

  it("filters products when the user searches", async () => {
    const user = userEvent.setup();

    useFetch.mockReturnValue({
      data: products,
      loading: false,
      error: null,
    });

    renderShop();

    expect(
      screen.getByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Blue Jeans")
    ).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox");

    await user.type(searchInput, "Black");

    expect(
      screen.getByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Blue Jeans")
    ).not.toBeInTheDocument();
  });
});