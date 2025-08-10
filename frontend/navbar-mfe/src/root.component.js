import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/navbar.css';

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <NavBar />
    </BrowserRouter>
  );
}
