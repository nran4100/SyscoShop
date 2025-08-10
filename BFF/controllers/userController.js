import { get, post, patch, del } from '../utils/appClient.js';

// Helper to unwrap { success, message, data }
function unwrapResponse(response) {
  return response?.data?.data;
}

export async function getAllUsers(req, res, baseUrl) {
  try {
    const response = await get(baseUrl, {}, req);
    const users = unwrapResponse(response);
    res.json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err.message);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

export async function getUserById(req, res, baseUrl) {
  try {
    const response = await get(`${baseUrl}/${req.params.id}`, {}, req);
    const user = unwrapResponse(response);
    res.json(user);
  } catch (err) {
    console.error('User fetch failed:', err.message);
    res.status(404).json({ message: 'User not found' });
  }
}

export async function createUser(req, res, baseUrl) {
  try {
    const response = await post(baseUrl, req.body, {}, req);
    const user = unwrapResponse(response);
    res.status(201).json(user);
  } catch (err) {
    console.error('Failed to create user:', err.message);
    res.status(500).json({ message: 'Failed to create user' });
  }
}

export async function updateUser(req, res, baseUrl) {
  try {
    const response = await patch(`${baseUrl}/${req.params.id}`, req.body, {}, req);
    const updatedUser = unwrapResponse(response);
    res.json(updatedUser);
  } catch (err) {
    console.error('Failed to update user:', err.message);
    res.status(500).json({ message: 'Failed to update user' });
  }
}

export async function deleteUser(req, res, baseUrl) {
  try {
    const response = await del(`${baseUrl}/${req.params.id}`, {}, req);
    unwrapResponse(response); // optional, in case API returns confirmation
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Failed to delete user:', err.message);
    res.status(500).json({ message: 'Failed to delete user' });
  }
}
