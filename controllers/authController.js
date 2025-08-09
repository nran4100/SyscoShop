import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  SignUpCommand,
  AdminConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { post } from '../utils/appClient.js';

const useCognito = false;  

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.COGNITO_REGION,
});

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (useCognito) {
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
  } else {

    try {
      const response = await post(`${process.env.USER_SERVICE_URL}/login`, { email, password });
      
 
      const apiResponse = response.data; 
      const userData = apiResponse.data;  

      const { accessToken, refreshToken, ...user } = userData;

      return res.status(200).json({
        accessToken,
        refreshToken,
        expiresIn: 3600,
        tokenType: 'Bearer',
        user,  
      });

    } catch (err) {
      console.error('User service login failed:', err.message);
      return res.status(401).json({ message: 'Login failed', error: err.message });
    }

  }
}

// ---------------- LOGOUT CONTROLLER ----------------
export async function logoutUser(req, res) {
  if (!useCognito) {
    // User service logout (optional) or just respond success
    return res.status(200).json({ message: 'Logout successful (user service mode)' });
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

export async function registerUser(req, res) {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Email, password, and name are required' });
  }

  try {
    if (!useCognito) {
      const userPayload = {
        name,
        email,
        password,
        role: role || 'customer',
      };

      await post(`${process.env.USER_SERVICE_URL}`, userPayload);
      return res.status(201).json({ message: 'User registered in User Service only' });
    }

    const signUpCmd = new SignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: name },
      ],
    });

    await cognitoClient.send(signUpCmd);

    const confirmCmd = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
    });

    await cognitoClient.send(confirmCmd);

    const userPayload = {
      name,
      email,
      password,
      role: role || 'customer',
    };

    await post(`${process.env.USER_SERVICE_URL}`, userPayload);

    return res.status(201).json({ message: 'User registered in Cognito and User Service' });

  } catch (err) {
    console.error('Registration failed:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
}
