import ProductCard from "../molecules/ProductCard.jsx";

export default function ProductGrid({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
        Tidak ada produk yang cocok dengan pencarian.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
