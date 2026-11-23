export default function Spinner({ label = "Memuat…" }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-500" role="status">
      <span className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
      {label}
    </div>
  );
}
