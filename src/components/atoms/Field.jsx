export default function Field({ label, hint, error, ...props }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      <input
        className={`rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 ${
          error ? "border-red-400" : "border-gray-300"
        } ${props.className ?? ""}`}
        {...props}
      />
      {error ? (
        <span className="text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="text-xs text-gray-500">{hint}</span>
      ) : null}
    </label>
  );
}
