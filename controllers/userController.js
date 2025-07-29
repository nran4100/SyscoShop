import { get, post, patch, del } from '../utils/appClient.js';

export async function getAllUsers(req, res, baseUrl) {
  try {
    const { data } = await get(baseUrl);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

export async function getUserById(req, res, baseUrl) {
  try {
    const { data } = await get(`${baseUrl}/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
}

export async function createUser(req, res, baseUrl) {
  try {
    const { data } = await post(baseUrl, req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
}

export async function updateUser(req, res, baseUrl) {
  try {
    const { data } = await patch(`${baseUrl}/${req.params.id}`, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
}

export async function deleteUser(req, res, baseUrl) {
  try {
    await del(`${baseUrl}/${req.params.id}`);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
}
