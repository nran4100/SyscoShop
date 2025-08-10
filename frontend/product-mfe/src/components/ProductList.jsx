import React from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';

export default function ProductList({
  products,
  currentPage,
  totalPages,
  goToPage,
  loading,
}) {
  if (loading) return <Loader />;

  return (
    <div className="product-container">
      <h2 className="product-title">Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
