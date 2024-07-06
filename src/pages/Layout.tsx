import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="root-layout">
        <Navbar />
      </div>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
