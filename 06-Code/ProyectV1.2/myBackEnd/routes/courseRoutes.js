const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Services for courses

// Get all courses
router.get('/', courseController.getAllCourses);

// Get course by ID with its units
router.get('/:id', courseController.getCourseById);

// Create or update course with units
router.post('/save', courseController.saveOrUpdateCourse);

// Delete course and its units
router.delete('/:id', courseController.deleteCourse);

// Additional services for reports and other functionalities

// Get courses by category
router.get('/category/:id', courseController.getCoursesByCategory);

// Get courses by instructor
router.get('/instructor/:cedula', courseController.getCoursesByInstructor);

// Get active courses
router.get('/status/active', courseController.getActiveCourses);

// Get courses within a date range
router.get('/daterange', courseController.getCoursesByDateRange);

// Get courses with price above a certain value
router.get('/price/above/:value', courseController.getCoursesAbovePrice);

// Get courses with price below a certain value
router.get('/price/below/:value', courseController.getCoursesBelowPrice);

// Get courses by keyword in name or description
router.get('/search/:keyword', courseController.searchCourses);

// Get the total number of courses
router.get('/count', courseController.getTotalCourses);

// Get average price of all courses
router.get('/price/average', courseController.getAverageCoursePrice);

// Get courses grouped by category
router.get('/grouped/category', courseController.getCoursesGroupedByCategory);

// Get courses grouped by instructor
router.get('/grouped/instructor', courseController.getCoursesGroupedByInstructor);

// Get courses with highest enrollment
router.get('/popular', courseController.getMostPopularCourses);

// Get courses by duration (calculated from start_date to end_date)
router.get('/duration/range/:min/:max', courseController.getCoursesByDurationRange);

// Get courses with YouTube links
router.get('/with/youtube', courseController.getCoursesWithYouTubeLinks);

// Get courses without YouTube links
router.get('/without/youtube', courseController.getCoursesWithoutYouTubeLinks);

// Get courses created by a specific user
router.get('/createdby/:userId', courseController.getCoursesByCreator);

// Get inactive courses
router.get('/status/inactive', courseController.getInactiveCourses);

// Get most recently created courses
router.get('/recent', courseController.getRecentlyCreatedCourses);

// Get courses starting soon (within a week)
router.get('/starting/soon', courseController.getCoursesStartingSoon);

// Get courses ending soon (within a week)
router.get('/ending/soon', courseController.getCoursesEndingSoon);

// Get courses with price discounts
router.get('/discounted', courseController.getCoursesWithDiscounts);

// Get courses with units count
router.get('/units/count', courseController.getCoursesWithUnitsCount);

// Get courses sorted by price (ascending)
router.get('/sorted/price/asc', courseController.getCoursesSortedByPriceAsc);

// Get courses sorted by price (descending)
router.get('/sorted/price/desc', courseController.getCoursesSortedByPriceDesc);

// Get courses sorted by start date (ascending)
router.get('/sorted/startdate/asc', courseController.getCoursesSortedByStartDateAsc);

// Get courses sorted by start date (descending)
router.get('/sorted/startdate/desc', courseController.getCoursesSortedByStartDateDesc);

module.exports = router;