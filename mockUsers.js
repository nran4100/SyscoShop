import jwt from 'jsonwebtoken';

export const mockUsers = [
  {
    sub: 'user-001',
    email: 'nimesh.ranchagoda@gmail.com',
    password: 'nimesh123',
    role: 'customer',
  },
  {
    sub: 'user-002',
    email: 'thisas.ranchagoda@gmail.com',
    password: 'thisas123',
    role: 'admin',
  },
  {
    sub: 'user-003',
    email: 'charlie@example.com',
    password: 'password123',
    role: 'customer',
  },
  {
    sub: 'user-004',
    email: 'dave@example.com',
    password: 'password123',
    role: 'supplier',
  },
  {
    sub: 'user-005',
    email: 'eve@example.com',
    password: 'password123',
    role: 'data-steward',
  },
];

// Secret key for signing mock tokens (for mock mode only)
const MOCK_SECRET = 'mock-secret-key';

// Generate real-looking access token (valid 1h) and refresh token (valid 7d)
export function generateMockTokens(user) {
  const payload = {
    sub: user.sub,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, MOCK_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, MOCK_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}

// Decode token in mock mode (verifies against mock secret)
export function verifyMockToken(token) {
  return jwt.verify(token, MOCK_SECRET);
}
