import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </main>
  );
}

export default App;
