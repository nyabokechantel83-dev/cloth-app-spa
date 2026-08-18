import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import Checkout from "../../pages/Checkout";
import { useShop } from "../../context/ShopContext";

vi.mock("../../context/ShopContext", () => ({
  useShop: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCart = [
  {
    id: 1,
    name: "Black Dress",
    price: 2000,
    quantity: 2,
  },
  {
    id: 2,
    name: "White Shirt",
    price: 1500,
    quantity: 1,
  },
];

describe("Checkout", () => {
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(window, "alert").mockImplementation(() => {});

    useShop.mockReturnValue({
      cart: mockCart,
      total: 5500,
      clearCart: mockClearCart,
    });
  });

  it("renders the checkout page", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Checkout" })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Customer Information" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Order Summary" })
    ).toBeInTheDocument();
  });

  it("renders customer information fields", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Delivery Address")).toBeInTheDocument();
  });

  it("renders products in the order summary", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("Black Dress")).toBeInTheDocument();
    expect(screen.getByText("White Shirt")).toBeInTheDocument();

    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();

    expect(screen.getByText("Ksh 5500")).toBeInTheDocument();
  });

  it("updates customer information when the user types", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone Number");
    const addressInput = screen.getByLabelText("Delivery Address");

    fireEvent.change(nameInput, {
      target: { name: "name", value: "Joey" },
    });

    fireEvent.change(emailInput, {
      target: { name: "email", value: "joey@example.com" },
    });

    fireEvent.change(phoneInput, {
      target: { name: "phone", value: "0712345678" },
    });

    fireEvent.change(addressInput, {
      target: { name: "address", value: "Nairobi, Kenya" },
    });

    expect(nameInput).toHaveValue("Joey");
    expect(emailInput).toHaveValue("joey@example.com");
    expect(phoneInput).toHaveValue("0712345678");
    expect(addressInput).toHaveValue("Nairobi, Kenya");
  });

  it("places the order successfully", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { name: "name", value: "Josephine" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { name: "email", value: "josephine@example.com" },
    });

    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { name: "phone", value: "0712345678" },
    });

    fireEvent.change(screen.getByLabelText("Delivery Address"), {
      target: { name: "address", value: "Nairobi, Kenya" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Place Order" })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Order placed successfully!"
    );

    expect(mockClearCart).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/order-success");
  });

  it("shows empty cart message when the cart is empty", () => {
    useShop.mockReturnValue({
      cart: [],
      total: 0,
      clearCart: mockClearCart,
    });

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Continue Shopping" })
    ).toHaveAttribute("href", "/shop");
  });
});