
// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';

const routes: RouteObject[] = [
  {
    id: 'Chaves',
    path: '/',
    Component: Home,
  },
  {
    id: 'Chav',
    path: '/chaves',
    Component: Home,
  },

];

export default routes;
