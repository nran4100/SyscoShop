import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllProducts, getAllCategories } from '../services/productService';
import ProductList from '../components/ProductList';
import FilterSidebar from '../components/FilterSidebar';
import '../styles/productListPage.css';
import { decodeAccessToken } from '../utils/authUtils';

export default function ProductListPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    categoryId: searchParams.get('categoryId') || '',
    unit: searchParams.get('unit') || '',
    status: 'APPROVED',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    name: searchParams.get('name') || '',
  };

  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(0);
  }, [searchParams.toString()]);

  useEffect(() => {
    setLoading(true);
    getAllProducts(currentPage, pageSize, filters)
      .then(({ products, totalPages }) => {
        setProducts(products);
        setTotalPages(totalPages);
      })
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setLoading(false));
  }, [currentPage, searchParams.toString()]);

  useEffect(() => {
    getAllCategories()
      .then(({ products }) => setCategories(products))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  useEffect(() => {
    const decoded = decodeAccessToken();
    if (decoded?.role) {
      setUserRole(decoded.role);
    }
  }, []);

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const applyFilters = (newFilters) => {
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="product-page">
      <aside className="filter-sidebar">
        <FilterSidebar
          categories={categories}
          initialFilters={filters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </aside>

      <main className="product-content">
        <div className="product-header-left">
          {userRole === 'supplier' && (
            <button className="add-product-button" onClick={() => navigate('/products/add')}>
              + Add Product
            </button>
          )}
          {userRole === 'data-steward' && (
            <button className="add-product-button" onClick={() => navigate('/products/pending-approvals')}>
              Pending Approvals
            </button>
          )}
        </div>

        <ProductList
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          loading={loading}
        />
      </main>
    </div>
  );
}
