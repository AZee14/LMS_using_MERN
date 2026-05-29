import { useState, useEffect } from 'react';
import { getCourses, deleteCourse } from '../../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { FiTrash2, FiBook } from 'react-icons/fi';

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteCourse(id);
      toast.success('Course deleted');
      setCourses(courses.filter(c => c._id !== id));
    } catch (err) {
      toast.error('Failed to delete course');
    }
  };

  return (
    <div className="dashboard-layout" id="admin-manage-courses-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Manage <span className="gradient-text">Courses</span></h1>
          <p>Oversee all courses on the platform.</p>
        </div>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : courses.length > 0 ? (
          <div className="table-container">
            <table className="data-table" id="admin-courses-table">
              <thead><tr><th>Title</th><th>Instructor</th><th>Category</th><th>Price</th><th>Lessons</th><th>Actions</th></tr></thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.instructor?.name || 'Unknown'}</td>
                    <td><span className="category-pill">{c.category}</span></td>
                    <td>{c.price === 0 ? 'Free' : `$${c.price}`}</td>
                    <td>{c.lessons?.length || 0}</td>
                    <td><button className="btn-icon btn-delete" onClick={() => handleDelete(c._id)} title="Delete"><FiTrash2 /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state"><FiBook className="empty-icon" /><h3>No courses yet</h3></div>
        )}
      </main>
    </div>
  );
};

export default AdminManageCourses;
