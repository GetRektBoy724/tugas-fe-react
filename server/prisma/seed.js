import { prisma } from "../db/prisma.js";

async function main() {
  await prisma.product.deleteMany();
  await prisma.$executeRawUnsafe(
    "DELETE FROM sqlite_sequence WHERE name = 'Product'"
  );
  await prisma.product.createMany({
    data: [
      { name: "Pulpen", price: 5000 },
      { name: "Buku Tulis", price: 12000 },
      { name: "Spidol", price: 8000 },
      { name: "Penggaris", price: 6000 },
      { name: "Penghapus", price: 3000 },
    ],
  });
  console.log("Seed selesai: 5 produk ditambahkan.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
