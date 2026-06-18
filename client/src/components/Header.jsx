export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <button className="cart-pill" onClick={onCartClick}>
        Cart Items: {cartCount}
      </button>

      <div className="hero-content">
        <div className="hero-logo-wrap">
          <img
            className="hero-logo"
            src="/images/sblogo.png"
            alt="ShadowBlade Dice Shop logo"
          />
        </div>

        <div className="hero-copy">
          <div className="brand-copy">
            <span className="logo-text">ShadowBlade Dice Shop</span>
            <p className="brand-subtitle">Handmade Resin Dice</p>
          </div>

          <h1>Handmade Dice Sets for Every Adventurer</h1>

          <p>
            Shop from our wide selection of high-quality dice sets, perfect for
            tabletop gaming. Whether you're a seasoned adventurer or just
            starting your journey, let us be a part of your story!
          </p>
        </div>
      </div>
    </header>
  );
}