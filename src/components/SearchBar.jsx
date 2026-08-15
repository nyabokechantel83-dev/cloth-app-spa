import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleChange(event) {
    const value = event.target.value;

    setSearchTerm(value);
    onSearch(value);
  }

  return (
    <div className="mb-8">
      <label
        className="mb-2 block font-semibold"
        htmlFor="product-search"
      >
        Search Products
      </label>

      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
        id="product-search"
        type="text"
        value={searchTerm}
        placeholder="Search for a product..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;