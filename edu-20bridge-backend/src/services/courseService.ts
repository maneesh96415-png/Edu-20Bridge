import Course from '../models/Course';
import { CourseType } from '../types/course.types';

// Create a new course
export const createCourse = async (courseData: CourseType) => {
    const course = new Course(courseData);
    return await course.save();
};

// Get all courses
export const getAllCourses = async () => {
    return await Course.find();
};

// Get a course by ID
export const getCourseById = async (courseId: string) => {
    return await Course.findById(courseId);
};

// Update a course by ID
export const updateCourse = async (courseId: string, courseData: Partial<CourseType>) => {
    return await Course.findByIdAndUpdate(courseId, courseData, { new: true });
};

// Delete a course by ID
export const deleteCourse = async (courseId: string) => {
    return await Course.findByIdAndDelete(courseId);
};