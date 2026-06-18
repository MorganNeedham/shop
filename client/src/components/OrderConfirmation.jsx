export default function OrderConfirmation({ order }) {
  if (!order) {
    return null;
  }

  return (
    <section className="panel success-panel">
      <p className="eyebrow">Fulfilled by Node.js Express</p>
      <h2>Order Confirmation</h2>
      <p>{order.fulfillmentMessage}</p>

      <div className="confirmation-grid">
        <div>
          <span>Order ID</span>
          <strong>{order.orderId}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{order.status}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>${order.total.toFixed(2)}</strong>
        </div>
      </div>

      <h3>Fulfilled Items</h3>
      <ul className="fulfilled-list">
        {order.lineItems.map((item) => (
          <li key={item.productId}>
            {item.quantity} × {item.name} — ${item.lineTotal.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  );
}
