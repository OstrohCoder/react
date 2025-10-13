import { useEffect, useState, useCallback } from "react";

const API_BASE = "https://dummyjson.com";

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchTodos() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/todos?limit=150`);
        if (!res.ok) throw new Error(`GET /todos failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setTodos(data.todos || []);
      } catch (err) {
        if (!cancelled) setError(err.message || err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchTodos();
    return () => {
      cancelled = true;
    };
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }, []);

  const changeLimit = useCallback((limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  }, []);

  const deleteTodo = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`DELETE /todos/${id} failed: ${res.status}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleTodo = useCallback(async (id, newCompleted) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: newCompleted }),
      });
      if (!res.ok) throw new Error(`PUT /todos/${id} failed: ${res.status}`);
      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: updated.completed } : t
        )
      );
    } catch (err) {
      setError(err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editTodoTitle = useCallback(async (id, newTitle) => {
    if (!newTitle.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle.trim() }),
      });
      if (!res.ok) throw new Error(`PUT /todos/${id} failed: ${res.status}`);
      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: updated.todo } : t))
      );
    } catch (err) {
      setError(err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (text) => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/todos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text.trim(),
          completed: false,
          userId: 1,
        }),
      });
      if (!res.ok) throw new Error(`POST failed: ${res.status}`);
      const newTodo = await res.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredTodos = todos.filter((t) =>
    t.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTodos = filteredTodos.length;
  const startIndex = (currentPage - 1) * limitPerPage;
  const pagedTodos = filteredTodos.slice(startIndex, startIndex + limitPerPage);

  return {
    todos: pagedTodos,
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
    setLimit: changeLimit,
  };
}

export default useTodos;
