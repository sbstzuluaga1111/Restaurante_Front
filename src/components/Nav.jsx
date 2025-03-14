import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // 💡 Importamos el contexto
import "../css/Nav.css";

function Nav() {
  const { user, logout } = useAuth(); // 📌 Usamos el contexto de autenticación
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]); // 📌 Se actualizará si cambia el usuario

  const handleLogout = () => {
    logout(); // 📌 Llamamos a logout() del contexto
    navigate("/"); // 📌 Redirigir después del logout
  };

  return (
    <div className="App-header-nav">
      <div className="App-header-nav-izquierda">
  <Link to="/">Nav</Link>
  {isAuthenticated && user ? (
    <span className="user-greeting">Hola, {user?.nickname || user?.email}!</span>
  ) : (
    <span className="user-greeting">Hola, invitado!</span>
  )}
</div>


      <div className="App-header-nav-derecha">
        <Link className="App-header-nav-derecha-links" to="/menu">
          <button className="App-header-nav-derecha-button">Menu</button>
        </Link>
        <Link className="App-header-nav-derecha-links" to="/login">
          <button className="App-header-nav-derecha-button">Administracion</button>
        </Link>
        <Link className="App-header-nav-derecha-links" to="/carrito">
          <button className="App-header-nav-derecha-button">Carrito</button>
        </Link>

        {isAuthenticated && (
          <div className="App-header-nav-derecha">
            <Link className="App-header-nav-derecha-links" to="/gestion-tareas">
              <button className="App-header-nav-derecha-button">Tareas</button>
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
