const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Pirate's Dawn Dice Set",
    finish: "Liquid Core Resin",
    description:
      "A seven-piece blue-pink resin dice set with rose-gold flakes and a liquid core inside the d20.",
    price: 34.99,
    inventory: 5,
    imageUrl: "/shop/images/piratesdawn1.jpg",
  },
  {
    id: 2,
    name: "Ember Light Dice Set",
    finish: "Glitter Resin",
    description:
      "A seven-piece red-orange resin dice set with golden glitter and foil accents.",
    price: 34.99,
    inventory: 4,
    imageUrl: "/shop/images/emberlight2.jpg",
  },
  {
    id: 3,
    name: "Glacial Blue Dice Set",
    finish: "Threaded Resin",
    description:
      "A seven-piece blue-green and white resin dice set with subtle glitter and threading inside.",
    price: 34.99,
    inventory: 6,
    imageUrl: "/shop/images/glacialblue2.jpg",
  },
  {
    id: 4,
    name: "Gold Lagoon Dice Set",
    finish: "Foil Resin",
    description:
      "A seven-piece blue-green resin dice set with gold foil accents.",
    price: 34.99,
    inventory: 3,
    imageUrl: "/shop/images/goldlagoon1.jpg",
  },
];

let demoProducts = [...DEMO_PRODUCTS];

const isGitHubPages = window.location.hostname.includes("github.io");

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (isGitHubPages ? "" : "http://localhost:4000");

function wait(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts() {
  if (!API_BASE_URL) {
    await wait();
    return { products: demoProducts };
  }

  const response = await fetch(`${API_BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Unable to load products from the Node.js server.");
  }

  return response.json();
}

export async function submitPurchase(payload) {
  if (!API_BASE_URL) {
    await wait();

    const { customer, cartItems } = payload;

    if (!customer?.name || !customer?.email) {
      throw new Error("Name and email are required.");
    }

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Your cart is empty.");
    }

    demoProducts = demoProducts.map((product) => {
      const cartItem = cartItems.find((item) => item.productId === product.id);

      if (!cartItem) {
        return product;
      }

      return {
        ...product,
        inventory: Math.max(product.inventory - cartItem.quantity, 0),
      };
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      order: {
        id: Date.now(),
        customer,
        items: cartItems,
        total,
        status: "Demo order received",
        createdAt: new Date().toISOString(),
      },
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Purchase failed.");
  }

  return data;
}