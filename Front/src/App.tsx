import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import routes from './routes';

function App() {
  const router = createBrowserRouter([
    ...routes,
    {
      path: '/login',
      Component: Login,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
