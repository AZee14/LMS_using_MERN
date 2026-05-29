import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyCourses } from '../../services/api';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import { FiBook, FiBarChart2, FiAward } from 'react-icons/fi';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyCourses();
        setEnrollments(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  const completed = enrollments.filter(e => e.progress === 100).length;

  return (
    <div className="dashboard-layout" id="student-dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome back, <span className="gradient-text">{user?.name}</span>!</h1>
          <p>Here's an overview of your learning progress.</p>
        </div>
        <div className="stats-grid">
          <StatsCard icon={<FiBook />} label="Enrolled Courses" value={enrollments.length} color="#5b8cff" />
          <StatsCard icon={<FiBarChart2 />} label="Avg Progress" value={`${avgProgress}%`} color="#8b7dff" />
          <StatsCard icon={<FiAward />} label="Completed" value={completed} color="#29d6b0" />
        </div>
        <div className="dashboard-section">
          <h2>Recent Enrollments</h2>
          {loading ? (
            <div className="loading-container"><div className="spinner"></div></div>
          ) : enrollments.length > 0 ? (
            <div className="table-container">
              <table className="data-table" id="recent-enrollments-table">
                <thead><tr><th>Course</th><th>Instructor</th><th>Progress</th><th>Enrolled</th></tr></thead>
                <tbody>
                  {enrollments.slice(0, 5).map((e) => (
                    <tr key={e._id}>
                      <td><Link to={`/courses/${e.course?._id}`}>{e.course?.title}</Link></td>
                      <td>{e.course?.instructor?.name}</td>
                      <td><div className="progress-bar-container"><div className="progress-bar" style={{ width: `${e.progress}%` }}></div><span>{e.progress}%</span></div></td>
                      <td>{new Date(e.enrolledAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state"><FiBook className="empty-icon" /><h3>No enrollments yet</h3><p>Browse courses and start learning!</p><Link to="/courses" className="btn-primary">Browse Courses</Link></div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
