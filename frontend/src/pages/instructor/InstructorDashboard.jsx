import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getCourses } from '../../services/api';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import { FiBook, FiUsers, FiDollarSign } from 'react-icons/fi';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCourses();
        const myCourses = res.data.data.filter(c => c.instructor?._id === user?._id);
        setCourses(myCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const totalLessons = courses.reduce((sum, c) => sum + (c.lessons?.length || 0), 0);

  return (
    <div className="dashboard-layout" id="instructor-dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome, <span className="gradient-text">{user?.name}</span>!</h1>
          <p>Manage your courses and track your teaching impact.</p>
        </div>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : (
          <>
            <div className="stats-grid">
              <StatsCard icon={<FiBook />} label="My Courses" value={courses.length} color="#5b8cff" />
              <StatsCard icon={<FiUsers />} label="Total Lessons" value={totalLessons} color="#8b7dff" />
              <StatsCard icon={<FiDollarSign />} label="Categories" value={[...new Set(courses.map(c => c.category))].length} color="#29d6b0" />
            </div>
            <div className="dashboard-section">
              <h2>My Courses</h2>
              {courses.length > 0 ? (
                <div className="table-container">
                  <table className="data-table">
                    <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Lessons</th><th>Created</th></tr></thead>
                    <tbody>
                      {courses.map(c => (
                        <tr key={c._id}>
                          <td>{c.title}</td>
                          <td><span className="category-pill">{c.category}</span></td>
                          <td>{c.price === 0 ? 'Free' : `$${c.price}`}</td>
                          <td>{c.lessons?.length || 0}</td>
                          <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state"><FiBook className="empty-icon" /><h3>No courses yet</h3><p>Create your first course to get started!</p></div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default InstructorDashboard;
