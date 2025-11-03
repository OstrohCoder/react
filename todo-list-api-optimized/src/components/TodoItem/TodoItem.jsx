import "./TodoItem.css";
import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [completed, setCompleted] = useState(Boolean(todo.completed));
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.todo);

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

  const handleEditSave = async () => {
    const newTitle = draftTitle.trim();
    if (!newTitle || newTitle === todo.todo) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onEdit(todo.id, newTitle);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
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
        {isEditing ? (
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
            disabled={isSaving}
            autoFocus
          />
        ) : (
          <span>{todo.todo}</span>
        )}
      </label>

      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleEditSave} disabled={isSaving}>
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} disabled={isSaving}>
            Edit
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} disabled={isSaving}>
          Delete
        </button>
      </div>
    </li>
  );
}
