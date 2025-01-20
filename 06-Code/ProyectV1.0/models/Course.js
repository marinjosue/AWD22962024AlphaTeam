const pool = require('../services/database');

class Course {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM courses');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM courses WHERE id_course = ?', [id]);
        return rows[0];
    }

    static async create(courseData) {
        const { name, description, start_date, end_date, price, id_category } = courseData;
        const [result] = await pool.query(
            'INSERT INTO courses (course_name, course_description, start_date, end_date, price, id_category) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, start_date, end_date, price, id_category]
        );
        return result.insertId;
    }

    static async update(id, courseData) {
        const { name, description, start_date, end_date, price, id_category } = courseData;
        const [result] = await pool.query(
            'UPDATE courses SET course_name = ?, course_description = ?, start_date = ?, end_date = ?, price = ?, id_category = ? WHERE id_course = ?',
            [name, description, start_date, end_date, price, id_category, id]
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query('UPDATE courses SET status = ? WHERE id_course = ?', ['inactive', id]);
        return result.affectedRows;
    }
}

module.exports = Course;
