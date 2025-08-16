import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from './../config/readingFiles.js';

const itemFilePath = path.join(process.cwd(), 'data', 'items.json');

// Get all items
export const getAllItems = async (req, res) => {
    try {
        const data = await readFile(itemFilePath);
        res.status(200).json({
            success: true,
            items: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching items.',
            error: error.message
        });
    }
};

// Get item by id
export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readFile(itemFilePath);
        const item = data.find(item => item.id === id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found.' });
        res.status(200).json({
            success: true,
            item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the item.',
            error: error.message
        });
    }
};

// Create a new item
export const createItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const file = req.file;
        const data = await readFile(itemFilePath);
        const existingItems = data.find(item => item.name.toLowerCase() === name.toLowerCase() && item.price === Number(price));
        if (existingItems) return res.status(400).json({ success: false, message: 'Item already exists.' });
        console.log(file);
        const newItem = {
            id: uuidv4(),
            name,
            price: Number(price),
            imageName: file ? file.filename : null,
            imagePath: file ? file.path : null
        };
        data.push(newItem);
        await writeFile(itemFilePath, data);
        res.status(201).json({
            success: true,
            message: 'Item created successfully.',
            item: newItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the item.',
            error: error.message
        });
    }
}

// Delete an item by id
export const deleteItems = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readFile(itemFilePath);
        const itemIndex = data.findIndex(item => item.id === id);
        if (itemIndex === -1) return res.status(404).json({ success: false, message: 'Item not found.' });

        const item = data[itemIndex];
        const imagePath = item.imagePath || item.image || null;
        if (imagePath) {
            const normalizedPath = imagePath.replace(/^\.?\/?/, '');
            const fullPath = path.join(process.cwd(), normalizedPath);
            try {
                await import('fs').then(fs => fs.promises.unlink(fullPath));
            } catch (err) {
                if (err.code !== 'ENOENT') {
                    console.error('Error deleting image file:', err);
                }
            }
        }

        data.splice(itemIndex, 1);
        await writeFile(itemFilePath, data);
        res.status(200).json({
            success: true,
            message: 'Item deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the item.',
            error: error.message
        });
    }
}
