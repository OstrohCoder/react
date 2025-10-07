import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.todo);
  };

  const saveEdit = (id) => {
    if (editValue.trim()) {
      onEdit(id, editValue);
      setEditingId(null);
      setEditValue("");
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
          {editingId === todo.id ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
              />
              <button onClick={() => saveEdit(todo.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
              <button onClick={() => startEditing(todo)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
