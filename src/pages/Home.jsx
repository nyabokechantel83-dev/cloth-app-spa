import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Cloth App
        </h1>

        <p className="text-gray-600 mb-8">
          Discover stylish clothing for every occasion.
        </p>

        <Link
          to="/shop"
          className="inline-block bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600"
        >
          Shop Now
        </Link>
      </section>
    </main>
  );
}

export default Home;