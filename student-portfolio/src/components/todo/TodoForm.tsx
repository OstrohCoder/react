import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoFormProps = {
  value: string;
  error: string | null;
  loading: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function TodoForm({
  value,
  error,
  loading,
  onChange,
  onSubmit,
}: TodoFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-1"
    >
      <div className="flex gap-2">
        <Input
          placeholder="Додати нове завдання..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          Add
        </Button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}