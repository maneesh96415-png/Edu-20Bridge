import User from '../models/User';
import jwt from '../utils/jwt';
import bcrypt from 'bcrypt';

// Register a new user
export const registerUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword });
    return await newUser.save();
};

// Login user
export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.generateToken(user._id);
    return { token, user };
};

// Get user by ID
export const getUserById = async (userId) => {
    return await User.findById(userId);
};

// Update user details
export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};