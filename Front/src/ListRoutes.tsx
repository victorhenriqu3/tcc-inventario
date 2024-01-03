
// eslint-disable-next-line import/named
import { RouteObject } from 'react-router-dom';
import Keys from './pages/Keys';
import Visitors from './pages/Visitors';

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

];

export default ListRoutes;
