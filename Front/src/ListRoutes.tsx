// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom';
import Keys from './pages/Keys';
import Visitors from './pages/Visitors';
import Users from './pages/Users';

const ListRoutes: RouteObject[] = [
  {
    id: 'Chaves',
    path: '/keys',
    Component: Keys,
  },
  {
    id: 'Visitantes',
    path: '/visitors',
    Component: Visitors,
  },
  {
    id: 'Usuários',
    path: '/users',
    Component: Users,
  },
];

export default ListRoutes;
