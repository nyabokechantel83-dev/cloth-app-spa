import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductDetails from "../../pages/ProductDetails";
import useFetch from "../../hooks/useFetch";

vi.mock("../../hooks/useFetch");

const product = {
  id: 1,
  name: "Classic Shirt",
  category: "Men",
  price: 2500,
  image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80",
  description: "A comfortable classic shirt.",
};

function renderProductDetails() {
  return render(
    <MemoryRouter initialEntries={["/products/1"]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    renderProductDetails();

    expect(screen.getByText("Loading product...")).toBeInTheDocument();
  });

  it("shows an error message when fetching fails", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Failed to fetch data",
    });

    renderProductDetails();

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("shows product not found when there is no product", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    renderProductDetails();

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  it("renders product information", () => {
    useFetch.mockReturnValue({
      data: product,
      loading: false,
      error: null,
    });

    renderProductDetails();

    expect(screen.getByRole("heading", { name: "Classic Shirt" }))
      .toBeInTheDocument();

    expect(screen.getByText("Men")).toBeInTheDocument();
    expect(screen.getByText("ksh 2500")).toBeInTheDocument();
    expect(
      screen.getByText("A comfortable classic shirt.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Classic Shirt" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Back to Shop" })
    ).toHaveAttribute("href", "/Shop");
  });
});