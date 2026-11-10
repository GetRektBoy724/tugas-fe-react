export default function SearchBar({ query, onQueryChange, resultCount }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari nama produk..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <span className="search-count">{resultCount} produk</span>
    </div>
  );
}
