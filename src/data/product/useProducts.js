import { useEffect, useState } from "react";
import { fetchProducts } from "./api.js";

export default function useProducts() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setProducts(null);
    setError(null);

    fetchProducts(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setProducts(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError" && !controller.signal.aborted) setError(err);
      });

    return () => controller.abort();
  }, [reloadCount]);

  return {
    products,
    error,
    pending: products === null && error === null,
    reload: () => setReloadCount((n) => n + 1),
    replace: setProducts,
  };
}
