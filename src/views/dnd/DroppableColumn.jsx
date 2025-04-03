import { useDroppable } from "@dnd-kit/core";

export function Droppable({ id, titulo, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { estado: id },
  });

  const claseEstado = id.replace(/\s+/g, '-').toLowerCase();
  const activaClass = isOver ? "drop-activa" : "";

  return (
    <div
  ref={setNodeRef}
  className={`columna-tareas ${claseEstado} ${activaClass}`}
>
  <h3>{titulo}</h3>
  <div className="tareas-listado">
    {children}
    <div className="drop-guide">📥 Suelta aquí</div>
  </div>
</div>

  );
}
