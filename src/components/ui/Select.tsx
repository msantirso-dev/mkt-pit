import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, placeholder, className = "", id, ...props },
    ref
  ) => {
    const selectId = id ?? props.name;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-sm text-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={[
            "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white",
            "focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric",
            error ? "border-warning" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option} className="bg-background">
              {option}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-warning">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
