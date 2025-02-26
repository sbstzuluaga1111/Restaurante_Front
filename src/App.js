import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react"; 
import Home from "./views/Home";
import Error from "./views/Error";
import Menu from "./views/Menu";
import B from "./views/B";
import C from "./views/C"; 
import Card from "./components/Card"; // 
import Nav from "./components/Nav"; // 

/*
hola esto es un comentario
*/

function App() {
  const [carrito, setCarrito] = useState([]); // Estado del carrito

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]); 
  };

  return (
    <BrowserRouter>
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a" element={<Menu />} />
          <Route path="/b" element={<B />} />
          <Route path="/c" element={<C carrito={carrito} />} /> 
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>

        <Card
          producto={{ nombre: "Producto de Prueba", precio: 100 }}
          agregarAlCarrito={agregarAlCarrito}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
