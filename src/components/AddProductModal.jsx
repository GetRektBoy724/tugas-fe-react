import { useState } from "react";
import Modal from "./Modal.jsx";

export default function AddProductModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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

    onSave({ name: trimmedName, price: priceNumber });
  }

  return (
    <Modal title="Tambah Produk" onClose={onClose}>
      <p className="modal-desc">Masukkan informasi produk baru.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Produk
          <input
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        </label>
        <label>
          Harga (Rp)
          <input
            type="number"
            placeholder="Contoh: 5000"
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
          <button type="submit">Simpan Produk</button>
        </div>
      </form>
    </Modal>
  );
}
