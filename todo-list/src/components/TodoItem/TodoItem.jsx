import { useState } from "react";
import "./TodoItem.css";

function TodoItem({ task, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <>
      <li className={`todo-item ${isCompleted ? "completed" : ""}`}>
        <div className="todo-left">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          <span className="todo-text">{task.text}</span>
        </div>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          ✕
        </button>
      </li>
    </>
  );
}

export default TodoItem;
