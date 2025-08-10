import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';
import '../styles/filterSidebar.css';  // Add this for custom styles

export default function FilterSidebar({
  initialFilters,
  applyFilters,
  clearFilters,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localFilters, setLocalFilters] = useState({ ...initialFilters });

  useEffect(() => {
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((err) => console.error('Failed to load categories', err))
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    applyFilters(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({});
    clearFilters();
  };

  return (
    <div className="filter-sidebar">
      <h3 className="filter-title">Filter Products</h3> 

      <div className="filter-group">
        <label htmlFor="name">Search Name</label>
        <input
          id="name"
          type="text"
          value={localFilters.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={localFilters.categoryId || ''}
          onChange={(e) => handleInputChange('categoryId', e.target.value)}
          disabled={loading}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minPrice">Min Price</label>
        <input
          id="minPrice"
          type="number"
          value={localFilters.minPrice || ''}
          onChange={(e) => handleInputChange('minPrice', e.target.value)}
          placeholder="e.g., 10"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          id="maxPrice"
          type="number"
          value={localFilters.maxPrice || ''}
          onChange={(e) => handleInputChange('maxPrice', e.target.value)}
          placeholder="e.g., 100"
        />
      </div>

      <div className="filter-buttons">
        <button onClick={handleApplyFilters} className="btn apply-btn">Apply Filters</button>
        <button onClick={handleClear} className="btn clear-btn">Clear Filters</button>
      </div>
    </div>
  );
}
