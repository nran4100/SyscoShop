import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import { addToCart } from '../services/cartService';
import Loader from '../components/Loader';
import '../styles/productDetailPage.css'; // Import new CSS

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => {
        console.error('Failed to load product', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Failed to add to cart:', err.message);
      alert('Failed to add to cart');
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className="product-not-found">Product not found</div>;

  const { name, imageUrl, price, stockCount, unit, extraFields = {} } = product;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <h2 className="product-name">{name}</h2>
        <img
          className="product-detail-image"
          src={imageUrl || 'https://via.placeholder.com/200'}
          alt={name}
        />
        <p className="product-price"><strong>Price:</strong> {formatPrice(price)}</p>
        <p className="product-stock">
          <strong>Available:</strong> {stockCount} {unit}
        </p>

        {/* Extra Fields */}
        {Object.keys(extraFields).length > 0 && (
          <div className="extra-fields">
            <h4>Additional Details:</h4>
            <ul>
              {Object.entries(extraFields).map(([key, value]) =>
                key.toLowerCase() !== 'name' ? (
                  <li key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </li>
                ) : null
              )}
            </ul>
          </div>
        )}

        <div className="quantity-input">
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </label>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
