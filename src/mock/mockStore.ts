import type { Product, StoreSettings } from "@/lib/services";
import {
  initialCategories,
  initialProducts,
  initialCustomers,
  initialReturns,
  initialStoreSettings,
  buildInitialOrders,
  statsRevenue,
  statsAverageBasket,
  statsReturnsRate,
  statsSalesOverTime,
  statsTopProducts,
  statsOrdersByGovernorate,
} from "./data";

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

let products: Product[] = clone(initialProducts);
let categories = clone(initialCategories);
let customers = clone(initialCustomers);
let orders = buildInitialOrders(clone(initialProducts));
let returns = clone(initialReturns);
let storeSettings: StoreSettings = clone(initialStoreSettings);
let nextOrderId = Math.max(...orders.map((o) => o.id), 0) + 1;
let nextProductId = Math.max(...products.map((p) => p.id), 0) + 1;
let nextCategoryId = Math.max(...categories.map((c) => c.id), 0) + 1;

export const mockStore = {
  async getProducts() {
    await delay();
    return clone(products);
  },

  async getProductById(id: number | string) {
    await delay();
    const p = products.find((x) => x.id === Number(id));
    if (!p) throw new Error("Product not found");
    return clone(p);
  },

  async createProduct(data: Partial<Product> | FormData) {
    await delay();
    const body = data instanceof FormData ? Object.fromEntries(data.entries()) : data;
    const newProduct: Product = {
      id: nextProductId++,
      name: String(body.name || "Nouveau produit"),
      slug: String(body.slug || `produit-${nextProductId}`),
      description: String(body.description || ""),
      price: parseFloat(String(body.price || 0)),
      promo_price: body.promo_price ? parseFloat(String(body.promo_price)) : undefined,
      is_on_promo: body.is_on_promo === true || body.is_on_promo === "true",
      stock: parseInt(String(body.stock || 0), 10),
      category_id: parseInt(String(body.category_id || 1), 10),
      image_url: String(body.image_url || "/uploads/products/placeholder.jpg"),
      is_active: body.is_active !== false && body.is_active !== "false",
      is_visible: body.is_visible !== false && body.is_visible !== "false",
      viscosity: String(body.viscosity || ""),
      motor_type: String(body.motor_type || ""),
      volume: String(body.volume || ""),
      packaging: String(body.packaging || ""),
    };
    products.push(newProduct);
    return clone(newProduct);
  },

  async updateProduct(id: number | string, data: Partial<Product> | FormData) {
    await delay();
    const idx = products.findIndex((p) => p.id === Number(id));
    if (idx === -1) throw new Error("Product not found");
    const body = data instanceof FormData ? Object.fromEntries(data.entries()) : data;
    products[idx] = { ...products[idx], ...body, id: Number(id) } as Product;
    return clone(products[idx]);
  },

  async deleteProduct(id: number | string) {
    await delay();
    products = products.filter((p) => p.id !== Number(id));
  },

  async getCategories() {
    await delay();
    return clone(categories);
  },

  async createCategory(data: Record<string, unknown>) {
    await delay();
    const cat = {
      id: nextCategoryId++,
      name: String(data.name || "Catégorie"),
      slug: String(data.slug || `cat-${nextCategoryId}`),
      image_url: String(data.image_url || "/uploads/categories/placeholder.jpg"),
      is_active: data.is_active !== false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    categories.push(cat);
    return clone(cat);
  },

  async updateCategory(id: number | string, data: Record<string, unknown>) {
    await delay();
    const idx = categories.findIndex((c) => c.id === Number(id));
    if (idx === -1) throw new Error("Category not found");
    categories[idx] = { ...categories[idx], ...data, id: Number(id) };
    return clone(categories[idx]);
  },

  async deleteCategory(id: number | string) {
    await delay();
    categories = categories.filter((c) => c.id !== Number(id));
  },

  async getOrders() {
    await delay();
    return clone(orders);
  },

  async getOrderById(id: number | string) {
    await delay();
    const o = orders.find((x) => x.id === Number(id));
    if (!o) throw new Error("Order not found");
    return clone(o);
  },

  async updateOrderStatus(id: number | string, status: string) {
    await delay();
    const idx = orders.findIndex((o) => o.id === Number(id));
    if (idx === -1) throw new Error("Order not found");
    orders[idx] = { ...orders[idx], status, updated_at: new Date().toISOString() };
    return clone(orders[idx]);
  },

  async createOrder(payload: Record<string, unknown>) {
    await delay(200);
    const items = (payload.items as { product_id: number; quantity: number }[]) || [];
    const orderItems = items.map((item, i) => {
      const product = products.find((p) => p.id === item.product_id)!;
      const unit = product.is_on_promo && product.promo_price ? product.promo_price : product.price;
      return {
        id: nextOrderId * 10 + i + 1,
        order_id: nextOrderId,
        product_id: item.product_id,
        variant_id: null,
        quantity: item.quantity,
        unit_price: unit,
        total_price: Number((unit * item.quantity).toFixed(2)),
        Product: clone(product),
      };
    });
    const total = orderItems.reduce((s, i) => s + Number(i.total_price), 0);
    const order = {
      id: nextOrderId++,
      customer_id: null,
      customer_name: String(payload.customer_name || ""),
      customer_phone: String(payload.customer_phone || ""),
      governorate: String(payload.governorate || ""),
      city: String(payload.city || ""),
      address: String(payload.address || ""),
      note: String(payload.note || ""),
      status: "pending",
      total_price: total + Number(payload.delivery_fee || 7),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      Customer: null,
      OrderItems: orderItems,
    };
    orders.unshift(order);
    return clone(order);
  },

  async createReturn(orderId: number, customerId: number, reason: string) {
    await delay();
    const ret = {
      id: returns.length + 1,
      order_id: orderId,
      customer_id: customerId,
      reason,
      status: "returned",
      created_at: new Date().toISOString(),
    };
    returns.unshift(ret);
    await mockStore.updateOrderStatus(orderId, "returned");
    return clone(ret);
  },

  async getCustomers() {
    await delay();
    return clone(customers);
  },

  async getReturns() {
    await delay();
    return clone(returns);
  },

  async getStoreSettings() {
    await delay();
    return clone(storeSettings);
  },

  async updateStoreSettings(data: Record<string, unknown> | FormData) {
    await delay();
    const body = data instanceof FormData ? Object.fromEntries(data.entries()) : data;
    storeSettings = { ...storeSettings, ...body } as StoreSettings;
    return clone(storeSettings);
  },

  async getDashboardStats() {
    await delay();
    return {
      revenue: statsRevenue.revenue,
      salesOverTime: clone(statsSalesOverTime),
      topProducts: clone(statsTopProducts),
      ordersByGov: clone(statsOrdersByGovernorate),
      returnsRate: statsReturnsRate.returns_rate,
      averageBasket: statsAverageBasket.average_basket,
    };
  },
};
