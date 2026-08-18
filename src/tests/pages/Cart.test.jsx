import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { ShopProvider, useShop } from "../../context/ShopContext";
import Cart from "../../pages/Cart";

function TestAddProduct() {
  const { addToCart } = useShop();

  const product = {
    id: 1,
    name: "Black Hoodie",
    price: 2500,
    image: "hoodie.jpg",
    category: "Hoodies",
    description: "A comfortable black hoodie",
  };

  return (
    <button onClick={() => addToCart(product)}>
      Add Hoodie
    </button>
  );
}

describe("Cart", () => {
  test("displays empty cart message when cart is empty", () => {
    render(
      <MemoryRouter>
      <ShopProvider>
        <Cart />
      </ShopProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Your cart is empty.")
    ).toBeInTheDocument();
  });

  test("displays a product after it is added to the cart", () => {
    render(
      <MemoryRouter>
        <ShopProvider>
          <TestAddProduct />
          <Cart />
        </ShopProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Hoodie",
      })
    );



    expect(
      screen.getByText("Black Hoodie")
    ).toBeInTheDocument();

    expect(
      screen.getByText("KSh 2500")
    ).toBeInTheDocument();
  });

  test("increases product quantity", () => {
    render(
      <MemoryRouter>
      <ShopProvider>
        <TestAddProduct />
        <Cart />
      </ShopProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Hoodie",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "+",
      })
    );

    expect(
      screen.getByText("2")
    ).toBeInTheDocument();
  });

  test("decreases product quantity", () => {
    render(
      <MemoryRouter>
      <ShopProvider>
        <TestAddProduct />
        <Cart />
      </ShopProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Hoodie",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "+",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "-",
      })
    );

    expect(
      screen.getByText("1")
    ).toBeInTheDocument();
  });

  test("removes product from cart", () => {
    render(
      <MemoryRouter>
      <ShopProvider>
        <TestAddProduct />
        <Cart />
      </ShopProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Hoodie",
      })
    );

    expect(
      screen.getByText("Black Hoodie")
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Remove",
      })
    );

    expect(
      screen.getByText("Your cart is empty.")
    ).toBeInTheDocument();
  });

  test("calculates the correct total", () => {
    render(
      <MemoryRouter>
      <ShopProvider>
        <TestAddProduct />
        <Cart />
      </ShopProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Hoodie",
      })
    );

    expect(
      screen.getByText("Total: KSh 2500")
    ).toBeInTheDocument();
  });

  test("updates total when quantity increases", () => {
    render(
      <MemoryRouter>
      <ShopProvider>
        <TestAddProduct />
        <Cart />
      </ShopProvider>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Hoodie",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "+",
      })
    );

    expect(
      screen.getByText("Total: KSh 5000")
    ).toBeInTheDocument();
  });
});