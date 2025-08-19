import express from 'express';
import { upload } from '../config/multer.js';
import { userCreationValidate, userLoginValidate } from '../middleware/validateUsers.js';
import { deleteUser, getAllUsers, getAllUsersById, loginUser, signupUser, updateUser } from '../controllers/07-08.js';

const day8Router = express.Router();

day8Router.get('/users', getAllUsers);
day8Router.get('/users/:id', getAllUsersById);
day8Router.post('/users/sign-up', upload.none(), userCreationValidate, signupUser);
day8Router.post('/users/login', upload.none(), userLoginValidate, loginUser);
day8Router.patch('/users/:id', upload.none(), updateUser);
day8Router.delete('/users/:id', deleteUser);

export default day8Router;
