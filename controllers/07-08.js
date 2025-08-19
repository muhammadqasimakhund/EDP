import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { readFile, writeFile } from './../config/readingFiles.js';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

const sanitizeUser = (u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt ?? null,
});

export const getAllUsers = async (req, res) => {
    try {
        const users = await readFile(usersFilePath) || [];
        const safe = users.map(sanitizeUser);
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: safe
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving users.',
            error: error.message
        });
    }
};

export const getAllUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await readFile(usersFilePath) || [];
        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: sanitizeUser(user)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving users.',
            error: error.message
        });
    }
};

export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const users = await readFile(usersFilePath) || []
        const user = users.find(u => u.email === email)
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashPassword,
            createdAt: new Date().toISOString().split('T')[0]
        }
        users.push(newUser);
        await writeFile(usersFilePath, users);
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the user.',
            error: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await readFile(usersFilePath) || []
        const user = users.find(u => u.email === email)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    name: user.name,
                    email: user.email,
                    loginAt: new Date().toISOString().split('T')[1]
                }
            });

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the user.',
            error: error.message
        });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const users = await readFile(usersFilePath) || [];
        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        user.updatedAt = new Date().toISOString().split('T')[0];

        await writeFile(usersFilePath, users);
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: {
                name,
                email
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating users.',
            error: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await readFile(usersFilePath) || [];
        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const updatedUsers = users.filter(u => u.id !== id);
        await writeFile(usersFilePath, updatedUsers);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: {
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating users.',
            error: error.message
        });
    }
}