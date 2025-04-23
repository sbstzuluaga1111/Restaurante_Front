import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext"; // 💡 Importamos el contexto
import Imagen from "../resource/Imgs/imagen3.png";
import Carrito from "../resource/Imgs/carrito.png";
import Perfil from "../resource/Imgs/perfil.png";
import Menu from "../resource/Imgs/menu.png";
import PerfilModal from "./PerfilModal"; // asegúrate que la ruta sea correcta
import Swal from 'sweetalert2';

import "../css/Nav.css";

function Nav() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [userData, setUserData] = useState(null); // 🔥 Datos completos del usuario (incluye imagen)
  const [showModal, setShowModal] = useState(false);

  const isAdmin = user?.role === 1;
  const isEmpleado = user?.role === 2;

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3010/usuario/${user.usuarioId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("No se pudo obtener el usuario");

        const data = await res.json();
        setUserData(data); // Guardamos los datos con imagen base64
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSave = async (userDataJSON) => {
    try {
      const res = await fetch(`http://localhost:3010/usuario/${user.usuarioId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDataJSON),
      });
  
      if (!res.ok) {
        const errorData = await res.json(); // Capturamos el mensaje del backend
        throw new Error(errorData.error || "Error al actualizar");
      }
  
      const updatedUser = await res.json();
      updateUser(updatedUser);
      setUserData(updatedUser);
      setShowModal(false);
      console.log("Usuario actualizado:", updatedUser);
  
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'Tu perfil ha sido actualizado exitosamente.',
      });
      
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message || "Error al actualizar",
      });
    }
  };  

  return (
    <div className="App-header-nav">
      {/* 🔹 Logo */}
      <Link 
        className="App-header-nav-izquierda" 
        to={!isAuthenticated ? "/" : isAdmin ? "/admin" : "/empleado"}
      >
        <img className="App-header-nav-logo" src={Imagen} alt="Logo" />
      </Link>

      {/* 🔹 Perfil de usuario autenticado */}
      {isAuthenticated && (
        <div className="user-greeting-container">
          <img
            onClick={() => setShowModal(true)}
            src={
              userData?.imagen
                ? userData.imagen
                : "http://localhost:3010/uploads/default.png"
            }                        
            alt="Perfil"
            className="user-avatar"
          />

          {showModal && (
            <PerfilModal user={userData} onClose={() => setShowModal(false)} onSave={handleSave} />
          )}
          <span className="user-greeting">Hola, {user?.nickname || user?.email}!</span>
        </div>
      )}

      <div className="App-header-nav-derecha">
        {(!isAuthenticated || isAdmin) && (
          <>
            <Link className='App-header-nav-derecha-links' to="/menu">
              <button className={`App-header-nav-derecha-button ${location.pathname === "/menu" ? "active" : ""}`}>
                <img className='App-header-nav-menuIcon' src={Menu} alt="Menu" />
                <p>Menu</p>
              </button>
            </Link>

            {!isAuthenticated && (
              <Link className='App-header-nav-derecha-links' to="/login">
                <button className={`App-header-nav-derecha-button ${location.pathname === "/login" ? "active" : ""}`}>
                  <img className='App-header-nav-menuIcon' src={Perfil} alt="Administracion" />
                  <p>Administracion</p>
                </button>
              </Link>
            )}

            <Link className='App-header-nav-derecha-links' to="/carrito">
              <button className={`App-header-nav-derecha-button ${location.pathname === "/carrito" ? "active" : ""}`}>
                <img className='App-header-nav-menuIcon' src={Carrito} alt="Carrito" />
                <p>Carrito</p>
              </button>
            </Link>
          </>
        )}

        {(isEmpleado || isAdmin) && (
          <Link
            className="App-header-nav-derecha-links"
            to={isAdmin ? "/gestion-tareas" : "/tareas"}
          >
            <button
              className={`App-header-nav-derecha-button ${
                location.pathname === (isAdmin ? "/gestion-tareas" : "/tareas") ? "active" : ""
              }`}
            >
              Tareas
            </button>
          </Link>
        )}

        {isAdmin && (
          <Link className="App-header-nav-derecha-links" to="/crear-usuario">
            <button className={`App-header-nav-derecha-button ${location.pathname === "/crear-usuario" ? "active" : ""}`}>
              Crear Usuario
            </button>
          </Link>
        )}

        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
