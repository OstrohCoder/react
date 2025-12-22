import type { Todo } from "@/hooks/useTodos";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  editingId: number | null;
  editValue: string;
  error: string | null;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onStartEdit: (id: number, text: string) => void;
  onChangeEdit: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

export function TodoList({
  todos,
  editingId,
  editValue,
  error,
  onToggle,
  onRemove,
  onStartEdit,
  onChangeEdit,
  onSaveEdit,
  onCancelEdit,
}: TodoListProps) {
  if (!todos.length) {
    return (
      <p className="text-sm text-muted-foreground">
        Немає задач.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          editValue={editValue}
          error={error}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
          onStartEdit={() => onStartEdit(todo.id, todo.todo)}
          onChangeEdit={onChangeEdit}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}