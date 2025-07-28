import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { addToCart } from '../services/cartService';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent navigation
    try {
      await addToCart(product.id, quantity);
      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart failed:', err.message);
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="product-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={product.imageUrl || 'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws='}
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>Price: {formatPrice(product.price)}</p>
      <div>
        <label>
          Qty:
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            style={{ width: '60px', marginLeft: '5px' }}
            onClick={(e) => e.stopPropagation()} // Prevent card click
          />
        </label>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};


export default ProductCard;
