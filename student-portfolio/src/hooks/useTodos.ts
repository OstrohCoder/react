import { useEffect, useReducer, useMemo } from "react";

import {
  fetchTodos,
  createTodo,
  updateTodoText,
  updateTodoCompleted,
  deleteTodo
} from "@/services/todoService";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

type State = {
  allTodos: Todo[];
  page: number;
  pageSize: number;
  search: string;
  loading: boolean;
  error: string | null;
  editingId: number | null;
  editValue: string;
  newValue: string;
  formErrorNew: string | null;
  formErrorEdit: string | null;
};

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_ALL_TODOS"; payload: { todos: Todo[] } }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_NEW_VALUE"; payload: string }
  | { type: "SET_EDITING"; payload: { id: number | null; value: string } }
  | { type: "SET_EDIT_VALUE"; payload: string }
  | { type: "SET_FORM_ERROR_NEW"; payload: string | null }
  | { type: "SET_FORM_ERROR_EDIT"; payload: string | null }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "REMOVE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: { id: number; text: string } };

const PAGE_SIZE = 10;

const initialState: State = {
  allTodos: [],
  page: 1,
  pageSize: PAGE_SIZE,
  search: "",
  loading: false,
  error: null,
  editingId: null,
  editValue: "",
  newValue: "",
  formErrorNew: null,
  formErrorEdit: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_ALL_TODOS": {
      const allTodos = action.payload.todos;
      return {
        ...state,
        allTodos,
      };
    }

    case "SET_PAGE": {
      return {
        ...state,
        page: action.payload,
      };
    }

    case "SET_SEARCH": {
      return {
        ...state,
        search: action.payload,
        page: 1,
      };
    }

    case "SET_NEW_VALUE":
      return { ...state, newValue: action.payload };

    case "SET_EDITING":
      return {
        ...state,
        editingId: action.payload.id,
        editValue: action.payload.value,
        formErrorEdit: null,
      };

    case "SET_EDIT_VALUE":
      return { ...state, editValue: action.payload };

    case "SET_FORM_ERROR_NEW":
      return { ...state, formErrorNew: action.payload };

    case "SET_FORM_ERROR_EDIT":
      return { ...state, formErrorEdit: action.payload };

    case "ADD_TODO": {
      const allTodos = [action.payload, ...state.allTodos];
      return {
        ...state,
        allTodos,
        page: 1,
        newValue: "",
        formErrorNew: null,
      };
    }

    case "REMOVE_TODO": {
      const allTodos = state.allTodos.filter(
        (t) => t.id !== action.payload
      );
      return {
        ...state,
        allTodos,
      };
    }

    case "TOGGLE_TODO": {
      const allTodos = state.allTodos.map((t) =>
        t.id === action.payload
          ? { ...t, completed: !t.completed }
          : t
      );
      return {
        ...state,
        allTodos,
      };
    }

    case "EDIT_TODO": {
      const allTodos = state.allTodos.map((t) =>
        t.id === action.payload.id
          ? { ...t, todo: action.payload.text }
          : t
      );
      return {
        ...state,
        allTodos,
        editingId: null,
        editValue: "",
        formErrorEdit: null,
      };
    }

    default:
      return state;
  }
}

function computeVisibleTodos(
  allTodos: Todo[],
  search: string,
  page: number,
  pageSize: number
) {
  const q = search.trim().toLowerCase();

  const filtered = q
    ? allTodos.filter((t) =>
        t.todo.toLowerCase().includes(q)
      )
    : allTodos;

  const total = filtered.length;
  const pageCount = total ? Math.ceil(total / pageSize) : 0;
  const safePage = Math.min(Math.max(page, 1), pageCount || 1);

  const start = (safePage - 1) * pageSize;
  const todos = filtered.slice(start, start + pageSize);

  return { todos, total, safePage, pageCount };
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todos, total, safePage, pageCount } = useMemo(
    () =>
      computeVisibleTodos(
        state.allTodos,
        state.search,
        state.page,
        state.pageSize
      ),
    [state.allTodos, state.search, state.page, state.pageSize]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });

        const data = await fetchTodos(controller.signal);

        dispatch({
          type: "SET_ALL_TODOS",
          payload: { todos: data.todos },
        });
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        const message =
          e instanceof Error ? e.message : "Unknown error";
        dispatch({
          type: "SET_ERROR",
          payload: message,
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    load();
    return () => controller.abort();
  }, []);

  function changePage(next: number) {
    if (next < 1 || (pageCount && next > pageCount)) return;
    dispatch({ type: "SET_PAGE", payload: next });
  }

  function changeSearch(value: string) {
    dispatch({ type: "SET_SEARCH", payload: value });
  }

  function changeNewValue(value: string) {
    dispatch({ type: "SET_NEW_VALUE", payload: value });
    if (state.formErrorNew) {
      dispatch({ type: "SET_FORM_ERROR_NEW", payload: null });
    }
  }

  async function submitNewTodo() {
    const text = state.newValue.trim();
    if (!text) {
      dispatch({
        type: "SET_FORM_ERROR_NEW",
        payload: "Todo не може бути порожнім",
      });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const created = await createTodo({
        todo: text,
        completed: false,
        userId: 1,
      });

      dispatch({ type: "ADD_TODO", payload: created });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Unknown error";
      dispatch({ type: "SET_ERROR", payload: message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  function startEditing(id: number, currentText: string) {
    dispatch({
      type: "SET_EDITING",
      payload: { id, value: currentText },
    });
  }

  function changeEditValue(value: string) {
    dispatch({ type: "SET_EDIT_VALUE", payload: value });
    if (state.formErrorEdit) {
      dispatch({ type: "SET_FORM_ERROR_EDIT", payload: null });
    }
  }

  async function saveEdit() {
    if (state.editingId == null) return;
    const text = state.editValue.trim();
    if (!text) {
      dispatch({
        type: "SET_FORM_ERROR_EDIT",
        payload: "Текст не може бути порожнім",
      });
      return;
    }

    const id = state.editingId;

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const updated = await updateTodoText(id, text);

      dispatch({
        type: "EDIT_TODO",
        payload: { id, text: updated.todo },
      });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Unknown error";
      dispatch({ type: "SET_ERROR", payload: message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  function cancelEdit() {
    dispatch({
      type: "SET_EDITING",
      payload: { id: null, value: "" },
    });
  }

  async function toggleTodo(id: number) {
    const current = state.allTodos.find((t) => t.id === id);
    if (!current) return;

    const nextCompleted = !current.completed;

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      await updateTodoCompleted(id, nextCompleted);

      dispatch({ type: "TOGGLE_TODO", payload: id });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Unknown error";
      dispatch({ type: "SET_ERROR", payload: message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function removeTodo(id: number) {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      await deleteTodo(id);

      dispatch({ type: "REMOVE_TODO", payload: id });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Unknown error";
      dispatch({ type: "SET_ERROR", payload: message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return {
    state: { ...state, todos, total, page: safePage },
    todos,
    pageCount,
    changePage,
    changeSearch,
    changeNewValue,
    submitNewTodo,
    startEditing,
    changeEditValue,
    saveEdit,
    cancelEdit,
    toggleTodo,
    removeTodo,
  };
}
