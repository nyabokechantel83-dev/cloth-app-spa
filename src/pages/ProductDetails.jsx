import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const PRODUCTS_URL = "http://localhost:3000/products";

function ProductDetails() {
    const { id } = useParams();

    const { data: product, loading, error } = useFetch(
        `${PRODUCTS_URL}/${id}`
    );

    if (loading) {
        return (
            <p className="p-8 text-center">
                Loading product...
            </p>
        );
    }

    if (error) {
        return (
            <p className="p-8 text-center text-red-600">
                {error}
            </p>
        );
    }

    if (!product) {
        return (
            <p className="p-8 text-center">
                Product not found.
            </p>
        )
    }
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <Link className="mb-8 inline-block text-orange-600 hover:underline"
              to="/Shop"
            >
                Back to Shop

            </Link>

            <section className="grid gap-10 md:grid-cols-2">
                <div>
                    <img className="h-[500px] w-full rounded-xl object-contain"
                       src={product.image}
                       alt={product.name}
                    />
                </div>

                <div>
                    <p className="mb-3 text-sm uppercase text-gray-500">
                        {product.category}
                    </p>

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>

                    <p className="mt-6 text 2xl font-semibold text-orange-600">
                        ksh {product.price}
                    </p>

                    <p className="mt-6 text-gray-600">
                        {product.description}
                    </p>
                </div>
            </section>
        </main>
    );
}
export default ProductDetails;