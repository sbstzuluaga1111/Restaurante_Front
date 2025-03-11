//import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../css/Views.css/empleado.css"; // Asegúrate de tener el CSS correcto

function Empleado() {
  return (
    <div className="empleado-container">
      <Nav />
      <h1>Bienvenido Empleado</h1>
    </div>
  );
}

export default Empleado;
