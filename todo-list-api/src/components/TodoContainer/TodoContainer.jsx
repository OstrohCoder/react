import "../TodoList/TodoList.css";
import useTodos from "../../hooks/useTodos";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";

function TodoContainer() {
  const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo } =
    useTodos();

  return (
    <div className="todo-list-container">
      <h1>Todos</h1>

      <TodoForm onAdd={addTodo} />

      {isLoading && <div>Loading...</div>}
      {error && <div className="error">Error: {String(error)}</div>}

      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

      <p className="note">
        Note: Adding is client-side only. Toggle and Delete use DummyJSON API.
      </p>
    </div>
  );
}

export default TodoContainer;
