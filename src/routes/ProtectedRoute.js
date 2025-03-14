import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ requiredRole }) => {
  const { user, logout } = useAuth(); // 🔥 Importamos logout para purgar sesión
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      console.log("🔎 ProtectedRoute: User:", user);
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

  // 🟢 Si el usuario es ADMIN (role = 1), puede acceder a cualquier ruta
  if (user.role === 1) {
    return <Outlet />;
  }

  // 🚨 Si un EMPLEADO intenta entrar a /admin, se le purga la sesión
  if (user.role === 2 && requiredRole === 1) {
    console.warn("🔥 Empleado intentando ser ADMIN. Purgando sesión...");
    logout(); // 🔥 Elimina el token y cierra sesión
    return <Navigate to="/" state={{ message: "Por chistosito, sesión cerrada." }} replace />;
  }

  // 🚫 Si el usuario no tiene el rol correcto, se lo regresa a inicio
  if (requiredRole !== undefined && user.role !== requiredRole) {
    console.warn(
      `⛔ Acceso denegado. Rol actual: ${user.role}, Se necesita rol ${requiredRole}`
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
