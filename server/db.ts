import fs from "fs";
import path from "path";
import { User, Product, Order, Review, UserRole } from "../src/types";
import { SEED_PRODUCTS } from "./products_seed";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

interface DBStructure {
  users: Array<User & { passwordHash: string }>;
  products: Product[];
  orders: Order[];
  catalogWiped?: boolean;
  retiredProducts?: string[];
}

const DEFAULT_PRODUCTS: Product[] = SEED_PRODUCTS.filter(p => p.category === "Electronics");

class LocalDatabase {
  private data: DBStructure = { users: [], products: [], orders: [] };

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, "utf-8");
        this.data = JSON.parse(fileContent);
        
        // Convert any existing category of "Health" to "Wellness"
        this.data.products = this.data.products.map(p => {
          if ((p.category as string) === "Health") {
            p.category = "Wellness";
          }
          return p;
        });
        
        // Dynamic Sync: Guarantee all newly added curated products are loaded unless explicitly wiped
        if (!this.data.catalogWiped) {
          const retiredIds = new Set(this.data.retiredProducts || []);
          
          // Filter out retired products from existing database products
          const activeDbProducts = this.data.products.filter(p => !retiredIds.has(p.id));
          const existingDbProductIds = new Set(activeDbProducts.map(p => p.id));
          
          // Discover active default products that are NOT already in the database
          const newDefaultProductsAdded = DEFAULT_PRODUCTS.filter(
            p => !retiredIds.has(p.id) && !existingDbProductIds.has(p.id)
          );
          
          // The final active list is the existing database products + any new default products
          this.data.products = [...activeDbProducts, ...newDefaultProductsAdded];
          this.save();
        }
      } else {
        this.seedInitialData();
      }
    } catch (error) {
      console.error("Failed to initialize database:", error);
      this.seedInitialData();
    }
  }

  private seedInitialData() {
    this.data = {
      users: [
        {
          id: "u1",
          name: "Admin",
          email: "admin@aura.in",
          role: "admin",
          createdAt: new Date().toISOString(),
          passwordHash: "admin"
        },
        {
          id: "u2",
          name: "Shashank N.",
          email: "shashank.nuthalapati06@gmail.com",
          role: "user",
          createdAt: new Date().toISOString(),
          passwordHash: "user123"
        }
      ],
      products: DEFAULT_PRODUCTS,
      orders: [
        {
          id: "order_1001",
          userId: "u2",
          userEmail: "shashank.nuthalapati06@gmail.com",
          items: [
            {
              productId: "p3",
              name: "Monsoon Rain Therapeutic Mist",
              price: 1150,
              quantity: 1,
              image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600"
            },
            {
              productId: "p5",
              name: "Wild Lavender Nilgiri White Tea",
              price: 950,
              quantity: 1,
              image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=600"
            }
          ],
          totalAmount: 2100,
          shippingAddress: {
            fullName: "Shashank Nuthalapati",
            addressLine: "Flat No. 402, Signature Residency, Gachibowli",
            city: "Hyderabad",
            state: "Telangana",
            postalCode: "500032",
            phone: "+91 98765 43210"
          },
          paymentMethod: "Credit Card",
          status: "Processing",
          trackingNumber: "TRK-IN-90871142",
          createdAt: new Date(Date.now() - 36 * 3600_000).toISOString() // 36 hours ago
        }
      ]
    };
    this.save();
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (error) {
      console.error("Failed to write to database file:", error);
    }
  }

  // --- USER METHODS ---
  async getUsers() {
    return this.data.users.map(({ passwordHash, ...user }) => user);
  }

  async getUserByEmail(email: string) {
    const user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  async getUserById(id: string) {
    const user = this.data.users.find(u => u.id === id);
    if (!user) return null;
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(user: Omit<User, "id" | "createdAt"> & { passwordHash: string }) {
    const id = "u" + (this.data.users.length + 1);
    const newUser = {
      ...user,
      id,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.save();
    const { passwordHash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // --- PRODUCT METHODS ---
  async getProducts() {
    return this.data.products;
  }

  async getProductById(id: string) {
    let product = this.data.products.find(p => p.id === id);
    if (!product) {
      // Look up in SEED_PRODUCTS
      let seedProd = SEED_PRODUCTS.find(p => p.id === id);
      if (!seedProd) {
        if (id === "p3") {
          seedProd = SEED_PRODUCTS.find(p => p.name.includes("Monsoon Rain"));
        } else if (id === "p5") {
          seedProd = SEED_PRODUCTS.find(p => p.name.includes("Lavender"));
        } else if (id.match(/^p\d+$/)) {
          const index = parseInt(id.substring(1)) - 1;
          if (index >= 0 && index < SEED_PRODUCTS.length) {
            seedProd = SEED_PRODUCTS[index];
          }
        }
      }

      if (seedProd) {
        product = JSON.parse(JSON.stringify(seedProd));
        product!.id = id; // Preserve requested id
        this.data.products.push(product!);
        this.save();
      }
    }
    return product || null;
  }

  async createProduct(product: Omit<Product, "id" | "createdAt" | "rating" | "reviews">) {
    const id = "p" + (Math.max(...this.data.products.map(p => parseInt(p.id.replace("p", "")) || 0)) + 1);
    const newProduct: Product = {
      ...product,
      id,
      rating: 5.0,
      reviews: [],
      createdAt: new Date().toISOString()
    };
    this.data.products.unshift(newProduct); // prepending so new products appear at the top
    this.save();
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>) {
    let index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) {
      const product = await this.getProductById(id);
      if (product) {
        index = this.data.products.findIndex(p => p.id === id);
      } else {
        throw new Error("Product not found");
      }
    }

    this.data.products[index] = {
      ...this.data.products[index],
      ...updates
    };
    this.save();
    return this.data.products[index];
  }

  async deleteProduct(id: string) {
    let index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) {
      const product = await this.getProductById(id);
      if (product) {
        index = this.data.products.findIndex(p => p.id === id);
      } else {
        throw new Error("Product not found");
      }
    }

    this.data.products.splice(index, 1);
    
    if (!this.data.retiredProducts) {
      this.data.retiredProducts = [];
    }
    if (!this.data.retiredProducts.includes(id)) {
      this.data.retiredProducts.push(id);
    }

    this.save();
    return true;
  }

  async deleteAllProducts() {
    this.data.products = [];
    this.data.catalogWiped = true;
    this.data.retiredProducts = [];
    this.save();
    return true;
  }

  async restoreSeedProducts() {
    this.data.products = [...DEFAULT_PRODUCTS];
    this.data.catalogWiped = false;
    this.data.retiredProducts = [];
    this.save();
    return true;
  }

  async addReview(productId: string, review: Omit<Review, "id" | "createdAt">) {
    let product = this.data.products.find(p => p.id === productId);
    if (!product) {
      product = await this.getProductById(productId);
      if (!product) throw new Error("Product not found");
    }

    const newReview: Review = {
      ...review,
      id: "r" + (Math.random().toString(36).substr(2, 9)),
      createdAt: new Date().toISOString()
    };

    if (!product.reviews) product.reviews = [];
    product.reviews.push(newReview);

    // Recompute product rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = parseFloat((totalRating / product.reviews.length).toFixed(1));

    this.save();
    return product;
  }

  // --- ORDER METHODS ---
  async getOrders() {
    return this.data.orders;
  }

  async getOrdersByUserId(userId: string) {
    return this.data.orders.filter(o => o.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getOrderById(id: string) {
    return this.data.orders.find(o => o.id === id) || null;
  }

  async createOrder(order: Omit<Order, "id" | "createdAt" | "status" | "trackingNumber">) {
    const orderNumber = 1000 + this.data.orders.length + 1;
    const id = `order_${orderNumber}`;
    
    // Deduct stock levels for items
    for (const item of order.items) {
      const product = this.data.products.find(p => p.id === item.productId);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
      }
    }

    const newOrder: Order = {
      ...order,
      id,
      status: "Pending",
      trackingNumber: `TRK-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      createdAt: new Date().toISOString()
    };

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  async updateOrderStatus(id: string, status: Order["status"]) {
    const order = this.data.orders.find(o => o.id === id);
    if (!order) throw new Error("Order not found");

    order.status = status;
    this.save();
    return order;
  }

  async updateOrder(id: string, updates: Partial<Omit<Order, "id" | "createdAt" | "status" | "trackingNumber">>) {
    const index = this.data.orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error("Order not found");

    const existingOrder = this.data.orders[index];

    // If order items were changed, adjust product stocks
    if (updates.items) {
      // Put back old stock levels
      for (const item of existingOrder.items) {
        const product = this.data.products.find(p => p.id === item.productId);
        if (product) {
          product.stock += item.quantity;
        }
      }
      // Deduct new stock levels
      for (const item of updates.items) {
        const product = this.data.products.find(p => p.id === item.productId);
        if (product) {
          product.stock = Math.max(0, product.stock - item.quantity);
        }
      }
    }

    this.data.orders[index] = {
      ...existingOrder,
      ...updates
    } as Order;

    this.save();
    return this.data.orders[index];
  }

  async deleteOrder(id: string) {
    const index = this.data.orders.findIndex(o => o.id === id);
    if (index === -1) throw new Error("Order not found");

    const order = this.data.orders[index];
    // Revert product stock levels if order was not already cancelled
    if (order.status !== "Cancelled") {
      for (const item of order.items) {
        const product = this.data.products.find(p => p.id === item.productId);
        if (product) {
          product.stock += item.quantity;
        }
      }
    }

    this.data.orders.splice(index, 1);
    this.save();
    return true;
  }
}

export const db = new LocalDatabase();
