import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';
import CategoryList from '../components/CategoryList';
import { useNavigate } from 'react-router-dom';
import { decodeAccessToken } from '../utils/authUtils'; // Import utility
import '../styles/categoryListPage.css'; // Optional: new CSS for styling

export default function CategoryListPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const decoded = decodeAccessToken();
    if (decoded?.role) {
      setUserRole(decoded.role);
    }
  }, []);

  if (loading) return <div className="loader">Loading categories...</div>;

  return (
    <div className="category-container">
      <div className="category-header">
        <h2>Categories</h2>
        {userRole === 'admin' && (
          <button className="add-category-button" onClick={() => navigate('/categories/add')}>
            + Add Category
          </button>
        )}
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
