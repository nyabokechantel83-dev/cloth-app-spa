import { Link } from "react-router-dom"
import { useShop } from "../context/ShopContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
  } = useShop();

  if (cart.length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>

          <p>KSh {item.price}</p>

          <div>
            <button
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>
          </div>

          <p>
            Subtotal: KSh {item.price * item.quantity}
          </p>

          <button
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <hr />

      <h2>Total: KSh {total}</h2>

      <Link className="inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
         to="/checkout"
      >
        Checkout
      </Link>   

      <footer className="bg-gray-900 px-6 py-5 text-center text-sm text-white">
        © 2026 JOVETA CLOTHLINE. All rights reserved.
      </footer>
    </div>

  );
}

export default Cart;