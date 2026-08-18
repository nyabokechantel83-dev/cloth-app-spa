import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import OrderSuccess from "../../pages/OrderSuccess";

describe("OrderSuccess", () => {
  it("renders the order success message", () => {
    render(
      <MemoryRouter>
        <OrderSuccess />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: "Order Placed Successfully!",
      })
    ).toBeInTheDocument();
  });

  it("displays the order confirmation message", () => {
    render(
      <MemoryRouter>
        <OrderSuccess />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "Thank you for your order. Your order has been received successfully."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "We will process your order and prepare it for delivery."
      )
    ).toBeInTheDocument();
  });

  it("has a Continue Shopping link", () => {
    render(
      <MemoryRouter>
        <OrderSuccess />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", {
      name: "Continue Shopping",
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });

  it("displays the footer", () => {
    render(
      <MemoryRouter>
        <OrderSuccess />
      </MemoryRouter>
    );

    expect(
      screen.getByText("© 2026 JOVETA CLOTHLINE. All rights reserved.")
    ).toBeInTheDocument();
  });
});