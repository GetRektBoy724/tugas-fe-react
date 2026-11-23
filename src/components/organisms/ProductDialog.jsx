import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../atoms/Button.jsx";
import Field from "../atoms/Field.jsx";
import { formatRupiah, createProduct, updateProduct, deleteProduct } from "../../data/product/api.js";

export default function ProductDialog({ mode, product, onClose, onSaved }) {
  const isDelete = mode === "delete";
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const firstField = useRef(null);
  const navigate = useNavigate();

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    firstField.current?.focus();
    function onKeyDown(event) {
      if (event.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const titles = {
    add: "Tambah Produk",
    edit: "Edit Produk",
    delete: "Hapus Produk?",
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const trimmedName = name.trim();
    const priceNumber = Number(price);

    if (!isDelete) {
      if (trimmedName === "") {
        setFormError("Nama produk wajib diisi.");
        return;
      }
      if (!Number.isInteger(priceNumber) || priceNumber <= 0) {
        setFormError("Harga harus berupa bilangan bulat lebih dari 0.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (mode === "add") {
        const created = await createProduct({ name: trimmedName, price: priceNumber });
        onSaved?.();
        onClose();
        navigate(`/products/${created.id}`);
      } else if (mode === "edit") {
        await updateProduct(product.id, { name: trimmedName, price: priceNumber });
        onSaved?.();
        onClose();
      } else {
        await deleteProduct(product.id);
        onSaved?.();
        onClose();
      }
    } catch (err) {
      setServerError(err.message);
      setFormError("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4"
      onClick={submitting ? undefined : onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-start justify-between">
          <h2 className="text-lg font-bold text-gray-900">{titles[mode]}</h2>
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
            disabled={submitting}
          >
            ×
          </button>
        </div>

        {isDelete ? (
          <form onSubmit={handleSubmit}>
            <p className="mb-4 text-sm text-gray-500">
              Produk yang dihapus tidak dapat dikembalikan.
            </p>
            <div className="mb-5 flex flex-col items-center gap-1 rounded-lg border border-gray-200 p-4 text-center">
              <span className="text-xs text-gray-500">ID: {product.id}</span>
              <strong className="text-base text-gray-900">{product.name}</strong>
              <span className="font-bold text-blue-700">
                {formatRupiah(product.price)}
              </span>
            </div>
            {serverError && (
              <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {serverError}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                Batal
              </Button>
              <Button variant="danger" type="submit" disabled={submitting}>
                {submitting ? "Menghapus…" : "Hapus Produk"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">
              {mode === "add"
                ? "Masukkan informasi produk baru."
                : "Perbarui informasi produk yang dipilih."}
            </p>
            {mode === "edit" && (
              <p className="text-sm text-gray-500">ID: {product.id}</p>
            )}
            <Field
              label="Nama Produk"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={firstField}
            />
            <Field
              label="Harga (Rp)"
              type="number"
              placeholder="Contoh: 5000"
              hint="Harga harus lebih dari 0."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {formError && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
                {formError}
              </p>
            )}
            {serverError && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
                {serverError}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                Batal
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? "Menyimpan…"
                  : mode === "add"
                    ? "Simpan Produk"
                    : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
