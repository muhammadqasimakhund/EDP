import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from '../config/readingFiles.js';

const filePath = path.join(process.cwd(), 'data', 'blogs.json');

export const getAllBlogs = async (req, res) => {
    try {
        const search = req.query.search;

        const blogs = await readFile(filePath);

        const filteredBlogs = search ? blogs.filter(b => b.title.toLowerCase().includes(search.toLowerCase())) : blogs;

        res.status(200).json({
            success: true,
            message: "Successfully retrived the blogs",
            data: filteredBlogs
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blogs = await readFile(filePath);

        const blog = blogs.find(b => b.id === id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({
            success: true,
            message: "Successfully retrieved the blog",
            data: blog
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}

export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blogs = await readFile(filePath);

        const existingBlog = blogs.find(b => b.title === title);

        if (existingBlog) {
            return res.status(400).json({ success: false, message: 'Blog with this title already exists' });
        }

        const newBlog = {
            id: uuidv4(),
            title,
            content,
            author,
            date: new Date().toISOString().split("T")[0]
        };

        blogs.push(newBlog);

        await writeFile(filePath, blogs);

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}

export const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id;
        const blogs = await readFile(filePath);

        const blog = blogs.find(b => b.id === id);

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }

        const existingBlog = blogs.find(b => b.title === title);
        if (existingBlog) {
            return res.status(400).json({ success: false, message: 'Blog with this title already exists' });
        }

        blog.title = title;
        blog.content = content;
        blog.updatedate = new Date().toISOString().split("T")[0];

        await writeFile(filePath, blogs);

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blogs = await readFile(filePath);

        const blog = blogs.find(b => b.id === id);

        if (!blog) {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // const updatedBlogs = blogs.filter(b => b.id !== id);
        blogs.splice(blogs.indexOf(blog), 1);

        await writeFile(filePath, blogs);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: blog
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}

export const likeBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blogs = await readFile(filePath);

        const blog = blogs.find(b => b.id === id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // blog.likes = (blog.likes || 0) + 1;
        blog.likes = blog.likes ? blog.likes + 1 : 1;

        await writeFile(filePath, blogs);

        res.status(200).json({
            success: true,
            message: "Blog liked successfully",
            data: blog
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}


export const commentBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const { comment } = req.body;
        const blogs = await readFile(filePath);

        const blog = blogs.find(b => b.id === id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        blog.comments = blog.comments || [];
        blog.comments.push(comment);

        await writeFile(filePath, blogs);

        res.status(200).json({
            success: true,
            message: "Blog liked successfully",
            data: blog
        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' + error.message });
    }
}

