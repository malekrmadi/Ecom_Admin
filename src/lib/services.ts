import { mockStore } from "@/mock/mockStore";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  promo_price?: number;
  is_on_promo: boolean;
  stock: number;
  category_id: number;
  image_url?: string;
  is_active: boolean;
  is_visible: boolean;
  viscosity?: string;
  motor_type?: string;
  volume?: string;
  packaging?: string;
}

export interface StoreSettings {
  id?: number;
  store_name: string;
  logo_url: string;
  hero_title: string;
  hero_subtitle: string;
  banner_image_url: string;
  facebook_url: string;
  instagram_url: string;
  email: string;
  phone: string;
}

export const ProductService = {
  getAll: () => mockStore.getProducts(),
  getById: (id: number | string) => mockStore.getProductById(id),
  create: (data: FormData | Partial<Product>) => mockStore.createProduct(data),
  update: (id: number | string, data: FormData | Partial<Product>) =>
    mockStore.updateProduct(id, data),
  delete: (id: number | string) => mockStore.deleteProduct(id),
};

export const OrderService = {
  getAll: () => mockStore.getOrders(),
  getById: (id: number | string) => mockStore.getOrderById(id),
  updateStatus: (id: number | string, status: string) => mockStore.updateOrderStatus(id, status),
  createReturn: (orderId: number, customerId: number, reason: string) =>
    mockStore.createReturn(orderId, customerId, reason),
};

export const CategoryService = {
  getAll: () => mockStore.getCategories(),
  create: (data: FormData | Record<string, unknown>) => mockStore.createCategory(data as Record<string, unknown>),
  update: (id: number | string, data: FormData | Record<string, unknown>) =>
    mockStore.updateCategory(id, data as Record<string, unknown>),
  delete: (id: number | string) => mockStore.deleteCategory(id),
};

export const StatsService = {
  getDashboard: () => mockStore.getDashboardStats(),
};

export const StoreSettingsService = {
  get: () => mockStore.getStoreSettings(),
  update: (data: FormData | Record<string, unknown>) =>
    mockStore.updateStoreSettings(data),
};

export const CustomerService = {
  getAll: () => mockStore.getCustomers(),
};

export const ReturnService = {
  getAll: () => mockStore.getReturns(),
};
