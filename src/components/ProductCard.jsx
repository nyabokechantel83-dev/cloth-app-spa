import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function ProductCard({ product }) {
  const { addToCart } = useShop();

  return (
    <div className="rounded-xl bg-white p-4">
      <img
        className="h-64 w-full rounded-lg object-cover"
        src={product.image}
        alt={product.name}
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mt-2 text-gray-600">
          Ksh {product.price}
        </p>

        <div className="mt-4 flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white"
          >
            View Details
          </Link>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;