import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-orange-100 text-gray-800 shadow-md">
      <h1 className="text-3xl font-extrabold text-orange-600">
        JOVETA CLOTHLINE
      </h1>

      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Cart
        </NavLink>

        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Checkout
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Login
        </NavLink>

        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Sign Up
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-orange-600"
              : "hover:text-orange-600"
          }
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;