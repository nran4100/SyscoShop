import React from 'react';
import CategoryCard from './CategoryCard';

export default function CategoryList({ categories }) {
  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
