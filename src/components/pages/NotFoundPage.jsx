import { Link } from "react-router";
import Button from "../atoms/Button.jsx";

export default function NotFoundPage() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
      <p className="text-6xl font-black tracking-tight text-gray-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
        Alamat yang kamu buka tidak terdaftar. Periksa kembali tautan, atau
        kembali ke daftar produk.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Link to="/">
          <Button>Ke Daftar Produk</Button>
        </Link>
      </div>
    </div>
  );
}
