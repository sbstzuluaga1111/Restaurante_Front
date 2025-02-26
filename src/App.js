import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from "./views/Home";
import Error from './views/Error';
import Menu from './views/Menu';
import B from './views/b';
import C from './views/c';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Vista principal. Bienvenida */}
          <Route path="/" element={<Home />} />

          {/* Otras rutas se pueden agregar aquí */}
          <Route path="/a" element={<Menu />} />
          <Route path="/b" element={<B />} />
          <Route path="/c" element={<C />} />

          {/* Ruta de error explícita */}
          <Route path="/error" element={<Error />} />

          {/* Ruta catch-all para redirigir a error si la ruta no existe */}
          <Route path="*" element={<Navigate to="/error" replace />} />

        </Routes>
        <FooterVisibility />
      </div>
    </BrowserRouter>
  );
}

function FooterVisibility() {
  const location = useLocation();
  const hideFooterOn = ["/b"]; // Agrega más rutas si es necesario

  return !hideFooterOn.includes(location.pathname) ? <Footer /> : null;
}

export default App;
