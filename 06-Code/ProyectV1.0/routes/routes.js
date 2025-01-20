
// routes.js
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const categoriesController = require('../controllers/categoriesController');
const usersController = require('../controllers/usersController');

// CRUD Operations for Courses
router.get('/courses', coursesController.getAllCourses);
router.get('/courses/:id', coursesController.getCourseById);
router.post('/courses', coursesController.createCourse);
router.put('/courses/:id', coursesController.updateCourse);
router.delete('/courses/:id', coursesController.softDeleteCourse);

// Additional URIs for Courses
router.get('/courses/active', coursesController.getActiveCourses);
router.get('/courses/inactive', coursesController.getInactiveCourses);
router.get('/courses/price-range/:min/:max', coursesController.getCoursesByPriceRange);
router.get('/courses/category/:id_category', coursesController.getCoursesByCategory);
router.get('/courses/search/:query', coursesController.searchCourses);
router.post('/courses/bulk-add', coursesController.bulkAddCourses);
router.put('/courses/activate/:id', coursesController.activateCourse);
router.put('/courses/deactivate/:id', coursesController.deactivateCourse);
router.get('/courses/stats', coursesController.getCourseStats);
router.get('/courses/upcoming', coursesController.getUpcomingCourses);
router.get('/courses/:id/units', coursesController.getUnitsByCourse);
router.post('/courses/:id/units', coursesController.addUnitToCourse);
router.delete('/courses/:id/units/:unitId', coursesController.deleteUnitFromCourse);
router.put('/courses/:id/units/:unitId', coursesController.updateUnitInCourse);
router.get('/courses/:id/units/search/:query', coursesController.searchUnitsInCourse);

// Routes for Users
router.get('/users/courses/:userId', usersController.getCoursesByUser);
router.get('/users/instructors', usersController.getInstructors);
router.post('/users/:userId/assign-course/:id_course', usersController.assignCourseToUser);
router.get('/users/:userId/assigned-courses', usersController.getAssignedCourses);

// Routes for Categories
router.get('/categories', categoriesController.getAllCategories);
router.post('/categories', categoriesController.createCategory);
router.put('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

// Dashboard and Statistics
router.get('/dashboard/stats', coursesController.getDashboardStats);
router.get('/courses/popular', coursesController.getPopularCourses);

module.exports = router;
