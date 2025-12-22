import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "./TodoForm";
import { TodoSearch } from "./TodoSearch";
import { TodoList } from "./TodoList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useCallback } from "react";

export function TodoContainer() {
  const {
    state,
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
  } = useTodos();

  const handleToggle = useCallback(
    (id: number) => {
      void toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleRemove = useCallback(
    (id: number) => {
      void removeTodo(id);
    },
    [removeTodo]
  );

  const handleStartEdit = useCallback(
    (id: number, text: string) => {
      startEditing(id, text);
    },
    [startEditing]
  );

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const windowSize = 2;
  const start = Math.max(1, state.page - windowSize);
  const end = Math.min(pageCount, state.page + windowSize);
  const visiblePages = pages.slice(start - 1, end);

  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Todo List</h1>

      <TodoForm
        value={state.newValue}
        error={state.formErrorNew}
        loading={state.loading}
        onChange={changeNewValue}
        onSubmit={submitNewTodo}
      />

      <TodoSearch value={state.search} onChange={changeSearch} />

      {state.loading && <p>Loading...</p>}
      {state.error && <p className="text-red-500">{state.error}</p>}

      <TodoList
        todos={todos}
        editingId={state.editingId}
        editValue={state.editValue}
        error={state.formErrorEdit}
        onToggle={(id: number) => handleToggle(id)}
        onRemove={(id: number) => handleRemove(id)}
        onStartEdit={(id: number, text: string) => handleStartEdit(id, text)}
        onChangeEdit={changeEditValue}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
      />

      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (state.page > 1) changePage(state.page - 1);
                }}
              />
            </PaginationItem>

            {visiblePages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === state.page}
                  onClick={(e) => {
                    e.preventDefault();
                    changePage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (state.page < pageCount) changePage(state.page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
