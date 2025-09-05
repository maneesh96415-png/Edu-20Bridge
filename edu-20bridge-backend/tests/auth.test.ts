Sure, here's the content for the file: /edu-20bridge-backend/edu-20bridge-backend/tests/auth.test.ts

import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { User } from '../src/models/User'; // Adjust the path as necessary
import { connect, disconnect } from '../src/config/database'; // Adjust the path as necessary

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await User.deleteMany({});
    await disconnect();
});

describe('Authentication Tests', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@example.com'
            });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@example.com'
            });

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fail to login with incorrect credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'wronguser',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
});