import { AuthProvider } from './contexts/AuthContext';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;