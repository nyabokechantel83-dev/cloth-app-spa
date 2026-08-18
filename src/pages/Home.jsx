import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-orange-50">
      <section className="bg-gradient-to-r from-orange-100 to-orange-50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-14 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-700">
              New Collection
            </p>

            <h1 className="mb-5 text-4xl font-bold text-gray-900 md:text-5xl">
              Style That
              <span className="block text-orange-600">
                Speaks For You
              </span>
            </h1>

            <p className="mb-7 max-w-lg text-gray-600">
              Discover stylish clothing for every occasion and find pieces
              that match your unique style.
            </p>

            <Link
              to="/shop"
              className="inline-block rounded-full bg-orange-600 px-7 py-3 font-semibold text-white hover:bg-orange-700"
            >
              Shop Now
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80"
            alt="Clothing collection"
            className="h-96 w-full max-w-md rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
            Our Collection
          </p>

          <h2 className="mb-6 mt-2 text-3xl font-bold text-gray-900">
            Find Your Style
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-xl bg-orange-100 p-6">
              <h3 className="font-bold text-orange-900">
                Women's Fashion
              </h3>
              <p className="mt-2 text-orange-800">
                Elegant styles for you.
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-6">
              <h3 className="font-bold text-orange-900">
                Men's Fashion
              </h3>
              <p className="mt-2 text-orange-800">
                Modern everyday styles.
              </p>
            </div>

            <div className="rounded-xl bg-orange-100 p-6">
              <h3 className="font-bold text-orange-900">
                Accessories
              </h3>
              <p className="mt-2 text-orange-800">
                Complete your look.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-600 px-6 py-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-white">
          Ready to Find Your Style?
        </h2>

        <p className="mb-5 text-white">
          Explore our latest collection today.
        </p>

        <Link
          to="/shop"
          className="inline-block rounded-full bg-white px-7 py-3 font-semibold text-orange-600 hover:bg-orange-50"
        >
          Explore Shop
        </Link>
      </section>

      <footer className="bg-gray-900 px-6 py-5 text-center text-sm text-white">
        © 2026 JOVETA CLOTHLINE. All rights reserved.
      </footer>
    </main>
  );
}

export default Home;