import { useEffect, useState, useCallback } from "react";

const API_BASE = "https://dummyjson.com";

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchTodos() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/todos`);
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
          userId: 1, //додавання симулюється
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

  return {
    todos,
    isLoading,
    error,
    deleteTodo,
    toggleTodo,
    addTodo,
  };
}

export default useTodos;
