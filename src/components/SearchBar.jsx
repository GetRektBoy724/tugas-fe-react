export default function SearchBar({ query, onQueryChange, resultCount }) {
  return (
    <div className="search-bar">
      <div className="search-input">
        <svg
          className="search-icon"
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
        />
      </div>
      <span className="search-count">{resultCount} produk</span>
    </div>
  );
}
