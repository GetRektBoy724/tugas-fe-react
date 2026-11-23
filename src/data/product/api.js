const BASE = "/api/products";

export function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

async function request(path = "", options) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, options);
  } catch {
    throw new Error("Server tidak dapat dihubungi. Pastikan backend sedang berjalan.");
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.message || `Permintaan gagal (HTTP ${response.status}).`);
  }
  return body;
}

export function fetchProducts(signal) {
  return request("", { signal });
}

export function fetchProductById(id, signal) {
  return request(`/${id}`, { signal });
}

export function createProduct(details) {
  return request("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

export function updateProduct(id, details) {
  return request(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

export function deleteProduct(id) {
  return request(`/${id}`, { method: "DELETE" });
}
