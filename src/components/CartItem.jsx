import React from 'react';
import { formatPrice } from '../utils/formatPrice';

export default function CartItem({ item, onRemove, onIncrease }) {
  return (
    <div className="cart-item">
      <div>
        <strong>{item.productName || 'Unknown Product'}</strong>
        <p>Quantity: {item.quantity}</p>
        <p>Price: {formatPrice(item.price || 0)}</p>
        <p>Subtotal: {formatPrice((item.price || 0) * item.quantity)}</p>
      </div>
      <div>
        {/* <button onClick={() => onIncrease(item.productId)}>+</button> */}
        <button onClick={() => onRemove(item.productId)}>Remove</button>
      </div>
    </div>
  );
}
