import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../components/Nav";
import '../css/Views.css/RecuperarYReset.css';
import { LockIcon } from 'lucide-react'; // Importamos el ícono

const ResetPassword = () => {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3010/cambiarPassword", {
        token,
        nuevaPassword,
      });

      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: res.data.message || "Ya puedes iniciar sesión con tu nueva contraseña.",
        confirmButtonColor: "#4F46E5",
      }).then(() => {
        navigate("/login");
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "No se pudo actualizar la contraseña.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="recover-app">
      <Nav />
      <div className="recover-container">
        <form className="recover-card" onSubmit={handleSubmit}>
          <p className="recover-title">Restablecer tu contraseña</p>
          <p className="recover-subtitle">Tu nueva contraseña debe tener:</p>
          <ul className="recover-list">
            <li>Al menos 8 caracteres</li>
            <li>Una letra mayúscula</li>
            <li>Una letra minúscula</li>
            <li>Un número</li>
            <li>Un símbolo (!@# etc)</li>
          </ul>

          {/* Icono de candado */}
          <div className="input-icon-container">
            <LockIcon className="recover-icon" size={24} color="#4F46E5" />
            <input
              type="password"
              className="recover-input"
              placeholder="Nueva contraseña"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
            />
          </div>

          <button className="recover-button" type="submit">Cambiar contraseña</button>

          <p className="recover-hint">🛡️ Usa una contraseña segura y no la reutilices en otros sitios.</p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
