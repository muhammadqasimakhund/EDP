import express from 'express';
import { userControllersBody, userControllersID, userControllersSearch } from '../controllers/02.js';

const day2Router = express.Router();

day2Router.post('/users', userControllersBody)
day2Router.post('/users/:id', userControllersID)
day2Router.post('/search', userControllersSearch)

export default day2Router;