import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?categoryId=${category.id}`);
  };

  return (
    <div className="category-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={category.imageUrl || 'https://via.placeholder.com/100'}
        alt={category.name}
        className="category-image"
      />
      <h3>{category.id}</h3>
      <h3>{category.name}</h3>
    </div>
  );
}
