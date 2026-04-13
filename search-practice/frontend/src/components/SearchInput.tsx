// src/components/SearchInput.tsx
interface Props {
  value: string;
  onChange: (val: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  return (
    <input
      className="w-full p-2 border rounded-md"
      placeholder="Search by name or phone..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}