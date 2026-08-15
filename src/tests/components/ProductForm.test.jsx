import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ProductForm from "../../components/ProductForm";
import { useShop } from "../../context/ShopContext";

vi.mock("../../context/ShopContext", () => ({
  useShop: vi.fn(),
}));

describe("ProductForm", () => {
  test("renders the product form", () => {
    useShop.mockReturnValue({
      addProduct: vi.fn(),
    });

    render(<ProductForm />);

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter product name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter image URL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. Dresses")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter product description")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Product" })).toBeInTheDocument();
  });

  test("allows the user to enter product information", () => {
    useShop.mockReturnValue({
      addProduct: vi.fn(),
    });

    render(<ProductForm />);

    const productName = screen.getByPlaceholderText("Enter product name");
    const price = screen.getByPlaceholderText("Enter price");
    const image = screen.getByPlaceholderText("Enter image URL");
    const category = screen.getByPlaceholderText("e.g. Dresses");
    const description = screen.getByPlaceholderText(
      "Enter product description"
    );

    fireEvent.change(productName, {
      target: { value: "Summer Dress" },
    });

    fireEvent.change(price, {
      target: { value: "2500" },
    });

    fireEvent.change(image, {
      target: { value: "dress.jpg" },
    });

    fireEvent.change(category, {
      target: { value: "Dresses" },
    });

    fireEvent.change(description, {
      target: { value: "Beautiful summer dress" },
    });

    expect(productName).toHaveValue("Summer Dress");
    expect(price).toHaveValue(2500);
    expect(image).toHaveValue("dress.jpg");
    expect(category).toHaveValue("Dresses");
    expect(description).toHaveValue("Beautiful summer dress");
  });

  test("calls addProduct when the form is submitted", () => {
    const addProduct = vi.fn();

    useShop.mockReturnValue({
      addProduct,
    });

    render(<ProductForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter product name"), {
      target: { value: "Summer Dress" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter price"), {
      target: { value: "2500" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter image URL"), {
      target: { value: "dress.jpg" },
    });

    fireEvent.change(screen.getByPlaceholderText("e.g. Dresses"), {
      target: { value: "Dresses" },
    });

    fireEvent.change(
      screen.getByPlaceholderText("Enter product description"),
      {
        target: { value: "Beautiful summer dress" },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: "Add Product" }));

    expect(addProduct).toHaveBeenCalledTimes(1);

    expect(addProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Summer Dress",
        price: 2500,
        image: "dress.jpg",
        category: "Dresses",
        description: "Beautiful summer dress",
      })
    );
  });

  test("clears the form after submitting", () => {
    const addProduct = vi.fn();

    useShop.mockReturnValue({
      addProduct,
    });

    render(<ProductForm />);

    const productName = screen.getByPlaceholderText("Enter product name");
    const price = screen.getByPlaceholderText("Enter price");
    const image = screen.getByPlaceholderText("Enter image URL");
    const category = screen.getByPlaceholderText("e.g. Dresses");
    const description = screen.getByPlaceholderText(
      "Enter product description"
    );

    fireEvent.change(productName, {
      target: { value: "Summer Dress" },
    });

    fireEvent.change(price, {
      target: { value: "2500" },
    });

    fireEvent.change(image, {
      target: { value: "dress.jpg" },
    });

    fireEvent.change(category, {
      target: { value: "Dresses" },
    });

    fireEvent.change(description, {
      target: { value: "Beautiful summer dress" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Product" }));

    expect(productName).toHaveValue("");
    expect(price).toHaveValue(null);
    expect(image).toHaveValue("");
    expect(category).toHaveValue("");
    expect(description).toHaveValue("");
  });
});