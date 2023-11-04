import { useAuth } from '../contexts/AuthContext';
import SignedRoutes from './SignedRoutes';
import UnsignedRoutes from './UnsignedRoutes';



const Routes = () => {
  const { signed } = useAuth();

  return signed ? <SignedRoutes /> : <UnsignedRoutes />;
};

export default Routes;
