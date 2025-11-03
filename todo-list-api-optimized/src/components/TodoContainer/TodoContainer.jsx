import "../TodoList/TodoList.css";
import useTodos from "../../hooks/useTodos";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";
import { useCallback } from "react";

function TodoContainer() {
  const {
    todos,
    isLoading,
    error,
    deleteTodo,
    toggleTodo,
    addTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
  } = useTodos();

  const handleSearchChange = useCallback(
    (e) => setSearchTerm(e.target.value),
    [setSearchTerm]
  );

  return (
    <div className="todo-list-container">
      <h1>Todos</h1>

      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem", padding: "0.4rem" }}
      />

      <TodoForm onAdd={addTodo} />

      {isLoading && <div>Loading...</div>}
      {error && <div className="error">Error: {String(error)}</div>}

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodoTitle}
      />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {currentPage} | Total: {totalTodos}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage * limitPerPage >= totalTodos}
        >
          Next
        </button>
        <select
          value={limitPerPage}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ marginLeft: "1rem" }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      <p className="note" style={{ marginTop: "1rem" }}>
        Note: Adding is client-side only. Toggle, Delete, and Edit use DummyJSON API.
      </p>
    </div>
  );
}

export default TodoContainer;
