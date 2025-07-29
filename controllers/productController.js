import { get, post, patch, del } from '../utils/appClient.js';

export async function getAllProducts(req, res, baseUrl) {

  try {
    const { data } = await get(baseUrl, { params: req.query }, req);
    res.json(data);
    console.log('Fetched products successfully');
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}

export async function getProductById(req, res, baseUrl) {
  try {
    const { data } = await get(`${baseUrl}/${req.params.id}`, {}, req);
    res.json(data);
  } catch (err) {
    console.error('Product fetch failed:', err.message);
    res.status(404).json({ message: 'Product not found' });
  }
}

export async function createProduct(req, res, baseUrl) {
  try {
    await post(baseUrl, req.body, {}, req);
    res.status(201).send();
  } catch (err) {
    console.error('Product creation failed:', err.message);
    res.status(500).json({ message: 'Product creation failed' });
  }
}

export async function updateProduct(req, res, baseUrl) {
  try {
    const response = await patch(`${baseUrl}/${req.params.id}`, req.body, {}, req);

    if (response.status === 204) {
      res.status(204).send(); // No content to return
    } else {
      res.status(response.status).json(response.data); // Just in case data is returned
    }
  } catch (err) {
    console.error('Product update failed:', err.message);
    res.status(500).json({ message: 'Product update failed' });
  }
}



export async function deleteProduct(req, res, baseUrl) {
  try {
    await del(`${baseUrl}/${req.params.id}`, {}, req);
    res.status(204).send();
  } catch (err) {
    console.error('Product deletion failed:', err.message);
    res.status(500).json({ message: 'Product deletion failed' });
  }
}
