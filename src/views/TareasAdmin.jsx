import { useState, useEffect } from "react";
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

  // 🔹 Obtener todas las tareas del backend
  useEffect(() => {
    fetch("http://localhost:3010/tareas")
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, []);

  // 🔹 Obtener la lista de empleados al cargar el componente
  useEffect(() => {
    fetch("http://localhost:3010/usuarios/empleados")
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error al obtener empleados:", error));
  }, []);

  // 🔹 Agregar nueva tarea
  const agregarTarea = () => {
    if (titulo.trim() !== "" && descripcion.trim() !== "" && empleadoSeleccionado && dueDate.trim() !== "") {
      const nuevaTareaObj = {
        title: titulo,
        description: descripcion,
        assignedTo: [parseInt(empleadoSeleccionado)], // Enviar usuarioId
        priority: priority,
        status: status,
        dueDate: dueDate,
      };

      fetch("http://localhost:3010/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTareaObj),
      })
        .then((response) => response.json())
        .then((data) => {
          // 🔹 Buscar el usuario asignado en el estado `empleados`
          const usuarioAsignado = empleados.find(emp => emp.usuarioId === parseInt(empleadoSeleccionado));

          // 🔹 Reemplazar el `usuarioId` con los datos completos del usuario
          const tareaConUsuario = {
            ...data,
            assignedTo: usuarioAsignado ? [usuarioAsignado] : [],
          };

          // 🔹 Actualizar la lista de tareas
          setTareas([...tareas, tareaConUsuario]);

          // 🔹 Resetear los valores del formulario
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


  const eliminarTarea = (customId) => {
    fetch(`http://localhost:3010/tareas/${customId}`, {  // 🔹 Enviar `customId` en la URL
      method: "DELETE",
    })
      .then(() => {
        setTareas(tareas.filter((tarea) => tarea.customId !== customId)); // 🔹 Filtrar por `customId`
      })
      .catch((error) => console.error("Error al eliminar tarea:", error));
  };


  return (
    <div className="App-tareasAdmin">
      <Nav />
      <header className="App-header-tareasAdmin">
        <h1>Tareas</h1>
        <div className="App-form-tareasAdmin">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="App-input-tareasAdmin"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="App-input-tareasAdmin"
          />

          {/* Selección de empleado */}
          <select
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
            className="App-input-tareasAdmin"
          >
            <option value="">Seleccionar empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.usuarioId} value={empleado.usuarioId}>
                {empleado.nickname} ({empleado.email})
              </option>
            ))}
          </select>

          {/* Selección de prioridad */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="App-input-tareasAdmin"
          >
            <option value="Low">Baja</option>
            <option value="Medium">Media</option>
            <option value="High">Alta</option>
          </select>

          {/* Selección de estado */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="App-input-tareasAdmin"
          >
            <option value="Pending">Pendiente</option>
            <option value="In Progress">En progreso</option>
            <option value="Completed">Completada</option>
            <option value="Cancelled">Cancelada</option>
          </select>

          {/* Fecha de vencimiento */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="App-input-tareasAdmin"
          />

          <button onClick={agregarTarea} className="App-btn-agregar-tareasAdmin">
            Agregar
          </button>
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
                      <li key={index}>
                        {usuario.nickname} ({usuario.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span> No asignado</span>
                )}
              </div>

              {/* Muestra prioridad y estado */}
              <p className="App-prioridad-tareasAdmin">
                <strong>Prioridad:</strong> {tarea.priority}
              </p>
              <p className="App-estado-tareasAdmin">
                <strong>Estado:</strong> {tarea.status}
              </p>

              <p className="App-fecha-tareasAdmin">
                <strong>Fecha límite:</strong> {new Date(tarea.dueDate).toLocaleDateString()}
              </p>
              <p className="App-creacion-tareasAdmin">
                <strong>Creado el:</strong> {new Date(tarea.createdAt).toLocaleDateString()}
              </p>
              <p className="App-actualizacion-tareasAdmin">
                <strong>Última actualización:</strong> {new Date(tarea.updatedAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => eliminarTarea(tarea.customId)}  // 🔹 Enviar `customId` en lugar de `_id`
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
