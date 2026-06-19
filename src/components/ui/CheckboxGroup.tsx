"use client";

interface CheckboxGroupProps {
  label?: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
}

export function CheckboxGroup({
  label,
  options,
  values,
  onChange,
}: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div className="space-y-3">
      {label && <p className="text-sm text-muted">{label}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <label
              key={option}
              className={[
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 cursor-pointer transition-colors",
                checked
                  ? "border-electric bg-electric/10"
                  : "border-white/10 bg-white/5 hover:border-white/20",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-electric focus:ring-electric"
              />
              <span className="text-sm">{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
