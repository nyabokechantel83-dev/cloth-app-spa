import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Checkout() {
  const { cart, total } = useShop();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert("Order placed successfully!");

    console.log({
      customer,
      cart,
      total,
    });
  }

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <p className="mt-6">
          Your cart is empty.
        </p>

        <Link
          to="/shop"
          className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-10 md:grid-cols-2">


        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            Customer Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="mb-2 block font-semibold">
                Full Name
              </label>

              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Email
              </label>

              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Phone Number
              </label>

              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                type="tel"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Delivery Address
              </label>

              <textarea
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                name="address"
                value={customer.address}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white"
            >
              Place Order
            </button>

          </form>
        </section>

      
        <section>
          <h2 className="mb-6 text-2xl font-semibold">
            Order Summary
          </h2>

          <div className="rounded-xl bg-gray-100 p-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-4 flex justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  Ksh {item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex justify-between pt-4 text-xl font-bold">
              <span>Total</span>
              <span>Ksh {total}</span>
            </div>

          </div>

          <Link
            to="/shop"
            className="mt-4 inline-block text-orange-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </section>

      </div>
    </main>
  );
}

export default Checkout;