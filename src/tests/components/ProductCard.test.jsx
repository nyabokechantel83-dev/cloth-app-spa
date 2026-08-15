import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductCard from "../../components/ProductCard";
import { ShopProvider } from "../../context/ShopContext";

const product = {
  id: 1,
  title: "Black Dress",
  price: 50,
  image: "dress.jpg",
};

function renderProductCard() {
  return render(
    <MemoryRouter>
      <ShopProvider>
        <ProductCard product={product} />
      </ShopProvider>
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("renders the product title", () => {
    renderProductCard();

    expect(
      screen.getByRole("heading", { name: "Black Dress" })
    ).toBeInTheDocument();
  });

  it("renders the product price", () => {
    renderProductCard();

    expect(screen.getByText("Ksh 50")).toBeInTheDocument();
  });

  it("renders the product image", () => {
    renderProductCard();

    expect(
      screen.getByRole("img", { name: "Black Dress" })
    ).toBeInTheDocument();
  });

  it("renders the View Details link", () => {
    renderProductCard();

    expect(
      screen.getByRole("link", { name: "View Details" })
    ).toBeInTheDocument();
  });

  it("links to the correct product details page", () => {
    renderProductCard();

    expect(
      screen.getByRole("link", { name: "View Details" })
    ).toHaveAttribute("href", "/products/1");
  });
});