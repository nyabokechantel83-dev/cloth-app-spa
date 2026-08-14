import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ShopProvider } from "../../context/ShopContext";
import Admin from "../../pages/Admin";

describe("Admin", () => {
  test("renders the admin dashboard", () => {
    render(
      <ShopProvider>
        <Admin />
      </ShopProvider>
    );

    expect(
      screen.getByRole("heading", {
        name: "Admin Dashboard",
      })
    ).toBeInTheDocument();
  });

  test("renders the product form", () => {
    render(
      <ShopProvider>
        <Admin />
      </ShopProvider>
    );

    expect(
      screen.getByRole("heading", {
        name: "Add New Product",
      })
    ).toBeInTheDocument();
  });

  test("shows no products message when there are no products", () => {
    render(
      <ShopProvider>
        <Admin />
      </ShopProvider>
    );

    expect(
      screen.getByText("No products available.")
    ).toBeInTheDocument();
  });

  test("adds a new product", () => {
    render(
      <ShopProvider>
        <Admin />
      </ShopProvider>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter product name"),
      {
        target: {
          value: "Black Hoodie",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter price"),
      {
        target: {
          value: "2500",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter image URL"),
      {
        target: {
          value: "hoodie.jpg",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("e.g. Dresses"),
      {
        target: {
          value: "Hoodies",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter product description"
      ),
      {
        target: {
          value: "A comfortable black hoodie",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Product",
      })
    );

    expect(
      screen.getByText("Black Hoodie")
    ).toBeInTheDocument();

    expect(
      screen.getByText("KSh 2500")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Hoodies")
    ).toBeInTheDocument();
  });

  test("clears the form after adding a product", () => {
    render(
      <ShopProvider>
        <Admin />
      </ShopProvider>
    );

    const productNameInput =
      screen.getByPlaceholderText(
        "Enter product name"
      );

    fireEvent.change(productNameInput, {
      target: {
        value: "Blue Jeans",
      },
    });

    fireEvent.change(
      screen.getByPlaceholderText("Enter price"),
      {
        target: {
          value: "3000",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter image URL"),
      {
        target: {
          value: "jeans.jpg",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("e.g. Dresses"),
      {
        target: {
          value: "Jeans",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter product description"
      ),
      {
        target: {
          value: "Blue denim jeans",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Product",
      })
    );

    expect(productNameInput).toHaveValue("");
  });

  test("deletes a product", () => {
    render(
      <ShopProvider>
        <Admin />
      </ShopProvider>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter product name"),
      {
        target: {
          value: "Red Dress",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter price"),
      {
        target: {
          value: "3500",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter image URL"),
      {
        target: {
          value: "dress.jpg",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("e.g. Dresses"),
      {
        target: {
          value: "Dresses",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter product description"
      ),
      {
        target: {
          value: "A beautiful red dress",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Product",
      })
    );

    expect(
      screen.getByText("Red Dress")
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Delete",
      })
    );

    expect(
      screen.queryByText("Red Dress")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("No products available.")
    ).toBeInTheDocument();
  });
});