import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StoreProvider } from "./context/StoreContext";
import Router from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <HashRouter>
          <Router />
        </HashRouter>
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;