import { formatRupiah } from "../utils/format.js";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h3 className="product-name">{product.name}</h3>
      <strong className="product-price">{formatRupiah(product.price)}</strong>
      <div className="product-actions">
        <button type="button" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
