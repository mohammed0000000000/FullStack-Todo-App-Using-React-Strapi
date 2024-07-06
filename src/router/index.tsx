import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import HomePage from "../pages/Login";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

const isAllowed: boolean = false;
const data: { data: string } = {
  data: "mohammed",
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Rout Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            // <ProtectedRoute
            //   isAllowed={isAllowed}
            //   redirectPath="/login"
            //   data={data}
            // >
            <HomePage />
            // </ProtectedRoute>
          }
        />

        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!isAllowed} redirectPath="/" data={data}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!isAllowed}
              redirectPath="/login"
              data={data}
            >
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

export default router;
