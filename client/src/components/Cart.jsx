export default function Cart({ cartItems, onIncrement, onDecrement, onRemove }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="panel">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Order Summary</p>
          <h2>Your Cart</h2>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-message">
          Your cart is empty. Choose a dice set to begin your order.
        </p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.productId}>
              <div className="cart-item-main">
                <strong>{item.name}</strong>
                <p>${item.price.toFixed(2)} each</p>
              </div>

              <div className="cart-controls">
                <button
                  type="button"
                  onClick={() => onDecrement(item.productId)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() => onIncrement(item.productId)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>

              <div className="cart-item-footer">
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>

                <button
                  type="button"
                  className="link-button"
                  onClick={() => onRemove(item.productId)}
                >
                  Remove
                </button>
              </div>
            </article>
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