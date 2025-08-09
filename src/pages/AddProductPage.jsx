import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../services/categoryService';
import API_BASE_URL from '../utils/config';
import { useNavigate } from 'react-router-dom';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

const units = [
  { label: 'kg', value: 'KG' },
  { label: 'litre', value: 'LITRE' },
  { label: 'piece', value: 'PIECE' },
  { label: 'pack', value: 'PACK' },
  { label: 'meter', value: 'METER' },
  { label: 'other', value: 'OTHER' },
];


  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
  }, []);

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (err) {
      console.error('Failed to decode token', err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const decodedToken = decodeToken(token);
      const supplierId = decodedToken?.sub;

      if (!supplierId) {
        alert('Invalid access token. Supplier ID missing.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price,
          unit,
          status: 'PENDING',
          imageUrl,
          categoryId,
          stockCount,
          supplierID: supplierId,

        }),
      });

      if (!response.ok) throw new Error('Failed to add product');
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Unit:
          <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
            <option value="">Select Unit</option>
            {units.map(({ label, value }) => (
                <option key={value} value={value}>
                {label}
                </option>
            ))}
            </select>

        </label>

        <label>
          Stock Count:
          <input
            type="number"
            value={stockCount}
            onChange={(e) => setStockCount(e.target.value)}
            required
          />
        </label>

        <label>
          Image URL:
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>

        {imageUrl && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={imageUrl}
              alt="Preview"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                border: '1px solid #ccc',
                marginTop: '8px',
              }}
            />
          </div>
        )}

        <label>
          Category:
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
