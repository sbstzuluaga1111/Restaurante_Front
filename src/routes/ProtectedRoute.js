import { Navigate, Outlet } from "react-router-dom";

// Función para obtener el rol del usuario desde el token
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; // Si no hay token, no hay rol

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
    return payload.role; // Retorna el rol del usuario (número)
  } catch (error) {
    return null; // Si hay error al decodificar, no hay rol válido
  }
};

const ProtectedRoute = ({ requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = getUserRole();

  // Si no hay token, redirige al home
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario es ADMIN (1), puede acceder a cualquier ruta protegida
  if (userRole === 1) {
    return <Outlet />;
  }

  // Si el usuario no tiene el rol requerido, redirige al home
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Renderiza la ruta protegida si todo está bien
};

export default ProtectedRoute;
