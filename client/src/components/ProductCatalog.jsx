import { getImageUrl } from "../api/catalogApi.js";

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
            <button
              className="product-art product-art-button"
              onClick={() => onViewProduct(product)}
              aria-label={`View details for ${product.name}`}
            >
              <img src={getImageUrl(product.imageUrl)} alt={product.name} />
            </button>

            <div className="product-card-body">
              <div className="product-meta">
                <span>
                  {product.inventory > 0
                    ? `${product.inventory} available`
                    : "Sold out"}
                </span>

                <strong>${product.price.toFixed(2)}</strong>
              </div>

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <div className="product-actions">
                <button
                  className="primary-button"
                  onClick={() => onAddToCart(product)}
                  disabled={product.inventory <= 0}
                >
                  {product.inventory > 0 ? "Add to Cart" : "Sold Out"}
                </button>

                <button
                  className="secondary-button"
                  onClick={() => onViewProduct(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}