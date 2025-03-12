import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../css/Nav.css";

function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3010/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        if (response.ok && data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="App-header-nav">
      <div className="App-header-nav-izquierda">
        <Link to="/">Nav</Link>
      </div>

      <div className="App-header-nav-derecha">
        <Link className='App-header-nav-derecha-links' to="/menu">
          <button className='App-header-nav-derecha-button'>Menu</button>
        </Link>
        <Link className='App-header-nav-derecha-links' to="/login">
          <button className='App-header-nav-derecha-button'>Administracion</button>
        </Link>
        <Link className='App-header-nav-derecha-links' to="/carrito">
          <button className='App-header-nav-derecha-button'>Carrito</button>
        </Link>

        {isAuthenticated && (
          <div className="App-header-nav-derecha">
          <Link className='App-header-nav-derecha-links' to="/gestion-tareas">
          <button className='App-header-nav-derecha-button'>Tareas</button>
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
