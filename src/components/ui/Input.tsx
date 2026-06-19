import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white",
            "placeholder:text-white/30 focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric",
            error ? "border-warning" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && <p className="text-xs text-warning">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
