import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ListRoutes from "../ListRoutes";
import Home from "../pages/Home";

export default function SignedRoutes() {
  const router = createBrowserRouter([
    ...ListRoutes,
    {
      path: '/',
      Component: Home,
    },
  ]);

  return <RouterProvider router={router} />;
}

