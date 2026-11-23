import Button from "../atoms/Button.jsx";
import Spinner from "../atoms/Spinner.jsx";

export default function RequestState({ pending, error, onRetry, children }) {
  if (pending) {
    return (
      <div className="py-16">
        <Spinner label="Memuat produk dari server…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="mb-4 text-sm font-medium text-red-700">{error.message}</p>
        <Button variant="outline" onClick={onRetry}>
          Coba Lagi
        </Button>
      </div>
    );
  }

  return children;
}
