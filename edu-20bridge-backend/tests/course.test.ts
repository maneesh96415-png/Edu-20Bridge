Sure, here's the content for the file: /edu-20bridge-backend/edu-20bridge-backend/tests/course.test.ts

import request from 'supertest';
import app from '../src/app';
import { Course } from '../src/models/Course';

describe('Course Management', () => {
    beforeAll(async () => {
        // Setup database connection and any necessary data
    });

    afterAll(async () => {
        // Cleanup database and close connection
    });

    it('should create a new course', async () => {
        const courseData = {
            title: 'Test Course',
            description: 'This is a test course',
            duration: '4 weeks',
        };

        const response = await request(app)
            .post('/api/courses')
            .send(courseData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(courseData.title);
    });

    it('should retrieve a course by ID', async () => {
        const course = await Course.create({
            title: 'Test Course',
            description: 'This is a test course',
            duration: '4 weeks',
        });

        const response = await request(app)
            .get(`/api/courses/${course.id}`)
            .expect(200);

        expect(response.body.title).toBe(course.title);
    });

    it('should update a course', async () => {
        const course = await Course.create({
            title: 'Test Course',
            description: 'This is a test course',
            duration: '4 weeks',
        });

        const updatedData = {
            title: 'Updated Course',
        };

        const response = await request(app)
            .put(`/api/courses/${course.id}`)
            .send(updatedData)
            .expect(200);

        expect(response.body.title).toBe(updatedData.title);
    });

    it('should delete a course', async () => {
        const course = await Course.create({
            title: 'Test Course',
            description: 'This is a test course',
            duration: '4 weeks',
        });

        await request(app)
            .delete(`/api/courses/${course.id}`)
            .expect(204);

        const deletedCourse = await Course.findById(course.id);
        expect(deletedCourse).toBeNull();
    });
});