import React, { useEffect, useState } from 'react';
import { getAllProducts, patchProduct } from '../services/productService';
import { decodeAccessToken } from '../utils/authUtils';
import Loader from '../components/Loader';
import '../styles/pendingApprovalsPage.css'; // <-- New CSS file

export default function PendingApprovalsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingProducts = async () => {
    try {
      const { products } = await getAllProducts(0, 100, { status: 'PENDING' });
      setProducts(products);
    } catch (err) {
      console.error('Failed to fetch pending products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (productId, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken');
      await patchProduct(productId, { status: newStatus }, token);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(`Failed to update status: ${err}`);
    }
  };

  useEffect(() => {
    const user = decodeAccessToken();
    if (user?.role !== 'data-steward') {
      alert('Access Denied');
      window.location.href = '/products';
    } else {
      fetchPendingProducts();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="pending-approvals-container">
      <h2>Pending Product Approvals</h2>
      {products.length === 0 ? (
        <p>No pending products</p>
      ) : (
        <div className="product-cards">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <img
                src={p.imageUrl || '/default-product.png'}
                alt={p.name}
                className="product-image"
              />
              <div className="product-details">
                <h4>{p.name}</h4>
                <p><strong>Price:</strong> ${p.price}</p>
                <p><strong>Stock:</strong> {p.stockCount} {p.unit}</p>
                <p><strong>Supplier:</strong> {p.supplierID}</p> 
              </div>
              <div className="action-buttons">
                <button className="approve-button" onClick={() => handleApproval(p.id, 'APPROVED')}>
                  Approve
                </button>
                <button className="reject-button" onClick={() => handleApproval(p.id, 'REJECTED')}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
