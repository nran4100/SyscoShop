import React from 'react';
import Loader from './Loader';
import CartItem from './CartItem';

export default function CartList({ items, onRemove, onIncrease, loading }) {
  if (loading) return <Loader />;

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-list">
      {items.map(item => (
        <CartItem key={item.productId} item={item} onRemove={onRemove} onIncrease={onIncrease} />
      ))}
    </div>
  );
}
