export default function Header({ cartCount }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Vite + React Client</p>
        <h1>Product Catalog Demo</h1>
        <p className="header-copy">
          Products come from the Node.js Express server. The React client handles the catalog, cart, and purchase form.
        </p>
      </div>
      <div className="cart-pill">Cart Items: {cartCount}</div>
    </header>
  );
}
