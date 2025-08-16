export const validateCreateItem = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    next();
}
