import "./TodoItem.css";
import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const [completed, setCompleted] = useState(Boolean(todo.completed));
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = async () => {
    const next = !completed;
    setCompleted(next);
    setIsSaving(true);
    try {
      await onToggle(todo.id, next);
    } catch {
      setCompleted(!next);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <li className={`todo-item ${completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          disabled={isSaving}
        />
        <span>{todo.todo}</span>
      </label>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
