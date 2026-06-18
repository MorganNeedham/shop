export default function ProductCatalog({ products, onAddToCart }) {
  return (
    <section className="panel">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Catalog Component</p>
          <h2>Products</h2>
        </div>
        <span className="badge">Loaded from Express API</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <div className="product-card-body">
              <div className="product-meta">
                <span>{product.category}</span>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="inventory">Inventory: {product.inventory}</p>
              <button
                className="primary-button"
                onClick={() => onAddToCart(product)}
                disabled={product.inventory <= 0}
              >
                {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
