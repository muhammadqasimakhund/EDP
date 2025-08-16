import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductsById, updateProduct } from '../controllers/03.js';
import { validateNameAndPrice } from '../middleware/validateName&Price.js';

const day3Router = express.Router();

day3Router.get('/products', getAllProducts)
day3Router.get('/products/:id', getProductsById)
day3Router.post('/products', validateNameAndPrice, createProduct)
day3Router.put('/products/:id', validateNameAndPrice, updateProduct)
day3Router.delete('/products/:id', deleteProduct)

export default day3Router;
