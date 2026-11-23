import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

export default function PageLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-gray-900"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white">
              MP
            </span>
            Manajemen Produk
          </Link>
          <nav className="flex items-center gap-1" aria-label="Navigasi utama">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Daftar Produk
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        Tugas 4 — React Router, Tailwind CSS, dan Integrasi Backend
      </footer>
    </div>
  );
}
