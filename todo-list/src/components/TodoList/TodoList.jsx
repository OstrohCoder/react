import { useState } from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
