import { useState } from 'react';

export default function CheckoutForm({ cartItems, onSubmitPurchase, isSubmitting }) {
  const [customer, setCustomer] = useState({
    name: 'Student User',
    email: 'student@example.com'
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitPurchase(customer);
  }

  return (
    <section className="panel">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">React Submit → Express Fulfillment</p>
          <h2>Checkout</h2>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Customer Name
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Customer Email
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </label>

        <button className="purchase-button" disabled={cartItems.length === 0 || isSubmitting}>
          {isSubmitting ? 'Submitting Purchase...' : 'Submit Purchase'}
        </button>
      </form>
    </section>
  );
}
