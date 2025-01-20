import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/CourseList';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<CourseList />} />
        </Routes>
    </Router>
);

export default App;
