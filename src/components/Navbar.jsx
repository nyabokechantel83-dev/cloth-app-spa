import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-purple-700 px-10 py-5 text-white shadow-md">
      <h1 className="text-2xl font-bold tracking-wide text-white">
        JOVETA CLOTHLINE
      </h1>

      <div className="flex gap-8">
        <NavLink
          to="/"
          className="font-medium text-white hover:text-purple-200"
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className="font-medium text-white hover:text-purple-200"
        >
          Shop
        </NavLink>

        <NavLink
          to="/cart"
          className="font-medium text-white hover:text-purple-200"
        >
          Cart
        </NavLink>

        <NavLink
          to="/login"
          className="font-medium text-white hover:text-purple-200"
        >
          Login
        </NavLink>

        <NavLink
          to="/signup"
          className="font-medium text-white hover:text-purple-200"
        >
          Sign Up
        </NavLink>

        <NavLink
          to="/admin"
          className="font-medium text-white hover:text-purple-200"
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;