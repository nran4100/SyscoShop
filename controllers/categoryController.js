import { get, post, patch, del } from '../utils/appClient.js';

export async function getAllCategories(req, res, baseUrl) {
  try {
    const { data } = await get(baseUrl);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
}

export async function createCategory(req, res, baseUrl) {
  try {
    const { data } = await post(baseUrl, req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create category' });
  }
}

export async function updateCategory(req, res, baseUrl) {
  try {
    const { data } = await patch(`${baseUrl}/${req.params.id}`, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update category' });
  }
}

export async function deleteCategory(req, res, baseUrl) {
  try {
    await del(`${baseUrl}/${req.params.id}`);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
}

export async function getProductsByCategory(req, res, baseUrl, productUrl) {
  try {
    const categoryId = req.params.id;

    // Confirm category exists
    await get(`${baseUrl}/${categoryId}`);

    // Fetch products by category
    const { data: products } = await get(productUrl, {
      params: { categoryId },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products for category' });
  }
}
