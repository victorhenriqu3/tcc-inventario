// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom';
import Keys from './pages/Keys';
import Visitors from './pages/Visitors';
import Users from './pages/Users';
import Events from './pages/Events';

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
  {
    id: 'Eventos',
    path: '/events',
    Component: Events,
  },
];

export default ListRoutes;
