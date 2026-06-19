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
    name: "Pirate's Dawn Dice Set",
    finish: "Resin",
    description:
      "A seven-piece blue-pink resin dice set with rose-gold flakes and a liquid core inside the d20.",
    price: 34.99,
    inventory: 4,
    imageUrl: "shop/images/piratesdawn1.jpg",
  },
  {
    id: 2,
    name: "Ember Light Dice Set",
    finish: "Resin",
    description:
      "A seven-piece red-orange resin dice set with golden glitter and foil accents.",
    price: 34.99,
    inventory: 4,
    imageUrl: "shop/images/emberlight2.jpg",
  },
  {
    id: 3,
    name: "Glacial Blue Dice Set",
    finish: "Resin",
    description:
      "A seven-piece blue-green and white resin dice set with subtle glitter and threading inside.",
    price: 34.99,
    inventory: 4,
    imageUrl: "shop/images/glacialblue2.jpg",
  },
  {
    id: 4,
    name: "Gold Lagoon Dice Set",
    finish: "Resin",
    description:
      "A seven-piece blue-green resin dice set with gold foil accents.",
    price: 34.99,
    inventory: 7,
    imageUrl: "shop/images/goldlagoon1.jpg",
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
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

