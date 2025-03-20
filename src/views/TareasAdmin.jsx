import { useState, useEffect, useMemo } from "react";
import Nav from "../components/Nav";
import "../css/Views.css/tareasAdmin.css";

function TareasAdmin() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [empleados, setEmpleados] = useState([]);

  // 🔹 Obtener el token JWT
  const token = localStorage.getItem("token");

  // 🔹 Memoizar `headers` para evitar re-render innecesarios
  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]); // Solo cambia si `token` cambia

  // 🔹 Obtener todas las tareas del backend
  useEffect(() => {
    fetch("http://localhost:3010/tareas", { headers })
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, [headers]); // Ahora `headers` es estable

  // 🔹 Obtener la lista de empleados al cargar el componente
  useEffect(() => {
    fetch("http://localhost:3010/usuarios/empleados", { headers })
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error al obtener empleados:", error));
  }, [headers]); // Ahora `headers` es estable

  // 🔹 Agregar nueva tarea
  const agregarTarea = () => {
    if (titulo.trim() !== "" && descripcion.trim() !== "" && empleadoSeleccionado && dueDate.trim() !== "") {
      const nuevaTareaObj = {
        title: titulo,
        description: descripcion,
        assignedTo: [parseInt(empleadoSeleccionado)], // Enviar usuarioId
        priority,
        status,
        dueDate,
      };

      fetch("http://localhost:3010/tareas", {
        method: "POST",
        headers,
        body: JSON.stringify(nuevaTareaObj),
      })
        .then((response) => response.json())
        .then((data) => {
          const usuarioAsignado = empleados.find(emp => emp.usuarioId === parseInt(empleadoSeleccionado));
          const tareaConUsuario = {
            ...data,
            assignedTo: usuarioAsignado ? [usuarioAsignado] : [],
          };
          setTareas([...tareas, tareaConUsuario]);
          setTitulo("");
          setDescripcion("");
          setEmpleadoSeleccionado("");
          setDueDate("");
          setPriority("Medium");
          setStatus("Pending");
        })
        .catch((error) => console.error("Error al agregar tarea:", error));
    }
  };

  // 🔹 Eliminar tarea
  const eliminarTarea = (customId) => {
    fetch(`http://localhost:3010/tareas/${customId}`, {
      method: "DELETE",
      headers,
    })
      .then(() => {
        setTareas(tareas.filter((tarea) => tarea.customId !== customId));
      })
      .catch((error) => console.error("Error al eliminar tarea:", error));
  };

  return (
    <div className="App-tareasAdmin">
      <Nav />
      <header className="App-header-tareasAdmin">
        <h1>Tareas</h1>
        <div className="App-form-tareasAdmin">
          <input type="text" placeholder="Título de la tarea" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="App-input-tareasAdmin" />
          <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="App-input-tareasAdmin" />

          {/* Selección de empleado */}
          <select value={empleadoSeleccionado} onChange={(e) => setEmpleadoSeleccionado(e.target.value)} className="App-input-tareasAdmin">
            <option value="">Seleccionar empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.usuarioId} value={empleado.usuarioId}>
                {empleado.nickname} ({empleado.email})
              </option>
            ))}
          </select>

          {/* Selección de prioridad */}
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="App-input-tareasAdmin">
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
          </select>

          {/* Selección de estado */}
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="App-input-tareasAdmin">
            <option value="Pending">Pendiente</option>
            <option value="In Progress">En progreso</option>
            <option value="Completed">Completada</option>
            <option value="Cancelled">Cancelada</option>
          </select>

          {/* Fecha de vencimiento */}
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="App-input-tareasAdmin" />

          <button onClick={agregarTarea} className="App-btn-agregar-tareasAdmin"> Agregar </button>
        </div>

        <div className="App-list-tareasAdmin">
          {tareas.map((tarea) => (
            <div key={tarea._id} className="App-item-tareasAdmin">
              <p className="App-texto-tareasAdmin"><strong>{tarea.title}</strong></p>
              <p className="App-descripcion-tareasAdmin">{tarea.description}</p>

              {/* Muestra los empleados asignados */}
              <div className="App-asignado-tareasAdmin">
                <strong>Asignado a:</strong>
                {tarea.assignedTo.length > 0 ? (
                  <ul>
                    {tarea.assignedTo.map((usuario, index) => (
                      <li key={index}>{usuario.nickname} ({usuario.email})</li>
                    ))}
                  </ul>
                ) : (
                  <span> No asignado</span>
                )}
              </div>

              <p className="App-prioridad-tareasAdmin"><strong>Prioridad:</strong> {tarea.priority}</p>
              <p className="App-estado-tareasAdmin"><strong>Estado:</strong> {tarea.status}</p>
              <p className="App-fecha-tareasAdmin"><strong>Fecha límite:</strong> {new Date(tarea.dueDate).toLocaleDateString()}</p>

              <button onClick={() => eliminarTarea(tarea.customId)} className="App-btn-eliminar-tareasAdmin">Eliminar</button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default TareasAdmin;
