import { useState } from "react";
import "../css/EditarTareaModal.css";

function EditarTareaModal({ tarea, onClose, onUpdate, empleados }) {
  const [titulo, setTitulo] = useState(tarea.title);
  const [descripcion, setDescripcion] = useState(tarea.description);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState(
    tarea.assignedTo.map((e) => e.usuarioId.toString())
  );
  const [dueDate, setDueDate] = useState(tarea.dueDate.slice(0, 10));
  const [priority, setPriority] = useState(tarea.priority);
  const [status, setStatus] = useState(tarea.status);

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const cambiarEmpleadoSeleccionado = (index, value) => {
    const nuevos = [...empleadosSeleccionados];
    nuevos[index] = value;
    setEmpleadosSeleccionados(nuevos);
  };

  const agregarEmpleado = () => {
    setEmpleadosSeleccionados([...empleadosSeleccionados, ""]);
  };

  const eliminarEmpleado = (index) => {
    const nuevos = empleadosSeleccionados.filter((_, i) => i !== index);
    setEmpleadosSeleccionados(nuevos);
  };

  const guardarCambios = () => {
    const empleadosValidos = empleadosSeleccionados.filter((id) => id !== "");

    if (titulo.trim() && descripcion.trim() && empleadosValidos.length && dueDate.trim()) {
      const tareaActualizada = {
        title: titulo,
        description: descripcion,
        assignedTo: empleadosValidos.map((id) => parseInt(id)),
        priority,
        status,
        dueDate,
      };

      console.log("Enviando PUT con:", tareaActualizada);

      fetch(`http://localhost:3010/tareas/${tarea.customId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(tareaActualizada),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Tarea actualizada en backend:", data);

          // Reconstruye la relación con los usuarios asignados
          const usuariosAsignados = empleados.filter((emp) =>
            empleadosValidos.includes(emp.usuarioId.toString())
          );

          const tareaConUsuarios = {
            ...data,
            assignedTo: usuariosAsignados,
          };

          onUpdate(tareaConUsuarios);
          onClose();
        })
        .catch((err) => console.error("Error al actualizar tarea:", err));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Tarea</h2>

        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="App-input-tareasAdmin"
        />

        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="App-input-tareasAdmin"
        />

        <label>Asignar empleados:</label>
        {empleadosSeleccionados.map((id, index) => (
          <div key={index} className="empleado-select-row">
            <select
              value={id}
              onChange={(e) => cambiarEmpleadoSeleccionado(index, e.target.value)}
              className="App-input-tareasAdmin"
            >
              <option value="">Seleccionar empleado</option>
              {empleados.map((emp) => (
                <option key={emp.usuarioId} value={emp.usuarioId}>
                  {emp.nickname} ({emp.email})
                </option>
              ))}
            </select>
            {empleadosSeleccionados.length > 1 && (
              <button
                type="button"
                onClick={() => eliminarEmpleado(index)}
                className="btn-eliminar-select"
              >
                ❌
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={agregarEmpleado} className="btn-agregar-select">
          ➕ Agregar empleado
        </button>

        <label>Prioridad:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="App-input-tareasAdmin"
        >
          <option value="Low">Baja</option>
          <option value="Medium">Media</option>
          <option value="High">Alta</option>
        </select>

        <label>Estado:</label>
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

        <label>Fecha de entrega:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="App-input-tareasAdmin"
        />

        <div className="modal-buttons">
          <button onClick={guardarCambios} className="App-btn-agregar-tareasAdmin">
            Guardar cambios
          </button>
          <button onClick={onClose} className="App-btn-eliminar-tareasAdmin">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarTareaModal;
