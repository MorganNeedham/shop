export default function ProductCatalog({ products, onAddToCart, onViewProduct }) {
  return (
    <section className="panel">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Handmade Resin Dice</p>
          <h2>Featured Dice Sets</h2>
        </div>

        <span className="badge">Limited Inventory</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-art">
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-card-body">
              <div className="product-meta">
                <span>{product.finish}</span>
                <strong>${product.price.toFixed(2)}</strong>
              </div>

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p className="inventory">
                {product.inventory > 0
                  ? `${product.inventory} available`
                  : "Sold out"}
              </p>

              <div className="product-actions">
                <button
                  className="primary-button"
                  onClick={() => onAddToCart(product)}
                  disabled={product.inventory <= 0}
                >
                  {product.inventory > 0 ? "Add to Cart" : "Sold Out"}
                </button>

                {onViewProduct && (
                  <button
                    className="secondary-button"
                    onClick={() => onViewProduct(product)}
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}