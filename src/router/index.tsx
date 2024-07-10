import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import HomePage from "../pages/index";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import TodosPage from "../pages/Todos";
import ProfilePage from "../pages/Profile";

const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="todos"
          element={
            <ProtectedRoute
              isAllowed={userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <TodosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/"
              data={userData}
            >
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </>
  )
);

export default router;
