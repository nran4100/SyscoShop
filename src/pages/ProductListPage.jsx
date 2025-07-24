import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import ProductList from '../components/ProductList';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    getAllProducts(currentPage, pageSize)
      .then(({ products, totalPages }) => {
        setProducts(products);
        setTotalPages(totalPages);
      })
      .catch((err) => console.error('Failed to load products', err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ProductList
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
      goToPage={goToPage}
      loading={loading}
    />
  );
}
