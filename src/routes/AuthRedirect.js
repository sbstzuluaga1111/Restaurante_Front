import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { restrictedPaths } from "../config/routesConfig"; // Importamos restricciones

function AuthRedirect() {
  const { user } = useAuth();
  const location = useLocation();

  // Si el usuario está logueado y su rol tiene restricciones de rutas
  if (user?.role && restrictedPaths[user.role]?.includes(location.pathname)) {
    return <Navigate to={user.role === 1 ? "/admin" : "/empleado"} replace />;
  }

  return null;
}

export default AuthRedirect;
