import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 py-4 md:py-5 bg-orange-100 text-gray-800 gap-3 md:gap-0">
      <h1 className="text-xl md:text-3xl font-extrabold text-orange-600 text-center">
        JOVETA CLOTHLINE
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-sm md:text-base">
        <NavLink to="/" className="hover:text-orange-600">
          Home
        </NavLink>

        <NavLink to="/shop" className="hover:text-orange-600">
          Shop
        </NavLink>

        <NavLink to="/cart" className="hover:text-orange-600">
          Cart
        </NavLink>

        <NavLink to="/checkout" className="hover:text-orange-600">
          Checkout
        </NavLink>

        {user ? (
          <>
            {user.role === "admin" && (
              <NavLink to="/admin" className="hover:text-orange-600">
                Admin
              </NavLink>
            )}

            <button
              onClick={logout}
              className="rounded-lg bg-orange-600 px-3 md:px-4 py-1.5 md:py-2 text-white hover:bg-orange-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="hover:text-orange-600">
              Login
            </NavLink>

            <NavLink to="/signup" className="hover:text-orange-600">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;