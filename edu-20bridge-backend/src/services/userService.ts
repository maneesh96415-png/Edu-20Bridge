import User from '../models/User';
import { UserType } from '../types/user.types';

// Function to create a new user
export const createUser = async (userData: UserType) => {
    const user = new User(userData);
    return await user.save();
};

// Function to find a user by ID
export const findUserById = async (userId: string) => {
    return await User.findById(userId);
};

// Function to update user details
export const updateUser = async (userId: string, updateData: Partial<UserType>) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Function to delete a user
export const deleteUser = async (userId: string) => {
    return await User.findByIdAndDelete(userId);
};

// Function to fetch all users
export const getAllUsers = async () => {
    return await User.find();
};