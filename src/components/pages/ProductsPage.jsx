import { useState } from "react";
import useProducts from "../../data/product/useProducts.js";
import Button from "../atoms/Button.jsx";
import SearchBar from "../molecules/SearchBar.jsx";
import RequestState from "../molecules/RequestState.jsx";
import ProductGrid from "../organisms/ProductGrid.jsx";
import ProductDialog from "../organisms/ProductDialog.jsx";

export default function ProductsPage() {
  const { products, pending, error, reload } = useProducts();
  const [query, setQuery] = useState("");
  const [dialog, setDialog] = useState(null);

  const visible = (products ?? []).filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Manajemen Produk
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Kelola daftar produk dan harga dalam satu tempat — data tersimpan di
            backend.
          </p>
        </div>
        <Button onClick={() => setDialog({ mode: "add" })} disabled={pending || !!error}>
          + Tambah Produk
        </Button>
      </div>

      <RequestState pending={pending} error={error} onRetry={reload}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          resultCount={visible.length}
        />
        <ProductGrid
          products={visible}
          onEdit={(product) => setDialog({ mode: "edit", product })}
          onDelete={(product) => setDialog({ mode: "delete", product })}
        />
        <p className="mt-6 text-sm text-gray-500">
          Menampilkan {visible.length} dari {products.length} produk
        </p>
      </RequestState>

      {dialog && (
        <ProductDialog
          mode={dialog.mode}
          product={dialog.product}
          onClose={() => setDialog(null)}
          onSaved={reload}
        />
      )}
    </>
  );
}
