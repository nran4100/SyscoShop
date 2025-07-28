import React, { useEffect, useState } from 'react';
import CartList from '../components/CartList';
import { getCart, removeCartItem, addCartItem } from '../services/cartService';
import { formatPrice } from '../utils/formatPrice';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCartItems(data.items || []);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      fetchCart();
    } catch (err) {
      console.error('Remove failed', err);
    }
  };

  const handleIncrease = async (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;

    try {
      await addCartItem({ productId, quantity: item.quantity + 1 });
      fetchCart();
    } catch (err) {
      console.error('Add failed', err);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <CartList items={cartItems} onRemove={handleRemove} onIncrease={handleIncrease} loading={loading} />
      <h3>Total: {formatPrice(total)}</h3>
    </div>
  );
}
