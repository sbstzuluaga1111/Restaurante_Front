import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Nav from "../components/Nav";
import "../css/Views.css/tareasEmpleado.css";

import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { Droppable } from "./dnd/DroppableColumn";
import { SortableItem } from "./dnd/SortableItem";

function TareasEmpleado() {
  const { user } = useAuth();
  const [tareas, setTareas] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTarea, setActiveTarea] = useState(null);

  const estados = ["Pending", "In Progress", "Completed", "Cancelled"];

  useEffect(() => {
    if (!user?.usuarioId) return;

    fetch(`http://localhost:3010/tareas/empleado/${user.usuarioId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const porEstado = {
          "Pending": [],
          "In Progress": [],
          "Completed": [],
          "Cancelled": [],
        };

        data.forEach((tarea) => {
          if (tarea.customId && porEstado[tarea.status]) {
            porEstado[tarea.status].push(tarea);
          }
        });

        setTareas(porEstado);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener tareas:", err);
        setLoading(false);
      });
  }, [user]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const tareaId = active.id;

    const found = Object.values(tareas)
      .flat()
      .find((t) => String(t.customId) === tareaId);

    if (found) setActiveTarea(found);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTarea(null);

    if (!over || active.id === over.id) return;

    const sourceEstado = Object.keys(tareas).find((estado) =>
      tareas[estado].some((t) => String(t.customId) === active.id)
    );

    const destinationEstado = over?.data?.current?.estado;

    if (
      !sourceEstado ||
      !destinationEstado ||
      !estados.includes(destinationEstado)
    ) {
      console.warn("❗ Estado inválido", { sourceEstado, destinationEstado });
      return;
    }

    if (sourceEstado === destinationEstado) {
      console.log("🟡 Mismo estado: no se actualiza.");
      return;
    }

    const sourceList = [...tareas[sourceEstado]];
    const destinationList = [...tareas[destinationEstado]];
    const movedTarea = sourceList.find((t) => String(t.customId) === active.id);
    if (!movedTarea) return;

    // Crear una nueva tarea con status actualizado
    const updatedTarea = { ...movedTarea, status: destinationEstado };

    const newSource = sourceList.filter((t) => String(t.customId) !== active.id);
    const newDestination = [...destinationList, updatedTarea];

    const updatedTareas = {
      ...tareas,
      [sourceEstado]: newSource,
      [destinationEstado]: newDestination,
    };

    setTareas(updatedTareas);

    try {
      await fetch(`http://localhost:3010/tareas/${active.id}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ nuevoEstado: destinationEstado }),
      });
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  if (loading) return <div className="cargando">Cargando tareas...</div>;

  return (
    <div className="App-tareasEmpleado">
      <Nav />
      <header className="App-header-tareasEmpleado">
        <div className="tareas-empleado-container">
          <h2>Mis Tareas</h2>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="tareas-board">
              {estados.map((estado) => (
                <Droppable key={estado} id={estado} titulo={estado}>
                  <SortableContext
                    items={tareas[estado]
                      .filter((t) => t.customId)
                      .map((t) => String(t.customId))}
                    strategy={verticalListSortingStrategy}
                  >
                    {tareas[estado]
                      .filter((t) => t.customId)
                      .map((tarea) => (
                        <SortableItem
                          key={String(tarea.customId)}
                          tarea={tarea}
                        />
                      ))}
                  </SortableContext>
                </Droppable>
              ))}
            </div>

            <DragOverlay>
              {activeTarea ? (
                <div className={`tarea-card drag-preview ${activeTarea.status.replace(/\s/g, "-").toLowerCase()}`}>
                  <h4>{activeTarea.title}</h4>
                  <p>{activeTarea.description}</p>
                  <p><strong>Prioridad:</strong> {activeTarea.priority}</p>
                  <p><strong>Entrega:</strong> {new Date(activeTarea.dueDate).toLocaleDateString()}</p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </header>
    </div>
  );
}

export default TareasEmpleado;
