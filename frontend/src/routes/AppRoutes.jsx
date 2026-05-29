import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Public Pages
import Home from '../pages/Home';
import About from '../pages/About';
import CourseList from '../pages/CourseList';
import CourseDetail from '../pages/CourseDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import MyCourses from '../pages/student/MyCourses';
import Profile from '../pages/student/Profile';

// Instructor Pages
import InstructorDashboard from '../pages/instructor/InstructorDashboard';
import CreateCourse from '../pages/instructor/CreateCourse';
import ManageCourses from '../pages/instructor/ManageCourses';
import UploadLessons from '../pages/instructor/UploadLessons';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import AdminManageCourses from '../pages/admin/AdminManageCourses';
import Analytics from '../pages/admin/Analytics';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/my-courses" element={<ProtectedRoute roles={['student']}><MyCourses /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><Profile /></ProtectedRoute>} />

      {/* Instructor Routes */}
      <Route path="/instructor/dashboard" element={<ProtectedRoute roles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
      <Route path="/instructor/create-course" element={<ProtectedRoute roles={['instructor']}><CreateCourse /></ProtectedRoute>} />
      <Route path="/instructor/manage-courses" element={<ProtectedRoute roles={['instructor']}><ManageCourses /></ProtectedRoute>} />
      <Route path="/instructor/upload-lessons" element={<ProtectedRoute roles={['instructor']}><UploadLessons /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/manage-users" element={<ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>} />
      <Route path="/admin/manage-courses" element={<ProtectedRoute roles={['admin']}><AdminManageCourses /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute roles={['admin']}><Analytics /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
