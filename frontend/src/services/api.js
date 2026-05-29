import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH ====================
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const bootstrapAdminUser = (payload) => api.post('/auth/bootstrap-admin', payload);

// ==================== COURSES ====================
export const getCourses = () => api.get('/courses');
export const getCourse = (id) => api.get(`/courses/${id}`);
export const createCourse = (courseData) => api.post('/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const addLesson = (courseId, lessonData) => api.post(`/courses/${courseId}/lessons`, lessonData);

// ==================== USERS ====================
export const getUsers = () => api.get('/users');
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getProfile = () => api.get('/users/profile');
export const getAnalytics = () => api.get('/users/analytics');

// ==================== ENROLLMENT ====================
export const enrollInCourse = (courseId) => api.post('/enrollment/enroll', { courseId });
export const getMyCourses = () => api.get('/enrollment/my-courses');
export const updateProgress = (enrollmentId, progress) => api.put(`/enrollment/${enrollmentId}/progress`, { progress });
export const checkEnrollment = (courseId) => api.get(`/enrollment/check/${courseId}`);

export default api;
