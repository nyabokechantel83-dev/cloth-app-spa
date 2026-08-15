import { useState } from "react";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

const PRODUCTS_URL = "https://api.com/products";

function Shop() {
    const {data: products, loading, error } = useFetch(PRODUCTS_URL);
    const [searchTerm, setSearchTerm] = useState("");

     const filteredProducts = (products || []).filter((product) => (
        product.title.toLowerCase() .includes(searchTerm.toLowerCase())
    ));

    function handleSearch(value) {
        setSearchTerm(value)
    }

    if (loading) {
        return (
            <p className="p-8 text-center text-red-600">
                {error}
            </p>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="mb-8 text-4xl font-bold">
                Shop
            </h1>

            <SearchBar onSearch={handleSearch} />
            <ProductList products={filteredProducts} />
        </main>

    );

}
export default Shop;