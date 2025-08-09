import { get, post, patch, del } from '../utils/appClient.js';

function unwrapResponse(response) {
  return response?.data?.data;
}

export async function getAllProducts(req, res, baseUrl) {
  try {
    const response = await get(baseUrl, { params: req.query }, req);
    const products = unwrapResponse(response);
    res.json(products);
    console.log('Fetched products successfully');
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}

export async function getProductById(req, res, baseUrl) {
  try {
    const response = await get(`${baseUrl}/${req.params.id}`, {}, req);
    const product = unwrapResponse(response);
    res.json(product);
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
    const updatedProduct = unwrapResponse(response);
    res.json(updatedProduct); // Return updated product
  } catch (err) {
    console.error('Product update failed:', err.message);
    res.status(500).json({ message: 'Product update failed' });
  }
}

export async function deleteProduct(req, res, baseUrl) {
  try {
    await del(`${baseUrl}/${req.params.id}`, {}, req);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Product deletion failed:', err.message);
    res.status(500).json({ message: 'Product deletion failed' });
  }
}
