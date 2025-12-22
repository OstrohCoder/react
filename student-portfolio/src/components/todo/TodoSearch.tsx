import { Input } from "@/components/ui/input";

type TodoSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TodoSearch({ value, onChange }: TodoSearchProps) {
  return (
    <Input
      placeholder="Пошук по задачах..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}