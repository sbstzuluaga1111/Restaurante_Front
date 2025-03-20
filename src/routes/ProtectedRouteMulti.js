import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRouteMulti = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      console.log("🔎 ProtectedRouteMulti: User:", user);
      setCheckingAuth(false);
    }
  }, [user]);

  if (checkingAuth) {
    return null; // Esperamos hasta que la autenticación esté cargada completamente
  }

  if (!user) {
    console.warn("⛔ No hay usuario autenticado, redirigiendo a login...");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ Si el usuario tiene uno de los roles permitidos, accede
  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  console.warn(`⛔ Acceso denegado. Rol actual: ${user.role}, Se necesita uno de estos roles: ${allowedRoles}`);
  return <Navigate to="/" replace />;
};

export default ProtectedRouteMulti;
