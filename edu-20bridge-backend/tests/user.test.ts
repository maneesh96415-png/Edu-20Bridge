Sure, here's the contents for the file: /edu-20bridge-backend/edu-20bridge-backend/tests/user.test.ts

import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { User } from '../src/models/User'; // Adjust the path as necessary

describe('User Management', () => {
    let userId: string;

    beforeAll(async () => {
        // Setup code to run before tests
        const user = await User.create({
            username: 'testuser',
            password: 'testpassword',
            email: 'testuser@example.com',
        });
        userId = user._id;
    });

    afterAll(async () => {
        // Cleanup code to run after tests
        await User.deleteMany({});
    });

    it('should fetch user details', async () => {
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
    });

    it('should update user details', async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({ username: 'updateduser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'updateduser');
    });

    it('should delete a user', async () => {
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toBe(204);
    });
});