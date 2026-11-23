import { useState } from "react";
import "./App.css";
import INITIAL_PRODUCTS from "./data/products.js";
import PageHeader from "./components/PageHeader.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProductList from "./components/ProductList.jsx";
import PageFooter from "./components/PageFooter.jsx";
import AddProductModal from "./components/AddProductModal.jsx";
import EditProductModal from "./components/EditProductModal.jsx";
import DeleteProductModal from "./components/DeleteProductModal.jsx";

let nextId = 6;

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  function openAddModal() {
    setModal({ type: "add" });
  }

  function openEditModal(product) {
    setModal({ type: "edit", product });
  }

  function openDeleteModal(product) {
    setModal({ type: "delete", product });
  }

  function closeModal() {
    setModal(null);
  }

  function handleAdd(newProduct) {
    setProducts([...products, { id: nextId, ...newProduct }]);
    nextId += 1;
    setModal(null);
  }

  function handleEdit(updatedProduct) {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setModal(null);
  }

  function handleDelete(id) {
    setProducts(products.filter((p) => p.id !== id));
    setModal(null);
  }

  return (
    <div className="container">
      <div className="top-row">
        <PageHeader />
        <button type="button" className="add-button" onClick={openAddModal}>
          + Tambah Produk
        </button>
      </div>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        resultCount={filteredProducts.length}
      />

      <ProductList
        products={filteredProducts}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <PageFooter shown={filteredProducts.length} total={products.length} />

      {modal?.type === "add" && (
        <AddProductModal onClose={closeModal} onSave={handleAdd} />
      )}
      {modal?.type === "edit" && (
        <EditProductModal
          product={modal.product}
          onClose={closeModal}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteProductModal
          product={modal.product}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
