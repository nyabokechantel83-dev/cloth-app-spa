import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="border rounded-lg p-10 shadow-md max-w-lg">
        <div className="text-6xl mb-4">
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your order. Your order has been
          received successfully.
        </p>

        <p className="mb-8">
          We will process your order and prepare it for
          delivery.
        </p>

        <Link
          to="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;