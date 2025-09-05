import { Request, Response } from 'express';
import { authService } from '../services/authService';

// User registration
export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
export const login = async (req: Request, res: Response) => {
    try {
        const { token, user } = await authService.login(req.body);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Password reset (optional)
export const resetPassword = async (req: Request, res: Response) => {
    try {
        await authService.resetPassword(req.body);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};