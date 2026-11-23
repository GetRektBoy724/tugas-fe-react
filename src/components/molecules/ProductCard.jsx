import { Link } from "react-router";
import { formatRupiah } from "../../data/product/api.js";
import Button from "../atoms/Button.jsx";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <span className="text-xs text-gray-500">ID: {product.id}</span>
      <Link
        to={`/products/${product.id}`}
        className="text-lg font-bold text-gray-900 hover:text-blue-700 hover:underline"
      >
        {product.name}
      </Link>
      <span className="mb-3 text-lg font-bold text-blue-700">
        {formatRupiah(product.price)}
      </span>
      <div className="mt-auto flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button
          variant="danger-outline"
          className="flex-1"
          onClick={() => onDelete(product)}
        >
          Hapus
        </Button>
      </div>
    </article>
  );
}
