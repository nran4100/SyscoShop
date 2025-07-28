import React, { useState } from 'react';
import API_BASE_URL from '../utils/config';
import { useNavigate } from 'react-router-dom';

export default function AddCategoryPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, imageUrl }),
      });

      if (!response.ok) throw new Error('Failed to add category');
      navigate('/categories');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>

        {imageUrl && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img src={imageUrl} alt="Preview" style={{ width: '150px', height: '150px', objectFit: 'contain', border: '1px solid #ccc', marginTop: '8px' }} />
          </div>
        )}

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
