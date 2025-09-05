import { Request, Response } from 'express';
import Course from '../models/Course';
import { CourseType } from '../types/course.types';

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
    try {
        const courseData: CourseType = req.body;
        const newCourse = new Course(courseData);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

// Get a course by ID
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};

// Update a course by ID
export const updateCourse = async (req: Request, res: Response) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

// Delete a course by ID
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};