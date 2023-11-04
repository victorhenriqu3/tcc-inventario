
// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';

const ListRoutes: RouteObject[] = [
  {
    id: 'Chaves',
    path: '/keys',
    Component: Home,
  },
  {
    id: 'Visitantes',
    path: '/visitors',
    Component: Home,
  },

];

export default ListRoutes;
