export default function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) {
    return null;
  }

  const orderNumber = order.id ?? order.orderId ?? "Demo Order";
  const total = Number(order.total ?? 0);

  return (
    <section className="thank-you-panel panel">
      <p className="eyebrow">Order Received</p>

      <h2>Thank you for exploring ShadowBlade Dice Shop.</h2>

      <p>
        Your demo order has been received. No payment has been processed — this
        checkout is part of Morgan’s software development portfolio.
      </p>

      <p>
        ShadowBlade Dice Shop is currently a full-stack practice project built
        with React, Express, and custom styling. One day, it may grow into
        something real. For now, thank you for supporting the journey.
      </p>

      <div className="order-summary-box">
        <span>Demo Order</span>
        <strong>#{orderNumber}</strong>
      </div>

      <div className="order-summary-box">
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <button className="primary-button" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </section>
  );
}