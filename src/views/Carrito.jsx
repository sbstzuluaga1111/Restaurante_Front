import { useState } from "react";
import Nav from "../components/Nav";
import "../css/Views.css/Carrito.css";

function Carrito() {
  const [carrito, setCarrito] = useState([
    { id: 1, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
    { id: 3, nombre: "Producto 3", precio: 300 },
  ]);

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const confirmarCompra = () => {
    alert("Compra confirmada. Gracias por tu compra!");
    setCarrito([]); // Vaciar carrito después de la compra
  };

  return (
    <div className='App-Carrito'>
      <Nav />
      <header className='App-header-Carrito'>
        
        <div className='carrito-container-Carrito'>
          <h1>Carrito de Compras</h1>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <ul>
            {carrito.map((producto) => (
              <li key={producto.id}>
                {producto.nombre} - ${producto.precio}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: ${total}</h3>
        {carrito.length > 0 && (
          <button onClick={confirmarCompra} className='btn-confirmar-Carrito'>
            Confirmar Compra
          </button>
        )}
      </div>
      </header>
      
    </div>
  );
}

export default Carrito;
