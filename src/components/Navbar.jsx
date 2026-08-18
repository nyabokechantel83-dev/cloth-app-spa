import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-rose-100 text-gray-800">
      <h1 className="text-xl font-bold text-rose-600">JOVETA CLOTHLINE</h1>

      <div className="flex gap-6">
        <NavLink to="/" className="hover:text-rose-600">
          Home
        </NavLink>

        <NavLink to="/shop" className="hover:text-rose-600">
          Shop
        </NavLink>

        <NavLink to="/cart" className="hover:text-rose-600">
          Cart
        </NavLink>

        <NavLink to="/admin" className="hover:text-rose-600">
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;