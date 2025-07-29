import pkg from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { verifyMockToken } from '../mockUsers.js';

const { verify } = pkg;
const useMockAuth = true; // Set to false for real Cognito

const realAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_POOL_ID}/.well-known/jwks.json`,
  });

  function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
      if (err) return callback(err);
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  }

  verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token', error: err.message });
    }
    req.user = decoded;
    next();
  });
};

const mockAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  console.log('Mock authentication enabled');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyMockToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Mock token invalid:', err.message);
    return res.status(403).json({ message: 'Invalid mock token' });
  }
};

const authenticate = useMockAuth ? mockAuthenticate : realAuthenticate;

export default authenticate;
