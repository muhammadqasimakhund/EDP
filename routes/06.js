import express from 'express';
import { upload } from '../config/multer.js';
import { validateCreateItem } from '../middleware/validateItem.js';
import { createItem, deleteItems, getAllItems, getItemById } from '../controllers/06.js';

const day6Router = express.Router();

day6Router.get('/items', getAllItems);
day6Router.get('/items/:id', getItemById);
day6Router.post('/items', upload.single('file'), validateCreateItem, createItem);
day6Router.delete('/items/:id', deleteItems);

export default day6Router;
