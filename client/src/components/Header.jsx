export default function Header({ cartCount }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">ShadowBlade Dice Shop</p>
        <h1>Dice for your tabletop adventures</h1>
        <p className="header-copy">
          Browse our selection of high-quality dice for all your gaming needs.
        </p>
      </div>
      <div className="cart-pill">Cart Items: {cartCount}</div>
    </header>
  );
}
