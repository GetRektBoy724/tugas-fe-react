export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function notFound(req, res) {
  res.status(404).json({ message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan` });
}

export function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  if (err.code === "P2025") {
    res.status(404).json({ message: "Produk tidak ditemukan" });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
}
