const C = ({ carrito }) => {
    return (
      <div>
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul>
            {carrito.map((item, index) => (
              <li key={index}>
                {item.nombre} - ${item.precio}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default C;