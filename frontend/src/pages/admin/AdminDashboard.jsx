import { useState, useEffect } from 'react';
import { getAnalytics } from '../../services/api';
import Sidebar from '../../components/Sidebar';
import StatsCard from '../../components/StatsCard';
import { FiUsers, FiBook, FiAward, FiUserCheck } from 'react-icons/fi';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        setAnalytics(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="dashboard-layout" id="admin-dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Admin <span className="gradient-text">Dashboard</span></h1>
          <p>Platform overview and key metrics.</p>
        </div>
        {loading ? <div className="loading-container"><div className="spinner"></div></div> : (
          <>
            <div className="stats-grid">
              <StatsCard icon={<FiUsers />} label="Total Users" value={analytics?.totalUsers || 0} color="#5b8cff" />
              <StatsCard icon={<FiBook />} label="Total Courses" value={analytics?.totalCourses || 0} color="#8b7dff" />
              <StatsCard icon={<FiAward />} label="Enrollments" value={analytics?.totalEnrollments || 0} color="#29d6b0" />
              <StatsCard icon={<FiUserCheck />} label="Instructors" value={analytics?.totalInstructors || 0} color="#f9c74f" />
            </div>
            <div className="stats-grid" style={{ marginTop: '1rem' }}>
              <StatsCard icon={<FiUsers />} label="Students" value={analytics?.totalStudents || 0} color="#2dd4ff" />
              <StatsCard icon={<FiUserCheck />} label="Admins" value={analytics?.totalAdmins || 0} color="#fb7185" />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
