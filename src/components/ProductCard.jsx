import  {Link} from "react-router-dom"

function ProductCard({ product}) {
    return (
        <div className="rounded-xl bg-white p-4 ">
            <img className="h-64 w-full rounded-lg object-cover"
              src={product.image}
              alt={product.title}
            />

            <div className="mt-4">
                <h3 className="text-lg font-semibold">
                    {product.title}
                </h3>

                <p className="mt-2 text-gray-600">
                   Ksh {product.price}
                </p>

                <Link
                   to={`/products/${product.id}`}
                   className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white"
                >
                    View Details
                </Link>
            </div>


        </div>
    );
}

export default ProductCard;