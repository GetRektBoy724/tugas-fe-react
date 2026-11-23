import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchProductById, formatRupiah } from "../../data/product/api.js";
import Spinner from "../atoms/Spinner.jsx";
import Button from "../atoms/Button.jsx";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setError(null);

    fetchProductById(id, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setProduct(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError" && !controller.signal.aborted) setError(err);
      });

    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-red-700">
          Produk tidak ditemukan
        </h1>
        <p className="mb-5 text-sm text-red-600">{error.message}</p>
        <Link to="/">
          <Button variant="outline">← Kembali ke Daftar Produk</Button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-16">
        <Spinner label="Memuat detail produk…" />
      </div>
    );
  }

  return (
    <>
      <Link
        to="/"
        className="mb-6 inline-block text-sm font-semibold text-blue-700 hover:underline"
      >
        ← Kembali ke Daftar Produk
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-8">
        <span className="text-sm text-gray-500">ID: {product.id}</span>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900">
          {product.name}
        </h1>
        <p className="mt-3 text-2xl font-bold text-blue-700">
          {formatRupiah(product.price)}
        </p>
        <p className="mt-6 text-sm text-gray-500">
          Data produk ini diambil dari backend berdasarkan parameter{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
            id = {product.id}
          </code>{" "}
          pada URL.
        </p>
      </div>
    </>
  );
}
