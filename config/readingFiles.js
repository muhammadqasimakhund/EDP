import fs from 'fs/promises';

export const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8') || '[]';
        return JSON.parse(data);
    } catch (error) {
        console.log('Error reading file:', error);
        return null;
    }
}

export const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.log('Error writing to file:', error);
    }
}