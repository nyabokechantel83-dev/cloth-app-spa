import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Search from "../../components/SearchBar";

describe("Search", () => {
  it("renders the search input", () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    expect(
      screen.getByRole("textbox", {
        name: "Search Products",
      })
    ).toBeInTheDocument();
  });

  it("starts with an empty search field", () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole("textbox", {
      name: "Search Products",
    });

    expect(input).toHaveValue("");
  });

  it("updates the input when the user types", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole("textbox", {
      name: "Search Products",
    });

    await user.type(input, "dress");

    expect(input).toHaveValue("dress");
  });

  it("calls onSearch with the typed value", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole("textbox", {
      name: "Search Products",
    });

    await user.type(input, "dress");

    expect(onSearch).toHaveBeenLastCalledWith("dress");
  });
});