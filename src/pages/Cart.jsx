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
          <h2>{item.title}</h2>

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

      <button>
        Checkout
      </button>
    </div>
  );
}

export default Cart;