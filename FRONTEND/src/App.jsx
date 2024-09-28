import Navbar from "./components/shared/Navbar";

import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <jobs />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
