import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { mockUsers, generateMockTokens } from '../mockUsers.js';

const useMockAuth = true; // Toggle to false for real Cognito

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION,
});

// Login Controller
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (useMockAuth) {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const { accessToken, refreshToken } = generateMockTokens(user);

    return res.status(200).json({
      accessToken,
      idToken: accessToken,
      refreshToken,
      expiresIn: 3600,
      tokenType: 'Bearer',
      user: {
        sub: user.sub,
        email: user.email,
        role: user.role,
      },
    });
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    res.status(200).json({
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
      expiresIn: response.AuthenticationResult.ExpiresIn,
      tokenType: response.AuthenticationResult.TokenType,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(401).json({ message: 'Login failed', error: err.message });
  }
}

// Logout Controller
export async function logoutUser(req, res) {
  if (useMockAuth) {
    return res.status(200).json({ message: 'Mock logout successful' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Authorization header with Bearer token required' });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    const command = new GlobalSignOutCommand({ AccessToken: accessToken });
    await cognitoClient.send(command);

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
}
