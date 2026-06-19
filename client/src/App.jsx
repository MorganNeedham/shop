import React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchProducts, submitPurchase } from './api/catalogApi.js';
import Header from './components/Header.jsx';
import ProductCatalog from './components/ProductCatalog.jsx';
import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const checkoutRef = useRef(null);

  function scrollToCheckout() {
    checkoutRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError('');
      const data = await fetchProducts();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  function addToCart(product) {
    setOrder(null);
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === product.id);

      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ];
    });
  }

  function increment(productId) {
    setCartItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrement(productId) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function remove(productId) {
    setCartItems((current) =>
      current.filter((item) => item.productId !== productId)
    );
  }

  async function handleSubmitPurchase(customer) {
    try {
      setIsSubmitting(true);
      setError('');
      const data = await submitPurchase({ customer, cartItems });
      setOrder(data.order);
      setCartItems([]);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <Header cartCount={cartCount} onCartClick={scrollToCheckout} />

      {error && <div className="error-banner">{error}</div>}

      {isLoading ? (
        <section className="panel">
          <p>Loading dice sets...</p>
        </section>
      ) : order ? (
        <OrderConfirmation
          order={order}
          onContinueShopping={() => setOrder(null)}
        />
      ) : (
        <main className="layout-grid">
          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onAddToCart={addToCart}
            />
          ) : (
            <ProductCatalog
              products={products}
              onAddToCart={addToCart}
              onViewProduct={setSelectedProduct}
            />
          )}

          <aside className="sidebar" ref={checkoutRef}>
            <Cart
              cartItems={cartItems}
              onIncrement={increment}
              onDecrement={decrement}
              onRemove={remove}
            />

            <CheckoutForm
              cartItems={cartItems}
              onSubmitPurchase={handleSubmitPurchase}
              isSubmitting={isSubmitting}
            />
          </aside>
        </main>
      )}
    </div>
  );
}