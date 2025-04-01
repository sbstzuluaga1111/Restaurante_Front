import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Nav from "../components/Nav";
import "../css/Views.css/tareasEmpleado.css";

function TareasEmpleado() {
  const { user } = useAuth(); // ✅ aquí usamos el contexto
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.usuarioId) return;

    fetch(`http://localhost:3010/tareas/empleado/${user.usuarioId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🔁 Tareas recibidas:", data);
        setTareas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener tareas:", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div className="cargando">Cargando tareas...</div>;

  return (
    <div className="App-tareasAdmin">
        <Nav></Nav>
    <div className="tareas-empleado-container">
      <h2>Mis Tareas</h2>
      {Array.isArray(tareas) && tareas.length > 0 ? (
        <div className="tareas-listado">
          {tareas.map((tarea) => (
            <div key={tarea.customId} className={`tarea-card ${tarea.status}`}>
              <h3>{tarea.title}</h3>
              <p className="descripcion">{tarea.description}</p>
              <p><strong>Prioridad:</strong> {tarea.priority}</p>
              <p><strong>Estado:</strong> {tarea.status}</p>
              <p><strong>Entrega:</strong> {new Date(tarea.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes tareas asignadas.</p>
      )}
    </div></div>
  );
}

export default TareasEmpleado;
