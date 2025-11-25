import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SearchResults from "./SearchResults";
import { searchProducts } from "../../api/products";

vi.mock("../../api/products", () => ({
  searchProducts: vi.fn(),
}));

const mockedSearchProducts = vi.mocked(searchProducts);

function renderWithQuery(query: string) {
  return render(
    <MemoryRouter initialEntries={[`/search?q=${encodeURIComponent(query)}`]}>
      <Routes>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("SearchResults", () => {
  beforeEach(() => {
    mockedSearchProducts.mockReset();
  });

  it("renders products returned from the API", async () => {
    mockedSearchProducts.mockResolvedValueOnce([
      {
        product_id: 1,
        product_name: "Hardwood",
        product_use: "Flooring",
        vendor_id: 1,
        price: 12.5,
        image_url: "https://example.com/hardwood.jpg",
      },
    ]);

    renderWithQuery("flooring");

    await waitFor(() => {
      expect(screen.getByText("Hardwood")).toBeInTheDocument();
    });

    expect(screen.getByText("$12.50")).toBeInTheDocument();
    expect(mockedSearchProducts).toHaveBeenCalledWith("flooring");
  });

  it("shows helper message when no query is provided", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByText("Try searching by product name or intended use."),
    ).toBeInTheDocument();
    expect(mockedSearchProducts).not.toHaveBeenCalled();
  });
});

