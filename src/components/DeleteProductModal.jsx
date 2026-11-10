import Modal from "./Modal.jsx";
import { formatRupiah } from "../utils/format.js";

export default function DeleteProductModal({ product, onClose, onDelete }) {
  return (
    <Modal title="Hapus Produk?" onClose={onClose}>
      <p className="modal-desc">Produk yang dihapus tidak dapat dikembalikan.</p>
      <p className="delete-summary">
        <strong>ID: {product.id}</strong> — {product.name} —{" "}
        {formatRupiah(product.price)}
      </p>
      <div className="modal-actions">
        <button type="button" className="secondary" onClick={onClose}>
          Batal
        </button>
        <button type="button" className="danger" onClick={() => onDelete(product.id)}>
          Hapus Produk
        </button>
      </div>
    </Modal>
  );
}
