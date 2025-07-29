import React from 'react';
import { formatPrice } from '../utils/formatPrice';

export default function CartItem({ item, onRemove }) {
  const placeholderImage =
    'https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws=';

  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <strong>{item.productName || 'Unknown Product'}</strong>
        <img
          src={item.imageUrl || placeholderImage}
          alt={item.productName || 'Product'}
          className="cart-item-image"
        />
      </div>

      <div className="cart-item-details">
        <p>Quantity: {item.quantity}</p>
        <p>Price: {formatPrice(item.price || 0)}</p>
        <p>Subtotal: {formatPrice((item.price || 0) * item.quantity)}</p>
      </div>

      <div className="cart-item-actions">
        <button onClick={() => onRemove(item.productId)}>Remove</button>
      </div>
    </div>
  );
}
