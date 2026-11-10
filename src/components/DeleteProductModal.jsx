import Modal from "./Modal.jsx";
import { formatRupiah } from "../utils/format.js";

export default function DeleteProductModal({ product, onClose, onDelete }) {
  return (
    <Modal title={null} onClose={onClose}>
      <div className="delete-hero">
        <span className="delete-icon" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          </svg>
        </span>
        <h2>Hapus Produk?</h2>
        <p>Produk yang dihapus tidak dapat dikembalikan.</p>
      </div>

      <div className="delete-summary">
        <small>ID: {product.id}</small>
        <strong>{product.name}</strong>
        <span>{formatRupiah(product.price)}</span>
      </div>

      <div className="modal-actions">
        <button type="button" className="secondary" onClick={onClose}>
          Batal
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(product.id)}
        >
          Hapus Produk
        </button>
      </div>
    </Modal>
  );
}
