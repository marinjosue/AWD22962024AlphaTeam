const pool = require('../config/db');

const courseController = {
    // Create or update course with units
    saveOrUpdateCourse: async (req, res) => {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            const {
                id_course,
                courseName,
                courseDescription,
                start_date,
                end_date,
                price,
                cedula,
                id_category,
                status,
                course_youtube,
                unitTitles,
                unitContents
            } = req.body;

            const user_id = 1; // You might want to get this from authentication

            let courseId;
            
            if (id_course) {
                // Update existing course
                const [result] = await connection.query(
                    `UPDATE courses 
                     SET course_name = ?, course_description = ?, start_date = ?, 
                         end_date = ?, price = ?, cedula = ?, id_category = ?, 
                         status = ?, course_youtube = ?, user_id = ? 
                     WHERE id_course = ?`,
                    [courseName, courseDescription, start_date, end_date, price, 
                     cedula, id_category, status, course_youtube, user_id, id_course]
                );
                courseId = id_course;

                // Delete existing units
                await connection.query('DELETE FROM course_units WHERE id_course = ?', [courseId]);
            } else {
                // Insert new course
                const [result] = await connection.query(
                    `INSERT INTO courses (course_name, course_description, start_date, 
                                       end_date, price, cedula, id_category, status, 
                                       course_youtube, user_id)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [courseName, courseDescription, start_date, end_date, price,
                     cedula, id_category, status, course_youtube, user_id]
                );
                courseId = result.insertId;
            }

            // Insert course units
            const unitInsertQuery = 
                'INSERT INTO course_units (id_course, unit_title, unit_content) VALUES (?, ?, ?)';

            for (let i = 0; i < unitTitles.length; i++) {
                await connection.query(unitInsertQuery, [
                    courseId,
                    unitTitles[i],
                    unitContents[i]
                ]);
            }

            await connection.commit();
            res.status(200).json({ 
                message: 'Course saved successfully',
                courseId: courseId
            });

        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            res.status(500).json({ 
                message: 'Error saving course', 
                error: error.message 
            });
        } finally {
            if (connection) {
                connection.release();
            }
        }
    },

    // Get all courses
    getAllCourses: async (req, res) => {
        try {
            const [courses] = await pool.query('SELECT * FROM courses');
            res.json(courses);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching courses', 
                error: error.message 
            });
        }
    },

    // Get course by ID with its units
    getCourseById: async (req, res) => {
        try {
            const [course] = await pool.query(
                'SELECT * FROM courses WHERE id_course = ?',
                [req.params.id]
            );

            if (course.length === 0) {
                return res.status(404).json({ message: 'Course not found' });
            }

            const [units] = await pool.query(
                'SELECT * FROM course_units WHERE id_course = ?',
                [req.params.id]
            );

            res.json({
                ...course[0],
                units: units
            });

        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching course', 
                error: error.message 
            });
        }
    },

    // Delete course and its units
    deleteCourse: async (req, res) => {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            // Delete course units first (due to foreign key)
            await connection.query(
                'DELETE FROM course_units WHERE id_course = ?',
                [req.params.id]
            );

            // Delete the course
            const [result] = await connection.query(
                'DELETE FROM courses WHERE id_course = ?',
                [req.params.id]
            );

            if (result.affectedRows === 0) {
                await connection.rollback();
                return res.status(404).json({ message: 'Course not found' });
            }

            await connection.commit();
            res.json({ message: 'Course and units deleted successfully' });

        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            res.status(500).json({ 
                message: 'Error deleting course', 
                error: error.message 
            });
        } finally {
            if (connection) {
                connection.release();
            }
        }
    },

    // Additional controllers for new services

    getCoursesByCategory: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE id_category = ?',
                [req.params.id]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses by category', error: error.message });
        }
    },

    getCoursesByInstructor: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE cedula = ?',
                [req.params.cedula]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses by instructor', error: error.message });
        }
    },

    getActiveCourses: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE status = "active"'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching active courses', error: error.message });
        }
    },

    getCoursesByDateRange: async (req, res) => {
        const { start_date, end_date } = req.query;
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE start_date >= ? AND end_date <= ?',
                [start_date, end_date]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses by date range', error: error.message });
        }
    },

    getCoursesAbovePrice: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE price > ?',
                [req.params.value]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses above price', error: error.message });
        }
    },

    getCoursesBelowPrice: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE price < ?',
                [req.params.value]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses below price', error: error.message });
        }
    },

    searchCourses: async (req, res) => {
        const keyword = `%${req.params.keyword}%`;
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE course_name LIKE ? OR course_description LIKE ?',
                [keyword, keyword]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error searching courses', error: error.message });
        }
    },

    getTotalCourses: async (req, res) => {
        try {
            const [result] = await pool.query(
                'SELECT COUNT(*) as total FROM courses'
            );
            res.json(result[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching total courses', error: error.message });
        }
    },

    getAverageCoursePrice: async (req, res) => {
        try {
            const [result] = await pool.query(
                'SELECT AVG(price) as average_price FROM courses'
            );
            res.json(result[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching average price', error: error.message });
        }
    },

    getCoursesGroupedByCategory: async (req, res) => {
        try {
            const [result] = await pool.query(
                'SELECT id_category, COUNT(*) as course_count FROM courses GROUP BY id_category'
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching grouped courses', error: error.message });
        }
    },

    getCoursesGroupedByInstructor: async (req, res) => {
        try {
            const [result] = await pool.query(
                'SELECT cedula, COUNT(*) as course_count FROM courses GROUP BY cedula'
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching grouped courses', error: error.message });
        }
    },

    getMostPopularCourses: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses ORDER BY enrollment DESC LIMIT 5'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching popular courses', error: error.message });
        }
    },

    getCoursesByDurationRange: async (req, res) => {
        const { min, max } = req.params;
        try {
            const [courses] = await pool.query(
                'SELECT *, DATEDIFF(end_date, start_date) as duration FROM courses HAVING duration BETWEEN ? AND ?',
                [min, max]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses by duration', error: error.message });
        }
    },

    getCoursesWithYouTubeLinks: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE course_youtube IS NOT NULL AND course_youtube != ""'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses with YouTube links', error: error.message });
        }
    },

    getCoursesWithoutYouTubeLinks: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE course_youtube IS NULL OR course_youtube = ""'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses without YouTube links', error: error.message });
        }
    },

    getCoursesByCreator: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE user_id = ?',
                [req.params.userId]
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching courses by creator', error: error.message });
        }
    },

    getInactiveCourses: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses WHERE status = "inactive"'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching inactive courses', error: error.message });
        }
    },

    getRecentlyCreatedCourses: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses ORDER BY created_at DESC LIMIT 5'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error fetching recently created courses', 
                error: error.message 
            });
        }
    },

    // Service to get the latest courses for the dashboard
    getLatestCourses: async (req, res) => {
        try {
            const [courses] = await pool.query(
                'SELECT * FROM courses ORDER BY id_course DESC LIMIT 10'
            );
            res.json(courses);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching latest courses',
                error: error.message
            });
        }
    },

    // Fetch statistics related to courses
    getCourseStatistics: async (req, res) => {
        try {
            const [statistics] = await pool.query(
                `SELECT 
                    (SELECT COUNT(*) FROM courses) as totalCourses,
                    (SELECT COUNT(*) FROM course_units) as totalUnits,
                    (SELECT COUNT(*) FROM courses WHERE status = 'active') as activeCourses,
                    (SELECT COUNT(*) FROM courses WHERE status = 'inactive') as inactiveCourses
                `
            );
            res.json(statistics[0]);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching course statistics',
                error: error.message
            });
        }
    }

};

module.exports = courseController;
