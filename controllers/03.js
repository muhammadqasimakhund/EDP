const products = [
    { "id": 1, "name": "Laptop", "price": 1000 },
    { "id": 2, "name": "Phone", "price": 500 }
]

export const getAllProducts = (req, res) => {
    try {

        res.status(200).json({
            success: true,
            message: "Successfully get all products",
            data: products,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot get the products",
            error: error.message
        })
    }
}

export const getProductsById = (req, res) => {
    try {
        const id = Number(req.params.id);
        const product = products.find(p => p.id === id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Successfully get a product by an ID",
            data: product,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Cannot get the products",
            error: error.message
        })
    }
}

export const createProduct = (req, res) => {
    try {
        const { name, price } = req.body;
        const existingProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase() && p.price === price)
        if (existingProduct) return res.status(400).json({ success: false, message: "Product All ready existed" })
        const product = { id: products.length + 1, name, price };
        products.push(product);
        res.status(201).json({
            success: true,
            message: "Product Successfully created",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot create the product",
            error: error.message
        })
    }
}

export const updateProduct = (req, res) => {
    try {
        const id = Number(req.params.id)
        const { name, price } = req.body;
        let product = products.find(p => p.id === id)
        if (!product) return res.status(404).json({ success: false, message: "Cannot found the product" })
        const existingProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase() && p.price === price)
        if (existingProduct) return res.status(400).json({ success: false, message: "Product already existed" })
        product.name = name;
        product.price = price;
        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot update the product",
            error: error.message
        })
    }
}

export const deleteProduct = (req, res) => {
    try {
        const id = Number(req.params.id);

        const product = products.find(p => p.id === id);
        if (!product) return res.status(404).json({ success: false, message: "Cannot found the product" })

        const index = products.indexOf(product);
        products.splice(index, 1);

        products.forEach(p => {
            if (p.id > id) {
                p.id--;
            }
        });

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Cannot delete the product",
            error: error.message
        })
    }
}