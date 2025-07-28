import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './styles/auth.css';
// import ProductDetailPage from "./pages/ProductDetailPage"; // if needed

export default function Root() {
  return (
    <BrowserRouter basename="/auth">
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}