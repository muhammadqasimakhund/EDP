import express from 'express';
import { commentBlog, createBlog, deleteBlog, getAllBlogs, getBlogById, likeBlog, updateBlog } from '../controllers/05.js';
import { validateCreateBlog, validateUpdateBlog } from '../middleware/blogValidate.js';

const day5Router = express.Router();

day5Router.get('/blogs', getAllBlogs);
day5Router.get('/blogs/:id', getBlogById);
day5Router.post('/blogs', validateCreateBlog, createBlog);
day5Router.put('/blogs/:id', validateUpdateBlog, updateBlog);
day5Router.delete('/blogs/:id', deleteBlog);
day5Router.patch('/blogs/:id/like', likeBlog);
day5Router.patch('/blogs/:id/comment', commentBlog);

export default day5Router;
