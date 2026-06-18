export default function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="header-topline">
        <div className="brand">
          <div className="logo-frame">
            <img
              className="header-logo"
              src="/images/sblogo.png"
              alt="ShadowBlade Dice Shop logo"
            />
          </div>

          <div className="brand-copy">
            <span className="logo-text">ShadowBlade Dice Shop</span>
            <p className="brand-subtitle">Handmade resin dice</p>
          </div>
        </div>

        <span className="cart-pill">Cart Items: {cartCount}</span>
      </div>

      <h1>Handmade Dice Sets for Every Adventurer</h1>

      <p>
        Shop from our wide selection of high-quality dice sets, perfect for
        tabletop gaming. Whether you're a seasoned adventurer or just starting
        your journey, let us be a part of your story!
      </p>
    </header>
  );
}