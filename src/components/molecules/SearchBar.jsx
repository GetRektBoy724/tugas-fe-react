export default function SearchBar({ query, onQueryChange, resultCount }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-full max-w-sm">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500"
        />
      </div>
      <span className="text-sm text-gray-500">{resultCount} produk</span>
    </div>
  );
}
