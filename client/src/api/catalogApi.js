const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error('Unable to load products from the Node.js server.');
  }

  return response.json();
}

export async function submitPurchase(payload) {
  const response = await fetch(`${API_BASE_URL}/api/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Purchase failed.');
  }

  return data;
}
