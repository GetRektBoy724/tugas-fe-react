import { Routes, Route } from "react-router";
import PageLayout from "./components/templates/PageLayout.jsx";
import ProductsPage from "./components/pages/ProductsPage.jsx";
import ProductDetailPage from "./components/pages/ProductDetailPage.jsx";
import NotFoundPage from "./components/pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
