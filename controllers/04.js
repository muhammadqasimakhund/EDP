import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const filePath = path.join(process.cwd(), 'data', 'products.json')

const readProducts = async () => {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

const writeProducts = async (products) => {
    await fs.writeFile(filePath, JSON.stringify(products, null, 2))
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await readProducts();
        res.status(200).json({
            success: true,
            message: "Successfully fetched all products",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}

export const getProductsById = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await readProducts();

        const product = products.find(p => p.id === id);

        if (!product) return res.status(404).json({ success: false, message: "Product not found" })

        res.status(200).json({
            success: true,
            message: "Successfully retrieved product",
            data: product
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body
        const products = await readProducts();
        const existingProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase() && p.price === price)
        if (existingProduct) return res.status(401).json({ success: false, message: "Product already exists" })
        const newProduct = {
            id: uuidv4(),
            name,
            price
        }
        products.push(newProduct)
        await writeProducts(products)
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, price } = req.body
        const id = req.params.id;
        const products = await readProducts();

        const product = products.find(p => p.id === id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" })

        const existingProduct = products.find(p => p.name.toLowerCase() === name.toLowerCase() && p.price === price)
        if (existingProduct) return res.status(401).json({ success: false, message: "Product already exists" })

        product.name = name;
        product.price = price;

        await writeProducts(products)

        res.status(200).json({
            success: true,
            message: "Successfully Updated product",
            data: product
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await readProducts();

        const product = products.find(p => p.id === id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" })
        products.splice(products.indexOf(product), 1);
        await writeProducts(products)
        res.status(200).json({
            success: true,
            message: "Successfully deleted product",
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}