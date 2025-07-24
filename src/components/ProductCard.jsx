import React from 'react';
import { formatPrice } from '../utils/formatPrice';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>Price: {formatPrice(product.price)}</p>
    <p>Stock: {product.stockCount}</p>
  </div>
);

export default ProductCard;
