import "dotenv/config";
import express from "express";
import productRoutes from "./routes/products.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Product API listening on http://localhost:${port}`);
});
