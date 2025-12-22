import React from "react";
import type { Todo } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  editValue: string;
  error: string | null;
  onToggle: () => void;
  onRemove: () => void;
  onStartEdit: () => void;
  onChangeEdit: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

export const TodoItem = React.memo(function TodoItem({
  todo,
  isEditing,
  editValue,
  error,
  onToggle,
  onRemove,
  onStartEdit,
  onChangeEdit,
  onSaveEdit,
  onCancelEdit,
}: TodoItemProps) {
  return (
    <li className="flex items-start gap-2 border rounded p-2">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={onToggle}
      />
      <div className="flex-1 space-y-1">
        {isEditing ? (
          <>
            <Input
              value={editValue}
              onChange={(e) => onChangeEdit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSaveEdit();
                if (e.key === "Escape") onCancelEdit();
              }}
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}
          </>
        ) : (
          <p
            className={
              todo.completed
                ? "line-through text-muted-foreground"
                : ""
            }
          >
            {todo.todo}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {isEditing ? (
          <Button size="sm" variant="outline" onClick={onSaveEdit}>
            Save
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={onStartEdit}>
            Edit
          </Button>
        )}
        <Button
          size="sm"
          variant="destructive"
          onClick={onRemove}
        >
          Delete
        </Button>
      </div>
    </li>
  );
});