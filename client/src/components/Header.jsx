export default function Header({ cartCount, onCartClick }) {
  const logoUrl = `${import.meta.env.BASE_URL}images/sblogo.png`;

  return (
    <header className="site-header">
      <button className="cart-pill" onClick={onCartClick}>
        Cart Items: {cartCount}
      </button>

      <div className="hero-content">
        <div className="hero-logo-wrap">
          <img
            className="hero-logo"
            src={logoUrl}
            alt="ShadowBlade Dice logo"
          />
        </div>

        <div className="hero-copy">
          <h1 className="brand-title">ShadowBlade Dice</h1>

          <h2 className="hero-tagline">
            Handmade Dice Sets for Every Adventurer
          </h2>

          <p>
            Shop a curated collection of high-quality dice sets for tabletop
            players, collectors, and adventurers looking for their next favorite
            roll.
          </p>
        </div>
      </div>
    </header>
  );
}