import ProductCard from "./ProductCard";

function ProductList({ products}) {
    if (!products || products.length === 0) {
        return <p>No products found</p>
    }


  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </section>
  );

}

export default ProductList;