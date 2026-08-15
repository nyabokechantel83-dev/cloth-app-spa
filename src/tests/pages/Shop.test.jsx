import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Shop from "../../pages/Shop";

const mockProducts = [
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

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Shop", () => {
  it("shows loading state", () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Loading products...")
    ).toBeInTheDocument();
  });

  it("displays products after a successful fetch", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Blue Jeans")
    ).toBeInTheDocument();
  });

  it("shows an error when the fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network error")
    );

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Network error")
    ).toBeInTheDocument();
  });

  it("filters products when the user searches", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Blue Jeans")
    ).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", {
      name: "Search Products",
    });

    await user.type(searchInput, "dress");

    expect(
      screen.getByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Blue Jeans")
    ).not.toBeInTheDocument();
  });
});