import express from 'express';
import { createCourse, updateCourse, getCourse, getAllCourses, deleteCourse } from '../controllers/courseController';

const router = express.Router();

// Route to create a new course
router.post('/', createCourse);

// Route to update an existing course
router.put('/:id', updateCourse);

// Route to get a specific course by ID
router.get('/:id', getCourse);

// Route to get all courses
router.get('/', getAllCourses);

// Route to delete a course
router.delete('/:id', deleteCourse);

export default router;