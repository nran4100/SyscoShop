import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import './styles/main.css';
// import ProductDetailPage from "./pages/ProductDetailPage"; // if needed

export default function Root() {
  return (
    <BrowserRouter basename="/products">
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        {/* <Route path=":productId" element={<ProductDetailPage />} /> optional */}
      </Routes>
    </BrowserRouter>
  );
}
