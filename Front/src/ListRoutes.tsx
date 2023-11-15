
// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Keys from './pages/Keys';

const ListRoutes: RouteObject[] = [
  {
    id: 'Chaves',
    path: '/keys',
    Component: Keys,
  },
  {
    id: 'Visitantes',
    path: '/visitors',
    Component: Home,
  },

];

export default ListRoutes;
