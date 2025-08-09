import { get, post, patch, del } from '../utils/appClient.js';


function unwrapResponse(response) {
  return response?.data?.data; 
}

export async function getAllCategories(req, res, baseUrl) {
  try {
    const response = await get(baseUrl);
    const categories = unwrapResponse(response);
    res.json(categories);
  } catch (err) {
    console.error('Failed to fetch categories:', err.message);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}

export async function createCategory(req, res, baseUrl) {
  try {
    const response = await post(baseUrl, req.body);
    const category = unwrapResponse(response);
    res.status(201).json(category);
  } catch (err) {
    console.error('Failed to create category:', err.message);
    res.status(500).json({ message: 'Failed to create category' });
  }
}

export async function updateCategory(req, res, baseUrl) {
  try {
    const response = await patch(`${baseUrl}/${req.params.id}`, req.body);
    const updatedCategory = unwrapResponse(response);
    res.json(updatedCategory);
  } catch (err) {
    console.error('Failed to update category:', err.message);
    res.status(500).json({ message: 'Failed to update category' });
  }
}

export async function deleteCategory(req, res, baseUrl) {
  try {
    const response = await del(`${baseUrl}/${req.params.id}`);
    const deleted = unwrapResponse(response);  // usually null or confirmation
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Failed to delete category:', err.message);
    res.status(500).json({ message: 'Failed to delete category' });
  }
}

export async function getProductsByCategory(req, res, baseUrl, productUrl) {
  try {
    const categoryId = req.params.id;

    await get(`${baseUrl}/${categoryId}`);

    const response = await get(productUrl, {
      params: { categoryId },
    });

    const products = unwrapResponse(response);
    res.json(products);
  } catch (err) {
    console.error('Failed to fetch products for category:', err.message);
    res.status(500).json({ message: 'Failed to fetch products for category' });
  }
}
