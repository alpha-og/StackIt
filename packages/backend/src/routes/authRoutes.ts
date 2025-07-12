import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
import { Op } from 'sequelize';

dotenv.config();

const router = Router();
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}
// Register endpoint
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [{ email }, { username }] 
            } 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'User with this email or username already exists' 
            });
        }
        
        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await User.create({
            username,
            email,
            passwordHash,
            role: role || 'user' // Default to 'user'
        });
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );
        
        // Set cookie instead of sending token in response
        res.cookie('token', token, {
            httpOnly: true,    // Prevents XSS attacks
            secure: false, // HTTPS only in production
            sameSite: 'strict', // CSRF protection
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err:any) {
        console.error('Registration error:', err);
        res.status(500).json({ 
            error: 'Registration failed',
            details: err.message 
        });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );
        
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure:false, //Change to true in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err:any) {
        console.error('Login error:', err);
        res.status(500).json({ 
            error: 'Login failed',
            details: err.message 
        });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});


export default router;