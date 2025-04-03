import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ tarea }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(tarea.customId),
    data: {
      tipo: "tarea",
      estado: tarea.status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none",
  };

  const statusClass = tarea.status.replace(/\s/g, "-").toLowerCase();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`tarea-card ${statusClass}`}
    >
      <h4>{tarea.title}</h4>
      <p>{tarea.description}</p>
      <p><strong>Prioridad:</strong> {tarea.priority}</p>
      <p><strong>Entrega:</strong> {new Date(tarea.dueDate).toLocaleDateString()}</p>
    </div>
  );
}
