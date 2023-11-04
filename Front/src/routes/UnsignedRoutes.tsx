import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

export default function UnsignedRoutes() {
  //TODO: Create 404 Page
  const router = createBrowserRouter([{ path: '*', Component: Login }]);

  return <RouterProvider router={router} />;
}
