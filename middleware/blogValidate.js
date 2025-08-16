export const validateCreateBlog = (req, res, next) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    next();
}

export const validateUpdateBlog = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    next();
}
