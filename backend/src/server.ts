import express, { Request, Response } from "express";

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running!");
});

// quick health route for testing connectivity
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// ping route as requested
app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});

// Mock data for development (replace with database later)
const mockProducts = [
  { id: 1, name: "LED Light Strip", price: 25.99, category: "Lighting", vendor: "TechSupply Co", rating: 4.5 },
  { id: 2, name: "Smart Switch", price: 15.99, category: "Electronics", vendor: "SmartHome Inc", rating: 4.2 },
  { id: 3, name: "USB-C Cable", price: 12.99, category: "Cables", vendor: "CablePro", rating: 4.8 },
  { id: 4, name: "Power Drill", price: 89.99, category: "Tools", vendor: "ToolMaster", rating: 4.6 },
  { id: 5, name: "Screwdriver Set", price: 29.99, category: "Tools", vendor: "ToolMaster", rating: 4.3 }
];

const mockProjects = [
  { id: 1, name: "Kitchen Renovation", description: "Complete kitchen makeover", items: [1, 2], createdAt: "2024-10-15" },
  { id: 2, name: "Home Office Setup", description: "Setting up a productive workspace", items: [2, 3], createdAt: "2024-10-20" }
];

let mockCart = [
  { productId: 1, quantity: 2 },
  { productId: 3, quantity: 1 }
];

// CORE ENDPOINTS

// 1. SEARCH ENDPOINT
app.get("/api/search", (req: Request, res: Response) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;
    
    let results = [...mockProducts];
    
    // Filter by search query
    if (q) {
      const query = (q as string).toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.vendor.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (category) {
      results = results.filter(product => 
        product.category.toLowerCase() === (category as string).toLowerCase()
      );
    }
    
    // Filter by price range
    if (minPrice) {
      results = results.filter(product => product.price >= parseFloat(minPrice as string));
    }
    if (maxPrice) {
      results = results.filter(product => product.price <= parseFloat(maxPrice as string));
    }
    
    res.json({
      results,
      total: results.length,
      query: { q, category, minPrice, maxPrice }
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

// 2. COMPARE ENDPOINT
app.post("/api/compare", (req: Request, res: Response) => {
  try {
    const { productIds } = req.body;
    
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ error: "Product IDs array is required" });
    }
    
    const products = mockProducts.filter(product => 
      productIds.includes(product.id)
    );
    
    if (products.length === 0) {
      return res.status(404).json({ error: "No products found for comparison" });
    }
    
    // Calculate comparison metrics
    const comparison = {
      products,
      metrics: {
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price))
        },
        avgRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1),
        categories: [...new Set(products.map(p => p.category))],
        vendors: [...new Set(products.map(p => p.vendor))]
      }
    };
    
    res.json(comparison);
  } catch (error) {
    console.error("Compare error:", error);
    res.status(500).json({ error: "Comparison failed" });
  }
});

// 3. CART ENDPOINTS
app.get("/api/cart", (req: Request, res: Response) => {
  try {
    const cartWithDetails = mockCart.map(cartItem => {
      const product = mockProducts.find(p => p.id === cartItem.productId);
      return {
        ...cartItem,
        product,
        subtotal: product ? (product.price * cartItem.quantity) : 0
      };
    });
    
    const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);
    
    res.json({
      items: cartWithDetails,
      total: parseFloat(total.toFixed(2)),
      itemCount: mockCart.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ error: "Failed to get cart" });
  }
});

app.post("/api/cart", (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Valid productId and quantity required" });
    }
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    const existingItemIndex = mockCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      mockCart[existingItemIndex].quantity += quantity;
    } else {
      mockCart.push({ productId, quantity });
    }
    
    res.json({ message: "Item added to cart", productId, quantity });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.put("/api/cart/:productId", (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;
    
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity must be greater than 0" });
    }
    
    const itemIndex = mockCart.findIndex(item => item.productId === productId);
    
    if (itemIndex >= 0) {
      mockCart[itemIndex].quantity = quantity;
      res.json({ message: "Cart item updated", productId, quantity });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

app.delete("/api/cart/:productId", (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.productId);
    
    const itemIndex = mockCart.findIndex(item => item.productId === productId);
    
    if (itemIndex >= 0) {
      mockCart.splice(itemIndex, 1);
      res.json({ message: "Item removed from cart", productId });
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// 4. PROJECTS ENDPOINTS
app.get("/api/projects", (req: Request, res: Response) => {
  try {
    const projectsWithDetails = mockProjects.map(project => ({
      ...project,
      itemCount: project.items.length,
      products: project.items.map(itemId => mockProducts.find(p => p.id === itemId)).filter(Boolean)
    }));
    
    res.json({
      projects: projectsWithDetails,
      total: mockProjects.length
    });
  } catch (error) {
    console.error("Projects error:", error);
    res.status(500).json({ error: "Failed to get projects" });
  }
});

app.get("/api/projects/:id", (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = mockProjects.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    const projectWithDetails = {
      ...project,
      products: project.items.map(itemId => mockProducts.find(p => p.id === itemId)).filter(Boolean),
      totalCost: project.items.reduce((sum, itemId) => {
        const product = mockProducts.find(p => p.id === itemId);
        return sum + (product?.price || 0);
      }, 0)
    };
    
    res.json(projectWithDetails);
  } catch (error) {
    console.error("Project detail error:", error);
    res.status(500).json({ error: "Failed to get project" });
  }
});

app.post("/api/projects", (req: Request, res: Response) => {
  try {
    const { name, description, items = [] } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Project name is required" });
    }
    
    const newProject = {
      id: mockProjects.length + 1,
      name,
      description: description || "",
      items,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    mockProjects.push(newProject);
    
    res.status(201).json({
      message: "Project created successfully",
      project: newProject
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

app.put("/api/projects/:id", (req: Request, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const { name, description, items } = req.body;
    
    const projectIndex = mockProjects.findIndex(p => p.id === projectId);
    
    if (projectIndex < 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    if (name !== undefined) mockProjects[projectIndex].name = name;
    if (description !== undefined) mockProjects[projectIndex].description = description;
    if (items !== undefined) mockProjects[projectIndex].items = items;
    
    res.json({
      message: "Project updated successfully",
      project: mockProjects[projectIndex]
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

export default app;
