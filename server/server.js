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
    name: "Shadowglass D20 Set",
    category: "Resin Dice",
    description:
      "A sharp-edge seven-piece dice set with black resin, teal shimmer, and violet inked numbers.",
    price: 34.99,
    inventory: 8,
  },
  {
    id: 2,
    name: "Eclipse Metal Dice",
    category: "Metal Dice",
    description:
      "Heavy black nickel dice with cyan numbering and a deep purple enamel finish.",
    price: 59.99,
    inventory: 5,
  },
  {
    id: 3,
    name: "Arcane Storm Dice Set",
    category: "Resin Dice",
    description:
      "Swirling teal, indigo, and midnight-black dice made for dramatic table rolls.",
    price: 29.99,
    inventory: 12,
  },
  {
    id: 4,
    name: "Void Amethyst Dice",
    category: "Gemstone Dice",
    description:
      "A premium gemstone-style dice set with smoky purple tones and polished arcane edges.",
    price: 74.99,
    inventory: 3,
  },
  {
    id: 5,
    name: "ShadowBlade Dice Tray",
    category: "Dice Accessories",
    description:
      "A foldable black dice tray with teal stitching and a soft rolling surface.",
    price: 24.99,
    inventory: 10,
  },
  {
    id: 6,
    name: "Cursed Critical D20",
    category: "Single Die",
    description:
      "An oversized display d20 with cyan cracks, purple glow effects, and ominous table presence.",
    price: 18.99,
    inventory: 7,
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