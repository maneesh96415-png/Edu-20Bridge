// src/types/user.types.ts

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserUpdate {
    username?: string;
    email?: string;
    password?: string;
}

export interface AuthenticatedUser extends User {
    token: string;
}