import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import ProductList from "../../components/ProductList";
import { ShopProvider } from "../../context/ShopContext";

const products = [
  {
    id: 1,
    name: "Black Dress",
    price: 50,
    image: "dress.jpg",
  },
  {
    id: 2,
    name: "Blue Jeans",
    price: 40,
    image: "jeans.jpg",
  },
];

function renderProductList(products) {
  return render(
    <MemoryRouter>
      <ShopProvider>
        <ProductList products={products} />
      </ShopProvider>
    </MemoryRouter>
  );
}

describe("ProductList", () => {
  it("renders all products", () => {
    renderProductList(products);

    expect(
      screen.getByText("Black Dress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Blue Jeans")
    ).toBeInTheDocument();
  });

  it("renders a ProductCard for each product", () => {
    renderProductList(products);

    const links = screen.getAllByRole("link", {
      name: "View Details",
    });

    expect(links).toHaveLength(2);
  });

  it("shows No products found when the list is empty", () => {
    renderProductList([]);

    expect(
      screen.getByText("No products found")
    ).toBeInTheDocument();
  });

  it("shows No products found when products are not provided", () => {
    renderProductList();

    expect(
      screen.getByText("No products found")
    ).toBeInTheDocument();
  });
});