import ProductForm from "../components/ProductForm";
import { useShop } from "../context/ShopContext";

function Admin() {
  const { products, deleteProduct } = useShop();

  return (
    <div className="min-h-screen bg-orange-50">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold text-black">
          Admin Dashboard
        </h1>

        <ProductForm />

        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-black">
            Products
          </h2>

          {products.length === 0 ? (
            <p className="text-gray-800">
              No products available.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl bg-white shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-950">
                      {product.name}
                    </h3>

                    <p className="mt-2 font-medium text-gray-800">
                      KSh {product.price}
                    </p>

                    <p className="mt-1 text-gray-600">
                      {product.category}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-900 px-6 py-5 text-center text-sm text-white">
        © 2026 JOVETA CLOTHLINE. All rights reserved.
      </footer>
    </div>
  );
}

export default Admin;
