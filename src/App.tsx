import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { StoreSettingsProvider } from "@/contexts/StoreSettingsContext";

import DashboardPage from "@/pages/admin/DashboardPage";
import ProductsPage from "@/pages/admin/ProductsPage";
import AddProductPage from "@/pages/admin/AddProductPage";
import EditProductPage from "@/pages/admin/EditProductPage";
import AdminCategoriesPage from "@/pages/admin/AdminCategoriesPage";
import AddCategoryPage from "@/pages/admin/AddCategoryPage";
import EditCategoryPage from "@/pages/admin/EditCategoryPage";
import OrdersPage from "@/pages/admin/OrdersPage";
import OrderDetailsPage from "@/pages/admin/OrderDetailsPage";
import CustomersPage from "@/pages/admin/CustomersPage";
import ReturnsPage from "@/pages/admin/ReturnsPage";
import StoreSettingsPage from "@/pages/admin/StoreSettingsPage";

import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreSettingsProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/admin/products/new" element={<AddProductPage />} />
          <Route path="/admin/products/:id" element={<EditProductPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/categories/new" element={<AddCategoryPage />} />
          <Route path="/admin/categories/:id" element={<EditCategoryPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/admin/returns" element={<ReturnsPage />} />
          <Route path="/admin/customers" element={<CustomersPage />} />
          <Route path="/admin/settings" element={<StoreSettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StoreSettingsProvider>
  </QueryClientProvider>
);

export default App;
