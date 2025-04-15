import { useState, useEffect } from "react";
import "../css/PerfilModal.css";

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
    setFormData({
      nickname: user.nickname || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      imagen: null,
    });
  
    // ✅ Usamos imagen por defecto si no hay imagen subida
    const imagenValida = user.imagen ? `http://localhost:3010${user.imagen}` : "http://localhost:3010/uploads/default.png";
    setPreviewImg(imagenValida);
  }, [user]);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      const file = files[0];
      setFormData({ ...formData, imagen: file });
      if (file) {
        setPreviewImg(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nickname", formData.nickname);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("role", user.role);
    if (formData.password) {
        data.append("password", formData.password);
      }
    
    // Solo agregar la imagen si hay una seleccionada
    if (formData.imagen) {
        data.append("imagen", formData.imagen);
      }

    console.log('Datos que se enviarán:', {
        nickname: formData.nickname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        imagen: formData.imagen,
      });

    onSave(data);
  };

  return (
    <div className="perfil-modal-backdrop">
      <div className="perfil-modal-card">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="perfil-modal-header">
          <img src={previewImg} alt="Avatar" className="avatar-preview" />
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

          <label className="file-label">
            Cambiar imagen:
            <input name="imagen" type="file" onChange={handleChange} accept="image/*" />
          </label>

          <button type="submit" className="btn-guardar">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
}

export default PerfilModal;
