import { NavLink } from "react-router-dom";
const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const handelLogout = () => {
  localStorage.removeItem(storageKey);
  location.replace("/login");
};

const Navbar = () => {
  return (
    <>
      <nav className="mt-5 mb-10 max-w-lg mx-auto px-3 py-5">
        <ul className="flex flex-row justify-between items-center">
          <li className="duration-200 text-black text-lg font-bold hover:text-xl">
            <NavLink to="/">Home</NavLink>
          </li>
          {userData ? (
            <div className="flex flex-row space-x-3">
              <li className="text-black duration-200 font-bold text-lg hover:text-xl">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="text-black duration-200 font-bold text-lg hover:text-xl">
                <button onClick={handelLogout}>Logout</button>
              </li>
            </div>
          ) : (
            <div className="flex flex-row space-x-3">
              <li className="text-black duration-200 font-bold text-lg hover:text-xl">
                <NavLink to="/register">Register</NavLink>
              </li>
              <li className="duration-200 text-black text-lg font-bold  hover:text-xl">
                <NavLink to="/login">Login</NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
