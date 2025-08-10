import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';

import createProductRouter from './routes/products.js';
import createCategoryRouter from './routes/categories.js';
import createUserRouter from './routes/users.js';
import createCartRouter from './routes/carts.js';
import createAuthRouter from './routes/auth.js';



const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1/products', createProductRouter(process.env.PRODUCT_SERVICE_URL));
app.use('/api/v1/carts', createCartRouter(process.env.CART_SERVICE_URL, process.env.PRODUCT_SERVICE_URL));
app.use('/api/v1/users', createUserRouter(process.env.USER_SERVICE_URL));
app.use('/api/v1/categories', createCategoryRouter(process.env.CATEGORY_SERVICE_URL, process.env.PRODUCT_SERVICE_URL));
app.use('/api/v1/auth', createAuthRouter());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`BFF running on port ${PORT}`);
});
