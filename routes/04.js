import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductsById, updateProduct} from '../controllers/04.js';
import { validateNameAndPrice } from '../middleware/validateName&Price.js';

const day4Router = express.Router();

day4Router.get('/products', getAllProducts)
day4Router.get('/products/:id', getProductsById)
day4Router.post('/products', validateNameAndPrice, createProduct)
day4Router.put('/products/:id', validateNameAndPrice, updateProduct)
day4Router.delete('/products/:id', deleteProduct)

export default day4Router;
