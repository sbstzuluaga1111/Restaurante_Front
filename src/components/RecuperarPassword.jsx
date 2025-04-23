import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom"; 
import '../css/Views.css/RecuperarYReset.css';
import { MailIcon } from 'lucide-react'; // Importamos el ícono

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3010/recuperarPassword", { email });
      Swal.fire({
        icon: "success",
        title: "¡Correo enviado!",
        text: res.data.message || "Revisa tu bandeja de entrada.",
        confirmButtonColor: "#4F46E5",
        }).then(() => {
          // Redirigir al login después de un mensaje exitoso
          navigate("/login");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.error || "Error al enviar el correo.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="recover-app">
      <Nav />
      <div className="recover-container">
        <form className="recover-card" onSubmit={handleSubmit}>
          <p className="recover-title">¿Olvidaste tu contraseña?</p>
          <p className="recover-subtitle">Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>

          {/* Icono y campo de correo */}
          <div className="input-icon-container">
            <MailIcon className="recover-icon" size={20} color="#4F46E5" />
            <input
              type="email"
              className="recover-input"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="recover-button" type="submit">Enviar correo</button>

          <p className="recover-hint">🔐 Nunca compartas tu contraseña con nadie.</p>
        </form>
      </div>
    </div>
  );
};

export default RecuperarPassword;
