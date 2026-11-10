import { useState } from "react";
import Modal from "./Modal.jsx";

export default function EditProductModal({ product, onClose, onSave }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const priceNumber = Number(price);

    if (trimmedName === "") {
      setError("Nama produk wajib diisi.");
      return;
    }
    if (!Number.isInteger(priceNumber) || priceNumber <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }

    onSave({ ...product, name: trimmedName, price: priceNumber });
  }

  return (
    <Modal title="Edit Produk" onClose={onClose}>
      <p className="modal-desc">Perbarui informasi produk yang dipilih.</p>
      <p className="modal-id">ID: {product.id}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Produk
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        </label>
        <label>
          Harga (Rp)
          <input
            type="number"
            min="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <small>Harga harus lebih dari 0.</small>
        </label>
        {error && <p className="modal-error">{error}</p>}
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Batal
          </button>
          <button type="submit">Simpan Perubahan</button>
        </div>
      </form>
    </Modal>
  );
}
