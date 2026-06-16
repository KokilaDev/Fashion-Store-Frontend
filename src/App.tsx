import { AuthProvider } from "./context/AuthContext";
import Router from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;