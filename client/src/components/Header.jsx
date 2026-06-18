export default function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="header-topline">
        <span className="logo-text">ShadowBlade Dice Shop</span>
        <span className="cart-pill">Cart Items: {cartCount}</span>
      </div>

      <h1>Sharp-edge dice for dangerous rolls</h1>

      <p>
        Shop black, teal, and violet dice sets built for rogues, spellcasters,
        dungeon delvers, and dramatic natural twenties.
      </p>
    </header>
  );
}