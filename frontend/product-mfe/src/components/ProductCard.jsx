import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { addToCart } from '../services/cartService';
import { isTokenValid } from '../utils/authUtils';  // Import utility
import '../styles/ProductCard.css'; // Import the CSS file

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(token && isTokenValid(token));
  }, []);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleQuantityChange = (e) => {
    e.stopPropagation();
    const value = e.target.value;

    if (value === '') {
      setQuantity('');
      setError('');
      return;
    }

    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      if (parsedValue > product.stockCount) {
        setError(`Only ${product.stockCount} in stock`);
      } else {
        setError('');
      }
      setQuantity(value);
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === '') {
      setQuantity('1');
      setError('');
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const parsedValue = parseInt(quantity, 10);

    if (isNaN(parsedValue) || parsedValue < 1) {
      setError('Enter a valid quantity');
      return;
    }

    if (parsedValue > product.stockCount) {
      setError(`Cannot add more than ${product.stockCount}`);
      return;
    }

    try {
      await addToCart(product.id, parsedValue);
      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err.message);
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img
        src={
          product.imageUrl ||
          'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws='
        }
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>Price: {formatPrice(product.price)}</p>
      <p className="stock-info">
        Stock: {product.stockCount} {product.unit}
      </p>

      {isAuthenticated && (
        <div className="qty-container">
          <label>
            Qty:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              onClick={(e) => e.stopPropagation()}
            />
          </label>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ProductCard;
