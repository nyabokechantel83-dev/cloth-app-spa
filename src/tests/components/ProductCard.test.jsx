import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductCard from "../../components/ProductCard";

const product = {
  id: 1,
  title: "Black Dress",
  price: 50,
  image: "dress.jpg",
};

describe("ProductCard", () => {
  it("renders the product title", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Black Dress")
    ).toBeInTheDocument();
  });

  it("renders the product price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Ksh 50")
    ).toBeInTheDocument();
  });

  it("renders the product image", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("img", {
        name: "Black Dress",
      })
    ).toBeInTheDocument();
  });

  it("renders the View Details link", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", {
        name: "View Details",
      })
    ).toBeInTheDocument();
  });

  it("links to the correct product details page", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", {
      name: "View Details",
    });

    expect(link).toHaveAttribute(
      "href",
      "/products/1"
    );
  });
});