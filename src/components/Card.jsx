import "../css/Card.css";
import imagen1 from "../resource/Imgs/Imagen1.jpg";  // Imagen por defecto

function Card({ nombre, precio, imagen }) {
  // Si no hay imagen, usamos la imagen por defecto
  const imagenSrc = imagen ? imagen : imagen1;

  return (
    <div className="App-header-card">
      <div>
        <img className="App-header-card-imagen" src={imagenSrc} alt={nombre} />
      </div>
      <div>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
      </div>
    </div>
  );
}

export default Card;
