//import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../css/Views.css/admin.css"; // Asegúrate de tener el CSS correcto

function Admin() {
  return (
    <div className="admin-container">
      <Nav />
      <h1>Bienvenido Administrador</h1>
    </div>
  );
}

export default Admin;
