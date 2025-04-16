import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import "../css/PerfilModal.css";
import Swal from "sweetalert2";

function PerfilModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    phone: "",
    password: "",
    imagen: null,
  });

  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    console.log("USER EN MODAL:", user);
    setFormData({
      nickname: user.nickname || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      imagen: null,
    });

    // 👇 Detectamos si la imagen ya viene como base64 o es solo una ruta
    const imagenValida =
      user.imagen?.startsWith("data:image") 
        ? user.imagen 
        : user.imagen 
          ? `http://localhost:3010${user.imagen}` 
          : "http://localhost:3010/uploads/default.png";

    setPreviewImg(imagenValida);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "imagen") {
      const file = files[0];
  
      if (file) {
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  
        if (!validTypes.includes(file.type)) {
          Swal.fire({
            icon: "error",
            title: "Formato no válido",
            text: "Solo se permiten imágenes en formato JPG, PNG, GIF o WEBP.",
            confirmButtonColor: "#d33",
          });
          return;
        }        
  
        setFormData({ ...formData, imagen: file });
        setPreviewImg(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imagenBase64 = user.imagen;
  
    if (formData.imagen) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagenBase64 = reader.result;
  
        const data = {
          nickname: formData.nickname,
          email: formData.email,
          phone: formData.phone,
          role: user.role,
          password: formData.password || undefined,
          imagen: imagenBase64,
        };
  
        onSave(data); // Ya no usarás FormData
      };
      reader.readAsDataURL(formData.imagen);
    } else {
      const data = {
        nickname: formData.nickname,
        email: formData.email,
        phone: formData.phone,
        role: user.role,
        password: formData.password || undefined,
        imagen: imagenBase64,
      };
  
      onSave(data);
    }
  };
  

  return (
    <div className="perfil-modal-backdrop">
      <div className="perfil-modal-card">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="perfil-modal-header">
          <div className="avatar-container">
            <img src={previewImg} alt="Avatar" className="avatar-preview" />

            <label htmlFor="fileInput" className="avatar-overlay">
              <FiEdit size={18} className="edit-icon" />
            </label>

            <input
              type="file"
              id="fileInput"
              name="imagen"
              style={{ display: "none" }}
              onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            />
          </div>

          <h2>Editar perfil</h2>
          <p className="perfil-role">Rol actual: {user.role === 1 ? "Admin" : "Empleado"}</p>
        </div>

        <form onSubmit={handleSubmit} className="perfil-form">
          <label>
            Nickname:
            <input
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Tu apodo"
              required
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </label>

          <label>
            Teléfono:
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="3001234567"
            />
          </label>

          <label>
            Nueva contraseña:
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Dejar vacío para no cambiarla"
            />
          </label>

          <button type="submit" className="btn-guardar">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}

export default PerfilModal;
