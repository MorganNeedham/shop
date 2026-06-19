import { useState } from "react";
import { getImageUrl } from "../api/catalogApi.js";

export default function ProductDetail({ product, onClose, onAddToCart }) {
  const images = product.images?.length ? product.images : [product.imageUrl];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="product-detail panel">
      <button className="close-button" onClick={onClose}>
        Back to Catalog
      </button>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <button
            className="product-main-image-button"
            onClick={() => setIsExpanded(true)}
            aria-label={`Expand image of ${product.name}`}
          >
            <img
              className="product-main-image"
              src={getImageUrl(selectedImage)}
              alt={product.name}
            />
          </button>

          <div className="thumbnail-row">
            {images.map((image) => (
              <button
                key={image}
                className={
                  image === selectedImage
                    ? "thumbnail-button active-thumbnail"
                    : "thumbnail-button"
                }
                onClick={() => setSelectedImage(image)}
                aria-label={`View another photo of ${product.name}`}
              >
                <img src={getImageUrl(image)} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-copy">
          <p className="eyebrow">Dice Set</p>

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <div className="product-detail-meta">
            <span>
              {product.inventory > 0
                ? `${product.inventory} available`
                : "Sold out"}
            </span>

            <strong>${product.price.toFixed(2)}</strong>
          </div>

          <button
            className="primary-button"
            onClick={() => onAddToCart(product)}
            disabled={product.inventory <= 0}
          >
            {product.inventory > 0 ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="lightbox" onClick={() => setIsExpanded(false)}>
          <button className="lightbox-close" onClick={() => setIsExpanded(false)}>
            Close
          </button>

          <img
            src={getImageUrl(selectedImage)}
            alt={product.name}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}