export default function Cart({ cartItems, onIncrement, onDecrement, onRemove }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="panel">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Dice</p>
          <h2>Shopping Cart</h2>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty. Add products from the catalog.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-row" key={item.productId}>
              <div>
                <strong>{item.name}</strong>
                <p>${item.price.toFixed(2)} each</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => onDecrement(item.productId)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrement(item.productId)}>+</button>
              </div>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              <button className="link-button" onClick={() => onRemove(item.productId)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total">
        <span>Subtotal</span>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
    </section>
  );
}
