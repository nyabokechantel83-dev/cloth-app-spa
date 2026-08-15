import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useFetch from "../../hooks/useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with loading set to true", () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() =>
      useFetch("https://example.com/products")
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("fetches and returns data successfully", async () => {
    const products = [
      {
        id: 1,
        title: "Black Dress",
        price: 50,
      },
      {
        id: 2,
        title: "Blue Jeans",
        price: 40,
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => products,
    });

    const { result } = renderHook(() =>
      useFetch("https://example.com/products")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(products);
    expect(result.current.error).toBe(null);
  });

  it("handles a failed HTTP response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() =>
      useFetch("https://example.com/products")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Failed to fetch data");
  });

  it("handles a network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network error")
    );

    const { result } = renderHook(() =>
      useFetch("https://example.com/products")
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
  });

  it("fetches again when the URL changes", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Dress" }],
    });

    const { result, rerender } = renderHook(
      ({ url }) => useFetch(url),
      {
        initialProps: {
          url: "https://example.com/products",
        },
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender({
      url: "https://example.com/new-products",
    });

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "https://example.com/new-products"
      );
    });
  });
});