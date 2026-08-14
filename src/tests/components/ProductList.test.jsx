import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductList from "../../components/ProductList";

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

describe("ProductList", () => {
  it("renders all products", () => {
    render(
      <MemoryRouter>
        <ProductList products={products} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Black Dress")).toBeInTheDocument();
    expect(screen.getByText("Blue Jeans")).toBeInTheDocument();
  });

  it("renders a ProductCard for each product", () => {
    render(
      <MemoryRouter>
        <ProductList products={products} />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole("link", {
      name: "View Details",
    });

    expect(links).toHaveLength(2);
  });

  it("shows No products found when the list is empty", () => {
    render(
      <MemoryRouter>
        <ProductList products={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("shows No products found when products are not provided", () => {
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>,
    );

    expect(screen.getByText("No products found")).toBeInTheDocument();
  });
});
