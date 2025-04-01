import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"; 
import AuthRedirect from "./routes/AuthRedirect";  // 👈 Importamos la redirección automática
import Home from "./views/Home";
import Error from './views/Error';
import Menu from './views/Menu';
import Login from './views/Login.jsx';
import Carrito from './views/Carrito.jsx';
import Admin from "./views/Admin";
import Empleado from "./views/Empleado";
import Footer from './components/Footer';
import ProtectedRoute from "./routes/ProtectedRoute.js";
import TareasEmpleado from './views/TareasEmpleado.jsx';
//import ProtectedRouteMulti from "./routes/ProtectedRouteMulti.js";
import TareasAdmin from './views/TareasAdmin.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthRedirect />  {/* 👈 Ahora importamos el AuthRedirect como componente separado */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Carrito />} />

          <Route element={<ProtectedRoute requiredRole={1} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          
          {/*<Route element={<ProtectedRouteMulti allowedRoles={[1, 2]} />}>*/}
          <Route element={<ProtectedRoute requiredRole={1} />}>
            <Route path='/gestion-tareas' element={<TareasAdmin />} />
          </Route>

  {/*element={<ProtectedRoute requiredRole={2}*/}
          <Route>
            <Route path='/Tareas' element={<TareasEmpleado />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole={2} />}>
            <Route path="/empleado" element={<Empleado />} />
          </Route>

          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>

        <FooterVisibility />
      </AuthProvider>
    </BrowserRouter>
  );
}

// ✅ Función para ocultar el Footer en ciertas rutas
function FooterVisibility() {
  const location = useLocation();
  const hideFooterOn = ["/error"];
  return !hideFooterOn.includes(location.pathname) ? <Footer /> : null;
}

export default App;
