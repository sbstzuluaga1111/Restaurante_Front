import { Navigate, Outlet } from "react-router-dom";

// Función para obtener el rol del usuario desde el token
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; // Si no hay token, no hay rol

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
    return payload.role; // Retorna el rol del usuario (número)
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
    return null; // Si hay error al decodificar, no hay rol válido
  }
};

const ProtectedRoute = ({ requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = getUserRole();

  console.log("🔎 ProtectedRoute: Token:", token);
  console.log("🔎 ProtectedRoute: Rol del usuario:", userRole);

  // 🔴 Si no hay token, recargar la página y redirigir al home
  if (!token) {
    console.warn("🚨 No hay token, redirigiendo...");
    window.location.reload();
    return null;
  }

  // 🟢 Si el usuario es ADMIN (1), puede acceder a cualquier ruta protegida
  if (userRole === 1) {
    return <Outlet />;
  }

  // 🔴 Si el usuario no tiene el rol requerido, redirigir al home
  if (requiredRole && userRole !== requiredRole) {
    console.warn(`🚨 Acceso denegado. Se necesita rol ${requiredRole}, pero el usuario tiene ${userRole}`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Renderiza la ruta protegida si todo está bien
};

export default ProtectedRoute;
