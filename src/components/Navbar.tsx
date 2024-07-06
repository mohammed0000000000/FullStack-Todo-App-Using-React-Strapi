import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="mt-5 mb-10 max-w-lg mx-auto px-3 py-5">
        <ul className="flex flex-row justify-between items-center">
          <li className="duration-200 text-black text-lg font-semibold hover:font-bold">
            <NavLink to="/">Home</NavLink>
          </li>
          <div className="flex flex-row space-x-3">
            <li className="text-black duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="duration-200 text-black text-lg font-semibold">
              <NavLink to="/login">Login</NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
