import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryListPage from './pages/CategoryListPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/main.css';
import AddCategoryPage from './pages/AddCategoryPage';
import AddProductPage from './pages/AddProductPage';
import PendingApprovalsPage from './pages/PendingApprovalsPage'; 
import ProtectedRoute from './components/ProtectedRoute';

export default function Root() {
  return (
    <BrowserRouter basename="/products">
      <Routes>
        <Route path="/categories" element={<CategoryListPage />} />

        {/* Only admin can access Add Category */}
        <Route
          path="/categories/add"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddCategoryPage />
            </ProtectedRoute>
          }
        />

        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />

        {/* Only supplier can access Add Product */}
        <Route
          path="/products/add"
          element={
            <ProtectedRoute allowedRoles={['supplier']}>
              <AddProductPage />
            </ProtectedRoute>
          }
        />

        {/* Only data-steward can access Pending Approvals */}
        <Route
          path="/products/pending-approvals"
          element={
            <ProtectedRoute allowedRoles={['data-steward']}>
              <PendingApprovalsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
