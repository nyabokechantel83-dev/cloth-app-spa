import ProductForm from "../components/ProductForm";
import { useShop } from "../context/ShopContext";

function Admin() {
  const { products, deleteProduct } = useShop();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <ProductForm />

      <section>
        <h2>Products</h2>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>

              <p>KSh {product.price}</p>

              <p>{product.category}</p>

              <button
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Admin;