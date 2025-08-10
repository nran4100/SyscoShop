import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { formatPrice } from '../utils/formatPrice';
import { addToCart } from '../services/cartService';
import Loader from '../components/Loader';
import { isTokenValid } from '../utils/authUtils'; // Import this
import '../styles/productDetailPage.css'; // Import your CSS

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState('1');  // Use string for better control
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((err) => {
        console.error('Failed to load product', err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(token && isTokenValid(token));
  }, []);

  const handleQuantityChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity('');
      setError('');
      return;
    }

    const parsed = parseInt(value, 10);

    if (!isNaN(parsed) && parsed >= 1) {
      if (parsed > product.stockCount) {
        setError(`Only ${product.stockCount} in stock`);
      } else {
        setError('');
      }
      setQuantity(value);
    }
  };

  const handleBlur = () => {
    if (quantity === '') {
      setQuantity('1');
      setError('');
    }
  };

  const handleAddToCart = async () => {
    const parsed = parseInt(quantity, 10);

    if (isNaN(parsed) || parsed < 1) {
      setError('Enter a valid quantity');
      return;
    }

    if (parsed > product.stockCount) {
      setError(`Cannot add more than ${product.stockCount}`);
      return;
    }

    try {
      await addToCart(product.id, parsed);
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

        {/* Show Quantity & Add to Cart only to authenticated users */}
        {isAuthenticated ? (
          <>
            <div className="quantity-input">
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  onBlur={handleBlur}
                />
              </label>
              {error && <p className="error-msg">{error}</p>}
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </>
        ) : (
          <p className="login-warning">Please login to add to cart</p>
        )}
      </div>
    </div>
  );
}
