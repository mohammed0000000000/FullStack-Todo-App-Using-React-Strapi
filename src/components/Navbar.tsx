import { NavLink, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { pathname } = useLocation();

  const handelLogout = () => {
    localStorage.removeItem(storageKey);
    toast("logged out Successfully", {
      duration: 1500,
      position: "top-center",
      style: {
        background: "#000",
        color: "#fff",
        zIndex: 999,
        fontSize: 16,
        fontWeight: 600,
      },
      icon: "👋",
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
    setTimeout(() => {
      location.replace(pathname);
    }, 2000);
  };
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
