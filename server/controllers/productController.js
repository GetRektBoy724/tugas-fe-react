import { prisma } from "../db/prisma.js";
import { HttpError } from "../middlewares/errorHandler.js";

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, "Parameter id harus berupa bilangan bulat positif");
  }
  return id;
}

function parseProduct(body = {}) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const price = body.price;

  if (name === "") throw new HttpError(400, "Field name wajib diisi");
  if (typeof price !== "number" || !Number.isInteger(price) || price <= 0) {
    throw new HttpError(400, "Field price harus berupa bilangan bulat lebih dari 0");
  }

  return { name, price };
}

export async function getProducts(_req, res) {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  res.json(products);
}

export async function getProductById(req, res) {
  const product = await prisma.product.findUnique({
    where: { id: parseId(req.params.id) },
  });
  if (!product) throw new HttpError(404, "Produk tidak ditemukan");
  res.json(product);
}

export async function createProduct(req, res) {
  const product = await prisma.product.create({ data: parseProduct(req.body) });
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const product = await prisma.product.update({
    where: { id: parseId(req.params.id) },
    data: parseProduct(req.body),
  });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await prisma.product.delete({
    where: { id: parseId(req.params.id) },
  });
  res.json({ message: `Produk ${product.name} berhasil dihapus` });
}
