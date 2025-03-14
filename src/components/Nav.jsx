import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext"; // 💡 Importamos el contexto
import Imagen from "../resource/Imgs/imagen3.png";
import Carrito from "../resource/Imgs/carrito.png";
import Perfil from "../resource/Imgs/perfil.png";
import Menu from "../resource/Imgs/menu.png";

import "../css/Nav.css";

function Nav() {
  const { user, logout } = useAuth(); // 📌 Usamos el contexto de autenticación
  const navigate = useNavigate();
  const location = useLocation(); // Obtiene la ruta actual

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user); // 📌 Se actualizará si cambia el usuario
  }, [user]);

  const handleLogout = () => {
    logout(); // 📌 Llamamos a logout() del contexto
    navigate("/"); // 📌 Redirigir después del logout
  };

  return (
    <div className="App-header-nav">
      <Link className="App-header-nav-izquierda" to="/">
        <img className='App-header-nav-logo' src={Imagen} alt="Logo" />
      </Link>

      <div className="App-header-nav-derecha">
        <Link className='App-header-nav-derecha-links' to="/menu">
          <button className={`App-header-nav-derecha-button ${location.pathname === "/menu" ? "active" : ""}`}>
            <img className='App-header-nav-menuIcon' src={Menu} alt="Menu" />
            <p>Menu</p>
          </button>
        </Link>

        <Link className='App-header-nav-derecha-links' to="/login">
          <button className={`App-header-nav-derecha-button ${location.pathname === "/login" ? "active" : ""}`}>
            <img className='App-header-nav-menuIcon' src={Perfil} alt="Administracion" />
            <p>Administracion</p>
          </button>
        </Link>

        <Link className='App-header-nav-derecha-links' to="/carrito">
          <button className={`App-header-nav-derecha-button ${location.pathname === "/carrito" ? "active" : ""}`}>
            <img className='App-header-nav-menuIcon' src={Carrito} alt="Carrito" />
            <p>Carrito</p>
          </button>
        </Link>

        {isAuthenticated && (
          <div className="App-header-nav-derecha">
            <span className="user-greeting">Hola, {user?.nickname || user?.email}!</span>

            <Link className='App-header-nav-derecha-links' to="/gestion-tareas">
              <button className={`App-header-nav-derecha-button ${location.pathname === "/gestion-tareas" ? "active" : ""}`}>
                Tareas
              </button>
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
