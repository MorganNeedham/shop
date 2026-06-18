import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

let products = [
  {
    id: 1,
    name: "Shadowblade Dagger",
    category: "Weapons",
    description: "A sleek dagger favored by rogues and night-stalkers.",
    price: 79.99,
    inventory: 8,
  },
  {
    id: 2,
    name: "Moonlit Cloak",
    category: "Armor",
    description: "A dark cloak with subtle silver threading.",
    price: 124.99,
    inventory: 5,
  },
  {
    id: 3,
    name: "Potion of Quickstep",
    category: "Potions",
    description: "A shimmering potion said to quicken the drinker's stride.",
    price: 24.99,
    inventory: 12,
  },
  {
    id: 4,
    name: "Enchanted Lockpick Set",
    category: "Tools",
    description: "A precise set of tools for delicate work.",
    price: 49.99,
    inventory: 6,
  },
];

app.get("/api/products", (req, res) => {
  res.json({ products });
});

app.post("/api/purchase", (req, res) => {
  const { customer, cartItems } = req.body;

  if (!customer || !customer.name || !customer.email) {
    return res.status(400).json({
      message: "Customer name and email are required.",
    });
  }

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({
      message: "Cart items are required.",
    });
  }

  for (const item of cartItems) {
    const product = products.find((product) => product.id === item.productId);

    if (!product) {
      return res.status(404).json({
        message: `Product not found: ${item.name}`,
      });
    }

    if (product.inventory < item.quantity) {
      return res.status(400).json({
        message: `Not enough inventory for ${product.name}.`,
      });
    }
  }

  products = products.map((product) => {
    const cartItem = cartItems.find((item) => item.productId === product.id);

    if (!cartItem) {
      return product;
    }

    return {
      ...product,
      inventory: product.inventory - cartItem.quantity,
    };
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  res.status(201).json({
    order: {
      id: Date.now(),
      customer,
      items: cartItems,
      total,
      createdAt: new Date().toISOString(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});