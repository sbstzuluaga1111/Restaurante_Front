import { useState, useEffect, useMemo } from "react";
import Nav from "../components/Nav";
import EditarTareaModal from "../components/EditarTareaModal";
import "../css/Views.css/tareasAdmin.css";

function TareasAdmin() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([""]);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [empleados, setEmpleados] = useState([]);

  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  const token = localStorage.getItem("token");

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  useEffect(() => {
    fetch("http://localhost:3010/tareas", { headers })
      .then((response) => response.json())
      .then((data) => {
        const tareasConUsuarios = data.map((tarea) => {
          const assignedTo = Array.isArray(tarea.assignedTo)
            ? tarea.assignedTo.map((usuario) => {
                return typeof usuario === "object"
                  ? usuario
                  : empleados.find((e) => e.usuarioId === usuario) || {};
              })
            : [];
          return { ...tarea, assignedTo };
        });
        setTareas(tareasConUsuarios);
      })
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, [headers, empleados]);

  useEffect(() => {
    fetch("http://localhost:3010/usuarios/empleados", { headers })
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error al obtener empleados:", error));
  }, [headers]);

  const agregarSelectEmpleado = () => {
    setEmpleadosSeleccionados([...empleadosSeleccionados, ""]);
  };

  const eliminarSelectEmpleado = (index) => {
    const nuevos = empleadosSeleccionados.filter((_, i) => i !== index);
    setEmpleadosSeleccionados(nuevos);
  };

  const cambiarEmpleadoSeleccionado = (index, value) => {
    const nuevos = [...empleadosSeleccionados];
    nuevos[index] = value;
    setEmpleadosSeleccionados(nuevos);
  };

  const agregarTarea = () => {
    const empleadosValidos = empleadosSeleccionados.filter((id) => id !== "");
    if (
      titulo.trim() !== "" &&
      descripcion.trim() !== "" &&
      empleadosValidos.length > 0 &&
      dueDate.trim() !== ""
    ) {
      const nuevaTareaObj = {
        title: titulo,
        description: descripcion,
        assignedTo: empleadosValidos.map((id) => parseInt(id)),
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
          const usuariosAsignados = empleados.filter((emp) =>
            empleadosValidos.includes(emp.usuarioId.toString())
          );
          const tareaConUsuarios = {
            ...data,
            assignedTo: usuariosAsignados,
          };
          setTareas([...tareas, tareaConUsuarios]);
          setTitulo("");
          setDescripcion("");
          setEmpleadosSeleccionados([""]);
          setDueDate("");
          setPriority("Medium");
          setStatus("Pending");
        })
        .catch((error) => console.error("Error al agregar tarea:", error));
    }
  };

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

  const abrirModalEditar = (tarea) => {
    setTareaSeleccionada({
      ...tarea,
      assignedTo: Array.isArray(tarea.assignedTo)
        ? tarea.assignedTo.map((e) => {
            if (typeof e === "object" && e !== null && e.usuarioId !== undefined) {
              return e;
            } else if (typeof e === "number") {
              const emp = empleados.find((emp) => emp.usuarioId === e);
              return emp || { usuarioId: e };
            } else {
              return { usuarioId: "" };
            }
          })
        : [],
    });
    setMostrarModalEditar(true);
  };

  return (
    <div className="App-tareasAdmin ">
      <Nav />
      <header className="App-header-tareasAdmin">
        <h1>Agregar Tareas</h1>

        <div className="App-form-tareasAdmin-wrapper">
          <div className="App-form-tareasAdmin formato-grupo-label">
            <div className="form-row">
              <div className="form-col">
                <label>Título:</label>
                <input
                  type="text"
                  placeholder="Título de la tarea"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="App-input-tareasAdmin"
                />
              </div>
              <div className="form-col">
                <label>Descripción:</label>
                <input
                  type="text"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="App-input-tareasAdmin"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Asignar empleados:</label>
              <div className="form-column empleados-container">
                {empleadosSeleccionados.map((empleado, index) => (
                  <div key={index} className="empleado-select-row">
                    <select
                      value={empleado}
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
                        onClick={() => eliminarSelectEmpleado(index)}
                        className="btn-eliminar-select"
                      >
                        ❌
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={agregarSelectEmpleado}
                  className="btn-agregar-select"
                >
                  ➕ Agregar empleado
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
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
              </div>
              <div className="form-col">
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
              </div>
            </div>

            <div className="form-row">
              <label>Fecha de entrega:</label>
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
          </div>
        </div>

        <div className="App-list-tareasAdmin">
          {tareas.map((tarea) => (
            <div key={tarea._id} className="App-item-tareasAdmin">
              <p className="App-texto-tareasAdmin"><strong>{tarea.title}</strong></p>
              <p className="App-descripcion-tareasAdmin">{tarea.description}</p>

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
              <button onClick={() => abrirModalEditar(tarea)} className="App-btn-editar-tareasAdmin">Editar</button>
            </div>
          ))}
        </div>

        {mostrarModalEditar && tareaSeleccionada && (
          <EditarTareaModal
            tarea={tareaSeleccionada}
            onClose={() => setMostrarModalEditar(false)}
            onUpdate={(tareaActualizada) => {
              setTareas((prev) =>
                prev.map((t) => (t.customId === tareaActualizada.customId ? tareaActualizada : t))
              );
              setMostrarModalEditar(false);
            }}
            empleados={empleados}
          />
        )}
      </header>
    </div>
  );
}

export default TareasAdmin;