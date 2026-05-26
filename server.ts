import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { db } from "./server/db";
import { UserRole } from "./src/types";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing and URL encoding middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Helper middleware for auth check
  const requireAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(411).json({ error: "Authentication required" });
    }
    const userId = authHeader.substring(7);
    const user = await db.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid session or user not found" });
    }
    (req as any).user = user;
    next();
  };

  const requireAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await requireAuth(req, res, () => {
      const user = (req as any).user;
      if (user.role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admin access list only" });
      }
      next();
    });
  };

  // --- API ROUTES ---

  // Auth: Log in
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const user = await db.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Account does not exist" });
      }

      // Simple password check (seeded plaintext helper for development database)
      if (user.passwordHash !== password) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      const { passwordHash, ...safeUser } = user;
      res.json({
        user: safeUser,
        token: safeUser.id // Expose ID as the secure token in dev environment
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Authentication failed" });
    }
  });

  // Auth: Register
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All profile fields are required" });
    }

    try {
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
      }

      const safeUser = await db.createUser({
        name,
        email,
        role: "user", // Defaults to standard buyer
        passwordHash: password
      });

      res.status(201).json({
        user: safeUser,
        token: safeUser.id
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Registration failed" });
    }
  });

  // Auth: Get current profile details using Bearer Header
  app.get("/api/auth/me", requireAuth, async (req, res) => {
    res.json({ user: (req as any).user });
  });

  // Products: List with optional filter
  app.get("/api/products", async (req, res) => {
    try {
      const products = await db.getProducts();
      const { category } = req.query;
      if (category && typeof category === "string" && category !== "All") {
        const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        return res.json(filtered);
      }
      res.json(products);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to retrieve products" });
    }
  });

  // Products: Fetch single
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await db.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Error reading product details" });
    }
  });

  // Products: POST (Create - Admin only)
  app.post("/api/products", requireAdmin, async (req, res) => {
    const { name, description, details, price, image, category, stock } = req.body;
    if (!name || !description || price === undefined || !image || !category || stock === undefined) {
      return res.status(400).json({ error: "Missing required product fields" });
    }

    try {
      const newProduct = await db.createProduct({
        name,
        description,
        details: details || "",
        price: Number(price),
        image,
        category,
        stock: Number(stock)
      });
      res.status(201).json(newProduct);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to create product" });
    }
  });

  // Products: PUT (Update - Admin only)
  app.put("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const updated = await db.updateProduct(req.params.id, req.body);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update product" });
    }
  });

  // Products: DELETE (Admin only)
  app.delete("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      await db.deleteProduct(req.params.id);
      res.json({ success: true, message: "Product successfully deleted" });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete product" });
    }
  });

  // Products: DELETE ALL (Admin only)
  app.delete("/api/products", requireAdmin, async (req, res) => {
    try {
      await db.deleteAllProducts();
      res.json({ success: true, message: "All products successfully deleted" });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to delete all products" });
    }
  });

  // Products: RESTORE ALL (Admin only)
  app.post("/api/products/restore", requireAdmin, async (req, res) => {
    try {
      await db.restoreSeedProducts();
      res.json({ success: true, message: "Seed products successfully restored" });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to restore products" });
    }
  });

  // Products: Guest review submission
  app.post("/api/products/:id/review", requireAuth, async (req, res) => {
    const { rating, comment } = req.body;
    const user = (req as any).user;

    if (rating === undefined || !comment) {
      return res.status(400).json({ error: "Rating and comment are mandatory" });
    }

    try {
      const updatedProduct = await db.addReview(req.params.id, {
        userId: user.id,
        userName: user.name,
        rating: Number(rating),
        comment
      });
      res.status(201).json(updatedProduct);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to post review" });
    }
  });

  // Orders: List (Admin sees all, Standard sees their own)
  app.get("/api/orders", requireAuth, async (req, res) => {
    const user = (req as any).user;
    try {
      if (user.role === "admin") {
        const allOrders = await db.getOrders();
        res.json(allOrders);
      } else {
        const userOrders = await db.getOrdersByUserId(user.id);
        res.json(userOrders);
      }
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to query orders" });
    }
  });

  // Orders: Create new order
  app.post("/api/orders", requireAuth, async (req, res) => {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    const user = (req as any).user;

    if (!items || !items.length || totalAmount === undefined || !shippingAddress || !paymentMethod) {
      return res.status(400).json({ error: "Missing checkout parameters" });
    }

    try {
      const order = await db.createOrder({
        userId: user.id,
        userEmail: user.email,
        items,
        totalAmount: Number(totalAmount),
        shippingAddress,
        paymentMethod
      });
      res.status(201).json(order);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Order placement failed" });
    }
  });

  // Orders: Update status (Admin only)
  app.put("/api/orders/:id/status", requireAdmin, async (req, res) => {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status flag is required" });
    }

    try {
      const updated = await db.updateOrderStatus(req.params.id, status);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update order status" });
    }
  });

  // Orders: Update order (User can update their own pending/processing orders, Admin can update any order)
  app.put("/api/orders/:id", requireAuth, async (req, res) => {
    const user = (req as any).user;
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    try {
      const order = await db.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Check ownership
      if (user.role !== "admin" && order.userId !== user.id) {
        return res.status(403).json({ error: "Forbidden: You can only edit your own orders" });
      }

      // Check status allows edit
      if (user.role !== "admin" && order.status !== "Pending" && order.status !== "Processing") {
        return res.status(400).json({ error: "Cannot edit an order that has already been shipped or delivered" });
      }

      const updated = await db.updateOrder(req.params.id, {
        ...(items && { items }),
        ...(totalAmount !== undefined && { totalAmount: Number(totalAmount) }),
        ...(shippingAddress && { shippingAddress }),
        ...(paymentMethod && { paymentMethod }),
      });

      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to update order" });
    }
  });

  // Orders: Cancel/Delete order (User can delete/cancel their own pending/processing orders, Admin can delete any order)
  app.delete("/api/orders/:id", requireAuth, async (req, res) => {
    const user = (req as any).user;

    try {
      const order = await db.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Check ownership
      if (user.role !== "admin" && order.userId !== user.id) {
        return res.status(403).json({ error: "Forbidden: You can only cancel your own orders" });
      }

      // Check status allows delete
      if (user.role !== "admin" && order.status !== "Pending" && order.status !== "Processing") {
        return res.status(400).json({ error: "Cannot cancel an order that has already been shipped or delivered" });
      }

      await db.deleteOrder(req.params.id);
      res.json({ success: true, message: "Order cancelled and deleted successfully" });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to cancel order" });
    }
  });

  // --- VITE WEB APP MIDDLEWARE HANDLER ---

  if (process.env.NODE_ENV !== "production") {
    // Development server mapping with Vite MW
    console.log("Starting platform Dev Server with Vite...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static delivery mapping
    console.log("Starting production build deployment delivery...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-Commerce Server running and listening at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical server startup crash:", err);
});
