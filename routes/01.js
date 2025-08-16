import express from 'express';
import { aboutControllers, blogControllers, homeControllers } from '../controllers/01.js';

const day1Router = express.Router();

day1Router.get('/home', homeControllers)
day1Router.get('/about', aboutControllers)
day1Router.get('/blogs', blogControllers)

export default day1Router;