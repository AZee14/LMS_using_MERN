import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCourses, updateCourse, deleteCourse } from '../../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar';
import { FiEdit2, FiTrash2, FiX, FiCheck, FiBook } from 'react-icons/fi';

const ManageCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const categories = ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'Design', 'Business', 'Other'];

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      const myCourses = res.data.data.filter(c => c.instructor?._id === user?._id);
      setCourses(myCourses);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setEditData({ title: course.title, description: course.description, category: course.category, price: course.price });
  };

  const handleUpdate = async (id) => {
    try {
      await updateCourse(id, editData);
      toast.success('Course updated!');
      setEditingId(null);
      fetchCourses();
    } catch (err) {
      toast.error('Failed to update course');
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
    <div className="dashboard-layout" id="manage-courses-page">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Manage <span className="gradient-text">Courses</span></h1>
          <p>Edit or delete your existing courses.</p>
        </div>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : courses.length > 0 ? (
          <div className="table-container">
            <table className="data-table" id="manage-courses-table">
              <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Lessons</th><th>Actions</th></tr></thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c._id}>
                    {editingId === c._id ? (
                      <>
                        <td><input value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} className="table-input" /></td>
                        <td><select value={editData.category} onChange={(e) => setEditData({...editData, category: e.target.value})} className="table-input">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></td>
                        <td><input type="number" value={editData.price} onChange={(e) => setEditData({...editData, price: Number(e.target.value)})} className="table-input" /></td>
                        <td>{c.lessons?.length || 0}</td>
                        <td className="action-btns">
                          <button className="btn-icon btn-save" onClick={() => handleUpdate(c._id)} title="Save"><FiCheck /></button>
                          <button className="btn-icon btn-cancel" onClick={() => setEditingId(null)} title="Cancel"><FiX /></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{c.title}</td>
                        <td><span className="category-pill">{c.category}</span></td>
                        <td>{c.price === 0 ? 'Free' : `$${c.price}`}</td>
                        <td>{c.lessons?.length || 0}</td>
                        <td className="action-btns">
                          <button className="btn-icon btn-edit" onClick={() => handleEdit(c)} title="Edit"><FiEdit2 /></button>
                          <button className="btn-icon btn-delete" onClick={() => handleDelete(c._id)} title="Delete"><FiTrash2 /></button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state"><FiBook className="empty-icon" /><h3>No courses to manage</h3><p>Create your first course to see it here.</p></div>
        )}
      </main>
    </div>
  );
};

export default ManageCourses;
