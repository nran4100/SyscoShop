import { get, post, del } from '../utils/appClient.js';

export async function getCartWithDetails(req, res, baseUrl, productUrl) {
  try {
    const userId = req.user.sub;

    // Get cart for user
    const cartResponse = await get(baseUrl, { params: { userId } }, req);
    const cart = cartResponse.data;

    // Fetch and enrich items with product details
    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        try {
          const productResponse = await get(`${productUrl}/${item.productId}`, {}, req);
          const product = productResponse.data;
          return {
            ...item,
            productName: product.name,
            price: product.price,
            imageUrl: product.imageUrl
          };
        } catch (err) {
          console.error(`Product fetch failed for ID ${item.productId}:`, err.message);
          return item; // Return item without product details if failed
        }
      })
    );

    // Respond with enriched cart
    res.json({ ...cart, items: detailedItems });

  } catch (err) {
    console.error('Failed to fetch cart with details:', err.message);
    res.status(500).json({ message: 'Failed to fetch cart with product details' });
  }
}


export async function addOrUpdateCartItem(req, res, baseUrl) {
  try {
    const userId = req.user.sub;
    const payload = { ...req.body, userId };

    const { data } = await post(`${baseUrl}/items`, payload, {}, req);
    res.json(data);
  } catch (err) {
    console.error('Error adding cart item:', err.message);
    res.status(500).json({ message: 'Failed to add/update cart item' });
  }
}

export async function removeCartItem(req, res, baseUrl) {
  try {
    const userId = req.user.sub;
    const productId = req.params.productId;

    const { data } = await del(`${baseUrl}/items/${productId}`, {
      params: { userId }
    }, req);
    res.json(data);
  } catch (err) {
    console.error('Error removing cart item:', err.message);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
}
