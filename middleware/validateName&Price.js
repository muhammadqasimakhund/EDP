export const validateNameAndPrice = (req, res, next) => {
    const { name, price } = req.body;

    if (!name || !price || typeof price !== 'number') {
        return res.status(400).json({ success: false, message: "Name and Price are required" });
    }
    next();
}