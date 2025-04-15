import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../css/Views.css/crearUsuario.css";

import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserShield, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";

function CrearUsuario() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    phone: "",
    role: "2",
  });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result); // Guardamos el base64
        setPreview(reader.result); // Lo usamos también como preview
      };
      reader.readAsDataURL(file); // Lee el archivo como base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = {
        ...formData,
        imagen, // base64 directamente
      };
  
      await axios.post("http://localhost:3010/usuario", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      Swal.fire({
        icon: "success",
        title: "¡Usuario creado!",
        text: "El usuario fue registrado exitosamente.",
        confirmButtonColor: "#0d6efd",
      });
  
      setFormData({ nickname: "", email: "", password: "", phone: "", role: "2" });
      setImagen(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear el usuario. Intenta de nuevo.",
        confirmButtonColor: "#d33",
      });
    }
  };  

  if (user?.role !== 1) {
    navigate("/error");
    return null;
  }

  return (
    <div className="App-crearUsuario">
      <Nav />
      <header className="App-header-crearUsuario">
        <h1>Crear Usuario</h1>
        {mensaje && <p className="mensaje-crearUsuario">{mensaje}</p>}
        <form onSubmit={handleSubmit} className="App-form-crearUsuario" encType="multipart/form-data">
          <label>
            <FaUser className="icono" />
            <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} value={formData.nickname} required />
          </label>
          <label>
            <FaEnvelope className="icono" />
            <input type="email" name="email" placeholder="Correo" onChange={handleChange} value={formData.email} required />
          </label>
          <label>
            <FaLock className="icono" />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} required />
          </label>
          <label>
            <FaPhone className="icono" />
            <input type="tel" name="phone" placeholder="Teléfono" onChange={handleChange} value={formData.phone} required />
          </label>
          <label>
            <FaUserShield className="icono" />
            <select name="role" onChange={handleChange} value={formData.role}>
              <option value="Employee">Empleado</option>
              <option value="Admin">Administrador</option>
            </select>
          </label>
          <label className="input-file-label">
            <FaImage className="icono" />
            <input type="file" name="imagen" accept="image/*" onChange={handleImagen} />
          </label>

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="imagen-preview" />
            </div>
          )}

          <button type="submit" className="App-btn-crearUsuario">Crear Usuario</button>
        </form>
      </header>
    </div>
  );
}

export default CrearUsuario;
