import { mockStore } from "@/mock/mockStore";
import { DEMO_IMAGES } from "@/mock/demoImages";

/** Legacy: images are served from `public/` (no backend). */
export const API_BASE = "";

type ApiResponse<T> = { data: T };

function parsePath(url: string): string {
  return url.split("?")[0].replace(/\/$/, "");
}

async function mockGet<T>(url: string): Promise<T> {
  const path = parsePath(url);
  if (path === "/products") return mockStore.getProducts() as T;
  if (path.startsWith("/products/")) return mockStore.getProductById(path.split("/")[2]) as T;
  if (path === "/categories") return mockStore.getCategories() as T;
  if (path === "/orders") return mockStore.getOrders() as T;
  if (path.startsWith("/orders/")) return mockStore.getOrderById(path.split("/")[2]) as T;
  if (path === "/customers") return mockStore.getCustomers() as T;
  if (path === "/returns") return mockStore.getReturns() as T;
  if (path === "/store-settings") return mockStore.getStoreSettings() as T;
  if (path === "/stats/revenue") return { revenue: (await mockStore.getDashboardStats()).revenue } as T;
  if (path === "/stats/sales-over-time") {
    const s = await mockStore.getDashboardStats();
    return s.salesOverTime as T;
  }
  if (path === "/stats/top-products") {
    const s = await mockStore.getDashboardStats();
    return s.topProducts as T;
  }
  if (path === "/stats/orders-by-governorate") {
    const s = await mockStore.getDashboardStats();
    return s.ordersByGov as T;
  }
  if (path === "/stats/returns-rate") {
    const s = await mockStore.getDashboardStats();
    return { returns_rate: s.returnsRate } as T;
  }
  if (path === "/stats/average-basket") {
    const s = await mockStore.getDashboardStats();
    return { average_basket: s.averageBasket } as T;
  }
  throw new Error(`Mock API: route not found ${path}`);
}

async function mockPost<T>(url: string, body?: unknown): Promise<T> {
  const path = parsePath(url);
  if (path === "/orders") return mockStore.createOrder((body || {}) as Record<string, unknown>) as T;
  if (path === "/returns") {
    const b = body as { order_id: number; customer_id: number; reason: string };
    return mockStore.createReturn(b.order_id, b.customer_id, b.reason) as T;
  }
  if (path === "/products") return mockStore.createProduct(body as FormData) as T;
  if (path === "/categories") return mockStore.createCategory((body || {}) as Record<string, unknown>) as T;
  throw new Error(`Mock API POST: route not found ${path}`);
}

async function mockPut<T>(url: string, body?: unknown): Promise<T> {
  const path = parsePath(url);
  if (path.startsWith("/products/")) {
    return mockStore.updateProduct(path.split("/")[2], body as FormData) as T;
  }
  if (path.startsWith("/categories/")) {
    return mockStore.updateCategory(path.split("/")[2], (body || {}) as Record<string, unknown>) as T;
  }
  if (path.match(/\/orders\/\d+\/status/)) {
    const id = path.split("/")[2];
    const status = (body as { status: string }).status;
    return mockStore.updateOrderStatus(id, status) as T;
  }
  if (path === "/store-settings") {
    return mockStore.updateStoreSettings((body || {}) as FormData) as T;
  }
  throw new Error(`Mock API PUT: route not found ${path}`);
}

async function mockDelete(url: string): Promise<void> {
  const path = parsePath(url);
  if (path.startsWith("/products/")) return mockStore.deleteProduct(path.split("/")[2]);
  if (path.startsWith("/categories/")) return mockStore.deleteCategory(path.split("/")[2]);
  throw new Error(`Mock API DELETE: route not found ${path}`);
}

export const api = {
  get: <T = unknown>(url: string) => mockGet<T>(url).then((data) => ({ data }) as ApiResponse<T>),
  post: <T = unknown>(url: string, body?: unknown) =>
    mockPost<T>(url, body).then((data) => ({ data }) as ApiResponse<T>),
  put: <T = unknown>(url: string, body?: unknown) =>
    mockPut<T>(url, body).then((data) => ({ data }) as ApiResponse<T>),
  delete: (url: string) => mockDelete(url).then(() => ({ data: undefined })),
};

export const getPlaceholderImage = (_id: string | number = 1) =>
  DEMO_IMAGES.products.placeholder;
