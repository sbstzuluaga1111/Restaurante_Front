import { useState } from "react";
import Nav from "../components/Nav";
import "../css/Views.css/tareasAdmin.css";

function TareasAdmin() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [empleado, setEmpleado] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "" && empleado.trim() !== "") {
      setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, asignadoA: empleado }]);
      setNuevaTarea("");
      setEmpleado("");
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div className="App-tareasAdmin">
      <Nav />
      <header className="App-header-tareasAdmin">
        <h1>Tareas</h1>
        <div className="App-form-tareasAdmin">
          <input
            type="text"
            placeholder="Nueva tarea"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            className="App-input-tareasAdmin"
          />
          <input
            type="text"
            placeholder="Asignar a empleado"
            value={empleado}
            onChange={(e) => setEmpleado(e.target.value)}
            className="App-input-tareasAdmin"
          />
          <button onClick={agregarTarea} className="App-btn-agregar-tareasAdmin">
            Agregar
          </button>
        </div>
        <div className="App-list-tareasAdmin">
          {tareas.map((tarea) => (
            <div key={tarea.id} className="App-item-tareasAdmin">
              <p className="App-texto-tareasAdmin">{tarea.texto}</p>
              <p className="App-asignado-tareasAdmin">Asignado a: {tarea.asignadoA}</p>
              <button
                onClick={() => eliminarTarea(tarea.id)}
                className="App-btn-eliminar-tareasAdmin"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default TareasAdmin;
